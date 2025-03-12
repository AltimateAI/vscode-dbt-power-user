import { ToolSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
export enum ToolName {
  ADD = "add",
}

const ToolInputSchema = ToolSchema.shape.inputSchema;
export type ToolInput = z.infer<typeof ToolInputSchema>;

export const AddSchema = z.object({
  a: z.number().describe("First number"),
  b: z.number().describe("Second number"),
});
