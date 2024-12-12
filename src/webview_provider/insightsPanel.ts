import {
  commands,
  ConfigurationTarget,
  env,
  FileChangeEvent,
  FileChangeType,
  ProgressLocation,
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
import {
  AltimateRequest,
  DBTCoreIntegration,
  NotFoundError,
} from "../altimate";
import { SharedStateService } from "../services/sharedStateService";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DeferToProdService } from "../services/deferToProdService";
import { ManifestPathType } from "../constants";
import { QueryManifestService } from "../services/queryManifestService";
import { ValidationProvider } from "../validation_provider";
import { UsersService } from "../services/usersService";
import { NotebookFileSystemProvider } from "@lib";

type UpdateConfigPropsArray = {
  config: UpdateConfigProps[];
  projectRoot: string;
};
type ConfigOption =
  | { configPath: string; configType: "Manual" }
  | {
      config: unknown;
      config_schema: { files_required: string }[];
      configType: "Saas";
    }
  | { configType: "All" };

export type AltimateConfigProps = { projectRoot: string } & ConfigOption;

export interface DeferConfig {
  deferToProduction: boolean;
  favorState: boolean;
  manifestPathForDeferral: string;
  manifestPathType?: ManifestPathType;
  dbtCoreIntegrationId?: number;
}

interface DbtProject {
  projectRoot: string;
  projectName: string;
}

type SelectFilesProps = {
  filters: { [name: string]: string[] } | undefined;
  canSelectMany: boolean;
};

enum PromptAnswer {
  YES = "Install altimate datapilot cli",
}

@provideSingleton(InsightsPanel)
export class InsightsPanel extends AltimateWebviewProvider {
  public static readonly viewType = "dbtPowerUser.Insights";
  protected viewPath = "/insights";
  protected panelDescription = "Toggle Defer to prod and other features";

  private projectIntegrations: DBTCoreIntegration[] | undefined;

  public constructor(
    protected dbtProjectContainer: DBTProjectContainer,
    protected altimateRequest: AltimateRequest,
    protected telemetry: TelemetryService,
    protected emitterService: SharedStateService,
    protected dbtTerminal: DBTTerminal,
    protected queryManifestService: QueryManifestService,
    private deferToProdService: DeferToProdService,
    private validationProvider: ValidationProvider,
    protected usersService: UsersService,
    private notebookFileSystemProvider: NotebookFileSystemProvider,
  ) {
    super(
      dbtProjectContainer,
      altimateRequest,
      telemetry,
      emitterService,
      dbtTerminal,
      queryManifestService,
      usersService,
    );

    this._disposables.push(
      window.onDidChangeActiveTextEditor(
        async (event: TextEditor | undefined) => {
          if (event === undefined) {
            return;
          }

          if (this._panel) {
            const currentProject = await this.getCurrentProject();

            const dbtIntegrationMode = workspace
              .getConfiguration("dbt")
              .get<string>("dbtIntegration", "core");

            const projectPath = this.getCurrentProject();
            if (!projectPath) {
              this.dbtTerminal.warn("InsightsPanel", "No project selected");
              return;
            }

            this.sendResponseToWebview({
              command: "renderDeferConfig",
              data: {
                config: this.deferToProdService.getDeferConfigByProjectRoot(
                  projectPath.projectRoot.fsPath,
                ),
                projectPath: currentProject?.projectRoot.fsPath,
                dbtIntegrationMode,
              },
            });
          }
        },
      ),
    );

    this._disposables.push(
      this.notebookFileSystemProvider.onDidChangeFile(
        (e: FileChangeEvent[]) => {
          const createdEvent = e.find(
            (event) => event.type === FileChangeType.Created,
          );
          if (createdEvent) {
            this.sendResponseToWebview({
              command: "refetchNotebooks",
              data: {},
            });
          }
        },
      ),
    );
  }

  private getCurrentProject() {
    const currentFilePath = window.activeTextEditor?.document.uri;
    if (!currentFilePath) {
      this.dbtTerminal.debug("InsightsPanel", "No file selected in the editor");
      return;
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

      const updateConfigs = params.config;
      const target = workspace.workspaceFolders
        ? ConfigurationTarget.WorkspaceFolder
        : ConfigurationTarget.Global;

      this.dbtTerminal.debug(
        "InsightsPanel",
        "config target: ${window.activeTextEditor?.document.uri}",
      );

      const currentConfig: Record<string, DeferConfig> =
        this.deferToProdService.getDeferConfigByWorkspace();
      const root = getProjectRelativePath(Uri.file(params.projectRoot));

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

      const workspaceFolder = workspace.getWorkspaceFolder(
        Uri.file(params.projectRoot),
      );
      await workspace
        .getConfiguration("dbt", workspaceFolder)
        .update("deferConfigPerProject", newConfig, target);

      if (syncRequestId) {
        this.sendResponseToWebview({
          command: "response",
          syncRequestId,
          data: {
            updated: true,
          },
        });
      }

      if (
        !(
          currentConfig[root].deferToProduction ===
            newConfig[root].deferToProduction &&
          currentConfig[root].manifestPathForDeferral ===
            newConfig[root].manifestPathForDeferral &&
          currentConfig[root].favorState === newConfig[root].favorState
        )
      ) {
        window.withProgress(
          {
            location: ProgressLocation.Notification,
            title: "Applying defer config...",
            cancellable: false,
          },
          async () => {
            await this.dbtProjectContainer
              .findDBTProject(Uri.file(params.projectRoot))
              ?.applyDeferConfig();
          },
        );
      }
    } catch (err) {
      this.dbtTerminal.error(
        "InsightsPanel",
        "error while updating defer config",
        err,
      );
      this.sendResponseToWebview({
        command: "response",
        syncRequestId,
        data: {
          updated: false,
        },
        error: (err as Error).message,
      });
    }
  }

