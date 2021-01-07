import { DBTProject } from "./dbtProject";
import { workspace, WorkspaceFolder, Uri, Disposable, window } from "vscode";
import { DBTClient } from "../dbt_client/dbtClient";
import { SourceFileChangedEvent } from "./event/sourceFileChangedEvent";
import { DBTWorkspaceFolder } from "./dbtWorkspaceFolder";
import {
  OnManifestCacheChanged,
  ManifestCacheChangedEvent,
} from "./event/manifestCacheChangedEvent";
import { DBTCommand } from "../dbt_client/dbtCommandFactory";

export class DbtProjectContainer implements Disposable {
  private dbtClient: DBTClient = new DBTClient();
  public onDBTInstallationFound = this.dbtClient.onDBTInstallationFound;
  private manifestCacheChangedHandlers: OnManifestCacheChanged[] = [];
  private dbtWorkspaceFolders: DBTWorkspaceFolder[] = [];

  constructor() {
    workspace.onDidChangeWorkspaceFolders(async (event) => {
      const { added, removed } = event;

      await Promise.all(
        added.map(async (folder) => await this.registerWorkspaceFolder(folder))
      );

      removed.forEach((removedWorkspaceFolder) =>
        this.unregisterWorkspaceFolder(removedWorkspaceFolder)
      );
    });
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

  addOnManifestCacheChangedHandler(handler: OnManifestCacheChanged): void {
    this.manifestCacheChangedHandlers.push(handler);
  }

  raiseManifestChangedEvent(event: ManifestCacheChangedEvent) {
    this.manifestCacheChangedHandlers.forEach((handler) =>
      handler.onManifestCacheChanged(event)
    );
  }

  raiseSourceFileChangedEvent(event: SourceFileChangedEvent) {
    if (this.dbtClient !== undefined) {
      this.dbtClient.onSourceFileChanged(event);
    }
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
    const pythonEnvironment = await PythonEnvironment.getEnvironment();

    const handlePythonExtension = async () => {
      const pythonEnvironment = await PythonEnvironment.getEnvironment();

      const pythonPath = pythonEnvironment.getPythonPath();

      if (pythonPath === undefined) {
        this.dbtClient = undefined;
        return;
      }
      this.dbtClient = new DBTClient(pythonPath);
      await this.dbtClient.checkIfDBTIsInstalled();
    };

    pythonEnvironment.onDidChangeExecutionDetails(async () => {
      if (this.dbtClient !== undefined) {
        this.dbtClient.dispose();
      }
      await handlePythonExtension();
    });
    await handlePythonExtension();
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

  async installDBT() {
    if (this.dbtClient === undefined) {
      window.showErrorMessage(
        "Can't install DBT. Please ensure you have selected a Python interpreter before installing DBT."
      );
      return;
    }
    await this.dbtClient.executeCommandImmediately(
      DBTCommandFactory.createInstallDBTCommand()
    );
    this.detectDBT();
  }

  async updateDBT() {
    if (this.dbtClient === undefined) {
      window.showErrorMessage(
        "Can't update DBT. Please ensure you have selected a Python interpreter before updating DBT."
      );
      return;
    }
    await this.dbtClient.executeCommandImmediately(
      DBTCommandFactory.createUpdateDBTCommand()
    );
    this.detectDBT();
  }

  dispose() {
    this.dbtWorkspaceFolders.forEach((workspaceFolder) =>
      workspaceFolder.dispose()
    );
  }

  private async registerWorkspaceFolder(
    workspaceFolder: WorkspaceFolder
  ): Promise<void> {
    const dbtProjectWorkspaceFolder = new DBTWorkspaceFolder(workspaceFolder);
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

export const dbtProjectContainer = new DbtProjectContainer();
