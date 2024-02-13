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

enum DatapilotEvents {
  QUERY_EXPLAIN_ONLOAD = "queryAnalysis:load:explain",
  QUERY_ONLOAD = "queryAnalysis:load",
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
  ) {
    super(dbtProjectContainer, altimateRequest, telemetry, emitterService);

    commands.registerCommand(
      "dbtPowerUser.resetDatapilot",
      () =>
        this._panel?.webview.postMessage({
          command: "datapilot:reset",
          args: {},
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
          .get<boolean>("enableNewDocsPanel", false);

        this._panel!.webview.postMessage({
          command: "response",
          args: {
            syncRequestId,
            body: {
              enabled: newDocsPanelState,
            },
            status: true,
          },
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
          eventMap: this.eventMap,
          panel: this._panel,
        });
        break;
      case "generateDocsForModel":
        if (!queryText) {
          return;
        }
        this.docGenService.generateDocsForModel({
          queryText,
          documentation: await this.docGenService.getDocumentation(
            this.eventMap,
          ),
          message,
          panel: this._panel,
          project: this.docGenService.getProject(),
        });
        break;
      case "generateDocsForColumn":
        await this.docGenService.generateDocsForColumns({
          documentation: await this.docGenService.getDocumentation(
            this.eventMap,
          ),
          panel: this._panel,
          message,
          project: this.docGenService.getProject(),
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
          const response = await this.queryAnalysisService.executeQueryExplain(
            this.eventMap,
            params,
            syncRequestId,
          );

          this._panel!.webview.postMessage({
            command: "response",
            args: {
              syncRequestId,
              body: { response },
              status: true,
            },
          });
        } catch (err) {
          this._panel!.webview.postMessage({
            command: "response",
            args: {
              syncRequestId,
              error: (err as Error).message,
              status: false,
            },
          });
        }
        break;
      case "queryanalysis:followup":
        try {
          const response = await this.queryAnalysisService.getFollowupQuestions(
            this.eventMap,
            params as { query: string; user_request: string },
          );

          this._panel!.webview.postMessage({
            command: "response",
            args: {
              syncRequestId,
              body: response,
              status: true,
            },
          });
        } catch (err) {
          this._panel!.webview.postMessage({
            command: "response",
            args: {
              syncRequestId,
              error: (err as Error).message,
              status: false,
            },
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
      case "dbtPowerUser.openDatapilotWithQuery":
        this.handleDatapilotEvent(DatapilotEvents.QUERY_ONLOAD, payload);
        break;
      case "dbtPowerUser.openHelpInDatapilot":
        this._panel!.webview.postMessage({
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
      const command =
        "command" in message ? message.command : "datapilot:message";

      this._panel.webview.postMessage({
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
    this._panel?.webview.postMessage({
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
