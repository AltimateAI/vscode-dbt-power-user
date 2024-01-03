import {
  Diagnostic,
  Disposable,
  languages,
  Range,
  RelativePattern,
  Uri,
  window,
  workspace,
} from "vscode";
import * as os from "os";
import {
  extendErrorWithSupportLinks,
  provideSingleton,
  setupWatcherHandler,
  substituteSettingsVariables,
} from "../utils";
import {
  CompilationResult,
  DBTCommand,
  DBTCommandExecutionInfrastructure,
  DBTDetection,
  DBTProjectIntegration,
  ExecuteSQLResult,
  PythonDBTCommandExecutionStrategy,
  PythonDBTCommandImmediateExecutionStrategy,
} from "./dbtIntegration";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { PythonBridge, PythonException } from "python-bridge";
import * as path from "path";
import { DBTProject } from "../manifest/dbtProject";
import { existsSync } from "fs";
import { join } from "path";
import { TelemetryService } from "../telemetry";
import { ValidateSqlParseErrorResponse } from "../altimate";

// TODO: we shouold really get these from manifest directly
interface ResolveReferenceNodeResult {
  database: string;
  schema: string;
  alias: string;
}

interface ResolveReferenceSourceResult {
  database: string;
  schema: string;
  alias: string;
  resource_type: string;
  identifier: string;
}

@provideSingleton(DBTCoreDetection)
export class DBTCoreDetection implements DBTDetection {
  constructor(
    private pythonEnvironment: PythonEnvironment,
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
  ) {}

  async detectDBT(): Promise<boolean> {
    try {
      const checkDBTInstalledProcess =
        this.commandProcessExecutionFactory.createCommandProcessExecution({
          command: this.pythonEnvironment.pythonPath,
          args: ["-c", "import dbt"],
          cwd: this.getFirstWorkspacePath(),
          envVars: this.pythonEnvironment.environmentVariables,
        });
      await checkDBTInstalledProcess.complete();
      return true;
    } catch (error) {
      return false;
    }
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

@provideSingleton(DBTCoreProjectIntegration)
export class DBTCoreProjectIntegration
  implements DBTProjectIntegration, Disposable
{
  static DBT_PROFILES_FILE = "profiles.yml";

  private targetPath?: string;
  private adapterType: string = "unknown";
  private packagesInstallPath?: string;
  private modelPaths?: string[];
  private macroPaths?: string[];
  private python: PythonBridge;
  private dbtProfilesDir: string;
  private disposables: Disposable[] = [];
  private readonly rebuildManifestDiagnostics =
    languages.createDiagnosticCollection("dbt");
  private readonly pythonBridgeDiagnostics =
    languages.createDiagnosticCollection("dbt");

  constructor(
    private executionInfrastructure: DBTCommandExecutionInfrastructure,
    private pythonEnvironment: PythonEnvironment,
    private telemetry: TelemetryService,
    private pythonDBTCommandExecutionStrategy: PythonDBTCommandExecutionStrategy,
    private pythonDBTCommandImmediateExecutionStrategy: PythonDBTCommandImmediateExecutionStrategy,
    private projectRoot: Uri,
  ) {
    this.python = this.executionInfrastructure.createPythonBridge(
      this.projectRoot.fsPath,
    );
    const profileExistsInProjectRoot = existsSync(
      join(this.projectRoot.fsPath, "profiles.yml"),
    );
    const profilesDirOverrideSetting = workspace
      .getConfiguration("dbt")
      .get<string>("profilesDirOverride");
    this.dbtProfilesDir =
      (profilesDirOverrideSetting
        ? substituteSettingsVariables(profilesDirOverrideSetting)
        : false) ||
      (profileExistsInProjectRoot ? this.projectRoot.fsPath : false) ||
      this.pythonEnvironment.environmentVariables.DBT_PROFILES_DIR ||
      join(os.homedir(), ".dbt");
    this.dbtProfilesDir = this.dbtProfilesDir.replace("~", os.homedir());
    // remove the trailing slashes if they exists,
    // causes the quote to be escaped when passing to python
    this.dbtProfilesDir = this.dbtProfilesDir.replace(/\\+$/, "");

    console.log(
      `Registering project ${this.projectRoot} with profile directory ${this.dbtProfilesDir}`,
    );

    this.disposables.push(
      this.rebuildManifestDiagnostics,
      this.pythonBridgeDiagnostics,
    );
  }

  async refreshProjectConfig(): Promise<void> {
    await this.initializePaths();
  }

  executeSQL(query: string): Promise<ExecuteSQLResult> {
    return this.python!.lock<ExecuteSQLResult>(
      (python) => python`to_dict(project.execute_sql(${query}))`,
    );
  }

  async initializeProject(): Promise<void> {
    const dbtProfileWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(
        this.dbtProfilesDir,
        DBTCoreProjectIntegration.DBT_PROFILES_FILE,
      ),
    );
    try {
      await this.python.ex`from dbt_integration import *`;
      await this.python
        .ex`project = DbtProject(project_dir=${this.projectRoot.fsPath}, profiles_dir=${this.dbtProfilesDir})`;
      await this.initializePaths();
      this.pythonBridgeDiagnostics.clear();
      await this.rebuildManifest(true);
    } catch (exc: any) {
      if (exc instanceof PythonException) {
        // python errors can be about anything, so we just associate the error with the project file
        //  with a fixed range
        let errorMessage =
          "An error occured while initializing the dbt project, probably the Python interpreter is not correctly setup: " +
          exc.exception.message;
        if (exc.exception.type.module === "dbt.exceptions") {
          // TODO: we can do provide solutions per type of dbt exception
          errorMessage =
            "An error occured while initializing the dbt project, dbt found following issue: " +
            exc.exception.message;
        }
        this.pythonBridgeDiagnostics.set(
          Uri.joinPath(this.projectRoot, DBTProject.DBT_PROJECT_FILE),
          [new Diagnostic(new Range(0, 0, 999, 999), errorMessage)],
        );
        this.telemetry.sendTelemetryError("pythonBridgeInitPythonError", exc);
      } else {
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            "An unexpected error occured while initializing the dbt project: " +
              exc +
              ".",
          ),
        );
        this.telemetry.sendTelemetryError("pythonBridgeInitError", exc);
      }
    }
    this.disposables.push(
      // when the project config changes we need to re-init the dbt project
      ...setupWatcherHandler(dbtProfileWatcher, () =>
        this.rebuildManifest(true),
      ),
    );
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

