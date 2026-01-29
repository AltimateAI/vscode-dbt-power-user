import { CommandProcessResult } from "@altimateai/dbt-integration";
import { ToolSchema } from "@modelcontextprotocol/sdk/types.js";
import { inject } from "inversify";
import { Disposable, Uri, workspace } from "vscode";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { DBTProject, DBTTerminal } from "../modules";
import { McpTool } from "./types";

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
const ExecuteSQLSchema = BaseProjectRootSchema.extend({
  query: z.string(),
  modelName: z.string(),
});
const RunModelSchema = BaseProjectRootSchema.extend({
  plusOperatorLeft: z.enum(["", "+"]),
  modelName: z.string(),
  plusOperatorRight: z.enum(["", "+"]),
});
const BuildModelSchema = BaseProjectRootSchema.extend({
  plusOperatorLeft: z.enum(["", "+"]),
  modelName: z.string(),
  plusOperatorRight: z.enum(["", "+"]),
});
const BuildProjectSchema = BaseProjectRootSchema.extend({});
const RunTestSchema = BaseProjectRootSchema.extend({
  testName: z.string(),
});
const RunModelTestSchema = BaseProjectRootSchema.extend({
  modelName: z.string(),
});
const AddDbtPackagesSchema = BaseProjectRootSchema.extend({
  packages: z.array(z.string()),
});
const InstallDepsSchema = BaseProjectRootSchema.extend({});

const GetChildrenModelsSchema = BaseProjectRootSchema.extend({
  table: z.string(),
});

const GetParentModelsSchema = BaseProjectRootSchema.extend({
  table: z.string(),
});

const DBT_BEST_PRACTICES_CONTENT = `# dbt Project Best Practices for AI Agents

## Tool Selection: Use MCP Tools Instead of Terminal Commands

**⚠️ IMPORTANT**: ALWAYS use these MCP tools instead of running dbt commands in the terminal.

**⚠️ PREFERRED**: Use \`execute_sql\` for quickly validating SQL and verifying results.
**⚠️ PREFERRED**: Use \`build_model\` for building models - it automatically rebuilds downstream dependencies.

### MCP Tools Summary

| Tool | Purpose |
|------|---------|
| \`get_best_practices\` | ⚠️ **READ FIRST** - Get workflow guidelines before starting |
| \`build_model\` | ⚠️ **PREFERRED** - Build model with auto downstream rebuild |
| \`compile_model\` | Convert Jinja to raw SQL (no validation, no database!) |
| \`get_columns_of_model\` | Get column names and types for a model |
| \`get_columns_of_source\` | Get column names and types for a source |
| \`get_parent_models\` | Find upstream dependencies |
| \`get_children_models\` | Find downstream dependencies |
| \`execute_sql\` | Run verification queries |

---

## Critical Workflow: Write → Build → Verify

### 1. Write the Model
- Create or modify the SQL file in the \`models/\` directory
- Use proper Jinja templating with \`{{ ref() }}\` and \`{{ source() }}\`

### 2. Build the Model (REQUIRED!)
- **ALWAYS use \`build_model\` MCP tool** - it automatically rebuilds downstream models
- ⚠️ **WARNING**: \`compile_model\` only renders Jinja templates - it does NOT create the model in the database!

### 3. Verify the Result
- Use \`execute_sql\` MCP tool for specific verification queries
- Or use bash: \`dbt show --select model_name --limit 10\` to preview the data

## Common Mistakes to Avoid

### ❌ WRONG: Stopping after compile
1. Write model file ✓
2. Run compile_model ✓
3. Stop (WRONG! Model not built in database)

### ✅ CORRECT: Full workflow
1. Try out SQL using execute_sql ✓
2. Write model file ✓
3. Call build_model with modelName ✓ (creates model AND rebuilds downstream!)
4. Verify with execute_sql or dbt show ✓

## Selector Patterns

| Pattern | Meaning |
|---------|---------|
| \`model\` | Just the model |
| \`model+\` | Model and all downstream (use plusOperatorRight: "+") |
| \`+model\` | Model and all upstream (use plusOperatorLeft: "+") |
| \`+model+\` | Model with all dependencies |

## Remember

**A dbt task is NOT complete until:**
1. The model file is written
2. \`build_model\` has been called successfully
3. The output has been verified

Never stop at \`compile_model\` - that only renders Jinja templating, it does NOT create anything in the database!
`;

