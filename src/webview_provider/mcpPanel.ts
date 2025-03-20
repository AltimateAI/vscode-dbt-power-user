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
import { isCursor } from "../mcp/utils";

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
      case "getMcpOnboardingConfig":
        this.handleSyncRequestFromWebview(
          syncRequestId,
          async () => {
            return {
              ide: isCursor() ? "cursor" : "vscode",
            };
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
