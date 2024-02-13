import { commands, TextEditor, Uri, window, workspace } from "vscode";
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

type UpdateConfigPropsArray = {
  config: UpdateConfigProps[];
  projectRoot: string;
};
export interface DeferConfig {
  deferToProduction: boolean;
  favorState: boolean;
  manifestPathForDeferral: string;
}

interface DbtProject {
  projectRoot: string;
  projectName: string;
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
          const currentProject = await this.getCurrentProject();
          const currentProjectRoot = await this.getCurrentProjectRoot();
          const currentConfig: Record<string, DeferConfig> = await workspace
            .getConfiguration("dbt")
            .get("deferConfigPerProject", {});

          this._panel!.webview.postMessage({
            command: "updateDeferConfig",
            args: {
              config: currentConfig[currentProjectRoot],
              projectPath: currentProject?.projectRoot.fsPath,
            },
          });
        }
      },
    );
  }

  private async getCurrentProjectRoot() {
    const currentProject = await this.getCurrentProject();
    if (!currentProject?.projectRoot) {
      throw new Error("Invalid current project root");
    }

    return getProjectRelativePath(currentProject.projectRoot);
  }

  private async getCurrentProject() {
    const currentFilePath = window.activeTextEditor?.document.uri;
    if (!currentFilePath) {
      throw new Error("Invalid current file");
    }

    const currentProject =
      this.dbtProjectContainer.findDBTProject(currentFilePath);
    return currentProject;
  }

  private async updateDeferConfig(
    syncRequestId: string | undefined,
    params: UpdateConfigPropsArray,
  ) {
    try {
      console.log("Updating defer config", params);
      if (!params.projectRoot) {
        window.showErrorMessage("Please select a project");
        return;
      }
      // defer config is preview feature, then check keys
      if (!this.altimateRequest.handlePreviewFeatures()) {
        throw new Error("Invalid credentials");
      }

      const updateConfigs = params.config;

      const currentConfig: Record<string, DeferConfig> = await workspace
        .getConfiguration("dbt")
        .get("deferConfigPerProject", {});
      const root = getProjectRelativePath(Uri.parse(params.projectRoot));

      const newConfig = {
        ...currentConfig,
        [root]: {
          ...currentConfig[root],
          ...updateConfigs.reduce((acc: Record<string, any>, param) => {
            acc[param.key] = param.value;
            return acc;
          }, {}),
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
      if (!this.altimateRequest.handlePreviewFeatures()) {
        return;
      }
      console.log("Fetching project integrations");
      const response = await this.altimateRequest.fetchProjectIntegrations();

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

  private async testRemoteManifest(
    syncRequestId: string | undefined,
    dbt_core_integration_id: number,
  ) {
    try {
      console.log("Fetching manifest signed url");
      const response = await this.altimateRequest.fetchArtifactUrl(
        "manifest",
        dbt_core_integration_id,
      );

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

  private async getProjects(syncRequestId: string | undefined) {
    try {
      console.log("Fetching projects");
      const projects = this.dbtProjectContainer.getProjects();

      const dbtProjects: DbtProject[] = [];

      projects.forEach((i) => {
        const projectName = i.getProjectName();
        const projectRoot = i.projectRoot;
        dbtProjects.push({
          projectName: projectName,
          projectRoot: projectRoot.fsPath,
        });
      });

      if (syncRequestId) {
        this._panel!.webview.postMessage({
          command: "response",
          args: {
            syncRequestId,
            body: dbtProjects,
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

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...params } = message;

    switch (command) {
      case "updateDeferConfig":
        await this.updateDeferConfig(
          syncRequestId,
          params as UpdateConfigPropsArray,
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
        const { projectRoot } = params as { projectRoot?: string };
        const root = projectRoot
          ? getProjectRelativePath(Uri.parse(projectRoot))
          : await this.getCurrentProjectRoot();
        const projectPath =
          projectRoot || (await this.getCurrentProject())?.projectRoot.fsPath;
        const currentConfig: Record<string, DeferConfig> = await workspace
          .getConfiguration("dbt")
          .get("deferConfigPerProject", {});

        this._panel!.webview.postMessage({
          command: "response",
          args: {
            syncRequestId,
            body: { config: currentConfig[root], projectPath },
            status: true,
          },
        });
        break;
      case "fetchProjectIntegrations":
        await this.fetchProjectIntegrations(syncRequestId);
        break;
      case "testRemoteManifest":
        const { dbt_core_integration_id } = params as {
          dbt_core_integration_id: number;
        };
        await this.testRemoteManifest(syncRequestId, dbt_core_integration_id);
        break;
      case "getProjects":
        await this.getProjects(syncRequestId);
        break;
      default:
        super.handleCommand(message);
        break;
    }
  }
}
