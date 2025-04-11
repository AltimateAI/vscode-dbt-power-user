import { Disposable, workspace, extensions, ConfigurationTarget } from "vscode";
import { provideSingleton } from "../utils";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DbtPowerUserMcpServerTools } from "./server";
import { AltimateRequest } from "@extension";
import { ToolRegistry } from "./types";
import { SharedStateService } from "../services/sharedStateService";

@provideSingleton(DbtPowerUserMcpServer)
export class DbtPowerUserMcpServer implements Disposable {
  private disposables: Disposable[] = [];
  private mcpExtensionApi: ToolRegistry | undefined;

  constructor(
    private dbtPowerUserMcpServerTools: DbtPowerUserMcpServerTools,
    private dbtTerminal: DBTTerminal,
    private altimate: AltimateRequest,
    private eventEmitter: SharedStateService,
  ) {
    this.updateMcpExtensionApi();
    workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration("altimate.onboardedMcpServer")) {
        this.registerToolsInMcpExtension();
      }
    });

    this.disposables.push(
      this.eventEmitter.eventEmitter.event((d) => {
        if (d.command === "dbtProjectsInitialized") {
          this.registerToolsInMcpExtension();
        }
      }),
    );
  }

  private async updateMcpExtensionApi() {
    const extension = extensions.getExtension(
      "altimateai.vscode-altimate-mcp-server",
    );

    if (!extension) {
      this.dbtTerminal.error(
        "DbtPowerUserMcpServer: enableMcpExtensionIntegration",
        "Failed to install MCP extension",
        { message: "Failed to install Altimate MCP Server extension" },
      );
      return;
    }

    if (!extension.isActive) {
      await extension.activate();
    }
    await extension.exports.ready;
    this.mcpExtensionApi = extension.exports as ToolRegistry;

    await this.mcpExtensionApi.addMcpIntegrationConfig([
      {
        title: "Advanced Data Tools",
        description:
          "Enhance your experience with advanced data exploration features. By enabling this option, you allow data lookup queries to be processed and shared with Cursor. Features include:\n• Query specific column values\n• Execute SQL\n• Previewing data structures",
        enableButton: "Enable Advanced Features",
        disableButton: "Disable Features",
        ide: ["cursor", "vscode"],
        onCommandTrigger: async () => {
          return await workspace
            .getConfiguration("dbt")
            .update(
              "enableMcpDataSourceQueryTools",
              true,
              ConfigurationTarget.Global,
            );
        },
      },
    ]);
  }

  private async registerToolsInMcpExtension() {
    if (!this.mcpExtensionApi) {
      this.dbtTerminal.info(
        "DbtPowerUserMcpServer: registerToolsInMcpExtension",
        "MCP extension API not found",
      );
      return;
    }
    const onboardedAltimate = workspace
      .getConfiguration("altimate")
      .get<boolean>("onboardedMcpServer", false);
    if (!onboardedAltimate) {
      this.dbtTerminal.debug(
        "DbtPowerUserMcpServer",
        "Onboarding not completed, skipping tools registration",
      );
      return;
    }

    this.dbtTerminal.debug(
      "DbtPowerUserMcpServer",
      "Onboarding completed, proceeding with tools registration",
    );
    if (!this.altimate.handlePreviewFeatures()) {
      this.dbtTerminal.info(
        "DbtPowerUserMcpServer: enableMcpExtensionIntegration",
        "Preview features are not enabled, skipping MCP server start",
      );
      return;
    }

    try {
      const tools = this.dbtPowerUserMcpServerTools.getMcpTools();
      await this.mcpExtensionApi.registerTools(tools);
    } catch (error) {
      console.error("Error registering tool:", error);
    }
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }
}
