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
import { Uri, Disposable } from "vscode";
import { provideSingleton } from "../utils";
import { DBTProject, DBTTerminal } from "@extension";
import { RunModelParams } from "../dbt_client/dbtIntegration";
import { CommandProcessResult } from "../commandProcessExecution";

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
});

const SetSelectedTargetSchema = BaseProjectRootSchema.extend({
  targetName: z.string(),
});

const RunModelSchema = BaseProjectRootSchema.extend({
  plusOperatorLeft: z.string().optional(),
  modelName: z.string(),
  plusOperatorRight: z.string().optional(),
});
const BuildModelSchema = BaseProjectRootSchema.extend({
  plusOperatorLeft: z.string().optional(),
  modelName: z.string(),
  plusOperatorRight: z.string().optional(),
});
const BuildProjectSchema = BaseProjectRootSchema.extend({});
const RunTestSchema = BaseProjectRootSchema.extend({
  testName: z.string(),
});
const RunModelTestSchema = BaseProjectRootSchema.extend({
  modelName: z.string(),
});
const InstallDbtPackagesSchema = BaseProjectRootSchema.extend({
  packages: z.array(z.string()),
});
const InstallDepsSchema = BaseProjectRootSchema.extend({});

enum ToolName {
  GET_PROJECTS = "get_projects",
  GET_PROJECT_NAME = "get_project_name",
  GET_SELECTED_TARGET = "get_selected_target",
  GET_TARGET_NAMES = "get_target_names",
  GET_TARGET_PATH = "get_target_path",
  GET_PACKAGE_INSTALL_PATH = "get_package_install_path",
  GET_MODEL_PATHS = "get_model_paths",
  GET_SEED_PATHS = "get_seed_paths",
  GET_MACRO_PATHS = "get_macro_paths",
  GET_MANIFEST_PATH = "get_manifest_path",
  GET_CATALOG_PATH = "get_catalog_path",
  GET_ALL_DIAGNOSTIC = "get_all_diagnostic",
  GET_DBT_VERSION = "get_dbt_version",
  GET_ADAPTER_TYPE = "get_adapter_type",
  GET_COLUMNS_OF_MODEL = "get_columns_of_model",
  GET_COLUMNS_OF_SOURCE = "get_columns_of_source",
  GET_COLUMN_VALUES = "get_column_values",
  COMPILE_MODEL = "compile_model",
  COMPILE_QUERY = "compile_query",
  EXECUTE_SQL_WITH_LIMIT = "execute_sql_with_limit",
  SET_SELECTED_TARGET = "set_selected_target",
  RUN_MODEL = "run_model",
  BUILD_MODEL = "build_model",
  BUILD_PROJECT = "build_project",
  RUN_TEST = "run_test",
  RUN_MODEL_TEST = "run_model_test",
  INSTALL_DBT_PACKAGES = "install_dbt_packages",
  INSTALL_DEPS = "install_deps",
}

