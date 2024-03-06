import {
  workspace,
  Uri,
  languages,
  Disposable,
  Range,
  window,
  CancellationTokenSource,
  Diagnostic,
} from "vscode";
import { getProjectRelativePath, provideSingleton } from "../utils";
import {
  Catalog,
  DBColumn,
  DBTCommand,
  DBTCommandExecutionInfrastructure,
  DBTCommandExecutionStrategy,
  DBTCommandFactory,
  DBTDetection,
  DBTProjectDetection,
  DBTProjectIntegration,
  QueryExecution,
} from "./dbtIntegration";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { PythonBridge } from "python-bridge";
import { join, dirname } from "path";
import { AltimateRequest, ValidateSqlParseErrorResponse } from "../altimate";
import path = require("path");
import { DBTProject } from "../manifest/dbtProject";
import { TelemetryService } from "../telemetry";
import { DBTTerminal } from "./dbtTerminal";
import { DeferConfig } from "../webview_provider/insightsPanel";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { existsSync } from "fs";
import { ValidationProvider } from "../validation_provider";
import { DeferToProdService } from "../services/deferToProdService";

function getDBTPath(
  pythonEnvironment: PythonEnvironment,
  terminal: DBTTerminal,
): string {
  if (pythonEnvironment.pythonPath) {
    const dbtPythonPath = join(dirname(pythonEnvironment.pythonPath), "dbt");
    if (existsSync(dbtPythonPath)) {
      terminal.debug("Found dbt path in Python bin directory:", dbtPythonPath);
      return dbtPythonPath;
    }
  }
  terminal.debug("Using default dbt path:", "dbt");
  return "dbt";
}

@provideSingleton(DBTCloudDetection)
export class DBTCloudDetection implements DBTDetection {
  constructor(
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private pythonEnvironment: PythonEnvironment,
    private terminal: DBTTerminal,
  ) {}

