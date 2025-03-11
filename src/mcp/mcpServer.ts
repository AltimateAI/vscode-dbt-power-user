import "reflect-metadata";
import { stdin, stdout } from "process";
import { MCPServer, ToolDefinition } from "./types";
import { registerTools } from "./tools";
import { container } from "../inversify.config";
import { DBTPowerUserExtension } from "../dbtPowerUserExtension";
import { createLogger } from "./logger";
import { extensionVersion } from "./version";

const logger = createLogger("MCPServer");

/**
 * Main MCP Server class that handles MCP protocol communication
 * with Cursor or other MCP clients
 */
export class DBTPowerUserMCPServer {
  private server: MCPServer;
  private tools: ToolDefinition[] = [];
  private projectPath: string;
  private dbtProfilesPath?: string;
  private altimateApiKey?: string;
  private altimateInstance?: string;

  constructor(options: {
    projectPath: string;
    dbtProfilesPath?: string;
    altimateApiKey?: string;
    altimateInstance?: string;
  }) {
    this.projectPath = options.projectPath;
    this.dbtProfilesPath = options.dbtProfilesPath;
    this.altimateApiKey = options.altimateApiKey;
    this.altimateInstance = options.altimateInstance;

    // Initialize the server
    this.server = {
      name: "dbt-power-user-mcp",
      version: extensionVersion,
      tools: [],
      listTools: this.listTools.bind(this),
      callTool: this.callTool.bind(this),
    };

    // Register all the tools the server provides
    this.tools = registerTools();
    this.server.tools = this.tools;

    logger.info(
      `DBT Power User MCP Server initialized with project: ${this.projectPath}`,
    );
  }

  /**
   * Lists all tools this MCP server provides
   */
  private listTools(): { tools: ToolDefinition[] } {
    return { tools: this.tools };
  }

  /**
   * Handles a tool call from an MCP client
   */
  private async callTool(
    toolName: string,
    args: Record<string, any>,
  ): Promise<{ content: Array<{ type: string; [key: string]: any }> }> {
    logger.info(`Tool called: ${toolName} with args:`, args);

    // Find the tool handler
    const tool = this.tools.find((t) => t.name === toolName);
    if (!tool) {
      const error = `Tool '${toolName}' not found`;
      logger.error(error);
      throw new Error(error);
    }

    try {
      // Call the tool handler
      const result = await tool.handler(args, {
        projectPath: this.projectPath,
        dbtProfilesPath: this.dbtProfilesPath,
        altimateApiKey: this.altimateApiKey,
        altimateInstance: this.altimateInstance,
      });

      return result;
    } catch (error) {
      logger.error(`Error executing tool ${toolName}:`, error);
      throw error;
    }
  }

  /**
   * Starts the MCP server using stdin/stdout transport
   */
  public start(): void {
    logger.info("Starting MCP server...");

    // Simple JSON-RPC style protocol over stdin/stdout
    stdin.setEncoding("utf8");

    stdin.on("data", async (data: string) => {
      try {
        const message = JSON.parse(data.toString());
        logger.debug("Received message:", message);

        if (!message.method || !message.id) {
          this.sendError(message.id || "unknown", "Invalid request format");
          return;
        }

        const { method, params, id } = message;

        switch (method) {
          case "tools/list":
            this.sendResponse(id, this.server.listTools());
            break;

          case "tools/call":
            if (!params || !params.name) {
              this.sendError(id, "Tool name is required");
              return;
            }

            try {
              const result = await this.server.callTool(
                params.name,
                params.arguments || {},
              );
              this.sendResponse(id, result);
            } catch (error) {
              this.sendError(
                id,
                error instanceof Error ? error.message : String(error),
              );
            }
            break;

          default:
            this.sendError(id, `Unknown method: ${method}`);
        }
      } catch (error) {
        logger.error("Error processing message:", error);
        this.sendError(
          "unknown",
          error instanceof Error ? error.message : String(error),
        );
      }
    });

    logger.info("MCP server started");
  }

  /**
   * Sends a response to the client
   */
  private sendResponse(id: string, result: any): void {
    const response = {
      jsonrpc: "2.0",
      id,
      result,
    };

    stdout.write(JSON.stringify(response) + "\n");
  }

  /**
   * Sends an error to the client
   */
  private sendError(id: string, message: string): void {
    const response = {
      jsonrpc: "2.0",
      id,
      error: {
        message,
      },
    };

    stdout.write(JSON.stringify(response) + "\n");
  }
}

/**
 * Main entry point for the MCP server
 */
export function startMCPServer(): void {
  try {
    // Get configuration from environment variables
    const projectPath = process.env.DBT_PROJECT_PATH;
    const dbtProfilesPath = process.env.DBT_PROFILES_PATH;
    const altimateApiKey = process.env.ALTIMATE_API_KEY;
    const altimateInstance = process.env.ALTIMATE_INSTANCE;

    if (!projectPath) {
      logger.error("DBT_PROJECT_PATH environment variable is required");
      process.exit(1);
    }

    // Create and start the MCP server
    const server = new DBTPowerUserMCPServer({
      projectPath,
      dbtProfilesPath,
      altimateApiKey,
      altimateInstance,
    });

    server.start();
  } catch (error) {
    logger.error("Failed to start MCP server:", error);
    process.exit(1);
  }
}

// If this file is run directly, start the MCP server
if (require.main === module) {
  startMCPServer();
}
