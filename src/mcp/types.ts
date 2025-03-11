/**
 * Types for the MCP (Model Context Protocol) integration
 */

/**
 * Context passed to tool handlers
 */
export interface ToolContext {
  projectPath: string;
  dbtProfilesPath?: string;
  altimateApiKey?: string;
  altimateInstance?: string;
}

/**
 * Definition of an MCP tool
 */
export interface ToolDefinition {
  name: string;
  description: string;
  schema: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
  handler: (
    args: Record<string, any>,
    context: ToolContext,
  ) => Promise<{
    content: Array<{
      type: string;
      [key: string]: any;
    }>;
  }>;
}

/**
 * Interface for MCP Server
 */
export interface MCPServer {
  name: string;
  version: string;
  tools: ToolDefinition[];
  listTools: () => { tools: ToolDefinition[] };
  callTool: (
    toolName: string,
    args: Record<string, any>,
  ) => Promise<{
    content: Array<{
      type: string;
      [key: string]: any;
    }>;
  }>;
}
