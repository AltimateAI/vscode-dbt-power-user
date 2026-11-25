import {
  CancellationToken,
  ColorThemeKind,
  commands,
  env,
  ProgressLocation,
  Range,
  Uri,
  ViewColumn,
  Webview,
  WebviewOptions,
  WebviewView,
  WebviewViewResolveContext,
  window,
  workspace,
} from "vscode";

import {
  DBTTerminal,
  ExecuteSQLError,
  ExecuteSQLResult,
  PythonException,
  QueryExecution,
} from "@altimateai/dbt-integration";
import { inject } from "inversify";
import { AltimateRequest } from "../altimate";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { AltimateAuthService } from "../services/altimateAuthService";
import { AltimateCodeChatService } from "../services/altimateCodeChatService";
import { QueryManifestService } from "../services/queryManifestService";
import { SharedStateService } from "../services/sharedStateService";
import { UsersService } from "../services/usersService";
import { TelemetryService } from "../telemetry";
import { TelemetryEvents } from "../telemetry/events";
import { extendErrorWithSupportLinks, getFormattedDateTime } from "../utils";
import {
  AltimateWebviewProvider,
  SendMessageProps,
  SharedStateEventEmitterProps,
} from "./altimateWebviewProvider";
import { toElapsedSeconds } from "./queryElapsedTime";
import {
  buildCappedRows,
  evictToBudget,
  totalPayloadChars,
} from "./queryResultPayload";
import path = require("path");

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
  // Seconds the query took, as measured here; the header shows it.
  elapsedTime?: number;
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
  CollectQueryResultsDebugInfo = "collectQueryResultsDebugInfo",
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
  ExecuteQueryFromActiveWindow = "executeQueryFromActiveWindow",
  GetQueryTabData = "getQueryTabData",
  RunAdhocQuery = "runAdhocQuery",
  ViewResultSet = "viewResultSet",
  OpenCodeInEditor = "openCodeInEditor",
  ClearQueryHistory = "clearQueryHistory",
  TroubleshootWithAltimate = "troubleshootWithAltimate",
  OpenAltimateCodeChat = "openAltimateCodeChat",
  ExplainWithAltimate = "explainWithAltimate",
  ProfileQueryWithAltimate = "profileQueryWithAltimate",
}

interface RecInfo {
  text: string;
}

interface RecSummary {
  compiledSql: string;
}

interface RecTroubleshoot {
  compiledSql: string;
  rawSql: string;
  errorMessage: string;
  fileName?: string;
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
  data?: JsonObj[];
  columnNames: string[];
  columnTypes: string[];
  modelName: string;
  /** Serialized size of `data`, counted when the result was built. */
  payloadChars?: number;
}

