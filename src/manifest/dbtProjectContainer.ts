import { DBTProject } from "./dbtProject";
import { workspace, WorkspaceFolder, Uri, Disposable, window } from "vscode";
import { DBTClient } from "../dbt_client/dbtClient";
import { SourceFileChangedEvent } from "./event/sourceFileChangedEvent";
import { DBTWorkspaceFolder } from "./dbtWorkspaceFolder";
import {
  OnManifestCacheChanged,
  ManifestCacheChangedEvent,
} from "./event/manifestCacheChangedEvent";
import { DBTCommand, DBTCommandFactory } from "../dbt_client/dbtCommandFactory";
import {
  DBTInstallationFoundEvent,
  OnDBTInstallationFound,
} from "./event/dbtVersionEvent";
import { PythonEnvironment } from "./pythonEnvironment";

export class DbtProjectContainer implements Disposable {
  private dbtClient?: DBTClient;
  private manifestCacheChangedHandlers: OnManifestCacheChanged[] = [];
  private dbtInstallationFoundHandlers: OnDBTInstallationFound[] = [];
  private dbtWorkspaceFolders: DBTWorkspaceFolder[] = [];
  private notYetShownDbtInstalledErrorMessage = true;

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

  addOnDBTInstallationFoundHandler(handler: OnDBTInstallationFound): void {
    this.dbtInstallationFoundHandlers.push(handler);
  }

  raiseManifestChangedEvent(event: ManifestCacheChangedEvent) {
    this.manifestCacheChangedHandlers.forEach((handler) =>
      handler.onManifestCacheChanged(event)
    );
  }

  raiseDBTVersionEvent(event: DBTInstallationFoundEvent) {
    this.dbtInstallationFoundHandlers.forEach((handler) =>
      handler.onDBTInstallationFound(event)
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

  // TODO: this seems a bit out of place in here
  async detectDBT(): Promise<void> {
    const pythonEnvironment = await PythonEnvironment.getEnvironment();

    const handlePythonExtension = async () => {
      const { pythonPath } = pythonEnvironment;
      this.notYetShownDbtInstalledErrorMessage = true;

      if (pythonPath === undefined) {
        return;
      }
      this.dbtClient = new DBTClient(pythonPath);
      await this.dbtClient.checkIfDBTIsInstalled();
    };

    pythonEnvironment.onDidChangeExecutionDetails(handlePythonExtension);
    await handlePythonExtension();
  }

  findDBTProject(uri: Uri): DBTProject | undefined {
    return this.findDBTWorkspaceFolder(uri)?.findDBTProject(uri);
  }

  addCommandToQueue(command: DBTCommand) {
    if (this.dbtClient === undefined) {
      this.notYetShownDbtInstalledErrorMessage &&
        window.showErrorMessage(
          "Please ensure you have selected a Python interpreter with DBT installed."
        );
      this.notYetShownDbtInstalledErrorMessage = false;
      return;
    }
    this.dbtClient.addCommandToQueue(command);
  }

  installDBT() {
    if (this.dbtClient === undefined) {
      window.showErrorMessage(
        "Please ensure you have selected a Python interpreter before installing DBT."
      );
      return;
    }
    this.dbtClient.executeCommandImmediately(
      DBTCommandFactory.createInstallDBTCommand()
    );
  }

  updateDBT() {
    if (this.dbtClient === undefined) {
      window.showErrorMessage(
        "Please ensure you have selected a Python interpreter before updating DBT."
      );
      return;
    }
    this.dbtClient.executeCommandImmediately(
      DBTCommandFactory.createUpdateDBTCommand()
    );
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
