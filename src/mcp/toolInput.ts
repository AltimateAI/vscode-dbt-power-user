import { ToolSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

export type ToolInput = z.infer<typeof ToolSchema.shape.inputSchema>;

/** Convert a Zod schema to an MCP tool input schema.
 *  The default target adds `"$schema": "https://json-schema.org/draft/2020-12/schema"`,
 *  which Gemini's tool-calling API rejects as an unsupported property. The `openapi-3.0`
 *  target produces the same schema without the `$schema` field. */
export function toToolInput(schema: z.ZodType): ToolInput {
  return z.toJSONSchema(schema, { target: "openapi-3.0" }) as ToolInput;
}
