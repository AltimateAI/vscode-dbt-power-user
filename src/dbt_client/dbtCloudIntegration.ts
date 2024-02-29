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
      const output = await checkDBTInstalledProcess.complete();
      if (output.includes("dbt Cloud CLI")) {
        this.terminal.debug("DBTCLIDetectionSuccess", "dbt cloud cli detected");
        return true;
      } else {
        this.terminal.debug(
          "DBTCLIDetectionFailed",
          "dbt cloud cli was not found. Detection command returned :  " +
            output,
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
  async discoverProjects(projectDirectories: Uri[]): Promise<Uri[]> {
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
    private altimate: AltimateRequest,
    private telemetry: TelemetryService,
    private pythonEnvironment: PythonEnvironment,
    private terminal: DBTTerminal,
    private projectRoot: Uri,
    private dbtTerminal: DBTTerminal,
  ) {
    this.python = this.executionInfrastructure.createPythonBridge(
      this.projectRoot.fsPath,
    );
    this.executionInfrastructure.createQueue(
      DBTCloudProjectIntegration.QUEUE_ALL,
    );
    this.terminal.log("Registering dbt cloud project" + this.projectRoot);

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
          throw new Error(JSON.parse((error as string).trim()).info.msg);
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
    this.altimate.handlePreviewFeatures();
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
      const exception = (error as string).replace(/^.*?\n/, "");
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

  private async getDeferParams(projectRoot: Uri): Promise<string[]> {
    // validate credentials and if not valid run without defer params
    const config = this.altimate.getConfig();
    if (!config?.key || !config?.instance) {
      // only validate when both are set
      window.showErrorMessage(
        "Cannot run with defer to prod set up as Auth tokens are invalid",
      );
      throw new Error("Missing Altimate instance name and key in settings.");
    }

    const validation = await this.altimate.validateCredentials(
      config.instance,
      config.key,
    );

    if (!validation?.ok) {
      window.showErrorMessage(
        "Cannot run with defer to prod set up as Auth tokens are invalid",
      );
      throw new Error("Invalid Altimate instance name and key in settings.");
    }

    // https://docs.getdbt.com/docs/cloud/about-cloud-develop-defer#defer-in-dbt-cloud-cli
    // For dbt cloud, defer is enabled by default. We need to send flag only if it is disabled
    const currentConfig: Record<string, DeferConfig> = await workspace
      .getConfiguration("dbt", window.activeTextEditor?.document.uri)
      .get("deferConfigPerProject", {});

    const deferConfigInProject =
      currentConfig[getProjectRelativePath(projectRoot)];

    if (!deferConfigInProject) {
      this.dbtTerminal.debug("defer", "defer params not set");
      return [];
    }
    const { deferToProduction, favorState } = deferConfigInProject;
    // explicitly checking false to make sure defer is disabled
    if (deferToProduction === false) {
      this.dbtTerminal.debug("defer", "defer to prod not enabled");
      return ["--no-defer"];
    }
    if (favorState) {
      return ["--favor-state"];
    }

    return [];
  }

  private async addDeferParams(command: DBTCommand) {
    const deferParams = await this.getDeferParams(this.projectRoot);
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
    this.executionInfrastructure.addCommandToQueue(queueName, command);
  }

  // internal commands
  async unsafeCompileNode(modelName: string): Promise<string | undefined> {
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
      throw new Error(JSON.parse((error as string).trim()).data.exc);
    }
  }

  async unsafeCompileQuery(query: string): Promise<string | undefined> {
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
      throw new Error(JSON.parse((error as string).trim()).data.exc);
    }
  }

  async validateSql(
    query: string,
    dialect: string,
    models: any,
  ): Promise<ValidateSqlParseErrorResponse> {
    const result = await this.python?.lock<ValidateSqlParseErrorResponse>(
      (python) =>
        python!`to_dict(validate_sql(${query}, ${dialect}, ${models}))`,
    );
    return result;
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
    try {
      const output = await validateSqlCommand.execute();
      const compiledLine = output
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line.trim()))
        .filter((line) => line.data.hasOwnProperty("compiled"));
      return JSON.parse(compiledLine[0].data.compiled);
    } catch (error) {
      throw new Error(JSON.parse((error as string).trim()).data.exc);
    }
  }

  async getColumnsOfSource(
    sourceName: string,
    tableName: string,
  ): Promise<{ [key: string]: string }[]> {
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
      throw new Error(JSON.parse((error as string).trim()).data.exc);
    }
  }

  async getColumnsOfModel(
    modelName: string,
  ): Promise<{ [key: string]: string }[]> {
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
      throw new Error(JSON.parse((error as string).trim()).data.exc);
    }
  }

  async getCatalog(): Promise<{ [key: string]: string }[]> {
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
      throw new Error(JSON.parse((error as string).trim()).data.exc);
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
      throw new Error(JSON.parse((error as string).trim()).info.msg);
    }
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