  private async fetchProjectIntegrations(
    syncRequestId: string | undefined,
    params: { clearCache?: boolean },
  ) {
    try {
      if (params.clearCache) {
        this.projectIntegrations = undefined;
      }
      if (this.projectIntegrations) {
        if (syncRequestId) {
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: this.projectIntegrations,
          });
        }
        return;
      }

      if (!this.altimateRequest.handlePreviewFeatures()) {
        this.projectIntegrations = [];
        if (syncRequestId) {
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: this.projectIntegrations,
          });
        }
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

      this.projectIntegrations = response;
      if (syncRequestId) {
        this.sendResponseToWebview({
          command: "response",
          syncRequestId,
          data: response,
        });
      }
    } catch (err) {
      this.dbtTerminal.error(
        "InsightsPanel",
        `could not fetch project integrations`,
        err,
      );
      this.sendResponseToWebview({
        command: "response",
        syncRequestId,
        data: {
          response: [],
        },
        error: (err as Error).message,
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
      if (syncRequestId) {
        this.sendResponseToWebview({
          command: "response",
          syncRequestId,
          body: response,
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof NotFoundError
          ? "No remote manifest file present for selected dbt core integration"
          : (err as Error).message;
      window.showErrorMessage(
        `Could not download remote manifest: ${errorMessage}`,
      );
      this.dbtTerminal.error(
        "InsightsPanel",
        `could not download remote manifest`,
        err,
      );
      this.sendResponseToWebview({
        command: "response",
        syncRequestId,
        data: {
          response: [],
        },
        error: (err as Error).message,
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
        this.sendResponseToWebview({
          command: "response",
          syncRequestId,
          data: dbtProjects,
        });
      }
    } catch (err) {
      this.dbtTerminal.error(
        "InsightsPanel",
        `could not fetch project integrations`,
        err,
      );
      this.sendResponseToWebview({
        command: "response",
        syncRequestId,
        data: {
          response: [],
        },
        error: (err as Error).message,
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
      this.sendResponseToWebview({
        command: "response",
        syncRequestId,
        data: { error: "Folder not selected" },
        error: "Folder not selected",
      });
      return;
    }

    this.sendResponseToWebview({
      command: "response",
      syncRequestId,
      data: { path: openDialog[0].fsPath },
    });
  }

  private async selectFiles(
    syncRequestId: string | undefined,
    { filters = {}, canSelectMany = false }: SelectFilesProps,
  ) {
    const openDialog = await window.showOpenDialog({
      filters,
      canSelectFolders: false,
      openLabel: "Select",
      canSelectFiles: true,
      canSelectMany,
    });
    if (openDialog === undefined || openDialog.length === 0) {
      this.dbtTerminal.debug("InsightsPanel", "opendialog cancelled");
      this._panel!.webview.postMessage({
        command: "response",
        args: {
          syncRequestId,
          body: { error: "File not selected" },
          status: false,
        },
      });
      return;
    }

    this._panel!.webview.postMessage({
      command: "response",
      args: {
        syncRequestId,
        body: { path: openDialog.map((i) => i.fsPath) },
        status: true,
      },
    });
  }

  private emitError(syncRequestId: string | undefined, errorMsg: string) {
    window.showErrorMessage(errorMsg);
    this._panel!.webview.postMessage({
      command: "response",
      args: { syncRequestId, status: false, error: errorMsg },
    });
  }

  private async altimateScan(
    syncRequestId: string | undefined,
    args: AltimateConfigProps,
  ) {
    try {
      this.validationProvider.throwIfNotAuthenticated();
      await this.altimateRequest.logDBTHealthcheckStartScan();
    } catch (e) {
      this.emitError(syncRequestId, (e as Error).message);
      return;
    }
    let isInstalled = false;
    try {
      isInstalled =
        await this.dbtProjectContainer.checkIfAltimateDatapilotInstalled();
    } catch (e) {
      this.emitError(
        syncRequestId,
        `Error while checking altimate datapilot cli installation: ${
          (e as Error).message
        }`,
      );
      this.dbtTerminal.error(
        "atimateDatapilotInstallationCheck",
        "Error while checking altimate datapilot cli installation",
        e,
      );
      return;
    }
    if (!isInstalled) {
      const answer = await window.showInformationMessage(
        "Altimate datapilot cli is not detected. Install it?",
        PromptAnswer.YES,
      );
      if (answer !== PromptAnswer.YES) {
        this.emitError(
          syncRequestId,
          "Altimate datapilot cli is not installed.",
        );
        return;
      }
      try {
        await window.withProgress(
          {
            title: `Installing altimate-datapilot-cli...`,
            location: ProgressLocation.Notification,
            cancellable: false,
          },
          async () => {
            await this.dbtProjectContainer.installAltimateDatapilot();
            window.showInformationMessage(
              "Successfully installed altimate-datapilot-cli",
            );
          },
        );
      } catch (e) {
        this.emitError(
          syncRequestId,
          `Error while installing altimate datapilot cli: ${
            (e as Error).message
          }`,
        );
        this.dbtTerminal.error(
          "atimateDatapilotInstallation",
          "Error while installing altimate datapilot",
          e,
        );
        return;
      }
    }
    this.telemetry.sendTelemetryEvent("performDatapilotHealthcheck", {
      args: JSON.stringify(args),
    });
    try {
      window.showInformationMessage(
        "Started performing healthcheck. We will notify you once it's done.",
      );

      const projectHealthcheck =
        await this.dbtProjectContainer.executeAltimateDatapilotHealthcheck(
          args,
        );
      if (this._panel?.visible) {
        window.showInformationMessage("Healthcheck completed successfully.");
        this._panel!.webview.postMessage({
          command: "response",
          args: {
            syncRequestId,
            body: { projectHealthcheck },
            status: true,
          },
        });
        return;
      }
      const result = await window.showInformationMessage(
        "Healthcheck completed successfully.",
        "View results",
      );
      if (result === "View results") {
        this.dbtTerminal.debug(
          "InsightsPanel",
          "Sending healthcheck results to webview",
        );
        await commands.executeCommand("dbtPowerUser.Insights.focus");
      }
      this._panel!.webview.postMessage({
        command: "response",
        args: {
          syncRequestId,
          body: { projectHealthcheck },
          status: true,
        },
      });
    } catch (e) {
      this.emitError(
        syncRequestId,
        `Error while performing project governance checks:${
          (e as Error).message
        }`,
      );
      this.dbtTerminal.error(
        "atimateDatapilotGovernance",
        "Error while performing project governance checks",
        e,
      );
    }
  }

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...params } = message;

    switch (command) {
      case "getNotebooks":
        this.sendResponseToWebview({
          command: "response",
          syncRequestId: message.syncRequestId,
          // TODO: add other params here later
          data: await this.altimateRequest.getNotebooks(
            "",
            [],
            params.privacy as string,
          ),
        });
        break;
      case "getPreConfiguredNotebooks":
        this.sendResponseToWebview({
          command: "response",
          syncRequestId: message.syncRequestId,
          data: await this.altimateRequest.getPreConfiguredNotebooks(),
        });
        break;
      case "updateNotebookPrivacy":
        this.sendResponseToWebview({
          command: "response",
          syncRequestId: message.syncRequestId,
          data: await this.altimateRequest.updateNotebookPrivacy(
            params.notebookId as number,
            params.privacy as string,
          ),
        });
        break;
      case "selectDirectoryForManifest":
        this.selectDirectoryForManifest(syncRequestId);
        break;
      case "selectFiles":
        this.selectFiles(syncRequestId, params as SelectFilesProps);
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

        this.sendResponseToWebview({
          command: "response",
          syncRequestId,
          data: result,
        });
        break;
      case "altimateScan":
        this.altimateScan(syncRequestId, params as AltimateConfigProps);
        break;
      case "clearAltimateScanResults":
        commands.executeCommand("dbtPowerUser.clearAltimateScanResults", {});
        break;
      case "getDeferToProductionConfig":
        const { projectRoot } = params as { projectRoot?: string };
        const projectPath =
          projectRoot || (await this.getCurrentProject())?.projectRoot.fsPath;
        if (!projectPath) {
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: {
              error: "No project selected",
            },
            error: "No project selected",
          });
          return;
        }
        const config =
          this.deferToProdService.getDeferConfigByProjectRoot(projectPath);
        this.dbtTerminal.debug(
          "InsightsPanel",
          `getting defer config for ${projectPath}`,
          projectRoot,
        );

        const dbtIntegrationMode = workspace
          .getConfiguration("dbt")
          .get<string>("dbtIntegration", "core");

        this.sendResponseToWebview({
          command: "response",
          syncRequestId,
          data: {
            config,
            projectPath,
            dbtIntegrationMode,
          },
        });
        break;
      case "fetchProjectIntegrations":
        await this.fetchProjectIntegrations(
          syncRequestId,
          params as { clearCache?: boolean },
        );
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
      case "logDBTHealthcheckConfig":
        await this.altimateRequest.logDBTHealthcheckConfig(
          params.configId as string,
        );
        break;
      case "getInsightConfigs":
        await this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => await this.altimateRequest.getHealthcheckConfigs(),
          command,
          true,
        );
        break;
      default:
        super.handleCommand(message);
        break;
    }
  }
}
