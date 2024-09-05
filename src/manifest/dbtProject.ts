import { existsSync, readFileSync, writeFileSync } from "fs";

import * as path from "path";
import { PythonException } from "python-bridge";
import {
  CancellationToken,
  commands,
  Diagnostic,
  DiagnosticCollection,
  Disposable,
  Event,
  EventEmitter,
  FileSystemWatcher,
  languages,
  Range,
  RelativePattern,
  Uri,
  ViewColumn,
  window,
  workspace,
} from "vscode";
import { parse, YAMLError } from "yaml";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import {
  debounce,
  extendErrorWithSupportLinks,
  getColumnNameByCase,
  setupWatcherHandler,
} from "../utils";
import {
  ManifestCacheChangedEvent,
  RebuildManifestStatusChange,
  ManifestCacheProjectAddedEvent,
} from "./event/manifestCacheChangedEvent";
import { ProjectConfigChangedEvent } from "./event/projectConfigChangedEvent";
import { DBTProjectLog, DBTProjectLogFactory } from "./modules/dbtProjectLog";
import {
  SourceFileWatchers,
  SourceFileWatchersFactory,
} from "./modules/sourceFileWatchers";
import { TargetWatchersFactory } from "./modules/targetWatchers";
import { PythonEnvironment } from "./pythonEnvironment";
import { TelemetryService } from "../telemetry";
import * as crypto from "crypto";
import {
  DBTProjectIntegration,
  DBTCommandFactory,
  RunModelParams,
  Catalog,
  DBTNode,
  DBColumn,
  SourceNode,
  HealthcheckArgs,
} from "../dbt_client/dbtIntegration";
import { DBTCoreProjectIntegration } from "../dbt_client/dbtCoreIntegration";
import { DBTCloudProjectIntegration } from "../dbt_client/dbtCloudIntegration";
import { AltimateRequest, NoCredentialsError } from "../altimate";
import { ValidationProvider } from "../validation_provider";
import { ModelNode } from "../altimate";
import { ColumnMetaData, NodeMetaData } from "../domain";
import { AltimateConfigProps } from "../webview_provider/insightsPanel";
import { SharedStateService } from "../services/sharedStateService";
import { TelemetryEvents } from "../telemetry/events";
import { RunResultsEvent } from "./event/runResultsEvent";
import { DBTCoreCommandProjectIntegration } from "../dbt_client/dbtCoreCommandIntegration";

interface FileNameTemplateMap {
  [key: string]: string;
}

export class DBTProject implements Disposable {
  static DBT_PROJECT_FILE = "dbt_project.yml";
  static MANIFEST_FILE = "manifest.json";
  static CATALOG_FILE = "catalog.json";

  static RESOURCE_TYPE_MODEL = "model";
  static RESOURCE_TYPE_MACRO = "macro";
  static RESOURCE_TYPE_ANALYSIS = "analysis";
  static RESOURCE_TYPE_SOURCE = "source";
  static RESOURCE_TYPE_EXPOSURE = "exposure";
  static RESOURCE_TYPE_SEED = "seed";
  static RESOURCE_TYPE_SNAPSHOT = "snapshot";
  static RESOURCE_TYPE_TEST = "test";
  static RESOURCE_TYPE_METRIC = "semantic_model";

  readonly projectRoot: Uri;
  private projectConfig: any; // TODO: typing
  private dbtProjectIntegration: DBTProjectIntegration;

  private _onProjectConfigChanged =
    new EventEmitter<ProjectConfigChangedEvent>();
  public onProjectConfigChanged = this._onProjectConfigChanged.event;
  private _onRunResults = new EventEmitter<RunResultsEvent>();
  public onRunResults = this._onRunResults.event;
  private sourceFileWatchers: SourceFileWatchers;
  public onSourceFileChanged: Event<void>;
  private dbtProjectLog?: DBTProjectLog;
  private disposables: Disposable[] = [this._onProjectConfigChanged];
  private readonly projectConfigDiagnostics =
    languages.createDiagnosticCollection("dbt");
  public readonly projectHealth = languages.createDiagnosticCollection("dbt");
  private _onRebuildManifestStatusChange =
    new EventEmitter<RebuildManifestStatusChange>();
  readonly onRebuildManifestStatusChange =
    this._onRebuildManifestStatusChange.event;

  private dbSchemaCache: Record<string, ModelNode> = {};

