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
import { YAMLError, parse } from "yaml";
import {
  DBTCommandFactory,
  RunModelParams,
} from "../dbt_client/dbtCommandFactory";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { EnvironmentVariables } from "../domain";
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

interface ResolveReferenceResult {
  database: string;
  schema: string;
  alias: string;
}

export class DBTProject implements Disposable {
  static DBT_PROJECT_FILE = "dbt_project.yml";
  static DBT_PROFILES_FILE = "profiles.yml";
  static DBT_MODULES = ["dbt_modules", "dbt_packages"];
  static MANIFEST_FILE = "manifest.json";
  static RUN_RESULTS_FILE = "run_results.json";
  static TARGET_PATH_VAR = "target-path";
  static SOURCE_PATHS_VAR = ["source-paths", "model-paths"];
  static MACRO_PATH_VAR = "macro-paths";

  static RESOURCE_TYPE_MODEL = "model";
  static RESOURCE_TYPE_SOURCE = "source";
  static RESOURCE_TYPE_SEED = "seed";
  static RESOURCE_TYPE_SNAPSHOT = "snapshot";
  static RESOURCE_TYPE_TEST = "test";

  readonly projectRoot: Uri;
  readonly dbtProfilesDir: string; // vscode.Uri doesn't support relative urls
  private adapterType: string = "unknown";
  private projectName: string;
  private targetPath: string;
  private sourcePaths: string[];
  private macroPaths: string[];
  private python?: PythonBridge;
  private pythonBridgeInitialized = false;

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
    console.log("Using profile directory " + this.dbtProfilesDir);
    this.projectName = projectConfig.name;
    this.targetPath = this.findTargetPath(projectConfig);
    console.log("Using target path " + this.targetPath);
    this.sourcePaths = this.findSourcePaths(projectConfig);
    this.macroPaths = this.findMacroPaths(projectConfig);

    console.log(
      `Registering project ${this.projectName} at ${this.projectRoot}`,
    );

    const dbtProjectConfigWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(path, DBTProject.DBT_PROJECT_FILE),
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

    this.sourceFileWatchers =
      this.sourceFileWatchersFactory.createSourceFileWatchers(
        this.onProjectConfigChanged,
      );
    this.onSourceFileChanged = this.sourceFileWatchers.onSourceFileChanged;

    this.dbtProjectLog = this.dbtProjectLogFactory.createDBTProjectLog(
      this.onProjectConfigChanged,
    );

    this.PythonEnvironment.onPythonEnvironmentChanged(() =>
      this.onPythonEnvironmentChanged(),
    );

