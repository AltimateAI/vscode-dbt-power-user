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
import { statSync } from "fs";

export class DBTWorkspaceFolder implements Disposable {
  private watcher: FileSystemWatcher;
  private dbtProjects: DBTProject[] = [];
  private disposables: Disposable[] = [];

  constructor(
    @inject("DBTProjectFactory")
    private dbtProjectFactory: (
      path: Uri,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
      pythonPath: string,
    ) => DBTProject,
    private workspaceFolder: WorkspaceFolder,
    private _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
    private pythonPath: string
  ) {
    this.watcher = this.createConfigWatcher();
    this.disposables.push(this.watcher);
  }

  async discoverProjects() {
    const dbtProjectFiles = await workspace.findFiles(
      new RelativePattern(
        this.workspaceFolder,
        `**/${DBTProject.DBT_PROJECT_FILE}`
      ),
      new RelativePattern(this.workspaceFolder, `**/{${DBTProject.DBT_MODULES.join(',')}}`)
    );
    return dbtProjectFiles
      .filter((uri)  => statSync(uri.fsPath).isFile())
      .filter((uri) => this.notInVenv(uri.fsPath))
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
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private async registerDBTProject(uri: Uri) {
    const dbtProject = this.dbtProjectFactory(
      uri,
      this._onManifestChanged,
      this.pythonPath,
    );
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
