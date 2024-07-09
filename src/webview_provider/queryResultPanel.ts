import {
  CancellationToken,
  ColorThemeKind,
  commands,
  env,
  ProgressLocation,
  Uri,
  ViewColumn,
  Webview,
  WebviewOptions,
  WebviewView,
  WebviewViewResolveContext,
  window,
  workspace,
} from "vscode";

import { readFileSync } from "fs";
import { PythonException } from "python-bridge";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  extendErrorWithSupportLinks,
  getFormattedDateTime,
  provideSingleton,
} from "../utils";
import { TelemetryService } from "../telemetry";
import { AltimateRequest } from "../altimate";
import {
  ExecuteSQLError,
  ExecuteSQLResult,
  QueryExecution,
} from "../dbt_client/dbtIntegration";
import { SharedStateService } from "../services/sharedStateService";
import {
  AltimateWebviewProvider,
  SendMessageProps,
  SharedStateEventEmitterProps,
} from "./altimateWebviewProvider";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { QueryManifestService } from "../services/queryManifestService";
import { UsersService } from "../services/usersService";

interface JsonObj {
  [key: string]: string | number | undefined;
}

enum QueryPanelViewType {
  DEFAULT,
  OPEN_RESULTS_IN_TAB,
  OPEN_RESULTS_FROM_HISTORY_BOOKMARKS,
}

enum OutboundCommand {
  RenderQuery = "renderQuery",
  RenderLoading = "renderLoading",
  RenderError = "renderError",
  InjectConfig = "injectConfig",
  ResetState = "resetState",
  GetContext = "getContext",
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
  aiEnabled: boolean;
}

enum InboundCommand {
  Info = "info",
  Error = "error",
  UpdateConfig = "updateConfig",
  OpenUrl = "openUrl",
  GetSummary = "getSummary",
  CancelQuery = "cancelQuery",
  SetContext = "setContext",
  GetQueryPanelContext = "getQueryPanelContext",
  GetQueryHistory = "getQueryHistory",
  ExecuteQuery = "executeQuery",
  GetQueryTabData = "getQueryTabData",
  RunAdhocQuery = "runAdhocQuery",
  ViewResultSet = "viewResultSet",
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
}

interface RecOpenUrl {
  url: string;
}

interface QueryHistory {
  rawSql: string;
  compiledSql: string;
  timestamp: number;
  duration: number;
  adapter: string;
  projectName: string;
  data: JsonObj[];
  columnNames: string[];
  columnTypes: string[];
}

@provideSingleton(QueryResultPanel)
export class QueryResultPanel extends AltimateWebviewProvider {
  public static readonly viewType = "dbtPowerUser.PreviewResults";
  protected viewPath = "/query-panel";
  protected panelDescription = "Query results panel";
  private _queryTabData: any;
  private _bottomPanel: WebviewView | undefined;

  private queryExecution?: QueryExecution;
  private incomingMessages: SendMessageProps[] = [];

  // stored only for current session, if user reloads or opens new workspace, this will be reset
  private _queryHistory: QueryHistory[] = [];

  public constructor(
    protected dbtProjectContainer: DBTProjectContainer,
    protected telemetry: TelemetryService,
    private altimate: AltimateRequest,
    private eventEmitterService: SharedStateService,
    protected dbtTerminal: DBTTerminal,
    protected queryManifestService: QueryManifestService,
    protected usersService: UsersService,
  ) {
    super(
      dbtProjectContainer,
      altimate,
      telemetry,
      eventEmitterService,
      dbtTerminal,
      queryManifestService,
      usersService,
    );
    this._disposables.push(
      workspace.onDidChangeConfiguration(
        (e) => {
          if (e.affectsConfiguration("dbt.enableQueryBookmarks")) {
            this.updateEnableBookmarksInContext();
            if (this._panel) {
              this.renderWebviewView(this._panel.webview);
            }
          }
        },
        this,
        this._disposables,
      ),
    );

    this.updateEnableBookmarksInContext();
  }

  private updateEnableBookmarksInContext() {
    // Setting this here to access it in package.json for enabling new file command
    commands.executeCommand(
      "setContext",
      "dbt.enableQueryBookmarks",
      workspace
        .getConfiguration("dbt")
        .get<boolean>("enableQueryBookmarks", false),
    );
  }

  private async createQueryResultsPanelVirtualDocument() {
    this.isWebviewReady = false;
    const webviewPanel = window.createWebviewPanel(
      QueryResultPanel.viewType,
      "query_result_" + getFormattedDateTime(),
      {
        viewColumn: ViewColumn.Active,
      },
      { enableScripts: true, retainContextWhenHidden: true },
    );
    this._panel = webviewPanel;
    this._webview = webviewPanel.webview;
    this.renderWebviewView(webviewPanel.webview);
    this.setupWebviewHooks();
    await this.checkIfWebviewReady();
  }

  private updateViewTypeToWebview(viewType: QueryPanelViewType) {
    this.sendResponseToWebview({
      command: "updateViewType",
      data: { type: viewType },
    });
  }