enum ToolName {
  GET_BEST_PRACTICES = "get_best_practices",
  GET_PROJECTS = "get_projects",
  GET_CHILDREN_MODELS = "get_children_models",
  GET_PARENT_MODELS = "get_parent_models",
  GET_COLUMNS_OF_MODEL = "get_columns_of_model",
  GET_COLUMNS_OF_SOURCE = "get_columns_of_source",
  GET_COLUMN_VALUES = "get_column_values",
  COMPILE_MODEL = "compile_model",
  COMPILE_QUERY = "compile_query",
  EXECUTE_SQL = "execute_sql",
  RUN_MODEL = "run_model",
  BUILD_MODEL = "build_model",
  BUILD_PROJECT = "build_project",
  RUN_TEST = "run_test",
  RUN_MODEL_TEST = "run_model_test",
  ADD_DBT_PACKAGES = "add_dbt_packages",
  INSTALL_DEPS = "install_deps",
}

export class DbtPowerUserMcpServerTools implements Disposable {
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    @inject("DBTTerminal")
    private dbtTerminal: DBTTerminal,
  ) {}

  private tools: McpTool[] = [
    {
      name: ToolName.GET_BEST_PRACTICES,
      description:
        "⚠️ IMPORTANT: Call this tool BEFORE starting any dbt task to get critical workflow guidelines. Returns best practices for completing dbt tasks correctly, including the required Write → Build → Verify workflow and proper tool usage. This helps avoid common mistakes like stopping after compile.",
      inputSchema: zodToJsonSchema(BaseSchema) as ToolInput,
      handler: async () => {
        return {
          content: createTextContent(DBT_BEST_PRACTICES_CONTENT),
        };
      },
    },
    {
      name: ToolName.GET_PROJECTS,
      description: `Returns detailed information about all available dbt projects including:
- projectRoot: The root directory path of the dbt project
- projectName: The name of the dbt project from dbt_project.yml
- selectedTarget: The currently selected target profile
- targetNames: List of all available target profiles
- targetPath: The directory where compiled artifacts are stored
- packageInstallPath: The directory where dbt packages are installed
- modelPaths: List of directories containing dbt models
- seedPaths: List of directories containing dbt seeds
- macroPaths: List of directories containing dbt macros
- manifestPath: Path to the manifest.json file
- catalogPath: Path to the catalog.json file
- dbtVersion: The version of dbt being used (e.g., "1.5.0")
- adapterType: The database adapter type (e.g., "postgres", "snowflake")
This must be called first to get the projectRoot parameter needed for all other tools.`,
      inputSchema: zodToJsonSchema(BaseSchema) as ToolInput,
      handler: async (args: Record<string, unknown>) => {
        const projects = this.dbtProjectContainer.getProjects();
        const projectDetails = await Promise.all(
          projects.map(async (project: DBTProject) => {
            const details: Record<string, any> = {
              projectRoot: project.projectRoot.fsPath,
            };

            await this.safeGetProjectProperty(
              project,
              "projectName",
              () => project.getProjectName(),
              details,
            );
            await this.safeGetProjectProperty(
              project,
              "selectedTarget",
              () => project.getSelectedTarget(),
              details,
            );
            await this.safeGetProjectProperty(
              project,
              "targetNames",
              () => project.getTargetNames(),
              details,
            );
            await this.safeGetProjectProperty(
              project,
              "targetPath",
              () => project.getTargetPath(),
              details,
            );
            await this.safeGetProjectProperty(
              project,
              "packageInstallPath",
              () => project.getPackageInstallPath(),
              details,
            );
            await this.safeGetProjectProperty(
              project,
              "modelPaths",
              () => project.getModelPaths(),
              details,
            );
            await this.safeGetProjectProperty(
              project,
              "seedPaths",
              () => project.getSeedPaths(),
              details,
            );
            await this.safeGetProjectProperty(
              project,
              "macroPaths",
              () => project.getMacroPaths(),
              details,
            );
            await this.safeGetProjectProperty(
              project,
              "manifestPath",
              () => project.getManifestPath(),
              details,
            );
            await this.safeGetProjectProperty(
              project,
              "catalogPath",
              () => project.getCatalogPath(),
              details,
            );
            await this.safeGetProjectProperty(
              project,
              "dbtVersion",
              () => {
                const version = project.getDBTVersion();
                return version ? version.join(".") : undefined;
              },
              details,
            );
            await this.safeGetProjectProperty(
              project,
              "adapterType",
              () => project.getAdapterType(),
              details,
            );

            return details;
          }),
        );

        return {
          content: createTextContent(JSON.stringify(projectDetails)),
        };
      },
    },
    {
      name: ToolName.GET_COLUMNS_OF_MODEL,
      description:
        "Returns the column names and data types for a specified dbt model. WORKFLOW: Call this BEFORE completing any task to verify the output schema matches requirements.",
      inputSchema: zodToJsonSchema(GetColumnsOfModelSchema) as ToolInput,
      handler: async (args: Record<string, unknown>) => {
        const validatedArgs = GetColumnsOfModelSchema.parse(args);
        const projectRoot = decodeURIComponent(validatedArgs.projectRoot);
        const project = this.dbtProjectContainer.findDBTProject(
          Uri.file(projectRoot),
        );
        if (!project) {
          throw new Error(
            `Project not found for root: ${validatedArgs.projectRoot}`,
          );
        }
        const result = await project.getColumnsOfModel(validatedArgs.modelName);
        return {
          content: createTextContent(JSON.stringify(result)),
        };
      },
    },
    {
      name: ToolName.GET_COLUMNS_OF_SOURCE,
      description:
        "Returns the column names and data types for a specified dbt source. Use this to understand a source's schema before querying it.",
      inputSchema: zodToJsonSchema(GetColumnsOfSourceSchema) as ToolInput,
      handler: async (args: Record<string, unknown>) => {
        const validatedArgs = GetColumnsOfSourceSchema.parse(args);
        const projectRoot = decodeURIComponent(validatedArgs.projectRoot);
        const project = this.dbtProjectContainer.findDBTProject(
          Uri.file(projectRoot),
        );
        if (!project) {
          throw new Error(
            `Project not found for root: ${validatedArgs.projectRoot}`,
          );
        }
        const result = await project.getColumnsOfSource(
          validatedArgs.sourceName,
          validatedArgs.tableName,
        );
        return {
          content: createTextContent(JSON.stringify(result)),
        };
      },
    },
    ...(workspace
      .getConfiguration("dbt")
      .get<boolean>("enableMcpDataSourceQueryTools", false)
      ? [
          {
            name: ToolName.GET_COLUMN_VALUES,
            description:
              "Returns the distinct values for a specified column in a model or source. Use this to understand the data distribution and possible values in a column.",
            inputSchema: zodToJsonSchema(GetColumnValuesSchema) as ToolInput,
            handler: async (args: Record<string, unknown>) => {
              const validatedArgs = GetColumnValuesSchema.parse(args);
              const projectRoot = decodeURIComponent(validatedArgs.projectRoot);
              const project = this.dbtProjectContainer.findDBTProject(
                Uri.file(projectRoot),
              );
              if (!project) {
                throw new Error(
                  `Project not found for root: ${validatedArgs.projectRoot}`,
                );
              }
              const result = await project.getColumnValues(
                validatedArgs.model,
                validatedArgs.column,
              );
              return {
                content: createTextContent(JSON.stringify(result)),
              };
            },
          },
          {
            name: ToolName.EXECUTE_SQL,
            description:
              "⚠️ PREFERRED for validation: Execute SQL queries against the database and get results immediately. WORKFLOW: Use this to spot-check row counts, verify key values, and validate your logic before and after building models.",
            inputSchema: zodToJsonSchema(ExecuteSQLSchema) as ToolInput,
            handler: async (args: Record<string, unknown>) => {
              const validatedArgs = ExecuteSQLSchema.parse(args);
              const projectRoot = decodeURIComponent(validatedArgs.projectRoot);
              const project = this.dbtProjectContainer.findDBTProject(
                Uri.file(projectRoot),
              );
              if (!project) {
                throw new Error(
                  `Project not found for root: ${validatedArgs.projectRoot}`,
                );
              }
              const result = await project.immediatelyExecuteSQL(
                validatedArgs.query,
                validatedArgs.modelName,
              );
              return {
                content: createTextContent(JSON.stringify(result)),
              };
            },
          },
        ]
      : []),
    {
      name: ToolName.COMPILE_MODEL,
      description:
        "Converts Jinja SQL to raw SQL. ⚠️ WARNING: This ONLY performs Jinja templating - it does NOT validate SQL syntax or create anything in the database! You MUST call build_model to actually create the model.",
      inputSchema: zodToJsonSchema(CompileModelSchema) as ToolInput,
      handler: async (args: Record<string, unknown>) => {
        const validatedArgs = CompileModelSchema.parse(args);
        const projectRoot = decodeURIComponent(validatedArgs.projectRoot);
        const project = this.dbtProjectContainer.findDBTProject(
          Uri.file(projectRoot),
        );
        if (!project) {
          throw new Error(
            `Project not found for root: ${validatedArgs.projectRoot}`,
          );
        }
        const result = await project.unsafeCompileNode(validatedArgs.modelName);
        return { content: createTextContent(result || "") };
      },
    },
    {
      name: ToolName.COMPILE_QUERY,
      description:
        "Converts Jinja SQL query to raw SQL. ⚠️ WARNING: This ONLY performs Jinja templating - it does NOT validate SQL syntax or execute anything! Use execute_sql to run and validate the query.",
      inputSchema: zodToJsonSchema(CompileQuerySchema) as ToolInput,
      handler: async (args: Record<string, unknown>) => {
        const validatedArgs = CompileQuerySchema.parse(args);
        const projectRoot = decodeURIComponent(validatedArgs.projectRoot);
        const project = this.dbtProjectContainer.findDBTProject(
          Uri.file(projectRoot),
        );
        if (!project) {
          throw new Error(
            `Project not found for root: ${validatedArgs.projectRoot}`,
          );
        }
        const result = await project.unsafeCompileQuery(
          validatedArgs.query,
          validatedArgs.originalModelName,
        );
        return { content: createTextContent(result || "") };
      },
    },
    {
      name: ToolName.RUN_MODEL,
      description:
        "Runs a dbt model. For most cases, prefer build_model instead as it also runs tests. Use + for plusOperatorLeft to include upstream models, and + for plusOperatorRight to include downstream models.",
      inputSchema: zodToJsonSchema(RunModelSchema) as ToolInput,
      handler: async (args: Record<string, unknown>) => {
        const validatedArgs = RunModelSchema.parse(args);
        const projectRoot = decodeURIComponent(validatedArgs.projectRoot);
        const project = this.dbtProjectContainer.findDBTProject(
          Uri.file(projectRoot),
        );
        if (!project) {
          throw new Error(
            `Project not found for root: ${validatedArgs.projectRoot}`,
          );
        }
        const result = await project.unsafeRunModelImmediately({
          plusOperatorLeft: validatedArgs.plusOperatorLeft,
          modelName: validatedArgs.modelName,
          plusOperatorRight: validatedArgs.plusOperatorRight,
        });
        return this.handleDbtCommandOutput(result);
      },
    },
    {
      name: ToolName.BUILD_MODEL,
      description:
        "⚠️ PREFERRED: Builds a dbt model AND runs its tests. Use + for plusOperatorRight to also rebuild downstream models (recommended after fixes). This ensures data consistency throughout your pipeline.",
      inputSchema: zodToJsonSchema(BuildModelSchema) as ToolInput,
      handler: async (args: Record<string, unknown>) => {
        const validatedArgs = BuildModelSchema.parse(args);
        const projectRoot = decodeURIComponent(validatedArgs.projectRoot);
        const project = this.dbtProjectContainer.findDBTProject(
          Uri.file(projectRoot),
        );
        if (!project) {
          throw new Error(
            `Project not found for root: ${validatedArgs.projectRoot}`,
          );
        }
        const result = await project.unsafeBuildModelImmediately({
          plusOperatorLeft: validatedArgs.plusOperatorLeft,
          modelName: validatedArgs.modelName,
          plusOperatorRight: validatedArgs.plusOperatorRight,
        });
        return this.handleDbtCommandOutput(result);
      },
    },
    {
      name: ToolName.BUILD_PROJECT,
      description:
        "Builds the entire dbt project including seeds, models, and all tests. For single model changes, prefer build_model instead.",
      inputSchema: zodToJsonSchema(BuildProjectSchema) as ToolInput,
      handler: async (args: Record<string, unknown>) => {
        const validatedArgs = BuildProjectSchema.parse(args);
        const projectRoot = decodeURIComponent(validatedArgs.projectRoot);
        const project = this.dbtProjectContainer.findDBTProject(
          Uri.file(projectRoot),
        );
        if (!project) {
          throw new Error(
            `Project not found for root: ${validatedArgs.projectRoot}`,
          );
        }
        const result = await project.unsafeBuildProjectImmediately();
        return this.handleDbtCommandOutput(result);
      },
    },
    {
      name: ToolName.RUN_TEST,
      description:
        "Runs an individual dbt test by test name from the manifest. Note: build_model already includes tests, so use this only for running specific tests independently.",
      inputSchema: zodToJsonSchema(RunTestSchema) as ToolInput,
      handler: async (args: Record<string, unknown>) => {
        const validatedArgs = RunTestSchema.parse(args);
        const projectRoot = decodeURIComponent(validatedArgs.projectRoot);
        const project = this.dbtProjectContainer.findDBTProject(
          Uri.file(projectRoot),
        );
        if (!project) {
          throw new Error(
            `Project not found for root: ${validatedArgs.projectRoot}`,
          );
        }
        const result = await project.unsafeRunTestImmediately(
          validatedArgs.testName,
        );
        return this.handleDbtCommandOutput(result);
      },
    },
    {
      name: ToolName.RUN_MODEL_TEST,
      description:
        "Runs all tests defined for a specific dbt model. Note: build_model already includes tests, so use this only when you need to run tests without rebuilding the model.",
      inputSchema: zodToJsonSchema(RunModelTestSchema) as ToolInput,
      handler: async (args: Record<string, unknown>) => {
        const validatedArgs = RunModelTestSchema.parse(args);
        const projectRoot = decodeURIComponent(validatedArgs.projectRoot);
        const project = this.dbtProjectContainer.findDBTProject(
          Uri.file(projectRoot),
        );
        if (!project) {
          throw new Error(
            `Project not found for root: ${validatedArgs.projectRoot}`,
          );
        }
        const result = await project.unsafeRunModelTestImmediately(
          validatedArgs.modelName,
        );
        return this.handleDbtCommandOutput(result);
      },
    },
    {
      name: ToolName.ADD_DBT_PACKAGES,
      description:
        "Adds dbt package(s) to the project's packages.yml. Format: packageName@version. After adding packages, call install_deps to install them.",
      inputSchema: zodToJsonSchema(AddDbtPackagesSchema) as ToolInput,
      handler: async (args: Record<string, unknown>) => {
        const validatedArgs = AddDbtPackagesSchema.parse(args);
        const projectRoot = decodeURIComponent(validatedArgs.projectRoot);
        const project = this.dbtProjectContainer.findDBTProject(
          Uri.file(projectRoot),
        );
        if (!project) {
          throw new Error(
            `Project not found for root: ${validatedArgs.projectRoot}`,
          );
        }
        const result = await project.installDbtPackages(validatedArgs.packages);
        return {
          content: createTextContent(result.fullOutput),
        };
      },
    },
    {
      name: ToolName.INSTALL_DEPS,
      description:
        "Installs dbt package dependencies from packages.yml. Call this after adding packages with add_dbt_packages, or when setting up a project.",
      inputSchema: zodToJsonSchema(InstallDepsSchema) as ToolInput,
      handler: async (args: Record<string, unknown>) => {
        const validatedArgs = InstallDepsSchema.parse(args);
        const projectRoot = decodeURIComponent(validatedArgs.projectRoot);
        const project = this.dbtProjectContainer.findDBTProject(
          Uri.file(projectRoot),
        );
        if (!project) {
          throw new Error(
            `Project not found for root: ${validatedArgs.projectRoot}`,
          );
        }
        const result = await project.installDeps();
        return {
          content: createTextContent(result.fullOutput),
        };
      },
    },
    {
      name: ToolName.GET_CHILDREN_MODELS,
      description:
        "Returns the list of models that depend on the specified model (its children). Use this to understand a model's downstream impact and lineage.",
      inputSchema: zodToJsonSchema(GetChildrenModelsSchema) as ToolInput,
      handler: async (args: Record<string, unknown>) => {
        const validatedArgs = GetChildrenModelsSchema.parse(args);
        const projectRoot = decodeURIComponent(validatedArgs.projectRoot);
        const project = this.dbtProjectContainer.findDBTProject(
          Uri.file(projectRoot),
        );
        if (!project) {
          throw new Error(
            `Project not found for root: ${validatedArgs.projectRoot}`,
          );
        }
        const result = project.getChildrenModels({
          table: validatedArgs.table,
        });
        return {
          content: createTextContent(JSON.stringify(result)),
        };
      },
    },
    {
      name: ToolName.GET_PARENT_MODELS,
      description:
        "Returns the list of models that the specified model depends on (its parents). Use this to understand a model's upstream dependencies and lineage.",
      inputSchema: zodToJsonSchema(GetParentModelsSchema) as ToolInput,
      handler: async (args: Record<string, unknown>) => {
        const validatedArgs = GetParentModelsSchema.parse(args);
        const projectRoot = decodeURIComponent(validatedArgs.projectRoot);
        const project = this.dbtProjectContainer.findDBTProject(
          Uri.file(projectRoot),
        );
        if (!project) {
          throw new Error(
            `Project not found for root: ${validatedArgs.projectRoot}`,
          );
        }
        const result = project.getParentModels({
          table: validatedArgs.table,
        });
        return {
          content: createTextContent(JSON.stringify(result)),
        };
      },
    },
  ];

  dispose() {}

  private handleDbtCommandOutput = (result?: CommandProcessResult) => {
    if (result?.stderr) {
      throw new Error(result.stderr);
    }
    return {
      content: createTextContent(result?.stdout || ""),
    };
  };

  public getMcpTools = () => {
    return this.tools;
  };

  private async safeGetProjectProperty<T>(
    project: DBTProject,
    propertyName: string,
    getter: () => T,
    details: Record<string, any>,
  ): Promise<void> {
    try {
      const value = await getter();
      if (value !== undefined && value !== null) {
        details[propertyName] = value;
      }
    } catch (error) {
      this.dbtTerminal.debug(
        "DbtPowerUserMcpServerTools",
        `Failed to get ${propertyName}`,
        error,
      );
    }
  }
}

// Helper function to create properly typed content
const createTextContent = (text: string) => [
  {
    type: "text" as const,
    text,
  },
];
