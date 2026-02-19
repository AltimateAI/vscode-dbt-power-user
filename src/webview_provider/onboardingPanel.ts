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
      case "saveAltimateKey":
        // Save Altimate API key and instance name
        try {
          const { apiKey, instanceName } = message as HandleCommandProps & {
            apiKey: string;
            instanceName: string;
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
      default:
        super.handleCommand(message);
        break;
    }
  }
}
