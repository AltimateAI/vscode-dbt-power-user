import {
  CancellationToken,
  commands,
  Disposable,
  env,
  Uri,
  Webview,
  WebviewOptions,
  WebviewPanel,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  window,
  workspace,
} from "vscode";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import path = require("path");
import {
  ManifestCacheProjectAddedEvent,
  ManifestCacheChangedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { AltimateRequest, UserInputError } from "../altimate";
import { SharedStateService } from "../services/sharedStateService";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { QueryManifestService } from "../services/queryManifestService";
import { PythonException } from "python-bridge";
import { UsersService } from "../services/usersService";
import { NotebookSchema } from "@lib";

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

export interface SendMessageProps extends Record<string, unknown> {
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

  protected _panel: WebviewView | WebviewPanel | undefined = undefined;
  protected _webview: Webview | undefined = undefined;
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
    protected usersService: UsersService,
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

  public isWebviewView(
    panel: WebviewPanel | WebviewView,
  ): panel is WebviewView {
    return (<WebviewView>panel).show !== undefined;
  }

  protected sendResponseToWebview({
    command,
    data,
    error,
    syncRequestId,
    ...rest
  }: SendMessageProps) {
    this._panel?.webview?.postMessage({
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

  /**
   * common method to trigger the command and handle errors and send response to webview
   * @param syncRequestId
   * @param callback
   * @param command
   */
  protected async handleSyncRequestFromWebview(
    syncRequestId: string | undefined,
    callback: () => any,
    command: string,
    showErrorNotification?: boolean,
  ) {
    try {
      const response = await callback();

      this.sendResponseToWebview({
        command: "response",
        syncRequestId,
        data: response,
      });
    } catch (error) {
      const message =
        error instanceof PythonException
          ? error.exception.message
          : (error as Error).message;
      if (error instanceof UserInputError) {
        this.dbtTerminal.debug(command, message, error);
      } else {
        this.dbtTerminal.error(command, message, error);
      }
      if (showErrorNotification) {
        window.showErrorMessage(extendErrorWithSupportLinks(message));
      }
      this.sendResponseToWebview({
        command: "response",
        syncRequestId,
        error: message,
      });
    }
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
        this.sendResponseToWebview({
          command: "response",
          syncRequestId: payload.syncRequestId as string | undefined,
          data: payload.body,
        });
        break;

      default:
        break;
    }
  }

  protected renderWebviewView(webview: Webview) {
    this._webview = webview;
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

  private async handleWarningMessage(
    params: {
      infoMessage: string;
      items: any[];
    },
    syncRequestId?: string,
  ) {
    const { infoMessage, items } = params;
    const result = await window.showWarningMessage(infoMessage, ...items);
    if (syncRequestId) {
      this.sendResponseToWebview({
        command: "response",
        data: result,
        syncRequestId,
      });
    }
  }

  protected async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...params } = message;

    try {
      switch (command) {
        case "configEnabled":
          this.handleSyncRequestFromWebview(
            syncRequestId,
            () => {
              return workspace
                .getConfiguration(params.section as string)
                .get(params.config as string);
            },
            command,
            true,
          );
          break;
        case "deleteNotebook":
          this.handleSyncRequestFromWebview(
            syncRequestId,
            () => {
              return this.altimateRequest.deleteNotebook(
                params.notebookId as number,
              );
            },
            command,
            true,
          );
          break;
        case "updateNotebook":
          this.handleSyncRequestFromWebview(
            syncRequestId,
            async () => {
              const { notebookId, name, data } = params as {
                notebookId: number;
                name: string;
                data?: NotebookSchema;
              };
              return await this.altimateRequest.updateNotebook(notebookId, {
                name,
                data,
              });
            },
            command,
            true,
          );
          break;
        case "openNewNotebook":
          commands.executeCommand(
            "dbtPowerUser.createDatapilotNotebook",
            params,
          );
          break;
        case "setToWorkspaceState":
          this.dbtProjectContainer.setToWorkspaceState(
            params.key as string,
            params.value,
          );
          break;
        case "openProblemsTab":
          commands.executeCommand("workbench.action.problems.focus");

          break;
        case "dbtdocsview:render":
          this.emitterService.fire({
            command: "dbtdocsview:render",
            payload: params,
          });
          break;
        case "getUsers":
          this.handleSyncRequestFromWebview(
            syncRequestId,
            () => {
              return this.usersService.users;
            },
            command,
            true,
          );
          break;
        case "getCurrentUser":
          this.handleSyncRequestFromWebview(
            syncRequestId,
            () => {
              return this.usersService.user;
            },
            command,
            true,
          );
          break;
        case "fetch":
          this.handleSyncRequestFromWebview(
            syncRequestId,
            () => {
              return this.altimateRequest.fetch(
                params.endpoint as string,
                params.fetchArgs as Record<string, unknown>,
              );
            },
            command,
            params.endpoint === "auth/tenant-info" ? false : true,
          );
          break;
        case "getProjectAdapterType":
          this.handleSyncRequestFromWebview(
            syncRequestId,
            () => {
              return this.queryManifestService.getProject()?.getAdapterType();
            },
            command,
          );
          break;
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
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: {
              isValid,
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
        case "setContext":
          this.dbtProjectContainer.setToGlobalState(
            params.key as string,
            params.value,
          );
          break;
        case "getFromContext":
          this.sendResponseToWebview({
            command: "response",
            data: this.dbtProjectContainer.getFromGlobalState(
              params.key as string,
            ),
            syncRequestId,
          });
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
            this.sendResponseToWebview({
              command: "response",
              syncRequestId,
              data: {
                updated: shouldUpdate,
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
        case "showErrorMessage":
          const args = params as {
            infoMessage: string;
            items: any[];
          };
          window.showErrorMessage(args.infoMessage, ...(args.items || []));
          break;
        case "showWarningMessage":
          this.handleWarningMessage(
            params as Parameters<typeof this.handleWarningMessage>["0"],
            syncRequestId,
          );
          break;
        case "findPackageVersion":
          this.handleSyncRequestFromWebview(
            syncRequestId,
            () => {
              try {
                return this.queryManifestService
                  .getProject()
                  ?.findPackageVersion(params.packageName as string);
              } catch (err) {
                this.dbtTerminal.debug(
                  "findPackageVersion",
                  (err as Error).message,
                );
              }
              return undefined;
            },
            command,
            false,
          );

          break;
        case "queryResultTab:render":
          this.emitterService.fire({
            command: "queryResultTab:render",
            payload: params,
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

  protected async checkIfWebviewReady() {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (this.isWebviewReady) {
          clearInterval(interval);
          resolve();
        }
      }, 500);
    });
  }

  resolveWebviewView(
    panel: WebviewView,
    context: WebviewViewResolveContext<unknown>,
    _token: CancellationToken,
  ): void | Thenable<void> {
    this._panel = panel;
    this.setupWebviewOptions(context);
    this.renderWebviewView(this._panel!.webview);
  }

  private setupWebviewOptions(context: WebviewViewResolveContext) {
    if (this._panel && "description" in this._panel) {
      this._panel.description = this.panelDescription;
    }
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

  protected getHtml(webview: Webview, extensionUri: Uri) {
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
    const SpinnerUrl = webview.asWebviewUri(
      Uri.file(
        path.join(
          extensionUri.fsPath,
          "webview_panels",
          "dist",
          "assets",
          "spinner.gif",
        ),
      ),
    );
    const LineageGif = webview.asWebviewUri(
      Uri.file(
        path.join(
          extensionUri.fsPath,
          "webview_panels",
          "dist",
          "assets",
          "lineage.gif",
        ),
      ),
    );
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
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; worker-src blob:; font-src ${webview.cspSource}; style-src 'unsafe-inline' ${webview.cspSource}; img-src ${webview.cspSource} https: data:; script-src 'unsafe-eval' 'nonce-${nonce}' https://*.vscode-resource.vscode-cdn.net; connect-src https://*.s3.amazonaws.com">
            <title>VSCode DBT Power user extension</title>
            <link rel="stylesheet" type="text/css" href="${indexCss}">
            <link rel="stylesheet" type="text/css" href="${codiconsUri}">
          </head>
      
          <body class="${this.viewPath.replace(/\//g, "")}">
            <div id="root"></div>
            <div id="sidebar"></div>
            <div id="modal"></div>
            <script nonce="${nonce}" >
              window.viewPath = "${this.viewPath}";
              var spinnerUrl = "${SpinnerUrl}"
              var lineageGif = "${LineageGif}"
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