  constructor(
    private PythonEnvironment: PythonEnvironment,
    private sourceFileWatchersFactory: SourceFileWatchersFactory,
    private dbtProjectLogFactory: DBTProjectLogFactory,
    private targetWatchersFactory: TargetWatchersFactory,
    private dbtCommandFactory: DBTCommandFactory,
    private terminal: DBTTerminal,
    private eventEmitterService: SharedStateService,
    private telemetry: TelemetryService,
    private dbtCoreIntegrationFactory: (
      path: Uri,
      projectConfigDiagnostics: DiagnosticCollection,
    ) => DBTCoreProjectIntegration,
    private dbtCoreCommandIntegrationFactory: (
      path: Uri,
      projectConfigDiagnostics: DiagnosticCollection,
    ) => DBTCoreCommandProjectIntegration,
    private dbtCloudIntegrationFactory: (
      path: Uri,
    ) => DBTCloudProjectIntegration,
    private altimate: AltimateRequest,
    private validationProvider: ValidationProvider,
    path: Uri,
    projectConfig: any,
    _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
  ) {
    this.projectRoot = path;
    this.projectConfig = projectConfig;

    this.validationProvider.validateCredentialsSilently();

    this.sourceFileWatchers =
      this.sourceFileWatchersFactory.createSourceFileWatchers(
        this.onProjectConfigChanged,
      );
    this.onSourceFileChanged = this.sourceFileWatchers.onSourceFileChanged;

    const dbtIntegrationMode = workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");

    switch (dbtIntegrationMode) {
      case "cloud":
        this.dbtProjectIntegration = this.dbtCloudIntegrationFactory(
          this.projectRoot,
        );
        break;
      case "corecommand":
        this.dbtProjectIntegration = this.dbtCoreCommandIntegrationFactory(
          this.projectRoot,
          this.projectConfigDiagnostics,
        );
        break;
      default:
        this.dbtProjectIntegration = this.dbtCoreIntegrationFactory(
          this.projectRoot,
          this.projectConfigDiagnostics,
        );
        break;
    }

    this.disposables.push(
      this.dbtProjectIntegration,
      this.targetWatchersFactory.createTargetWatchers(
        _onManifestChanged,
        this._onRunResults,
        this.onProjectConfigChanged,
      ),
      this.PythonEnvironment.onPythonEnvironmentChanged(() =>
        this.onPythonEnvironmentChanged(),
      ),
      this.sourceFileWatchers,
      this.projectConfigDiagnostics,
      this.onRunResults((event) => {
        this.invalidateCacheUsingLastRun(event.file);
      }),
    );

    this.terminal.debug(
      "DbtProject",
      `Created ${dbtIntegrationMode} dbt project ${this.getProjectName()} at ${
        this.projectRoot
      }`,
    );
  }

  private async invalidateCacheUsingLastRun(file: Uri) {
    const fileContent = readFileSync(file.fsPath, "utf8").toString();
    if (!fileContent) {
      return;
    }

    try {
      const runResults = JSON.parse(fileContent);
      for (const n of runResults["results"]) {
        if (n["unique_id"] in this.dbSchemaCache) {
          delete this.dbSchemaCache[n["unique_id"]];
        }
      }
    } catch (e) {
      this.terminal.error(
        "invalidateCacheUsingLastRun",
        `Unable to parse run_results.json ${e}`,
        e,
        true,
      );
    }
  }

  public getProjectName() {
    return this.projectConfig.name;
  }

  getDBTProjectFilePath() {
    return path.join(this.projectRoot.fsPath, DBTProject.DBT_PROJECT_FILE);
  }

  getTargetPath() {
    return this.dbtProjectIntegration.getTargetPath();
  }

  getPackageInstallPath() {
    return this.dbtProjectIntegration.getPackageInstallPath();
  }

  getModelPaths() {
    return this.dbtProjectIntegration.getModelPaths();
  }

  getSeedPaths() {
    return this.dbtProjectIntegration.getSeedPaths();
  }

  getMacroPaths() {
    return this.dbtProjectIntegration.getMacroPaths();
  }

  getManifestPath() {
    const targetPath = this.getTargetPath();
    if (!targetPath) {
      return;
    }
    return path.join(targetPath, DBTProject.MANIFEST_FILE);
  }

  getCatalogPath() {
    const targetPath = this.getTargetPath();
    if (!targetPath) {
      return;
    }
    return path.join(targetPath, DBTProject.CATALOG_FILE);
  }

  getPythonBridgeStatus() {
    return this.dbtProjectIntegration.getPythonBridgeStatus();
  }

  getAllDiagnostic(): Diagnostic[] {
    return this.dbtProjectIntegration.getAllDiagnostic();
  }

