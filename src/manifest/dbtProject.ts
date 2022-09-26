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
import { ProfilesMetaData } from "../domain";
import { join } from "path";
import { QueryResultPanelLoader } from "../webview";

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
  private projectName?: string;
  private targetPath?: string;
  private sourcePaths?: string[];
  private profilesMetaData?: ProfilesMetaData;

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
    private queryResultPanelLoader: QueryResultPanelLoader,
    path: Uri,
    _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>
  ) {
    this.projectRoot = path;

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

    this.disposables.push(
      this.targetWatchersFactory.createTargetWatchers(
        _onManifestChanged,
        this.onProjectConfigChanged
      ),
      dbtProjectConfigWatcher,
      this.onSourceFileChanged(fireProjectChanged),
      this.sourceFileWatchers,
      this.dbtProjectLog
    );
  }

  async tryRefresh() {
    try {
      await this.refresh();
    } catch (error) {
      console.log("An error occurred while trying to refresh the project configuration", error);
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

  async rebuildManifest() {
    await this.dbtProjectContainer.rebuildManifest(this.projectRoot);
  }

  runModel(runModelParams: RunModelParams) {
    const runModelCommand = this.dbtCommandFactory.createRunModelCommand(
      this.projectRoot,
      runModelParams
    );
    this.dbtProjectContainer.addCommandToQueue(runModelCommand);
  }

  runTest(testName: string) {
    const testModelCommand = this.dbtCommandFactory.createTestModelCommand(
      this.projectRoot,
      testName
    );
    this.dbtProjectContainer.addCommandToQueue(testModelCommand);
  }

  runModelTest(modelName: string) {
    const testModelCommand = this.dbtCommandFactory.createTestModelCommand(
      this.projectRoot,
      modelName
    );
    this.dbtProjectContainer.addCommandToQueue(testModelCommand);
  }

  compileModel(runModelParams: RunModelParams) {
    const runModelCommand = this.dbtCommandFactory.createCompileModelCommand(
      this.projectRoot,
      runModelParams
    );
    this.dbtProjectContainer.addCommandToQueue(runModelCommand);
  }

  async compileQuery(query: string): Promise<string> {
    const command = this.dbtCommandFactory.createQueryPreviewCommand(query, this.projectRoot, this.profilesMetaData!.defaultTarget);

    const process = await this.dbtProjectContainer.executeCommand(command);
    try {
      const response = await process.complete();
      const result: any = JSON.parse(response);
      return result.compiled_sql;
    } catch (error: any) {
      const errorObj = JSON.parse(error);
      if (errorObj.message.includes("No module named 'dbt_osmosis")) {
        commands.executeCommand("dbtPowerUser.installDbtOsmosis");
      }
      window.showErrorMessage(errorObj.message);
      return errorObj.message + "\n\n" + "Detailed error information:\n" + JSON.stringify(errorObj, null, 2).replace(/\\n/g, "\n");
    }
  }

  showCompiledSql(modelPath: Uri) {
    this.findModelInTargetfolder(modelPath, "compiled");
  }

  showRunSQL(modelPath: Uri) {
    this.findModelInTargetfolder(modelPath, "run");
  }

  executeSQL(query: string, title: string) {
    this.queryResultPanelLoader
      .showWebview(title)
      .executeQuery(query, this.projectRoot!, this.profilesMetaData!.defaultTarget);
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
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
    const profileName = projectConfig["profile"] !== undefined ? projectConfig.profile : this.projectName!;
    this.profilesMetaData = this.readDbtProfile(profileName);

    const event = new ProjectConfigChangedEvent(
      this.projectRoot,
      this.projectName as string,
      this.profilesMetaData,
      this.targetPath,
      this.sourcePaths
    );
    this._onProjectConfigChanged.fire(event);
  }

  private readDbtProfile(projectName: string): ProfilesMetaData {
    const dbtProfilesDir = workspace
      .getConfiguration("dbt")
      .get<string>("profilesDirOverride") || join( os.homedir(), ".dbt");

    let profiles: any;
    try {
      profiles = parse(readFileSync(join(dbtProfilesDir, "profiles.yml"), "utf8"), {uniqueKeys: false });
    } catch(error) {
      window.showErrorMessage(`Could not read profiles.yml from ${dbtProfilesDir}: ${error}`);
      throw error;
    }

    if (profiles[projectName] === undefined 
      || profiles[projectName]["outputs"] === undefined 
      || typeof(profiles[projectName]["outputs"]) !== "object") {
      window.showErrorMessage(`Could not find dbt profile for '${projectName}' in ${dbtProfilesDir}. Did you create a dbt profile?`);
      throw new Error("No dbt profile has been created!");
    }

    return {
      targets: Object.keys(profiles[projectName].outputs),
      defaultTarget: profiles[projectName].target
    };
  }
}
