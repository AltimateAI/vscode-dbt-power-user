import {
  commands,
  ConfigurationTarget,
  env,
  TextEditor,
  Uri,
  window,
  workspace,
} from "vscode";
import { getProjectRelativePath, provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { TelemetryService } from "../telemetry";
import {
  AltimateWebviewProvider,
  HandleCommandProps,
  UpdateConfigProps,
} from "./altimateWebviewProvider";
import { AltimateRequest } from "../altimate";
import { SharedStateService } from "../services/sharedStateService";
import { DBTTerminal } from "../dbt_client/dbtTerminal";

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
    protected dbtTerminal: DBTTerminal,
  ) {
    super(
      dbtProjectContainer,
      altimateRequest,
      telemetry,
      emitterService,
      dbtTerminal,
    );

    this._disposables.push(
      window.onDidChangeActiveTextEditor(
        async (event: TextEditor | undefined) => {
          if (event === undefined) {
            return;
          }

          if (this._panel) {
            const currentProject = await this.getCurrentProject();
            const currentProjectRoot = await this.getCurrentProjectRoot();
            const currentConfig: Record<string, DeferConfig> = await workspace
              .getConfiguration("dbt", window.activeTextEditor?.document.uri)
              .get("deferConfigPerProject", {});

            const dbtIntegrationMode = workspace
              .getConfiguration("dbt")
              .get<string>("dbtIntegration", "core");

            this._panel!.webview.postMessage({
              command: "updateDeferConfig",
              args: {
                config: currentConfig[currentProjectRoot],
                projectPath: currentProject?.projectRoot.fsPath,
                dbtIntegrationMode,
              },
            });
          }
        },
      ),
    );
  }

  private getCurrentProjectRoot() {
    const currentProject = this.getCurrentProject();
    if (!currentProject?.projectRoot) {
      throw new Error(
        "Could not find a project based on the currently selected file in the editor",
      );
    }

    return getProjectRelativePath(currentProject.projectRoot);
  }

  private getCurrentProject() {
    const currentFilePath = window.activeTextEditor?.document.uri;
    if (!currentFilePath) {
      throw new Error("No file selected in the editor");
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
      this.dbtTerminal.debug("InsightsPanel", "Updating defer config", params);
      if (!params.projectRoot) {
        window.showErrorMessage("Please select a project");
        return;
      }
      // defer config is preview feature, then check keys
      if (!this.altimateRequest.handlePreviewFeatures()) {
        throw new Error("Invalid credentials");
      }

      const updateConfigs = params.config;
      const target = workspace.workspaceFolders
        ? ConfigurationTarget.WorkspaceFolder
        : ConfigurationTarget.Global;

      this.dbtTerminal.debug(
        "InsightsPanel",
        "config target: ${window.activeTextEditor?.document.uri}",
      );

      const currentConfig: Record<string, DeferConfig> = await workspace
        .getConfiguration("dbt", window.activeTextEditor?.document.uri)
        .get("deferConfigPerProject", {});
      const root = getProjectRelativePath(Uri.parse(params.projectRoot));

      this.dbtTerminal.info(
        "Defer config",
        "updating defer config",
        true,
        root,
        updateConfigs,
      );

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
        .getConfiguration("dbt", window.activeTextEditor?.document.uri)
        .update("deferConfigPerProject", newConfig, target);

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
      this.dbtTerminal.error(
        "InsightsPanel",
        "error while updating defer config",
        err,
      );
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
      this.dbtTerminal.debug("InsightsPanel", "Fetching project integrations");
      const response = await this.altimateRequest.fetchProjectIntegrations();

      if (!response?.length) {
        this.dbtTerminal.debug("InsightsPanel", "Missing project integrations");
        window
          .showInformationMessage(
            "You need to set up integration in SaaS. Please check the documentation",
            ...["View", "Cancel"],
          )
          .then((selection) => {
            if (selection === "View") {
              env.openExternal(
                Uri.parse("https://docs.myaltimate.com/test/defertoprod"),
              );
            }
          });
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
      this.dbtTerminal.error(
        "InsightsPanel",
        `could not fetch project integrations`,
        err,
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
    dbtCoreIntegrationId: number,
  ) {
    try {
      this.dbtTerminal.debug("InsightsPanel", "Fetching manifest signed url");
      const response = await this.altimateRequest.fetchArtifactUrl(
        "manifest",
        dbtCoreIntegrationId,
      );
      if (response.url === "" && response.dbt_core_integration_file_id === -1) {
        throw new Error(
          "No remote manifest file present for selected dbt core integration",
        );
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
      window.showErrorMessage(
        "Could not download remote manifest: " + (err as Error).message,
      );
      this.dbtTerminal.error(
        "InsightsPanel",
        `could not download remote manifest`,
        err,
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
      this.dbtTerminal.debug("InsightsPanel", "Fetching projects");
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
      this.dbtTerminal.error(
        "InsightsPanel",
        `could not fetch project integrations`,
        err,
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

  private async selectDirectoryForManifest(syncRequestId?: string) {
    const openDialog = await window.showOpenDialog({
      filters: {},
      canSelectFolders: true,
      openLabel: "Select",
      canSelectFiles: false,
      canSelectMany: false,
    });
    if (openDialog === undefined || openDialog.length === 0) {
      this.dbtTerminal.debug("InsightsPanel", "opendialog cancelled");
      this._panel!.webview.postMessage({
        command: "response",
        args: {
          syncRequestId,
          body: { error: "Folder not selected" },
          status: false,
        },
      });
      return;
    }

    this._panel!.webview.postMessage({
      command: "response",
      args: {
        syncRequestId,
        body: { path: openDialog[0].fsPath },
        status: true,
      },
    });
  }

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...params } = message;

    switch (command) {
      case "selectDirectoryForManifest":
        this.selectDirectoryForManifest(syncRequestId);
        break;
      case "updateDeferConfig":
        await this.updateDeferConfig(
          syncRequestId,
          params as UpdateConfigPropsArray,
        );
        break;
      case "bigqueryCostEstimate":
        this.dbtTerminal.debug(
          "InsightsPanel",
          "insights_panel:handleCommand -> bigqueryCostEstimate",
        );
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
        const currentDocument = window.activeTextEditor?.document;
        const { projectRoot } = params as { projectRoot?: string };
        const root = projectRoot
          ? getProjectRelativePath(Uri.parse(projectRoot))
          : await this.getCurrentProjectRoot();
        const projectPath =
          projectRoot || (await this.getCurrentProject())?.projectRoot.fsPath;
        this.dbtTerminal.debug(
          "InsightsPanel",
          `getting defer config for ${currentDocument?.uri.fsPath}`,
        );
        const currentConfig: Record<string, DeferConfig> = await workspace
          .getConfiguration("dbt", currentDocument?.uri)
          .get("deferConfigPerProject", {});

        const dbtIntegrationMode = workspace
          .getConfiguration("dbt")
          .get<string>("dbtIntegration", "core");

        this._panel!.webview.postMessage({
          command: "response",
          args: {
            syncRequestId,
            body: {
              config: currentConfig[root],
              projectPath,
              dbtIntegrationMode,
            },
            status: true,
          },
        });
        break;
      case "fetchProjectIntegrations":
        await this.fetchProjectIntegrations(syncRequestId);
        break;
      case "testRemoteManifest":
        const { dbtCoreIntegrationId } = params as {
          dbtCoreIntegrationId: number;
        };
        await this.testRemoteManifest(syncRequestId, dbtCoreIntegrationId);
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