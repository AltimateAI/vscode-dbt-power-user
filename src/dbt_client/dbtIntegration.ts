import { PythonBridge, pythonBridge } from "python-bridge";
import {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
  CommandProcessResult,
} from "../commandProcessExecution";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { existsSync } from "fs";
import { TelemetryService } from "../telemetry";
import { DBTTerminal } from "./terminal";
import { NodeMetaData } from "../domain";
import { DBTDiagnosticResult } from "./diagnostics";
import { DBTConfiguration } from "./configuration";
import { DeferConfig } from "../manifest/dbtProject";

export interface DBTCommandExecutionStrategy {
  execute(
    command: DBTCommand,
    signal?: AbortSignal,
  ): Promise<CommandProcessResult>;
}

export class CLIDBTCommandExecutionStrategy
  implements DBTCommandExecutionStrategy
{
  constructor(
    protected commandProcessExecutionFactory: CommandProcessExecutionFactory,
    protected pythonEnvironment: PythonEnvironment,
    protected terminal: DBTTerminal,
    protected telemetry: TelemetryService,
    protected cwd: string,
    protected dbtPath: string,
  ) {}

  async execute(
    command: DBTCommand,
    signal?: AbortSignal,
  ): Promise<CommandProcessResult> {
    const commandExecution = this.executeCommand(command, signal);
    const executionPromise = command.logToTerminal
      ? (await commandExecution).completeWithTerminalOutput()
      : (await commandExecution).complete();
    return executionPromise;
  }

  protected async executeCommand(
    command: DBTCommand,
    signal?: AbortSignal,
  ): Promise<CommandProcessExecution> {
    if (command.logToTerminal && command.focus) {
      await this.terminal.show(true);
    }
    this.telemetry.sendTelemetryEvent("dbtCommand", {
      command: command.getCommandAsString(),
    });
    if (command.logToTerminal) {
      this.terminal.log(
        `> Executing task: ${command.getCommandAsString()}\n\r`,
      );
    }
    const { args } = command!;
    if (
      !this.pythonEnvironment.pythonPath ||
      !this.pythonEnvironment.environmentVariables
    ) {
      throw Error(
        "Could not launch command as python environment is not available",
      );
    }
    // Combine signals if multiple are provided
    let combinedSignal: AbortSignal | undefined;
    const signals: AbortSignal[] = [];
    if (signal !== undefined) {
      signals.push(signal);
    }
    if (command.signal !== undefined) {
      signals.push(command.signal);
    }

    if (signals.length > 0) {
      if (signals.length === 1) {
        combinedSignal = signals[0];
      } else {
        // Create a combined signal if multiple signals are provided
        const controller = new AbortController();
        combinedSignal = controller.signal;

        signals.forEach((s) => {
          if (s.aborted) {
            controller.abort();
          } else {
            s.addEventListener("abort", () => controller.abort());
          }
        });
      }
    }

    return this.commandProcessExecutionFactory.createCommandProcessExecution({
      command: this.dbtPath,
      args,
      signal: combinedSignal,
      cwd: this.cwd,
      envVars: this.pythonEnvironment.environmentVariables,
    });
  }
}

