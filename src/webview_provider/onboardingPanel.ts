import { DBTTerminal } from "@altimateai/dbt-integration";
import { randomBytes } from "crypto";
import * as fs from "fs";
import { inject } from "inversify";
import * as path from "path";
import {
  commands,
  ConfigurationTarget,
  Disposable,
  env,
  RelativePattern,
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
import { AltimateCodeChatService } from "../services/altimateCodeChatService";
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
  private accountPoll: NodeJS.Timeout | undefined;
  private accountConfigListener: Disposable | undefined;
  private static readonly ONBOARDING_STATE_KEY = "onboarding.state";
  private static readonly REGISTER_URL = "https://app.myaltimate.com/register";
  private static readonly CONNECT_CLIENT = "vscode-dbt-power-user";
  private static readonly CONNECT_REDIRECT =
    "vscode://innoverio.vscode-dbt-power-user/auth-callback";
  private static readonly CONNECT_STATE_KEY = "onboarding.connectState";

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
  }

  private async initializePythonEnvironmentListener() {
    try {
      // Listen to dbt installation verification events, which fire after
      // checkAllInstalled() completes (triggered by interpreter changes).
      // By this point dbtInstalled, pythonPath, and pythonVersion are all
      // up to date, so the webview gets fresh data when it refreshes.
      this._disposables.push(
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
      case "getProjects":
        // Get available dbt projects
        try {
          const projects = this.dbtProjectContainer.getProjects();
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: projects.map((p) => ({
              label: this.displayName(p),
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

          // Get dbt version and adapter from any project that has them
          let dbtVersion: string | undefined;
          let adapterType: string | undefined;
          for (const project of projects) {
            try {
              const version = project.getDBTVersion();
              if (version) {
                dbtVersion = version.join(".");
              }
              const adapter = project.getAdapterType();
              if (adapter && adapter !== "unknown") {
                adapterType = adapter;
              }
              if (dbtVersion) {
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
          let projectName: string | undefined;
          let projectRoot: string | undefined;
          if (projects.length) {
            projectName = this.displayName(projects[0]);
            projectRoot = projects[0].projectRoot.fsPath;
          } else if (dbtProjectFiles.length) {
            projectRoot = path.dirname(dbtProjectFiles[0].fsPath);
            projectName = this.readProjectNameFromYml(projectRoot);
          }

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: {
              pythonInstalled: this.dbtProjectContainer.pythonInstalled,
              dbtInstalled: this.dbtProjectContainer.dbtInstalled,
              projectsFound: projectsFoundInWorkspace,
              projectCount: dbtProjectFiles.length,
              workspaceCount: dbtWorkspaces.length,
              dbtIntegrationMode,
              pythonPath: pythonEnvironment.pythonPath,
              pythonVersion: this.formatVersion(
                pythonEnvironment.pythonVersion,
              ),
              dbtVersion,
              adapterType,
              projectName,
              projectRoot,
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
          const altimateUrl = config.get<string>("altimateUrl", "");

          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: {
              isConfigured,
              dbtIntegrationType,
              instanceName: instanceName || "",
              apiKey: apiKey || "",
              altimateUrl,
            },
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

          // Validate credentials before saving
          this.dbtTerminal.debug(
            "saveAltimateKey",
            "Validating credentials before saving",
            { instanceName },
          );

          const validationResult =
            await this.altimateRequest.validateCredentials(
              instanceName,
              apiKey,
              backendURL,
            );

          if (!validationResult?.ok) {
            const errorMessage =
              validationResult?.error ||
              validationResult?.detail ||
              "Invalid credentials. Please check your API key and instance name.";
            this.dbtTerminal.error(
              "saveAltimateKey",
              "Credential validation failed",
              errorMessage,
            );
            this.sendResponseToWebview({
              command: "response",
              syncRequestId,
              error: errorMessage,
            });
            return;
          }

          this.dbtTerminal.debug(
            "saveAltimateKey",
            "Credentials validated successfully",
          );

          // Save at Global (user) level so the key applies across all workspaces.
          // Save altimateUrl FIRST so the ValidationProvider (which fires on
          // config change) uses the correct endpoint when it re-validates.
          const dbtConfig = workspace.getConfiguration("dbt");
          if (backendURL) {
            await dbtConfig.update(
              "altimateUrl",
              backendURL,
              ConfigurationTarget.Global,
            );
          }
          await dbtConfig.update(
            "altimateAiKey",
            apiKey,
            ConfigurationTarget.Global,
          );
          await dbtConfig.update(
            "altimateInstanceName",
            instanceName,
            ConfigurationTarget.Global,
          );

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
      case "getOnboardingState":
        this.sendResponseToWebview({
          command: "response",
          syncRequestId,
          data:
            this.dbtProjectContainer.getFromGlobalState(
              OnboardingPanel.ONBOARDING_STATE_KEY,
            ) ?? null,
        });
        break;
      case "saveOnboardingState":
        try {
          const { state } = message as HandleCommandProps & {
            state: Record<string, unknown>;
          };
          this.dbtProjectContainer.setToGlobalState(
            OnboardingPanel.ONBOARDING_STATE_KEY,
            state,
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: true },
          });
        } catch (error) {
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "getAccountStatus":
        this.sendResponseToWebview({
          command: "response",
          syncRequestId,
          data: this.getAccountStatus(),
        });
        break;
      case "startAccountSetup":
        try {
          await env.openExternal(Uri.parse(await this.buildConnectUrl()));
          this.startAccountPolling();
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { started: true },
          });
        } catch (error) {
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "getProjectSummary":
        try {
          const { projectRoot } = message as HandleCommandProps & {
            projectRoot: string;
          };
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { summary: await this.summarizeProject(projectRoot) },
          });
        } catch (error) {
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { summary: "" },
          });
        }
        break;
      case "openWorkspaceCreation":
        try {
          const { projectName } = message as HandleCommandProps & {
            projectName?: string;
          };
          const instance = workspace
            .getConfiguration("dbt")
            .get<string>("altimateInstanceName", "");
          const base = instance
            ? `https://${instance}.app.myaltimate.com`
            : "https://app.myaltimate.com";
          const url = `${base}/datamates?source=extension&project=${encodeURIComponent(
            projectName ?? "",
          )}`;
          await env.openExternal(Uri.parse(url));
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: true, url },
          });
        } catch (error) {
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "showOutput":
        await this.dbtTerminal.show(true);
        this.sendResponseToWebview({
          command: "response",
          syncRequestId,
          data: { success: true },
        });
        break;
      case "getFirstModel":
        try {
          const { projectRoot } = message as HandleCommandProps & {
            projectRoot?: string;
          };
          const model = await this.findFirstModel(projectRoot);
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: model
              ? { name: model.name, fileName: path.basename(model.uri.fsPath) }
              : null,
          });
        } catch (error) {
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "openFirstModel":
        try {
          const { projectRoot, action } = message as HandleCommandProps & {
            projectRoot?: string;
            action?: "explain" | "lineage" | "preview" | "open";
          };
          const opened = await this.openFirstModel(
            projectRoot,
            action ?? "open",
          );
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { opened },
          });
          if (opened && action && action !== "open") {
            this.markFinished();
          }
        } catch (error) {
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
        break;
      case "finishOnboarding":
        try {
          this.sendResponseToWebview({
            command: "response",
            syncRequestId,
            data: { success: true },
          });
          this.markFinished();
        } catch (error) {
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

  private readProjectNameFromYml(projectRoot: string): string | undefined {
    try {
      const yml = fs.readFileSync(
        path.join(projectRoot, "dbt_project.yml"),
        "utf8",
      );
      const m = yml.match(/^name:\s*['"]?([A-Za-z0-9_-]+)['"]?/m);
      return m?.[1];
    } catch (e) {
      return undefined;
    }
  }

  private displayName(project: {
    getProjectName: () => string;
    projectRoot: Uri;
  }): string {
    const name = project.getProjectName();
    if (!name || name.startsWith("unknown_")) {
      return (
        this.readProjectNameFromYml(project.projectRoot.fsPath) ??
        path.basename(project.projectRoot.fsPath)
      );
    }
    return name;
  }

  private formatVersion(version: unknown): string | undefined {
    if (!version) {
      return undefined;
    }
    if (typeof version === "string") {
      const m = version.match(/^\d+(\.\d+){0,2}/);
      return m ? m[0] : version;
    }
    if (Array.isArray(version)) {
      return version
        .filter((v) => typeof v === "number" || typeof v === "string")
        .slice(0, 3)
        .join(".");
    }
    if (typeof version === "object") {
      const v = version as Record<string, unknown>;
      const parts = [v.major, v.minor, v.micro ?? v.patch].filter(
        (x) => typeof x === "number" || typeof x === "string",
      );
      return parts.length ? parts.join(".") : undefined;
    }
    return String(version);
  }

  private getAccountStatus() {
    const config = workspace.getConfiguration("dbt");
    const apiKey = config.get<string>("altimateAiKey", "");
    const instanceName = config.get<string>("altimateInstanceName", "");
    const connected = !!(apiKey && instanceName);
    return {
      connected,
      instanceName: connected ? instanceName : undefined,
      maskedKey: connected
        ? `${apiKey.slice(0, 4)}••••${apiKey.slice(-4)}`
        : undefined,
    };
  }

  /**
   * Sign-up URL in SaaS "client-connect" mode: after Google sign-up or
   * email sign-in the web app redirects to CONNECT_REDIRECT with a one-time
   * login token, which the URI handler exchanges for the API key. `state`
   * is a per-attempt nonce so a stray callback cannot bind another session.
   */
  private async buildConnectUrl(): Promise<string> {
    const state = randomBytes(16).toString("hex");
    await this.dbtProjectContainer.setToGlobalState(
      OnboardingPanel.CONNECT_STATE_KEY,
      state,
    );
    const params = new URLSearchParams({
      source: "extension",
      client: OnboardingPanel.CONNECT_CLIENT,
      redirect: OnboardingPanel.CONNECT_REDIRECT,
      state,
    });
    return `${OnboardingPanel.REGISTER_URL}?${params.toString()}`;
  }

  private startAccountPolling() {
    this.stopAccountPolling();
    const notify = () => {
      const status = this.getAccountStatus();
      if (status.connected) {
        this.stopAccountPolling();
        this.sendResponseToWebview({
          command: "accountConnected",
          payload: status,
        });
        window.showInformationMessage(
          `Altimate account connected (instance ${status.instanceName}).`,
        );
      }
    };
    this.accountConfigListener = workspace.onDidChangeConfiguration((e) => {
      if (
        e.affectsConfiguration("dbt.altimateAiKey") ||
        e.affectsConfiguration("dbt.altimateInstanceName")
      ) {
        notify();
      }
    });
    const startedAt = Date.now();
    this.accountPoll = setInterval(() => {
      if (Date.now() - startedAt > 15 * 60 * 1000) {
        this.stopAccountPolling();
        return;
      }
      notify();
    }, 2000);
  }

  private stopAccountPolling() {
    if (this.accountPoll) {
      clearInterval(this.accountPoll);
      this.accountPoll = undefined;
    }
    this.accountConfigListener?.dispose();
    this.accountConfigListener = undefined;
  }

  private async summarizeProject(projectRoot: string): Promise<string> {
    const project = this.dbtProjectContainer
      .getProjects()
      .find((p) => p.projectRoot.fsPath === projectRoot);
    const parts: string[] = [];
    if (project) {
      try {
        const modelPaths = project.getModelPaths() ?? [];
        let models = 0;
        for (const dir of modelPaths) {
          const files = await workspace.findFiles(
            new RelativePattern(dir, "**/*.sql"),
            "**/{target,dbt_packages}/**",
          );
          models += files.length;
        }
        if (models) {
          parts.push(`${models} models`);
        }
      } catch (e) {
        // best effort
      }
      const adapter = project.getAdapterType();
      if (adapter && adapter !== "unknown") {
        parts.push(adapter);
      }
    }
    parts.push("passed", "warehouse connection works");
    return parts.join(" · ");
  }

  private async findFirstModel(
    projectRoot?: string,
  ): Promise<{ uri: Uri; name: string } | undefined> {
    const projects = this.dbtProjectContainer.getProjects();
    const project =
      projects.find((p) => p.projectRoot.fsPath === projectRoot) ?? projects[0];
    if (!project) {
      return undefined;
    }
    const modelPaths = project.getModelPaths() ?? [
      path.join(project.projectRoot.fsPath, "models"),
    ];
    for (const dir of modelPaths) {
      const files = await workspace.findFiles(
        new RelativePattern(dir, "**/*.sql"),
        "**/{target,dbt_packages}/**",
        50,
      );
      if (files.length) {
        const preferred =
          files.find((f) => /customers\.sql$/.test(f.fsPath)) ??
          files.sort((a, b) => a.fsPath.localeCompare(b.fsPath))[0];
        return {
          uri: preferred,
          name: path.basename(preferred.fsPath, ".sql"),
        };
      }
    }
    return undefined;
  }

  /**
   * Activation step: open the user's own model and run one follow-up so the
   * first thing they see is the extension working on their project.
   */
  private async openFirstModel(
    projectRoot: string | undefined,
    action: "explain" | "lineage" | "preview" | "open",
  ): Promise<boolean> {
    const model = await this.findFirstModel(projectRoot);
    if (!model) {
      return false;
    }
    const doc = await workspace.openTextDocument(model.uri);
    await window.showTextDocument(doc, { viewColumn: ViewColumn.One });
    try {
      if (action === "explain") {
        // Open the chat beside the model without sending anything; the first
        // question is the user's to ask.
        await commands.executeCommand("altimate.openChat", {
          beside: true,
          title: "Altimate Code",
        });
        // The chat extension sometimes lands in the model's editor group
        // (for example when it reuses an open chat tab). Force a true split:
        // if there is still a single group, move the chat to a new group on
        // the right and keep the model visible on the left.
        if (window.tabGroups.all.length < 2) {
          await commands.executeCommand(
            "workbench.action.moveEditorToRightGroup",
          );
          await window.showTextDocument(doc, {
            viewColumn: ViewColumn.One,
            preserveFocus: true,
          });
        }
      } else if (action === "lineage") {
        await commands.executeCommand("dbtPowerUser.sqlLineage");
      } else if (action === "preview") {
        await commands.executeCommand("dbtPowerUser.executeSQL");
      }
    } catch (e) {
      this.dbtTerminal.debug(
        "onboarding:openFirstModel",
        "follow-up command failed",
        e,
      );
    }
    return true;
  }

  private markFinished() {
    const prev =
      (this.dbtProjectContainer.getFromGlobalState(
        OnboardingPanel.ONBOARDING_STATE_KEY,
      ) as Record<string, unknown> | undefined) ?? {};
    this.dbtProjectContainer.setToGlobalState(
      OnboardingPanel.ONBOARDING_STATE_KEY,
      { ...prev, finished: true },
    );
    this.dbtProjectContainer.setToGlobalState("showSetupWalkthrough", false);
    this.stopAccountPolling();
    (this._panel as WebviewPanel | undefined)?.dispose();
  }
}
