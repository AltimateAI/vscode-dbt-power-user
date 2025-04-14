import {
  CallToolResultSchema,
  ToolSchema,
} from "@modelcontextprotocol/sdk/types";
import { z } from "zod";

export type ToolInput = z.infer<typeof ToolSchema.shape.inputSchema>;

export type McpTool = {
  name: string;
  description: string;
  inputSchema: ToolInput;
  handler: (
    args: Record<string, unknown>,
  ) => Promise<z.infer<typeof CallToolResultSchema>>;
};

export type McpOnboardingStep = {
  title: string;
  description: string;
  enableButton: string;
  disableButton?: string;
  onCommandTrigger: (...args: unknown[]) => Promise<void>;
  ide: string[];
};

export type ToolRegistry = {
  registerTools: (tools: McpTool[]) => Promise<void>;
  addMcpIntegrationConfig: (steps: McpOnboardingStep[]) => Promise<void>;
  setTelemetryProperties: (credentials: {
    instanceName: string;
  }) => Promise<void>;
};