export class PythonDBTCommandExecutionStrategy
  implements DBTCommandExecutionStrategy
{
  constructor(
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private pythonEnvironment: PythonEnvironment,
    private terminal: DBTTerminal,
    private telemetry: TelemetryService,
    private configuration: DBTConfiguration,
  ) {}

  async execute(
    command: DBTCommand,
    signal?: AbortSignal,
  ): Promise<CommandProcessResult> {
    return (
      await this.executeCommand(command, signal)
    ).completeWithTerminalOutput();
  }

  private async executeCommand(
    command: DBTCommand,
    signal?: AbortSignal,
  ): Promise<CommandProcessExecution> {
    this.terminal.log(`> Executing task: ${command.getCommandAsString()}\n\r`);
    this.telemetry.sendTelemetryEvent("dbtCommand", {
      command: command.getCommandAsString(),
    });
    if (command.focus) {
      await this.terminal.show(true);
    }

    const { args } = command!;
    if (
      !this.pythonEnvironment.pythonPath ||
      !this.pythonEnvironment.environmentVariables
    ) {
      throw Error(
        "Could not launch command as python environment is not available",
      );
    }
    // Combine signals if multiple are provided
    let combinedSignal: AbortSignal | undefined;
    const signals: AbortSignal[] = [];
    if (signal !== undefined) {
      signals.push(signal);
    }
    if (command.signal !== undefined) {
      signals.push(command.signal);
    }

    if (signals.length > 0) {
      if (signals.length === 1) {
        combinedSignal = signals[0];
      } else {
        // Create a combined signal if multiple signals are provided
        const controller = new AbortController();
        combinedSignal = controller.signal;

        signals.forEach((s) => {
          if (s.aborted) {
            controller.abort();
          } else {
            s.addEventListener("abort", () => controller.abort());
          }
        });
      }
    }

    return this.commandProcessExecutionFactory.createCommandProcessExecution({
      command: this.pythonEnvironment.pythonPath,
      args: ["-c", this.dbtCommand(args)],
      signal: combinedSignal,
      envVars: this.pythonEnvironment.environmentVariables,
    });
  }

  private dbtCommand(args: string[]): string {
    args = args.map((arg) => `r"""${arg.replace(/"/g, '\\"')}"""`);
    const dbtCustomRunnerImport = this.configuration.getDbtCustomRunnerImport();
    return `has_dbt_runner = True
try:
    ${dbtCustomRunnerImport}
except Exception:
    has_dbt_runner = False
if has_dbt_runner:
    dbt_cli = dbtRunner()
    dbt_cli.invoke([${args}])
else:
    import dbt.main
    dbt.main.main([${args}])`;
  }
}

export class DBTCommand {
  constructor(
    public statusMessage: string,
    public args: string[],
    public focus: boolean = false,
    public showProgress: boolean = false,
    public logToTerminal: boolean = false,
    public executionStrategy?: DBTCommandExecutionStrategy,
    public signal?: AbortSignal,
    public downloadArtifacts: boolean = false,
  ) {}

  addArgument(arg: string) {
    this.args.push(arg);
  }

  getCommandAsString() {
    return "dbt " + this.args.join(" ");
  }

  setExecutionStrategy(executionStrategy: DBTCommandExecutionStrategy) {
    this.executionStrategy = executionStrategy;
  }

  execute(signal?: AbortSignal) {
    if (this.executionStrategy === undefined) {
      throw new Error("Execution strategy is required to run dbt commands");
    }
    return this.executionStrategy.execute(this, signal);
  }

  setSignal(signal: AbortSignal) {
    this.signal = signal;
  }
}

export interface RunModelParams {
  plusOperatorLeft: string;
  modelName: string;
  plusOperatorRight: string;
}

export interface ExecuteSQLResult {
  table: {
    column_names: string[];
    column_types: string[];
    rows: any[][];
  };
  raw_sql: string;
  compiled_sql: string;
  modelName: string;
}

export class ExecuteSQLError extends Error {
  compiled_sql: string;
  constructor(message: string, compiled_sql: string) {
    super(message);
    this.compiled_sql = compiled_sql;
  }
}

export interface CompilationResult {
  compiled_sql: string;
}

// TODO: standardize error handling
export class DBTIntegrationError extends Error {}
export class DBTIntegrationUnknownError extends Error {}

export interface DBTDetection {
  detectDBT(): Promise<boolean>;
}

export interface DBTInstallion {
  installDBT(): Promise<void>;
}

export interface HealthcheckArgs {
  manifestPath: string;
  catalogPath?: string;
  config?: any;
  configPath?: string;
}

export interface DBTProjectDetection {
  discoverProjects(projectConfigFiles: string[]): Promise<string[]>;
}

export class QueryExecution {
  constructor(
    private cancelFunc: () => Promise<void>,
    private queryResult: () => Promise<ExecuteSQLResult>,
  ) {}

  cancel(): Promise<void> {
    return this.cancelFunc();
  }

  executeQuery(): Promise<ExecuteSQLResult> {
    return this.queryResult();
  }
}

export type DBColumn = { column: string; dtype: string };

export type Node = {
  unique_id: string;
  name: string;
  resource_type: string;
};

export type SourceNode = {
  unique_id: string;
  name: string;
  resource_type: "source";
  table: string;
};

export type DBTNode = Node | SourceNode;

type CatalogItem = {
  table_database: string;
  table_schema: string;
  table_name: string;
  column_name: string;
  column_type: string;
};

export type Catalog = CatalogItem[];

