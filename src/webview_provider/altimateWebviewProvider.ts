import {
  CancellationToken,
  Disposable,
  env,
  Uri,
  Webview,
  WebviewOptions,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  window,
  workspace,
} from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import path = require("path");
import {
  ManifestCacheProjectAddedEvent,
  ManifestCacheChangedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { AltimateRequest } from "../altimate";
import { SharedStateService } from "../services/sharedStateService";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { QueryManifestService } from "../services/queryManifestService";

export type UpdateConfigProps = {
  key: string;
  value: string | boolean | number;
  isPreviewFeature?: boolean;
};

export interface HandleCommandProps extends Record<string, unknown> {
  command: string;
  syncRequestId?: string;
}

export interface SharedStateEventEmitterProps {
  command: string;
  payload: Record<string, unknown>;
}

interface SendMessageProps extends Record<string, unknown> {
  command: string;
  syncRequestId?: string;
  error?: string;
  data?: unknown;
}

/**
 * This class is responsible for rendering the webview
 * Each panel needs to have its own provider which extends this class with correct viewPath and description
 */
@provideSingleton(AltimateWebviewProvider)
export class AltimateWebviewProvider implements WebviewViewProvider {
  public viewType = "dbtPowerUser.Default";
  protected viewPath = "/"; // webview route path from AppRoutes.tsx
  protected panelDescription = "Altimate default webview";

  protected _panel: WebviewView | undefined = undefined;
  protected _disposables: Disposable[] = [];
  protected eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  // Flag to know if panel's webview is rendered and ready to receive message
  protected isWebviewReady = false;

  public constructor(
    protected dbtProjectContainer: DBTProjectContainer,
    protected altimateRequest: AltimateRequest,
    protected telemetry: TelemetryService,
    protected emitterService: SharedStateService,
    protected dbtTerminal: DBTTerminal,
    protected queryManifestService: QueryManifestService,
  ) {
    this._disposables.push(
      dbtProjectContainer.onManifestChanged((event) =>
        this.onManifestCacheChanged(event),
      ),
    );

    const t = this;
    this._disposables.push(
      emitterService.eventEmitter.event((d) =>
        t.onEvent(d as SharedStateEventEmitterProps),
      ),
    );
  }

  protected sendResponseToWebview({
    command,
    data,
    error,
    syncRequestId,
    ...rest
  }: SendMessageProps) {
    this._panel?.webview.postMessage({
      command,
      args: {
        syncRequestId,
        body: data,
        status: !error,
        error,
      },
      ...rest,
    });
  }

  protected onManifestCacheChanged(event: ManifestCacheChangedEvent): void {
    event.added?.forEach((added) => {
      this.eventMap.set(added.project.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
  }

  protected async onEvent({ command, payload }: SharedStateEventEmitterProps) {
    switch (command) {
      case "stream:chunk":
        this._panel!.webview.postMessage({
          command: "response",
          args: payload,
        });
        break;

      default:
        break;
    }
  }

  protected renderWebviewView(context: WebviewViewResolveContext) {
    const webview = this._panel!.webview!;
    this._panel!.webview.onDidReceiveMessage(this.handleCommand, this, []);

    webview.html = this.getHtml(webview, this.dbtProjectContainer.extensionUri);
  }

  // typegaurd to UpdateConfigProps
  private isUpdateConfigProps(
    data: UpdateConfigProps | Record<string, unknown>,
  ): data is UpdateConfigProps {
    return (data as UpdateConfigProps).key !== undefined;
  }

  protected onWebviewReady() {
    this.isWebviewReady = true;
  }
  protected async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...params } = message;

    try {
      switch (command) {
        case "openFile":
          workspace.openTextDocument(params.path as string).then((doc) => {
            window.showTextDocument(doc);
          });
          break;
        case "webview:ready":
          this.onWebviewReady();
          break;
        case "openURL":
          if (!params.url) {
            return;
          }
          env.openExternal(Uri.parse(params.url as string));
          break;
        case "datapilot:toggle":
          if (params.open) {
            this.emitterService.eventEmitter.fire({
              command: "datapilot:toggle",
              payload: params,
            });
          }
          break;
        case "datapilot:message":
          this.emitterService.eventEmitter.fire({
            command: "datapilot:message",
            payload: message,
          });
          break;
        case "validateCredentials":
          const isValid = await this.altimateRequest.handlePreviewFeatures();
          this._panel!.webview.postMessage({
            command: "response",
            args: {
              syncRequestId,
              body: {
                isValid,
              },
              status: true,
            },
          });
          break;
        case "sendTelemetryEvent":
          this.telemetry.sendTelemetryEvent(
            params.eventName as string,
            params.properties as { [key: string]: string },
            params.measurements as { [key: string]: number },
          );
          break;
        case "sendTelemetryError":
          this.telemetry.sendTelemetryError(
            params.eventName as string,
            params.error,
            params.properties as { [key: string]: string },
          );
          break;
        case "updateConfig":
          if (!this.isUpdateConfigProps(params)) {
            return;
          }
          this.dbtTerminal.debug(
            "altimateWebviewProvider:handleCommand",
            "Updating config",
            params,
          );
          // If config is for preview feature, then check keys
          const shouldUpdate =
            !params.isPreviewFeature ||
            this.altimateRequest.handlePreviewFeatures();
          if (shouldUpdate) {
            await workspace
              .getConfiguration("dbt")
              .update(params.key, params.value);
          }
          if (syncRequestId) {
            this._panel!.webview.postMessage({
              command: "response",
              args: {
                syncRequestId,
                body: {
                  updated: shouldUpdate,
                },
                status: true,
              },
            });
          }
          break;
        case "showInformationMessage":
          const { infoMessage, items } = params as {
            infoMessage: string;
            items: any[];
          };
          const result = await window.showInformationMessage(
            infoMessage,
            ...items,
          );
          if (syncRequestId) {
            this.sendResponseToWebview({
              command: "response",
              data: result,
              syncRequestId,
            });
          }
          break;
        case "findPackageVersion":
          this.sendResponseToWebview({
            command: "response",
            data: this.queryManifestService
              .getProject()
              ?.findPackageVersion(params.packageName as string),
            syncRequestId,
          });
          break;
        default:
          break;
      }
    } catch (err) {
      this.dbtTerminal.error(
        "altimateWebviewProvider:handleCommand",
        "error while handling command",
        err,
      );
    }
  }

  resolveWebviewView(
    panel: WebviewView,
    context: WebviewViewResolveContext<unknown>,
    _token: CancellationToken,
  ): void | Thenable<void> {
    this._panel = panel;
    this.setupWebviewOptions(context);
    this.renderWebviewView(context);
  }

  private setupWebviewOptions(context: WebviewViewResolveContext) {
    this._panel!.description = this.panelDescription;
    this._panel!.webview.options = <WebviewOptions>{
      enableScripts: true,
      localResourceRoots: [
        Uri.file(
          path.join(
            this.dbtProjectContainer.extensionUri.fsPath,
            "webview_panels",
            "dist",
            "assets",
          ),
        ),
      ],
    };
  }

  private getHtml(webview: Webview, extensionUri: Uri) {
    const indexJs = webview.asWebviewUri(
      Uri.file(
        path.join(
          extensionUri.fsPath,
          "webview_panels",
          "dist",
          "assets",
          "main.js",
        ),
      ),
    );
    const indexCss = webview.asWebviewUri(
      Uri.file(
        path.join(
          extensionUri.fsPath,
          "webview_panels",
          "dist",
          "assets",
          "main.css",
        ),
      ),
    );
    // const insightsCss = webview.asWebviewUri(
    //   Uri.file(
    //     path.join(
    //       extensionUri.fsPath,
    //       "webview_panels",
    //       "dist",
    //       "assets",
    //       "Insights.css",
    //     ),
    //   ),
    // );
    const codiconsUri = webview.asWebviewUri(
      Uri.joinPath(
        extensionUri,
        "webview_panels",
        "dist",
        "assets",
        "codicons",
        "codicon.css",
      ),
    );

    const nonce = getNonce();
    return `
        <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!--
              Use a content security policy to only allow loading images from https or from our extension directory,
              and only allow scripts that have a specific nonce.
              Added unsafe-inline for css due to csp issue: https://github.com/JedWatson/react-select/issues/4631
              -->
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src ${webview.cspSource}; style-src 'unsafe-inline' ${webview.cspSource}; img-src ${webview.cspSource} https: data:; script-src 'nonce-${nonce}';">
            <title>VSCode DBT Power user extension</title>
            <link rel="stylesheet" type="text/css" href="${indexCss}">
            <link rel="stylesheet" type="text/css" href="${codiconsUri}">
          </head>
      
          <body>
            <div id="root"></div>
            <script nonce="${nonce}" >
              window.viewPath = "${this.viewPath}";
            </script>
            
            <script nonce="${nonce}" type="module" src="${indexJs}"></script>
          </body>
        </html>
      `;
  }

  dispose() {
    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
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
