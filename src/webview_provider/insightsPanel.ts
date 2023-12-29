import { commands, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import { AltimateWebviewProvider } from "./altimateWebviewProvider";

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

  async handleCommand(message: {
    command: string;
    args: Record<string, unknown>;
  }): Promise<void> {
    const { command, args } = message;
    const { id, params } = args;

    switch (command) {
      case "bigqueryCostEstimate":
        console.log("insights_panel:handleCommand -> bigqueryCostEstimate");
        const result = await commands.executeCommand(
          "dbtPowerUser.bigqueryCostEstimate",
          { returnResult: true },
        );

        this._panel!.webview.postMessage({
          command: "response",
          args: { id, body: result, status: true },
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
            id,
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
