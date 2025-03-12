import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
  ToolSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { Uri } from "vscode";
import path from "path";
import { readFileSync } from "fs";
const ToolInputSchema = ToolSchema.shape.inputSchema;
type ToolInput = z.infer<typeof ToolInputSchema>;

const GetProjectsSchema = z.object({});
const CompileQuerySchema = z.object({
  model: z.string(),
});

enum ToolName {
  GET_PROJECTS = "get_projects",
  COMPILE_QUERY = "compile_query",
}

console.log("Creating server");
export const createServer = (dbtProjectContainer: DBTProjectContainer) => {
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
        name: ToolName.GET_PROJECTS,
        description: "Get all projects",
        inputSchema: zodToJsonSchema(GetProjectsSchema) as ToolInput,
      },
      {
        name: ToolName.COMPILE_QUERY,
        description: "Compile a query",
        inputSchema: zodToJsonSchema(CompileQuerySchema) as ToolInput,
      },
    ];

    return { tools };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === ToolName.GET_PROJECTS) {
      const projects = dbtProjectContainer.getProjects();
      return {
        content: [
          {
            type: "text",
            text: projects.map((p) => p.projectRoot.fsPath).join(", "),
          },
        ],
      };
    }

    if (name === ToolName.COMPILE_QUERY) {
      const modelName = args?.model as string;
      const modelPath = modelName.endsWith(".sql")
        ? modelName
        : `models/${modelName}.sql`;
      // TODO: assuming single workspace folder for now
      const projectRoot = dbtProjectContainer.getProjects()[0].projectRoot;
      const fileUri = Uri.file(path.join(projectRoot.fsPath, modelPath));
      // get contents of file
      const query = readFileSync(fileUri.fsPath, "utf8");
      const result = await dbtProjectContainer.compileQuery(fileUri, query);
      return { content: [{ type: "text", text: result }] };
    }

    console.log("Unknown tool", name);
    throw new Error(`Unknown tool: ${name}`);
  });

  const cleanup = async () => {};

  return { server, cleanup };
};
