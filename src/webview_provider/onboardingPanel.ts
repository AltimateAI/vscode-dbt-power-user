import { DBTTerminal } from "@altimateai/dbt-integration";
import { inject } from "inversify";
import {
  commands,
  Uri,
  ViewColumn,
  WebviewPanel,
  window,
  workspace,
} from "vscode";
import { AltimateRequest } from "../altimate";
import { WalkthroughCommands } from "../commands/walkthroughCommands";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { AltimateAuthService } from "../services/altimateAuthService";
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
  protected panelDescription = "dbt Power User onboarding experience";

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
    );

    const t = this;
    this._disposables.push(
      emitterService.eventEmitter.event((d) =>
        t.onEvent(d as SharedStateEventEmitterProps),
      ),
    );

    // Initialize Python environment and listen to changes
    this.initializePythonEnvironmentListener();
  }

  private async initializePythonEnvironmentListener() {
    try {
      const pythonEnvironment = this.dbtProjectContainer.getPythonEnvironment();
      // Ensure Python environment is initialized before accessing event
      await pythonEnvironment.initialize();

      // Listen to Python environment changes and notify webview
      this._disposables.push(
        pythonEnvironment.onPythonEnvironmentChanged(() => {
          this.dbtTerminal.debug(
            "onboardingPanel:pythonEnvironmentChanged",
            "Python environment changed, notifying webview",
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
        if (this._panel) {
          (this._panel as WebviewPanel).dispose();
        }
        const webviewPanel = window.createWebviewPanel(
          OnboardingPanel.viewType,
          "Get Started with dbt Power User",
          {
            viewColumn: ViewColumn.Active,
          },
          { enableScripts: true, retainContextWhenHidden: true },
        );
        this._panel = webviewPanel;
        this.renderWebview(webviewPanel);

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

          await this.walkthroughCommands.installDeps({
            label: project.getProjectName(),
            description: projectRoot,
            uri: projectUri,
          });

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

          await this.walkthroughCommands.validateProjects({
            label: project.getProjectName(),
            description: projectRoot,
            uri: projectUri,
          });

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: true },
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
      case "checkAltimateConfiguration":
        // Check if Altimate is already configured
        try {
          const config = workspace.getConfiguration("dbt");
          const apiKey = config.get<string>("altimateAiKey");
          const instanceName = config.get<string>("altimateInstanceName");
          const dbtIntegrationType = config.get<string>(
            "dbtIntegration",
            "core",
          );

          const isConfigured = !!(apiKey && instanceName);

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { isConfigured, dbtIntegrationType },
          });
        } catch (error) {
          this.dbtTerminal.error(
            "checkAltimateConfiguration",
            "Error checking Altimate configuration",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "saveAltimateKey":
        // Save Altimate API key and instance name
        try {
          const { apiKey, instanceName, backendURL } =
            message as HandleCommandProps & {
              apiKey: string;
              instanceName: string;
              backendURL?: string;
            };

          // Save to VSCode settings
          await commands.executeCommand(
            "workbench.action.openSettings",
            "dbt.altimateAiKey",
          );

          // Use workspace configuration to save the settings
          const config = workspace.getConfiguration("dbt");
          await config.update("altimateAiKey", apiKey, true);
          await config.update("altimateInstanceName", instanceName, true);
          if (backendURL) {
            await config.update("altimateUrl", backendURL, true);
          }

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: true },
          });
        } catch (error) {
          this.dbtTerminal.error(
            "saveAltimateKey",
            "Error saving Altimate API key",
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

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: {
              pythonInstalled: this.dbtProjectContainer.pythonInstalled,
              dbtInstalled: this.dbtProjectContainer.dbtInstalled,
              projectsFound: projects.length > 0,
              projectCount: projects.length,
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
          await config.update("dbtIntegration", integrationType, true);

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
      case "createDbtIntegration":
        // Create dbt integration via Altimate API
        try {
          const { name, environment, integrationType } =
            message as HandleCommandProps & {
              name: string;
              environment: string;
              integrationType: "dbt_core" | "dbt_cloud";
            };

          if (!name || !environment || !integrationType) {
            throw new Error("Missing required parameters");
          }

          const config = workspace.getConfiguration("dbt");
          const instanceName = config.get<string>("altimateInstanceName");
          const apiKey = config.get<string>("altimateAiKey");

          if (!instanceName || !apiKey) {
            throw new Error(
              "Altimate API key and instance name must be configured first",
            );
          }

          // Call Altimate API to create the integration
          const response = await this.altimateRequest.createDbtIntegration(
            instanceName,
            apiKey,
            name,
            environment,
            integrationType,
          );

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: response,
          });
        } catch (error) {
          this.dbtTerminal.error(
            "createDbtIntegration",
            "Error creating dbt integration",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "getIntegrations":
        // Fetch existing dbt integrations from Altimate API
        try {
          const integrations =
            await this.altimateRequest.fetchProjectIntegrations();
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: integrations || [],
          });
        } catch (error) {
          this.dbtTerminal.error(
            "getIntegrations",
            "Error fetching integrations",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: [],
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "getIntegrationSyncStatus":
        // Fetch integration sync status from Altimate API
        try {
          const { integrationId, environment } =
            message as HandleCommandProps & {
              integrationId: number;
              environment: string;
            };

          if (!integrationId || !environment) {
            throw new Error("Missing integrationId or environment");
          }

          const integrationWithSync =
            await this.altimateRequest.fetchProjectIntegrationWithSync(
              integrationId,
              environment,
            );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: integrationWithSync || null,
          });
        } catch (error) {
          this.dbtTerminal.error(
            "getIntegrationSyncStatus",
            "Error fetching integration sync status",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: null,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "checkDatapilotInstalled":
        // Check if datapilot CLI is installed
        try {
          const isInstalled =
            await this.dbtProjectContainer.checkIfAltimateDatapilotInstalled();
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { isInstalled },
          });
        } catch (error) {
          this.dbtTerminal.error(
            "checkDatapilotInstalled",
            "Error checking datapilot installation",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { isInstalled: false },
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "installDatapilot":
        // Install datapilot CLI
        try {
          await this.dbtProjectContainer.installAltimateDatapilot();
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: true },
          });
        } catch (error) {
          this.dbtTerminal.error(
            "installDatapilot",
            "Error installing datapilot",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: false },
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "getAltimateConfig":
        // Get Altimate configuration for datapilot command
        try {
          const config = workspace.getConfiguration("dbt");
          const apiKey = config.get<string>("altimateAiKey");
          const instanceName = config.get<string>("altimateInstanceName");
          const backendURL = this.altimateRequest.getAltimateUrl();

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { apiKey, instanceName, backendURL },
          });
        } catch (error) {
          this.dbtTerminal.error(
            "getAltimateConfig",
            "Error getting Altimate configuration",
            error,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { apiKey: "", instanceName: "", backendURL: "" },
            error: error instanceof Error ? error.message : String(error),
          });
        }
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
}
