import {
  workspace,
  Uri,
  languages,
  Disposable,
  Range,
  window,
  CancellationTokenSource,
  Diagnostic,
  DiagnosticCollection,
  DiagnosticSeverity,
  CancellationToken,
} from "vscode";
import { provideSingleton } from "../utils";
import {
  Catalog,
  DBColumn,
  DBTNode,
  DBTCommand,
  DBTCommandExecutionInfrastructure,
  DBTCommandExecutionStrategy,
  DBTCommandFactory,
  DBTDetection,
  DBTProjectDetection,
  DBTProjectIntegration,
  QueryExecution,
  HealthcheckArgs,
} from "./dbtIntegration";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { PythonBridge } from "python-bridge";
import { join, dirname } from "path";
import { AltimateRequest, ValidateSqlParseErrorResponse } from "../altimate";
import path = require("path");
import { DBTProject } from "../manifest/dbtProject";
import { TelemetryService } from "../telemetry";
import { DBTTerminal } from "./dbtTerminal";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { existsSync } from "fs";
import { ValidationProvider } from "../validation_provider";
import { DeferToProdService } from "../services/deferToProdService";
import { ProjectHealthcheck } from "./dbtCoreIntegration";
import semver = require("semver");
import { NodeMetaData } from "../domain";

