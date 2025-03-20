import {
  AltimateRequest,
  DBTProjectContainer,
  DBTTerminal,
  provideSingleton,
  QueryManifestService,
  TelemetryService,
} from "@extension";
import {
  AltimateWebviewProvider,
  HandleCommandProps,
} from "./altimateWebviewProvider";
import { SharedStateService } from "../services/sharedStateService";
import { UsersService } from "../services/usersService";
import {
  CustomDocumentEditEvent,
  CustomDocumentOpenContext,
  CustomEditorProvider,
  EventEmitter,
  Uri,
  CancellationToken,
  CustomDocument,
  CustomDocumentBackupContext,
  CustomDocumentBackup,
  commands,
  WebviewPanel,
  Webview,
  WebviewView,
  ConfigurationTarget,
  workspace,
} from "vscode";
import path from "path";
import { DbtPowerUserMcpServer } from "../mcp";

@provideSingleton(McpPanel)
export class McpPanel
  extends AltimateWebviewProvider
  implements CustomEditorProvider
{
  public static readonly viewType = "dbtPowerUser.Mcp";
  protected viewPath = "/mcp";
  protected panelDescription = "MCP view";

  constructor(
    protected dbtProjectContainer: DBTProjectContainer,
    protected altimateRequest: AltimateRequest,
    protected telemetry: TelemetryService,
    protected emitterService: SharedStateService,
    protected dbtTerminal: DBTTerminal,
    protected queryManifestService: QueryManifestService,
    protected usersService: UsersService,
    protected mcpServer: DbtPowerUserMcpServer,
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
  }

  private readonly _onDidChangeCustomDocument = new EventEmitter<
    CustomDocumentEditEvent<any>
  >();
  public readonly onDidChangeCustomDocument =
    this._onDidChangeCustomDocument.event;

  public async openCustomDocument(
    uri: Uri,
    openContext: CustomDocumentOpenContext,
    token: CancellationToken,
  ): Promise<CustomDocument> {
    return { uri, dispose: () => {} };
  }

  async handleCommand(message: HandleCommandProps): Promise<void> {
    const { command, syncRequestId, ...params } = message;
    switch (command) {
      case "configureMcp":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            const port = await this.mcpServer.start();
            if (!port) {
              throw new Error("Failed to start MCP server");
            }

            const success =
              await this.mcpServer.updatePortInCursorMcpSettings(port);
            if (!success) {
              throw new Error("Failed to update Cursor MCP settings");
            }
            return {
              status: true,
              step: 2,
            };
          },
          command,
        );
        break;
      case "enableDataSourceQueryTools":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            const enabled = params.enabled ?? true;
            await workspace
              .getConfiguration("dbt")
              .update(
                "enableMcpDataSourceQueryTools",
                enabled,
                ConfigurationTarget.Global,
              );
            return {
              status: true,
            };
          },
          command,
        );
        break;
      case "completeMcpOnboarding":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            // Close the MCP walkthrough editor
            if (this._panel) {
              (this._panel as WebviewPanel).dispose();
            }
            return {
              status: true,
              step: 3,
            };
          },
          command,
        );
        break;
      case "getMcpOnboardingSteps":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            return [
              {
                title: "Setup MCP server",
                description:
                  "In this step, MCP server will be started and a configuration file will be created",
                enableButton: "Let's do it!",
              },
              {
                title: "Advanced Data Tools",
                description:
                  "Enhance your experience with advanced data exploration features. By enabling this option, you allow data lookup queries to be processed and shared with Cursor. Features include:\n• Query specific column values\n• Execute SQL\n• Previewing data structures",
                enableButton: "Enable Advanced Features",
                disableButton: "Disable Features",
              },
              {
                title: "Enable MCP server",
                description:
                  "Open Cursor Settings and select the MCP from sidebar. Click 'Disabled' button next to 'dbtPowerUser' to enable it.",
                image: "EnableMcpImage",
                enableButton: "Ok done!",
              },
              {
                title: "Try out the chat!",
                description:
                  "Open chat and select agent mode. Try this prompt 'Get list of projects'. If you see message like 'Called MCP tool', then you are all set!",
                image: "TryChatImage",
                enableButton: "All set!",
              },
            ];
          },
          command,
        );
        break;
      default:
        super.handleCommand(message);
        break;
    }
  }

  public async resolveCustomEditor(
    document: CustomDocument,
    webviewPanel: WebviewPanel,
    token: CancellationToken,
  ): Promise<void> {
    this._panel = webviewPanel;
    this._webview = webviewPanel.webview;
    webviewPanel.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        Uri.file(
          path.join(
            this.dbtProjectContainer.extensionUri.fsPath,
            "webview_panels",
            "dist",
            "assets",
          ),
        ),
      ],
    };

    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);
    webviewPanel.webview.onDidReceiveMessage(this.handleCommand, this, []);
  }

  public saveCustomDocument(
    document: CustomDocument,
    cancellation: CancellationToken,
  ): Promise<void> {
    return Promise.resolve();
  }

  public saveCustomDocumentAs(
    document: CustomDocument,
    destination: Uri,
    cancellation: CancellationToken,
  ): Promise<void> {
    return Promise.resolve();
  }

  public revertCustomDocument(
    document: CustomDocument,
    cancellation: CancellationToken,
  ): Promise<void> {
    return Promise.resolve();
  }

  public backupCustomDocument(
    document: CustomDocument,
    context: CustomDocumentBackupContext,
    cancellation: CancellationToken,
  ): Promise<CustomDocumentBackup> {
    return Promise.resolve({
      id: context.destination.toString(),
      delete: () => Promise.resolve(),
    });
  }

  private getHtmlForWebview(webview: Webview): string {
    return super.getHtml(webview, this.dbtProjectContainer.extensionUri);
  }
}