  protected async onEvent({ command, payload }: SharedStateEventEmitterProps) {
    switch (command) {
      case "executeQuery":
        this.executeQuery(
          payload.query as string,
          payload.fn as Promise<QueryExecution>,
          payload.projectName as string,
        );
        break;
      case "queryResultTab:render":
        this.dbtTerminal.debug(
          "queryResultTab:render",
          "rendering query result tab",
          payload,
        );
        this._queryTabData = payload.queryTabData;
        this.createQueryResultsPanelVirtualDocument();
        this.updateViewTypeToWebview(QueryPanelViewType.OPEN_RESULTS_IN_TAB);
        this.sendQueryTabViewEvent();
        break;
      default:
        super.onEvent({ command, payload });
    }
  }

  public async resolveWebviewView(
    panel: WebviewView,
    context: WebviewViewResolveContext,
    _token: CancellationToken,
  ) {
    this.updateViewTypeToWebview(QueryPanelViewType.DEFAULT);
    this._panel = panel;
    this._bottomPanel = panel;
    this._webview = panel.webview;
    this.bindWebviewOptions(context);
    this.renderWebviewView(panel.webview);
    this.setupWebviewHooks();
    this.transmitConfig();
    _token.onCancellationRequested(async () => {
      await this.transmitReset();
    });
    this.sendQueryPanelViewEvent();
    this._panel.onDidChangeVisibility(this.sendQueryPanelViewEvent);
  }

  /** Sets options, note that retainContextWhen hidden is set on registration */
  private bindWebviewOptions(context: WebviewViewResolveContext) {
    if (!this._panel) {
      return;
    }
    this._panel.title = "Query Results";
    if (this.isWebviewView(this._panel)) {
      this._panel.description = "Preview dbt SQL Results";
    }
    this._panel.webview.options = <WebviewOptions>{ enableScripts: true };
  }

  private async getProject(projectName?: string) {
    if (!projectName) {
      return this.queryManifestService.getOrPickProjectFromWorkspace();
    }

    const project = this.queryManifestService.getProjectByName(projectName);
    if (!project) {
      throw new Error("Unable to find project to execute query");
    }
    return project;
  }

  private async executeIncomingQuery(message: {
    query: string;
    projectName: string;
  }) {
    try {
      const isHistoryTab = Boolean(message.projectName);
      const project = await this.getProject(message.projectName);
      if (!project) {
        throw new Error("Unable to find project to execute query");
      }
      await this.createQueryResultsPanelVirtualDocument();
      this.updateViewTypeToWebview(
        QueryPanelViewType.OPEN_RESULTS_FROM_HISTORY_BOOKMARKS,
      );
      this.telemetry.sendTelemetryEvent(
        isHistoryTab ? "QueryHistoryExecuteSql" : "QueryBookmarkExecuteSql",
      );
      await project.executeSQL(message.query, "model");
      return;
    } catch (error) {
      window.showErrorMessage(
        extendErrorWithSupportLinks((error as Error).message),
      );
      this.dbtTerminal.error(
        "ExecuteSqlError",
        "Unable to execute query",
        error,
      );
    }
  }

