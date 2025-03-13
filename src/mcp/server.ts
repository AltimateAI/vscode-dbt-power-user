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

const ToolInputSchema = ToolSchema.shape.inputSchema;
type ToolInput = z.infer<typeof ToolInputSchema>;

const BaseSchema = z.object({ projectRoot: z.string() });
const GetColumnsOfModelSchema = BaseSchema.extend({ modelName: z.string() });
const GetColumnsOfSourceSchema = BaseSchema.extend({ sourceName: z.string(), tableName: z.string() });
const GetColumnValuesSchema = BaseSchema.extend({ model: z.string(), column: z.string() });
const CompileModelSchema = BaseSchema.extend({ modelName: z.string() });
const GetBulkCompiledSqlSchema = BaseSchema.extend({ models: z.array(z.string()) });
const GetNodesWithDBColumnsSchema = BaseSchema.extend({ 
  modelsToFetch: z.array(z.string()),
  cancellationToken: z.any() 
});
const GetBulkSchemaFromDBSchema = BaseSchema.extend({
  req: z.array(z.object({
    unique_id: z.string(),
    name: z.string(),
    resource_type: z.string(),
    table: z.string().optional()
  })),
  cancellationToken: z.any()
});
const ValidateSqlSchema = BaseSchema.extend({
  sql: z.string(),
  dialect: z.string(),
  models: z.array(z.any())
});
const ValidateSQLDryRunSchema = BaseSchema.extend({ query: z.string() });
const CompileQuerySchema = BaseSchema.extend({ 
  query: z.string(),
  originalModelName: z.string().optional()
});
const ExecuteSQLWithLimitSchema = BaseSchema.extend({
  query: z.string(),
  modelName: z.string(),
  limit: z.number(),
  returnImmediately: z.boolean().optional(),
  returnRawResults: z.boolean().optional()
});
const ExecuteSQLSchema = BaseSchema.extend({
  query: z.string(),
  modelName: z.string(),
  returnImmediately: z.boolean().optional(),
  returnRawResults: z.boolean().optional()
});

