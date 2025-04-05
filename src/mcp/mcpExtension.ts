import { provideSingleton } from "@extension";
import { McpTool } from "./types";
import { Disposable, extensions, workspace } from "vscode";
import { DbtPowerUserMcpServerTools } from "./server";

type ToolRegistry = {
  registerTool: (tools: McpTool) => Promise<void>;
};

@provideSingleton(McpExtensionIntegration)
export class McpExtensionIntegration implements Disposable {
  private disposables: Disposable[] = [];

  constructor(private readonly mcpServer: DbtPowerUserMcpServerTools) {
    workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration("dbt.enableMcpExtensionIntegration")) {
        this.verifyAndEnableMcpExtensionIntegration();
      }
    });

    this.verifyAndEnableMcpExtensionIntegration();
  }

  private verifyAndEnableMcpExtensionIntegration() {
    const enableMcpExtensionIntegration = workspace
      .getConfiguration("dbt")
      .get("enableMcpExtensionIntegration") as boolean;

    if (enableMcpExtensionIntegration) {
      this.enableMcpExtensionIntegration();
    } else {
      this.dispose();
    }
  }

  private async enableMcpExtensionIntegration() {
    const extension = extensions.getExtension(
      "innoverio.vscode-altimate-mcp-server",
    )!;

    if (!extension.isActive) {
      await extension.activate();
    }
    await extension.exports.ready;

    const api: ToolRegistry = extension.exports;

    try {
      const tools = this.mcpServer.getMcpTools();
      tools.forEach(async (tool) => {
        await api.registerTool(tool);
      });
    } catch (error) {
      console.error("Error registering tool:", error);
    }
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }
}
