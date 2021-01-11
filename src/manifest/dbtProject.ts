import { readFileSync } from "fs";
import { safeLoad } from "js-yaml";
import * as path from "path";
import { SourceFileWatchers } from "./handlers/sourceFileWatchers";
import { TargetWatchers } from "./handlers/targetWatchers";
import { DBTProjectLog } from "./handlers/dbtProjectLog";
import { setupWatcherHandler } from "../utils";
import {
  Disposable,
  EventEmitter,
  RelativePattern,
  Uri,
  workspace,
} from "vscode";
import { ProjectConfigChangedEvent } from "./event/projectConfigChangedEvent";
import { dbtProjectContainer } from "./dbtProjectContainer";
import {
  DBTCommandFactory,
  RunModelParams,
} from "../dbt_client/dbtCommandFactory";
import { ManifestCacheChangedEvent } from "./event/manifestCacheChangedEvent";

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

  readonly projectRoot: Uri;
  private _onProjectConfigChanged = new EventEmitter<ProjectConfigChangedEvent>();
  public onProjectConfigChanged = this._onProjectConfigChanged.event;
  private sourceFileWatchers = new SourceFileWatchers(
    this.onProjectConfigChanged
  );
  public onSourceFileChanged = this.sourceFileWatchers.onSourceFileChanged;
  private dbtProjectLog = new DBTProjectLog(this.onProjectConfigChanged);
  private disposables: Disposable[] = [
    this.sourceFileWatchers,
    this.dbtProjectLog,
    this._onProjectConfigChanged,
  ];

  constructor(
    path: Uri,
    _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>
  ) {
    this.projectRoot = path;

    const dbtProjectConfigWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(path, DBTProject.DBT_PROJECT_FILE)
    );

    setupWatcherHandler(dbtProjectConfigWatcher, () => this.tryRefresh());

    this.disposables.push(
      new TargetWatchers(
        _onManifestChanged,
        this.onProjectConfigChanged
      ),
      dbtProjectConfigWatcher,
      this.onSourceFileChanged(() =>
        dbtProjectContainer.listModels(this.projectRoot)
      )
    );
  }

  async tryRefresh() {
    try {
      await this.refresh();
    } catch (error) {
      console.log(
        "We should never come here, means that our exceptions are not handled!",
        error
      );
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

  // TODO: maybe we should have a DBTClient for each project, so they can run in parallel.
  listModels() {
    dbtProjectContainer.listModels(this.projectRoot);
  }

  runModel(runModelParams: RunModelParams) {
    const runModelCommand = DBTCommandFactory.createRunModelCommand(
      this.projectRoot,
      runModelParams
    );
    dbtProjectContainer.addCommandToQueue(runModelCommand);
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }

  private readAndParseProjectConfig() {
    const dbtProjectYamlFile = readFileSync(
      path.join(this.projectRoot.fsPath, DBTProject.DBT_PROJECT_FILE),
      "utf8"
    );
    return safeLoad(dbtProjectYamlFile) as any;
  }

  private async refresh() {
    const projectConfig = this.readAndParseProjectConfig();

    const event = new ProjectConfigChangedEvent(
      this.projectRoot,
      projectConfig
    );
    this._onProjectConfigChanged.fire(event);
  }
}