  /** Primary interface for WebviewView inbound communication */
  private setupWebviewHooks() {
    this._panel!.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.command) {
          case InboundCommand.ViewResultSet:
            const queryHistoryData = message.queryHistory;
            this._queryTabData = {
              queryResults: {
                data: queryHistoryData.data,
                columnNames: queryHistoryData.columnNames,
                columnTypes: queryHistoryData.columnTypes,
              },
              compiledCodeMarkup: queryHistoryData.compiledSql,
              rawSql: queryHistoryData.rawSql,
              elapsedTime: {
                queryExecutionInfo: { elapsedTime: queryHistoryData.duration },
              },
            };
            this.createQueryResultsPanelVirtualDocument();
            this.updateViewTypeToWebview(
              QueryPanelViewType.OPEN_RESULTS_IN_TAB,
            );
            break;
          case InboundCommand.RunAdhocQuery:
            commands.executeCommand("dbtPowerUser.createSqlFile");
            break;
          case InboundCommand.ExecuteQuery:
            await this.executeIncomingQuery(message);
            break;
          case InboundCommand.GetQueryHistory:
            this.sendResponseToWebview({
              command: "queryHistory",
              data: this._queryHistory,
            });
            break;
          case InboundCommand.GetQueryTabData:
            this.sendResponseToWebview({
              command: "response",
              data: this._queryTabData,
              syncRequestId: message.syncRequestId,
            });
            // Reset only if opening query results in a tab using "Open in Tab" button
            if (this._queryTabData) {
              // reset to bottom panel
              this._panel = this._bottomPanel;
              this._queryTabData = undefined;
            }
            break;
          case InboundCommand.GetQueryPanelContext:
            const perspectiveTheme = workspace
              .getConfiguration("dbt")
              .get("perspectiveTheme", "Vintage");
            const queryBookmarksEnabled = workspace
              .getConfiguration("dbt")
              .get("enableQueryBookmarks", false);

            const limit = workspace
              .getConfiguration("dbt")
              .get<number>("queryLimit");
            await this._panel!.webview.postMessage({
              command: OutboundCommand.GetContext,
              limit,
              perspectiveTheme,
              queryBookmarksEnabled,
            });
            break;
          case InboundCommand.CancelQuery:
            if (this.queryExecution) {
              this.queryExecution.cancel();
            }
            await this.transmitReset();
            break;
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
            if ("perspectiveTheme" in configMessage) {
              workspace
                .getConfiguration("dbt")
                .update("perspectiveTheme", configMessage.perspectiveTheme);
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
          case InboundCommand.SetContext:
            this.dbtProjectContainer.setToGlobalState(
              message.key,
              message.value,
            );
            break;
          default:
            super.handleCommand(message);
        }
      },
      this,
      this._disposables,
    );
  }

  private sendQueryPanelViewEvent() {
    if (this._panel!.visible) {
      this.telemetry.sendTelemetryEvent("QueryPanelActive");
    }
  }

  private sendQueryTabViewEvent = () => {
    this.telemetry.sendTelemetryEvent("QueryTabActive");
  };

  /** Renders webview content */
  protected renderWebviewView(webview: Webview) {
    this._panel!.webview.html = super.getHtml(
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
    const result = {
      columnNames,
      columnTypes,
      rows,
      raw_sql,
      compiled_sql,
    };
    if (this._panel) {
      await this._panel.webview.postMessage({
        command: OutboundCommand.RenderQuery,
        ...(<RenderQuery>result),
      });
    }

    return result;
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
    if (this._panel) {
      this._panel.webview.postMessage({
        command: OutboundCommand.InjectConfig,
        ...(<InjectConfig>{
          limit,
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
      if (this.isWebviewReady) {
        await this._panel.webview.postMessage({
          command: OutboundCommand.RenderLoading,
        });
        return;
      }
    }

    this.incomingMessages.push({
      command: OutboundCommand.RenderLoading,
    });
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
    return await this.transmitData(
      result.table.column_names,
      result.table.column_types,
      rows,
      query,
      result.compiled_sql,
    );
  }

  private updateQueryHistory(
    result: {
      columnNames: string[];
      columnTypes: string[];
      rows: JsonObj[];
      raw_sql: string;
      compiled_sql: string;
    },
    projectName: string,
    query: string,
    duration: number,
  ) {
    const project = projectName
      ? this.queryManifestService.getProjectByName(projectName) // for queries executed from history and bookmarks tab
      : this.queryManifestService.getProject(); // queries executed from main window
    if (!project) {
      this.dbtTerminal.debug(
        "updateQueryHistory",
        "skipping query history update, no project found, may be executed from query history",
      );
      return;
    }
    this._queryHistory.unshift({
      rawSql: query,
      compiledSql: result.compiled_sql,
      timestamp: Date.now(),
      duration,
      adapter: project.getAdapterType(),
      projectName: project.getProjectName(),
      data: result.rows,
      columnNames: result.columnNames,
      columnTypes: result.columnTypes,
    });
    this._queryHistory = this._queryHistory.splice(0, 100);
    this._bottomPanel?.webview.postMessage({
      command: "queryHistory",
      args: {
        body: this._queryHistory,
        status: true,
      },
    });
  }

  /** Runs a query transmitting appropriate notifications to webview */
  public async executeQuery(
    query: string,
    queryExecutionPromise: Promise<QueryExecution>,
    projectName: string,
  ) {
    const start = Date.now();
    //using id to focus on the webview is more reliable than using the view title
    await commands.executeCommand("dbtPowerUser.PreviewResults.focus");
    if (this._panel && this.isWebviewView(this._panel)) {
      this._panel.show(); // Show the view
      this._panel.webview.postMessage({ command: "focus" }); // keyboard focus
    }
    this.transmitLoading();
    try {
      const queryExecution = (this.queryExecution =
        await queryExecutionPromise);
      const output = await queryExecution.executeQuery();
      const result = await this.transmitDataWrapper(output, query);
      this.updateQueryHistory(result, projectName, query, Date.now() - start);
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
      if (exc instanceof ExecuteSQLError) {
        window.showErrorMessage(
          "An error occured while trying to execute your query: " + exc.message,
        );
        await this.transmitError(
          {
            error: {
              code: -1,
              message: exc.message,
              data: JSON.stringify(exc.stack, null, 2),
            },
          },
          query,
          exc.compiled_sql,
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
      this._panel = this._bottomPanel;
    }
  }

  protected onWebviewReady() {
    super.onWebviewReady();

    if (!this._panel) {
      return;
    }

    while (this.incomingMessages.length) {
      const message = this.incomingMessages.pop();
      if (message) {
        this.sendResponseToWebview(message);
      }
    }
  }
}
