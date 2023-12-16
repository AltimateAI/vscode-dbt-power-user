import { existsSync, readFileSync, writeFileSync } from "fs";
import * as os from "os";
import * as path from "path";
import { join } from "path";
import { PythonBridge, pythonBridge, PythonException } from "python-bridge";
import {
  commands,
  Diagnostic,
  Disposable,
  Event,
  EventEmitter,
  languages,
  Range,
  RelativePattern,
  Uri,
  ViewColumn,
  window,
  workspace,
} from "vscode";
import { parse, YAMLError } from "yaml";
import {
  DBTCommandFactory,
  RunModelParams,
} from "../dbt_client/dbtCommandFactory";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import {
  debounce,
  extendErrorWithSupportLinks,
  setupWatcherHandler,
  substituteSettingsVariables,
} from "../utils";
import { QueryResultPanel } from "../webview_provider/queryResultPanel";
import { DBTProjectContainer } from "./dbtProjectContainer";
import { ManifestCacheChangedEvent } from "./event/manifestCacheChangedEvent";
import { ProjectConfigChangedEvent } from "./event/projectConfigChangedEvent";
import { DBTProjectLog, DBTProjectLogFactory } from "./modules/dbtProjectLog";
import {
  SourceFileWatchers,
  SourceFileWatchersFactory,
} from "./modules/sourceFileWatchers";
import { TargetWatchersFactory } from "./modules/targetWatchers";
import { PythonEnvironment } from "./pythonEnvironment";
import { TelemetryService } from "../telemetry";
import { ValidateSqlParseErrorResponse } from "../altimate";
import * as crypto from "crypto";

export interface ExecuteSQLResult {
  table: {
    column_names: string[];
    column_types: string[];
    rows: any[][];
  };
  raw_sql: string;
  compiled_sql: string;
}

interface CompilationResult {
  compiled_sql: string;
}

interface FileNameTemplateMap {
  [key: string]: string;
}

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

export class DBTProject implements Disposable {
  static DBT_PROJECT_FILE = "dbt_project.yml";
  static DBT_PROFILES_FILE = "profiles.yml";
  static MANIFEST_FILE = "manifest.json";
  static RUN_RESULTS_FILE = "run_results.json";
  static TARGET_PATH_VAR = "target-path";
  static SOURCE_PATHS_VAR = ["source-paths", "model-paths"];
  static MACRO_PATH_VAR = "macro-paths";

  static RESOURCE_TYPE_MODEL = "model";
  static RESOURCE_TYPE_SOURCE = "source";
  static RESOURCE_TYPE_EXPOSURE = "exposure";
  static RESOURCE_TYPE_SEED = "seed";
  static RESOURCE_TYPE_SNAPSHOT = "snapshot";
  static RESOURCE_TYPE_TEST = "test";

  readonly projectRoot: Uri;
  readonly dbtProfilesDir: string; // vscode.Uri doesn't support relative urls
  private adapterType: string = "unknown";
  private projectName: string;
  private targetPath?: string;
  private packagesInstallPath?: string;
  private modelPaths?: string[];
  private macroPaths?: string[];
  private python?: PythonBridge;
  private pythonBridgeInitialized = false;
  private initializationException?: Error;