  async performDatapilotHealthcheck(args: AltimateConfigProps) {
    const manifestPath = this.getManifestPath();
    if (!manifestPath) {
      throw new Error(
        `Unable to find manifest path for project ${this.getProjectName()}`,
      );
    }
    const healthcheckArgs: HealthcheckArgs = { manifestPath };
    if (args.configType === "Manual") {
      healthcheckArgs.configPath = args.configPath;
    } else {
      if (args.configType === "Saas") {
        healthcheckArgs.config = args.config;
      }
      if (
        args.configType === "All" ||
        args.config_schema.some((i) => i.files_required.includes("Catalog"))
      ) {
        const docsGenerateCommand =
          this.dbtCommandFactory.createDocsGenerateCommand();
        docsGenerateCommand.focus = false;
        docsGenerateCommand.logToTerminal = false;
        docsGenerateCommand.showProgress = false;
        await this.dbtProjectIntegration.executeCommandImmediately(
          docsGenerateCommand,
        );
        healthcheckArgs.catalogPath = this.getCatalogPath();
        if (!healthcheckArgs.catalogPath) {
          throw new Error(
            `Unable to find catalog path for project ${this.getProjectName()}`,
          );
        }
      }
    }
    this.terminal.debug(
      "performDatapilotHealthcheck",
      "Performing healthcheck",
      healthcheckArgs,
    );
    const projectHealthcheck =
      await this.dbtProjectIntegration.performDatapilotHealthcheck(
        healthcheckArgs,
      );
    // temp fix: ideally datapilot should return absolute path
    for (const key in projectHealthcheck.model_insights) {
      for (const item of projectHealthcheck.model_insights[key]) {
        item.path = path.join(this.projectRoot.fsPath, item.original_file_path);
      }
    }
    return projectHealthcheck;
  }

  async initialize() {
    // ensure we watch all files and reflect changes
    // This is purely vscode watchers, no need for the project to be fully initialized
    const dbtProjectConfigWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(this.projectRoot, DBTProject.DBT_PROJECT_FILE),
    );
    setupWatcherHandler(dbtProjectConfigWatcher, async () => {
      await this.refreshProjectConfig();
      this.rebuildManifest();
    });
    await this.dbtProjectIntegration.initializeProject();
    await this.refreshProjectConfig();
    this.rebuildManifest();
    this.dbtProjectLog = this.dbtProjectLogFactory.createDBTProjectLog(
      this.onProjectConfigChanged,
    );

    // ensure all watchers are cleaned up
    this.disposables.push(
      this.dbtProjectLog,
      dbtProjectConfigWatcher,
      this.onSourceFileChanged(
        debounce(async () => {
          this.terminal.debug(
            "DBTProject",
            `SourceFileChanged event fired for "${this.getProjectName()}" at ${
              this.projectRoot
            }`,
          );
          await this.rebuildManifest();
        }, this.dbtProjectIntegration.getDebounceForRebuildManifest()),
      ),
    );

