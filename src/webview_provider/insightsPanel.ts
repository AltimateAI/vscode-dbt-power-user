import { commands, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import {
  AltimateWebviewProvider,
  HandleCommandProps,
} from "./altimateWebviewProvider";

@provideSingleton(InsightsPanel)
export class InsightsPanel extends AltimateWebviewProvider {
  public static readonly viewType = "dbtPowerUser.Insights";
  protected viewPath = "/insights";
  protected panelDescription = "Toggle Defer to prod and other features";

  public constructor(
    dbtProjectContainer: DBTProjectContainer,
    telemetry: TelemetryService,
  ) {
    super(dbtProjectContainer, telemetry);
  }

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...params } = message;

    switch (command) {
      case "bigqueryCostEstimate":
        console.log("insights_panel:handleCommand -> bigqueryCostEstimate");
        const result = await commands.executeCommand(
          "dbtPowerUser.bigqueryCostEstimate",
          { returnResult: true },
        );

        this._panel!.webview.postMessage({
          command: "response",
          args: { syncRequestId, body: result, status: true },
        });
        break;
      case "altimateScan":
        commands.executeCommand("dbtPowerUser.altimateScan", {});
        break;
      case "clearAltimateScanResults":
        commands.executeCommand("dbtPowerUser.clearAltimateScanResults", {});
        break;
      case "getDeferToProductionConfig":
        this._panel!.webview.postMessage({
          command: "response",
          args: {
            syncRequestId,
            body: {
              deferToProduction: workspace
                .getConfiguration("dbt")
                .get<boolean>("deferToProduction"),
              favorState: workspace
                .getConfiguration("dbt")
                .get<boolean>("favorState"),
              manifestPathForDeferral: workspace
                .getConfiguration("dbt")
                .get<string>("manifestPathForDeferral"),
            },
            status: true,
          },
        });
        break;
      default:
        super.handleCommand(message);
        break;
    }
  }
}
