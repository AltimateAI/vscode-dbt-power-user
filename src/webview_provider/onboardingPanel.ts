import {
  DBTTerminal,
  RESOURCE_TYPE_MODEL,
  RESOURCE_TYPE_SEED,
} from "@altimateai/dbt-integration";
import { existsSync } from "fs";
import { inject } from "inversify";
import { homedir } from "os";
import { basename, join, sep } from "path";
import {
  commands,
  ConfigurationTarget,
  extensions,
  Uri,
  ViewColumn,
  WebviewPanel,
  window,
  workspace,
} from "vscode";
import { AltimateRequest } from "../altimate";
import { WalkthroughCommands } from "../commands/walkthroughCommands";
import {
  DBTProjectContainer,
  ONBOARDING_STATE_KEY,
  OnboardingState,
} from "../dbt_client/dbtProjectContainer";
import { AltimateAuthService } from "../services/altimateAuthService";
import { AltimateCodeChatService } from "../services/altimateCodeChatService";
import { AltimateConnectService } from "../services/altimateConnectService";
import { QueryManifestService } from "../services/queryManifestService";
import { SharedStateService } from "../services/sharedStateService";
import { UsersService } from "../services/usersService";
import { TelemetryService } from "../telemetry";
import {
  AltimateWebviewProvider,
  HandleCommandProps,
  SharedStateEventEmitterProps,
} from "./altimateWebviewProvider";

export class OnboardingPanel extends AltimateWebviewProvider {
  public static readonly viewType = "dbtPowerUser.Onboarding";
  protected viewPath = "/onboarding";
  protected panelDescription = "Power User for dbt onboarding experience";
  private pendingStepNavigation: string | undefined;

  public constructor(
    protected dbtProjectContainer: DBTProjectContainer,
    protected altimateRequest: AltimateRequest,
    protected telemetry: TelemetryService,
    protected emitterService: SharedStateService,
    @inject("DBTTerminal")
    protected dbtTerminal: DBTTerminal,
    protected queryManifestService: QueryManifestService,
    protected usersService: UsersService,
    protected walkthroughCommands: WalkthroughCommands,
    protected altimateAuthService: AltimateAuthService,
    altimateCodeChatService: AltimateCodeChatService,
    protected altimateConnectService: AltimateConnectService,
  ) {
    super(
      dbtProjectContainer,
      altimateRequest,
      telemetry,
      emitterService,
      dbtTerminal,
      queryManifestService,
      usersService,
      altimateAuthService,
      altimateCodeChatService,
    );

    const t = this;
    this._disposables.push(
      emitterService.eventEmitter.event((d) =>
        t.onEvent(d as SharedStateEventEmitterProps),
      ),
    );

    // Initialize Python environment and listen to changes
    this.initializePythonEnvironmentListener();

    this._disposables.push(
      altimateConnectService.onDidConnectAccount((account) =>
        this.sendResponseToWebview({
          command: "altimateAccountConnected",
          payload: account,
        }),
      ),
      altimateConnectService.onDidLinkWorkspace((link) =>
        this.sendResponseToWebview({
          command: "workspaceLinked",
          payload: link,
        }),
      ),
      altimateConnectService.onDidFailConnect((failure) =>
        this.sendResponseToWebview({
          command: "altimateConnectFailed",
          payload: failure,
        }),
      ),
    );
  }

  private async initializePythonEnvironmentListener() {
    try {
      // Listen to dbt installation verification events, which fire after
      // checkAllInstalled() completes (triggered by interpreter changes).
      // By this point dbtInstalled, pythonPath, and pythonVersion are all
      // up to date, so the webview gets fresh data when it refreshes.
      this._disposables.push(
        // Get Started can open before the projects finish loading.
        this.dbtProjectContainer.onManifestChanged(() =>
          this.sendResponseToWebview({ command: "projectsChanged" }),
        ),
        this.dbtProjectContainer.onDBTInstallationVerification((event) => {
          if (event.inProgress) {
            return;
          }
          this.dbtTerminal.debug(
            "onboardingPanel:dbtInstallationVerified",
            "dbt installation verification complete, notifying webview",
          );
          this.sendResponseToWebview({
            command: "pythonEnvironmentChanged",
          });
        }),
      );
    } catch (err) {
      this.dbtTerminal.error(
        "onboardingPanel:initializePythonEnvironmentListener",
        "Failed to initialize Python environment listener",
        err,
      );
    }
  }

