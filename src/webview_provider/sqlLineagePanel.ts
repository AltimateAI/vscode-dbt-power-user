import { readFileSync, writeFileSync } from "fs";
import * as path from "path";
import {
  CancellationToken,
  ColorThemeKind,
  ProgressLocation,
  TextEditor,
  Uri,
  Webview,
  WebviewOptions,
  WebviewView,
  WebviewViewResolveContext,
  window,
  WebviewViewProvider,
  Disposable,
  WebviewPanel,
} from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";
import { DBTTerminal } from "../dbt_client/dbtTerminal";

@provideSingleton(SQLLineagePanel)
export class SQLLineagePanel implements Disposable {
  public static readonly viewType = "dbtPowerUser.SQLLineage";
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  private disposables: Disposable[] = [];

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private altimate: AltimateRequest,
    private telemetry: TelemetryService,
    private terminal: DBTTerminal,
    private _panel: WebviewPanel,
  ) {
    this.disposables.push(
      dbtProjectContainer.onManifestChanged((event) =>
        this.onManifestCacheChanged(event),
      ),
    );
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.eventMap.set(added.project.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
  }

  changedActiveColorTheme() {
    if (!this._panel) {
      return;
    }
    const theme = [
      ColorThemeKind.Light,
      ColorThemeKind.HighContrastLight,
    ].includes(window.activeColorTheme.kind)
      ? "light"
      : "dark";
    this._panel.webview.postMessage({
      command: "setTheme",
      args: { theme },
    });
  }

  init() {
    this.changedActiveColorTheme();
    this.render();
  }

  private async render() {
    this._panel?.webview.postMessage({
      command: "loading",
      args: {},
    });
    window.withProgress(
      {
        title: "Retrieving SQL lineage",
        location: ProgressLocation.Notification,
        cancellable: false,
      },
      async (_, token) => {
        const lineage = await this.getSQLLineage(token);
        console.log(lineage);
        this._panel?.webview.postMessage({
          command: "render",
          args: lineage,
        });
      },
    );
  }

  private getEvent(): ManifestCacheProjectAddedEvent | undefined {
    if (window.activeTextEditor === undefined || this.eventMap === undefined) {
      return;
    }

    const currentFilePath = window.activeTextEditor.document.uri;
    const projectRootpath =
      this.dbtProjectContainer.getProjectRootpath(currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }

    const event = this.eventMap.get(projectRootpath.fsPath);
    if (event === undefined) {
      return;
    }
    return event;
  }

  private getFilename() {
    return path.basename(window.activeTextEditor!.document.fileName, ".sql");
  }

  private getProject() {
    const currentFilePath = window.activeTextEditor?.document.uri;
    if (!currentFilePath) {
      return;
    }
    return this.dbtProjectContainer.findDBTProject(currentFilePath);
  }

  private getMissingLineageMessage() {
    const message =
      "A valid dbt file (model, seed etc.) needs to be open and active in the editor area above to view lineage";
    try {
      this.getProject()?.throwDiagnosticsErrorIfAvailable();
    } catch (err) {
      return { message: (err as Error).message, type: "error" };
    }

    return { message, type: "warning" };
  }

  private async getSQLLineage(token: CancellationToken) {
    const event = this.getEvent();
    if (!event) {
      return {
        errorMessage: this.getMissingLineageMessage(),
      };
    }
    const { graphMetaMap, nodeMetaMap } = event;
    const project = this.getProject();
    if (!project) {
      return { errorMessage: "Unable to find the project" };
    }
    const modelName = this.getFilename();
    const compiledSQL = await project.compileNode(modelName);
    if (!compiledSQL) {
      return { errorMessage: "Unable to compile sql" };
    }
    const modelId = nodeMetaMap.get(modelName)?.uniqueId;
    if (!modelId) {
      return { errorMessage: "Unable to find model" };
    }
    const modelsToFetch =
      graphMetaMap.parents.get(modelId)?.nodes?.map((n) => n.key) || [];
    const { mappedNode } = await project.getNodesWithDBColumns(
      event,
      modelsToFetch,
      token,
    );
    const response = await this.altimate.sqlLineage({
      compiled_sql: compiledSQL,
      model_info: modelsToFetch.map((n) => ({ model_node: mappedNode[n] })),
      model_dialect: project.getAdapterType(),
    });
    return response;
  }

  resolveWebviewView(): void | Thenable<void> {
    this.terminal.debug(
      "sqlLineagePanel:resolveWebviewView",
      "onResolveWebviewView",
    );
    this.setupWebviewOptions();
    this.renderWebviewView();
    this.init();
  }

  private setupWebviewOptions() {
    this._panel!.webview.options = <WebviewOptions>{ enableScripts: true };
  }

  private renderWebviewView() {
    const webview = this._panel!.webview!;
    this._panel!.webview.html = getHtml(
      webview,
      this.dbtProjectContainer.extensionUri,
    );
  }
}

/** Gets webview HTML */
function getHtml(webview: Webview, extensionUri: Uri) {
  const indexJs = getUri(webview, extensionUri, [
    "new_lineage_panel",
    "dist",
    "assets",
    "index.js",
  ]);
  const resourceDir = getUri(webview, extensionUri, [
    "new_lineage_panel",
    "dist",
  ]).toString();
  replaceInFile(indexJs, "/__ROOT__/", resourceDir + "/");
  const indexPath = getUri(webview, extensionUri, [
    "new_lineage_panel",
    "dist",
    "index.html",
  ]);
  return readFileSync(indexPath.fsPath)
    .toString()
    .replace(/\/__ROOT__/g, resourceDir)
    .replace(/__ROOT__/g, resourceDir)
    .replace(/__NONCE__/g, getNonce())
    .replace(/__CSPSOURCE__/g, webview.cspSource)
    .replace(/__LINEAGE_TYPE__/g, "static");
}

/** Used to enforce a secure CSP */
function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/** Utility method for generating webview Uris for resources */
function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
  return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}

async function replaceInFile(
  filename: Uri,
  searchString: string,
  replacementString: string,
) {
  const contents = readFileSync(filename.fsPath, "utf8");
  const replacedContents = contents.replace(searchString, replacementString);
  writeFileSync(filename.fsPath, replacedContents, "utf8");
}
