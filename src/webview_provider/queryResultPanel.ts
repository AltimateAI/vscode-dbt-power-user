import {
  CancellationToken,
  ColorThemeKind,
  commands,
  Disposable,
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
import { ExecuteSQLResult } from "../manifest/dbtProject";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { TelemetryService } from "../telemetry";

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
  columns: JsonObj[];
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
  enableNewQueryPanel: boolean;
  darkMode: boolean;
}

enum InboundCommand {
  Info = "info",
  Error = "error",
  UpdateConfig = "updateConfig",
}

interface RecInfo {
  text: string;
}

interface RecError {
  text: string;
}

interface RecConfig {
  limit?: number;
  scale?: number;
  enableNewQueryPanel?: boolean;
}

@provideSingleton(QueryResultPanel)
export class QueryResultPanel implements WebviewViewProvider {
  public static readonly viewType = "dbtPowerUser.PreviewResults";

  private _disposables: Disposable[] = [];
  private _panel: WebviewView | undefined;

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
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
            const config = message as RecConfig;
            if (config.limit) {
              workspace
                .getConfiguration("dbt")
                .update("queryLimit", config.limit);
            }
            if (config.scale) {
              workspace
                .getConfiguration("dbt")
                .update("queryScale", config.scale);
            }
            if ("enableNewQueryPanel" in config) {
              workspace
                .getConfiguration("dbt")
                .update("enableNewQueryPanel", config.enableNewQueryPanel);
            }
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
    columns: JsonObj[],
    rows: JsonObj[],
    raw_sql: string,
    compiled_sql: string,
  ) {
    if (this._panel) {
      await this._panel.webview.postMessage({
        command: OutboundCommand.RenderQuery,
        ...(<RenderQuery>{ columns, rows, raw_sql, compiled_sql }),
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
      .get<boolean>("enableNewQueryPanel", false);
    const queryTemplate = workspace
      .getConfiguration("dbt")
      .get<string>(
        "queryTemplate",
        "select * from ({query}) as query limit {limit}",
      );
    if (this._panel) {
      this._panel.webview.postMessage({
        command: OutboundCommand.InjectConfig,
        ...(<InjectConfig>{
          limit,
          queryTemplate,
          enableNewQueryPanel,
          darkMode: ![
            ColorThemeKind.Light,
            ColorThemeKind.HighContrastLight,
          ].includes(window.activeColorTheme.kind),
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
    let columns: JsonObj[] = [];
    const rows: JsonObj[] = [];
    // Convert compressed array format to dict[]
    for (let i = 0; i < result.table.rows.length; i++) {
      result.table.rows[i].forEach((value: any, j: any) => {
        rows[i] = { ...rows[i], [result.table.column_names[j]]: value };
      });
    }
    // Define column spec for Tabulator
    result.table.column_names.forEach((def: any) => {
      columns = [...columns, { title: def, field: def }];
    });
    await this.transmitData(columns, rows, query, result.compiled_sql);
  }

  /** Runs a query transmitting appropriate notifications to webview */
  public async executeQuery(
    query: string,
    queryExecution: Promise<ExecuteSQLResult>,
  ) {
    //using id to focus on the webview is more reliable than using the view title
    await commands.executeCommand("dbtPowerUser.PreviewResults.focus");
    if (this._panel) {
      this._panel.show(); // Show the view
      this._panel.webview.postMessage({ command: "focus" }); // keyboard focus
      this.transmitLoading();
    }
    try {
      const output = await queryExecution;
      await this.transmitDataWrapper(output, query);
    } catch (exc: any) {
      if (exc instanceof PythonException) {
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
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Encountered an unknown issue: " + exc.message + ".",
        ),
      );
      await this.transmitError(
        {
          error: { code: -1, message: exc.message, data: {} },
        },
        query,
        query,
      );
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