  protected async onEvent({ command, payload }: SharedStateEventEmitterProps) {
    switch (command) {
      case "onboarding:render":
        this.dbtTerminal.debug(
          "onboarding:render",
          "rendering onboarding view",
          payload,
        );
        const initialStep = (payload as { initialStep?: string })?.initialStep;

        // If panel already exists and is ready, just navigate to the step
        if (this._panel && this.isWebviewReady && initialStep) {
          // Focus the panel if it's a WebviewPanel
          if ((this._panel as WebviewPanel).reveal) {
            (this._panel as WebviewPanel).reveal();
          }
          this.sendResponseToWebview({
            command: "navigateToStep",
            payload: { step: initialStep },
          });
          break;
        }

        // Store the step to navigate to after webview is ready
        this.pendingStepNavigation = initialStep;

        // Create new panel if it doesn't exist
        if (!this._panel) {
          const webviewPanel = window.createWebviewPanel(
            OnboardingPanel.viewType,
            "Get Started with Power User for dbt",
            {
              viewColumn: ViewColumn.Active,
            },
            { enableScripts: true, retainContextWhenHidden: true },
          );
          this._panel = webviewPanel;

          // Clear the panel reference when it's disposed
          webviewPanel.onDidDispose(() => {
            this._panel = undefined;
            this._webview = undefined;
            this.isWebviewReady = false;
          });

          this.renderWebview(webviewPanel);
        } else {
          // Focus the panel if it's a WebviewPanel
          if ((this._panel as WebviewPanel).reveal) {
            (this._panel as WebviewPanel).reveal();
          }
        }

        break;
      default:
        super.onEvent({ command, payload });
        break;
    }
  }

  protected renderWebviewView() {
    if (!this._webview) {
      return;
    }

    this._webview.onDidReceiveMessage(this.handleCommand, this, []);

    this._webview.html = this.getHtml(
      this._webview,
      this.dbtProjectContainer.extensionUri,
    );
  }

  private renderWebview(webview: WebviewPanel) {
    this._webview = webview.webview;
    this.renderWebviewView();
  }

