import { ProgressLocation, window } from "vscode";
import {
  convertAbortSignalToCancellationToken,
  extendErrorWithSupportLinks,
} from "../utils";
import { PythonBridge, pythonBridge } from "python-bridge";
import {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
  CommandProcessResult,
} from "../commandProcessExecution";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { existsSync } from "fs";
import { TelemetryService } from "../telemetry";
import { DBTTerminal } from "./dbtTerminal";
import {
  AltimateRequest,
  NoCredentialsError,
  ValidateSqlParseErrorResponse,
} from "../altimate";
import { ProjectHealthcheck } from "./dbtCoreIntegration";
import { NodeMetaData } from "../domain";
import { DBTDiagnosticResult } from "./diagnostics";
import { DBTConfiguration } from "./configuration";

interface DBTCommandExecution {
  command: (signal?: AbortSignal) => Promise<void>;
  statusMessage: string;
  showProgress?: boolean;
  focus?: boolean;
  signal?: AbortSignal;
}

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
    const signals: AbortSignal[] = [];
    if (signal !== undefined) {
      signals.push(signal);
    }
    if (command.signal !== undefined) {
      signals.push(command.signal);
    }
    return this.commandProcessExecutionFactory.createCommandProcessExecution({
      command: this.dbtPath,
      args,
      tokens: signals.map((s) => convertAbortSignalToCancellationToken(s)),
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
    const signals: AbortSignal[] = [];
    if (signal !== undefined) {
      signals.push(signal);
    }
    if (command.signal !== undefined) {
      signals.push(command.signal);
    }
    return this.commandProcessExecutionFactory.createCommandProcessExecution({
      command: this.pythonEnvironment.pythonPath,
      args: ["-c", this.dbtCommand(args)],
      tokens: signals.map((s) => convertAbortSignalToCancellationToken(s)),
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
  runModel(command: DBTCommand): Promise<CommandProcessResult | undefined>;
  buildModel(command: DBTCommand): Promise<CommandProcessResult | undefined>;
  buildProject(command: DBTCommand): Promise<CommandProcessResult | undefined>;
  runTest(command: DBTCommand): Promise<CommandProcessResult | undefined>;
  runModelTest(command: DBTCommand): Promise<CommandProcessResult | undefined>;
  compileModel(command: DBTCommand): Promise<void>;
  generateDocs(command: DBTCommand): Promise<void>;
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
  validateSql(
    query: string,
    dialect: string,
    models: any, // TODO: type this
  ): Promise<ValidateSqlParseErrorResponse>;
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
  performDatapilotHealthcheck(
    args: HealthcheckArgs,
  ): Promise<ProjectHealthcheck>;
  applyDeferConfig(): Promise<void>;
  applySelectedTarget(): Promise<void>;
  getDeferConfigDefaults(): {
    deferToProduction: boolean;
    favorState: boolean;
  };
  getDiagnostics(): DBTDiagnosticResult;
  getPythonBridgeStatus(): boolean;
  cleanupConnections(): Promise<void>;
}

export class DBTCommandExecutionInfrastructure {
  private queues: Map<string, DBTCommandExecution[]> = new Map<
    string,
    DBTCommandExecution[]
  >();
  private queueStates: Map<string, boolean> = new Map<string, boolean>();

  constructor(
    private pythonEnvironment: PythonEnvironment,
    private telemetry: TelemetryService,
    private altimate: AltimateRequest,
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

  createQueue(queueName: string) {
    this.queues.set(queueName, []);
  }

  async addCommandToQueue(
    queueName: string,
    command: DBTCommand,
  ): Promise<CommandProcessResult | undefined> {
    this.queues.get(queueName)!.push({
      command: async (signal) => {
        await command.execute(signal);
      },
      statusMessage: command.statusMessage,
      focus: command.focus,
      signal: command.signal,
      showProgress: command.showProgress,
    });
    this.pickCommandToRun(queueName);
    return undefined;
  }

  private async pickCommandToRun(queueName: string): Promise<void> {
    const queue = this.queues.get(queueName)!;
    const running = this.queueStates.get(queueName);
    if (!running && queue.length > 0) {
      this.queueStates.set(queueName, true);
      const { command, statusMessage, focus, showProgress } = queue.shift()!;
      const commandExecution = async (signal?: AbortSignal) => {
        try {
          await command(signal);
        } catch (error) {
          if (error instanceof NoCredentialsError) {
            this.altimate.handlePreviewFeatures();
            return;
          }
          window.showErrorMessage(
            extendErrorWithSupportLinks(
              `Could not run command '${statusMessage}': ` + error + ".",
            ),
          );
          this.telemetry.sendTelemetryError("queueRunCommandError", error, {
            command: statusMessage,
          });
        }
      };

      if (showProgress) {
        await window.withProgress(
          {
            location: focus
              ? ProgressLocation.Notification
              : ProgressLocation.Window,
            cancellable: true,
            title: statusMessage,
          },
          async (_, token) => {
            const abortController = new AbortController();
            token.onCancellationRequested(() => abortController.abort());
            await commandExecution(abortController.signal);
          },
        );
      } else {
        await commandExecution();
      }
      this.queueStates.set(queueName, false);
      this.pickCommandToRun(queueName);
    }
  }

  async runCommand(command: DBTCommand) {
    const commandExecution: DBTCommandExecution = {
      command: async (signal) => {
        await command.execute(signal);
      },
      statusMessage: command.statusMessage,
      focus: command.focus,
    };
    await window.withProgress(
      {
        location: commandExecution.focus
          ? ProgressLocation.Notification
          : ProgressLocation.Window,
        cancellable: true,
        title: commandExecution.statusMessage,
      },
      async (_, token) => {
        try {
          const abortController = new AbortController();
          token.onCancellationRequested(() => abortController.abort());
          return await commandExecution.command(abortController.signal);
        } catch (error) {
          window.showErrorMessage(
            extendErrorWithSupportLinks(
              `Could not run command '${commandExecution.statusMessage}': ` +
                (error as Error).message +
                ".",
            ),
          );
          this.telemetry.sendTelemetryError("runCommandError", error, {
            command: commandExecution.statusMessage,
          });
        }
      },
    );
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
