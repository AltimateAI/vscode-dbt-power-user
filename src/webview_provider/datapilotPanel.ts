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
import { AltimateRequest } from "../altimate";
import { SharedStateService } from "../services/SharedStateService";

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
  ) {
    super(dbtProjectContainer, altimateRequest, telemetry, emitterService);
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
      default:
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

  private postToWebview(message: unknown) {
    if (this._panel) {
      this._panel.webview.postMessage({
        command: "datapilot:message",
        args: message,
      });
    }
  }
}
