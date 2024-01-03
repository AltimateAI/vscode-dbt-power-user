import {
  CancellationToken,
  ProgressLocation,
  window,
  workspace,
  Disposable,
  Uri,
} from "vscode";
import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { PythonBridge, pythonBridge } from "python-bridge";
import { provide } from "inversify-binding-decorators";
import {
  CommandProcessExecution,
  CommandProcessExecutionFactory,
} from "../commandProcessExecution";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { existsSync } from "fs";
import { TelemetryService } from "../telemetry";
import { DBTTerminal } from "./dbtTerminal";
import { ValidateSqlParseErrorResponse } from "../altimate";

interface DBTCommandExecution {
  command: (token: CancellationToken) => Promise<void>;
  statusMessage: string;
  focus?: boolean;
}

export interface DBTCommandExecutionStrategy<T> {
  execute(command: DBTCommand<T>, token?: CancellationToken): Promise<T>;
}

@provideSingleton(CLIDBTCommandExecutionStrategy)
export class CLIDBTCommandExecutionStrategy
  implements DBTCommandExecutionStrategy<void>
{
  constructor(
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private pythonEnvironment: PythonEnvironment,
    private terminal: DBTTerminal,
    private telemetry: TelemetryService,
  ) {}

  execute(command: DBTCommand<void>, token?: CancellationToken): Promise<void> {
    return this.executeCommand(command, token).completeWithTerminalOutput(
      this.terminal,
    );
  }

  private executeCommand(
    command: DBTCommand<void>,
    token?: CancellationToken,
  ): CommandProcessExecution {
    this.terminal.log(`> Executing task: ${command.getCommandAsString()}\n\r`);
    this.telemetry.sendTelemetryEvent("dbtCommand", {
      command: command.getCommandAsString(),
    });
    if (command.focus) {
      this.terminal.show(true);
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

    return this.commandProcessExecutionFactory.createCommandProcessExecution({
      command: "dbt",
      args,
      token,
      cwd: this.getFirstWorkspacePath(),
      envVars: this.pythonEnvironment.environmentVariables,
    });
  }

  private getFirstWorkspacePath(): string {
    // If we are executing python via a wrapper like Meltano,
    // we need to execute it from a (any) project directory
    // By default, Command execution is in an ext dir context
    const folders = workspace.workspaceFolders;
    if (folders) {
      return folders[0].uri.fsPath;
    } else {
      // TODO: this shouldn't happen but we should make sure this is valid fallback
      return Uri.file("./").fsPath;
    }
  }
}

@provideSingleton(PythonDBTCommandExecutionStrategy)
export class PythonDBTCommandExecutionStrategy
  implements DBTCommandExecutionStrategy<void>
{
  constructor(
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private pythonEnvironment: PythonEnvironment,
    private terminal: DBTTerminal,
    private telemetry: TelemetryService,
  ) {}

  execute(command: DBTCommand<void>, token?: CancellationToken): Promise<void> {
    return this.executeCommand(command, token).completeWithTerminalOutput(
      this.terminal,
    );
  }

  private executeCommand(
    command: DBTCommand<void>,
    token?: CancellationToken,
  ): CommandProcessExecution {
    this.terminal.log(`> Executing task: ${command.getCommandAsString()}\n\r`);
    this.telemetry.sendTelemetryEvent("dbtCommand", {
      command: command.getCommandAsString(),
    });
    if (command.focus) {
      this.terminal.show(true);
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

    return this.commandProcessExecutionFactory.createCommandProcessExecution({
      command: this.pythonEnvironment.pythonPath,
      args: ["-c", this.dbtCommand(args)],
      token,
      cwd: this.getFirstWorkspacePath(),
      envVars: this.pythonEnvironment.environmentVariables,
    });
  }

  private dbtCommand(args: string[]): string {
    args = args.map((arg) => `'${arg}'`);
    const dbtCustomRunnerImport = workspace
      .getConfiguration("dbt")
      .get<string>(
        "dbtCustomRunnerImport",
        "from dbt.cli.main import dbtRunner",
      );
    return `has_dbt_runner = True
try: 
    ${dbtCustomRunnerImport}
except:
    has_dbt_runner = False
if has_dbt_runner:
    dbt_cli = dbtRunner()
    dbt_cli.invoke([${args}])
else:
    import dbt.main
    dbt.main.main([${args}])`;
  }

  private getFirstWorkspacePath(): string {
    // If we are executing python via a wrapper like Meltano,
    // we need to execute it from a (any) project directory
    // By default, Command execution is in an ext dir context
    const folders = workspace.workspaceFolders;
    if (folders) {
      return folders[0].uri.fsPath;
    } else {
      // TODO: this shouldn't happen but we should make sure this is valid fallback
      return Uri.file("./").fsPath;
    }
  }
}

@provideSingleton(PythonDBTCommandImmediateExecutionStrategy)
export class PythonDBTCommandImmediateExecutionStrategy
  implements DBTCommandExecutionStrategy<string>
{
  constructor(
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private pythonEnvironment: PythonEnvironment,
    private telemetry: TelemetryService,
  ) {}

  execute(
    command: DBTCommand<string>,
    token?: CancellationToken,
  ): Promise<string> {
    return this.executeCommand(command, token).complete();
  }

  private executeCommand(
    command: DBTCommand<string>,
    token?: CancellationToken,
  ): CommandProcessExecution {
    this.telemetry.sendTelemetryEvent("dbtCommand", {
      command: command.getCommandAsString(),
    });

    const { args } = command!;
    if (
      !this.pythonEnvironment.pythonPath ||
      !this.pythonEnvironment.environmentVariables
    ) {
      throw Error(
        "Could not launch command as python environment is not available",
      );
    }

    return this.commandProcessExecutionFactory.createCommandProcessExecution({
      command: this.pythonEnvironment.pythonPath,
      args: ["-c", this.dbtCommand(args)],
      token,
      cwd: this.getFirstWorkspacePath(),
      envVars: this.pythonEnvironment.environmentVariables,
    });
  }

  private dbtCommand(args: string[]): string {
    args = args.map((arg) => `'${arg}'`);
    const dbtCustomRunnerImport = workspace
      .getConfiguration("dbt")
      .get<string>(
        "dbtCustomRunnerImport",
        "from dbt.cli.main import dbtRunner",
      );
    return `has_dbt_runner = True
try: 
    ${dbtCustomRunnerImport}
except:
    has_dbt_runner = False
if has_dbt_runner:
    dbt_cli = dbtRunner()
    dbt_cli.invoke([${args}])
else:
    import dbt.main
    dbt.main.main([${args}])`;
  }

  private getFirstWorkspacePath(): string {
    // If we are executing python via a wrapper like Meltano,
    // we need to execute it from a (any) project directory
    // By default, Command execution is in an ext dir context
    const folders = workspace.workspaceFolders;
    if (folders) {
      return folders[0].uri.fsPath;
    } else {
      // TODO: this shouldn't happen but we should make sure this is valid fallback
      return Uri.file("./").fsPath;
    }
  }
}

export class DBTCommand<T> {
  private executionStrategy?: DBTCommandExecutionStrategy<T>;

  constructor(
    public statusMessage: string,
    public args: string[],
    public focus: boolean = false,
  ) {}

  addArgument(arg: string) {
    this.args.push(arg);
  }

  getCommandAsString() {
    return "dbt " + this.args.join(" ");
  }

  setExecutionStrategy(executionStrategy: DBTCommandExecutionStrategy<T>) {
    this.executionStrategy = executionStrategy;
  }

  execute(token?: CancellationToken) {
    if (this.executionStrategy === undefined) {
      throw new Error("Execution strategy is required to run dbt commands");
    }
    return this.executionStrategy.execute(this, token);
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

export interface DBTProjectIntegration extends Disposable {
  // initialize execution infrastructure
  initializeProject(): Promise<void>;
  // called when project configuration is changed
  refreshProjectConfig(): Promise<void>;
  // retrieve dbt configs
  getTargetPath(): string | undefined;
  getModelPaths(): string[] | undefined;
  getMacroPaths(): string[] | undefined;
  getPackageInstallPath(): string | undefined;
  getAdapterType(): string;
  findAdapterType(): Promise<string | undefined>;
  findVersion(): Promise<number[]>;
  // parse manifest
  rebuildManifest(init: boolean): Promise<void>;
  // execute queries
  executeSQL(query: string): Promise<ExecuteSQLResult>;
  // dbt commands
  runModel(command: DBTCommand<void>): Promise<void>;
  buildModel(command: DBTCommand<void>): Promise<void>;
  runTest(command: DBTCommand<void>): Promise<void>;
  runModelTest(command: DBTCommand<void>): Promise<void>;
  compileModel(command: DBTCommand<void>): Promise<void>;
  generateDocs(command: DBTCommand<void>): Promise<void>;
  deps(command: DBTCommand<string>): Promise<string>;
  debug(command: DBTCommand<string>): Promise<string>;
  // altimate commands
  unsafeCompileNode(modelName: string): Promise<string | undefined>;
  unsafeCompileQuery(query: string): Promise<string | undefined>;
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
  ): Promise<{ [key: string]: string }[]>; // TODO: this should be typed
  getColumnsOfModel(modelName: string): Promise<{ [key: string]: string }[]>; // TODO: this should be typed
  getCatalog(): Promise<{ [key: string]: string }[]>; // TODO: this should be typed
}

@provide(DBTCommandExecutionInfrastructure)
export class DBTCommandExecutionInfrastructure {
  private queue: DBTCommandExecution[] = [];
  private running = false;

  constructor(
    private pythonEnvironment: PythonEnvironment,
    private telemetry: TelemetryService,
  ) {}

  createPythonBridge(cwd: string): PythonBridge {
    let pythonPath = this.pythonEnvironment.pythonPath;
    const envVars = this.pythonEnvironment.environmentVariables;

    if (pythonPath.endsWith("python.exe")) {
      // replace python.exe with pythonw.exe if path exists
      const pythonwPath = pythonPath.replace("python.exe", "pythonw.exe");
      if (existsSync(pythonwPath)) {
        pythonPath = pythonwPath;
      }
    }
    return pythonBridge({
      python: pythonPath,
      cwd: cwd,
      env: {
        ...envVars,
        PYTHONPATH: __dirname,
      },
      detached: true,
    });
  }

  async closePythonBridge(bridge: PythonBridge) {
    try {
      await bridge.disconnect();
      await bridge.end();
    } catch (_) {}
  }

  async addCommandToQueue(command: DBTCommand<void>) {
    this.queue.push({
      command: (token) => command.execute(token),
      statusMessage: command.statusMessage,
      focus: command.focus,
    });
    this.pickCommandToRun();
  }

  private async pickCommandToRun(): Promise<void> {
    if (!this.running && this.queue.length > 0) {
      this.running = true;
      const { command, statusMessage, focus } = this.queue.shift()!;

      await window.withProgress(
        {
          location: focus
            ? ProgressLocation.Notification
            : ProgressLocation.Window,
          cancellable: true,
          title: statusMessage,
        },
        async (_, token) => {
          try {
            await command(token);
          } catch (error) {
            window.showErrorMessage(
              extendErrorWithSupportLinks(
                `Could not run command '${statusMessage}': ` + error + ".",
              ),
            );
            this.telemetry.sendTelemetryError("queueRunCommandError", error, {
              command: statusMessage,
            });
          }
        },
      );

      this.running = false;
      this.pickCommandToRun();
    }
  }
}

@provideSingleton(DBTCommandFactory)
export class DBTCommandFactory {
  createVersionCommand(): DBTCommand<string> {
    return new DBTCommand("Detecting dbt version...", ["--version"]);
  }

  createRunModelCommand(params: RunModelParams): DBTCommand<void> {
    const { plusOperatorLeft, modelName, plusOperatorRight } = params;
    const buildModelCommandAdditionalParams = workspace
      .getConfiguration("dbt")
      .get<string[]>("runModelCommandAdditionalParams", []);

    return new DBTCommand(
      "Running dbt model...",
      [
        "run",
        "--select",
        `${plusOperatorLeft}${modelName}${plusOperatorRight}`,
        ...buildModelCommandAdditionalParams,
      ],
      true,
    );
  }

  createBuildModelCommand(params: RunModelParams): DBTCommand<void> {
    const { plusOperatorLeft, modelName, plusOperatorRight } = params;
    const buildModelCommandAdditionalParams = workspace
      .getConfiguration("dbt")
      .get<string[]>("buildModelCommandAdditionalParams", []);

    return new DBTCommand(
      "Building dbt model...",
      [
        "build",
        "--select",
        `${plusOperatorLeft}${modelName}${plusOperatorRight}`,
        ...buildModelCommandAdditionalParams,
      ],
      true,
    );
  }

  createTestModelCommand(testName: string): DBTCommand<void> {
    const testModelCommandAdditionalParams = workspace
      .getConfiguration("dbt")
      .get<string[]>("testModelCommandAdditionalParams", []);

    return new DBTCommand("Testing dbt model...", [
      "test",
      "--select",
      ...testModelCommandAdditionalParams,
    ]);
  }

  createCompileModelCommand(params: RunModelParams): DBTCommand<void> {
    const { plusOperatorLeft, modelName, plusOperatorRight } = params;
    return new DBTCommand(
      "Compiling dbt models...",
      [
        "compile",
        "--select",
        `${plusOperatorLeft}${modelName}${plusOperatorRight}`,
      ],
      true,
    );
  }

  createDocsGenerateCommand(): DBTCommand<void> {
    return new DBTCommand("Generating dbt Docs...", ["docs", "generate"], true);
  }

  createInstallDepsCommand(): DBTCommand<string> {
    return new DBTCommand("Installing packages...", ["deps"], true);
  }

  createDebugCommand(): DBTCommand<string> {
    return new DBTCommand("Debugging...", ["debug"], true);
  }
}
