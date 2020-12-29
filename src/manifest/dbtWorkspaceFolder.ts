import { Disposable, FileSystemWatcher, Uri, WorkspaceFolder } from "vscode";
import { DBTProject } from "./dbtProject";

export class DBTWorkspaceFolder implements Disposable {
  private workspaceFolder: WorkspaceFolder;
  private watcher: FileSystemWatcher;
  public dbtProjects: DBTProject[] = []; // TODO make it private

  constructor(workspaceFolder: WorkspaceFolder, watcher: FileSystemWatcher) {
    this.workspaceFolder = workspaceFolder;
    this.watcher = watcher;
  }

  public dispose() {
    this.watcher.dispose();
    for (const dbtProject of this.dbtProjects) {
      dbtProject.dispose();
    }
  }

  public unregisterDBTProject(uri: Uri) {
    const projectToDelete = this.dbtProjects.find(dbtProject => dbtProject.projectRoot.path === uri.path);
    if (projectToDelete === undefined) {
      return;
    }
    projectToDelete.dispose();
    this.dbtProjects.splice(this.dbtProjects.indexOf(projectToDelete));
  }

  public addDBTProject(dbtProject: DBTProject) {
    this.dbtProjects.push(dbtProject);
  }

  public checkIfPathIsWorkspaceFolder(uri: Uri) {
    return uri.path.startsWith(this.workspaceFolder.uri.path);
  }
}