// Pick a backtick fence long enough to survive any backtick sequence inside the
// payload, so user-supplied SQL or error messages can't prematurely terminate
// the Markdown code block we embed in the chat prompt.
function fenceCodeBlock(content: string, language = ""): string {
  const safe = content ?? "";
  let fenceLength = 3;
  const match = safe.match(/`{3,}/g);
  if (match) {
    for (const run of match) {
      if (run.length >= fenceLength) {
        fenceLength = run.length + 1;
      }
    }
  }
  const fence = "`".repeat(fenceLength);
  return `${fence}${language}\n${safe}\n${fence}`;
}

// Where a run's render messages go: the bottom view, or the webview of the tab
// a Query History or Bookmark "Execute" opened for that run.
type Destination = "bottom" | Webview;

export class QueryResultPanel extends AltimateWebviewProvider {
  public static readonly viewType = "dbtPowerUser.PreviewResults";
  protected viewPath = "/query-panel";
  protected panelDescription = "Query results panel";
  private _queryTabData: any;
  // The result each tab opened with ("Open in Tab", a history entry), which
  // its data request gets whenever the tab asks.
  private tabResults = new WeakMap<Webview, unknown>();
  private _bottomPanel: WebviewView | undefined;

  private queryExecution?: QueryExecution;
  // How render messages (loading, rows, error, reset) are routed:
  // - A run's destination comes with it and is fixed when it starts: the tab
  //   a Query History or Bookmark "Execute" opened for it, or otherwise the
  //   bottom view. An "Open in Tab" panel is never one; it shows the result it
  //   asks for when it loads.
  // - Each webview is ready once its own script reports `webview:ready`.
  // - Each destination has its own queue: a message waits there until the
  //   destination's webview is ready, then all go out in the order sent. The
  //   bottom view's queue belongs to the view, not to a webview, so a webview
  //   that replaces another (the view closed and opened again) takes it. A
  //   closed tab gets nothing more.
  // - Nothing is re-aimed at another destination or reordered.
  private bottomQueue: SendMessageProps[] = [];
  private tabQueues = new WeakMap<Webview, SendMessageProps[]>();
  private readyWebviews = new WeakSet<Webview>();
  // Read when the bottom view resolves: a disposed view's `webview` throws.
  private bottomWebview?: Webview;

  // stored only for current session, if user reloads or opens new workspace, this will be reset
  private _queryHistory: QueryHistory[] = [];

  public constructor(
    protected dbtProjectContainer: DBTProjectContainer,
    protected telemetry: TelemetryService,
    private altimate: AltimateRequest,
    private eventEmitterService: SharedStateService,
    @inject("DBTTerminal")
    protected dbtTerminal: DBTTerminal,
    protected queryManifestService: QueryManifestService,
    protected usersService: UsersService,
    protected altimateAuthService: AltimateAuthService,
    altimateCodeChatService: AltimateCodeChatService,
  ) {
    super(
      dbtProjectContainer,
      altimate,
      telemetry,
      eventEmitterService,
      dbtTerminal,
      queryManifestService,
      usersService,
      altimateAuthService,
      altimateCodeChatService,
    );
    this._disposables.push(
      window.onDidChangeActiveTextEditor(() => {
        // to reset the limit on editor change
        this.sendUpdatedContextToWebview();
      }),
      workspace.onDidChangeConfiguration(
        (e) => {
          if (e.affectsConfiguration("dbt.disableQueryHistory")) {
            if (this._panel) {
              this.renderWebviewView(this._panel.webview);
            }
          }
          if (e.affectsConfiguration("dbt.enableNotebooks")) {
            this.updateEnableNotebooksInContext();
            const event = workspace
              .getConfiguration("dbt")
              .get<boolean>("enableNotebooks", false)
              ? "NotebooksEnabled"
              : "NotebooksDisabled";
            this.telemetry.sendTelemetryEvent(event);
          }
        },
        this,
        this._disposables,
      ),
    );

    this.updateEnableNotebooksInContext();
    this._disposables.push(
      commands.registerCommand(
        "dbtPowerUser.collectQueryResultsDebugInfo",
        () => this.collectQueryResultsDebugInfo(),
      ),
      this,
    );
  }

  /** Sends the query limit, theme and active editor to `to` (by default, the
   * current panel's webview). */
  private async sendUpdatedContextToWebview(
    to: Webview | undefined = this._panel?.webview,
  ) {
    const perspectiveTheme = workspace
      .getConfiguration("dbt")
      .get("perspectiveTheme", "Vintage");
    const queryHistoryDisabled = workspace
      .getConfiguration("dbt")
      .get("disableQueryHistory", false);

    // `dbt.queryLimit` is per project: show the active file's.
    const limit = workspace
      .getConfiguration("dbt", window.activeTextEditor?.document.uri)
      .get<number>("queryLimit");
    await to?.postMessage({
      command: OutboundCommand.GetContext,
      limit,
      perspectiveTheme,
      queryHistoryDisabled,
      activeEditor: {
        query: window.activeTextEditor?.document.getText(),
        filepath: window.activeTextEditor?.document.uri.fsPath,
      },
    });
  }

  private collectQueryResultsDebugInfo() {
    console.log("Collecting query results debug info");
    this._panel?.webview?.postMessage({
      command: "collectQueryResultsDebugInfo",
    });
  }

  private updateEnableNotebooksInContext() {
    // Setting this here to access it in package.json for enabling new file command
    commands.executeCommand(
      "setContext",
      "dbt.enableNotebooks",
      workspace.getConfiguration("dbt").get<boolean>("enableNotebooks", false),
    );
  }

  /** Opens a Query Results tab and waits for it to load; returns its webview. */
  private async createQueryResultsPanelVirtualDocument(
    editorName: string,
  ): Promise<Webview> {
    this.isWebviewReady = false;
    const webviewPanel = window.createWebviewPanel(
      QueryResultPanel.viewType,
      editorName + "_" + getFormattedDateTime(),
      {
        viewColumn: ViewColumn.Active,
      },
      { enableScripts: true, retainContextWhenHidden: true },
    );
    this._panel = webviewPanel;
    const tabWebview = webviewPanel.webview;
    this._webview = tabWebview;
    if (this._queryTabData) {
      this.tabResults.set(tabWebview, this._queryTabData);
      this._queryTabData = undefined;
    }
    // A closed tab gets nothing more: point the panel back at the bottom view
    // if it still points here, and drop what was waiting for the tab.
    webviewPanel.onDidDispose(
      () => {
        if (this._panel === webviewPanel) {
          this._panel = this._bottomPanel;
        }
        this.readyWebviews.delete(tabWebview);
        this.tabQueues.delete(tabWebview);
      },
      null,
      this._disposables,
    );
    this.renderWebviewView(tabWebview);
    this.setupWebviewHooks();
    await this.checkIfWebviewReady();
    return tabWebview;
  }

  private updateViewTypeToWebview(viewType: QueryPanelViewType, to?: Webview) {
    this.sendResponseToWebview(
      {
        command: "updateViewType",
        data: { type: viewType },
      },
      to,
    );
  }

  protected async onEvent({ command, payload }: SharedStateEventEmitterProps) {
    switch (command) {
      case "executeQuery":
        this.executeQuery(
          payload.query as string,
          payload.fn as Promise<QueryExecution>,
          payload.projectName as string,
          (payload.tab as Webview | undefined) ?? "bottom",
        );
        break;
      case "queryResultTab:render":
        this.dbtTerminal.debug(
          "queryResultTab:render",
          "rendering query result tab",
          payload,
        );
        this._queryTabData = payload.queryTabData;
        this.createQueryResultsPanelVirtualDocument("Query results");
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
    this.bottomWebview = panel.webview;
    this.bindWebviewOptions(context);
    this.renderWebviewView(panel.webview);
    this.setupWebviewHooks();
    this.transmitConfig();
    _token.onCancellationRequested(async () => {
      await this.transmitReset("bottom");
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
    editorName: string;
    limit: number;
  }) {
    try {
      const isHistoryTab = Boolean(message.projectName);
      const project = await this.getProject(message.projectName);
      if (!project) {
        throw new Error("Unable to find project to execute query");
      }
      const tab = message.editorName
        ? await this.createQueryResultsPanelVirtualDocument(message.editorName)
        : undefined;
      this.updateViewTypeToWebview(
        QueryPanelViewType.OPEN_RESULTS_FROM_HISTORY_BOOKMARKS,
        tab,
      );
      this.telemetry.sendTelemetryEvent(
        isHistoryTab ? "QueryHistoryExecuteSql" : "QueryBookmarkExecuteSql",
      );
      // The run shows in the tab opened for it.
      if (message.limit) {
        await project.executeSQLWithLimitOnQueryPanel(
          message.query,
          "",
          message.limit,
          "inline",
          undefined,
          tab,
        );
      } else {
        await project.executeSQLOnQueryPanel(
          message.query,
          "",
          "inline",
          undefined,
          tab,
        );
      }
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

  private async handleOpenCodeInEditor(message: {
    code: string;
    name: string;
  }) {
    commands.executeCommand("dbtPowerUser.createSqlFile", {
      code: message?.code,
      name: message?.name,
    });
  }

  /** Primary interface for WebviewView inbound communication */
  private setupWebviewHooks() {
    const webview = this._panel!.webview;
    webview.onDidReceiveMessage(
      async (message) => {
        switch (message.command) {
          case "webview:ready":
            this.readyWebviews.add(webview);
            super.handleCommand(message, webview);
            this.sendQueued(webview);
            break;
          // Incase of error in rendering perspective viewer query results, user can click button
          // to disable query history and retry
          case InboundCommand.ClearQueryHistory:
            this.telemetry.sendTelemetryError(
              TelemetryEvents["QueryHistory/ClearError"],
              message.error,
            );
            this._queryHistory = [];
            this.sendResponseToWebview(
              {
                command: "response",
                data: {},
                syncRequestId: message.syncRequestId,
              },
              webview,
            );
            break;
          case InboundCommand.OpenCodeInEditor:
            this.handleOpenCodeInEditor(message);
            break;
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
            this.createQueryResultsPanelVirtualDocument(
              message.editorName || "Custom query",
            );
            this.updateViewTypeToWebview(
              QueryPanelViewType.OPEN_RESULTS_IN_TAB,
            );
            break;
          case InboundCommand.RunAdhocQuery:
            commands.executeCommand("dbtPowerUser.createSqlFile", {});
            break;
          case InboundCommand.ExecuteQueryFromActiveWindow:
            await this.executeQueryFromActiveWindow(message);
            break;
          case InboundCommand.ExecuteQuery:
            await this.executeIncomingQuery(message);
            break;
          case InboundCommand.GetQueryHistory:
            this.sendResponseToWebview(
              {
                command: "queryHistory",
                data: this._queryHistory,
              },
              webview,
            );
            break;
          case InboundCommand.GetQueryTabData: {
            // Answered to the webview that asks, with its own result: a tab
            // hidden as it opened may load only once shown, when the panel
            // points elsewhere.
            const tabResult = this.tabResults.get(webview);
            this.sendResponseToWebview(
              {
                command: "response",
                data: tabResult,
                syncRequestId: message.syncRequestId,
              },
              webview,
            );
            // A tab with a result has loaded: back to the bottom view.
            if (tabResult) {
              this._panel = this._bottomPanel;
            }
            break;
          }
          case InboundCommand.GetQueryPanelContext:
            {
              await this.sendUpdatedContextToWebview(webview);
            }
            break;
          case InboundCommand.CancelQuery:
            if (this.queryExecution) {
              this.queryExecution.cancel();
            }
            // The view whose Cancel was clicked leaves its loading state.
            await this.transmitReset(
              webview === this.bottomWebview ? "bottom" : webview,
            );
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
              // Saved to the active file's folder (the workspace when only one
              // folder is open), so that file's next query uses it.
              const activeUri = window.activeTextEditor?.document.uri;
              const folder =
                activeUri && workspace.getWorkspaceFolder(activeUri);
              workspace
                .getConfiguration("dbt", folder?.uri)
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
          case InboundCommand.OpenAltimateCodeChat:
            try {
              await commands.executeCommand("altimate.openChat");
            } catch (err) {
              window.showErrorMessage(
                "Altimate Code is not available. Install the Datamates extension to use chat.",
              );
            }
            break;
          case InboundCommand.GetSummary: {
            const summary = message as RecSummary;
            const initialMessage = `Explain this query:\n\n${fenceCodeBlock(
              summary.compiledSql,
              "sql",
            )}`;
            const opened = await this.altimateCodeChatService.openChat({
              initialMessage,
              title: "Explain query",
            });
            if (opened) {
              this.telemetry.sendTelemetryEvent("SummarizeQueryWithAltimate");
            }
            break;
          }
          case InboundCommand.TroubleshootWithAltimate: {
            const troubleshoot = message as RecTroubleshoot;
            const sql = troubleshoot.compiledSql || troubleshoot.rawSql;
            const initialMessage =
              `I ran this query and it failed.\n\n` +
              `Query:\n${fenceCodeBlock(sql, "sql")}\n\n` +
              `Error:\n${fenceCodeBlock(troubleshoot.errorMessage)}\n\n` +
              `Help me troubleshoot and fix this.`;
            const title = troubleshoot.fileName
              ? `Troubleshoot: ${troubleshoot.fileName}`
              : "Troubleshoot: query error";
            const opened = await this.altimateCodeChatService.openChat({
              initialMessage,
              title,
            });
            if (opened) {
              this.telemetry.sendTelemetryEvent(
                "TroubleshootQueryWithAltimate",
              );
            }
            break;
          }
          case InboundCommand.ExplainWithAltimate: {
            const { compiledSql, rawSql, fileName } = message as any;
            const sql = compiledSql || rawSql;
            const initialMessage =
              `Explain the following SQL query:\n\n` +
              `${fenceCodeBlock(sql, "sql")}`;
            const title = fileName ? `Explain: ${fileName}` : "Explain query";
            const opened = await this.altimateCodeChatService.openChat({
              initialMessage,
              title,
              beside: true,
            });
            if (opened) {
              this.telemetry.sendTelemetryEvent("ExplainQueryWithAltimate");
            }
            break;
          }
          case InboundCommand.ProfileQueryWithAltimate: {
            const { compiledSql, rawSql, fileName } = message as any;
            const sql = compiledSql || rawSql;
            const initialMessage =
              `Profile this query — identify performance bottlenecks, ` +
              `data distribution issues, and optimization opportunities.\n\n` +
              `Query:\n${fenceCodeBlock(sql, "sql")}`;
            const title = fileName ? `Profile: ${fileName}` : "Profile query";
            const opened = await this.altimateCodeChatService.openChat({
              initialMessage,
              title,
            });
            if (opened) {
              this.telemetry.sendTelemetryEvent("ProfileQueryWithAltimate");
            }
            break;
          }
          case InboundCommand.SetContext:
            this.dbtProjectContainer.setToGlobalState(
              message.key,
              message.value,
            );
            break;
          case InboundCommand.CollectQueryResultsDebugInfo:
            const data = {
              ...message,
              historyItems: this._queryHistory.length,
              historySize: totalPayloadChars(this._queryHistory),
            };
            this.dbtTerminal.debug(
              "CollectQueryResultsDebugInfo",
              "collecting query results debug info",
              data,
            );
            this.telemetry.sendTelemetryEvent(
              "CollectQueryResultsDebugInfo",
              data,
            );
            break;
          default:
            super.handleCommand(message, webview);
        }
      },
      this,
      this._disposables,
    );
  }

  private async executeQueryFromActiveWindow(message: { limit: number }) {
    const activeEditor = window.activeTextEditor;
    if (!activeEditor) {
      window.showErrorMessage("No active editor found");
      return;
    }
    const project = await this.getProject();
    if (!project) {
      window.showErrorMessage(
        "Unable to find dbt project for executing query.",
      );
      return;
    }
    const modelName = path.basename(activeEditor.document.uri.fsPath, ".sql");
    let query = activeEditor.document.getText();
    const selection = activeEditor.selection;
    if (selection && !selection.isEmpty) {
      const selectionRange = new Range(
        selection.start.line,
        selection.start.character,
        selection.end.line,
        selection.end.character,
      );
      query = activeEditor.document.getText(selectionRange);
    }
    this.telemetry.sendTelemetryEvent("QueryActiveWindowExecuteSql");
    await project.executeSQLWithLimitOnQueryPanel(
      query,
      modelName,
      message.limit,
    );
  }

  private sendQueryPanelViewEvent() {
    if (this._panel?.visible) {
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
    elapsedTime: number,
    to: Destination,
  ) {
    const result = {
      columnNames,
      columnTypes,
      rows,
      raw_sql,
      compiled_sql,
    };
    await this.postTo(to, {
      command: OutboundCommand.RenderQuery,
      ...(<RenderQuery>{ ...result, elapsedTime }),
    });

    return result;
  }

  /** Sends error result data to webview */
  private async transmitError(
    error: any,
    raw_sql: string,
    compiled_sql: string,
    to: Destination,
  ) {
    // TODO: telemetry
    await this.postTo(to, {
      command: OutboundCommand.RenderError,
      ...(<RenderError>{ ...error, raw_sql, compiled_sql }),
    });
  }

  /** Sends VSCode config data to webview */
  private transmitConfig() {
    const limit = workspace
      .getConfiguration("dbt", window.activeTextEditor?.document.uri)
      .get<number>("queryLimit");
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
  private async transmitLoading(to: Destination) {
    await this.postTo(to, { command: OutboundCommand.RenderLoading });
  }

  /** Sends VSCode clear state command */
  private async transmitReset(to: Destination) {
    await this.postTo(to, { command: OutboundCommand.ResetState });
  }

  /** Posts a render message to `to`: at once if its webview has loaded,
   * otherwise into its queue, which {@link sendQueued} sends in order once it
   * has. A message posted before a webview's script reports ready is lost. */
  private async postTo(to: Destination, message: SendMessageProps) {
    const webview = to === "bottom" ? this.bottomWebview : to;
    if (webview && this.readyWebviews.has(webview)) {
      await webview.postMessage(message);
      return;
    }
    if (to === "bottom") {
      this.bottomQueue.push(message);
      return;
    }
    const queue = this.tabQueues.get(to) ?? [];
    queue.push(message);
    this.tabQueues.set(to, queue);
  }

  /** A wrapper for {@link transmitData} which converts server
   * results interface ({@link ExecuteSQLResult}) to what the webview expects */
  private async transmitDataWrapper(
    result: ExecuteSQLResult,
    query: string,
    elapsedTime: number,
    to: Destination,
  ) {
    // Rows are serialized one at a time while they are built and capped by
    // their serialized size: one JSON.stringify over the whole result (what
    // VS Code does when the message is posted) hit V8's string-length limit
    // on wide results (RangeError: Invalid string length).
    const { rows, chars, droppedRows } = buildCappedRows<JsonObj>(
      result.table.column_names,
      result.table.rows,
    );
    if (droppedRows > 0) {
      const shown = rows.length;
      const total = shown + droppedRows;
      this.dbtTerminal.warn(
        "queryResultPanel:transmitDataWrapper",
        `Query result capped at ${shown} of ${total} rows (${Math.round(chars / 1024 / 1024)} MB serialized)`,
      );
      window.showWarningMessage(
        `Showing ${shown} of ${total} rows: the result is too large for the results panel. Narrow the query or add a LIMIT to see the rest.`,
      );
    }
    const transmitted = await this.transmitData(
      result.table.column_names,
      result.table.column_types,
      rows,
      query,
      result.compiled_sql,
      elapsedTime,
      to,
    );
    return { ...transmitted, payloadChars: chars };
  }

  private updateQueryHistory(
    result: {
      columnNames: string[];
      columnTypes: string[];
      rows: JsonObj[];
      raw_sql: string;
      compiled_sql: string;
      payloadChars: number;
    },
    projectName: string,
    query: string,
    duration: number,
    modelName: string,
  ) {
    // Do not update query history if disabled
    if (workspace.getConfiguration("dbt").get("disableQueryHistory", false)) {
      return;
    }
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
      modelName,
      payloadChars: result.payloadChars,
    });
    this._queryHistory = this._queryHistory.splice(0, 10);
    // Each entry carries the serialized size of its rows, so the history is
    // never re-serialized to measure it. Enforce the budget after the insert
    // so it holds whatever the new result's size; the newest entry stays.
    const evicted = evictToBudget(this._queryHistory);
    if (evicted.length > 0) {
      this.dbtTerminal.info(
        "updateQueryHistory",
        `Query history size exceeded 3MB, cleared ${evicted.length} oldest entries`,
      );
    }
  }

  /** Runs a query transmitting appropriate notifications to webview */
  public async executeQuery(
    query: string,
    queryExecutionPromise: Promise<QueryExecution>,
    projectName: string,
    to: Destination = "bottom",
  ) {
    const start = Date.now();
    //using id to focus on the webview is more reliable than using the view title
    await commands.executeCommand("dbtPowerUser.PreviewResults.focus");
    if (to === "bottom" && this._bottomPanel) {
      this._bottomPanel.show(); // Show the view
      this.bottomWebview?.postMessage({ command: "focus" }); // keyboard focus
    }
    this.transmitLoading(to);
    try {
      const queryExecution = (this.queryExecution =
        await queryExecutionPromise);
      const output = await queryExecution.executeQuery();
      // Measured here and sent with the rows: the webview's own timer starts
      // when it shows the loading state, which may be only as it loads.
      const duration = Date.now() - start;
      const result = await this.transmitDataWrapper(
        output,
        query,
        toElapsedSeconds(duration),
        to,
      );
      this.updateQueryHistory(
        result,
        projectName,
        query,
        duration,
        output.modelName,
      );
      return result;
    } catch (exc: any) {
      if (exc instanceof PythonException) {
        if (exc.exception.type.name === "KeyboardInterrupt") {
          // query cancellation
          this.transmitReset(to);
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
          to,
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
          to,
        );
        return;
      }
      await this.transmitError(
        {
          error: { code: -1, message: `${exc}`, data: {} },
        },
        query,
        query,
        to,
      );
    } finally {
      this.queryExecution = undefined;
      this._panel = this._bottomPanel;
    }
  }

  /** Sends what waited for `webview`, which has just loaded, in the order it
   * was sent: the bottom view's queue if it is the bottom view's webview, or
   * else its own as a tab. */
  private sendQueued(webview: Webview) {
    const queue =
      webview === this.bottomWebview
        ? this.bottomQueue.splice(0)
        : (this.tabQueues.get(webview) ?? []);
    this.tabQueues.delete(webview);
    for (const message of queue) {
      webview.postMessage(message);
    }
  }
}
