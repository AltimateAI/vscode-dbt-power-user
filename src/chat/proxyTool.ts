import * as vscode from "vscode";
import {
  CallToolRequest,
  Tool,
  CallToolResultSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { MCPClient } from "./mcpClient";
/**
 * A proxy tool that forwards calls to an MCP tool
 */
export class McpProxyTool implements vscode.LanguageModelChatTool {
  private _client: MCPClient;
  private _tool: Tool;
  public name: string;
  public inputSchema: Tool["inputSchema"];
  public description: string;

  constructor(client: MCPClient, tool: Tool) {
    this._client = client;
    this._tool = tool;
    this.name = tool.name;
    this.inputSchema = tool.inputSchema;
    this.description = tool.description || "";

    // this._callTool = callTool;
  }

  private _handleNotification(notification: any): Promise<void> {
    console.log("Received notification:", notification);
    return Promise.resolve();
  }

  async prepareInvocation(
    options: vscode.LanguageModelToolInvocationOptions<any>,
  ): Promise<{ confirmationMessage?: string; invocationMessage?: string }> {
    return {
      confirmationMessage: `Allow tool "${this._tool.name}" to run?`,
      invocationMessage: `Running tool "${this._tool.name}"...`,
    };
  }

  async invoke(
    options: vscode.LanguageModelToolInvocationOptions<any>,
    token: vscode.CancellationToken,
  ): Promise<vscode.LanguageModelToolResult> {
    console.log("Invoking tool:", this._tool.name, options.input);
    try {
      // Define the payload
      const payload: CallToolRequest["params"] = {
        name: this._tool.name,
        arguments: options.input,
        // _meta: {
        // 	toolCallId: options.toolInvocationToken,
        // 	progressToken: options.toolInvocationToken
        // }
      };
      console.log("CallToolRequest Params:", payload);
      const result = await this._client.callTool(
        payload,
        CallToolResultSchema,
        {
          // timeout in milliseconds, we should set it to 5 minutes
          timeout: 5 * 60 * 1000,
          onprogress: (progress) => {
            console.log("Tool progress:", progress);
          },
        },
      );
      console.log("Tool result:", result);
      // Parse the CallToolResponse
      const parsedResult = CallToolResultSchema.parse(result);

      if (parsedResult.isError) {
        if (parsedResult.content.every((c) => c.type === "text")) {
          const errorMessageFromContent = parsedResult.content.find(
            (c) => c.type === "text",
          )?.text;
          if (errorMessageFromContent) {
            return new vscode.LanguageModelToolResult([
              new vscode.LanguageModelTextPart(
                errorMessageFromContent as string,
              ),
            ]);
          }
        }
        return new vscode.LanguageModelToolResult([
          new vscode.LanguageModelTextPart(
            "An error occurred while calling the tool. Please try again.",
          ),
        ]);
      }
      // Convert MCP result to LanguageModelToolResult
      const content: (
        | vscode.LanguageModelTextPart
        | vscode.LanguageModelPromptTsxPart
      )[] = [];
      if (Array.isArray(result.content)) {
        for (const item of result.content) {
          if (item.type === "text" && typeof item.text === "string") {
            content.push(new vscode.LanguageModelTextPart(item.text));
          }
        }
      }

      return new vscode.LanguageModelToolResult(content);
    } catch (error) {
      console.error("Tool invocation error:", error);
      throw new Error(
        `Tool "${this._tool.name}" failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
