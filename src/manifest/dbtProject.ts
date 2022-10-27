import { readFileSync } from "fs";
import { parse } from "yaml";
import * as path from "path";
import * as os from "os";
import {
  SourceFileWatchers,
  SourceFileWatchersFactory,
} from "./modules/sourceFileWatchers";
import { TargetWatchersFactory } from "./modules/targetWatchers";
import { DBTProjectLog, DBTProjectLogFactory } from "./modules/dbtProjectLog";
import { debounce, setupWatcherHandler } from "../utils";
import {
  Disposable,
  EventEmitter,
  RelativePattern,
  Uri,
  workspace,
  Event,
  commands,
  ViewColumn,
  window
} from "vscode";
import { ProjectConfigChangedEvent } from "./event/projectConfigChangedEvent";
import { DBTProjectContainer } from "./dbtProjectContainer";
import {
  DBTCommandFactory,
  RunModelParams,
} from "../dbt_client/dbtCommandFactory";
import { ManifestCacheChangedEvent } from "./event/manifestCacheChangedEvent";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { join } from "path";
import { QueryResultPanel } from "../webview_view/queryResultPanel";
import { PythonEnvironmentChangedEvent } from "../dbt_client/pythonEnvironmentChangedEvent";
import { PythonBridge, pythonBridge, PythonException } from "python-bridge";
import { vscodeEnvVars } from "../dbt_client";

export interface ExecuteSQLResult {
  table: {
    column_names: string[],
    rows: any[][],
  }
  raw_sql: string,
  compiled_sql: string,
}

interface CompilationResult {
  compiled_sql: string
}

export class DBTProject implements Disposable {
  static DBT_PROJECT_FILE = "dbt_project.yml";
  static DBT_MODULES = ["dbt_modules", "dbt_packages"];
  static MANIFEST_FILE = "manifest.json";
  static RUN_RESULTS_FILE = "run_results.json";
  static TARGET_PATH_VAR = "target-path";
  static SOURCE_PATHS_VAR = ["source-paths", "model-paths"];

  static RESOURCE_TYPE_MODEL = "model";
  static RESOURCE_TYPE_SOURCE = "source";
  static RESOURCE_TYPE_SEED = "seed";
  static RESOURCE_TYPE_SNAPSHOT = "snapshot";
  static RESOURCE_TYPE_TEST = "test";

  readonly projectRoot: Uri;
  readonly dbtProfilesDir: string; // vscode.Uri doesn't support relative urls
  private projectName?: string;
  private targetPath?: string;
  private sourcePaths?: string[];
  private python?: PythonBridge;
  private pythonBridgeInitialized = false;

