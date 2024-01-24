import { commands, TextEditor, window, workspace } from "vscode";
import { getProjectRelativePath, provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { DBTProject } from "../manifest/dbtProject";
import { TelemetryService } from "../telemetry";
import {
  AltimateWebviewProvider,
  HandleCommandProps,
} from "./altimateWebviewProvider";
import { AltimateRequest } from "../altimate";
import { UpdateConfigProps } from "./types";

interface DeferConfig {
  deferToProduction: boolean;
  favorState: boolean;
  manifestPathForDeferral: string;
}
@provideSingleton(InsightsPanel)
export class InsightsPanel extends AltimateWebviewProvider {
  public static readonly viewType = "dbtPowerUser.Insights";
  protected viewPath = "/insights";
  protected panelDescription = "Toggle Defer to prod and other features";

  public constructor(
    dbtProjectContainer: DBTProjectContainer,
    protected altimateRequest: AltimateRequest,
    telemetry: TelemetryService,
  ) {
    super(dbtProjectContainer, altimateRequest, telemetry);

    window.onDidChangeActiveTextEditor(
      async (event: TextEditor | undefined) => {
        if (event === undefined) {
          return;
        }

        if (this._panel) {
          const currentProjectRoot = await this.getCurrentProjectRoot();
          const currentConfig: Record<string, DeferConfig> = await workspace
            .getConfiguration("dbt")
            .get("deferConfigPerProject", {});

          this._panel!.webview.postMessage({
            command: "updateDeferConfig",
            args: currentConfig[currentProjectRoot] || {},
          });
        }
      },
    );
  }

  private async getCurrentProjectRoot() {
    const currentFilePath = window.activeTextEditor?.document.uri;
    if (!currentFilePath) {
      throw new Error("Invalid current file");
    }

    const currentProject =
      this.dbtProjectContainer.findDBTProject(currentFilePath);
    if (!currentProject?.projectRoot) {
      throw new Error("Invalid current project root");
    }

    return getProjectRelativePath(currentProject.projectRoot);
  }
  private async updateDeferConfig(
    syncRequestId: string | undefined,
    params: UpdateConfigProps,
  ) {
    try {
      console.log("Updating defer config", params);
      // defer config is preview feature, then check keys
      if (!this.altimateRequest.handlePreviewFeatures()) {
        throw new Error("Invalid credentials");
      }

      const currentConfig: Record<string, DeferConfig> = await workspace
        .getConfiguration("dbt")
        .get("deferConfigPerProject", {});
      const root = await this.getCurrentProjectRoot();
      const newConfig = {
        ...currentConfig,
        [root]: {
          ...currentConfig[root],
          [params.key]: params.value,
        },
      };
      await workspace
        .getConfiguration("dbt")
        .update("deferConfigPerProject", newConfig);

      if (syncRequestId) {
        this._panel!.webview.postMessage({
          command: "response",
          args: {
            syncRequestId,
            body: {
              updated: true,
            },
            status: true,
          },
        });
      }
    } catch (err) {
      console.info("could not update defer config", (err as Error).message);
      this._panel!.webview.postMessage({
        command: "response",
        args: {
          syncRequestId,
          body: {
            updated: false,
          },
          status: false,
        },
      });
    }
  }

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...params } = message;

    switch (command) {
      case "updateDeferConfig":
        await this.updateDeferConfig(
          syncRequestId,
          params as UpdateConfigProps,
        );
        break;
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
        const currentProjectRoot = await this.getCurrentProjectRoot();
        const currentConfig: Record<string, DeferConfig> = await workspace
          .getConfiguration("dbt")
          .get("deferConfigPerProject", {});

        this._panel!.webview.postMessage({
          command: "response",
          args: {
            syncRequestId,
            body: currentConfig[currentProjectRoot],
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
