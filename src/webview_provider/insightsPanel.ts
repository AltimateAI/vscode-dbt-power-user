import { commands, TextEditor, window, workspace } from "vscode";
import { getProjectRelativePath, provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { DBTProject } from "../manifest/dbtProject";
import { TelemetryService } from "../telemetry";
import {
  AltimateWebviewProvider,
  HandleCommandProps,
  UpdateConfigProps,
} from "./altimateWebviewProvider";
import { AltimateRequest } from "../altimate";
import { SharedStateService } from "../services/SharedStateService";

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
    protected emitterService: SharedStateService,
  ) {
    super(dbtProjectContainer, altimateRequest, telemetry, emitterService);

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

  private async fetchProjectIntegrations(syncRequestId: string | undefined) {
    try {
      console.log("Fetching project integrations");
      const response = await this.altimateRequest.fetchProjectIntegrations();
      if (!response) {
        throw new Error("Invalid credentials");
      }

      if (syncRequestId) {
        this._panel!.webview.postMessage({
          command: "response",
          args: {
            syncRequestId,
            body: response,
            status: true,
          },
        });
      }
    } catch (err) {
      console.info(
        "could not fetch project integrations",
        (err as Error).message,
      );
      this._panel!.webview.postMessage({
        command: "response",
        args: {
          syncRequestId,
          body: {
            response: [],
          },
          status: false,
        },
      });
    }
  }

  private async downloadManifest(
    syncRequestId: string | undefined,
    dbt_core_integration_id: number,
  ) {
    try {
      console.log("Fetching manifest signed url");
      const response = await this.altimateRequest.downloadArtifect(
        "manifest",
        dbt_core_integration_id,
      );

      if (!response) {
        throw new Error("Invalid credentials");
      }

      if (syncRequestId) {
        this._panel!.webview.postMessage({
          command: "response",
          args: {
            syncRequestId,
            body: response,
            status: true,
          },
        });
      }
    } catch (err) {
      console.info(
        "could not fetch manifest signed url",
        (err as Error).message,
      );
      this._panel!.webview.postMessage({
        command: "response",
        args: {
          syncRequestId,
          body: {
            response: [],
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
      case "fetchProjectIntegrations":
        await this.fetchProjectIntegrations(syncRequestId);
        break;
      case "downloadManifest":
        const { dbt_core_integration_id } = params as {
          dbt_core_integration_id: number;
        };
        await this.downloadManifest(syncRequestId, dbt_core_integration_id);
        break;
      default:
        super.handleCommand(message);
        break;
    }
  }
}
