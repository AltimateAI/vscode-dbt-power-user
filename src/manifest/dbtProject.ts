import { existsSync, readFileSync, writeFileSync } from "fs";

import * as path from "path";
import { PythonException } from "python-bridge";
import {
  commands,
  Diagnostic,
  DiagnosticCollection,
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
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import {
  debounce,
  extendErrorWithSupportLinks,
  setupWatcherHandler,
} from "../utils";
import { QueryResultPanel } from "../webview_provider/queryResultPanel";
import {
  ManifestCacheChangedEvent,
  RebuildManifestStatusChange,
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
} from "../dbt_client/dbtIntegration";
import { DBTCoreProjectIntegration } from "../dbt_client/dbtCoreIntegration";
import { DBTCloudProjectIntegration } from "../dbt_client/dbtCloudIntegration";

interface FileNameTemplateMap {
  [key: string]: string;
}

export class DBTProject implements Disposable {
  static DBT_PROJECT_FILE = "dbt_project.yml";
  static MANIFEST_FILE = "manifest.json";

  static RESOURCE_TYPE_MODEL = "model";
  static RESOURCE_TYPE_ANALYSIS = "analysis";
  static RESOURCE_TYPE_SOURCE = "source";
  static RESOURCE_TYPE_EXPOSURE = "exposure";
  static RESOURCE_TYPE_SEED = "seed";
  static RESOURCE_TYPE_SNAPSHOT = "snapshot";
  static RESOURCE_TYPE_TEST = "test";

  readonly projectRoot: Uri;
  private projectConfig: any; // TODO: typing
  private dbtProjectIntegration: DBTProjectIntegration;

  private _onProjectConfigChanged =
    new EventEmitter<ProjectConfigChangedEvent>();
  public onProjectConfigChanged = this._onProjectConfigChanged.event;
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

  constructor(
    private PythonEnvironment: PythonEnvironment,
    private sourceFileWatchersFactory: SourceFileWatchersFactory,
    private dbtProjectLogFactory: DBTProjectLogFactory,
    private targetWatchersFactory: TargetWatchersFactory,
    private dbtCommandFactory: DBTCommandFactory,
    private terminal: DBTTerminal,
    private queryResultPanel: QueryResultPanel,
    private telemetry: TelemetryService,
    private dbtCoreIntegrationFactory: (
      path: Uri,
      projectConfigDiagnostics: DiagnosticCollection,
    ) => DBTCoreProjectIntegration,
    private dbtCloudIntegrationFactory: (
      path: Uri,
    ) => DBTCloudProjectIntegration,
    path: Uri,
    projectConfig: any,
    _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
  ) {
    this.projectRoot = path;
    this.projectConfig = projectConfig;

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
        this.onProjectConfigChanged,
      ),
      this.PythonEnvironment.onPythonEnvironmentChanged(() =>
        this.onPythonEnvironmentChanged(),
      ),
      this.sourceFileWatchers,
      this.projectConfigDiagnostics,
    );
  }

  public getProjectName() {
    return this.projectConfig.name;
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

  getMacroPaths() {
    return this.dbtProjectIntegration.getMacroPaths();
  }

  getManifestPath() {
    const targetPath = this.getTargetPath();
    if (!targetPath) {
      return;
    }
    return targetPath + "/manifest.json";
  }

  performDatapilotHealthcheck() {
    const manifestPath = this.getManifestPath();
    if (!manifestPath) {
      throw new Error(
        `Unable to find manifest path for project ${this.getProjectName()}`,
      );
    }
    return this.dbtProjectIntegration.performDatapilotHealthcheck({
      manifestPath,
    });
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
        debounce(
          async () => await this.rebuildManifest(),
          this.dbtProjectIntegration.getDebounceForRebuildManifest(),
        ),
      ),
    );
  }

  private async onPythonEnvironmentChanged() {
    await this.initialize();
  }

  private async refreshProjectConfig() {
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
    const event = new ProjectConfigChangedEvent(this);
    this._onProjectConfigChanged.fire(event);
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
    this._onRebuildManifestStatusChange.fire({
      project: this,
      inProgress: true,
    });
    await this.dbtProjectIntegration.rebuildManifest();
    this._onRebuildManifestStatusChange.fire({
      project: this,
      inProgress: false,
    });
  }

  runModel(runModelParams: RunModelParams) {
    const runModelCommand =
      this.dbtCommandFactory.createRunModelCommand(runModelParams);
    this.dbtProjectIntegration.runModel(runModelCommand);
    this.telemetry.sendTelemetryEvent("runModel");
  }

  buildModel(runModelParams: RunModelParams) {
    const buildModelCommand =
      this.dbtCommandFactory.createBuildModelCommand(runModelParams);
    this.dbtProjectIntegration.buildModel(buildModelCommand);
    this.telemetry.sendTelemetryEvent("buildModel");
  }

  buildProject() {
    const buildProjectCommand =
      this.dbtCommandFactory.createBuildProjectCommand();
    this.dbtProjectIntegration.buildProject(buildProjectCommand);
    this.telemetry.sendTelemetryEvent("buildProject");
  }

  runTest(testName: string) {
    const testModelCommand =
      this.dbtCommandFactory.createTestModelCommand(testName);
    this.dbtProjectIntegration.runTest(testModelCommand);
    this.telemetry.sendTelemetryEvent("runTest");
  }

  runModelTest(modelName: string) {
    const testModelCommand =
      this.dbtCommandFactory.createTestModelCommand(modelName);
    this.dbtProjectIntegration.runModelTest(testModelCommand);
    this.telemetry.sendTelemetryEvent("runModelTest");
  }

  compileModel(runModelParams: RunModelParams) {
    const compileModelCommand =
      this.dbtCommandFactory.createCompileModelCommand(runModelParams);
    this.dbtProjectIntegration.compileModel(compileModelCommand);
    this.telemetry.sendTelemetryEvent("compileModel");
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

  async getDBTVersion(): Promise<number[] | undefined> {
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

  async compileQuery(query: string): Promise<string | undefined> {
    this.telemetry.sendTelemetryEvent("compileQuery");
    try {
      return await this.dbtProjectIntegration.unsafeCompileQuery(query);
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

  async unsafeCompileQuery(query: string) {
    return this.dbtProjectIntegration.unsafeCompileQuery(query);
  }

  async getColumnsOfModel(modelName: string) {
    return this.dbtProjectIntegration.getColumnsOfModel(modelName);
  }

  async getColumnsOfSource(sourceName: string, tableName: string) {
    return this.dbtProjectIntegration.getColumnsOfSource(sourceName, tableName);
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

  async executeSQL(query: string) {
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
    // TODO: this should generate an event instead of directly going to the panel
    this.queryResultPanel.executeQuery(
      query,
      this.dbtProjectIntegration.executeSQL(query, limit),
    );
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
    const baseName = path.basename(modelPath.fsPath);
    const targetModels = await workspace.findFiles(
      new RelativePattern(targetPath, `${type}/**/${baseName}`),
    );
    if (targetModels.length > 0) {
      commands.executeCommand("vscode.open", targetModels[0], {
        preview: false,
        preserveFocus: true,
        viewColumn: ViewColumn.Beside,
      });
    }
  }
}
