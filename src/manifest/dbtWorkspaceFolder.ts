import {
  Disposable,
  EventEmitter,
  FileSystemWatcher,
  RelativePattern,
  Uri,
  workspace,
  WorkspaceFolder,
} from "vscode";
import { DBTProject } from "./dbtProject";
import * as path from "path";
import { ManifestCacheChangedEvent } from "./event/manifestCacheChangedEvent";
import { inject } from "inversify";

export class DBTWorkspaceFolder implements Disposable {
  private workspaceFolder: WorkspaceFolder;
  private watcher: FileSystemWatcher;
  private dbtProjects: DBTProject[] = [];
  private _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>;
  private disposables: Disposable[] = [];

  constructor(
    @inject("DBTProjectFactory")
    private dbtProjectFactory: (
      path: Uri,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>
    ) => DBTProject,
    workspaceFolder: WorkspaceFolder,
    _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>
  ) {
    this.workspaceFolder = workspaceFolder;
    this.watcher = this.createConfigWatcher();
    this.disposables.push(this.watcher);
    this._onManifestChanged = _onManifestChanged;
  }

  async discoverProjects() {
    const dbtProjectFiles = await workspace.findFiles(
      new RelativePattern(
        this.workspaceFolder,
        `**/${DBTProject.DBT_PROJECT_FILE}`
      ),
      new RelativePattern(this.workspaceFolder, `**/{${DBTProject.DBT_MODULES.join(',')}}`)
    );
    // TODO: could potentially have issues with casing @camfrout
    return dbtProjectFiles
      .filter((uri) => this.notInVenv(uri.path))
      .map((uri) => Uri.file(uri.path.split("/")!.slice(0, -1).join("/")))
      .forEach((uri) => this.registerDBTProject(uri));
  }

  findDBTProject(uri: Uri): DBTProject | undefined {
    return this.dbtProjects.find((project) => project.contains(uri));
  }

  contains(uri: Uri) {
    return uri.fsPath.startsWith(this.workspaceFolder.uri.fsPath + path.sep);
  }

  dispose() {
    this.dbtProjects.forEach((project) => project.dispose());
    this.disposables.forEach((disposable) => disposable.dispose());
  }

  private async registerDBTProject(uri: Uri) {
    const dbtProject = this.dbtProjectFactory(
      uri,
      this._onManifestChanged
    );
    await dbtProject.listModels();
    await dbtProject.tryRefresh();
    this.dbtProjects.push(dbtProject);
  }

  private unregisterDBTProject(uri: Uri) {
    const projectToDelete = this.dbtProjects.find(
      (dbtProject) => dbtProject.projectRoot.fsPath === uri.fsPath
    );
    if (projectToDelete === undefined) {
      return;
    }
    projectToDelete.dispose();
    this.dbtProjects.splice(this.dbtProjects.indexOf(projectToDelete));
  }

  private createConfigWatcher(): FileSystemWatcher {
    const watcher = workspace.createFileSystemWatcher(
      new RelativePattern(
        this.workspaceFolder,
        `**/${DBTProject.DBT_PROJECT_FILE}`
      )
    );

    const dirName = (uri: Uri) => Uri.file(path.dirname(uri.fsPath));

    watcher.onDidCreate((uri) => {
      if (this.notInVenv(uri.fsPath)) {
        this.registerDBTProject(dirName(uri));
      }
    });
    watcher.onDidDelete((uri) => this.unregisterDBTProject(dirName(uri)));
    this.disposables.push(watcher);
    return watcher;
  }

  private notInVenv(path: string): boolean {
    return !path.includes("site-packages");
  }
}
