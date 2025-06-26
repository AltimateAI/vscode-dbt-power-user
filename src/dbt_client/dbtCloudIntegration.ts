import { DBTDiagnosticData, DBTDiagnosticResult } from "./diagnostics";
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
  DBT_PROJECT_FILE,
  DeferConfig,
  readAndParseProjectConfig,
} from "./dbtIntegration";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { PythonBridge } from "python-bridge";
import { join, dirname } from "path";
import path = require("path");
import { DBTTerminal } from "./terminal";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { existsSync, readFileSync } from "fs";
import semver = require("semver");
import { NodeMetaData } from "../domain";
import * as crypto from "crypto";
import { parse } from "yaml";
import { window } from "vscode";

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

export class DBTCloudDetection implements DBTDetection {
  constructor(
    protected commandProcessExecutionFactory: CommandProcessExecutionFactory,
    protected pythonEnvironment: PythonEnvironment,
    protected terminal: DBTTerminal,
  ) {}

  async detectDBT(): Promise<boolean> {
    const dbtPath = getDBTPath(this.pythonEnvironment, this.terminal);
    try {
      this.terminal.debug("DBTCLIDetection", "Detecting dbt cloud cli");
      const checkDBTInstalledProcess =
        this.commandProcessExecutionFactory.createCommandProcessExecution({
          command: dbtPath,
          args: ["--version"],
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
}

export class DBTCloudProjectDetection implements DBTProjectDetection {
  async discoverProjects(projectDirectories: string[]): Promise<string[]> {
    const packagesInstallPaths = projectDirectories.map((projectDirectory) =>
      path.join(projectDirectory, "dbt_packages"),
    );
    const filteredProjectFiles = projectDirectories.filter((projectPath) => {
      return !packagesInstallPaths.some((packageInstallPath) => {
        return projectPath.startsWith(packageInstallPath!);
      });
    });
    return filteredProjectFiles;
  }
}

export class DBTCloudProjectIntegration implements DBTProjectIntegration {
  protected targetPath?: string;
  private version: number[] | undefined;
  protected projectName: string = "unknown_" + crypto.randomUUID();
  private adapterType: string = "unknown";
  protected packagesInstallPath?: string;
  protected modelPaths?: string[];
  protected seedPaths?: string[];
  protected macroPaths?: string[];
  private python: PythonBridge;
  protected dbtPath: string = "dbt";
  private disposables: {
    dispose: () => any;
  }[] = [];
  protected pythonBridgeDiagnosticsData: DBTDiagnosticData[] = [];
  protected rebuildManifestDiagnosticsData: DBTDiagnosticData[] = [];
  protected rebuildManifestAbortController: AbortController | undefined;
  private pathsInitialized = false;

  constructor(
    private executionInfrastructure: DBTCommandExecutionInfrastructure,
    protected dbtCommandFactory: DBTCommandFactory,
    protected cliDBTCommandExecutionStrategyFactory: (
      path: string,
      dbtPath: string,
    ) => DBTCommandExecutionStrategy,
    private pythonEnvironment: PythonEnvironment,
    protected terminal: DBTTerminal,
    protected projectRoot: string,
    private projectConfigDiagnostics: DBTDiagnosticData[],
    private deferConfig: DeferConfig | undefined,
  ) {
    this.terminal.debug(
      "DBTCloudProjectIntegration",
      `Registering dbt cloud project at ${this.projectRoot}`,
    );
    this.python = this.executionInfrastructure.createPythonBridge(
      this.projectRoot,
    );

    this.disposables.push(
      this.pythonEnvironment.onPythonEnvironmentChanged(() => {
        this.python = this.executionInfrastructure.createPythonBridge(
          this.projectRoot,
        );
        this.initializeProject();
      }),
    );
  }

  async refreshProjectConfig(): Promise<void> {
    if (!this.pathsInitialized) {
      // First time let,s block
      await this.initializePaths();
      this.pathsInitialized = true;
    } else {
      this.initializePaths();
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
    const abortController = new AbortController();
    showCommand.setSignal(abortController.signal);
    return new QueryExecution(
      async () => {
        abortController.abort();
      },
      async () => {
        const { stdout, stderr } = await showCommand.execute(
          abortController.signal,
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
                ? Object.keys(preview[0]).map(() => "string")
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
    this.dbtPath = getDBTPath(this.pythonEnvironment, this.terminal);
  }

  async setSelectedTarget(_targetName: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getTargetNames(): Promise<Array<string>> {
    throw new Error("Method not implemented.");
  }

  getSelectedTarget(): string | undefined {
    throw new Error("Method not implemented.");
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

  getProjectName(): string {
    return this.projectName;
  }

  getPythonBridgeStatus(): boolean {
    return this.python.connected;
  }

  // Handled by dbt cloud itself
  async cleanupConnections(): Promise<void> {}

  getDiagnostics(): DBTDiagnosticResult {
    return {
      pythonBridgeDiagnostics: this.pythonBridgeDiagnosticsData,
      rebuildManifestDiagnostics: this.rebuildManifestDiagnosticsData,
    };
  }

  async rebuildManifest(): Promise<void> {
    // TODO: check whether we should allow parsing for unauthenticated users
    // this.throwIfNotAuthenticated();
    if (this.rebuildManifestAbortController) {
      this.rebuildManifestAbortController.abort();
      this.rebuildManifestAbortController = undefined;
    }
    const command = this.dbtCloudCommand(
      this.dbtCommandFactory.createParseCommand(),
    );
    command.addArgument("--log-format");
    command.addArgument("json");
    command.downloadArtifacts = true;
    this.rebuildManifestAbortController = new AbortController();
    command.setSignal(this.rebuildManifestAbortController.signal);

    try {
      const result = await command.execute();
      const stderr = result.stderr;
      // sending stderr everytime to verify in logs whether is coming as empty or not.
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
      this.rebuildManifestDiagnosticsData = [];
      const filePath = path.join(this.projectRoot, DBT_PROJECT_FILE);
      const diagnosticDataArray: DBTDiagnosticData[] = [
        ...errors.map((error) => ({
          filePath,
          message: error,
          severity: "error" as const,
          range: { startLine: 0, startColumn: 0, endLine: 999, endColumn: 999 },
          source: "dbt-cloud",
          category: "manifest-rebuild",
        })),
        ...warnings.map((warning) => ({
          filePath,
          message: warning,
          severity: "warning" as const,
          range: { startLine: 0, startColumn: 0, endLine: 999, endColumn: 999 },
          source: "dbt-cloud",
          category: "manifest-rebuild",
        })),
      ];
      this.rebuildManifestDiagnosticsData = diagnosticDataArray;
    } catch (error) {
      this.terminal.error(
        "dbtCloudCannotParseProjectCommandExecuteError",
        "Could not parse project command execution error",
        error,
        true,
        {
          adapter: this.getAdapterType() || "unknown",
          command: command.getCommandAsString(),
        },
      );
      const errorMessage =
        "Unable to parse dbt cloud cli response. If the problem persists please reach out to us: " +
        error;
      const diagnosticData: DBTDiagnosticData = {
        filePath: path.join(this.projectRoot, DBT_PROJECT_FILE),
        message: errorMessage,
        severity: "error",
        range: { startLine: 0, startColumn: 0, endLine: 999, endColumn: 999 },
        source: "dbt-cloud",
        category: "command-execution",
      };
      this.rebuildManifestDiagnosticsData = [diagnosticData];
    }
  }

  async runModel(command: DBTCommand) {
    return await this.addDeferParams(this.dbtCloudCommand(command));
  }

  async buildModel(command: DBTCommand) {
    return await this.addDeferParams(this.dbtCloudCommand(command));
  }

  async buildProject(command: DBTCommand) {
    return await this.addDeferParams(this.dbtCloudCommand(command));
  }

  async runTest(command: DBTCommand) {
    return await this.addDeferParams(this.dbtCloudCommand(command));
  }

  async runModelTest(command: DBTCommand) {
    return await this.addDeferParams(this.dbtCloudCommand(command));
  }

  async compileModel(command: DBTCommand): Promise<DBTCommand | undefined> {
    return await this.addDeferParams(this.dbtCloudCommand(command));
  }

  async generateDocs(command: DBTCommand): Promise<DBTCommand | undefined> {
    return this.dbtCloudCommand(command);
  }

  async clean(command: DBTCommand): Promise<string> {
    const { stdout, stderr } = await this.dbtCloudCommand(command).execute();
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return stdout;
  }

  async executeCommandImmediately(command: DBTCommand) {
    return await this.dbtCloudCommand(command).execute();
  }

  async deps(command: DBTCommand): Promise<string> {
    const { stdout, stderr } = await this.dbtCloudCommand(command).execute();
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
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
    const { deferToProduction } =
      this.deferConfig || this.getDeferConfigDefaults();
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

  protected dbtCloudCommand(command: DBTCommand) {
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

  // internal commands
  async unsafeCompileNode(modelName: string): Promise<string> {
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
      .filter((line) => line.data?.hasOwnProperty("compiled"));
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return compiledLine[0].data.compiled;
  }

  async unsafeCompileQuery(query: string): Promise<string> {
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
      .filter((line) => line.data?.hasOwnProperty("compiled"));
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return compiledLine[0].data.compiled;
  }

  async validateSQLDryRun(query: string): Promise<{ bytes_processed: string }> {
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
      .filter((line) => line.data?.hasOwnProperty("compiled"));
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
      .filter((line) => line.data?.hasOwnProperty("compiled"));
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return JSON.parse(compiledLine[0].data.compiled);
  }

  async getColumnsOfModel(modelName: string): Promise<DBColumn[]> {
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
      .filter((line) => line.data?.hasOwnProperty("compiled"));
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
    return this.python?.lock<boolean>(
      (python) =>
        python!`to_dict(validate_whether_sql_has_columns(${sql}, ${dialect}))`,
    );
  }

  async fetchSqlglotSchema(sql: string, dialect: string): Promise<string[]> {
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
        new AbortController().signal,
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
        const query = readFileSync(node.compiled_path, "utf-8");
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
    signal: AbortSignal,
  ): Promise<Record<string, DBColumn[]>> {
    if (nodes.length === 0) {
      return {};
    }
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
    const { stdout, stderr } = await compileQueryCommand.execute(signal);
    const compiledLine = stdout
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line.trim()))
      .filter((line) => line.data?.hasOwnProperty("compiled"));
    const exception = this.processJSONErrors(stderr);
    if (exception) {
      throw exception;
    }
    return JSON.parse(compiledLine[0].data.compiled);
  }

  async getCatalog(): Promise<Catalog> {
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
        bulkModelQuery,
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
      .filter(
        (line) =>
          line.hasOwnProperty("data") && line.data?.hasOwnProperty("compiled"),
      );
    if (compiledLine.length === 0) {
      throw new Error("Could not get bulk schema from response: " + stdout);
    }
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
  protected async initializePaths() {
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
      const lookupValue = (lookupString: string) => {
        const regexString = `${lookupString}\\s*(.*)`;
        const regexp = new RegExp(regexString, "gm");
        const matches = regexp.exec(stdout);
        if (matches?.length === 2) {
          return matches[1];
        }
        throw new Error(`Could not find any entries for ${lookupString}`);
      };
      const lookupEntries = (lookupString: string) => {
        const regexString = `${lookupString}\\s*\\[(.*)\\]`;
        const regexp = new RegExp(regexString, "gm");
        const matches = regexp.exec(stdout);
        if (matches?.length === 2) {
          return matches[1].split(",").map((m) => m.slice(1, -1));
        }
        throw new Error(`Could not find any entries for ${lookupString}`);
      };
      this.targetPath = join(this.projectRoot, "target");
      this.modelPaths = lookupEntries("Model paths").map((p) =>
        join(this.projectRoot, p),
      );
      this.seedPaths = lookupEntries("Seed paths").map((p) =>
        join(this.projectRoot, p),
      );
      this.macroPaths = lookupEntries("Macro paths").map((p) =>
        join(this.projectRoot, p),
      );
      this.packagesInstallPath = join(this.projectRoot, "dbt_packages");
      this.adapterType = lookupValue("Connection type");
    } catch (error) {
      this.terminal.warn(
        "DbtCloudIntegrationInitializePathsExceptionError",
        "dbt environment show not returning required info, ignoring",
        true,
        error,
      );
      this.targetPath = join(this.projectRoot, "target");
      this.modelPaths = [join(this.projectRoot, "models")];
      this.seedPaths = [join(this.projectRoot, "seeds")];
      this.macroPaths = [join(this.projectRoot, "macros")];
      this.packagesInstallPath = join(this.projectRoot, "dbt_packages");
    }

    try {
      const projectConfig = readAndParseProjectConfig(this.projectRoot);
      this.projectName = projectConfig.name;
    } catch (error) {
      this.terminal.warn(
        "DbtCloudIntegrationProjectNameFromConfigExceptionError",
        "project name could not be read from dbt_project.yml, ignoring",
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

  protected processJSONErrors(jsonErrors: string) {
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

  async dispose() {
    try {
      await this.executionInfrastructure.closePythonBridge(this.python);
    } catch (error) {} // We don't care about errors here.
    this.rebuildManifestDiagnosticsData = [];
    this.pythonBridgeDiagnosticsData = [];
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private getYamlContent(uri: string): string | undefined {
    try {
      return readFileSync(uri, "utf-8");
    } catch (error) {
      this.terminal.error(
        "getYamlContent",
        "Error occured while reading file: " + uri,
        error,
      );
      return undefined;
    }
  }

  findPackageVersion(packageName: string) {
    const packagesYmlPath = path.join(this.projectRoot, "packages.yml");
    const dependenciesYmlPath = path.join(this.projectRoot, "dependencies.yml");

    const fileContents =
      this.getYamlContent(packagesYmlPath) ||
      this.getYamlContent(dependenciesYmlPath);
    if (!fileContents) {
      return undefined;
    }

    const packages = parse(fileContents) as
      | { packages: { package: string; version: string }[] }
      | undefined;
    if (packages?.packages?.length) {
      const packageObject = packages.packages.find(
        (p) => p.package.indexOf(packageName) > -1,
      );
      return packageObject?.version as string;
    }
    return undefined;
  }

  async applyDeferConfig(deferConfig: DeferConfig): Promise<void> {
    this.deferConfig = deferConfig;
  }

  async applySelectedTarget(): Promise<void> {}

  protected parseJSON(
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

  getDeferConfigDefaults(): DeferConfig {
    return {
      deferToProduction: true,
      favorState: false,
      manifestPathForDeferral: null,
    };
  }
}