  private _onProjectConfigChanged =
    new EventEmitter<ProjectConfigChangedEvent>();
  public onProjectConfigChanged = this._onProjectConfigChanged.event;
  private sourceFileWatchers: SourceFileWatchers;
  public onSourceFileChanged: Event<void>;
  private dbtProjectLog: DBTProjectLog;
  private disposables: Disposable[] = [this._onProjectConfigChanged];
  private readonly rebuildManifestDiagnostics =
    languages.createDiagnosticCollection("dbt");
  private readonly pythonBridgeDiagnostics =
    languages.createDiagnosticCollection("dbt");
  private readonly projectConfigDiagnostics =
    languages.createDiagnosticCollection("dbt");
  public readonly projectHealth = languages.createDiagnosticCollection("dbt");

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private PythonEnvironment: PythonEnvironment,
    private sourceFileWatchersFactory: SourceFileWatchersFactory,
    private dbtProjectLogFactory: DBTProjectLogFactory,
    private targetWatchersFactory: TargetWatchersFactory,
    private dbtCommandFactory: DBTCommandFactory,
    private terminal: DBTTerminal,
    private queryResultPanel: QueryResultPanel,
    private telemetry: TelemetryService,
    path: Uri,
    projectConfig: any,
    _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
  ) {
    this.projectRoot = path;
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
      this.PythonEnvironment.environmentVariables.DBT_PROFILES_DIR ||
      join(os.homedir(), ".dbt");
    this.dbtProfilesDir = this.dbtProfilesDir.replace("~", os.homedir());
    // remove the trailing slashes if they exists,
    // causes the quote to be escaped when passing to python
    this.dbtProfilesDir = this.dbtProfilesDir.replace(/\\+$/, "");
    this.projectName = projectConfig.name;

    this.sourceFileWatchers =
      this.sourceFileWatchersFactory.createSourceFileWatchers(
        this.onProjectConfigChanged,
      );
    this.onSourceFileChanged = this.sourceFileWatchers.onSourceFileChanged;

    this.dbtProjectLog = this.dbtProjectLogFactory.createDBTProjectLog(
      this.onProjectConfigChanged,
    );

    console.log(
      `Registering project ${this.projectName} at ${this.projectRoot} with profile directory ${this.dbtProfilesDir}`,
    );

    this.disposables.push(
      this.targetWatchersFactory.createTargetWatchers(
        _onManifestChanged,
        this.onProjectConfigChanged,
      ),
      this.PythonEnvironment.onPythonEnvironmentChanged(() =>
        this.onPythonEnvironmentChanged(),
      ),
      this.sourceFileWatchers,
      this.rebuildManifestDiagnostics,
      this.pythonBridgeDiagnostics,
      this.projectConfigDiagnostics,
    );
  }

  public getProjectName() {
    return this.projectName;
  }

  getTargetPath() {
    return this.targetPath;
  }

  getPackageInstallPath() {
    return this.packagesInstallPath;
  }

  getModelPaths() {
    return this.modelPaths;
  }

  getMacroPaths() {
    return this.macroPaths;
  }

  async initializePythonBridge() {
    this.initializationException = undefined;
    try {
      let pythonPath = this.PythonEnvironment.pythonPath;
      const envVars = this.PythonEnvironment.environmentVariables;

      if (this.python !== undefined) {
        // Python env has changed
        this.pythonBridgeInitialized = false;
        this.python.end();
      }
      if (pythonPath.endsWith("python.exe")) {
        // replace python.exe with pythonw.exe if path exists
        const pythonwPath = pythonPath.replace("python.exe", "pythonw.exe");
        if (existsSync(pythonwPath)) {
          pythonPath = pythonwPath;
        }
      }
      this.python = pythonBridge({
        python: pythonPath,
        cwd: this.projectRoot.fsPath,
        env: {
          ...envVars,
          PYTHONPATH: __dirname,
        },
        detached: true,
      });
      await this.python.ex`from dbt_integration import *`;
      await this.python
        .ex`project = DbtProject(project_dir=${this.projectRoot.fsPath}, profiles_dir=${this.dbtProfilesDir})`;

      await this.initializePaths();
      this.pythonBridgeInitialized = true;
      console.log(`Initialized Python bridge for project ${this.projectName}`);
      this.pythonBridgeDiagnostics.clear();

      const dbtProjectConfigWatcher = workspace.createFileSystemWatcher(
        new RelativePattern(this.projectRoot, DBTProject.DBT_PROJECT_FILE),
      );

      const dbtProfileWatcher = workspace.createFileSystemWatcher(
        new RelativePattern(this.dbtProfilesDir, DBTProject.DBT_PROFILES_FILE),
      );

      const fireProjectChanged = debounce(
        async () => await this.rebuildManifest(),
        2000,
      );

      setupWatcherHandler(dbtProjectConfigWatcher, () => this.tryRefresh());
      setupWatcherHandler(dbtProfileWatcher, () => this.rebuildManifest(true));

      this.disposables.push(
        this.dbtProjectLog,
        dbtProjectConfigWatcher,
        this.onSourceFileChanged(fireProjectChanged),
      );
    } catch (exc: any) {
      console.error(
        `Python bridge throw error for project ${this.projectName}`,
        exc,
      );
      this.initializationException = exc;
    }
  }

  handlePythonBridgeException() {
    const exc = this.initializationException;
    if (exc) {
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
        return;
      }
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "An unexpected error occured while initializing the dbt project: " +
            exc +
            ".",
        ),
      );
      this.telemetry.sendTelemetryError("pythonBridgeInitError", exc);
      return;
    }
  }

  async closePythonBridge() {
    await this.python?.disconnect();
    await this.python?.end();
  }

  isPythonBridgeInitialized() {
    return this.pythonBridgeInitialized;
  }

  public async initializeDBTProject() {
    if (this.isPythonBridgeInitialized()) {
      await this.tryRefresh();
      await this.rebuildManifest(true);
    }
  }

  private async onPythonEnvironmentChanged() {
    await this.initializePythonBridge();
    await this.initializeDBTProject();
  }

  private async tryRefresh() {
    try {
      await this.refresh();
      this.projectConfigDiagnostics.clear();
    } catch (error) {
      if (error instanceof YAMLError) {
        this.projectConfigDiagnostics.set(
          Uri.joinPath(this.projectRoot, DBTProject.DBT_PROJECT_FILE),
          [new Diagnostic(new Range(0, 0, 999, 999), error.message)],
        );
      }
      console.warn(
        `An error occurred while trying to refresh the project "${this.getProjectName()}" at ${
          this.projectRoot
        } configuration`,
        error,
      );
      this.terminal.log(
        `An error occurred while trying to refresh the project "${this.getProjectName()}" at ${
          this.projectRoot
        } configuration: ${error}`,
      );
      this.telemetry.sendTelemetryError("projectConfigRefreshError", error);
    }
  }

  getAdapterType() {
    return this.adapterType;
  }

  findPackageName(uri: Uri): string | undefined {
    const documentPath = uri.path;
    const pathSegments = documentPath
      .replace(new RegExp(this.projectRoot.path + "/", "g"), "")
      .split("/");

    if (
      this.packagesInstallPath &&
      uri.fsPath.startsWith(this.packagesInstallPath)
    ) {
      return pathSegments[1];
    }
    return undefined;
  }

  contains(uri: Uri) {
    return (
      uri.fsPath === this.projectRoot.fsPath ||
      uri.fsPath.startsWith(this.projectRoot.fsPath + path.sep)
    );
  }

  private async rebuildManifest(init: boolean = false) {
    if (!this.pythonBridgeInitialized) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          `The dbt manifest for project "${this.getProjectName()}" at ${
            this.projectRoot.fsPath
          } can't be rebuilt right now as the Python environment has not yet been initialized, check the problems panel for any detected problems.`,
        ),
      );
      this.telemetry.sendTelemetryError("pythonBridgeNotYetInitializedError", {
        adapter: this.adapterType,
      });
      return;
    }
    try {
      await this.python?.lock(
        (python) => python!`to_dict(project.safe_parse_project(${init}))`,
      );
      if (init) {
        this.adapterType = (await this.python?.lock(
          (python) => python!`project.config.credentials.type`,
        )) as string;
        this.telemetry.sendTelemetryEvent("dbtProject", {
          adapter: this.adapterType,
          project: DBTProject.hashProjectRoot(this.projectRoot.fsPath),
        });
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

  runModel(runModelParams: RunModelParams) {
    const runModelCommand = this.dbtCommandFactory.createRunModelCommand(
      this.projectRoot,
      this.dbtProfilesDir,
      runModelParams,
    );
    this.telemetry.sendTelemetryEvent("runModel");
    this.dbtProjectContainer.addCommandToQueue(runModelCommand);
  }

  buildModel(runModelParams: RunModelParams) {
    const buildModelCommand = this.dbtCommandFactory.createBuildModelCommand(
      this.projectRoot,
      this.dbtProfilesDir,
      runModelParams,
    );
    this.telemetry.sendTelemetryEvent("buildModel");
    this.dbtProjectContainer.addCommandToQueue(buildModelCommand);
  }

  runTest(testName: string) {
    const testModelCommand = this.dbtCommandFactory.createTestModelCommand(
      this.projectRoot,
      this.dbtProfilesDir,
      testName,
    );
    this.telemetry.sendTelemetryEvent("runTest");
    this.dbtProjectContainer.addCommandToQueue(testModelCommand);
  }

  runModelTest(modelName: string) {
    const testModelCommand = this.dbtCommandFactory.createTestModelCommand(
      this.projectRoot,
      this.dbtProfilesDir,
      modelName,
    );
    this.telemetry.sendTelemetryEvent("runModelTest");
    this.dbtProjectContainer.addCommandToQueue(testModelCommand);
  }

  compileModel(runModelParams: RunModelParams) {
    const runModelCommand = this.dbtCommandFactory.createCompileModelCommand(
      this.projectRoot,
      this.dbtProfilesDir,
      runModelParams,
    );
    this.telemetry.sendTelemetryEvent("compileModel");
    this.dbtProjectContainer.addCommandToQueue(runModelCommand);
  }

  generateDocs() {
    const docsGenerateCommand =
      this.dbtCommandFactory.createDocsGenerateCommand(
        this.projectRoot,
        this.dbtProfilesDir,
      );
    this.telemetry.sendTelemetryEvent("generateDocs");
    this.dbtProjectContainer.addCommandToQueue(docsGenerateCommand);
  }

  async unsafeCompileNode(modelName: string): Promise<string | undefined> {
    const output = (await this.python?.lock(
      (python) =>
        python!`to_dict(project.compile_node(project.get_ref_node(${modelName})))`,
    )) as CompilationResult;
    return output.compiled_sql;
  }

  async compileNode(modelName: string): Promise<string | undefined> {
    await this.blockUntilPythonBridgeIsInitalized();
    if (
      await this.dbtProjectContainer.showDbtNotInstalledErrorMessageIfDbtIsNotInstalled()
    ) {
      return;
    }
    if (!this.pythonBridgeInitialized) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not compile node, because the Python bridge has not been initalized.",
        ),
      );
      this.telemetry.sendTelemetryError(
        "compileNodePythonBridgeNotInitializedError",
      );
      return;
    }
    this.telemetry.sendTelemetryEvent("compileNode");
    try {
      return this.unsafeCompileNode(modelName);
    } catch (exc: any) {
      if (exc instanceof PythonException) {
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            `An error occured while trying to compile your node: ${modelName}` +
              exc.exception.message +
              ".",
          ),
        );
        this.telemetry.sendTelemetryError("compileNodePythonError", exc);
        return (
          "Exception: " +
          exc.exception.message +
          "\n\n" +
          "Detailed error information:\n" +
          exc
        );
      }
      this.telemetry.sendTelemetryError("compileNodeUnknownError", exc);
      // Unknown error
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Encountered an unknown issue: " + exc + ".",
        ),
      );
      return "Detailed error information:\n" + exc;
    }
  }

  async unsafeCompileQuery(query: string): Promise<string | undefined> {
    const output = (await this.python?.lock(
      (python) => python!`to_dict(project.compile_sql(${query}))`,
    )) as CompilationResult;
    return output.compiled_sql;
  }

  async validateSql(request: { sql: string; dialect: string; models: any[] }) {
    await this.blockUntilPythonBridgeIsInitalized();

    if (!this.pythonBridgeInitialized) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not compile query, because the Python bridge has not been initalized.",
        ),
      );
      this.telemetry.sendTelemetryError(
        "compileQueryPythonBridgeNotInitializedError",
      );
      return;
    }
    try {
      const { sql, dialect, models } = request;
      const result = await this.python?.lock(
        (python) =>
          python!`to_dict(validate_sql(${sql}, ${dialect}, ${models}))`,
      );
      return result as ValidateSqlParseErrorResponse;
    } catch (exc) {
      window.showErrorMessage(
        extendErrorWithSupportLinks("Could not validate sql." + exc),
      );
      this.telemetry.sendTelemetryError("validateSQLError", {
        error: exc,
      });
    }
  }

  async validateSQLDryRun(query: string) {
    await this.blockUntilPythonBridgeIsInitalized();

    if (!this.pythonBridgeInitialized) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not compile query, because the Python bridge has not been initalized.",
        ),
      );
      this.telemetry.sendTelemetryError(
        "compileQueryPythonBridgeNotInitializedError",
      );
      return;
    }
    try {
      const result = await this.python?.lock(
        (python) => python!`to_dict(project.validate_sql_dry_run(${query}))`,
      );
      return result;
    } catch (exc) {
      const exception = exc as { exception: { message: string } };
      window.showErrorMessage(
        exception.exception.message || "Could not validate sql with dry run.",
      );
      this.telemetry.sendTelemetryError("validateSQLDryRunError", {
        error: exc,
      });
    }
  }

  async getDBTVersion(): Promise<number[] | undefined> {
    await this.blockUntilPythonBridgeIsInitalized();

    if (!this.pythonBridgeInitialized) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not compile query, because the Python bridge has not been initalized.",
        ),
      );
      this.telemetry.sendTelemetryError(
        "compileQueryPythonBridgeNotInitializedError",
      );
      return;
    }
    try {
      const result = await this.python?.lock(
        (python) => python!`to_dict(project.get_dbt_version())`,
      );
      return result as number[];
    } catch (exc) {
      window.showErrorMessage(
        extendErrorWithSupportLinks("Could not get dbt version." + exc),
      );
      this.telemetry.sendTelemetryError("getDBTVersionError", { error: exc });
    }
  }

  async compileQuery(query: string): Promise<string | undefined> {
    await this.blockUntilPythonBridgeIsInitalized();
    if (
      await this.dbtProjectContainer.showDbtNotInstalledErrorMessageIfDbtIsNotInstalled()
    ) {
      return;
    }
    if (!this.pythonBridgeInitialized) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not compile query, because the Python bridge has not been initalized.",
        ),
      );
      this.telemetry.sendTelemetryError(
        "compileQueryPythonBridgeNotInitializedError",
      );
      return;
    }
    this.telemetry.sendTelemetryEvent("compileQuery");
    try {
      return this.unsafeCompileQuery(query);
    } catch (exc: any) {
      if (exc instanceof PythonException) {
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            "An error occured while trying to compile your query: " +
              exc.exception.message +
              ".",
          ),
        );
        this.telemetry.sendTelemetryError("compileQueryPythonError", exc);
        return undefined;
      }
      this.telemetry.sendTelemetryError("compileQueryUnknownError", exc);
      // Unknown error
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Encountered an unknown issue: " + exc + ".",
        ),
      );
      return undefined;
    }
  }

  showCompiledSql(modelPath: Uri) {
    this.findModelInTargetfolder(modelPath, "compiled");
  }

  showRunSQL(modelPath: Uri) {
    this.findModelInTargetfolder(modelPath, "run");
  }

  createYMLContent(
    columnsInRelation: { [key: string]: string }[],
    modelName: string,
  ): string {
    let yamlString = "version: 2\n\nmodels:\n";
    yamlString += `  - name: ${modelName}\n    description: ""\n    columns:\n`;
    for (const item of columnsInRelation) {
      yamlString += `    - name: ${item.column}\n      description: ""\n`;
    }
    return yamlString;
  }

  async getColumnsOfModel(
    modelName: string,
  ): Promise<{ [key: string]: string }[]> {
    await this.blockUntilPythonBridgeIsInitalized();
    if (!this.pythonBridgeInitialized) {
      window.showErrorMessage(
        "Could not execute query, because the Python bridge has not been initalized. If the issue persists, please open a Github issue.",
      );
      this.telemetry.sendTelemetryError(
        "getColumnsInRelationPythonBridgeNotInitializedError",
      );
      // TODO: improve this, the errors should be captured at a higher level
      return [];
    }
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

  async getColumnsOfSource(
    sourceName: string,
    tableName: string,
  ): Promise<{ [key: string]: string }[]> {
    await this.blockUntilPythonBridgeIsInitalized();
    if (!this.pythonBridgeInitialized) {
      window.showErrorMessage(
        "Could not execute query, because the Python bridge has not been initalized. If the issue persists, please open a Github issue.",
      );
      this.telemetry.sendTelemetryError(
        "getColumnsInRelationPythonBridgeNotInitializedError",
      );
      // TODO: improve this, the errors should be captured at a higher level
      return [];
    }
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

  async getColumsOfRelation(
    database: string | undefined,
    schema: string | undefined,
    objectName: string,
  ) {
    return await this.python?.lock(
      (python) =>
        python!`to_dict(project.get_columns_in_relation(project.create_relation(${database}, ${schema}, ${objectName})))`,
    );
  }

  async getCatalog(): Promise<{ [key: string]: string }[]> {
    await this.blockUntilPythonBridgeIsInitalized();
    if (!this.pythonBridgeInitialized) {
      window.showErrorMessage(
        "Could not execute query, because the Python bridge has not been initalized. If the issue persists, please open a Github issue.",
      );
      this.telemetry.sendTelemetryError(
        "getColumnsInRelationPythonBridgeNotInitializedError",
      );
      // TODO: improve this, the errors should be captured at a higher level
      return [];
    }
    // Get database and schema
    try {
      const catalog = (await this.python?.lock(
        (python) => python!`to_dict(project.get_catalog())`,
      )) as any;
      return catalog;
    } catch (exc: any) {
      if (exc instanceof PythonException) {
        this.telemetry.sendTelemetryError("catalogPythonError", exc, {
          adapter: this.adapterType,
        });
        window.showErrorMessage(
          "Some of the scans could not run as connectivity to database for the project " +
            this.projectName +
            " is not available. ",
        );
        return [];
      }
      // Unknown error
      this.telemetry.sendTelemetryError("catalogUnknownError", exc, {
        adapter: this.adapterType,
      });
      window.showErrorMessage(
        "Some of the scans could not run as connectivity to database for the project " +
          this.projectName +
          " is not available. ",
      );
      return [];
    }
  }

  async generateSchemaYML(modelPath: Uri, modelName: string) {
    await this.blockUntilPythonBridgeIsInitalized();
    if (!this.pythonBridgeInitialized) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not execute query, because the Python bridge has not been initalized.",
        ),
      );
      this.telemetry.sendTelemetryError(
        "generateSchemaYMLPythonBridgeNotInitializedError",
      );
      return;
    }
    try {
      // Create filePath based on model location
      const currentDir = path.dirname(modelPath.fsPath);
      const location = path.join(currentDir, modelName + "_schema.yml");
      if (!existsSync(location)) {
        this.telemetry.sendTelemetryEvent("generateSchemaYML", {
          adapter: this.adapterType,
        });
        const columnsInRelation = await this.getColumnsOfModel(modelName);
        // Generate yml file content
        const fileContents = this.createYMLContent(
          columnsInRelation,
          modelName,
        );
        writeFileSync(location, fileContents);
        const doc = await workspace.openTextDocument(Uri.file(location));
        window.showTextDocument(doc);
      } else {
        window.showErrorMessage(
          `A file called ${modelName}_schema.yml already exists in ${currentDir}. If you want to generate the schema yml, please rename the other file or delete it if you want to generate the yml again.`,
        );
      }
    } catch (exc: any) {
      if (exc instanceof PythonException) {
        this.telemetry.sendTelemetryError("generateSchemaYMLPythonError", exc, {
          adapter: this.adapterType,
        });
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            "An error occured while trying to generate the schema yml " +
              exc.exception.message +
              ".",
          ),
        );
      }
      // Unknown error
      this.telemetry.sendTelemetryError("generateSchemaYMLUnknownError", exc, {
        adapter: this.adapterType,
      });
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Encountered an unknown issue:" + exc + ".",
        ),
      );
    }
  }

  async generateModel(
    sourceName: string,
    database: string,
    schema: string,
    tableName: string,
    sourcePath: string,
    tableIdentifier?: string,
  ) {
    await this.blockUntilPythonBridgeIsInitalized();
    if (!this.pythonBridgeInitialized) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not execute query, because the Python bridge has not been initalized.",
        ),
      );
      this.telemetry.sendTelemetryError(
        "generateModelPythonBridgeNotInitializedError",
      );
    }
    try {
      const prefix = workspace
        .getConfiguration("dbt")
        .get<string>("prefixGenerateModel", "base");

      // Map setting to fileName
      const fileNameTemplateMap: FileNameTemplateMap = {
        "{prefix}_{sourceName}_{tableName}": `${prefix}_${sourceName}_${tableName}`,
        "{prefix}_{sourceName}__{tableName}": `${prefix}_${sourceName}__${tableName}`,
        "{prefix}_{tableName}": `${prefix}_${tableName}`,
        "{tableName}": `${tableName}`,
      };

      // Default filename template
      let fileName = `${prefix}_${sourceName}_${tableName}`;

      const fileNameTemplate = workspace
        .getConfiguration("dbt")
        .get<string>(
          "fileNameTemplateGenerateModel",
          "{prefix}_{sourceName}_{tableName}",
        );

      this.telemetry.sendTelemetryEvent("generateModel", {
        prefix: prefix,
        filenametemplate: fileNameTemplate,
        adapter: this.adapterType,
      });

      // Parse setting to fileName
      if (fileNameTemplate in fileNameTemplateMap) {
        fileName = fileNameTemplateMap[fileNameTemplate];
      }
      // Create filePath based on source.yml location
      const location = path.join(sourcePath, fileName + ".sql");
      if (!existsSync(location)) {
        const _tableIdentifier = tableIdentifier ? tableIdentifier : tableName;
        const columnsInRelation = (await this.python?.lock(
          (python) =>
            python!`to_dict(project.get_columns_in_relation(project.create_relation(${database}, ${schema}, ${_tableIdentifier})))`,
        )) as any[];
        console.log(columnsInRelation);

        const fileContents = `with source as (
      select * from {{ source('${sourceName}', '${tableName}') }}
),
renamed as (
    select
        ${columnsInRelation
          .map((column) => `{{ adapter.quote("${column.column}") }}`)
          .join(",\n        ")}

    from source
)
select * from renamed
  `;
        writeFileSync(location, fileContents);
        const doc = await workspace.openTextDocument(Uri.file(location));
        window.showTextDocument(doc);
      } else {
        window.showErrorMessage(
          `A model called ${fileName} already exists in ${sourcePath}. If you want to generate the model, please rename the other model or delete it if you want to generate the model again.`,
        );
      }
    } catch (exc: any) {
      if (exc instanceof PythonException) {
        this.telemetry.sendTelemetryError("generateModelPythonError", exc, {
          adapter: this.adapterType,
        });
        window.showErrorMessage(
          "An error occured while trying to generate the model " +
            exc.exception.message,
        );
      }
      // Unknown error
      this.telemetry.sendTelemetryError("generateModelUnknownError", exc, {
        adapter: this.adapterType,
      });
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Encountered an unknown issue:" + exc + ".",
        ),
      );
    }
  }

  async getSummary(query: string) {
    this.telemetry.sendTelemetryEvent("getSummary");
    const compiledSql = await this.compileQuery(query);
    if (compiledSql === undefined) {
      // error handling done inside compileQuery
      return;
    }
    this.queryResultPanel.getSummary(compiledSql, this.adapterType);
  }

  async executeSQL(query: string) {
    await this.blockUntilPythonBridgeIsInitalized();
    if (
      await this.dbtProjectContainer.showDbtNotInstalledErrorMessageIfDbtIsNotInstalled()
    ) {
      return;
    }
    if (!this.pythonBridgeInitialized) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not execute query, because the Python bridge has not been initalized.",
        ),
      );
      this.telemetry.sendTelemetryError(
        "executeSQLPythonBridgeNotInitialized",
        undefined,
        { adapter: this.adapterType },
      );
      return;
    }
    const limit = workspace
      .getConfiguration("dbt")
      .get<number>("queryLimit", 500);

    if (limit <= 0) {
      window.showErrorMessage("Please enter a positive number for query limit");
      return;
    }
    const queryTemplate = workspace
      .getConfiguration("dbt")
      .get<string>(
        "queryTemplate",
        "select * from ({query}\n) as query limit {limit}",
      );

    const limitQuery = queryTemplate
      .replace("{query}", () => query)
      .replace("{limit}", () => limit.toString());

    this.telemetry.sendTelemetryEvent(
      "executeSQL",
      {
        queryTemplate: queryTemplate,
        adapter: this.adapterType,
      },
      {
        limit: limit,
      },
    );

    // TODO: this should generate an event instead of directly going to the panel
    this.queryResultPanel.executeQuery(
      query,
      this.python?.lock(
        (python) => python!`to_dict(project.execute_sql(${limitQuery}))`,
      ) as Promise<ExecuteSQLResult>,
      this.adapterType,
    );
  }

  async dispose() {
    console.log(
      `Disposing project ${this.projectName} at ${this.projectRoot} with profile directory ${this.dbtProfilesDir}`,
    );
    try {
      await this.closePythonBridge();
    } catch (error) {} // We don't care about errors here.
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  static readAndParseProjectConfig(projectRoot: Uri) {
    const dbtProjectConfigLocation = path.join(
      projectRoot.fsPath,
      DBTProject.DBT_PROJECT_FILE,
    );
    const dbtProjectYamlFile = readFileSync(dbtProjectConfigLocation, "utf8");
    return parse(dbtProjectYamlFile, {
      strict: false,
      uniqueKeys: false,
      maxAliasCount: -1,
    });
  }

  static hashProjectRoot(projectRoot: string) {
    return crypto.createHash("md5").update(projectRoot).digest("hex");
  }

  private async blockUntilPythonBridgeIsInitalized() {
    let i = 0;
    while (!this.pythonBridgeInitialized && i < 10) {
      await new Promise((r) => setTimeout(r, 1000));
      i++;
    }
  }

  private async findModelInTargetfolder(modelPath: Uri, type: string) {
    if (this.targetPath === undefined) {
      return;
    }
    const baseName = path.basename(modelPath.fsPath);
    const targetModels = await workspace.findFiles(
      new RelativePattern(
        path.join(this.projectRoot.fsPath, this.targetPath),
        `${type}/**/${baseName}`,
      ),
    );
    if (targetModels.length > 0) {
      commands.executeCommand("vscode.open", targetModels[0], {
        preview: false,
        preserveFocus: true,
        viewColumn: ViewColumn.Beside,
      });
    }
  }

  private async findModelPaths(): Promise<string[]> {
    let modelPaths = await this.python?.lock(
      (python) => python!`to_dict(project.config.model_paths)`,
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
    let macroPaths = await this.python?.lock(
      (python) => python!`to_dict(project.config.macro_paths)`,
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
    let targetPath = await this.python?.lock(
      (python) => python!`to_dict(project.config.target_path)`,
    );
    if (!path.isAbsolute(targetPath)) {
      targetPath = path.join(this.projectRoot.fsPath, targetPath);
    }
    return targetPath;
  }

  private async findPackagesInstallPath(): Promise<string> {
    let packageInstallPath = await this.python?.lock(
      (python) => python!`to_dict(project.config.packages_install_path)`,
    );
    if (!path.isAbsolute(packageInstallPath)) {
      packageInstallPath = path.join(
        this.projectRoot.fsPath,
        packageInstallPath,
      );
    }
    return packageInstallPath;
  }

  private async refresh() {
    const projectConfig = DBTProject.readAndParseProjectConfig(
      this.projectRoot,
    );
    this.projectName = projectConfig.name;
    await this.initializePaths();
    const event = new ProjectConfigChangedEvent(this);
    this._onProjectConfigChanged.fire(event);
  }

  private async initializePaths() {
    this.targetPath = await this.findTargetPath();
    this.modelPaths = await this.findModelPaths();
    this.macroPaths = await this.findMacroPaths();
    this.packagesInstallPath = await this.findPackagesInstallPath();
  }
}
