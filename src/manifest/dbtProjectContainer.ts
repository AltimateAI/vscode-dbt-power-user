import { DBTProject } from "./dbtProject";
import {
  workspace,
  WorkspaceFolder,
  Uri,
  Disposable,
  EventEmitter,
  window,
} from "vscode";
import { DBTClient } from "../dbt_client/dbtClient";
import { DBTWorkspaceFolder } from "./dbtWorkspaceFolder";
import { DBTCommand } from "../dbt_client/dbtCommandFactory";
import { ManifestCacheChangedEvent } from "./event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
import { inject } from "inversify";

@provideSingleton(DbtProjectContainer)
export class DbtProjectContainer implements Disposable {
  public onDBTInstallationFound = this.dbtClient.onDBTInstallationFound;
  private dbtWorkspaceFolders: DBTWorkspaceFolder[] = [];
  private _onManifestChanged = new EventEmitter<ManifestCacheChangedEvent>();
  public readonly onManifestChanged = this._onManifestChanged.event;
  private disposables: Disposable[] = [this._onManifestChanged];

  constructor(
    private dbtClient: DBTClient,
    @inject("DBTWorkspaceFolderFactory")
    private DBTWorkspaceFolderFactory: (
      workspaceFolder: WorkspaceFolder,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>
    ) => DBTWorkspaceFolder
  ) {
    this.disposables.push(
      workspace.onDidChangeWorkspaceFolders(async (event) => {
        const { added, removed } = event;

        await Promise.all(
          added.map(
            async (folder) => await this.registerWorkspaceFolder(folder)
          )
        );

        removed.forEach((removedWorkspaceFolder) =>
          this.unregisterWorkspaceFolder(removedWorkspaceFolder)
        );
      })
    );
  }

  async initializeDBTProjects(): Promise<void> {
    const folders = workspace.workspaceFolders;
    if (folders === undefined) {
      return;
    }
    await Promise.all(
      folders.map((folder) => this.registerWorkspaceFolder(folder))
    );
  }

  // TODO: bypasses events and could be inconsistent
  getPackageName = (uri: Uri): string | undefined => {
    return this.findDBTProject(uri)?.findPackageName(uri);
  };

  // TODO: bypasses events and could be inconsistent
  getProjectRootpath = (uri: Uri): Uri | undefined => {
    return this.findDBTProject(uri)?.projectRoot;
  };

  async detectDBT(): Promise<void> {
    await this.dbtClient.detectDBT();
  }

  listModels(projectUri: Uri) {
    this.dbtClient.listModels(projectUri);
  }

  findDBTProject(uri: Uri): DBTProject | undefined {
    return this.findDBTWorkspaceFolder(uri)?.findDBTProject(uri);
  }

  addCommandToQueue(command: DBTCommand) {
    if (this.dbtClient === undefined) {
      if (command.focus) {
        window.showErrorMessage(
          "Can't run the command. Please ensure you have selected a Python interpreter with DBT installed."
        );
      }
      return;
    }
    this.dbtClient.addCommandToQueue(command);
  }

  async installDBT(): Promise<void> {
    await this.dbtClient.installDBT();
  }

  async updateDBT(): Promise<void> {
    await this.dbtClient.updateDBT();
  }

  dispose() {
    this.dbtWorkspaceFolders.forEach((workspaceFolder) =>
      workspaceFolder.dispose()
    );
    this.disposables.forEach((disposable) => disposable.dispose());
  }

  private async registerWorkspaceFolder(
    workspaceFolder: WorkspaceFolder
  ): Promise<void> {
    const dbtProjectWorkspaceFolder = this.DBTWorkspaceFolderFactory(
      workspaceFolder,
      this._onManifestChanged
    );
    this.dbtWorkspaceFolders.push(dbtProjectWorkspaceFolder);
    await dbtProjectWorkspaceFolder.discoverProjects();
  }

  private unregisterWorkspaceFolder(workspaceFolder: WorkspaceFolder): void {
    const folderToDelete = this.findDBTWorkspaceFolder(workspaceFolder.uri);
    if (folderToDelete === undefined) {
      throw Error("dbtWorkspaceFolder not registered");
    }
    this.dbtWorkspaceFolders.splice(
      this.dbtWorkspaceFolders.indexOf(folderToDelete)
    );
    folderToDelete.dispose();
  }

  private findDBTWorkspaceFolder(uri: Uri): DBTWorkspaceFolder | undefined {
    return this.dbtWorkspaceFolders.find((folder) => folder.contains(uri));
  }
}
