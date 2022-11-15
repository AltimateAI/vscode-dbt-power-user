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
import { EnvironmentVariables } from "../domain";
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
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
      pythonPath: string,
      envVars: EnvironmentVariables
    ) => DBTProject,
    private workspaceFolder: WorkspaceFolder,
    private _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
    private pythonPath: string,
    private envVars: EnvironmentVariables
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
    if (projectFiles.length > 10) {
      window.showWarningMessage(
        `dbt Power User detected ${projectFiles.length} projects in your work space, this will negatively affect performance.`
      );
    }
    for (let i = 0; i < projectFiles.length; i++) {
      for (let j = 0; j < projectFiles.length; j++) {
        if (j !== i) {
          if (projectFiles[i].fsPath.startsWith(projectFiles[j].fsPath)) {
            window.showWarningMessage(
              `dbt Power User detected a project located in ${projectFiles[j]} that is contained inside another project ${projectFiles[j]}. This is an unsupported configuration. If you believe this is a valid configuration, please open a github issue.`
            );
          }
        }
      }
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
      this._onManifestChanged,
      this.pythonPath,
      this.envVars
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
