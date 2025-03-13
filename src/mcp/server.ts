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
import { DBTProject } from "@extension";

const ToolInputSchema = ToolSchema.shape.inputSchema;
type ToolInput = z.infer<typeof ToolInputSchema>;

const BaseSchema = z.object({});
const BaseProjectRootSchema = BaseSchema.extend({ projectRoot: z.string() });
const GetColumnsOfModelSchema = BaseProjectRootSchema.extend({
  modelName: z.string(),
});
const GetColumnsOfSourceSchema = BaseProjectRootSchema.extend({
  sourceName: z.string(),
  tableName: z.string(),
});
const GetColumnValuesSchema = BaseProjectRootSchema.extend({
  model: z.string(),
  column: z.string(),
});
const CompileModelSchema = BaseProjectRootSchema.extend({
  modelName: z.string(),
});
const CompileQuerySchema = BaseProjectRootSchema.extend({
  query: z.string(),
  originalModelName: z.string().optional(),
});
const ExecuteSQLWithLimitSchema = BaseProjectRootSchema.extend({
  query: z.string(),
  modelName: z.string(),
  limit: z.number(),
  returnImmediately: z.boolean().optional(),
  returnRawResults: z.boolean().optional(),
});

enum ToolName {
  GET_PROJECTS = "get_projects",
  GET_PROJECT_NAME = "get_project_name",
  GET_SELECTED_TARGET = "get_selected_target",
  GET_TARGET_NAMES = "get_target_names",
  GET_DBT_PROJECT_FILE_PATH = "get_dbt_project_file_path",
  GET_TARGET_PATH = "get_target_path",
  GET_PACKAGE_INSTALL_PATH = "get_package_install_path",
  GET_MODEL_PATHS = "get_model_paths",
  GET_SEED_PATHS = "get_seed_paths",
  GET_MACRO_PATHS = "get_macro_paths",
  GET_MANIFEST_PATH = "get_manifest_path",
  GET_CATALOG_PATH = "get_catalog_path",
  GET_PYTHON_BRIDGE_STATUS = "get_python_bridge_status",
  GET_ALL_DIAGNOSTIC = "get_all_diagnostic",
  GET_DBT_VERSION = "get_dbt_version",
  GET_ADAPTER_TYPE = "get_adapter_type",
  GET_COLUMNS_OF_MODEL = "get_columns_of_model",
  GET_COLUMNS_OF_SOURCE = "get_columns_of_source",
  GET_COLUMN_VALUES = "get_column_values",
  COMPILE_MODEL = "compile_model",
  GET_BULK_SCHEMA_FROM_DB = "get_bulk_schema_from_db",
  COMPILE_QUERY = "compile_query",
  EXECUTE_SQL_WITH_LIMIT = "execute_sql_with_limit",
}

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
        description: "Get projects",
        inputSchema: zodToJsonSchema(BaseSchema) as ToolInput,
      },
      {
        name: ToolName.GET_PROJECT_NAME,
        description: "Get project name",
        inputSchema: zodToJsonSchema(BaseProjectRootSchema) as ToolInput,
      },
      {
        name: ToolName.GET_SELECTED_TARGET,
        description: "Get selected target",
        inputSchema: zodToJsonSchema(BaseProjectRootSchema) as ToolInput,
      },
      {
        name: ToolName.GET_TARGET_NAMES,
        description: "Get target names",
        inputSchema: zodToJsonSchema(BaseProjectRootSchema) as ToolInput,
      },
      {
        name: ToolName.GET_DBT_PROJECT_FILE_PATH,
        description: "Get dbt project file path",
        inputSchema: zodToJsonSchema(BaseProjectRootSchema) as ToolInput,
      },
      {
        name: ToolName.GET_TARGET_PATH,
        description: "Get target path",
        inputSchema: zodToJsonSchema(BaseProjectRootSchema) as ToolInput,
      },
      {
        name: ToolName.GET_PACKAGE_INSTALL_PATH,
        description: "Get package install path",
        inputSchema: zodToJsonSchema(BaseProjectRootSchema) as ToolInput,
      },
      {
        name: ToolName.GET_MODEL_PATHS,
        description: "Get model paths",
        inputSchema: zodToJsonSchema(BaseProjectRootSchema) as ToolInput,
      },
      {
        name: ToolName.GET_SEED_PATHS,
        description: "Get seed paths",
        inputSchema: zodToJsonSchema(BaseProjectRootSchema) as ToolInput,
      },
      {
        name: ToolName.GET_MACRO_PATHS,
        description: "Get macro paths",
        inputSchema: zodToJsonSchema(BaseProjectRootSchema) as ToolInput,
      },
      {
        name: ToolName.GET_MANIFEST_PATH,
        description: "Get manifest path",
        inputSchema: zodToJsonSchema(BaseProjectRootSchema) as ToolInput,
      },
      {
        name: ToolName.GET_CATALOG_PATH,
        description: "Get catalog path",
        inputSchema: zodToJsonSchema(BaseProjectRootSchema) as ToolInput,
      },
      {
        name: ToolName.GET_PYTHON_BRIDGE_STATUS,
        description: "Get python bridge status",
        inputSchema: zodToJsonSchema(BaseProjectRootSchema) as ToolInput,
      },
      {
        name: ToolName.GET_ALL_DIAGNOSTIC,
        description: "Get all diagnostic",
        inputSchema: zodToJsonSchema(BaseProjectRootSchema) as ToolInput,
      },
      {
        name: ToolName.GET_DBT_VERSION,
        description: "Get dbt version",
        inputSchema: zodToJsonSchema(BaseProjectRootSchema) as ToolInput,
      },
      {
        name: ToolName.GET_ADAPTER_TYPE,
        description: "Get adapter type",
        inputSchema: zodToJsonSchema(BaseProjectRootSchema) as ToolInput,
      },
      {
        name: ToolName.GET_COLUMNS_OF_MODEL,
        description: "Get columns of model",
        inputSchema: zodToJsonSchema(GetColumnsOfModelSchema) as ToolInput,
      },
      {
        name: ToolName.GET_COLUMNS_OF_SOURCE,
        description: "Get columns of source",
        inputSchema: zodToJsonSchema(GetColumnsOfSourceSchema) as ToolInput,
      },
      {
        name: ToolName.GET_COLUMN_VALUES,
        description: "Get column values",
        inputSchema: zodToJsonSchema(GetColumnValuesSchema) as ToolInput,
      },
      {
        name: ToolName.COMPILE_MODEL,
        description: "Compile model",
        inputSchema: zodToJsonSchema(CompileModelSchema) as ToolInput,
      },
      {
        name: ToolName.COMPILE_QUERY,
        description: "Compile query",
        inputSchema: zodToJsonSchema(CompileQuerySchema) as ToolInput,
      },
      {
        name: ToolName.EXECUTE_SQL_WITH_LIMIT,
        description: "Execute SQL with limit",
        inputSchema: zodToJsonSchema(ExecuteSQLWithLimitSchema) as ToolInput,
      },
    ];

    return { tools };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    if (name === ToolName.GET_PROJECTS) {
      return {
        content: [
          {
            type: "text",
            text: dbtProjectContainer
              .getProjects()
              .map((project: DBTProject) => project.projectRoot.fsPath),
          },
        ],
      };
    }
    if (!args || !args.projectRoot) {
      throw new Error("projectRoot is required");
    }
    const project = dbtProjectContainer.findDBTProject(
      Uri.file(args.projectRoot as string),
    );
    if (!project) {
      throw new Error(`Project not found for root: ${args.projectRoot}`);
    }

    if (name === ToolName.GET_PROJECT_NAME) {
      return { content: [{ type: "text", text: project.getProjectName() }] };
    }

    if (name === ToolName.GET_SELECTED_TARGET) {
      return { content: [{ type: "text", text: project.getSelectedTarget() }] };
    }

    if (name === ToolName.GET_TARGET_NAMES) {
      const targetNames = await project.getTargetNames();
      return {
        content: [{ type: "text", text: targetNames.join(", ") }],
      };
    }

    if (name === ToolName.GET_DBT_PROJECT_FILE_PATH) {
      return {
        content: [{ type: "text", text: project.getDBTProjectFilePath() }],
      };
    }

    if (name === ToolName.GET_TARGET_PATH) {
      return {
        content: [{ type: "text", text: project.getTargetPath() || "" }],
      };
    }

    if (name === ToolName.GET_PACKAGE_INSTALL_PATH) {
      return {
        content: [
          { type: "text", text: project.getPackageInstallPath() || "" },
        ],
      };
    }

    if (name === ToolName.GET_MODEL_PATHS) {
      return {
        content: [
          { type: "text", text: project.getModelPaths()?.join(", ") || "" },
        ],
      };
    }

    if (name === ToolName.GET_SEED_PATHS) {
      return {
        content: [
          { type: "text", text: project.getSeedPaths()?.join(", ") || "" },
        ],
      };
    }

    if (name === ToolName.GET_MACRO_PATHS) {
      return {
        content: [
          { type: "text", text: project.getMacroPaths()?.join(", ") || "" },
        ],
      };
    }

    if (name === ToolName.GET_MANIFEST_PATH) {
      return {
        content: [{ type: "text", text: project.getManifestPath() || "" }],
      };
    }

    if (name === ToolName.GET_CATALOG_PATH) {
      return {
        content: [{ type: "text", text: project.getCatalogPath() || "" }],
      };
    }

    if (name === ToolName.GET_PYTHON_BRIDGE_STATUS) {
      return {
        content: [{ type: "text", text: project.getPythonBridgeStatus() }],
      };
    }

    if (name === ToolName.GET_ALL_DIAGNOSTIC) {
      return {
        content: [
          { type: "text", text: JSON.stringify(project.getAllDiagnostic()) },
        ],
      };
    }

    if (name === ToolName.GET_DBT_VERSION) {
      return {
        content: [
          { type: "text", text: project.getDBTVersion()?.join(".") || "" },
        ],
      };
    }

    if (name === ToolName.GET_ADAPTER_TYPE) {
      return { content: [{ type: "text", text: project.getAdapterType() }] };
    }

    if (name === ToolName.GET_COLUMNS_OF_MODEL) {
      const result = await project.getColumnsOfModel(args.modelName as string);
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }

    if (name === ToolName.GET_COLUMNS_OF_SOURCE) {
      const result = await project.getColumnsOfSource(
        args.sourceName as string,
        args.tableName as string,
      );
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }

    if (name === ToolName.GET_COLUMN_VALUES) {
      const result = await project.getColumnValues(
        args.model as string,
        args.column as string,
      );
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }

    if (name === ToolName.COMPILE_MODEL) {
      const result = await project.compileNode(args.modelName as string);
      return { content: [{ type: "text", text: result || "" }] };
    }

    if (name === ToolName.COMPILE_QUERY) {
      const result = await project.compileQuery(
        args.query as string,
        args.originalModelName as string | undefined,
      );
      return { content: [{ type: "text", text: result || "" }] };
    }

    if (name === ToolName.EXECUTE_SQL_WITH_LIMIT) {
      const result = await project.executeSQLWithLimit(
        args.query as string,
        args.modelName as string,
        args.limit as number,
        args.returnImmediately as boolean,
        args.returnRawResults as boolean,
      );
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }

    throw new Error(`Unknown tool: ${name}`);
  });

  return { server, cleanup: async () => {} };
};
