import { readFileSync } from "fs";
import { safeLoad } from "js-yaml";
import * as path from "path";
import {
  SourceFileWatchers,
  SourceFileWatchersFactory,
} from "./modules/sourceFileWatchers";
import { TargetWatchersFactory } from "./modules/targetWatchers";
import { DBTProjectLog, DBTProjectLogFactory } from "./modules/dbtProjectLog";
import { setupWatcherHandler } from "../utils";
import {
  Disposable,
  EventEmitter,
  RelativePattern,
  Uri,
  workspace,
  Event,
  commands,
} from "vscode";
import { ProjectConfigChangedEvent } from "./event/projectConfigChangedEvent";
import { DBTProjectContainer } from "./dbtProjectContainer";
import {
  DBTCommandFactory,
  RunModelParams,
} from "../dbt_client/dbtCommandFactory";
import { ManifestCacheChangedEvent } from "./event/manifestCacheChangedEvent";
import { Reporter } from "../reporter";

export class DBTProject implements Disposable {
  static DBT_PROJECT_FILE = "dbt_project.yml";
  static DBT_MODULES = "dbt_modules";
  static MANIFEST_FILE = "manifest.json";
  static RUN_RESULTS_FILE = "run_results.json";
  static TARGET_PATH_VAR = "target-path";
  static SOURCE_PATHS_VAR = "source-paths";

  static RESOURCE_TYPE_MODEL = "model";
  static RESOURCE_TYPE_SOURCE = "source";
  static RESOURCE_TYPE_SEED = "seed";
  static RESOURCE_TYPE_SNAPSHOT = "snapshot";

  readonly projectRoot: Uri;
  private projectName: string;
  private targetPath: string;
  private sourcePaths: string[];

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
    private reporter: Reporter,
    path: Uri,
    _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>
  ) {
    this.projectRoot = path;

    const projectConfig = this.readAndParseProjectConfig();

    this.projectName = projectConfig.name;
    this.targetPath = projectConfig[DBTProject.TARGET_PATH_VAR] as string;
    this.sourcePaths = projectConfig[DBTProject.SOURCE_PATHS_VAR] as string[];

    const dbtProjectConfigWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(path, DBTProject.DBT_PROJECT_FILE)
    );

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
      this.onSourceFileChanged(() => this.listModels()),
      this.sourceFileWatchers,
      this.dbtProjectLog
    );
  }

  async tryRefresh() {
    try {
      await this.refresh();
    } catch (error) {
      this.reporter.sendException(error);
    }
  }

  findPackageName(uri: Uri): string | undefined {
    const documentPath = uri.path;
    // TODO: could potentially have issues with casing @camfrout
    const pathSegments = documentPath
      .replace(new RegExp(this.projectRoot.path + "/", "g"), "")
      .split("/");

    const insidePackage =
      pathSegments.length > 1 && pathSegments[0] === DBTProject.DBT_MODULES;

    if (insidePackage) {
      return pathSegments[1];
    }
    return undefined;
  }

  contains(uri: Uri) {
    return uri.fsPath.startsWith(this.projectRoot.fsPath);
  }

  listModels() {
    this.dbtProjectContainer.listModels(this.projectRoot);
  }

  runModel(runModelParams: RunModelParams) {
    const runModelCommand = this.dbtCommandFactory.createRunModelCommand(
      this.projectRoot,
      runModelParams
    );
    this.dbtProjectContainer.addCommandToQueue(runModelCommand);
  }

  compileModel(runModelParams: RunModelParams) {
    const runModelCommand = this.dbtCommandFactory.createCompileModelCommand(
      this.projectRoot,
      runModelParams
    );
    this.dbtProjectContainer.addCommandToQueue(runModelCommand);
  }

  showCompiledSql(modelPath: Uri) {
    this.findModelInTargetfolder(modelPath, "compiled");
  }

  showRanSQL(modelPath: Uri) {
    this.findModelInTargetfolder(modelPath, "run");
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }

  private readAndParseProjectConfig() {
    try {
      const dbtProjectYamlFile = readFileSync(
        path.join(this.projectRoot.fsPath, DBTProject.DBT_PROJECT_FILE),
        "utf8"
      );
      return safeLoad(dbtProjectYamlFile) as any;
    } catch (error) {
      console.log(error);
      return {
        name: "",
        targetPath: "target",
        sourcePaths: ["models"],
      };
    }
  }

  private async findModelInTargetfolder(modelPath: Uri, type: string) {
    const baseName = path.basename(modelPath.fsPath);
    const targetModels = await workspace.findFiles(
      new RelativePattern(
        this.projectRoot,
        `${this.targetPath}/${type}/**/${baseName}`
      )
    );
    if (targetModels.length > 0) {
      commands.executeCommand("vscode.open", targetModels[0], {
        preview: false,
      });
    }
  }

  private async refresh() {
    const projectConfig = this.readAndParseProjectConfig();

    this.projectName = projectConfig.name;
    this.targetPath = projectConfig[DBTProject.TARGET_PATH_VAR] as string;
    this.sourcePaths = projectConfig[DBTProject.SOURCE_PATHS_VAR] as string[];

    const event = new ProjectConfigChangedEvent(
      this.projectRoot,
      this.projectName,
      this.targetPath,
      this.sourcePaths
    );
    this._onProjectConfigChanged.fire(event);
  }
}