  private _onProjectConfigChanged = new EventEmitter<ProjectConfigChangedEvent>();
  public onProjectConfigChanged = this._onProjectConfigChanged.event;
  private sourceFileWatchers: SourceFileWatchers;
  public onSourceFileChanged: Event<void>;
  private dbtProjectLog: DBTProjectLog;
  private disposables: Disposable[] = [this._onProjectConfigChanged];

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private sourceFileWatchersFactory: SourceFileWatchersFactory,
    private dbtProjectLogFactory: DBTProjectLogFactory,
    private targetWatchersFactory: TargetWatchersFactory,
    private dbtCommandFactory: DBTCommandFactory,
    private terminal: DBTTerminal,
    private queryResultPanel: QueryResultPanel,
    path: Uri,
    _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
    pythonPath: string,
  ) {
    this.projectRoot = path;
    this.dbtProfilesDir = workspace.getConfiguration("dbt").get<string>("profilesDirOverride")
    || process.env.DBT_PROFILES_DIR
    || join(os.homedir(), ".dbt");

    const dbtProjectConfigWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(path, DBTProject.DBT_PROJECT_FILE)
    );

    const fireProjectChanged = debounce(async () => await this.rebuildManifest(), 2000);

    setupWatcherHandler(dbtProjectConfigWatcher, () => this.tryRefresh());

    this.sourceFileWatchers = this.sourceFileWatchersFactory.createSourceFileWatchers(
      this.onProjectConfigChanged
    );
    this.onSourceFileChanged = this.sourceFileWatchers.onSourceFileChanged;

    this.dbtProjectLog = this.dbtProjectLogFactory.createDBTProjectLog(
      this.onProjectConfigChanged
    );

    dbtProjectContainer.onPythonEnvironmentChanged((event) => this.onPythonEnvironmentChanged(event));

    this.disposables.push(
      this.targetWatchersFactory.createTargetWatchers(
        _onManifestChanged,
        this.onProjectConfigChanged
      ),
      dbtProjectConfigWatcher,
      this.onSourceFileChanged(fireProjectChanged),
      this.sourceFileWatchers,
      this.dbtProjectLog,
    );
    this.initializePythonBridge(pythonPath);
  }

  private async initializePythonBridge(pythonPath: string) {
    if (this.python !== undefined) {
      // Python env has changed
      this.pythonBridgeInitialized = false;
      this.python.end();
    }
    this.python = pythonBridge({
      python: pythonPath,
      cwd: this.projectRoot.fsPath,
      env: {
        ...vscodeEnvVars(),
        PYTHONPATH: __dirname,
      },
      detached: true,
    });
    try {
      await this.python.ex`from dbt_integration import *`;
      await this.python.ex`project = DbtProject(project_dir=${this.projectRoot.fsPath}, profiles_dir=${this.dbtProfilesDir})`;
      // now we can accept project method invocations on the python env.
      this.pythonBridgeInitialized = true;
    }catch (exc: any) {
      if (exc instanceof PythonException) {
        window.showErrorMessage(
          "An error occured while initializing the dbt project: " + exc.exception.message
        );
        return;
      }
      window.showErrorMessage(
        "An unexpected error occured while initializing the dbt project: " + exc
      );
      return;

    }
    // this methods already handle exceptions
    await this.rebuildManifest();
    await this.tryRefresh();
  }

  private async onPythonEnvironmentChanged(event: PythonEnvironmentChangedEvent) {
    this.initializePythonBridge(event.pythonPath);
  }

  private async tryRefresh() {
    try {
      await this.refresh();
    } catch (error) {
      console.warn("An error occurred while trying to refresh the project configuration", error);
      this.terminal.log(`An error occurred while trying to refresh the project configuration: ${error}`);
    }
  }

  findPackageName(uri: Uri): string | undefined {
    const documentPath = uri.path;
    const pathSegments = documentPath
      .replace(new RegExp(this.projectRoot.path + "/", "g"), "")
      .split("/");

    const insidePackage =
      pathSegments.length > 1 && DBTProject.DBT_MODULES.includes(pathSegments[0]);

    if (insidePackage) {
      return pathSegments[1];
    }
    return undefined;
  }

  contains(uri: Uri) {
    return uri.fsPath.startsWith(this.projectRoot.fsPath + path.sep);
  }

  private async rebuildManifest() {
    if (!this.pythonBridgeInitialized) {
      window.showErrorMessage(
        "The dbt manifest can't be rebuild right now as the Python envirnoment has not yet been initialized, please try again later."
      );
      return;
    }
    try {
      await this.python?.lock(python => python!`to_dict(project.safe_parse_project())`);
    } catch(exc) {
      window.showErrorMessage(
        "An error occured while rebuilding the dbt manifest: " + exc
      );
    }
  }

  runModel(runModelParams: RunModelParams) {
    const runModelCommand = this.dbtCommandFactory.createRunModelCommand(
      this.projectRoot,
      this.dbtProfilesDir,
      runModelParams
    );
    this.dbtProjectContainer.addCommandToQueue(runModelCommand);
  }

  runTest(testName: string) {
    const testModelCommand = this.dbtCommandFactory.createTestModelCommand(
      this.projectRoot,
      this.dbtProfilesDir,
      testName
    );
    this.dbtProjectContainer.addCommandToQueue(testModelCommand);
  }

  runModelTest(modelName: string) {
    const testModelCommand = this.dbtCommandFactory.createTestModelCommand(
      this.projectRoot,
      this.dbtProfilesDir,
      modelName
    );
    this.dbtProjectContainer.addCommandToQueue(testModelCommand);
  }

  compileModel(runModelParams: RunModelParams) {
    const runModelCommand = this.dbtCommandFactory.createCompileModelCommand(
      this.projectRoot,
      this.dbtProfilesDir,
      runModelParams
    );
    this.dbtProjectContainer.addCommandToQueue(runModelCommand);
  }

  async compileQuery(query: string): Promise<string> {
    await this.blockUntilPythonBridgeIsInitalized();

    if(!this.pythonBridgeInitialized) {
      window.showErrorMessage("Could not compile query, because the Python bridge has not been initalized. If the issue persists, please open a Github issue.");
      throw Error("Could not initialize Python bridge");
    }
    try {
      const output = await this.python?.lock(python => python!`to_dict(project.compile_sql(${query}))`) as CompilationResult;
      return output.compiled_sql;
    } catch (exc: any) {
      if (exc instanceof PythonException) {
        window.showErrorMessage(
          "An error occured while trying to compile your query: " + exc.exception.message
        );
        return "Exception: " + exc.exception.message + "\n\n" + "Detailed error information:\n" + exc;
      }
      // Unknown error
      window.showErrorMessage(exc);
      return "Detailed error information:\n" + exc;
    }
  }

  showCompiledSql(modelPath: Uri) {
    this.findModelInTargetfolder(modelPath, "compiled");
  }

  showRunSQL(modelPath: Uri) {
    this.findModelInTargetfolder(modelPath, "run");
  }

  async executeSQL(query: string) {
    await this.blockUntilPythonBridgeIsInitalized();
    if(!this.pythonBridgeInitialized) {
      window.showErrorMessage("Could not execute query, because the Python bridge has not been initalized. If the issue persists, please open a Github issue.");
      throw Error("Could not initialize Python bridge");
    }
    const limit = workspace
      .getConfiguration("dbt")
      .get<number>("queryLimit", 200);

    const queryTemplate = workspace
      .getConfiguration("dbt")
      .get<string>("queryTemplate", "select * from ({query}) as query limit {limit}");

    const limitQuery = queryTemplate
      .replace("{query}", query)
      .replace("{limit}", limit.toString());

    this.queryResultPanel.executeQuery(query, this.python?.lock(python => python!`to_dict(project.execute_sql(${limitQuery}))`) as Promise<ExecuteSQLResult>);
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

  private readAndParseProjectConfig() {
    const dbtProjectConfigLocation = path.join(this.projectRoot.fsPath, DBTProject.DBT_PROJECT_FILE);
    const dbtProjectYamlFile = readFileSync(dbtProjectConfigLocation, "utf8");
    try {
      return parse(dbtProjectYamlFile, { uniqueKeys: false });
    } catch (error: any) {
      window.showErrorMessage(`Could not parse dbt_project_config.yml at '${dbtProjectConfigLocation}': ${error}`);
      throw error;
    }
  }

  private async blockUntilPythonBridgeIsInitalized() {
    let i = 0;
    while (!this.pythonBridgeInitialized && i < 10) {
      await new Promise(r => setTimeout(r, 1000));
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
        `${type}/**/${baseName}`
      )
    );
    if (targetModels.length > 0) {
      commands.executeCommand("vscode.open", targetModels[0], {
        preview: false,
        preserveFocus: true,
        viewColumn: ViewColumn.Beside
      });
    }
  }

  private findSourcePaths(projectConfig: any): string[] {
    return DBTProject.SOURCE_PATHS_VAR.reduce((prev: string[], current: string) => {
      if (projectConfig[current] !== undefined) {
        return projectConfig[current] as string[];
      } else {
        return prev;
      }
    }, ["models"]);
  }

  private findTargetPath(projectConfig: any): string {
    if (projectConfig[DBTProject.TARGET_PATH_VAR] !== undefined) {
      return projectConfig[DBTProject.TARGET_PATH_VAR] as string;
    }
    return "target";
  }

  private async refresh() {
    const projectConfig = this.readAndParseProjectConfig();
    this.projectName = projectConfig.name;
    this.targetPath = this.findTargetPath(projectConfig);
    this.sourcePaths = this.findSourcePaths(projectConfig);
    const event = new ProjectConfigChangedEvent(
      this.projectRoot,
      this.projectName as string,
      this.targetPath,
      this.sourcePaths
    );
    this._onProjectConfigChanged.fire(event);
  }
}