enum ToolName {
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
  GET_BULK_COMPILED_SQL = "get_bulk_compiled_sql",
  GET_NODES_WITH_DB_COLUMNS = "get_nodes_with_db_columns",
  GET_BULK_SCHEMA_FROM_DB = "get_bulk_schema_from_db",
  VALIDATE_SQL = "validate_sql",
  VALIDATE_SQL_DRY_RUN = "validate_sql_dry_run",
  COMPILE_QUERY = "compile_query",
  EXECUTE_SQL_WITH_LIMIT = "execute_sql_with_limit",
  EXECUTE_SQL = "execute_sql",
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
      { name: ToolName.GET_PROJECT_NAME, description: "Get project name", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_SELECTED_TARGET, description: "Get selected target", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_TARGET_NAMES, description: "Get target names", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_DBT_PROJECT_FILE_PATH, description: "Get dbt project file path", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_TARGET_PATH, description: "Get target path", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_PACKAGE_INSTALL_PATH, description: "Get package install path", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_MODEL_PATHS, description: "Get model paths", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_SEED_PATHS, description: "Get seed paths", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_MACRO_PATHS, description: "Get macro paths", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_MANIFEST_PATH, description: "Get manifest path", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_CATALOG_PATH, description: "Get catalog path", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_PYTHON_BRIDGE_STATUS, description: "Get python bridge status", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_ALL_DIAGNOSTIC, description: "Get all diagnostic", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_DBT_VERSION, description: "Get dbt version", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_ADAPTER_TYPE, description: "Get adapter type", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_COLUMNS_OF_MODEL, description: "Get columns of model", inputSchema: zodToJsonSchema(GetColumnsOfModelSchema) as ToolInput },
      { name: ToolName.GET_COLUMNS_OF_SOURCE, description: "Get columns of source", inputSchema: zodToJsonSchema(GetColumnsOfSourceSchema) as ToolInput },
      { name: ToolName.GET_COLUMN_VALUES, description: "Get column values", inputSchema: zodToJsonSchema(GetColumnValuesSchema) as ToolInput },
    ];

    const tools: Tool[] = [
      { name: ToolName.GET_PROJECT_NAME, description: "Get project name", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_SELECTED_TARGET, description: "Get selected target", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_TARGET_NAMES, description: "Get target names", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_DBT_PROJECT_FILE_PATH, description: "Get dbt project file path", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_TARGET_PATH, description: "Get target path", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_PACKAGE_INSTALL_PATH, description: "Get package install path", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_MODEL_PATHS, description: "Get model paths", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_SEED_PATHS, description: "Get seed paths", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_MACRO_PATHS, description: "Get macro paths", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_MANIFEST_PATH, description: "Get manifest path", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_CATALOG_PATH, description: "Get catalog path", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_PYTHON_BRIDGE_STATUS, description: "Get python bridge status", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_ALL_DIAGNOSTIC, description: "Get all diagnostic", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_DBT_VERSION, description: "Get dbt version", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_ADAPTER_TYPE, description: "Get adapter type", inputSchema: zodToJsonSchema(BaseSchema) as ToolInput },
      { name: ToolName.GET_COLUMNS_OF_MODEL, description: "Get columns of model", inputSchema: zodToJsonSchema(GetColumnsOfModelSchema) as ToolInput },
      { name: ToolName.GET_COLUMNS_OF_SOURCE, description: "Get columns of source", inputSchema: zodToJsonSchema(GetColumnsOfSourceSchema) as ToolInput },
      { name: ToolName.GET_COLUMN_VALUES, description: "Get column values", inputSchema: zodToJsonSchema(GetColumnValuesSchema) as ToolInput },
      { name: ToolName.COMPILE_MODEL, description: "Compile model", inputSchema: zodToJsonSchema(CompileModelSchema) as ToolInput },
      { name: ToolName.GET_BULK_COMPILED_SQL, description: "Get bulk compiled SQL", inputSchema: zodToJsonSchema(GetBulkCompiledSqlSchema) as ToolInput },
      { name: ToolName.GET_NODES_WITH_DB_COLUMNS, description: "Get nodes with DB columns", inputSchema: zodToJsonSchema(GetNodesWithDBColumnsSchema) as ToolInput },
      { name: ToolName.GET_BULK_SCHEMA_FROM_DB, description: "Get bulk schema from DB", inputSchema: zodToJsonSchema(GetBulkSchemaFromDBSchema) as ToolInput },
      { name: ToolName.VALIDATE_SQL, description: "Validate SQL", inputSchema: zodToJsonSchema(ValidateSqlSchema) as ToolInput },
      { name: ToolName.VALIDATE_SQL_DRY_RUN, description: "Validate SQL dry run", inputSchema: zodToJsonSchema(ValidateSQLDryRunSchema) as ToolInput },
      { name: ToolName.COMPILE_QUERY, description: "Compile query", inputSchema: zodToJsonSchema(CompileQuerySchema) as ToolInput },
      { name: ToolName.EXECUTE_SQL_WITH_LIMIT, description: "Execute SQL with limit", inputSchema: zodToJsonSchema(ExecuteSQLWithLimitSchema) as ToolInput },
      { name: ToolName.EXECUTE_SQL, description: "Execute SQL", inputSchema: zodToJsonSchema(ExecuteSQLSchema) as ToolInput }
    ];

    return { tools };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const project = dbtProjectContainer.findDBTProject(Uri.file(args.projectRoot));
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
      return { content: [{ type: "text", text: project.getTargetNames().join(", ") }] };
    }

    if (name === ToolName.GET_DBT_PROJECT_FILE_PATH) {
      return { content: [{ type: "text", text: project.getDBTProjectFilePath() }] };
    }

    if (name === ToolName.GET_TARGET_PATH) {
      return { content: [{ type: "text", text: project.getTargetPath() || "" }] };
    }

    if (name === ToolName.GET_PACKAGE_INSTALL_PATH) {
      return { content: [{ type: "text", text: project.getPackageInstallPath() || "" }] };
    }

    if (name === ToolName.GET_MODEL_PATHS) {
      return { content: [{ type: "text", text: project.getModelPaths()?.join(", ") || "" }] };
    }

    if (name === ToolName.GET_SEED_PATHS) {
      return { content: [{ type: "text", text: project.getSeedPaths()?.join(", ") || "" }] };
    }

    if (name === ToolName.GET_MACRO_PATHS) {
      return { content: [{ type: "text", text: project.getMacroPaths()?.join(", ") || "" }] };
    }

    if (name === ToolName.GET_MANIFEST_PATH) {
      return { content: [{ type: "text", text: project.getManifestPath() || "" }] };
    }

    if (name === ToolName.GET_CATALOG_PATH) {
      return { content: [{ type: "text", text: project.getCatalogPath() || "" }] };
    }

    if (name === ToolName.GET_PYTHON_BRIDGE_STATUS) {
      return { content: [{ type: "text", text: project.getPythonBridgeStatus() }] };
    }

    if (name === ToolName.GET_ALL_DIAGNOSTIC) {
      return { content: [{ type: "text", text: JSON.stringify(project.getAllDiagnostic()) }] };
    }

    if (name === ToolName.GET_DBT_VERSION) {
      return { content: [{ type: "text", text: project.getDBTVersion()?.join(".") || "" }] };
    }

    if (name === ToolName.GET_ADAPTER_TYPE) {
      return { content: [{ type: "text", text: project.getAdapterType() }] };
    }

    if (name === ToolName.GET_COLUMNS_OF_MODEL) {
      const result = await project.getColumnsOfModel(args.modelName);
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }

    if (name === ToolName.GET_COLUMNS_OF_SOURCE) {
      const result = await project.getColumnsOfSource(args.sourceName, args.tableName);
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }

    if (name === ToolName.GET_COLUMN_VALUES) {
      const result = await project.getColumnValues(args.model, args.column);
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }

    if (name === ToolName.COMPILE_MODEL) {
      const result = await project.compileNode(args.modelName);
      return { content: [{ type: "text", text: result || "" }] };
    }

    if (name === ToolName.GET_BULK_COMPILED_SQL) {
      const result = await project.getBulkCompiledSql(args.event, args.models);
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }

    if (name === ToolName.GET_NODES_WITH_DB_COLUMNS) {
      const result = await project.getNodesWithDBColumns(args.event, args.modelsToFetch, args.cancellationToken);
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }

    if (name === ToolName.GET_BULK_SCHEMA_FROM_DB) {
      const result = await project.getBulkSchemaFromDB(args.req, args.cancellationToken);
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }

    if (name === ToolName.VALIDATE_SQL) {
      const result = await project.validateSql(args);
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }

    if (name === ToolName.VALIDATE_SQL_DRY_RUN) {
      const result = await project.validateSQLDryRun(args.query);
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }

    if (name === ToolName.COMPILE_QUERY) {
      const result = await project.compileQuery(args.query, args.originalModelName);
      return { content: [{ type: "text", text: result || "" }] };
    }

    if (name === ToolName.EXECUTE_SQL_WITH_LIMIT) {
      const result = await project.executeSQLWithLimit(args.query, args.modelName, args.limit, args.returnImmediately, args.returnRawResults);
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }

    if (name === ToolName.EXECUTE_SQL) {
      const result = await project.executeSQL(args.query, args.modelName, args.returnImmediately, args.returnRawResults);
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    }

    throw new Error(`Unknown tool: ${name}`);
  });

  return { server, cleanup: async () => {} };
};
