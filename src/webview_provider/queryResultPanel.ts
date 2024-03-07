import {
  CancellationToken,
  ColorThemeKind,
  commands,
  Disposable,
  env,
  ProgressLocation,
  Uri,
  Webview,
  WebviewOptions,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  window,
  workspace,
} from "vscode";

import { readFileSync } from "fs";
import { PythonException } from "python-bridge";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";
import { AltimateRequest } from "../altimate";
import { ExecuteSQLResult, QueryExecution } from "../dbt_client/dbtIntegration";
import { SharedStateService } from "../services/sharedStateService";

interface JsonObj {
  [key: string]: string | number | undefined;
}

enum OutboundCommand {
  RenderQuery = "renderQuery",
  RenderLoading = "renderLoading",
  RenderError = "renderError",
  InjectConfig = "injectConfig",
  ResetState = "resetState",
}

interface RenderQuery {
  columnNames: string[];
  columnTypes: string[];
  rows: JsonObj[];
  raw_sql: string;
  compiled_sql: string;
}

interface RenderError {
  error: any;
  raw_sql: string;
  compiled_sql: string;
}

interface InjectConfig {
  limit?: number;
  darkMode: boolean;
  enableNewQueryPanel: boolean;
  aiEnabled: boolean;
}

enum InboundCommand {
  Info = "info",
  Error = "error",
  UpdateConfig = "updateConfig",
  OpenUrl = "openUrl",
  GetSummary = "getSummary",
  CancelQuery = "cancelQuery",
}

interface RecInfo {
  text: string;
}

interface RecSummary {
  compiledSql: string;
}

interface RecError {
  text: string;
}

interface RecConfig {
  limit?: number;
  scale?: number;
  enableNewQueryPanel?: boolean;
}

interface RecOpenUrl {
  url: string;
}

@provideSingleton(QueryResultPanel)
export class QueryResultPanel implements WebviewViewProvider {
  public static readonly viewType = "dbtPowerUser.PreviewResults";

