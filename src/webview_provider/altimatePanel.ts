import {
  WebviewViewProvider,
  WebviewView,
  Disposable,
  ProgressLocation,
  TextEditor,
  ColorThemeKind,
  window,
  Uri,
  Webview,
  CancellationToken,
  WebviewViewResolveContext,
  WebviewOptions,
} from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import { provideSingleton } from "../utils";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { readFileSync } from "fs";
import path = require("path");

interface DBTModel {
  name: string;
  aiEnabled: boolean;
}

@provideSingleton(AltimateActionsPanel)
export class AltimateActionsPanel implements WebviewViewProvider {
  public static readonly viewType = "dbtPowerUser.AltimateActions";
  private _panel: WebviewView | undefined = undefined;
  private model?: DBTModel;
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  private _disposables: Disposable[] = [];

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private altimateRequest: AltimateRequest,
    private telemetry: TelemetryService,
  ) {
    dbtProjectContainer.onManifestChanged((event) =>
      this.onManifestCacheChanged(event),
    );
    window.onDidChangeActiveColorTheme(
      async (e) => {
        if (this._panel) {
          this.updateGraphStyle();
        }
      },
      null,
      this._disposables,
    );
    window.onDidChangeActiveTextEditor(
      async (event: TextEditor | undefined) => {
        if (event === undefined) {
          return;
        }
        this.model = await this.getModel();
        if (this._panel) {
          this.transmitData();
          this.updateGraphStyle();
        }
      },
    );
  }

  private async getModel(): Promise<DBTModel | undefined> {
    if (window.activeTextEditor === undefined || this.eventMap === undefined) {
      return undefined;
    }

    const currentFilePath = window.activeTextEditor.document.uri;
    const project = this.dbtProjectContainer.findDBTProject(currentFilePath);
    if (project === undefined) {
      return undefined;
    }
    const event = this.eventMap.get(project.projectRoot.fsPath);
    if (event === undefined) {
      return undefined;
    }
    const modelName = path.basename(currentFilePath.fsPath, ".sql");
    const currentNode = event.nodeMetaMap.get(modelName);
    if (currentNode === undefined) {
      return undefined;
    }

    return {
      aiEnabled: this.altimateRequest.enabled(),
      name: modelName,
    } as DBTModel;
  }

  private async transmitConfig() {
    await this._panel!.webview.postMessage({
      command: "updateConfig",
      config: { aiEnabled: this.altimateRequest.enabled() },
    });
  }

  private async transmitData() {
    await this._panel!.webview.postMessage({
      command: "renderModel",
      model: this.model,
    });
  }

  private async transmitError() {
    await this._panel!.webview.postMessage({
      command: "renderError",
    });
  }

  private async transmitExplanation(explanation: string) {
    await this._panel!.webview.postMessage({
      command: "renderExplainQuery",
      explanation,
    });
  }

  private async updateGraphStyle() {
    const theme = [
      ColorThemeKind.Light,
      ColorThemeKind.HighContrastLight,
    ].includes(window.activeColorTheme.kind)
      ? "light"
      : "dark";
    await this._panel!.webview.postMessage({
      command: "setStylesByTheme",
      theme: theme,
    });
  }

  public async resolveWebviewView(
    panel: WebviewView,
    context: WebviewViewResolveContext,
    _token: CancellationToken,
  ) {
    this._panel = panel;
    this.setupWebviewOptions(context);
    this.renderWebviewView(context);
    this.setupWebviewHooks(context);
    this.transmitConfig();
    this.model = await this.getModel();
    this.transmitData();
    this.updateGraphStyle();
  }

  private renderWebviewView(context: WebviewViewResolveContext) {
    const webview = this._panel!.webview!;
    webview.html = getHtml(webview, this.dbtProjectContainer.extensionUri);
  }

  private setupWebviewOptions(context: WebviewViewResolveContext) {
    this._panel!.title = "";
    this._panel!.description = "Altimate Actions";
    this._panel!.webview.options = <WebviewOptions>{ enableScripts: true };
  }

  private setupWebviewHooks(context: WebviewViewResolveContext) {
    this._panel!.webview.onDidReceiveMessage(
      async (message) => {
        console.log(message);
        if (
          window.activeTextEditor === undefined ||
          this.eventMap === undefined
        ) {
          return undefined;
        }
        const queryText = window.activeTextEditor.document.getText();
        const currentFilePath = window.activeTextEditor.document.uri;
        const project =
          this.dbtProjectContainer.findDBTProject(currentFilePath);
        if (project === undefined) {
          return undefined;
        }
        switch (message.command) {
          case "explainQuery":
            this.telemetry.sendTelemetryEvent("altimateExplainQueryForModel");
            window.withProgress(
              {
                title: "Explain query",
                location: ProgressLocation.Notification,
                cancellable: false,
              },
              async () => {
                if (this.model === undefined) {
                  return;
                }
                try {
                  const compiledSql =
                    await project.unsafeCompileQuery(queryText);
                  const explanation = await this.altimateRequest.explainQuery({
                    compiled_sql: compiledSql!, // TODO: need to validate this properly
                  });

                  if (!explanation) {
                    // nothing to do if nothing happened
                    return;
                  }
                  this.transmitExplanation(explanation.explanation);
                } catch (error) {
                  this.transmitError();
                  window.showErrorMessage(
                    "An unexpected error occurred while getting the query explanation: " +
                      error,
                  );
                  this.telemetry.sendTelemetryError(
                    "altimateExplainQueryForModelError",
                    error,
                  );
                }
              },
            );
            break;
        }
      },
      null,
      this._disposables,
    );
  }

  private async onManifestCacheChanged(event: ManifestCacheChangedEvent) {
    event.added?.forEach((added) => {
      this.eventMap.set(added.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
    this.model = await this.getModel();
    if (this._panel) {
      this.transmitData();
      this.updateGraphStyle();
    }
  }
}

function getHtml(webview: Webview, extensionUri: Uri) {
  const indexPath = getUri(webview, extensionUri, [
    "altimate_actions",
    "index.html",
  ]);
  const resourceDir = getUri(webview, extensionUri, ["altimate_actions"]);
  const theme = [
    ColorThemeKind.Light,
    ColorThemeKind.HighContrastLight,
  ].includes(window.activeColorTheme.kind)
    ? "light"
    : "dark";
  return readFileSync(indexPath.fsPath)
    .toString()
    .replace(/__ROOT__/g, resourceDir.toString())
    .replace(/__THEME__/g, theme)
    .replace(/__NONCE__/g, getNonce())
    .replace(/__CSPSOURCE__/g, webview.cspSource);
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
  return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}