export function getDBTPath(
  pythonEnvironment: PythonEnvironment,
  terminal: DBTTerminal,
): string {
  if (pythonEnvironment.pythonPath) {
    const allowedDbtPaths = ["dbt", "dbt.exe"];
    const dbtPath = allowedDbtPaths.find((path) =>
      existsSync(join(dirname(pythonEnvironment.pythonPath), path)),
    );
    if (dbtPath) {
      const dbtPythonPath = join(
        dirname(pythonEnvironment.pythonPath),
        dbtPath,
      );
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
        const regex = /dbt Cloud CLI - (\d*\.\d*\.\d*)/gm;
        const matches = regex.exec(stdout);
        if (matches?.length === 2) {
          const minVersion = "0.37.6";
          const currentVersion = matches[1];
          if (semver.lt(currentVersion, minVersion)) {
            window.showErrorMessage(
              `This version of dbt Cloud is not supported. Please update to a dbt Cloud CLI version higher than ${minVersion}`,
            );
            this.terminal.debug(
              "DBTCLIDetectionFailed",
              "dbt cloud cli was found but version is not supported. Detection command returned :  " +
                stdout,
            );
            return true;
          }
        }
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
      this.terminal.warn(
        "DBTCLIDetectionError",
        "Detection failed with error : " + (error as Error).message,
      );
    }
    this.terminal.debug(
      "DBTCLIDetectionFailed",
      "dbt cloud cli was not found. Detection command returning false",
    );
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
  private version: number[] | undefined;
  private adapterType: string = "unknown";
  private packagesInstallPath?: string;
  private modelPaths?: string[];
  private seedPaths?: string[];
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
  private pathsInitalized = false;

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
    this.terminal.debug(
      "DBTCloudProjectIntegration",
      `Registering dbt cloud project at ${this.projectRoot}`,
    );
    this.python = this.executionInfrastructure.createPythonBridge(
      this.projectRoot.fsPath,
    );
    this.executionInfrastructure.createQueue(
      DBTCloudProjectIntegration.QUEUE_ALL,
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
    if (!this.pathsInitalized) {
      // First time let,s block
      await this.initializePaths();
      this.pathsInitalized = true;
    } else {
      this.initializePaths();
    }
    if (!this.adapterType) {
      // We only fetch the adapter type once, as it may impact compilation preview otherwise
      this.findAdapterType();
    }
    if (!this.version) {
      await this.findVersion();
    }
  }

  async executeSQL(
    query: string,
    limit: number,
    modelName: string,
  ): Promise<QueryExecution> {
    this.throwIfNotAuthenticated();
    this.throwBridgeErrorIfAvailable();
    const showCommand = this.dbtCloudCommand(
      new DBTCommand("Running sql...", [
        "show",
        "--log-level",
        "debug",
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
        const { stdout, stderr } = await showCommand.execute(
          cancellationTokenSource.token,
        );
        const exception = this.processJSONErrors(stderr);
        if (exception) {
          throw exception;
        }
        const parsedLines = stdout
          .trim()
          .split("\n")
          .map((line) => JSON.parse(line.trim()));
        const previewLine = parsedLines.filter(
          (line) =>
            line.hasOwnProperty("data") && line.data.hasOwnProperty("preview"),
        );
        const compiledSqlLines = parsedLines.filter(
          (line) =>
            line.hasOwnProperty("data") && line.data.hasOwnProperty("sql"),
        );
        if (previewLine.length === 0) {
          throw new Error("Could not find previewLine in " + stdout);
        }
        const preview = JSON.parse(previewLine[0].data.preview);
        if (compiledSqlLines.length === 0) {
          throw new Error("Could not find compiledSqlLine in " + stdout);
        }
        const compiledSql =
          compiledSqlLines[compiledSqlLines.length - 1].data.sql;
        return {
          table: {
            column_names: preview.length > 0 ? Object.keys(preview[0]) : [],
            column_types:
              preview.length > 0
                ? Object.keys(preview[0]).map((obj: any) => "string")
                : [],
            rows: preview.map((obj: any) => Object.values(obj)),
          },
          compiled_sql: compiledSql,
          raw_sql: query,
          modelName,
        };
      },
    );
  }

  async initializeProject(): Promise<void> {
    try {
      await this.python.ex`from dbt_cloud_integration import *`;
      await this.python.ex`from dbt_healthcheck import *`;
    } catch (error) {
      this.terminal.error(
        "dbtCloudIntegration",
        "Could not initalize Python environemnt",
        error,
      );
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

  getSeedPaths(): string[] | undefined {
    return this.seedPaths;
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
    return this.version || [0, 0, 0];
  }

  getPythonBridgeStatus(): boolean {
    return this.python.connected;
  }

  getAllDiagnostic(): Diagnostic[] {
    return [
      ...(this.pythonBridgeDiagnostics.get(this.projectRoot) || []),
      ...(this.rebuildManifestDiagnostics.get(this.projectRoot) || []),
    ];
  }

  async rebuildManifest(retryCount: number = 0): Promise<void> {
    // TODO: check whether we should allow parsing for unauthenticated users
    // this.throwIfNotAuthenticated();
    if (this.rebuildManifestCancellationTokenSource) {
      this.rebuildManifestCancellationTokenSource.cancel();
      this.rebuildManifestCancellationTokenSource = undefined;
    }
    const command = this.dbtCloudCommand(
      this.dbtCommandFactory.createParseCommand(),
    );
    command.addArgument("--log-format");
    command.addArgument("json");
    command.downloadArtifacts = true;
    this.rebuildManifestCancellationTokenSource = new CancellationTokenSource();
    command.setToken(this.rebuildManifestCancellationTokenSource.token);

    try {
      const result = await command.execute();
      const stderr = result.stderr;
      // sending stderr everytime to verify in logs whether is coming as empty or not.
      this.telemetry.sendTelemetryEvent("dbtCloudParseProjectUserError", {
        error: stderr,
        adapter: this.getAdapterType() || "unknown",
      });
      this.terminal.info(
        "dbtCloudParseProject",
        "dbt cloud cli response",
        false,
        {
          command: command.getCommandAsString(),
          stderr,
        },
      );
      const errorsAndWarnings = stderr
        .trim()
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => Boolean(line))
        .map((line) =>
          this.parseJSON(
            "RebuildManifestErrorsAndWarningsJSONParsing",
            line,
            false,
          ),
        );
      const errors = errorsAndWarnings
        .filter(
          (line) =>
            line &&
            line.hasOwnProperty("info") &&
            line.info.hasOwnProperty("level") &&
            line.info.hasOwnProperty("msg") &&
            ["error", "fatal"].includes(line.info.level),
        )
        .map((line) => line.info.msg);
      const warnings = errorsAndWarnings
        .filter(
          (line) =>
            line &&
            line.hasOwnProperty("info") &&
            line.info.hasOwnProperty("level") &&
            line.info.hasOwnProperty("msg") &&
            line.info.level === "warn",
        )
        .map((line) => line.info.msg);
      this.rebuildManifestDiagnostics.clear();
      const diagnostics: Array<Diagnostic> = errors
        .map(
          (error) =>
            new Diagnostic(
              new Range(0, 0, 999, 999),
              error,
              DiagnosticSeverity.Error,
            ),
        )
        .concat(
          warnings.map(
            (warning) =>
              new Diagnostic(
                new Range(0, 0, 999, 999),
                warning,
                DiagnosticSeverity.Warning,
              ),
          ),
        );
      if (diagnostics) {
        // user error
        this.rebuildManifestDiagnostics.set(
          Uri.joinPath(this.projectRoot, DBTProject.DBT_PROJECT_FILE),
          diagnostics,
        );
      }
    } catch (error) {
      this.telemetry.sendTelemetryError(
        "dbtCloudCannotParseProjectCommandExecuteError",
        error,
        {
          adapter: this.getAdapterType() || "unknown",
          command: command.getCommandAsString(),
        },
      );
      this.rebuildManifestDiagnostics.set(
        Uri.joinPath(this.projectRoot, DBTProject.DBT_PROJECT_FILE),
        [
          new Diagnostic(
            new Range(0, 0, 999, 999),
            "Unable to parse dbt cloud cli response. If the problem persists please reach out to us: " +
              error,
            DiagnosticSeverity.Error,
          ),
        ],
      );
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
      await this.addDeferParams(this.dbtCloudCommand(command)),
    );
  }

  async generateDocs(command: DBTCommand) {
    this.addCommandToQueue(
      DBTCloudProjectIntegration.QUEUE_ALL,
      this.dbtCloudCommand(command),
    );
  }

  async executeCommandImmediately(command: DBTCommand) {
    return await this.dbtCloudCommand(command).execute();
  }

  async deps(command: DBTCommand): Promise<string> {
    throw new Error("dbt deps is not supported in dbt cloud");
  }

  async debug(command: DBTCommand): Promise<string> {
    command.args = ["environment", "show"];
    const { stdout, stderr } = await this.dbtCloudCommand(command).execute();
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
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
    command.addArgument("--source");
    command.addArgument("dbt-power-user");
    const currentVersion = this.getVersion()
      .map((part) => new String(part))
      .join(".");
    const downloadArtifactsVersion = "0.37.20";
    if (semver.gte(currentVersion, downloadArtifactsVersion)) {
      if (command.downloadArtifacts) {
        command.addArgument("--download-artifacts");
      }
    }
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
  async unsafeCompileNode(modelName: string): Promise<string> {
    this.throwIfNotAuthenticated();
    this.throwBridgeErrorIfAvailable();
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
    const { stdout, stderr } = await compileQueryCommand.execute();
    const compiledLine = stdout
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line.trim()))
      .filter((line) => line.data.hasOwnProperty("compiled"));
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return compiledLine[0].data.compiled;
  }

  async unsafeCompileQuery(query: string): Promise<string> {
    this.throwIfNotAuthenticated();
    this.throwBridgeErrorIfAvailable();
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
    const { stdout, stderr } = await compileQueryCommand.execute();
    const compiledLine = stdout
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line.trim()))
      .filter((line) => line.data.hasOwnProperty("compiled"));
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return compiledLine[0].data.compiled;
  }

  async validateSql(
    query: string,
    dialect: string,
    models: any,
  ): Promise<ValidateSqlParseErrorResponse> {
    this.throwIfNotAuthenticated();
    this.throwBridgeErrorIfAvailable();
    const result = await this.python?.lock<ValidateSqlParseErrorResponse>(
      (python) =>
        python!`to_dict(validate_sql(${query}, ${dialect}, ${models}))`,
    );
    return result;
  }

  async validateSQLDryRun(query: string): Promise<{ bytes_processed: string }> {
    this.throwIfNotAuthenticated();
    this.throwBridgeErrorIfAvailable();
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
    const { stdout, stderr } = await validateSqlCommand.execute();
    const compiledLine = stdout
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line.trim()))
      .filter((line) => line.data.hasOwnProperty("compiled"));
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return JSON.parse(compiledLine[0].data.compiled);
  }

  async getColumnsOfSource(
    sourceName: string,
    tableName: string,
  ): Promise<DBColumn[]> {
    this.throwIfNotAuthenticated();
    this.throwBridgeErrorIfAvailable();
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
    const { stdout, stderr } = await compileQueryCommand.execute();
    const compiledLine = stdout
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line.trim()))
      .filter((line) => line.data.hasOwnProperty("compiled"));
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return JSON.parse(compiledLine[0].data.compiled);
  }

  async getColumnsOfModel(modelName: string): Promise<DBColumn[]> {
    this.throwIfNotAuthenticated();
    this.throwBridgeErrorIfAvailable();
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
    const { stdout, stderr } = await compileQueryCommand.execute();
    const compiledLine = stdout
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line.trim()))
      .filter((line) => line.data.hasOwnProperty("compiled"));
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return JSON.parse(compiledLine[0].data.compiled);
  }

  async validateWhetherSqlHasColumns(
    sql: string,
    dialect: string,
  ): Promise<boolean> {
    this.throwBridgeErrorIfAvailable();
    return this.python?.lock<boolean>(
      (python) =>
        python!`to_dict(validate_whether_sql_has_columns(${sql}, ${dialect}))`,
    );
  }

  async fetchSqlglotSchema(sql: string, dialect: string): Promise<string[]> {
    this.throwBridgeErrorIfAvailable();
    return this.python?.lock<string[]>(
      (python) => python!`to_dict(fetch_schema_from_sql(${sql}, ${dialect}))`,
    );
  }

  async getBulkCompiledSQL(models: NodeMetaData[]) {
    const downloadArtifactsVersion = "0.37.20";
    const currentVersion = this.getVersion()
      .map((part) => new String(part))
      .join(".");
    if (semver.gte(currentVersion, downloadArtifactsVersion)) {
      const compileQueryCommand = this.dbtCloudCommand(
        new DBTCommand("Getting catalog...", [
          "compile",
          "--download-artifacts",
          "--model",
          `"${models.map((item) => item.name).join(" ")}"`,
          "--output",
          "json",
          "--log-format",
          "json",
        ]),
      );
      const { stderr } = await compileQueryCommand.execute(
        new CancellationTokenSource().token,
      );
      const exception = this.processJSONErrors(stderr);
      if (exception) {
        throw exception;
      }
    }
    const result: Record<string, string> = {};
    for (const node of models) {
      try {
        // compiled sql file exists
        const fileContentBytes = await workspace.fs.readFile(
          Uri.file(node.compiled_path),
        );
        const query = fileContentBytes.toString();
        result[node.uniqueId] = query;
        continue;
      } catch (e) {
        this.terminal.error(
          "getBulkCompiledSQL",
          `Unable to find compiled sql file for model ${node.uniqueId}`,
          e,
          true,
        );
      }

      try {
        // compiled sql file doesn't exists or dbt below 0.37.20
        result[node.uniqueId] = await this.unsafeCompileNode(node.name);
      } catch (e) {
        this.terminal.error(
          "getBulkCompiledSQL",
          `Unable to compile sql for model ${node.uniqueId}`,
          e,
          true,
        );
      }
    }
    return result;
  }

  async getBulkSchemaFromDB(
    nodes: DBTNode[],
    cancellationToken: CancellationToken,
  ): Promise<Record<string, DBColumn[]>> {
    if (nodes.length === 0) {
      return {};
    }
    this.throwIfNotAuthenticated();
    this.throwBridgeErrorIfAvailable();
    const bulkModelQuery = `
{% set result = {} %}
{% for n in ${JSON.stringify(nodes)} %}
  {% set columns = adapter.get_columns_in_relation(ref(n["name"])) %}
  {% set new_columns = [] %}
  {% for column in columns %}
    {% do new_columns.append({"column": column.name, "dtype": column.dtype}) %}
  {% endfor %}
  {% do result.update({n["unique_id"]:new_columns}) %}
{% endfor %}
{% for n in graph.sources.values() %}
  {% set columns = adapter.get_columns_in_relation(source(n["source_name"], n["identifier"])) %}
  {% set new_columns = [] %}
  {% for column in columns %}
    {% do new_columns.append({"column": column.name, "dtype": column.dtype}) %}
  {% endfor %}
  {% do result.update({n["unique_id"]:new_columns}) %}
{% endfor %}
{{ tojson(result) }}`;
    console.log(bulkModelQuery);
    const compileQueryCommand = this.dbtCloudCommand(
      new DBTCommand("Getting catalog...", [
        "compile",
        "--inline",
        bulkModelQuery.trim().split("\n").join(""),
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    const { stdout, stderr } =
      await compileQueryCommand.execute(cancellationToken);
    const compiledLine = stdout
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line.trim()))
      .filter((line) => line.data.hasOwnProperty("compiled"));
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return JSON.parse(compiledLine[0].data.compiled);
  }

  async getCatalog(): Promise<Catalog> {
    this.throwIfNotAuthenticated();
    this.throwBridgeErrorIfAvailable();
    const bulkModelQuery = `
{% set result = [] %}
{% for n in graph.nodes.values() %}
  {% if n.resource_type == "test" or 
  n.resource_type == "analysis" or 
  n.resource_type == "sql_operation" or 
  n.config.materialized == "ephemeral" %}
    {% continue %}
  {% endif %}
  {% set columns = adapter.get_columns_in_relation(ref(n["name"])) %}
  {% for column in columns %}
    {% do result.append({
      "table_database": n.database,
      "table_schema": n.schema,
      "table_name": n.name,
      "column_name": column.name,
      "column_type": column.dtype,
    }) %}
  {% endfor %}
{% endfor %}
{% for n in graph.sources.values() %}
  {% set columns = adapter.get_columns_in_relation(source(n["source_name"], n["identifier"])) %}
  {% for column in columns %}
    {% do result.append({
      "table_database": n.database,
      "table_schema": n.schema,
      "table_name": n.name,
      "column_name": column.name,
      "column_type": column.dtype,
    }) %}
  {% endfor %}
{% endfor %}
{{ tojson(result) }}`;

    const compileQueryCommand = this.dbtCloudCommand(
      new DBTCommand("Getting catalog...", [
        "compile",
        "--inline",
        bulkModelQuery.trim().split("\n").join(""),
        "--output",
        "json",
        "--log-format",
        "json",
      ]),
    );
    const { stdout, stderr } = await compileQueryCommand.execute();
    const compiledLine = stdout
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line.trim()))
      .filter((line) => line.data.hasOwnProperty("compiled"));
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    const result: Catalog = JSON.parse(compiledLine[0].data.compiled);
    return result;
  }

  getDebounceForRebuildManifest() {
    return 500;
  }

  // get dbt config
  private async initializePaths() {
    const packagePathsCommand = this.dbtCloudCommand(
      new DBTCommand("Getting paths...", [
        "environment",
        "show",
        "--project-paths",
      ]),
    );
    try {
      const { stdout, stderr } = await packagePathsCommand.execute();
      if (stderr) {
        this.terminal.warn(
          "DbtCloudIntegrationInitializePathsStdError",
          "packaging paths command returns warning, ignoring",
          true,
          stderr,
        );
      }
      const lookupEntries = (lookupString: string) => {
        const regexString = `${lookupString}\\s*\\[(.*)\\]`;
        const regexp = new RegExp(regexString, "gm");
        const matches = regexp.exec(stdout);
        if (matches?.length === 2) {
          return matches[1].split(",").map((m) => m.slice(1, -1));
        }
        throw new Error(`Could not find any entries for ${lookupString}`);
      };
      this.targetPath = join(this.projectRoot.fsPath, "target");
      this.modelPaths = lookupEntries("Model paths").map((p) =>
        join(this.projectRoot.fsPath, p),
      );
      this.seedPaths = lookupEntries("Seed paths").map((p) =>
        join(this.projectRoot.fsPath, p),
      );
      this.macroPaths = lookupEntries("Macro paths").map((p) =>
        join(this.projectRoot.fsPath, p),
      );
      this.packagesInstallPath = join(this.projectRoot.fsPath, "dbt_packages");
    } catch (error) {
      this.terminal.warn(
        "DbtCloudIntegrationInitializePathsExceptionError",
        "adapter type throws error, ignoring",
        true,
        error,
      );
      this.targetPath = join(this.projectRoot.fsPath, "target");
      this.modelPaths = [join(this.projectRoot.fsPath, "models")];
      this.seedPaths = [join(this.projectRoot.fsPath, "seeds")];
      this.macroPaths = [join(this.projectRoot.fsPath, "macros")];
      this.packagesInstallPath = join(this.projectRoot.fsPath, "dbt_packages");
    }
  }

  private async findAdapterType() {
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
      const { stdout, stderr } = await adapterTypeCommand.execute();
      if (stderr) {
        this.terminal.warn(
          "DbtCloudIntegrationAdapterDetectionStdError",
          "adapter type returns stderr, ignoring",
          true,
          stderr,
        );
      }
      const compiledLine = stdout
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line.trim()))
        .filter((line) => line.data.hasOwnProperty("compiled"));
      this.adapterType = compiledLine[0].data.compiled;
      this.terminal.debug(
        "dbtCloudIntegration",
        `Set adapter type to ${this.adapterType}`,
      );
    } catch (error) {
      this.terminal.warn(
        "DbtCloudIntegrationAdapterDetectionExceptionError",
        "adapter type throws error, ignoring",
        true,
        error,
      );
    }
  }

  private async findVersion() {
    try {
      const versionCommand = this.dbtCloudCommand(
        new DBTCommand("Getting version...", ["--version"]),
      );
      const { stdout } = await versionCommand.execute();
      if (stdout.includes("dbt Cloud CLI")) {
        const regex = /dbt Cloud CLI - (\d*\.\d*\.\d*)/gm;
        const matches = regex.exec(stdout);
        if (matches?.length === 2) {
          this.version = matches[1].split(".").map((part) => parseInt(part));
        } else {
          this.terminal.debug(
            "DBTCLIDetectionFailed",
            "dbt cloud cli was not found. Detection command returned :  " +
              stdout,
          );
        }
      }
    } catch (error) {
      this.terminal.warn(
        "findVersion",
        "Version lookup failed with error : " + (error as Error).message,
      );
    }
  }

  private processJSONErrors(jsonErrors: string) {
    if (!jsonErrors) {
      return;
    }
    try {
      const errorLines: string[] = [];
      // eslint-disable-next-line prefer-spread
      errorLines.push.apply(
        errorLines,
        jsonErrors
          .trim()
          .split("\n")
          .map((line) => JSON.parse(line.trim()))
          .filter(
            (line) =>
              line.info.level === "error" || line.info.level === "fatal",
          )
          .map((line) => line.info.msg),
      );
      if (errorLines.length) {
        return new Error(errorLines.join(", "));
      }
    } catch (error) {
      // ideally we never come here, this is a bug in our code
      return new Error("Could not process " + jsonErrors + ": " + error);
    }
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

  findPackageVersion(_packageName: string) {
    return undefined;
  }

  private throwBridgeErrorIfAvailable() {
    const allDiagnostics: DiagnosticCollection[] = [
      this.pythonBridgeDiagnostics,
      this.rebuildManifestDiagnostics,
    ];

    for (const diagnosticCollection of allDiagnostics) {
      for (const [_, diagnostics] of diagnosticCollection) {
        const error = diagnostics.find(
          (diagnostic) => diagnostic.severity === DiagnosticSeverity.Error,
        );
        if (error) {
          throw new Error(error.message);
        }
      }
    }
  }

  async performDatapilotHealthcheck({
    manifestPath,
    catalogPath,
    config,
    configPath,
  }: HealthcheckArgs): Promise<ProjectHealthcheck> {
    this.throwBridgeErrorIfAvailable();
    const result = await this.python?.lock<ProjectHealthcheck>(
      (python) =>
        python!`to_dict(project_healthcheck(${manifestPath}, ${catalogPath}, ${configPath}, ${config}))`,
    );
    return result;
  }

  async applyDeferConfig(): Promise<void> {}

  throwDiagnosticsErrorIfAvailable(): void {
    this.throwBridgeErrorIfAvailable();
  }

  private parseJSON(
    contextName: string,
    json: string,
    throw_: boolean = true,
  ): any {
    try {
      return JSON.parse(json);
    } catch (error) {
      this.terminal.error(
        "dbtCloud" + contextName + "Error",
        "An error occured while parsing following json: " + json,
        error,
      );
      if (throw_) {
        throw error;
      }
    }
  }
}