  private _disposables: Disposable[] = [];
  private _panel: WebviewView | undefined;
  private queryExecution?: QueryExecution;

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
    private altimate: AltimateRequest,
    private eventEmitterService: SharedStateService,
  ) {
    window.onDidChangeActiveColorTheme(
      (e) => {
        if (this._panel) {
          this._panel.webview.html = getHtml(
            this._panel.webview,
            this.dbtProjectContainer.extensionUri,
          );
          this.transmitConfig();
        }
      },
      null,
      this._disposables,
    );
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
    _token.onCancellationRequested(async () => {
      await this.transmitReset();
    });
  }

  /** Sets options, note that retainContextWhen hidden is set on registration */
  private setupWebviewOptions(context: WebviewViewResolveContext) {
    this._panel!.title = "Query Results";
    this._panel!.description = "Preview dbt SQL Results";
    this._panel!.webview.options = <WebviewOptions>{ enableScripts: true };
  }

  /** Primary interface for WebviewView inbound communication */
  private setupWebviewHooks(context: WebviewViewResolveContext) {
    this._panel!.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.command) {
          case InboundCommand.CancelQuery:
            if (this.queryExecution) {
              this.queryExecution.cancel();
            }
          case InboundCommand.Error:
            const error = message as RecError;
            window.showErrorMessage(error.text);
            break;
          case InboundCommand.Info:
            const info = message as RecInfo;
            window.withProgress(
              {
                title: info.text,
                location: ProgressLocation.Notification,
                cancellable: false,
              },
              async () => {
                await new Promise((timer) => setTimeout(timer, 3000));
              },
            );
            break;
          case InboundCommand.UpdateConfig:
            const configMessage = message as RecConfig;
            if (configMessage.limit !== undefined) {
              workspace
                .getConfiguration("dbt")
                .update("queryLimit", configMessage.limit);
            }
            if (configMessage.scale) {
              workspace
                .getConfiguration("dbt")
                .update("queryScale", configMessage.scale);
            }
            if ("enableNewQueryPanel" in configMessage) {
              workspace
                .getConfiguration("dbt")
                .update(
                  "enableNewQueryPanel",
                  configMessage.enableNewQueryPanel,
                );
            }
            break;
          case InboundCommand.OpenUrl:
            const config = message as RecOpenUrl;
            env.openExternal(Uri.parse(config.url));
            break;
          case InboundCommand.GetSummary:
            const summary = message as RecSummary;
            this.eventEmitterService.fire({
              command: "dbtPowerUser.summarizeQuery",
              payload: {
                query: summary.compiledSql,
              },
            });
            break;
        }
      },
      null,
      this._disposables,
    );
    const sendQueryPanelViewEvent = () => {
      if (this._panel!.visible) {
        this.telemetry.sendTelemetryEvent("QueryPanelActive");
      }
    };
    sendQueryPanelViewEvent();
    this._panel!.onDidChangeVisibility(sendQueryPanelViewEvent);
  }

  /** Renders webview content */
  private renderWebviewView(context: WebviewViewResolveContext) {
    const webview = this._panel!.webview!;
    this._panel!.webview.html = getHtml(
      webview,
      this.dbtProjectContainer.extensionUri,
    );
  }

  /** Sends query result data to webview */
  private async transmitData(
    columnNames: string[],
    columnTypes: string[],
    rows: JsonObj[],
    raw_sql: string,
    compiled_sql: string,
  ) {
    if (this._panel) {
      await this._panel.webview.postMessage({
        command: OutboundCommand.RenderQuery,
        ...(<RenderQuery>{
          columnNames,
          columnTypes,
          rows,
          raw_sql,
          compiled_sql,
        }),
      });
    }
  }

  /** Sends error result data to webview */
  private async transmitError(
    error: any,
    raw_sql: string,
    compiled_sql: string,
  ) {
    if (this._panel) {
      // TODO: telemetry
      await this._panel.webview.postMessage({
        command: OutboundCommand.RenderError,
        ...(<RenderError>{ ...error, raw_sql, compiled_sql }),
      });
    }
  }

  /** Sends VSCode config data to webview */
  private transmitConfig() {
    const limit = workspace.getConfiguration("dbt").get<number>("queryLimit");
    const enableNewQueryPanel = workspace
      .getConfiguration("dbt")
      .get<boolean>("enableNewQueryPanel", true);
    if (this._panel) {
      this._panel.webview.postMessage({
        command: OutboundCommand.InjectConfig,
        ...(<InjectConfig>{
          limit,
          enableNewQueryPanel,
          darkMode: ![
            ColorThemeKind.Light,
            ColorThemeKind.HighContrastLight,
          ].includes(window.activeColorTheme.kind),
          aiEnabled: this.altimate.enabled(),
        }),
      });
    }
  }

  /** Sends VSCode render loading command to webview */
  private async transmitLoading() {
    if (this._panel) {
      await this._panel.webview.postMessage({
        command: OutboundCommand.RenderLoading,
      });
    }
  }

  /** Sends VSCode clear state command */
  private async transmitReset() {
    if (this._panel) {
      await this._panel.webview.postMessage({
        command: OutboundCommand.ResetState,
      });
    }
  }

  /** A wrapper for {@link transmitData} which converts server
   * results interface ({@link ExecuteSQLResult}) to what the webview expects */
  private async transmitDataWrapper(result: ExecuteSQLResult, query: string) {
    const rows: JsonObj[] = [];
    // Convert compressed array format to dict[]
    for (let i = 0; i < result.table.rows.length; i++) {
      result.table.rows[i].forEach((value: any, j: any) => {
        rows[i] = { ...rows[i], [result.table.column_names[j]]: value };
      });
    }
    await this.transmitData(
      result.table.column_names,
      result.table.column_types,
      rows,
      query,
      result.compiled_sql,
    );
  }

  /** Runs a query transmitting appropriate notifications to webview */
  public async executeQuery(
    query: string,
    queryExecutionPromise: Promise<QueryExecution>,
  ) {
    //using id to focus on the webview is more reliable than using the view title
    await commands.executeCommand("dbtPowerUser.PreviewResults.focus");
    if (this._panel) {
      this._panel.show(); // Show the view
      this._panel.webview.postMessage({ command: "focus" }); // keyboard focus
      this.transmitLoading();
    }
    try {
      const queryExecution = (this.queryExecution =
        await queryExecutionPromise);
      const output = await queryExecution.executeQuery();
      await this.transmitDataWrapper(output, query);
    } catch (exc: any) {
      if (exc instanceof PythonException) {
        if (exc.exception.type.name === "KeyboardInterrupt") {
          // query cancellation
          this.transmitReset();
          return;
        }
        window.showErrorMessage(
          "An error occured while trying to execute your query: " +
            exc.exception.message,
        );
        await this.transmitError(
          {
            error: {
              code: -1,
              message: exc.exception.message,
              data: JSON.stringify(exc.stack, null, 2),
            },
          },
          query,
          query,
        );
        return;
      }
      await this.transmitError(
        {
          error: { code: -1, message: `${exc}`, data: {} },
        },
        query,
        query,
      );
    } finally {
      this.queryExecution = undefined;
    }
  }
}

/** Gets webview HTML */
function getHtml(webview: Webview, extensionUri: Uri) {
  const indexPath = getUri(webview, extensionUri, [
    "query_panel",
    "index.html",
  ]);
  const resourceDir = getUri(webview, extensionUri, ["query_panel"]);
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