    this.disposables.push(
      this.targetWatchersFactory.createTargetWatchers(
        _onManifestChanged,
        this.onProjectConfigChanged,
      ),
      dbtProjectConfigWatcher,
      this.onSourceFileChanged(fireProjectChanged),
      this.sourceFileWatchers,
      this.dbtProjectLog,
      this.rebuildManifestDiagnostics,
      this.pythonBridgeDiagnostics,
      this.projectConfigDiagnostics,
    );
    this.initializePythonBridge(
      this.PythonEnvironment.pythonPath,
      this.PythonEnvironment.environmentVariables,
    );
  }

  public getProjectName() {
    return this.projectName;
  }

  private async initializePythonBridge(
    pythonPath: string,
    envVars: EnvironmentVariables,
  ) {
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
    try {
      await this.python.ex`from dbt_integration import *`;
      await this.python
        .ex`project = DbtProject(project_dir=${this.projectRoot.fsPath}, profiles_dir=${this.dbtProfilesDir}, target_path=${this.targetPath})`;
      this.pythonBridgeInitialized = true;
      this.pythonBridgeDiagnostics.clear();
    } catch (exc: any) {
      if (exc instanceof PythonException) {
        // python errors can be about anything, so we just associate the error with the project file
        //  with a fixed range
        this.pythonBridgeDiagnostics.set(
          Uri.joinPath(this.projectRoot, DBTProject.DBT_PROJECT_FILE),
          [
            new Diagnostic(
              new Range(0, 0, 999, 999),
              "An error occured while initializing the dbt project, probably the Python interpreter is not correctly setup: " +
                exc.exception.message,
            ),
          ],
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
    // this methods already handle exceptions
    await this.tryRefresh();
    await this.rebuildManifest(true);
  }

  private async onPythonEnvironmentChanged() {
    this.initializePythonBridge(
      this.PythonEnvironment.pythonPath,
      this.PythonEnvironment.environmentVariables,
    );
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
        "An error occurred while trying to refresh the project configuration",
        error,
      );
      this.terminal.log(
        `An error occurred while trying to refresh the project configuration: ${error}`,
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

    const insidePackage =
      pathSegments.length > 1 &&
      DBTProject.DBT_MODULES.includes(pathSegments[0]);

    if (insidePackage) {
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
          "The dbt manifest can't be rebuilt right now as the Python environment has not yet been initialized, check the problems panel for any detected problems.",
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

  async compileQuery(query: string): Promise<string | undefined> {
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
        return (
          "Exception: " +
          exc.exception.message +
          "\n\n" +
          "Detailed error information:\n" +
          exc
        );
      }
      this.telemetry.sendTelemetryError("compileQueryUnknownError", exc);
      // Unknown error
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Encountered an unknown issue: " + exc + ".",
        ),
      );
      return "Detailed error information:\n" + exc;
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

  async getColumnsInRelation(
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
    const refNode = (await this.python?.lock(
      (python) => python!`to_dict(project.get_ref_node(${modelName}))`,
    )) as ResolveReferenceResult;
    // Get columns
    if (!refNode) {
      return [];
    }
    return await this.python?.lock(
      (python) =>
        python!`to_dict(project.get_columns_in_relation(project.create_relation(${
          refNode.database
        }, ${refNode.schema}, ${refNode.alias || modelName})))`,
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
        const columnsInRelation = await this.getColumnsInRelation(modelName);
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

  async executeSQL(query: string) {
    await this.blockUntilPythonBridgeIsInitalized();
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
    );
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
    if (this.python !== undefined) {
      this.python.end();
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

  private findSourcePaths(projectConfig: any): string[] {
    return DBTProject.SOURCE_PATHS_VAR.reduce(
      (prev: string[], current: string) => {
        if (projectConfig[current] !== undefined) {
          return projectConfig[current] as string[];
        } else {
          return prev;
        }
      },
      ["models"],
    );
  }

  private findMacroPaths(projectConfig: any): string[] {
    if (projectConfig[DBTProject.MACRO_PATH_VAR] !== undefined) {
      return projectConfig[DBTProject.MACRO_PATH_VAR] as string[];
    }
    return ["macros"];
  }

  private findTargetPath(projectConfig: any): string {
    const targetPathOverride = workspace
      .getConfiguration("dbt")
      .get<string>("targetPathOverride");

    return (
      (targetPathOverride
        ? substituteSettingsVariables(targetPathOverride)
        : false) ||
      this.PythonEnvironment.environmentVariables.DBT_TARGET_PATH ||
      (projectConfig[DBTProject.TARGET_PATH_VAR]
        ? (projectConfig[DBTProject.TARGET_PATH_VAR] as string)
        : false) ||
      "target"
    );
  }

  private async refresh() {
    const projectConfig = DBTProject.readAndParseProjectConfig(
      this.projectRoot,
    );
    this.projectName = projectConfig.name;
    this.targetPath = this.findTargetPath(projectConfig);
    this.sourcePaths = this.findSourcePaths(projectConfig);
    this.macroPaths = this.findMacroPaths(projectConfig);
    const event = new ProjectConfigChangedEvent(
      this.projectRoot,
      this.projectName as string,
      this.targetPath,
      this.sourcePaths,
      this.macroPaths,
    );
    this._onProjectConfigChanged.fire(event);
  }
}
