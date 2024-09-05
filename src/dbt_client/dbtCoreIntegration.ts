import {
  CancellationToken,
  Diagnostic,
  DiagnosticCollection,
  DiagnosticSeverity,
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
  getProjectRelativePath,
  provideSingleton,
  setupWatcherHandler,
} from "../utils";
import {
  Catalog,
  CompilationResult,
  DBColumn,
  DBTNode,
  DBTCommand,
  DBTCommandExecutionInfrastructure,
  DBTDetection,
  DBTProjectDetection,
  DBTProjectIntegration,
  ExecuteSQLResult,
  PythonDBTCommandExecutionStrategy,
  QueryExecution,
  SourceNode,
  Node,
  ExecuteSQLError,
  HealthcheckArgs,
} from "./dbtIntegration";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { PythonBridge, PythonException } from "python-bridge";
import * as path from "path";
import { DBTProject } from "../manifest/dbtProject";
import { existsSync, readFileSync } from "fs";
import { parse } from "yaml";
import { TelemetryService } from "../telemetry";
import {
  AltimateRequest,
  NotFoundError,
  ValidateSqlParseErrorResponse,
} from "../altimate";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestPathType } from "../constants";
import { DBTTerminal } from "./dbtTerminal";
import { ValidationProvider } from "../validation_provider";
import { DeferToProdService } from "../services/deferToProdService";
import { NodeMetaData } from "../domain";

const DEFAULT_QUERY_TEMPLATE = "select * from ({query}) as query limit {limit}";

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

interface DeferConfig {
  deferToProduction: boolean;
  favorState: boolean;
  manifestPathForDeferral: string;
  manifestPathType?: ManifestPathType;
  dbtCoreIntegrationId?: number;
}

type InsightType = "Modelling" | "Test" | "structure";

interface Insight {
  name: string;
  type: InsightType;
  message: string;
  recommendation: string;
  reason_to_flag: string;
  metadata: {
    model?: string;
    model_unique_id?: string;
    model_type?: string;
    convention?: string | null;
  };
}

type Severity = "ERROR" | "WARNING";

interface ModelInsight {
  insight: Insight;
  severity: Severity;
  unique_id: string;
  package_name: string;
  path: string;
  original_file_path: string;
}

export interface ProjectHealthcheck {
  model_insights: Record<string, ModelInsight[]>;
  // package_insights: any;
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
      const { stderr } = await checkDBTInstalledProcess.complete();
      if (stderr) {
        throw new Error(stderr);
      }
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

  private getPackageInstallPathFallback(
    projectDirectory: Uri,
    packageInstallPath: string,
  ): string {
    const dbtProjectFile = path.join(
      projectDirectory.fsPath,
      "dbt_project.yml",
    );
    if (existsSync(dbtProjectFile)) {
      const dbtProjectConfig: any = parse(readFileSync(dbtProjectFile, "utf8"));
      const packagesInstallPath = dbtProjectConfig["packages-install-path"];
      if (packagesInstallPath) {
        if (path.isAbsolute(packagesInstallPath)) {
          return packagesInstallPath;
        } else {
          return path.join(projectDirectory.fsPath, packagesInstallPath);
        }
      }
    }
    return packageInstallPath;
  }

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
      this.dbtTerminal.debug(
        "dbtCoreIntegration:discoverProjects",
        "An error occured while finding package paths: " + error,
      );
      // Fallback to reading yaml files
      packagesInstallPaths = projectDirectories.map((projectDirectory, idx) =>
        this.getPackageInstallPathFallback(
          projectDirectory,
          packagesInstallPaths[idx],
        ),
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
  private seedPaths?: string[];
  private macroPaths?: string[];
  protected python: PythonBridge;
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
    private altimateRequest: AltimateRequest,
    private dbtTerminal: DBTTerminal,
    private validationProvider: ValidationProvider,
    private deferToProdService: DeferToProdService,
    private projectRoot: Uri,
    private projectConfigDiagnostics: DiagnosticCollection,
  ) {
    this.dbtTerminal.debug(
      "DBTCoreProjectIntegration",
      `Registering dbt core project at ${this.projectRoot}`,
    );
    this.python = this.executionInfrastructure.createPythonBridge(
      this.projectRoot.fsPath,
    );
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

    this.isDbtLoomInstalled().then((isInstalled) => {
      this.telemetry.setTelemetryCustomAttribute(
        "dbtLoomInstalled",
        `${isInstalled}`,
      );
    });
  }

