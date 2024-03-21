import { commands, Range, TextDocument, Uri, window, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import {
  AltimateWebviewProvider,
  SharedStateEventEmitterProps,
  HandleCommandProps,
} from "./altimateWebviewProvider";
import { DocGenService } from "../services/docGenService";
import {
  AltimateRequest,
  QueryAnalysisType,
  QueryTranslateExplanationRequest,
  QueryTranslateRequest,
} from "../altimate";
import { SharedStateService } from "../services/sharedStateService";
import { QueryAnalysisService } from "../services/queryAnalysisService";
import { QueryManifestService } from "../services/queryManifestService";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DbtTestService } from "../services/dbtTestService";

@provideSingleton(DataPilotPanel)
export class DataPilotPanel extends AltimateWebviewProvider {
  public static readonly viewType = "dbtPowerUser.datapilot-webview";
  protected viewPath = "/datapilot";
  protected panelDescription = "Datapilot view";
  private incomingMessages: Record<string, unknown>[] = [];

  public constructor(
    dbtProjectContainer: DBTProjectContainer,
    telemetry: TelemetryService,
    protected altimateRequest: AltimateRequest,
    private docGenService: DocGenService,
    protected emitterService: SharedStateService,
    protected queryAnalysisService: QueryAnalysisService,
    protected queryManifestService: QueryManifestService,
    protected dbtTerminal: DBTTerminal,
    private dbtTestService: DbtTestService,
  ) {
    super(
      dbtProjectContainer,
      altimateRequest,
      telemetry,
      emitterService,
      dbtTerminal,
      queryManifestService,
    );

    commands.registerCommand("dbtPowerUser.resetDatapilot", () =>
      this.sendResponseToWebview({
        command: "datapilot:reset",
      }),
    );
  }

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...params } = message;
    const queryText = window.activeTextEditor?.document.getText();

    switch (command) {
      case "getNewDocsPanelState":
        const newDocsPanelState = workspace
          .getConfiguration("dbt")
          .get<boolean>("enableNewDocsPanel", true);

        this.sendResponseToWebview({
          command: "response",
          data: {
            enabled: newDocsPanelState,
          },
          syncRequestId,
        });
        break;

      case "enableNewDocsPanel":
        this.emitterService.fire({
          command: "enableNewDocsPanel",
          payload: params,
        });
        break;

      case "sendFeedback":
        if (!queryText) {
          return;
        }
        this.docGenService.sendFeedback({
          queryText,
          message,
          panel: this._panel,
          syncRequestId,
        });
        break;

      case "generateDocsForModel":
        if (!queryText) {
          return;
        }
        this.docGenService.generateDocsForModel({
          queryText,
          documentation: await this.docGenService.getDocumentation(),
          message,
          panel: this._panel,
          project: this.queryManifestService.getProject(),
        });
        break;

      case "generateDocsForColumn":
        await this.docGenService.generateDocsForColumns({
          documentation: await this.docGenService.getDocumentation(),
          panel: this._panel,
          message,
          project: this.queryManifestService.getProject(),
        });
        break;

      case "docgen:insert":
      case "testgen:insert":
        this.emitterService.eventEmitter.fire({
          command: command,
          payload: params,
        });
        break;

      case "querytranslate":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            const editor = window.activeTextEditor;

            if (!editor) {
              throw new Error("Invalid file");
            }

            const sql = editor.document.getText();
            const response =
              (await this.queryAnalysisService.executeQueryTranslate({
                ...params,
                sql,
              } as unknown as QueryTranslateRequest)) as {
                translated_sql: string;
              };
            return { response: "```sql\n" + response.translated_sql + "\n```" };
          },
          command,
          true,
        );
        break;
      case "querytranslate:explanation":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            const editor = window.activeTextEditor;

            if (!editor) {
              throw new Error("Invalid file");
            }

            const sql = editor.document.getText();
            const response =
              await this.queryAnalysisService.executeQueryTranslateExplanation(
                {
                  ...params,
                  user_sql: sql,
                } as unknown as QueryTranslateExplanationRequest,
                syncRequestId,
              );
            return { response };
          },
          command,
          true,
        );
        break;
      case "queryAnalysis:explain":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            const response =
              await this.queryAnalysisService.executeQueryAnalysis(
                params,
                QueryAnalysisType.EXPLAIN,
                syncRequestId,
              );
            return { response };
          },
          command,
          true,
        );
        break;

      case "queryAnalysis:modify":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            const response =
              await this.queryAnalysisService.executeQueryAnalysis(
                params,
                QueryAnalysisType.MODIFY,
                syncRequestId,
              );
            return { response };
          },
          command,
          true,
        );
        break;

      case "dbttest:create":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            const response = await this.dbtTestService.createTest(
              params,
              syncRequestId,
            );
            return { response };
          },
          command,
          true,
        );
        break;

      case "file:replace-contents":
        if (!window.activeTextEditor || !params.sql || !params.filePath) {
          return;
        }
        this.dbtTerminal.debug(
          "file:replace-contents",
          "replacing translated sql",
          params,
        );
        workspace.openTextDocument(Uri.parse(params.filePath as string)).then(
          (file: TextDocument) => {
            window.showTextDocument(file, 1, false).then(
              (e) => {
                e.edit((edit) => {
                  edit.replace(
                    new Range(
                      file.lineAt(0).range.start,
                      file.lineAt(file.lineCount - 1).range.end,
                    ),
                    (params.sql as string)
                      .replace(/```sql\n/g, "")
                      .replace(/```/, ""),
                  );
                });
              },
              (error) => {
                this.dbtTerminal.error(
                  "file:replace-contents",
                  "error replacing translated sql",
                  error,
                );
              },
            );
          },
          (error) => {
            this.dbtTerminal.error(
              "file:replace-contents",
              "error replacing translated sql",
              error,
            );
          },
        );
        break;

      case "queryanalysis:followup":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            const response =
              await this.queryAnalysisService.getFollowupQuestions(
                params as { query: string; user_request: string },
              );
            return { response };
          },
          command,
          true,
        );
        break;

      default:
        super.handleCommand(message);
        break;
    }
  }

  protected async onEvent({ command, payload }: SharedStateEventEmitterProps) {
    switch (command) {
      case "datapilot:toggle":
        await commands.executeCommand("dbtPowerUser.datapilot-webview.focus");
        break;

      case "datapilot:message":
        await commands.executeCommand("dbtPowerUser.datapilot-webview.focus");
        if (!this.isWebviewReady) {
          this.incomingMessages.push(payload);
          return;
        }
        this.postToWebview(payload);
        break;

      case "dbtPowerUser.summarizeQuery":
        this.handleDatapilotEvent(QueryAnalysisType.EXPLAIN, payload);
        break;

      case "dbtPowerUser.changeQuery":
        this.handleDatapilotEvent(QueryAnalysisType.MODIFY, payload);
        break;

      case "dbtPowerUser.translateQuery":
        this.handleDatapilotEvent(QueryAnalysisType.TRANSLATE, {
          ...payload,
          meta: { filePath: window.activeTextEditor?.document.uri.fsPath },
        });
        break;

      case "dbtPowerUser.openDatapilotWithQuery":
        this.handleDatapilotEvent(null, {
          ...payload,
          meta: { filePath: window.activeTextEditor?.document.uri.fsPath },
        });
        break;

      case "dbtPowerUser.openHelpInDatapilot":
        this.sendResponseToWebview({
          command: "datapilot:showHelp",
        });
        break;

      default:
        super.onEvent({ command, payload });
        break;
    }
  }

  protected onWebviewReady() {
    super.onWebviewReady();

    if (!this._panel) {
      return;
    }

    while (this.incomingMessages.length) {
      this.postToWebview(this.incomingMessages.pop());
    }
  }

  private postToWebview(message: Record<string, unknown> | undefined) {
    if (this._panel && message) {
      const command = (
        "command" in message ? message.command : "datapilot:message"
      ) as string;

      this.sendResponseToWebview({
        command,
        args: message,
      });
    }
  }

  // handles events from sharedStateService events
  private handleDatapilotEvent(
    analysisType: QueryAnalysisType | null,
    data?: { query?: string; meta?: Record<string, unknown> },
  ) {
    // reset the datapilot to start new session
    this.sendResponseToWebview({
      command: "datapilot:reset",
      args: {},
    });
    const queryData = this.queryAnalysisService.getSelectedQuery();
    if (!queryData) {
      return;
    }
    this.emitterService.fire({
      command: "datapilot:message",
      payload: {
        command: "datapilot:message",
        // data.query will be passed from query panel webview
        query: data?.query || queryData.query,
        fileName: queryData.fileName,
        requestType: "QUERY_ANALYSIS",
        state: "UNINITIALIZED",
        //If analysis type is undefined, dont trigger api call
        analysisType,
        meta: data?.meta,
      },
    });
  }
}
