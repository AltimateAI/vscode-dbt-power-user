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