  async findAdapterType(): Promise<string | undefined> {
    return this.python.lock<string>(
      (python) => python`project.config.credentials.type`,
    );
  }

  async rebuildManifest(init: boolean): Promise<void> {
    try {
      await this.python.lock(
        (python) => python`to_dict(project.safe_parse_project(${init}))`,
      );
      if (init) {
        this.adapterType = (await this.findAdapterType()) || "unknown";
      }
      this.rebuildManifestDiagnostics.clear();
    } catch (exc) {
      if (exc instanceof PythonException) {
        // dbt errors can be about anything, so we just associate the error with the project file
        //  with a fixed range
        this.rebuildManifestDiagnostics.set(
          Uri.joinPath(this.projectRoot, DBTProject.DBT_PROJECT_FILE),
          [
            new Diagnostic(
              new Range(0, 0, 999, 999),
              "There is a problem in your dbt project. Compilation failed: " +
                exc.exception.message,
            ),
          ],
        );
        this.telemetry.sendTelemetryEvent(
          "pythonBridgeCannotParseProjectUserError",
          {
            error: exc.exception.message,
            adapter: this.adapterType,
          },
        );
        return;
      }
      // if we get here, it is not a dbt error but an extension error.
      this.telemetry.sendTelemetryError(
        "pythonBridgeCannotParseProjectUnknownError",
        exc,
        {
          adapter: this.adapterType,
        },
      );
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "An error occured while rebuilding the dbt manifest: " + exc + ".",
        ),
      );
    }
  }

  async findVersion(): Promise<number[]> {
    return this.python?.lock<number[]>(
      (python) => python!`to_dict(project.get_dbt_version())`,
    );
  }

  runModel(command: DBTCommand<string>) {
    return this.dbtCoreCommand(command).execute();
  }
  buildModel(command: DBTCommand<string>) {
    return this.dbtCoreCommand(command).execute();
  }

  runTest(command: DBTCommand<string>) {
    return this.dbtCoreCommand(command).execute();
  }

  runModelTest(command: DBTCommand<string>) {
    return this.dbtCoreCommand(command).execute();
  }
  compileModel(command: DBTCommand<string>) {
    return this.dbtCoreCommand(command).execute();
  }

  generateDocs(command: DBTCommand<string>) {
    return this.dbtCoreCommand(command).execute();
  }
  deps(command: DBTCommand<string>) {
    return this.dbtCoreCommand(command).execute();
  }

  debug(command: DBTCommand<string>) {
    return this.dbtCoreCommand(command).execute();
  }

  private dbtCoreCommand(command: DBTCommand<string>) {
    command.addArgument("--profiles-dir");
    command.addArgument(this.dbtProfilesDir);
    command.addArgument("--project-dir");
    command.addArgument(this.projectRoot.fsPath);
    command.setExecutionStrategy(
      this.pythonDBTCommandImmediateExecutionStrategy,
    );
    return command;
  }

  // internal commands
  async unsafeCompileNode(modelName: string): Promise<string | undefined> {
    const output = await this.python?.lock<CompilationResult>(
      (python) =>
        python!`to_dict(project.compile_node(project.get_ref_node(${modelName})))`,
    );
    return output.compiled_sql;
  }

  async unsafeCompileQuery(query: string): Promise<string | undefined> {
    const output = await this.python?.lock<CompilationResult>(
      (python) => python!`to_dict(project.compile_sql(${query}))`,
    );
    return output.compiled_sql;
  }

  async validateSql(query: string, dialect: string, models: any) {
    const result = await this.python?.lock<ValidateSqlParseErrorResponse>(
      (python) =>
        python!`to_dict(validate_sql(${query}, ${dialect}, ${models}))`,
    );
    return result;
  }

  async validateSQLDryRun(query: string) {
    const result = await this.python?.lock<{ bytes_processed: string }>(
      (python) => python!`to_dict(project.validate_sql_dry_run(${query}))`,
    );
    return result;
  }

  async getColumnsOfModel(modelName: string) {
    // Get database and schema
    const node = (await this.python?.lock(
      (python) => python!`to_dict(project.get_ref_node(${modelName}))`,
    )) as ResolveReferenceNodeResult;
    // Get columns
    if (!node) {
      return [];
    }
    return this.getColumsOfRelation(
      node.database,
      node.schema,
      node.alias || modelName,
    );
  }

  async getColumnsOfSource(sourceName: string, tableName: string) {
    // Get database and schema
    const node = (await this.python?.lock(
      (python) =>
        python!`to_dict(project.get_source_node(${sourceName}, ${tableName}))`,
    )) as ResolveReferenceSourceResult;
    // Get columns
    if (!node) {
      return [];
    }
    return this.getColumsOfRelation(
      node.database,
      node.schema,
      node.identifier,
    );
  }

  private async getColumsOfRelation(
    database: string | undefined,
    schema: string | undefined,
    objectName: string,
  ) {
    return this.python?.lock<{ [key: string]: string }[]>(
      (python) =>
        python!`to_dict(project.get_columns_in_relation(project.create_relation(${database}, ${schema}, ${objectName})))`,
    );
  }

  async getCatalog() {
    return await this.python?.lock<{ [key: string]: string }[]>(
      (python) => python!`to_dict(project.get_catalog())`,
    );
  }

  // get dbt config
  private async findModelPaths(): Promise<string[]> {
    let modelPaths = await this.python.lock(
      (python) => python`to_dict(project.config.model_paths)`,
    );
    modelPaths = modelPaths.map((modelPath: string) => {
      if (!path.isAbsolute(modelPath)) {
        return path.join(this.projectRoot.fsPath, modelPath);
      }
      return modelPath;
    });
    return modelPaths;
  }

  private async findMacroPaths(): Promise<string[]> {
    let macroPaths = await this.python.lock(
      (python) => python`to_dict(project.config.macro_paths)`,
    );
    macroPaths = macroPaths.map((macroPath: string) => {
      if (!path.isAbsolute(macroPath)) {
        return path.join(this.projectRoot.fsPath, macroPath);
      }
      return macroPath;
    });
    return macroPaths;
  }

  private async findTargetPath(): Promise<string> {
    let targetPath = await this.python.lock(
      (python) => python`to_dict(project.config.target_path)`,
    );
    if (!path.isAbsolute(targetPath)) {
      targetPath = path.join(this.projectRoot.fsPath, targetPath);
    }
    return targetPath;
  }

  private async findPackagesInstallPath(): Promise<string> {
    let packageInstallPath = await this.python.lock(
      (python) => python`to_dict(project.config.packages_install_path)`,
    );
    if (!path.isAbsolute(packageInstallPath)) {
      packageInstallPath = path.join(
        this.projectRoot.fsPath,
        packageInstallPath,
      );
    }
    return packageInstallPath;
  }

  private async initializePaths() {
    this.targetPath = await this.findTargetPath();
    this.modelPaths = await this.findModelPaths();
    this.macroPaths = await this.findMacroPaths();
    this.packagesInstallPath = await this.findPackagesInstallPath();
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