@provideSingleton(DbtPowerUserMcpServerTools)
export class DbtPowerUserMcpServerTools implements Disposable {
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private dbtTerminal: DBTTerminal,
  ) {}

  dispose() {}

  private handleDbtCommandOutput = (result?: CommandProcessResult) => {
    if (result?.stderr) {
      throw new Error(result.stderr);
    }
    return {
      content: [
        {
          type: "text",
          text: result?.stdout,
        },
      ],
    };
  };

  public createServer = () => {
    const server = new Server(
      {
        name: "DbtPowerUserMcpServerTools",
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

    server.onerror = (error) => {
      this.dbtTerminal.error("DbtPowerUserMcpServerTools", "Error", { error });
    };

    server.setRequestHandler(ListToolsRequestSchema, async () => {
      this.dbtTerminal.debug("DbtPowerUserMcpServerTools", "Listing tools");
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
          description: "Get distinct column values",
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
        {
          name: ToolName.SET_SELECTED_TARGET,
          description: "Set selected target",
          inputSchema: zodToJsonSchema(SetSelectedTargetSchema) as ToolInput,
        },
        {
          name: ToolName.RUN_MODEL,
          description: "Run model",
          inputSchema: zodToJsonSchema(RunModelSchema) as ToolInput,
        },
        {
          name: ToolName.BUILD_MODEL,
          description: "Build model",
          inputSchema: zodToJsonSchema(BuildModelSchema) as ToolInput,
        },
        {
          name: ToolName.BUILD_PROJECT,
          description: "Build project",
          inputSchema: zodToJsonSchema(BuildProjectSchema) as ToolInput,
        },
        {
          name: ToolName.RUN_TEST,
          description: "Run test",
          inputSchema: zodToJsonSchema(RunTestSchema) as ToolInput,
        },
        {
          name: ToolName.RUN_MODEL_TEST,
          description: "Run model test",
          inputSchema: zodToJsonSchema(RunModelTestSchema) as ToolInput,
        },
        {
          name: ToolName.INSTALL_DBT_PACKAGES,
          description: "Install dbt packages",
          inputSchema: zodToJsonSchema(InstallDbtPackagesSchema) as ToolInput,
        },
        {
          name: ToolName.INSTALL_DEPS,
          description: "Install deps",
          inputSchema: zodToJsonSchema(InstallDepsSchema) as ToolInput,
        },
      ];

      return { tools };
    });

    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      this.dbtTerminal.debug("DbtPowerUserMcpServerTools", "Calling tool", {
        name,
        args,
      });

      try {
        if (name === ToolName.GET_PROJECTS) {
          const projects = this.dbtProjectContainer
            .getProjects()
            .map((project: DBTProject) => project.projectRoot.fsPath);

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(projects),
              },
            ],
          };
        }

        if (!args || !args.projectRoot) {
          throw new Error("projectRoot is required");
        }

        const projectRoot = decodeURIComponent(args.projectRoot as string);
        const project = this.dbtProjectContainer.findDBTProject(
          Uri.file(projectRoot),
        );
        if (!project) {
          throw new Error(`Project not found for root: ${args.projectRoot}`);
        }

        switch (name) {
          case ToolName.GET_PROJECT_NAME:
            return {
              content: [{ type: "text", text: project.getProjectName() }],
            };

          case ToolName.GET_SELECTED_TARGET:
            return {
              content: [{ type: "text", text: project.getSelectedTarget() }],
            };

          case ToolName.GET_TARGET_NAMES: {
            const targetNames = await project.getTargetNames();
            return {
              content: [{ type: "text", text: targetNames.join(", ") }],
            };
          }

          case ToolName.GET_TARGET_PATH:
            return {
              content: [{ type: "text", text: project.getTargetPath() || "" }],
            };

          case ToolName.GET_PACKAGE_INSTALL_PATH:
            return {
              content: [
                {
                  type: "text",
                  text: project.getPackageInstallPath() || "",
                },
              ],
            };

          case ToolName.GET_MODEL_PATHS:
            return {
              content: [
                {
                  type: "text",
                  text: project.getModelPaths()?.join(", ") || "",
                },
              ],
            };

          case ToolName.GET_SEED_PATHS:
            return {
              content: [
                {
                  type: "text",
                  text: project.getSeedPaths()?.join(", ") || "",
                },
              ],
            };

          case ToolName.GET_MACRO_PATHS:
            return {
              content: [
                {
                  type: "text",
                  text: project.getMacroPaths()?.join(", ") || "",
                },
              ],
            };

          case ToolName.GET_MANIFEST_PATH:
            return {
              content: [
                { type: "text", text: project.getManifestPath() || "" },
              ],
            };

          case ToolName.GET_CATALOG_PATH:
            return {
              content: [{ type: "text", text: project.getCatalogPath() || "" }],
            };

          case ToolName.GET_ALL_DIAGNOSTIC:
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(project.getAllDiagnostic()),
                },
              ],
            };

          case ToolName.GET_DBT_VERSION:
            return {
              content: [
                {
                  type: "text",
                  text: project.getDBTVersion()?.join(".") || "",
                },
              ],
            };

          case ToolName.GET_ADAPTER_TYPE:
            return {
              content: [{ type: "text", text: project.getAdapterType() }],
            };

          case ToolName.GET_COLUMNS_OF_MODEL: {
            const result = await project.getColumnsOfModel(
              args.modelName as string,
            );
            return {
              content: [{ type: "text", text: JSON.stringify(result) }],
            };
          }

          case ToolName.GET_COLUMNS_OF_SOURCE: {
            const result = await project.getColumnsOfSource(
              args.sourceName as string,
              args.tableName as string,
            );
            return {
              content: [{ type: "text", text: JSON.stringify(result) }],
            };
          }

          case ToolName.GET_COLUMN_VALUES: {
            const result = await project.getColumnValues(
              args.model as string,
              args.column as string,
            );
            return {
              content: [{ type: "text", text: JSON.stringify(result) }],
            };
          }

          case ToolName.COMPILE_MODEL: {
            const result = await project.unsafeCompileNode(
              args.modelName as string,
            );
            return { content: [{ type: "text", text: result || "" }] };
          }

          case ToolName.EXECUTE_SQL_WITH_LIMIT: {
            const result = await project.executeSQLWithLimit(
              args.query as string,
              args.modelName as string,
              args.limit as number,
              true,
              false,
            );
            return {
              content: [{ type: "text", text: JSON.stringify(result) }],
            };
          }

          case ToolName.SET_SELECTED_TARGET: {
            await project.setSelectedTarget(args.targetName as string);
            return {
              content: [{ type: "text", text: "Target set successfully" }],
            };
          }

          case ToolName.RUN_MODEL: {
            const runModelParams: RunModelParams = {
              plusOperatorLeft: args.plusOperatorLeft as string,
              modelName: args.modelName as string,
              plusOperatorRight: args.plusOperatorRight as string,
            };
            const result = await project.runModel(runModelParams, true);
            return this.handleDbtCommandOutput(result);
          }

          case ToolName.BUILD_MODEL: {
            const runModelParams: RunModelParams = {
              plusOperatorLeft: args.plusOperatorLeft as string,
              modelName: args.modelName as string,
              plusOperatorRight: args.plusOperatorRight as string,
            };
            const result = await project.buildModel(runModelParams, true);
            return this.handleDbtCommandOutput(result);
          }

          case ToolName.BUILD_PROJECT: {
            const result = await project.buildProject(true);
            return this.handleDbtCommandOutput(result);
          }

          case ToolName.RUN_TEST: {
            const result = await project.runTest(args.testName as string, true);
            return this.handleDbtCommandOutput(result);
          }

          case ToolName.RUN_MODEL_TEST: {
            const result = await project.runModelTest(
              args.modelName as string,
              true,
            );
            return this.handleDbtCommandOutput(result);
          }

          case ToolName.INSTALL_DBT_PACKAGES: {
            const result = await project.installDbtPackages(
              args.packages as string[],
            );
            return {
              content: [{ type: "text", text: result }],
            };
          }

          case ToolName.INSTALL_DEPS: {
            const result = await project.installDeps();
            return {
              content: [{ type: "text", text: result }],
            };
          }

          case ToolName.COMPILE_QUERY: {
            const result = await project.unsafeCompileQuery(
              args.modelName as string,
              // TODO: should have an optional originalModelName
            );
            return { content: [{ type: "text", text: result || "" }] };
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        this.dbtTerminal.error("DbtPowerUserMcpServerTools", "Error", {
          error,
        });
        return {
          content: [
            {
              type: "text",
              text: `Unable to complete tool call. ${(error as Error).message}`,
            },
          ],
          isError: true,
          error: error,
        };
      }
    });

    return { server, cleanup: async () => {} };
  };
}
