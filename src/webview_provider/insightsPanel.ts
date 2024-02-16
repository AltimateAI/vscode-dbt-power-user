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
import { CustomUnknownException } from "../dbt_client/exception";

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
      ),
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
      this.dbtTerminal.log("Updating defer config", params);
      if (!params.projectRoot) {
        window.showErrorMessage("Please select a project");
        return;
      }
      // defer config is preview feature, then check keys
      if (!this.altimateRequest.handlePreviewFeatures()) {
        throw new Error("Invalid credentials");
      }

      const updateConfigs = params.config;
      const currentDocument = window.activeTextEditor?.document;
      const targetFolder = currentDocument?.uri
        ? workspace.getWorkspaceFolder(currentDocument?.uri)
        : null;
      const target = workspace.workspaceFolders
        ? ConfigurationTarget.WorkspaceFolder
        : ConfigurationTarget.Global;

      this.dbtTerminal.debug("defer config target", targetFolder?.uri);

      const currentConfig: Record<string, DeferConfig> = await workspace
        .getConfiguration("dbt", targetFolder)
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
        .getConfiguration("dbt", targetFolder)
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
        new CustomUnknownException("Defer config", (err as Error).message),
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
      this.dbtTerminal.log("Fetching project integrations");
      const response = await this.altimateRequest.fetchProjectIntegrations();

      if (!response?.length) {
        this.dbtTerminal.log("Missing project integrations");
        // TODO @surya to update text and docs link
        window
          .showInformationMessage(
            "You need to set up integration in SaaS. Please check the documentation",
            ...["View", "Cancel"],
          )
          .then((selection) => {
            if (selection === "View") {
              env.openExternal(Uri.parse("https://docs.myaltimate.com/"));
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
        new CustomUnknownException(
          "Defer config",
          `could not fetch project integrations ${(err as Error).message}`,
        ),
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
      this.dbtTerminal.log("Fetching manifest signed url");
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
      this.dbtTerminal.error(
        new CustomUnknownException(
          "Defer config",
          `could not fetch manifest signed url ${(err as Error).message}`,
        ),
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
      this.dbtTerminal.log("Fetching projects");
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
        new CustomUnknownException(
          "Defer config",
          `could not fetch project integrations ${(err as Error).message}`,
        ),
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
      this.dbtTerminal.debug("opendialog cancelled");
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
        this.dbtTerminal.log(
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
          `getting defer config for ${currentDocument?.uri.fsPath}`,
        );
        const currentConfig: Record<string, DeferConfig> = await workspace
          .getConfiguration("dbt", currentDocument?.uri)
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