  async detectDBT(): Promise<boolean> {
    const dbtPath = getDBTPath(this.pythonEnvironment, this.terminal);
    try {
      this.terminal.debug("DBTCLIDetection", "Detecting dbt cloud cli");
      const checkDBTInstalledProcess =
        this.commandProcessExecutionFactory.createCommandProcessExecution({
          command: dbtPath,
          args: ["--version"],
          cwd: this.getFirstWorkspacePath(),
        });
      const { stdout, stderr } = await checkDBTInstalledProcess.complete();
      if (stderr) {
        throw new Error(stderr);
      }
      if (stdout.includes("dbt Cloud CLI")) {
        this.terminal.debug("DBTCLIDetectionSuccess", "dbt cloud cli detected");
        return true;
      } else {
        this.terminal.debug(
          "DBTCLIDetectionFailed",
          "dbt cloud cli was not found. Detection command returned :  " +
            stdout,
        );
      }
    } catch (error) {
      console.warn(error);
      this.terminal.error(
        "DBTCLIDetectionError",
        "detection failed with error : ",
        error,
      );
    }
    return false;
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

@provideSingleton(DBTCloudProjectDetection)
export class DBTCloudProjectDetection
  implements DBTProjectDetection, Disposable
{
  constructor(private altimate: AltimateRequest) {}

  async discoverProjects(projectDirectories: Uri[]): Promise<Uri[]> {
    this.altimate.handlePreviewFeatures();
    const packagesInstallPaths = projectDirectories.map((projectDirectory) =>
      path.join(projectDirectory.fsPath, "dbt_packages"),
    );
    const filteredProjectFiles = projectDirectories.filter((uri) => {
      return !packagesInstallPaths.some((packageInstallPath) => {
        return uri.fsPath.startsWith(packageInstallPath!);
      });
    });
    if (filteredProjectFiles.length > 20) {
      window.showWarningMessage(
        `dbt Power User detected ${filteredProjectFiles.length} projects in your work space, this will negatively affect performance.`,
      );
    }
    return filteredProjectFiles;
  }

  async dispose() {}
}

@provideSingleton(DBTCloudProjectIntegration)
export class DBTCloudProjectIntegration
  implements DBTProjectIntegration, Disposable
{
  private static QUEUE_ALL = "all";
  private targetPath?: string;
  private adapterType: string = "unknown";
  private packagesInstallPath?: string;
  private modelPaths?: string[];
  private macroPaths?: string[];
  private python: PythonBridge;
  private dbtPath: string = "dbt";
  private disposables: Disposable[] = [];
  private readonly rebuildManifestDiagnostics =
    languages.createDiagnosticCollection("dbt");
  private readonly pythonBridgeDiagnostics =
    languages.createDiagnosticCollection("dbt");
  private rebuildManifestCancellationTokenSource:
    | CancellationTokenSource
    | undefined;

  constructor(
    private executionInfrastructure: DBTCommandExecutionInfrastructure,
    private dbtCommandFactory: DBTCommandFactory,
    private cliDBTCommandExecutionStrategyFactory: (
      path: Uri,
      dbtPath: string,
    ) => DBTCommandExecutionStrategy,
    private telemetry: TelemetryService,
    private pythonEnvironment: PythonEnvironment,
    private terminal: DBTTerminal,
    private validationProvider: ValidationProvider,
    private deferToProdService: DeferToProdService,
    private projectRoot: Uri,
  ) {
    this.python = this.executionInfrastructure.createPythonBridge(
      this.projectRoot.fsPath,
    );
    this.executionInfrastructure.createQueue(
      DBTCloudProjectIntegration.QUEUE_ALL,
    );
    this.terminal.debug(
      "DBTCloudProjectIntegration",
      "Registering dbt cloud project" + this.projectRoot,
    );

    this.disposables.push(
      this.pythonEnvironment.onPythonEnvironmentChanged(() => {
        this.python = this.executionInfrastructure.createPythonBridge(
          this.projectRoot.fsPath,
        );
        this.initializeProject();
      }),
      this.rebuildManifestDiagnostics,
      this.pythonBridgeDiagnostics,
    );
  }

  async refreshProjectConfig(): Promise<void> {
    await this.initializePaths();
  }

  async executeSQL(query: string, limit: number): Promise<QueryExecution> {
    this.throwIfNotAuthenticated();
    const showCommand = this.dbtCloudCommand(
      new DBTCommand("Running sql...", [
        "show",
        "--inline",
        query,
        "--limit",
        limit.toString(),
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    const cancellationTokenSource = new CancellationTokenSource();
    showCommand.setToken(cancellationTokenSource.token);
    return new QueryExecution(
      async () => {
        cancellationTokenSource.cancel();
      },
      async () => {
        try {
          const output = await showCommand.execute(
            cancellationTokenSource.token,
          );
          const previewLine = output
            .trim()
            .split("\n")
            .map((line) => JSON.parse(line.trim()))
            .filter((line) => line.data.hasOwnProperty("preview"));
          const preview = JSON.parse(previewLine[0].data.preview);

          return {
            table: {
              column_names: preview.length > 0 ? Object.keys(preview[0]) : [],
              column_types:
                preview.length > 0
                  ? Object.keys(preview[0]).map((obj: any) => "string")
                  : [],
              rows: preview.map((obj: any) => Object.values(obj)),
            },
            compiled_sql: "",
            raw_sql: query,
          };
        } catch (error) {
          throw this.processJSONErrors(error);
        }
      },
    );
  }

  async initializeProject(): Promise<void> {
    try {
      await this.python
        .ex`from dbt_cloud_integration import validate_sql, to_dict`;
    } catch (error) {
      // TODO: telemetry + better error
      window.showErrorMessage(
        "Error occurred while initializing Python environment: " + error,
      );
    }
    this.dbtPath = getDBTPath(this.pythonEnvironment, this.terminal);
  }

  getTargetPath(): string | undefined {
    return this.targetPath;
  }

  getModelPaths(): string[] | undefined {
    return this.modelPaths;
  }

  getMacroPaths(): string[] | undefined {
    return this.macroPaths;
  }

  getPackageInstallPath(): string | undefined {
    return this.packagesInstallPath;
  }

  getAdapterType(): string {
    return this.adapterType;
  }

  getVersion(): number[] {
    // TODO: get version
    return [0, 0, 0];
  }

  async rebuildManifest(): Promise<void> {
    if (this.rebuildManifestCancellationTokenSource) {
      this.rebuildManifestCancellationTokenSource.cancel();
      this.rebuildManifestCancellationTokenSource = undefined;
    }
    try {
      const command = this.dbtCloudCommand(
        this.dbtCommandFactory.createParseCommand(),
      );
      this.rebuildManifestCancellationTokenSource =
        new CancellationTokenSource();
      command.setToken(this.rebuildManifestCancellationTokenSource.token);
      await command.execute();
      this.rebuildManifestDiagnostics.clear();
    } catch (error) {
      const exception = (error as Error).message;
      this.rebuildManifestDiagnostics.set(
        Uri.joinPath(this.projectRoot, DBTProject.DBT_PROJECT_FILE),
        [
          new Diagnostic(
            new Range(0, 0, 999, 999),
            "There is a problem in your dbt project. Compilation failed: " +
              exception,
          ),
        ],
      );
      this.telemetry.sendTelemetryEvent("dbtCloudCannotParseProjectUserError", {
        error: exception,
        adapter: this.getAdapterType() || "unknown",
      });
    }
  }

  async runModel(command: DBTCommand) {
    this.addCommandToQueue(
      DBTCloudProjectIntegration.QUEUE_ALL,
      await this.addDeferParams(this.dbtCloudCommand(command)),
    );
  }

  async buildModel(command: DBTCommand) {
    this.addCommandToQueue(
      DBTCloudProjectIntegration.QUEUE_ALL,
      await this.addDeferParams(this.dbtCloudCommand(command)),
    );
  }

  async buildProject(command: DBTCommand) {
    this.addCommandToQueue(
      DBTCloudProjectIntegration.QUEUE_ALL,
      await this.addDeferParams(this.dbtCloudCommand(command)),
    );
  }

  async runTest(command: DBTCommand) {
    this.addCommandToQueue(
      DBTCloudProjectIntegration.QUEUE_ALL,
      await this.addDeferParams(this.dbtCloudCommand(command)),
    );
  }

  async runModelTest(command: DBTCommand) {
    this.addCommandToQueue(
      DBTCloudProjectIntegration.QUEUE_ALL,
      await this.addDeferParams(this.dbtCloudCommand(command)),
    );
  }

  async compileModel(command: DBTCommand) {
    this.addCommandToQueue(
      DBTCloudProjectIntegration.QUEUE_ALL,
      this.dbtCloudCommand(command),
    );
  }

  async generateDocs(command: DBTCommand) {
    this.addCommandToQueue(
      DBTCloudProjectIntegration.QUEUE_ALL,
      this.dbtCloudCommand(command),
    );
  }

  async deps(command: DBTCommand) {
    return this.dbtCloudCommand(command).execute();
  }

  async debug(command: DBTCommand) {
    return this.dbtCloudCommand(command).execute();
  }

  private async getDeferParams(): Promise<string[]> {
    this.throwIfNotAuthenticated();
    const deferConfig = this.deferToProdService.getDeferConfigByProjectRoot(
      this.projectRoot.fsPath,
    );
    const { deferToProduction } = deferConfig;
    // explicitly checking false to make sure defer is disabled
    if (!deferToProduction) {
      this.terminal.debug("Defer to Prod", "defer to prod not enabled");
      return ["--no-defer"];
    }
    return [];
  }

  private async addDeferParams(command: DBTCommand) {
    const deferParams = await this.getDeferParams();
    deferParams.forEach((param) => command.addArgument(param));
    return command;
  }

  private dbtCloudCommand(command: DBTCommand) {
    command.setExecutionStrategy(
      this.cliDBTCommandExecutionStrategyFactory(
        this.projectRoot,
        this.dbtPath,
      ),
    );
    return command;
  }

  private addCommandToQueue(queueName: string, command: DBTCommand) {
    try {
      this.throwIfNotAuthenticated();
      this.executionInfrastructure.addCommandToQueue(queueName, command);
    } catch (e) {
      window.showErrorMessage((e as Error).message);
    }
  }

  // internal commands
  async unsafeCompileNode(modelName: string): Promise<string | undefined> {
    this.throwIfNotAuthenticated();
    const compileQueryCommand = this.dbtCloudCommand(
      new DBTCommand("Compiling model...", [
        "compile",
        "--model",
        modelName,
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    try {
      const output = await compileQueryCommand.execute();
      const compiledLine = output
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line.trim()))
        .filter((line) => line.data.hasOwnProperty("compiled"));
      return compiledLine[0].data.compiled;
    } catch (error) {
      throw this.processJSONErrors(error);
    }
  }

  async unsafeCompileQuery(query: string): Promise<string | undefined> {
    this.throwIfNotAuthenticated();
    const compileQueryCommand = this.dbtCloudCommand(
      new DBTCommand("Compiling sql...", [
        "compile",
        "--inline",
        query,
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    try {
      const output = await compileQueryCommand.execute();
      const compiledLine = output
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line.trim()))
        .filter((line) => line.data.hasOwnProperty("compiled"));
      return compiledLine[0].data.compiled;
    } catch (error) {
      throw this.processJSONErrors(error);
    }
  }

  async validateSql(
    query: string,
    dialect: string,
    models: any,
  ): Promise<ValidateSqlParseErrorResponse> {
    this.throwIfNotAuthenticated();
    const result = await this.python?.lock<ValidateSqlParseErrorResponse>(
      (python) =>
        python!`to_dict(validate_sql(${query}, ${dialect}, ${models}))`,
    );
    return result;
  }

  async validateSQLDryRun(query: string): Promise<{ bytes_processed: string }> {
    this.throwIfNotAuthenticated();
    const validateSqlCommand = this.dbtCloudCommand(
      new DBTCommand("Estimating BigQuery cost...", [
        "compile",
        "--inline",
        `{{ validate_sql('${query}') }}`,
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    try {
      const output = await validateSqlCommand.execute();
      const compiledLine = output
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line.trim()))
        .filter((line) => line.data.hasOwnProperty("compiled"));
      return JSON.parse(compiledLine[0].data.compiled);
    } catch (error) {
      throw this.processJSONErrors(error);
    }
  }

  async getColumnsOfSource(
    sourceName: string,
    tableName: string,
  ): Promise<DBColumn[]> {
    this.throwIfNotAuthenticated();
    const compileQueryCommand = this.dbtCloudCommand(
      new DBTCommand("Getting columns of source...", [
        "compile",
        "--inline",
        `{% set output = [] %}{% for result in adapter.get_columns_in_relation(source('${sourceName}', '${tableName}')) %} {% do output.append({"column": result.name, "dtype": result.dtype}) %} {% endfor %} {{ tojson(output) }}`,
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    try {
      const output = await compileQueryCommand.execute();
      const compiledLine = output
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line.trim()))
        .filter((line) => line.data.hasOwnProperty("compiled"));
      return JSON.parse(compiledLine[0].data.compiled);
    } catch (error) {
      throw this.processJSONErrors(error);
    }
  }

  async getColumnsOfModel(modelName: string): Promise<DBColumn[]> {
    this.throwIfNotAuthenticated();
    const compileQueryCommand = this.dbtCloudCommand(
      new DBTCommand("Getting columns of model...", [
        "compile",
        "--inline",
        `{% set output = [] %}{% for result in adapter.get_columns_in_relation(ref('${modelName}')) %} {% do output.append({"column": result.name, "dtype": result.dtype}) %} {% endfor %} {{ tojson(output) }}`,
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    try {
      const output = await compileQueryCommand.execute();
      const compiledLine = output
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line.trim()))
        .filter((line) => line.data.hasOwnProperty("compiled"));
      return JSON.parse(compiledLine[0].data.compiled);
    } catch (error) {
      throw this.processJSONErrors(error);
    }
  }

  async getCatalog(): Promise<Catalog> {
    this.throwIfNotAuthenticated();
    const compileQueryCommand = this.dbtCloudCommand(
      new DBTCommand("Getting catalog...", [
        "compile",
        "--inline",
        `{% set output = [] %}{% for result in adapter.get_catalog()) %} {% do output.append({"column": result.name, "dtype": result.dtype}) %} {% endfor %} {{ tojson(output) }}`,
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    try {
      const output = await compileQueryCommand.execute();
      const compiledLine = output
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line.trim()))
        .filter((line) => line.data.hasOwnProperty("compiled"));
      return JSON.parse(compiledLine[0].data.compiled);
    } catch (error) {
      throw this.processJSONErrors(error);
    }
  }

  getDebounceForRebuildManifest() {
    return 500;
  }

  // get dbt config
  private async initializePaths() {
    // all hardcoded as there is no way to get them reliably
    //  we can't parse jinja
    //  TODO: read from dbt_project.yml instead
    this.targetPath = join(this.projectRoot.fsPath, "target");
    this.modelPaths = [join(this.projectRoot.fsPath, "models")];
    this.macroPaths = [join(this.projectRoot.fsPath, "macros")];
    this.packagesInstallPath = join(this.projectRoot.fsPath, "dbt_packages");

    const adapterTypeCommand = this.dbtCloudCommand(
      new DBTCommand("Getting adapter type...", [
        "compile",
        "--inline",
        "{{ adapter.type() }}",
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    try {
      const output = await adapterTypeCommand.execute();
      const compiledLine = output
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line.trim()))
        .filter((line) => line.data.hasOwnProperty("compiled"));
      this.adapterType = compiledLine[0].data.compiled;
    } catch (error) {
      throw this.processJSONErrors(error);
    }
  }

  private processJSONErrors(jsonErrors: unknown) {
    const rawError = (jsonErrors as Error).message;
    const errorLines: string[] = [];
    try {
      // eslint-disable-next-line prefer-spread
      errorLines.push.apply(
        errorLines,
        rawError
          .trim()
          .split("\n")
          .map((line) => JSON.parse(line.trim()).info.msg),
      );
    } catch (error) {
      // ideally we never come here, this is a bug in our code
      return new Error("Could not process " + rawError + ": " + error);
    }
    return new Error(
      errorLines.length
        ? errorLines.join(", ")
        : "Could not process error output: " + rawError,
    );
  }

  private throwIfNotAuthenticated() {
    this.validationProvider.throwIfNotAuthenticated();
  }

  async dispose() {
    try {
      await this.executionInfrastructure.closePythonBridge(this.python);
    } catch (error) {} // We don't care about errors here.
    this.rebuildManifestDiagnostics.clear();
    this.pythonBridgeDiagnostics.clear();
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
