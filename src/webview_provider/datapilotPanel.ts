import { commands, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import {
  AltimateWebviewProvider,
  HandleCommandProps,
} from "./altimateWebviewProvider";
import { sharedStateManager } from "./sharedStateManager";

@provideSingleton(DataPilotPanel)
export class DataPilotPanel extends AltimateWebviewProvider {
  public static readonly viewType = "dbtPowerUser.datapilot-webview";
  protected viewPath = "/datapilot";
  protected panelDescription = "Datapilot view";

  public constructor(
    dbtProjectContainer: DBTProjectContainer,
    telemetry: TelemetryService,
  ) {
    super(dbtProjectContainer, telemetry);
    sharedStateManager.addListener((message) => {
      this._panel!.webview.postMessage({
        command: "datapilot:message",
        args: message,
      });
    });
  }

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...params } = message;

    switch (command) {
      default:
        super.handleCommand(message);
        break;
    }
  }
}