    this.terminal.debug(
      "DbtProject",
      `Initialized dbt project ${this.getProjectName()} at ${this.projectRoot}`,
    );
  }

  private async onPythonEnvironmentChanged() {
    this.terminal.debug(
      "DbtProject",
      `Python environment for dbt project ${this.getProjectName()} at ${
        this.projectRoot
      } has changed`,
    );
    await this.initialize();
  }

  async refreshProjectConfig() {
    this.terminal.debug(
      "DBTProject",
      `Going to refresh the project "${this.getProjectName()}" at ${
        this.projectRoot
      } configuration`,
    );
    try {
      this.projectConfig = DBTProject.readAndParseProjectConfig(
        this.projectRoot,
      );
      await this.dbtProjectIntegration.refreshProjectConfig();
      this.projectConfigDiagnostics.clear();
    } catch (error) {
      if (error instanceof YAMLError) {
        this.projectConfigDiagnostics.set(
          Uri.joinPath(this.projectRoot, DBTProject.DBT_PROJECT_FILE),
          [
            new Diagnostic(
              new Range(0, 0, 999, 999),
              "dbt_project.yml is invalid : " + error.message,
            ),
          ],
        );
      } else if (error instanceof PythonException) {
        this.projectConfigDiagnostics.set(
          Uri.joinPath(this.projectRoot, DBTProject.DBT_PROJECT_FILE),
          [
            new Diagnostic(
              new Range(0, 0, 999, 999),
              "dbt configuration is invalid : " + error.exception.message,
            ),
          ],
        );
      }
      this.terminal.debug(
        "DBTProject",
        `An error occurred while trying to refresh the project "${this.getProjectName()}" at ${
          this.projectRoot
        } configuration`,
        error,
      );
      this.telemetry.sendTelemetryError("projectConfigRefreshError", error);
    }
    const sourcePaths = this.getModelPaths();
    if (sourcePaths === undefined) {
      this.terminal.debug(
        "DBTProject",
        "sourcePaths is not defined in project in " + this.projectRoot.fsPath,
      );
    }
    const macroPaths = this.getMacroPaths();
    if (macroPaths === undefined) {
      this.terminal.debug(
        "DBTProject",
        "macroPaths is not defined in " + this.projectRoot.fsPath,
      );
    }
    const seedPaths = this.getSeedPaths();
    if (seedPaths === undefined) {
      this.terminal.debug(
        "DBTProject",
        "macroPaths is not defined in " + this.projectRoot.fsPath,
      );
    }
    if (sourcePaths && macroPaths && seedPaths) {
      const event = new ProjectConfigChangedEvent(this);
      this._onProjectConfigChanged.fire(event);
      this.terminal.debug(
        "DBTProject",
        `firing ProjectConfigChanged event for the project "${this.getProjectName()}" at ${
          this.projectRoot
        } configuration`,
        "targetPaths",
        this.getTargetPath(),
        "modelPaths",
        this.getModelPaths(),
        "seedPaths",
        this.getSeedPaths(),
        "macroPaths",
        this.getMacroPaths(),
        "packagesInstallPath",
        this.getPackageInstallPath(),
        "version",
        this.getDBTVersion(),
        "adapterType",
        this.getAdapterType(),
      );
    } else {
      this.terminal.warn(
        "DBTProject",
        "Could not send out ProjectConfigChangedEvent because project is not initialized properly. dbt path settings cannot be determined",
      );
    }
  }

  getAdapterType() {
    return this.dbtProjectIntegration.getAdapterType() || "unknown";
  }

  findPackageName(uri: Uri): string | undefined {
    const documentPath = uri.path;
    const pathSegments = documentPath
      .replace(new RegExp(this.projectRoot.path + "/", "g"), "")
      .split("/");
    const packagesInstallPath = this.getPackageInstallPath();
    if (packagesInstallPath && uri.fsPath.startsWith(packagesInstallPath)) {
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

  private async rebuildManifest() {
    this.terminal.debug(
      "DBTProject",
      `Going to rebuild the manifest for "${this.getProjectName()}" at ${
        this.projectRoot
      }`,
    );
    this._onRebuildManifestStatusChange.fire({
      project: this,
      inProgress: true,
    });
    await this.dbtProjectIntegration.rebuildManifest();
    this._onRebuildManifestStatusChange.fire({
      project: this,
      inProgress: false,
    });
    this.terminal.debug(
      "DBTProject",
      `Finished rebuilding the manifest for "${this.getProjectName()}" at ${
        this.projectRoot
      }`,
    );
  }

  async runModel(runModelParams: RunModelParams) {
    try {
      const runModelCommand =
        this.dbtCommandFactory.createRunModelCommand(runModelParams);
      await this.dbtProjectIntegration.runModel(runModelCommand);
      this.telemetry.sendTelemetryEvent("runModel");
    } catch (error) {
      this.handleNoCredentialsError(error);
    }
  }

  async buildModel(runModelParams: RunModelParams) {
    try {
      const buildModelCommand =
        this.dbtCommandFactory.createBuildModelCommand(runModelParams);
      await this.dbtProjectIntegration.buildModel(buildModelCommand);
      this.telemetry.sendTelemetryEvent("buildModel");
    } catch (error) {
      this.handleNoCredentialsError(error);
    }
  }

  async buildProject() {
    try {
      const buildProjectCommand =
        this.dbtCommandFactory.createBuildProjectCommand();
      await this.dbtProjectIntegration.buildProject(buildProjectCommand);
      this.telemetry.sendTelemetryEvent("buildProject");
    } catch (error) {
      this.handleNoCredentialsError(error);
    }
  }

  async runTest(testName: string) {
    try {
      const testModelCommand =
        this.dbtCommandFactory.createTestModelCommand(testName);
      await this.dbtProjectIntegration.runTest(testModelCommand);
      this.telemetry.sendTelemetryEvent("runTest");
    } catch (error) {
      this.handleNoCredentialsError(error);
    }
  }

  async runModelTest(modelName: string) {
    try {
      const testModelCommand =
        this.dbtCommandFactory.createTestModelCommand(modelName);
      this.dbtProjectIntegration.runModelTest(testModelCommand);
      await this.telemetry.sendTelemetryEvent("runModelTest");
    } catch (error) {
      this.handleNoCredentialsError(error);
    }
  }

  private handleNoCredentialsError(error: unknown) {
    if (error instanceof NoCredentialsError) {
      this.altimate.handlePreviewFeatures();
      return;
    }
    window.showErrorMessage((error as Error).message);
  }

  compileModel(runModelParams: RunModelParams) {
    const compileModelCommand =
      this.dbtCommandFactory.createCompileModelCommand(runModelParams);
    this.dbtProjectIntegration.compileModel(compileModelCommand);
    this.telemetry.sendTelemetryEvent("compileModel");
  }

  async generateDocsImmediately(args?: string[]) {
    const docsGenerateCommand =
      this.dbtCommandFactory.createDocsGenerateCommand();
    args?.forEach((arg) => docsGenerateCommand.addArgument(arg));
    docsGenerateCommand.focus = false;
    docsGenerateCommand.logToTerminal = false;
    await this.dbtProjectIntegration.executeCommandImmediately(
      docsGenerateCommand,
    );
    this.telemetry.sendTelemetryEvent("generateDocsImmediately");
  }

  generateDocs() {
    const docsGenerateCommand =
      this.dbtCommandFactory.createDocsGenerateCommand();
    this.dbtProjectIntegration.generateDocs(docsGenerateCommand);
    this.telemetry.sendTelemetryEvent("generateDocs");
  }

  debug() {
    const debugCommand = this.dbtCommandFactory.createDebugCommand();
    this.telemetry.sendTelemetryEvent("debug");
    return this.dbtProjectIntegration.debug(debugCommand);
  }

  installDeps() {
    this.telemetry.sendTelemetryEvent("installDeps");
    const installDepsCommand =
      this.dbtCommandFactory.createInstallDepsCommand();
    return this.dbtProjectIntegration.deps(installDepsCommand);
  }

  async compileNode(modelName: string): Promise<string | undefined> {
    this.telemetry.sendTelemetryEvent("compileNode");
    try {
      return await this.dbtProjectIntegration.unsafeCompileNode(modelName);
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
          "Could not compile model " +
            modelName +
            ": " +
            (exc as Error).message +
            ".",
        ),
      );
      return "Detailed error information:\n" + exc;
    }
  }

  async unsafeCompileNode(modelName: string): Promise<string | undefined> {
    this.telemetry.sendTelemetryEvent("unsafeCompileNode");
    return await this.dbtProjectIntegration.unsafeCompileNode(modelName);
  }

  async validateSql(request: { sql: string; dialect: string; models: any[] }) {
    try {
      const { sql, dialect, models } = request;
      return this.dbtProjectIntegration.validateSql(sql, dialect, models);
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
    try {
      return this.dbtProjectIntegration.validateSQLDryRun(query);
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

  getDBTVersion(): number[] | undefined {
    // TODO: do this when config or python env changes and cache value
    try {
      return this.dbtProjectIntegration.getVersion();
    } catch (exc) {
      window.showErrorMessage(
        extendErrorWithSupportLinks("Could not get dbt version." + exc),
      );
      this.telemetry.sendTelemetryError("getDBTVersionError", { error: exc });
    }
  }

  async compileQuery(
    query: string,
    originalModelName: string | undefined = undefined,
  ): Promise<string | undefined> {
    this.telemetry.sendTelemetryEvent("compileQuery");
    try {
      return await this.dbtProjectIntegration.unsafeCompileQuery(
        query,
        originalModelName,
      );
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
          "Could not compile query: " + (exc as Error).message,
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

  async unsafeCompileQuery(
    query: string,
    originalModelName: string | undefined = undefined,
  ) {
    return this.dbtProjectIntegration.unsafeCompileQuery(
      query,
      originalModelName,
    );
  }

  async getColumnsOfModel(modelName: string) {
    return this.dbtProjectIntegration.getColumnsOfModel(modelName);
  }

  async getColumnsOfSource(sourceName: string, tableName: string) {
    return this.dbtProjectIntegration.getColumnsOfSource(sourceName, tableName);
  }

  async getColumnValues(model: string, column: string) {
    this.telemetry.startTelemetryEvent(
      TelemetryEvents["DocumentationEditor/GetDistinctColumnValues"],
      { column, model },
    );

    try {
      this.terminal.debug(
        "getColumnValues",
        "finding distinct values for column",
        true,
        { model, column },
      );
      const query = `select ${column} from {{ ref('${model}')}} group by ${column}`;
      const queryExecution = await this.dbtProjectIntegration.executeSQL(
        query,
        100, // setting this 100 as executeSql needs a limit and distinct values will be usually less in number
        model,
      );
      const result = await queryExecution.executeQuery();

      this.telemetry.endTelemetryEvent(
        TelemetryEvents["DocumentationEditor/GetDistinctColumnValues"],
        undefined,
        { column, model },
      );

      return result.table.rows.flat();
    } catch (error) {
      this.telemetry.endTelemetryEvent(
        TelemetryEvents["DocumentationEditor/GetDistinctColumnValues"],
        error,
        { column, model },
      );
    }
  }

  async getBulkSchemaFromDB(
    req: DBTNode[],
    cancellationToken: CancellationToken,
  ) {
    return this.dbtProjectIntegration.getBulkSchemaFromDB(
      req,
      cancellationToken,
    );
  }

  async validateWhetherSqlHasColumns(sql: string) {
    const dialect = this.getAdapterType();
    try {
      return await this.dbtProjectIntegration.validateWhetherSqlHasColumns(
        sql,
        dialect,
      );
    } catch (e) {
      this.terminal.error(
        "validateWhetherSqlHasColumnsError",
        "Error while validating whether sql has columns",
        e,
        true,
      );
      return false;
    }
  }

  async getCatalog(): Promise<Catalog> {
    try {
      return this.dbtProjectIntegration.getCatalog();
    } catch (exc: any) {
      if (exc instanceof PythonException) {
        this.telemetry.sendTelemetryError("catalogPythonError", exc, {
          adapter: this.getAdapterType(),
        });
        window.showErrorMessage(
          "Some of the scans could not run as connectivity to database for the project " +
            this.getProjectName() +
            " is not available. ",
        );
        return [];
      }
      // Unknown error
      this.telemetry.sendTelemetryError("catalogUnknownError", exc, {
        adapter: this.getAdapterType(),
      });
      window.showErrorMessage(
        "Some of the scans could not run as connectivity to database for the project " +
          this.getProjectName() +
          " is not available. ",
      );
      return [];
    }
  }

  async generateSchemaYML(modelPath: Uri, modelName: string) {
    try {
      // Create filePath based on model location
      const currentDir = path.dirname(modelPath.fsPath);
      const location = path.join(currentDir, modelName + "_schema.yml");
      if (!existsSync(location)) {
        this.telemetry.sendTelemetryEvent("generateSchemaYML", {
          adapter: this.getAdapterType(),
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
          adapter: this.getAdapterType(),
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
        adapter: this.getAdapterType(),
      });
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not generate schema yaml: " + (exc as Error).message,
        ),
      );
    }
  }

  async generateModel(
    sourceName: string,
    tableName: string,
    sourcePath: string,
  ) {
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
        adapter: this.getAdapterType(),
      });

      // Parse setting to fileName
      if (fileNameTemplate in fileNameTemplateMap) {
        fileName = fileNameTemplateMap[fileNameTemplate];
      }
      // Create filePath based on source.yml location
      const location = path.join(sourcePath, fileName + ".sql");
      if (!existsSync(location)) {
        const columnsInRelation = await this.getColumnsOfSource(
          sourceName,
          tableName,
        );
        this.terminal.debug(
          "dbtProject:generateModel",
          `Generating columns for source ${sourceName} and table ${tableName}`,
          columnsInRelation,
        );

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
          adapter: this.getAdapterType(),
        });
        window.showErrorMessage(
          "An error occured while trying to generate the model " +
            exc.exception.message,
        );
      }
      // Unknown error
      this.telemetry.sendTelemetryError("generateModelUnknownError", exc, {
        adapter: this.getAdapterType(),
      });
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "An error occured while trying to generate the model:" + exc + ".",
        ),
      );
    }
  }

  async executeSQL(query: string, modelName: string) {
    // if user added a semicolon at the end, let,s remove it.
    query = query.replace(/;\s*$/, "");
    const limit = workspace
      .getConfiguration("dbt")
      .get<number>("queryLimit", 500);

    if (limit <= 0) {
      window.showErrorMessage("Please enter a positive number for query limit");
      return;
    }
    this.telemetry.sendTelemetryEvent("executeSQL", {
      adapter: this.getAdapterType(),
      limit: limit.toString(),
    });
    this.terminal.debug("executeSQL", query, {
      adapter: this.getAdapterType(),
      limit: limit.toString(),
    });

    this.eventEmitterService.fire({
      command: "executeQuery",
      payload: {
        query,
        fn: this.dbtProjectIntegration.executeSQL(query, limit, modelName),
        projectName: this.getProjectName(),
      },
    });
  }

  async dispose() {
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

  private async findModelInTargetfolder(modelPath: Uri, type: string) {
    const targetPath = this.getTargetPath();
    if (!targetPath) {
      return;
    }
    const relativePath = path.relative(
      this.projectRoot.fsPath,
      modelPath.fsPath,
    );

    const targetModels = await workspace.findFiles(
      new RelativePattern(targetPath, path.join(type, "**", relativePath)),
    );
    if (targetModels.length > 0) {
      commands.executeCommand("vscode.open", targetModels[0], {
        preview: false,
        preserveFocus: true,
        viewColumn: ViewColumn.Beside,
      });
    }
  }

  static isResourceNode(resource_type: string): boolean {
    return (
      resource_type === DBTProject.RESOURCE_TYPE_MODEL ||
      resource_type === DBTProject.RESOURCE_TYPE_SEED ||
      resource_type === DBTProject.RESOURCE_TYPE_ANALYSIS ||
      resource_type === DBTProject.RESOURCE_TYPE_SNAPSHOT
    );
  }
  static isResourceHasDbColumns(resource_type: string): boolean {
    return (
      resource_type === DBTProject.RESOURCE_TYPE_MODEL ||
      resource_type === DBTProject.RESOURCE_TYPE_SEED ||
      resource_type === DBTProject.RESOURCE_TYPE_SNAPSHOT
    );
  }

  static getNonEphemeralParents(
    event: ManifestCacheProjectAddedEvent,
    keys: string[],
  ): string[] {
    const { nodeMetaMap, graphMetaMap } = event;
    const { parents } = graphMetaMap;
    const parentSet = new Set<string>();
    const queue = keys;
    const visited: Record<string, boolean> = {};
    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (visited[curr]) {
        continue;
      }
      visited[curr] = true;
      const parent = parents.get(curr);
      if (!parent) {
        continue;
      }
      for (const n of parent.nodes) {
        const splits = n.key.split(".");
        const resource_type = splits[0];
        if (resource_type !== DBTProject.RESOURCE_TYPE_MODEL) {
          parentSet.add(n.key);
          continue;
        }
        if (nodeMetaMap.get(splits[2])?.config.materialized === "ephemeral") {
          queue.push(n.key);
        } else {
          parentSet.add(n.key);
        }
      }
    }
    return Array.from(parentSet);
  }

  mergeColumnsFromDB(
    node: Pick<ModelNode, "columns">,
    columnsFromDB: DBColumn[],
  ) {
    if (!columnsFromDB || columnsFromDB.length === 0) {
      return false;
    }
    if (columnsFromDB.length > 100) {
      // Flagging events where more than 100 columns are fetched from db to get a sense of how many of these happen
      this.telemetry.sendTelemetryEvent("excessiveColumnsFetchedFromDB");
    }
    const columnsFromManifest: Record<string, ColumnMetaData> = {};
    Object.entries(node.columns).forEach(([k, v]) => {
      columnsFromManifest[getColumnNameByCase(k, this.getAdapterType())] = v;
    });

    for (const c of columnsFromDB) {
      const columnNameFromDB = getColumnNameByCase(
        c.column,
        this.getAdapterType(),
      );
      const existing_column = columnsFromManifest[columnNameFromDB];
      if (existing_column) {
        existing_column.data_type = (
          existing_column.data_type || c.dtype
        )?.toLowerCase();
        continue;
      }
      node.columns[columnNameFromDB] = {
        name: columnNameFromDB,
        data_type: c.dtype?.toLowerCase(),
        description: "",
      };
    }
    if (Object.keys(node.columns).length > columnsFromDB.length) {
      // Flagging events where columns fetched from db are less than the number of columns in the manifest
      this.telemetry.sendTelemetryEvent("possibleStaleSchema");
    }
    return true;
  }

  public findPackageVersion(packageName: string) {
    const version = this.dbtProjectIntegration.findPackageVersion(packageName);
    this.terminal.debug(
      "dbtProject:findPackageVersion",
      `found ${packageName} version: ${version}`,
    );
    return version;
  }

  async getBulkCompiledSql(
    event: ManifestCacheProjectAddedEvent,
    models: string[],
  ) {
    if (models.length === 0) {
      return {};
    }
    const { nodeMetaMap } = event;
    return this.dbtProjectIntegration.getBulkCompiledSQL(
      models
        .map((m) => nodeMetaMap.get(m.split(".")[2]))
        .filter(Boolean) as NodeMetaData[],
    );
  }

  async getNodesWithDBColumns(
    event: ManifestCacheProjectAddedEvent,
    modelsToFetch: string[],
    cancellationToken: CancellationToken,
  ) {
    const mappedNode: Record<string, ModelNode> = {};
    const relationsWithoutColumns: string[] = [];
    if (modelsToFetch.length === 0) {
      return { mappedNode, relationsWithoutColumns, mappedCompiledSql: {} };
    }
    const { nodeMetaMap, sourceMetaMap } = event;
    const bulkSchemaRequest: DBTNode[] = [];

    for (const key of modelsToFetch) {
      if (this.dbSchemaCache[key]) {
        this.telemetry.sendTelemetryEvent("dbSchemaCacheHit", { model: key });
        mappedNode[key] = this.dbSchemaCache[key];
        continue;
      }
      const splits = key.split(".");
      const resource_type = splits[0];
      if (resource_type === DBTProject.RESOURCE_TYPE_SOURCE) {
        const source = sourceMetaMap.get(splits[2]);
        const tableName = splits[3];
        if (!source) {
          continue;
        }
        const table = source?.tables.find((t) => t.name === tableName);
        if (!table) {
          continue;
        }
        bulkSchemaRequest.push({
          unique_id: key,
          name: source.name,
          resource_type,
          table: table.name,
        } as SourceNode);
        const node = {
          database: source.database,
          schema: source.schema,
          name: table.name,
          alias: table.identifier,
          uniqueId: key,
          columns: table.columns,
          path: table.path,
        };
        mappedNode[key] = node;
      } else if (DBTProject.isResourceNode(resource_type)) {
        const node = nodeMetaMap.get(splits[2]);
        if (!node) {
          continue;
        }
        if (DBTProject.isResourceHasDbColumns(resource_type)) {
          bulkSchemaRequest.push({
            unique_id: key,
            name: node.name,
            resource_type,
          });
        }
        mappedNode[key] = node;
      }
    }

    const dbSchemaRequest = bulkSchemaRequest.filter(
      (r) => r.resource_type !== DBTProject.RESOURCE_TYPE_MODEL,
    );

    const sqlglotSchemaRequest = bulkSchemaRequest.filter(
      (r) => r.resource_type === DBTProject.RESOURCE_TYPE_MODEL,
    );
    let startTime = Date.now();
    const sqlglotSchemaResponse = await this.getBulkCompiledSql(
      event,
      sqlglotSchemaRequest.map((r) => r.unique_id),
    );
    const compiledSqlTime = Date.now() - startTime;

    if (cancellationToken.isCancellationRequested) {
      return {
        mappedNode,
        relationsWithoutColumns,
        mappedCompiledSql: sqlglotSchemaResponse,
      };
    }

    const sqlglotSchemas: Record<string, DBColumn[]> = {};
    const dialect = this.getAdapterType();

    startTime = Date.now();
    // can't parallelize because underlying python lock
    for (const r of sqlglotSchemaRequest) {
      if (!sqlglotSchemaResponse[r.unique_id]) {
        dbSchemaRequest.push(r);
        continue;
      }

      try {
        const columns = await this.dbtProjectIntegration.fetchSqlglotSchema(
          sqlglotSchemaResponse[r.unique_id],
          dialect,
        );
        sqlglotSchemas[r.unique_id] = columns.map((c) => ({
          column: c,
          dtype: "string",
        }));
      } catch (e) {
        this.terminal.warn(
          "sqlglotSchemaFetchingFailed",
          `Error while sqlglot schema fetching for ${r.unique_id}`,
          true,
          e,
        );
        dbSchemaRequest.push(r);
      }
    }
    const sqlglotSchemaTime = Date.now() - startTime;

    if (cancellationToken.isCancellationRequested) {
      return {
        mappedNode,
        relationsWithoutColumns,
        mappedCompiledSql: sqlglotSchemaResponse,
      };
    }

    startTime = Date.now();
    const dbSchemaResponse =
      await this.dbtProjectIntegration.getBulkSchemaFromDB(
        dbSchemaRequest,
        cancellationToken,
      );
    const dbFetchTime = Date.now() - startTime;

    const bulkSchemaResponse = { ...dbSchemaResponse, ...sqlglotSchemas };

    for (const key of modelsToFetch) {
      if (!bulkSchemaRequest.find((r) => r.unique_id === key)) {
        continue;
      }
      const node = mappedNode[key];
      if (!node) {
        continue;
      }
      const dbColumnAdded = this.mergeColumnsFromDB(
        node,
        bulkSchemaResponse[key],
      );
      if (!dbColumnAdded) {
        relationsWithoutColumns.push(key);
      } else {
        // only adding to cache when successfully fetched columns from db
        this.dbSchemaCache[key] = mappedNode[key];
      }
    }

    console.log("getNodesWithDBColumnsTimings", {
      compiledSqlTime,
      sqlglotSchemaTime,
      dbFetchTime,
      modelInfosLength: modelsToFetch.length,
    });
    this.telemetry.sendTelemetryEvent("getNodesWithDBColumnsTimings", {
      compiledSqlTime: compiledSqlTime.toString(),
      sqlglotSchemaTime: sqlglotSchemaTime.toString(),
      dbFetchTime: dbFetchTime.toString(),
      modelInfosLength: modelsToFetch.length.toString(),
    });

    return {
      mappedNode,
      relationsWithoutColumns,
      mappedCompiledSql: sqlglotSchemaResponse,
    };
  }

  async applyDeferConfig(): Promise<void> {
    await this.dbtProjectIntegration.applyDeferConfig();
  }

  throwDiagnosticsErrorIfAvailable() {
    this.dbtProjectIntegration.throwDiagnosticsErrorIfAvailable();
  }
}