  private async isDbtLoomInstalled(): Promise<boolean> {
    try {
      await this.python.ex`from dbt_loom import *`;
      return true;
    } catch (error) {
      return false;
    }
  }

  // remove the trailing slashes if they exists,
  // causes the quote to be escaped when passing to python
  private removeTrailingSlashes(input: string | undefined) {
    return input?.replace(/\\+$/, "");
  }

  private getLimitQuery(queryTemplate: string, query: string, limit: number) {
    return queryTemplate
      .replace("{query}", () => query)
      .replace("{limit}", () => limit.toString());
  }

  private async getQuery(
    query: string,
    limit: number,
  ): Promise<{ queryTemplate: string; limitQuery: string }> {
    try {
      const dbtVersion = await this.version;
      //dbt supports limit macro after v1.5
      if (dbtVersion && dbtVersion[0] >= 1 && dbtVersion[1] >= 5) {
        const args = { compiled_code: query, limit };
        const queryTemplateFromMacro = await this.python?.lock(
          (python) =>
            python!`to_dict(project.execute_macro('get_show_sql', ${args}, ${query}))`,
        );

        this.dbtTerminal.debug(
          "DBTCoreProjectIntegration",
          "Using query template from macro",
          queryTemplateFromMacro,
        );
        return {
          queryTemplate: queryTemplateFromMacro,
          limitQuery: queryTemplateFromMacro,
        };
      }
    } catch (err) {
      console.error("Error while getting get_show_sql macro", err);
      this.telemetry.sendTelemetryError(
        "executeMacroGetLimitSubquerySQLError",
        err,
        { adapter: this.adapterType || "unknown" },
      );
    }

    const queryTemplate = workspace
      .getConfiguration("dbt")
      .get<string>("queryTemplate");

    if (queryTemplate && queryTemplate !== DEFAULT_QUERY_TEMPLATE) {
      console.log("Using user provided query template", queryTemplate);
      const limitQuery = this.getLimitQuery(queryTemplate, query, limit);

      return { queryTemplate, limitQuery };
    }

    return {
      queryTemplate: DEFAULT_QUERY_TEMPLATE,
      limitQuery: this.getLimitQuery(DEFAULT_QUERY_TEMPLATE, query, limit),
    };
  }

  async refreshProjectConfig(): Promise<void> {
    await this.createPythonDbtProject(this.python);
    await this.python.ex`project.init_project()`;
    this.targetPath = await this.findTargetPath();
    this.modelPaths = await this.findModelPaths();
    this.seedPaths = await this.findSeedPaths();
    this.macroPaths = await this.findMacroPaths();
    this.packagesInstallPath = await this.findPackagesInstallPath();
    this.version = await this.findVersion();
    this.adapterType = await this.findAdapterType();
  }

