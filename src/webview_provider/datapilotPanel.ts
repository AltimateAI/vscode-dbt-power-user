import { commands, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import {
  AltimateWebviewProvider,
  HandleCommandProps,
} from "./altimateWebviewProvider";
import { sharedStateManager } from "./sharedStateManager";
import { DocGenService } from "../services/docGenService";
import { AltimateRequest } from "../altimate";

@provideSingleton(DataPilotPanel)
export class DataPilotPanel extends AltimateWebviewProvider {
  public static readonly viewType = "dbtPowerUser.datapilot-webview";
  protected viewPath = "/datapilot";
  protected panelDescription = "Datapilot view";

  public constructor(
    dbtProjectContainer: DBTProjectContainer,
    telemetry: TelemetryService,
    protected altimateRequest: AltimateRequest,
    private docGenService: DocGenService,
  ) {
    super(dbtProjectContainer, altimateRequest, telemetry);
    sharedStateManager.addListener((message) => {
      const { command, ...item } = message;
      if (!this._panel) {
        return;
      }
      this._panel.webview.postMessage({
        command: "datapilot:message",
        args: item,
      });
    });
  }

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...params } = message;

    switch (command) {
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
        sharedStateManager.postMessage(message);
      default:
        super.handleCommand(message);
        break;
    }
  }
}
