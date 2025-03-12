import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
  ToolSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ToolInputSchema = ToolSchema.shape.inputSchema;
type ToolInput = z.infer<typeof ToolInputSchema>;

const AddSchema = z.object({
  a: z.number().describe("First number"),
  b: z.number().describe("Second number"),
});

enum ToolName {
  ADD = "add",
}

console.log("Creating server");
export const createServer = () => {
  const server = new Server(
    {
      name: "example-servers/everything",
      version: "1.0.0",
    },
    {
      capabilities: {
        prompts: {},
        resources: { subscribe: true },
        tools: {},
        logging: {},
      },
    },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    const tools: Tool[] = [
      {
        name: ToolName.ADD,
        description: "Adds two numbers",
        inputSchema: zodToJsonSchema(AddSchema) as ToolInput,
      },
    ];

    return { tools };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === ToolName.ADD) {
      const validatedArgs = AddSchema.parse(args);
      const sum = validatedArgs.a + validatedArgs.b;
      return {
        content: [
          {
            type: "text",
            text: `The sum of ${validatedArgs.a} and ${validatedArgs.b} is ${sum}.`,
          },
        ],
      };
    }

    console.log("Unknown tool", name);
    throw new Error(`Unknown tool: ${name}`);
  });

  const cleanup = async () => {};

  return { server, cleanup };
};