  async executeSQL(
    query: string,
    limit: number,
    modelName: string,
  ): Promise<QueryExecution> {
    this.throwBridgeErrorIfAvailable();
    const { limitQuery } = await this.getQuery(query, limit);

    const queryThread = this.executionInfrastructure.createPythonBridge(
      this.projectRoot.fsPath,
    );
    return new QueryExecution(
      async () => {
        queryThread.kill(2);
      },
      async () => {
        await this.createPythonDbtProject(queryThread);
        await queryThread.ex`project.init_project()`;
        let result: ExecuteSQLResult;
        // compile query
        const compiledQuery = await this.unsafeCompileQuery(
          limitQuery,
          modelName,
        );
        try {
          // execute query
          result = await queryThread!.lock<ExecuteSQLResult>(
            (python) => python`to_dict(project.execute_sql(${compiledQuery}))`,
          );
          const { manifestPathType } =
            this.deferToProdService.getDeferConfigByProjectRoot(
              this.projectRoot.fsPath,
            );
          if (manifestPathType === ManifestPathType.REMOTE) {
            this.altimateRequest.sendDeferToProdEvent(ManifestPathType.REMOTE);
          }
        } catch (err) {
          const message = `Error while executing sql: ${compiledQuery}`;
          this.dbtTerminal.error("dbtCore:executeSQL", message, err);
          if (err instanceof PythonException) {
            throw new ExecuteSQLError(err.exception.message, compiledQuery!);
          }
          throw new ExecuteSQLError((err as Error).message, compiledQuery!);
        } finally {
          await queryThread.end();
        }
        return { ...result, compiled_stmt: compiledQuery, modelName };
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
    const { deferToProduction, manifestPath, favorState } =
      await this.getDeferConfig();
    await bridge.ex`project = DbtProject(project_dir=${this.projectRoot.fsPath}, profiles_dir=${this.profilesDir}, target_path=${targetPath}, defer_to_prod=${deferToProduction}, manifest_path=${manifestPath}, favor_state=${favorState}) if 'project' not in locals() else project`;
  }

  async initializeProject(): Promise<void> {
    try {
      await this.python
        .ex`from dbt_core_integration import default_profiles_dir`;
      await this.python.ex`from dbt_healthcheck import *`;
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

  getSeedPaths(): string[] | undefined {
    return this.seedPaths;
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

  getPythonBridgeStatus(): boolean {
    return this.python.connected;
  }

  getAllDiagnostic(): Diagnostic[] {
    const projectURI = Uri.joinPath(
      this.projectRoot,
      DBTProject.DBT_PROJECT_FILE,
    );
    return [
      ...(this.pythonBridgeDiagnostics.get(projectURI) || []),
      ...(this.projectConfigDiagnostics.get(projectURI) || []),
      ...(this.rebuildManifestDiagnostics.get(projectURI) || []),
    ];
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
    this.addCommandToQueue(
      await this.addDeferParams(this.dbtCoreCommand(command)),
    );
  }

  async buildModel(command: DBTCommand) {
    this.addCommandToQueue(
      await this.addDeferParams(this.dbtCoreCommand(command)),
    );
  }

  async buildProject(command: DBTCommand) {
    this.addCommandToQueue(
      await this.addDeferParams(this.dbtCoreCommand(command)),
    );
  }

  async runTest(command: DBTCommand) {
    this.addCommandToQueue(
      await this.addDeferParams(this.dbtCoreCommand(command)),
    );
  }

  async runModelTest(command: DBTCommand) {
    this.addCommandToQueue(
      await this.addDeferParams(this.dbtCoreCommand(command)),
    );
  }

  async compileModel(command: DBTCommand) {
    this.addCommandToQueue(
      await this.addDeferParams(this.dbtCoreCommand(command)),
    );
  }

  async generateDocs(command: DBTCommand) {
    this.addCommandToQueue(this.dbtCoreCommand(command));
  }

  async executeCommandImmediately(command: DBTCommand) {
    return await this.dbtCoreCommand(command).execute();
  }

  async deps(command: DBTCommand) {
    const { stdout, stderr } = await this.dbtCoreCommand(command).execute();
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
  }

  async debug(command: DBTCommand) {
    const { stdout, stderr } = await this.dbtCoreCommand(command).execute();
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
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

  private async getDeferManifestPath(
    manifestPathType: ManifestPathType | undefined,
    manifestPathForDeferral: string,
    dbtCoreIntegrationId: number | undefined,
  ): Promise<string> {
    if (!manifestPathType) {
      const configNotPresent = new Error(
        "Please configure defer to production functionality by specifying manifest path in Actions panel before using it.",
      );
      throw configNotPresent;
    }
    if (manifestPathType === ManifestPathType.LOCAL) {
      if (!manifestPathForDeferral) {
        const configNotPresent = new Error(
          "manifestPathForDeferral config is not present, use the actions panel to set the Defer to production configuration.",
        );
        this.dbtTerminal.error(
          "manifestPathForDeferral",
          "manifestPathForDeferral is not present",
          configNotPresent,
        );
        throw configNotPresent;
      }
      return manifestPathForDeferral;
    }
    if (manifestPathType === ManifestPathType.REMOTE) {
      try {
        this.validationProvider.throwIfNotAuthenticated();
      } catch (err) {
        throw new Error(
          "Defer to production is currently enabled with 'DataPilot dbt integration' mode. It requires a valid Altimate AI API key and instance name in the settings. In order to run dbt commands, please either switch to Local Path mode or disable the feature or add an API key / instance name.",
        );
      }

      this.dbtTerminal.debug(
        "remoteManifest",
        `fetching artifact url for dbtCoreIntegrationId: ${dbtCoreIntegrationId}`,
      );
      try {
        const response = await this.altimateRequest.fetchArtifactUrl(
          "manifest",
          dbtCoreIntegrationId!,
        );
        const manifestPath = await this.altimateRequest.downloadFileLocally(
          response.url,
          this.projectRoot,
        );
        console.log(`Set remote manifest path: ${manifestPath}`);
        return manifestPath;
      } catch (error) {
        if (error instanceof NotFoundError) {
          const manifestNotFoundError = new Error(
            "Unable to download remote manifest file. Did you upload your manifest using the Altimate DataPilot CLI?",
          );
          this.dbtTerminal.error(
            "remoteManifestError",
            "Unable to download remote manifest file.",
            manifestNotFoundError,
          );
          throw manifestNotFoundError;
        }
        throw error;
      }
    }
    throw new Error(`Invalid manifestPathType: ${manifestPathType}`);
  }

  private async getDeferParams(): Promise<string[]> {
    const deferConfig = this.deferToProdService.getDeferConfigByProjectRoot(
      this.projectRoot.fsPath,
    );
    const {
      deferToProduction,
      manifestPathForDeferral,
      favorState,
      manifestPathType,
      dbtCoreIntegrationId,
    } = deferConfig;
    if (!deferToProduction) {
      this.dbtTerminal.debug("deferToProd", "defer to prod not enabled");
      return [];
    }
    const manifestPath = await this.getDeferManifestPath(
      manifestPathType,
      manifestPathForDeferral,
      dbtCoreIntegrationId,
    );
    const args = ["--defer", "--state", manifestPath];
    if (favorState) {
      args.push("--favor-state");
    }
    this.dbtTerminal.debug(
      "deferToProd",
      `executing dbt command with defer params ${manifestPathType} mode`,
      true,
      args,
    );

    if (manifestPathType === ManifestPathType.REMOTE) {
      this.altimateRequest.sendDeferToProdEvent(ManifestPathType.REMOTE);
    }
    return args;
  }

  private async addDeferParams(command: DBTCommand) {
    const deferParams = await this.getDeferParams();
    deferParams.forEach((param) => command.addArgument(param));
    return command;
  }

  protected dbtCoreCommand(command: DBTCommand) {
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
  async unsafeCompileNode(modelName: string): Promise<string> {
    this.throwBridgeErrorIfAvailable();
    const output = await this.python?.lock<CompilationResult>(
      (python) =>
        python!`to_dict(project.compile_node(project.get_ref_node(${modelName})))`,
    );
    return output.compiled_sql;
  }

  async unsafeCompileQuery(
    query: string,
    originalModelName: string | undefined = undefined,
  ): Promise<string> {
    this.throwBridgeErrorIfAvailable();
    const output = await this.python?.lock<CompilationResult>(
      (python) =>
        python!`to_dict(project.compile_sql(${query}, ${originalModelName}))`,
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
    // TODO: fix this type
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
  ): Promise<DBColumn[]> {
    this.throwBridgeErrorIfAvailable();
    return this.python?.lock<DBColumn[]>(
      (python) =>
        python!`to_dict(project.get_columns_in_relation(project.create_relation(${database}, ${schema}, ${objectName})))`,
    );
  }

  async getBulkCompiledSQL(models: NodeMetaData[]) {
    const result: Record<string, string> = {};
    for (const m of models) {
      try {
        const compiledSQL = await this.unsafeCompileNode(m.name);
        result[m.uniqueId] = compiledSQL;
      } catch (e) {
        this.dbtTerminal.error(
          "getBulkCompiledSQL",
          `Unable to compile sql for model ${m.uniqueId}`,
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
    const result: Record<string, DBColumn[]> = {};
    for (const n of nodes) {
      if (cancellationToken.isCancellationRequested) {
        break;
      }
      if (n.resource_type === DBTProject.RESOURCE_TYPE_SOURCE) {
        const source = n as SourceNode;
        result[n.unique_id] = await this.getColumnsOfSource(
          source.name,
          source.table,
        );
      } else {
        const model = n as Node;
        result[n.unique_id] = await this.getColumnsOfModel(model.name);
      }
    }
    return result;
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

  async getCatalog(): Promise<Catalog> {
    this.throwBridgeErrorIfAvailable();
    return await this.python?.lock<Catalog>(
      (python) => python!`to_dict(project.get_catalog())`,
    );
  }

  // get dbt config
  private async findModelPaths(): Promise<string[]> {
    return (
      await this.python.lock<string[]>(
        (python) => python`to_dict(project.config.model_paths)`,
      )
    ).map((modelPath: string) => {
      if (!path.isAbsolute(modelPath)) {
        return path.join(this.projectRoot.fsPath, modelPath);
      }
      return modelPath;
    });
  }

  private async findSeedPaths(): Promise<string[]> {
    return (
      await this.python.lock<string[]>(
        (python) => python`to_dict(project.config.seed_paths)`,
      )
    ).map((seedPath: string) => {
      if (!path.isAbsolute(seedPath)) {
        return path.join(this.projectRoot.fsPath, seedPath);
      }
      return seedPath;
    });
  }

  getDebounceForRebuildManifest() {
    return 2000;
  }

  private async findMacroPaths(): Promise<string[]> {
    return (
      await this.python.lock<string[]>(
        (python) => python`to_dict(project.config.macro_paths)`,
      )
    ).map((macroPath: string) => {
      if (!path.isAbsolute(macroPath)) {
        return path.join(this.projectRoot.fsPath, macroPath);
      }
      return macroPath;
    });
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

  protected throwBridgeErrorIfAvailable() {
    const allDiagnostics: DiagnosticCollection[] = [
      this.pythonBridgeDiagnostics,
      this.projectConfigDiagnostics,
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

  findPackageVersion(packageName: string) {
    if (!this.packagesInstallPath) {
      throw new Error("Missing packages install path");
    }
    if (!packageName) {
      throw new Error("Invalid package name");
    }

    const dbtProjectYmlFilePath = path.join(
      this.packagesInstallPath,
      packageName,
      "dbt_project.yml",
    );
    if (!existsSync(dbtProjectYmlFilePath)) {
      throw new Error("Package not installed");
    }
    const fileContents = readFileSync(dbtProjectYmlFilePath, {
      encoding: "utf-8",
    });
    if (!fileContents) {
      throw new Error(`${packageName} has empty dbt_project.yml`);
    }
    const parsedConfig = parse(fileContents, {
      strict: false,
      uniqueKeys: false,
      maxAliasCount: -1,
    });
    if (!parsedConfig?.version) {
      throw new Error(`Missing version in ${dbtProjectYmlFilePath}`);
    }

    return parsedConfig.version;
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

  async performDatapilotHealthcheck({
    manifestPath,
    catalogPath,
    config,
    configPath,
  }: HealthcheckArgs): Promise<ProjectHealthcheck> {
    this.throwBridgeErrorIfAvailable();
    const healthCheckThread = this.executionInfrastructure.createPythonBridge(
      this.projectRoot.fsPath,
    );
    try {
      await this.createPythonDbtProject(healthCheckThread);
      await healthCheckThread.ex`from dbt_healthcheck import *`;
      const result = await healthCheckThread.lock<ProjectHealthcheck>(
        (python) =>
          python!`to_dict(project_healthcheck(${manifestPath}, ${catalogPath}, ${configPath}, ${config}))`,
      );
      return result;
    } finally {
      healthCheckThread.end();
    }
  }

  private async getDeferConfig() {
    try {
      const root = getProjectRelativePath(this.projectRoot);
      const currentConfig: Record<string, DeferConfig> =
        this.deferToProdService.getDeferConfigByWorkspace();
      const {
        deferToProduction,
        manifestPathForDeferral,
        favorState,
        manifestPathType,
        dbtCoreIntegrationId,
      } = currentConfig[root];
      const manifestFolder = await this.getDeferManifestPath(
        manifestPathType,
        manifestPathForDeferral,
        dbtCoreIntegrationId,
      );
      const manifestPath = path.join(manifestFolder, DBTProject.MANIFEST_FILE);
      return { deferToProduction, manifestPath, favorState };
    } catch (error) {
      this.dbtTerminal.debug(
        "dbtCoreIntegration:getDeferConfig",
        "An error occured while getting defer config: " +
          (error as Error).message,
      );
    }
    return { deferToProduction: false, manifestPath: null, favorState: false };
  }

  async applyDeferConfig(): Promise<void> {
    const { deferToProduction, manifestPath, favorState } =
      await this.getDeferConfig();
    await this.python?.lock<void>(
      (python) =>
        python!`project.set_defer_config(${deferToProduction}, ${manifestPath}, ${favorState})`,
    );
    await this.rebuildManifest();
  }

  throwDiagnosticsErrorIfAvailable(): void {
    this.throwBridgeErrorIfAvailable();
  }
}
