import { statSync } from "fs";
import { inject } from "inversify";
import * as path from "path";
import {
  Disposable,
  EventEmitter,
  FileSystemWatcher,
  RelativePattern,
  Uri,
  window,
  workspace,
  WorkspaceFolder,
} from "vscode";
import { DBTProject } from "./dbtProject";
import { ManifestCacheChangedEvent } from "./event/manifestCacheChangedEvent";

export class DBTWorkspaceFolder implements Disposable {
  private watcher: FileSystemWatcher;
  private dbtProjects: DBTProject[] = [];
  private disposables: Disposable[] = [];

  constructor(
    @inject("DBTProjectFactory")
    private dbtProjectFactory: (
      path: Uri,
      projectConfig: any,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>
    ) => DBTProject,
    private workspaceFolder: WorkspaceFolder,
    private _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>
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
      new RelativePattern(
        this.workspaceFolder,
        `**/{${DBTProject.DBT_MODULES.join(",")}}`
      )
    );
    const projectFiles = dbtProjectFiles
      .filter((uri) => statSync(uri.fsPath).isFile())
      .filter((uri) => this.notInVenv(uri.fsPath))
      .map((uri) => Uri.file(uri.path.split("/")!.slice(0, -1).join("/")));
    if (projectFiles.length > 20) {
      window.showWarningMessage(
        `dbt Power User detected ${projectFiles.length} projects in your work space, this will negatively affect performance.`
      );
    }
    return projectFiles.forEach((uri) => this.registerDBTProject(uri));
  }

  findDBTProject(uri: Uri): DBTProject | undefined {
    return this.dbtProjects.find((project) => project.contains(uri));
  }

  contains(uri: Uri) {
    return (
      uri.fsPath === this.workspaceFolder.uri.fsPath ||
      uri.fsPath.startsWith(this.workspaceFolder.uri.fsPath + path.sep)
    );
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
      DBTProject.readAndParseProjectConfig(uri),
      this._onManifestChanged
    );
    this.dbtProjects.push(dbtProject);
    // sorting the dbt projects descending by path ensures that we find the deepest path first
    this.dbtProjects.sort(
      (a, b) => -a.projectRoot.fsPath.localeCompare(b.projectRoot.fsPath)
    );
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
