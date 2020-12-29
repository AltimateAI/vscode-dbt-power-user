import { DBTProject } from "./dbtProject";
import { workspace, RelativePattern, WorkspaceFolder, Uri, FileSystemWatcher, Disposable } from "vscode";
import { ManifestCacheChangedEvent, OnManifestCacheChanged } from "./manifestCacheChangedEvent";
import { DBTClient } from "../dbt_client/dbtClient";
import { getPythonPathFromExtension } from "../utils";
import { SourceFileChangedEvent } from "./sourceFileChangedEvent";
import { DBTWorkspaceFolder } from "./dbtWorkspaceFolder";
import path = require("path");

export class DbtProjectContainer implements Disposable {
  private providers: OnManifestCacheChanged[] = [];
  public dbtClient?: DBTClient;
  private dbtWorkspaceFolders: DBTWorkspaceFolder[] = [];

  constructor() {
    workspace.onDidChangeWorkspaceFolders(async (event) => {
      const { added, removed } = event;
      for (const addedFolder of added) {
        await this.registerWorkspaceFolder(addedFolder);
      }
      removed.forEach(removedWorkspaceFolder => this.unregisterWorkspaceFolder(removedWorkspaceFolder));
    });
  }

  dispose() {
    throw new Error("Method not implemented.");
  }

  private async registerWorkspaceFolder(workspaceFolder: WorkspaceFolder): Promise<void> {
    const watcher = this.createConfigWatcher(workspaceFolder);
    this.dbtWorkspaceFolders.push(new DBTWorkspaceFolder(workspaceFolder, watcher));
    const projectUris = await this.discoverProjects(workspaceFolder);
    for (const projectUri of projectUris) {
      await this.registerDBTProject(projectUri);
    }
  }

  private unregisterWorkspaceFolder(workspaceFolder: WorkspaceFolder): void {
    const folderToDelete = this.findDBTWorkspaceFolder(workspaceFolder.uri);
    if (folderToDelete === undefined) { throw Error('dbtWorkspaceFolder not registered'); };
    folderToDelete.dispose();
    this.dbtWorkspaceFolders.splice(this.dbtWorkspaceFolders.indexOf(folderToDelete));
  }

  private async registerDBTProject(uri: Uri): Promise<void> {
    const dbtWorkspaceFolder = this.findDBTWorkspaceFolder(uri);
    if (dbtWorkspaceFolder === undefined) { throw Error('dbtWorkspaceFolder not registered'); };
    const dbtProject = new DBTProject(uri);
    await dbtProject.tryRefresh();
    if (this.dbtClient === undefined) {
      throw Error('registerDBTProject method called before creating dbtClient');
    }
    dbtWorkspaceFolder.addDBTProject(dbtProject);
  }

  private unregisterDBTProject(uri: Uri): void {
    const workspaceFolderOfProject = this.findDBTWorkspaceFolder(uri);
    if (workspaceFolderOfProject === undefined) {
      throw Error('dbtWorkspaceFolder not registered');
    };
    workspaceFolderOfProject.unregisterDBTProject(uri);
  }

  private createConfigWatcher(folder: WorkspaceFolder): FileSystemWatcher {
    const watcher = workspace.createFileSystemWatcher(new RelativePattern(folder, `**/${DBTProject.DBT_PROJECT_FILE}`));
    watcher.onDidCreate(async (uri) => {
      const projectRootUri = Uri.file(path.dirname(uri.path));
      await this.registerDBTProject(projectRootUri);
    });
    watcher.onDidDelete(async (uri) => {
      const projectRootUri = Uri.file(path.dirname(uri.path));
      this.unregisterDBTProject(projectRootUri);
    });
    return watcher;
  }

  public async createDBTProjects(): Promise<this> {
    const folders = workspace.workspaceFolders;
    if (folders === undefined) {
      return this;
    }
    for (const folder of folders) {
      await this.registerWorkspaceFolder(folder);
    }
    return this;
  }

  public async createDBTClient(): Promise<void> {
    const { pythonPath, onDidChangeExecutionDetails } = await getPythonPathFromExtension();
    if (pythonPath === undefined) {
      return;
    }
    onDidChangeExecutionDetails(async () => {
      const { pythonPath } = await getPythonPathFromExtension();
      if (this.dbtClient !== undefined) {
        this.dbtClient.dispose();
      }
      this.dbtClient = new DBTClient(pythonPath);
      await this.dbtClient.checkIfDBTIsInstalled();
    });
    this.dbtClient = new DBTClient(pythonPath);
    await this.dbtClient.checkIfDBTIsInstalled();
  }

  public addProvider(provider: OnManifestCacheChanged): void {
    this.providers.push(provider);
  }

  public raiseManifestChangedEvent(event: ManifestCacheChangedEvent) {
    this.providers.forEach(provider => provider.onManifestCacheChanged(event));
  }

  public raiseSourceFileChangedEvent(event: SourceFileChangedEvent) {
    if (this.dbtClient !== undefined) {
      this.dbtClient.onSourceFileChanged(event);
    }
  }

  // TODO move it to DBTProject and make it static
  public getPackageName = (currentPath: Uri): string | undefined => {
    const projectPath = this.getProjectRootpath(currentPath);
    if (projectPath === undefined) {
      return undefined;
    }

    const documentPath = currentPath.path;
    const pathSegments = documentPath.replace(projectPath.path, "").split("/");

    const insidePackage =
      pathSegments.length > 1 &&
      pathSegments[0] === DBTProject.DBT_MODULES;

    if (insidePackage) {
      return pathSegments[1];
    }
    return undefined;
  };

  // TODO move this method to utils
  public getProjectRootpath = (currentFilePath: Uri): Uri | undefined => {
    for (const projectRootUri of this.getAllDBTProjectUris()) {
      if (currentFilePath.path.startsWith(projectRootUri.path + "/")) {
        return projectRootUri;
      }
    }
    return undefined;
  };

  private findDBTWorkspaceFolder(uri: Uri): DBTWorkspaceFolder | undefined {
    for (const folder of this.dbtWorkspaceFolders) {
      if (folder.checkIfPathIsWorkspaceFolder(uri)) {
        return folder;
      }
    }
    return undefined;
  }

  // TODO get rid of this method
  private getAllDBTProjectUris(): Uri[] {
    const uris: Uri[] = [];
    this.dbtWorkspaceFolders.forEach(folder => {
      folder.dbtProjects.forEach(dbtProject => {
        uris.push(dbtProject.projectRoot);
      });
    });
    return uris;
  }

  private async discoverProjects(folder: WorkspaceFolder): Promise<Uri[]> {
    const dbtProjectFiles = await workspace.findFiles(
      new RelativePattern(folder, `**/${DBTProject.DBT_PROJECT_FILE}`),
      new RelativePattern(folder, `**/${DBTProject.DBT_MODULES}`)
    );
    return dbtProjectFiles
      .filter((uri) => !uri.path.includes('site-packages'))
      .map((uri) =>
        Uri.file(uri.path.split("/")!.slice(0, -1).join("/"))
      );
  }
}

export const dbtProjectContainer = new DbtProjectContainer();