export interface DBTProjectIntegration {
  dispose(): void;
  // initialize execution infrastructure
  initializeProject(): Promise<void>;
  // called when project configuration is changed
  refreshProjectConfig(): Promise<void>;
  // Change target
  setSelectedTarget(targetName: string): Promise<void>;
  getTargetNames(): Promise<Array<string>>;
  // retrieve dbt configs
  getTargetPath(): string | undefined;
  getModelPaths(): string[] | undefined;
  getSeedPaths(): string[] | undefined;
  getMacroPaths(): string[] | undefined;
  getPackageInstallPath(): string | undefined;
  getAdapterType(): string | undefined;
  getVersion(): number[] | undefined;
  getProjectName(): string;
  getSelectedTarget(): string | undefined;
  // parse manifest
  rebuildManifest(): Promise<void>;
  // execute queries
  executeSQL(
    query: string,
    limit: number,
    modelName: string,
  ): Promise<QueryExecution>;
  // dbt commands
  runModel(command: DBTCommand): Promise<DBTCommand | undefined>;
  buildModel(command: DBTCommand): Promise<DBTCommand | undefined>;
  buildProject(command: DBTCommand): Promise<DBTCommand | undefined>;
  runTest(command: DBTCommand): Promise<DBTCommand | undefined>;
  runModelTest(command: DBTCommand): Promise<DBTCommand | undefined>;
  compileModel(command: DBTCommand): Promise<DBTCommand | undefined>;
  generateDocs(command: DBTCommand): Promise<DBTCommand | undefined>;
  clean(command: DBTCommand): Promise<string>;
  executeCommandImmediately(command: DBTCommand): Promise<CommandProcessResult>;
  deps(command: DBTCommand): Promise<string>;
  debug(command: DBTCommand): Promise<string>;
  // altimate commands
  unsafeCompileNode(modelName: string): Promise<string>;
  unsafeCompileQuery(
    query: string,
    originalModelName: string | undefined,
  ): Promise<string>;
  validateSQLDryRun(query: string): Promise<{
    bytes_processed: string; // TODO: create type
  }>;
  getColumnsOfSource(
    sourceName: string,
    tableName: string,
  ): Promise<DBColumn[]>;
  getColumnsOfModel(modelName: string): Promise<DBColumn[]>;
  getCatalog(): Promise<Catalog>;
  getDebounceForRebuildManifest(): number;
  getBulkSchemaFromDB(
    nodes: DBTNode[],
    signal: AbortSignal,
  ): Promise<Record<string, DBColumn[]>>;
  getBulkCompiledSQL(models: NodeMetaData[]): Promise<Record<string, string>>;
  validateWhetherSqlHasColumns(sql: string, dialect: string): Promise<boolean>;
  fetchSqlglotSchema(sql: string, dialect: string): Promise<string[]>;
  findPackageVersion(packageName: string): string | undefined;
  applyDeferConfig(deferConfig: DeferConfig | undefined): Promise<void>;
  applySelectedTarget(): Promise<void>;
  getDeferConfigDefaults(): DeferConfig;
  getDiagnostics(): DBTDiagnosticResult;
  getPythonBridgeStatus(): boolean;
  cleanupConnections(): Promise<void>;
}

export class DBTCommandExecutionInfrastructure {
  constructor(
    private pythonEnvironment: PythonEnvironment,
    private terminal: DBTTerminal,
  ) {}

  createPythonBridge(cwd?: string): PythonBridge {
    let pythonPath = this.pythonEnvironment.pythonPath;
    const envVars = this.pythonEnvironment.environmentVariables;

    if (pythonPath.endsWith("python.exe")) {
      // replace python.exe with pythonw.exe if path exists
      const pythonwPath = pythonPath.replace("python.exe", "pythonw.exe");
      if (existsSync(pythonwPath)) {
        this.terminal.debug(
          "DBTCommandExecutionInfrastructure",
          `Changing python path to ${pythonwPath}`,
        );
        pythonPath = pythonwPath;
      }
    }
    this.terminal.debug(
      "DBTCommandExecutionInfrastructure",
      "Starting python bridge",
      {
        pythonPath,
        cwd,
      },
    );
    return pythonBridge({
      python: pythonPath,
      cwd,
      env: {
        ...envVars,
        PYTHONPATH: __dirname,
      },
      detached: true,
    });
  }