  protected onWebviewReady() {
    super.onWebviewReady();

    // Send pending step navigation if any
    if (this.pendingStepNavigation) {
      this.sendResponseToWebview({
        command: "navigateToStep",
        payload: { step: this.pendingStepNavigation },
      });
      this.pendingStepNavigation = undefined;
    }
  }

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId } = message;

    switch (command) {
      case "openSetupWizard":
        // Trigger the VSCode walkthrough
        await commands.executeCommand(
          "workbench.action.openWalkthrough",
          "innoverio.vscode-dbt-power-user#initialSetup",
        );
        this.sendResponseToWebview({
          command: "response",
          syncRequestId,
          data: { success: true },
        });
        break;
      case "getProjects":
        // Get available dbt projects
        try {
          const projects = this.dbtProjectContainer.getProjects();
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: projects.map((p) => ({
              label: p.getProjectName(),
              projectRoot: p.projectRoot.fsPath,
            })),
          });
        } catch (error) {
          this.dbtTerminal.error(
            "getProjects",
            "Error getting projects",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "runDbtDeps":
        // Run dbt deps for selected project
        try {
          const { projectRoot } = message as HandleCommandProps & {
            projectRoot: string;
          };
          const projectUri = Uri.file(projectRoot);
          const projects = this.dbtProjectContainer.getProjects();
          const project = projects.find(
            (p) => p.projectRoot.fsPath === projectRoot,
          );

          if (!project) {
            throw new Error(`Project not found: ${projectRoot}`);
          }

          await this.walkthroughCommands.installDeps(
            {
              label: project.getProjectName(),
              description: projectRoot,
              uri: projectUri,
            },
            true,
          );

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: true },
          });
        } catch (error) {
          this.dbtTerminal.error("runDbtDeps", "Error running dbt deps", error);
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "validateProject":
        // Validate project setup
        try {
          const { projectRoot } = message as HandleCommandProps & {
            projectRoot: string;
          };
          const projectUri = Uri.file(projectRoot);
          const projects = this.dbtProjectContainer.getProjects();
          const project = projects.find(
            (p) => p.projectRoot.fsPath === projectRoot,
          );

          if (!project) {
            throw new Error(`Project not found: ${projectRoot}`);
          }

          await this.walkthroughCommands.validateProjects(
            {
              label: project.getProjectName(),
              description: projectRoot,
              uri: projectUri,
            },
            true,
          );

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: {
              success: true,
              summary: this.getProjectSummary(projectUri),
            },
          });
        } catch (error) {
          this.dbtTerminal.error(
            "validateProject",
            "Error validating project",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "installDbt":
        // Install dbt with specified integration type
        try {
          const { integrationType } = message as HandleCommandProps & {
            integrationType: "core" | "fusion" | "cloud";
          };

          if (!integrationType) {
            throw new Error("No integration type specified");
          }

          // Set the dbt integration configuration before installation
          const config = workspace.getConfiguration("dbt");
          await config.update("dbtIntegration", integrationType, true);

          // Call the installDbt command
          await this.walkthroughCommands.installDbt();

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: true },
          });
        } catch (error) {
          this.dbtTerminal.error("installDbt", "Error installing dbt", error);
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "executeCommand":
        // Execute VSCode commands from the wizard
        try {
          const commandToExecute = (
            message as HandleCommandProps & { vscodeCommand?: string }
          ).vscodeCommand;
          if (!commandToExecute) {
            throw new Error("No VSCode command specified in message");
          }
          await commands.executeCommand(commandToExecute);
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: true },
          });
        } catch (error) {
          this.dbtTerminal.error(
            "executeCommand",
            "Error executing command",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "getDiagnosticsStatus":
        // Get current diagnostics status for setup prerequisites
        try {
          const projects = this.dbtProjectContainer.getProjects();
          const dbtWorkspaces = this.dbtProjectContainer.dbtWorkspaceFolders;
          const dbtIntegrationMode = workspace
            .getConfiguration("dbt")
            .get<string>("dbtIntegration", "core");
          const pythonEnvironment =
            this.dbtProjectContainer.getPythonEnvironment();

          // Get dbt version from any project that has it defined
          let dbtVersion: string | undefined;
          for (const project of projects) {
            try {
              const version = project.getDBTVersion();
              if (version) {
                dbtVersion = version.join(".");
                break;
              }
            } catch (error) {
              // Continue to next project
              continue;
            }
          }

          // Check if file associations are configured for dbt
          const filesConfig = workspace.getConfiguration("files");
          const associations =
            filesConfig.get<Record<string, string>>("associations") || {};
          const requiredAssociations = {
            "*.sql": "jinja-sql",
            "*.yml": "jinja-yaml",
            "*.yaml": "jinja-yaml",
          };
          const fileAssociationsConfigured = Object.entries(
            requiredAssociations,
          ).every(([pattern, language]) => associations[pattern] === language);

          // Check for dbt_project.yml files in workspace folders directly
          // This is more reliable than checking dbtProjectContainer which may not be initialized yet
          const excludePattern =
            "**/{dbt_packages,site-packages,dbt_internal_packages}";
          const dbtProjectFiles = await workspace.findFiles(
            "**/dbt_project.yml",
            excludePattern,
          );
          const projectsFoundInWorkspace = dbtProjectFiles.length > 0;

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: {
              projects: projects.map((p) => ({
                name: p.getProjectName(),
                projectRoot: p.projectRoot.fsPath,
                adapter: p.getAdapterType(),
              })),
              pythonInstalled: this.dbtProjectContainer.pythonInstalled,
              dbtInstalled: this.dbtProjectContainer.dbtInstalled,
              projectsFound: projectsFoundInWorkspace,
              projectCount: dbtProjectFiles.length,
              workspaceCount: dbtWorkspaces.length,
              dbtIntegrationMode,
              pythonPath: pythonEnvironment.pythonPath,
              pythonVersion: pythonEnvironment.pythonVersion,
              dbtVersion,
              fileAssociationsConfigured,
            },
          });
        } catch (error) {
          this.dbtTerminal.error(
            "getDiagnosticsStatus",
            "Error getting diagnostics status",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "setDbtIntegration":
        // Set dbt integration mode
        try {
          const { integrationType } = message as HandleCommandProps & {
            integrationType: "core" | "fusion" | "cloud";
          };

          if (!integrationType) {
            throw new Error("No integration type specified");
          }

          // Set the dbt integration configuration
          const config = workspace.getConfiguration("dbt");
          // A new integration reloads the window, so reopen Get Started after
          // it; the validation was for the old integration.
          if (config.get("dbtIntegration", "core") !== integrationType) {
            this.saveOnboardingState({ resume: true, validation: null });
          }
          await config.update(
            "dbtIntegration",
            integrationType,
            ConfigurationTarget.Workspace,
          );

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: true },
          });
        } catch (error) {
          this.dbtTerminal.error(
            "setDbtIntegration",
            "Error setting dbt integration",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "configureFileAssociations":
        // Configure file associations for dbt files
        try {
          const filesConfig = workspace.getConfiguration("files");
          const currentAssociations =
            filesConfig.get<Record<string, string>>("associations") || {};

          // Merge with existing associations (don't overwrite user's other associations)
          const updatedAssociations = {
            ...currentAssociations,
            "*.sql": "jinja-sql",
            "*.yml": "jinja-yaml",
            "*.yaml": "jinja-yaml",
          };

          // Update at user level (global = true)
          await filesConfig.update("associations", updatedAssociations, true);

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: true },
          });
        } catch (error) {
          this.dbtTerminal.error(
            "configureFileAssociations",
            "Error configuring file associations",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "getAltimateState":
        try {
          const { projectRoot } = message as HandleCommandProps & {
            projectRoot?: string;
          };
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: {
              signedIn: this.altimateAuthService.isAuthenticated(),
              instance: this.altimateRequest.getInstanceName() ?? "",
              canLinkWorkspace: this.altimateConnectService.canLinkWorkspace(),
              supportsBrowserSignIn:
                this.altimateConnectService.supportsBrowserSignIn(),
              appUrl: this.altimateConnectService.accountAppUrl(),
              workspaceId: projectRoot
                ? this.altimateConnectService.getLinkedWorkspaceId(projectRoot)
                : undefined,
            },
          });
        } catch (error) {
          this.dbtTerminal.error(
            "getAltimateState",
            "Error reading the Altimate account state",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "cancelAltimateSignIn":
        this.altimateConnectService.cancelSignIn();
        this.sendResponseToWebview({
          command: "response",
          syncRequestId,
          data: { success: true },
        });
        break;
      case "startAltimateSignIn":
      case "startWorkspaceLink":
        try {
          const { projectRoot, instance } = message as HandleCommandProps & {
            projectRoot?: string;
            instance?: string;
          };
          if (command === "startAltimateSignIn") {
            await this.altimateConnectService.startSignIn(instance);
          } else {
            if (!projectRoot) {
              throw new Error("No project specified");
            }
            await this.altimateConnectService.startWorkspaceLink(projectRoot);
          }
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: true },
          });
        } catch (error) {
          this.dbtTerminal.error(command, `Error running ${command}`, error);
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "getPythonInterpreters":
        try {
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: await this.getPythonInterpreters(),
          });
        } catch (error) {
          this.dbtTerminal.error(
            "getPythonInterpreters",
            "Error listing Python interpreters",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "setPythonInterpreter":
        try {
          const { pythonPath } = message as HandleCommandProps & {
            pythonPath: string;
          };
          const pythonApi = await this.getPythonApi();
          if (!pythonApi?.environments) {
            throw new Error("The Python extension is not available");
          }
          // An interpreter picked here replaces one found by "Detect From
          // Terminal", which would otherwise keep taking precedence.
          const folder = workspace.workspaceFolders?.[0];
          const dbtConfig = workspace.getConfiguration("dbt", folder);
          const override = dbtConfig.inspect<string>("dbtPythonPathOverride");
          if (override?.workspaceFolderValue) {
            await dbtConfig.update(
              "dbtPythonPathOverride",
              undefined,
              ConfigurationTarget.WorkspaceFolder,
            );
          }
          // A User-level override would still win, so this workspace is
          // pinned to the pick instead of changing the user's other ones.
          if (override?.workspaceValue || override?.globalValue) {
            await dbtConfig.update(
              "dbtPythonPathOverride",
              override.globalValue ? pythonPath : undefined,
              ConfigurationTarget.Workspace,
            );
          }
          await pythonApi.environments.updateActiveEnvironmentPath(
            pythonPath,
            folder,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: true },
          });
        } catch (error) {
          this.dbtTerminal.error(
            "setPythonInterpreter",
            "Error setting the Python interpreter",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "openProfilesYml":
        try {
          const { projectRoot } = message as HandleCommandProps & {
            projectRoot?: string;
          };
          if (!projectRoot) {
            throw new Error("No dbt project is selected");
          }
          // Resolve DBT_PROFILES_DIR the way dbt commands do: from the
          // Python environment's variables, which include .env files.
          const profilesDir =
            this.dbtProjectContainer
              .getPythonEnvironment()
              .getEnvironmentVariables(
                workspace.getWorkspaceFolder(Uri.file(projectRoot)),
              ).DBT_PROFILES_DIR ??
            (existsSync(join(projectRoot, "profiles.yml"))
              ? projectRoot
              : join(homedir(), ".dbt"));
          const profilesPath = join(profilesDir, "profiles.yml");
          if (!existsSync(profilesPath)) {
            window.showWarningMessage(
              `No profiles.yml at ${profilesPath}. Create it to configure the connection dbt uses.`,
            );
          } else {
            await window.showTextDocument(Uri.file(profilesPath));
          }
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: true },
          });
        } catch (error) {
          this.dbtTerminal.error(
            "openProfilesYml",
            "Error opening profiles.yml",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "openAltimateSettings":
        await commands.executeCommand(
          "workbench.action.openSettings",
          "dbt.altimate",
        );
        this.sendResponseToWebview({
          command: "response",
          syncRequestId,
          data: { success: true },
        });
        break;
      case "showLogs":
        await this.dbtTerminal.show(true);
        this.sendResponseToWebview({
          command: "response",
          syncRequestId,
          data: { success: true },
        });
        break;
      case "getOnboardingState":
        this.sendResponseToWebview({
          command: "response",
          syncRequestId,
          data: this.getOnboardingState(),
        });
        break;
      case "saveOnboardingState": {
        const { state } = message as HandleCommandProps & {
          state: OnboardingState;
        };
        this.saveOnboardingState(state);
        this.sendResponseToWebview({
          command: "response",
          syncRequestId,
          data: { success: true },
        });
        break;
      }
      case "getFirstModel": {
        const { projectRoot } = message as HandleCommandProps & {
          projectRoot?: string;
        };
        const model = projectRoot
          ? this.findFirstModel(projectRoot)
          : undefined;
        this.sendResponseToWebview({
          command: "response",
          syncRequestId,
          data: model ? { fileName: basename(model) } : null,
        });
        break;
      }
      case "openFirstModel":
        try {
          const { projectRoot, action } = message as HandleCommandProps & {
            projectRoot: string;
            action: "chat" | "lineage" | "preview";
          };
          await this.openFirstModel(projectRoot, action);
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: true },
          });
          this.finishOnboarding();
        } catch (error) {
          this.dbtTerminal.error(
            "openFirstModel",
            "Error opening a model from onboarding",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "finishOnboarding":
        this.finishOnboarding();
        break;
      case "openUrl":
        // Open URL in external browser
        try {
          const { url } = message as HandleCommandProps & {
            url: string;
          };

          if (!url) {
            throw new Error("No URL specified");
          }

          await commands.executeCommand("vscode.open", Uri.parse(url));

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: true },
          });
        } catch (error) {
          this.dbtTerminal.error("openUrl", "Error opening URL", error);
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      default:
        super.handleCommand(message);
        break;
    }
  }

  private getOnboardingState(): OnboardingState {
    return (
      this.dbtProjectContainer.getFromWorkspaceState(ONBOARDING_STATE_KEY) ?? {}
    );
  }

  private saveOnboardingState(state: OnboardingState) {
    this.dbtProjectContainer.setToWorkspaceState(ONBOARDING_STATE_KEY, {
      ...this.getOnboardingState(),
      ...state,
    });
  }

  /** Mark Get Started done, so it no longer opens by itself, and close it. */
  private finishOnboarding() {
    this.saveOnboardingState({ finished: true, resume: false });
    this.dbtProjectContainer.setToGlobalState("showSetupWalkthrough", false);
    (this._panel as WebviewPanel | undefined)?.dispose();
  }

  /** The project's `customers` model, or else its first SQL model by path. */
  private findFirstModel(projectRoot: string): string | undefined {
    const event = this.queryManifestService.getEventByDocument(
      Uri.file(projectRoot),
    );
    if (!event) {
      return undefined;
    }
    const projectName = event.project.getProjectName();
    const paths = Array.from(event.nodeMetaMap.nodes())
      .filter(
        (node) =>
          node.resource_type === RESOURCE_TYPE_MODEL &&
          node.package_name === projectName &&
          node.path?.endsWith(".sql"),
      )
      .map((node) => node.path as string)
      .sort();
    return paths.find((p) => basename(p) === "customers.sql") ?? paths[0];
  }

  /**
   * Open the project's first model on the left, with Altimate Code chat
   * beside it or the model's lineage or query preview.
   */
  private async openFirstModel(
    projectRoot: string,
    action: "chat" | "lineage" | "preview",
  ) {
    const model = this.findFirstModel(projectRoot);
    if (!model) {
      throw new Error("This project has no SQL models to open");
    }
    const editor = await window.showTextDocument(Uri.file(model), {
      viewColumn: ViewColumn.One,
    });
    if (action === "chat") {
      await this.altimateConnectService.openAltimateCode(projectRoot, {
        beside: true,
      });
      // Altimate Code reveals an open chat tab where it is, ignoring
      // `beside`, so split it out when it landed in the model's group.
      if (window.tabGroups.all.length < 2) {
        await commands.executeCommand(
          "workbench.action.moveEditorToRightGroup",
        );
        await window.showTextDocument(editor.document, {
          viewColumn: ViewColumn.One,
          preserveFocus: true,
        });
      }
    } else {
      await commands.executeCommand(
        action === "lineage"
          ? "dbtPowerUser.sqlLineage"
          : "dbtPowerUser.executeSQL",
      );
    }
  }

  /** Model, seed and test counts from the project's parsed manifest. */
  private getProjectSummary(projectUri: Uri) {
    const event = this.queryManifestService.getEventByDocument(projectUri);
    if (!event) {
      return undefined;
    }
    const projectName = event.project.getProjectName();
    const nodes = Array.from(event.nodeMetaMap.nodes()).filter(
      (node) => node.package_name === projectName,
    );
    // Test ids are `test.<package>.<name>`; count only the project's own.
    const tests = Array.from(event.testMetaMap.values()).filter((test) =>
      test.unique_id.startsWith(`test.${projectName}.`),
    );
    return {
      models: nodes.filter((n) => n.resource_type === RESOURCE_TYPE_MODEL)
        .length,
      seeds: nodes.filter((n) => n.resource_type === RESOURCE_TYPE_SEED).length,
      tests: tests.length,
    };
  }

  private async getPythonApi() {
    const extension = extensions.getExtension("ms-python.python");
    if (!extension) {
      return undefined;
    }
    if (!extension.isActive) {
      await extension.activate();
    }
    return extension.exports;
  }

  /** Interpreters the Python extension knows about. */
  private async getPythonInterpreters() {
    const pythonApi = await this.getPythonApi();
    if (!pythonApi?.environments) {
      return { interpreters: [] };
    }
    // Windows paths compare case-insensitively (drive letters differ).
    const normalize = (path: string) =>
      process.platform === "win32" ? path.toLowerCase() : path;
    const workspacePaths = (workspace.workspaceFolders ?? []).map((folder) =>
      normalize(folder.uri.fsPath + sep),
    );
    const interpreters = await Promise.all(
      pythonApi.environments.known.map(
        async (known: { path: string; id: string }) => {
          // One environment that fails to resolve still lists by its path.
          const env = await pythonApi.environments
            .resolveEnvironment(known)
            .catch(() => undefined);
          const pythonPath: string = env?.executable?.uri?.fsPath ?? known.path;
          const version = env?.version
            ? `${env.version.major}.${env.version.minor}.${env.version.micro}`
            : undefined;
          const tool: string =
            env?.tools?.[0]?.toLowerCase() ??
            env?.environment?.type?.toLowerCase() ??
            "system";
          const inWorkspace = workspacePaths.some((root) =>
            normalize(pythonPath).startsWith(root),
          );
          return {
            path: pythonPath,
            description: [
              version ? `Python ${version}` : "Python",
              inWorkspace ? `workspace ${tool}` : tool,
            ].join(" · "),
            recommended: inWorkspace,
          };
        },
      ),
    );
    return { interpreters };
  }
}
