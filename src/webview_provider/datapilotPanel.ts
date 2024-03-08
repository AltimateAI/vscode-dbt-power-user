import { commands, window, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import {
  AltimateWebviewProvider,
  SharedStateEventEmitterProps,
  HandleCommandProps,
} from "./altimateWebviewProvider";
import { DocGenService } from "../services/docGenService";
import { AltimateRequest, QueryAnalysisType } from "../altimate";
import { SharedStateService } from "../services/sharedStateService";
import { QueryAnalysisService } from "../services/queryAnalysisService";
import { DbtProjectService } from "../services/dbtProjectService";
import { DBTTerminal } from "../dbt_client/dbtTerminal";

enum DatapilotEvents {
  QUERY_EXPLAIN_ONLOAD = "queryAnalysis:load:explain",
  QUERY_ONLOAD = "queryAnalysis:load",
  QUERY_CHANGE_ONLOAD = "queryAnalysis:load:change",
}

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
    private dbtProjectService: DbtProjectService,
    protected dbtTerminal: DBTTerminal,
  ) {
    super(
      dbtProjectContainer,
      altimateRequest,
      telemetry,
      emitterService,
      dbtTerminal,
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
          project: this.dbtProjectService.getProject(),
        });
        break;
      case "generateDocsForColumn":
        await this.docGenService.generateDocsForColumns({
          documentation: await this.docGenService.getDocumentation(),
          panel: this._panel,
          message,
          project: this.dbtProjectService.getProject(),
        });
        break;
      case "docgen:insert":
        this.emitterService.eventEmitter.fire({
          command: "docgen:insert",
          payload: params,
        });
        break;
      case "queryAnalysis:explain":
        try {
          const response = await this.queryAnalysisService.executeQueryAnalysis(
            params,
            QueryAnalysisType.EXPLAIN,
            syncRequestId,
          );

          this.sendResponseToWebview({
            command: "response",
            data: {
              response,
            },
            syncRequestId,
          });
        } catch (err) {
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: (err as Error).message,
          });
        }
        break;
      case "queryAnalysis:modify":
        try {
          const response = await this.queryAnalysisService.executeQueryAnalysis(
            params,
            QueryAnalysisType.MODIFY,
            syncRequestId,
          );

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { response },
          });
        } catch (err) {
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: (err as Error).message,
          });
        }
        break;
      case "queryanalysis:followup":
        try {
          const response = await this.queryAnalysisService.getFollowupQuestions(
            params as { query: string; user_request: string },
          );

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { response },
          });
        } catch (err) {
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: (err as Error).message,
          });
        }
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
        this.handleDatapilotEvent(
          DatapilotEvents.QUERY_EXPLAIN_ONLOAD,
          payload,
        );
        break;
      case "dbtPowerUser.changeQuery":
        this.handleDatapilotEvent(DatapilotEvents.QUERY_CHANGE_ONLOAD, payload);
        break;
      case "dbtPowerUser.openDatapilotWithQuery":
        this.handleDatapilotEvent(DatapilotEvents.QUERY_ONLOAD, payload);
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
    command: DatapilotEvents,
    data?: { query?: string },
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
        command,
        // data.query will be passed from query panel webview
        query: data?.query || queryData.query,
        fileName: queryData.fileName,
      },
    });
  }
}