  async closePythonBridge(bridge: PythonBridge) {
    this.terminal.debug("dbtIntegration", `Closing python bridge`);
    try {
      await bridge.disconnect();
      await bridge.end();
    } catch (_) {}
  }
}

export class DBTCommandFactory {
  constructor(private configuration: DBTConfiguration) {}

  createVersionCommand(): DBTCommand {
    return new DBTCommand("Detecting dbt version...", ["--version"]);
  }

  createParseCommand(): DBTCommand {
    return new DBTCommand("Parsing dbt project...", ["parse"]);
  }

  createRunModelCommand(params: RunModelParams): DBTCommand {
    const { plusOperatorLeft, modelName, plusOperatorRight } = params;
    const buildModelCommandAdditionalParams =
      this.configuration.getRunModelCommandAdditionalParams();

    return new DBTCommand(
      "Running dbt model...",
      [
        "run",
        "--select",
        `${plusOperatorLeft}${modelName}${plusOperatorRight}`,
        ...buildModelCommandAdditionalParams,
      ],
      true,
      true,
      true,
    );
  }

  createBuildModelCommand(params: RunModelParams): DBTCommand {
    const { plusOperatorLeft, modelName, plusOperatorRight } = params;
    const buildModelCommandAdditionalParams =
      this.configuration.getBuildModelCommandAdditionalParams();

    return new DBTCommand(
      "Building dbt model...",
      [
        "build",
        "--select",
        `${plusOperatorLeft}${modelName}${plusOperatorRight}`,
        ...buildModelCommandAdditionalParams,
      ],
      true,
      true,
      true,
    );
  }

  createBuildProjectCommand(): DBTCommand {
    return new DBTCommand(
      "Building dbt project...",
      ["build"],
      true,
      true,
      true,
    );
  }

  createTestModelCommand(testName: string): DBTCommand {
    const testModelCommandAdditionalParams =
      this.configuration.getTestModelCommandAdditionalParams();

    return new DBTCommand(
      "Testing dbt model...",
      ["test", "--select", testName, ...testModelCommandAdditionalParams],
      true,
      true,
      true,
    );
  }

  createCompileModelCommand(params: RunModelParams): DBTCommand {
    const { plusOperatorLeft, modelName, plusOperatorRight } = params;
    return new DBTCommand(
      "Compiling dbt models...",
      [
        "compile",
        "--select",
        `${plusOperatorLeft}${modelName}${plusOperatorRight}`,
      ],
      true,
      true,
      true,
    );
  }

  createDocsGenerateCommand(): DBTCommand {
    return new DBTCommand(
      "Generating dbt Docs...",
      ["docs", "generate"],
      true,
      true,
      true,
    );
  }

  createCleanCommand(): DBTCommand {
    return new DBTCommand(
      "Cleaning dbt project...",
      ["clean"],
      true,
      true,
      true,
    );
  }

  createInstallDepsCommand(): DBTCommand {
    return new DBTCommand("Installing packages...", ["deps"], true, true, true);
  }

  createAddPackagesCommand(packages: string[]): DBTCommand {
    return new DBTCommand(
      "Installing packages...",
      ["deps", "--add-package", ...packages],
      true,
      true,
      true,
    );
  }

  createDebugCommand(): DBTCommand {
    return new DBTCommand("Debugging...", ["debug"], true, true, true);
  }
}

type ValidateSqlParseErrorType =
  | "sql_parse_error"
  | "sql_invalid_error"
  | "sql_unknown_error";

interface ValidateSqlParseErrorResponse {
  error_type?: ValidateSqlParseErrorType;
  errors: {
    description: string;
    start_position?: [number, number];
    end_position?: [number, number];
  }[];
}

/**
 * Generic validateSQLUsingSqlGlot function that can be used by all dbt integrations
 * @param python - Python bridge instance
 * @param query - SQL query to validate
 * @param dialect - Database dialect
 * @param models - Model metadata for validation
 * @returns Promise<ValidateSqlParseErrorResponse> - validation result
 */
export async function validateSQLUsingSqlGlot(
  python: PythonBridge | undefined,
  query: string,
  dialect: string,
  models: any,
): Promise<ValidateSqlParseErrorResponse> {
  const result = await python?.lock<ValidateSqlParseErrorResponse>(
    (python) => python!`to_dict(validate_sql(${query}, ${dialect}, ${models}))`,
  );
  return result!;
}
