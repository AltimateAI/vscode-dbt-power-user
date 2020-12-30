import {
  Disposable,
  FileSystemWatcher,
  RelativePattern,
  Uri,
  workspace,
  WorkspaceFolder,
} from "vscode";
import { DBTProject } from "./dbtProject";
import * as path from "path";

export class DBTWorkspaceFolder implements Disposable {
  private workspaceFolder: WorkspaceFolder;
  private watcher: FileSystemWatcher;
  private dbtProjects: DBTProject[] = [];

  constructor(workspaceFolder: WorkspaceFolder) {
    this.workspaceFolder = workspaceFolder;
    this.watcher = this.createConfigWatcher();
  }

  async discoverProjects() {
    const dbtProjectFiles = await workspace.findFiles(
      new RelativePattern(
        this.workspaceFolder,
        `**/${DBTProject.DBT_PROJECT_FILE}`
      ),
      new RelativePattern(this.workspaceFolder, `**/${DBTProject.DBT_MODULES}`)
    );
    return dbtProjectFiles
      .filter((uri) => !uri.path.includes("site-packages")) // TODO: what's this?
      .map((uri) => Uri.file(uri.path.split("/")!.slice(0, -1).join("/")))
      .forEach((uri) => this.registerDBTProject(uri));
  }

  async registerDBTProject(uri: Uri) {
    const dbtProject = new DBTProject(uri);
    await dbtProject.tryRefresh();
    this.dbtProjects.push(dbtProject);
  }

  unregisterDBTProject(uri: Uri) {
    const projectToDelete = this.dbtProjects.find(
      (dbtProject) => dbtProject.projectRoot.path === uri.path
    );
    if (projectToDelete === undefined) {
      return;
    }
    projectToDelete.dispose();
    this.dbtProjects.splice(this.dbtProjects.indexOf(projectToDelete));
  }

  findDBTProject(uri: Uri): DBTProject | undefined {
    return this.dbtProjects.find((project) => project.contains(uri));
  }

  contains(uri: Uri) {
    return uri.path.startsWith(this.workspaceFolder.uri.path);
  }

  dispose() {
    this.watcher.dispose();
    this.dbtProjects.forEach((project) => project.dispose());
  }

  private createConfigWatcher(): FileSystemWatcher {
    const watcher = workspace.createFileSystemWatcher(
      new RelativePattern(
        this.workspaceFolder,
        `**/${DBTProject.DBT_PROJECT_FILE}`
      )
    );

    const dirName = (uri: Uri) => Uri.file(path.dirname(uri.fsPath));

    watcher.onDidCreate((uri) => this.registerDBTProject(dirName(uri)));
    watcher.onDidDelete((uri) => this.unregisterDBTProject(dirName(uri)));
    return watcher;
  }
}
