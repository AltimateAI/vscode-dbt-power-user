import {
  Diagnostic,
  DiagnosticCollection,
  Disposable,
  languages,
  Range,
  RelativePattern,
  Uri,
  window,
  workspace,
} from "vscode";
import {
  extendErrorWithSupportLinks,
  getFirstWorkspacePath,
  provideSingleton,
  setupWatcherHandler,
} from "../utils";
import {
  CompilationResult,
  DBTCommand,
  DBTCommandExecutionInfrastructure,
  DBTDetection,
  DBTProjectDetection,
  DBTProjectIntegration,
  ExecuteSQLResult,
  PythonDBTCommandExecutionStrategy,
  QueryExecution,
} from "./dbtIntegration";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { PythonBridge, PythonException } from "python-bridge";
import * as path from "path";
import { DBTProject } from "../manifest/dbtProject";
import { TelemetryService } from "../telemetry";
import { ValidateSqlParseErrorResponse } from "../altimate";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { DBTTerminal } from "./dbtTerminal";

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
          cwd: getFirstWorkspacePath(),
          envVars: this.pythonEnvironment.environmentVariables,
        });
      await checkDBTInstalledProcess.complete();
      return true;
    } catch (error) {
      return false;
    }
  }
}

@provideSingleton(DBTCoreProjectDetection)
export class DBTCoreProjectDetection
  implements DBTProjectDetection, Disposable
{
  constructor(
    private executionInfrastructure: DBTCommandExecutionInfrastructure,
    private dbtTerminal: DBTTerminal,
  ) {}

  async discoverProjects(projectDirectories: Uri[]): Promise<Uri[]> {
    let packagesInstallPaths = projectDirectories.map((projectDirectory) =>
      path.join(projectDirectory.fsPath, "dbt_packages"),
    );
    let python: PythonBridge | undefined;
    try {
      python = this.executionInfrastructure.createPythonBridge(
        getFirstWorkspacePath(),
      );

      await python.ex`from dbt_core_integration import *`;
      const packagesInstallPathsFromPython = await python.lock<string[]>(
        (python) =>
          python`to_dict(find_package_paths(${projectDirectories.map(
            (projectDirectory) => projectDirectory.fsPath,
          )}))`,
      );
      packagesInstallPaths = packagesInstallPaths.map(
        (packageInstallPath, index) => {
          const packageInstallPathFromPython =
            packagesInstallPathsFromPython[index];
          if (packageInstallPathFromPython) {
            return Uri.file(packageInstallPathFromPython).fsPath;
          }
          return packageInstallPath;
        },
      );
    } catch (error) {
      this.dbtTerminal.log(
        "An error occured while finding package paths: " + error,
      );
    } finally {
      if (python) {
        this.executionInfrastructure.closePythonBridge(python);
      }
    }

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

@provideSingleton(DBTCoreProjectIntegration)
export class DBTCoreProjectIntegration
  implements DBTProjectIntegration, Disposable
{
  static DBT_PROFILES_FILE = "profiles.yml";

  private profilesDir?: string;
  private targetPath?: string;
  private adapterType?: string;
  private version?: number[];
  private packagesInstallPath?: string;
  private modelPaths?: string[];
  private macroPaths?: string[];
  private python: PythonBridge;
  private disposables: Disposable[] = [];
  private readonly rebuildManifestDiagnostics =
    languages.createDiagnosticCollection("dbt");
  private readonly pythonBridgeDiagnostics =
    languages.createDiagnosticCollection("dbt");
  private static QUEUE_ALL = "all";

  constructor(
    private executionInfrastructure: DBTCommandExecutionInfrastructure,
    private pythonEnvironment: PythonEnvironment,
    private telemetry: TelemetryService,
    private pythonDBTCommandExecutionStrategy: PythonDBTCommandExecutionStrategy,
    private dbtProjectContainer: DBTProjectContainer,
    private projectRoot: Uri,
    private projectConfigDiagnostics: DiagnosticCollection,
    private dbtTerminal: DBTTerminal,
  ) {
    this.python = this.executionInfrastructure.createPythonBridge(
      this.projectRoot.fsPath,
    );
    this.dbtTerminal.log(`Registering project ${this.projectRoot}`);
    this.executionInfrastructure.createQueue(
      DBTCoreProjectIntegration.QUEUE_ALL,
    );

    this.disposables.push(
      this.pythonEnvironment.onPythonEnvironmentChanged(() => {
        this.python = this.executionInfrastructure.createPythonBridge(
          this.projectRoot.fsPath,
        );
      }),
      this.rebuildManifestDiagnostics,
      this.pythonBridgeDiagnostics,
    );
  }

  // remove the trailing slashes if they exists,
  // causes the quote to be escaped when passing to python
  private removeTrailingSlashes(input: string | undefined) {
    return input?.replace(/\\+$/, "");
  }

  async refreshProjectConfig(): Promise<void> {
    await this.createPythonDbtProject(this.python);
    await this.python.ex`project.init_project()`;
    this.targetPath = await this.findTargetPath();
    this.modelPaths = await this.findModelPaths();
    this.macroPaths = await this.findMacroPaths();
    this.packagesInstallPath = await this.findPackagesInstallPath();
    this.version = await this.findVersion();
    this.adapterType = await this.findAdapterType();
  }

  async executeSQL(query: string, limit: number): Promise<QueryExecution> {
    const queryTemplate = workspace
      .getConfiguration("dbt")
      .get<string>(
        "queryTemplate",
        "select * from ({query}\n) as query limit {limit}",
      );

    const limitQuery = queryTemplate
      .replace("{query}", () => query)
      .replace("{limit}", () => limit.toString());

    const queryThread = this.executionInfrastructure.createPythonBridge(
      this.projectRoot.fsPath,
    );
    await this.createPythonDbtProject(queryThread);
    await queryThread.ex`project.init_project()`;
    return new QueryExecution(
      async () => {
        queryThread.kill(2);
      },
      async () => {
        const compiledQuery = await this.unsafeCompileQuery(limitQuery);
        return queryThread!.lock<ExecuteSQLResult>(
          (python) => python`to_dict(project.execute_sql(${compiledQuery}))`,
        );
      },
    );
  }

  private async createPythonDbtProject(bridge: PythonBridge) {
    await bridge.ex`from dbt_core_integration import *`;
    const targetPath = this.removeTrailingSlashes(
      await bridge.lock(
        (python) => python`target_path(${this.projectRoot.fsPath})`,
      ),
    );
    await bridge.ex`project = DbtProject(project_dir=${this.projectRoot.fsPath}, profiles_dir=${this.profilesDir}, target_path=${targetPath}) if 'project' not in locals() else project`;
  }

  async initializeProject(): Promise<void> {
    try {
      await this.python
        .ex`from dbt_core_integration import default_profiles_dir`;
      this.profilesDir = this.removeTrailingSlashes(
        await this.python.lock(
          (python) => python`default_profiles_dir(${this.projectRoot.fsPath})`,
        ),
      );
      if (this.profilesDir) {
        const dbtProfileWatcher = workspace.createFileSystemWatcher(
          new RelativePattern(
            this.profilesDir,
            DBTCoreProjectIntegration.DBT_PROFILES_FILE,
          ),
        );
        this.disposables.push(
          dbtProfileWatcher,
          // when the project config changes we need to re-init the dbt project
          ...setupWatcherHandler(dbtProfileWatcher, () =>
            this.rebuildManifest(),
          ),
        );
      }
      await this.createPythonDbtProject(this.python);
      this.pythonBridgeDiagnostics.clear();
    } catch (exc: any) {
      if (exc instanceof PythonException) {
        // python errors can be about anything, so we just associate the error with the project file
        //  with a fixed range
        if (exc.message.includes("No module named 'dbt'")) {
          // Let's not create an error for each project if dbt is not detected
          //  This is already displayed in the status bar
          return;
        }
        let errorMessage =
          "An error occured while initializing the dbt project: " +
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
            "An unexpected error occured while initializing the dbt project at " +
              this.projectRoot +
              ": " +
              exc +
              ".",
          ),
        );
        this.telemetry.sendTelemetryError("pythonBridgeInitError", exc);
      }
    }
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

  getAdapterType(): string | undefined {
    return this.adapterType;
  }

  getVersion(): number[] | undefined {
    return this.version;
  }

  async findAdapterType(): Promise<string | undefined> {
    return this.python.lock<string>(
      (python) => python`project.config.credentials.type`,
    );
  }

  async rebuildManifest(): Promise<void> {
    const errors = this.projectConfigDiagnostics.get(
      Uri.joinPath(this.projectRoot, DBTProject.DBT_PROJECT_FILE),
    );
    if (errors !== undefined && errors.length > 0) {
      // No point in trying to rebuild the manifest if the config is not valid
      return;
    }
    try {
      await this.python.lock(
        (python) => python`to_dict(project.safe_parse_project())`,
      );
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
            adapter: this.getAdapterType() || "unknown", // TODO: this should be moved to dbtProject
          },
        );
        return;
      }
      // if we get here, it is not a dbt error but an extension error.
      this.telemetry.sendTelemetryError(
        "pythonBridgeCannotParseProjectUnknownError",
        exc,
        {
          adapter: this.adapterType || "unknown", // TODO: this should be moved to dbtProject
        },
      );
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "An error occured while rebuilding the dbt manifest: " + exc + ".",
        ),
      );
    }
  }

  async runModel(command: DBTCommand) {
    this.addCommandToQueue(this.dbtCoreCommand(command));
  }

  async buildModel(command: DBTCommand) {
    this.addCommandToQueue(this.dbtCoreCommand(command));
  }

  async runTest(command: DBTCommand) {
    this.addCommandToQueue(this.dbtCoreCommand(command));
  }

  async runModelTest(command: DBTCommand) {
    this.addCommandToQueue(this.dbtCoreCommand(command));
  }

  async compileModel(command: DBTCommand) {
    this.addCommandToQueue(this.dbtCoreCommand(command));
  }

  async generateDocs(command: DBTCommand) {
    this.addCommandToQueue(this.dbtCoreCommand(command));
  }

  deps(command: DBTCommand) {
    return this.dbtCoreCommand(command).execute();
  }

  debug(command: DBTCommand) {
    return this.dbtCoreCommand(command).execute();
  }

  private addCommandToQueue(command: DBTCommand) {
    const isInstalled =
      this.dbtProjectContainer.showErrorIfDbtOrPythonNotInstalled();
    if (!isInstalled) {
      return;
    }
    this.executionInfrastructure.addCommandToQueue(
      DBTCoreProjectIntegration.QUEUE_ALL,
      command,
    );
  }

  private dbtCoreCommand(command: DBTCommand) {
    command.addArgument("--project-dir");
    command.addArgument(this.projectRoot.fsPath);
    if (this.profilesDir) {
      command.addArgument("--profiles-dir");
      command.addArgument(this.profilesDir);
    }
    command.setExecutionStrategy(this.pythonDBTCommandExecutionStrategy);
    return command;
  }

  // internal commands
  async unsafeCompileNode(modelName: string): Promise<string | undefined> {
    this.throwBridgeErrorIfAvailable();
    const output = await this.python?.lock<CompilationResult>(
      (python) =>
        python!`to_dict(project.compile_node(project.get_ref_node(${modelName})))`,
    );
    return output.compiled_sql;
  }

  async unsafeCompileQuery(query: string): Promise<string | undefined> {
    this.throwBridgeErrorIfAvailable();
    const output = await this.python?.lock<CompilationResult>(
      (python) => python!`to_dict(project.compile_sql(${query}))`,
    );
    return output.compiled_sql;
  }

  async validateSql(query: string, dialect: string, models: any) {
    this.throwBridgeErrorIfAvailable();
    const result = await this.python?.lock<ValidateSqlParseErrorResponse>(
      (python) =>
        python!`to_dict(validate_sql(${query}, ${dialect}, ${models}))`,
    );
    return result;
  }

  async validateSQLDryRun(query: string) {
    this.throwBridgeErrorIfAvailable();
    const result = await this.python?.lock<{ bytes_processed: string }>(
      (python) => python!`to_dict(project.validate_sql_dry_run(${query}))`,
    );
    return result;
  }

  async getColumnsOfModel(modelName: string) {
    this.throwBridgeErrorIfAvailable();
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
    this.throwBridgeErrorIfAvailable();
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
    this.throwBridgeErrorIfAvailable();
    return this.python?.lock<{ [key: string]: string }[]>(
      (python) =>
        python!`to_dict(project.get_columns_in_relation(project.create_relation(${database}, ${schema}, ${objectName})))`,
    );
  }

  async getCatalog() {
    this.throwBridgeErrorIfAvailable();
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

  getDebounceForRebuildManifest() {
    return 2000;
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

  private async findVersion(): Promise<number[]> {
    return this.python?.lock<number[]>(
      (python) => python!`to_dict(project.get_dbt_version())`,
    );
  }

  private throwBridgeErrorIfAvailable() {
    const allDiagnostics = [
      this.pythonBridgeDiagnostics,
      this.rebuildManifestDiagnostics,
    ];

    for (const diagnosticCollection of allDiagnostics) {
      for (const [_, diagnostics] of diagnosticCollection) {
        if (diagnostics.length > 0) {
          const firstError = diagnostics[0];
          throw new Error(firstError.message);
        }
      }
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
