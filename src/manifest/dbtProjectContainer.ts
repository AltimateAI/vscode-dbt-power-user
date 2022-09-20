import { DBTProject } from "./dbtProject";
import {
  workspace,
  WorkspaceFolder,
  Uri,
  Disposable,
  EventEmitter,
  window,
  ExtensionContext
} from "vscode";
import { DBTClient } from "../dbt_client";
import { DBTWorkspaceFolder } from "./dbtWorkspaceFolder";
import { DBTCommand } from "../dbt_client/dbtCommandFactory";
import { ManifestCacheChangedEvent } from "./event/manifestCacheChangedEvent";
import { provideSingleton, debounce } from "../utils";
import { inject } from "inversify";
import { basename } from "path";
import { RunModelType } from "../domain";
import { QueryResultPanel } from "../webview";
import { SqlPreviewContentProvider } from "../content_provider/sqlPreviewContentProvider";

@provideSingleton(DBTProjectContainer)
export class DBTProjectContainer implements Disposable {
  public onDBTInstallationFound = this.dbtClient.onDBTInstallationFound;
  private dbtWorkspaceFolders: DBTWorkspaceFolder[] = [];
  private _onManifestChanged = new EventEmitter<ManifestCacheChangedEvent>();
  public readonly onManifestChanged = this._onManifestChanged.event;
  private disposables: Disposable[] = [this._onManifestChanged];
  private extensionUri: Uri = Uri.file("");

  constructor(
    private dbtClient: DBTClient,
    @inject("Factory<DBTWorkspaceFolder>")
    private dbtWorkspaceFolderFactory: (
      workspaceFolder: WorkspaceFolder,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>
    ) => DBTWorkspaceFolder
  ) {
    // Workspace Folder Registrar
    const fireUpdate = debounce(() => SqlPreviewContentProvider.instance?.onDidChangeEmitter.fire(SqlPreviewContentProvider.URI), 1500);
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

    // Query View Sync
    this.disposables.push(
      workspace.onDidChangeTextDocument(async (event) => {
        if (event.document.uri.path === SqlPreviewContentProvider.URI.path) {
          return;
        }
        if (event.document.languageId === "jinja-sql") {
          globalThis.currentSql = event.document.getText();
          if (window.visibleTextEditors.some(
            (editor) => editor.document.uri.path === SqlPreviewContentProvider.URI.path)) {
            fireUpdate();
          }
        }
      })
    );
    this.disposables.push(
      window.onDidChangeActiveTextEditor(async (event) => {
        if (event?.document.uri.path === SqlPreviewContentProvider.URI.path) {
          return;
        }
        if (event?.document.languageId === "jinja-sql") {
          globalThis.currentSql = event.document.getText();
          if (window.visibleTextEditors.some(
            (editor) => editor.document.uri.path === SqlPreviewContentProvider.URI.path)) {
            fireUpdate();
          }
        }
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

  // This is is ran during activation
  resolveUri(context: ExtensionContext) {
    this.extensionUri = context.extensionUri;
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

  executeSQL(query: string, title: string): void {
    QueryResultPanel.createOrShow(this.extensionUri, title);
    QueryResultPanel.currentPanel?.executeQuery(query);
  }

  async rebuildManifest() {
    await this.dbtClient.rebuildManifest();
  }

  runModel(modelPath: Uri, type?: RunModelType) {
    this.findDBTProject(modelPath)?.runModel(this.createModelParams(modelPath, type));
  }

  runTest(modelPath: Uri, testName: string) {
    this.findDBTProject(modelPath)?.runTest(testName);
  }

  runModelTest(modelPath: Uri, modelName: string) {
    this.findDBTProject(modelPath)?.runModelTest(modelName);
  }

  compileModel(modelPath: Uri, type?: RunModelType) {
    this.findDBTProject(modelPath)?.compileModel(this.createModelParams(modelPath, type));
  }

  compileQuery(modelPath: Uri, query: string) {
    this.findDBTProject(modelPath)?.compileQuery(query);
  }

  showRunSQL(modelPath: Uri) {
    this.findDBTProject(modelPath)?.showRunSQL(modelPath);
  }

  showCompiledSQL(modelPath: Uri) {
    this.findDBTProject(modelPath)?.showCompiledSql(modelPath);
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

  dispose() {
    this.dbtWorkspaceFolders.forEach((workspaceFolder) =>
      workspaceFolder.dispose()
    );
    this.disposables.forEach((disposable) => disposable.dispose());
  }

  private createModelParams(modelPath: Uri, type?: RunModelType) {
    const modelName = basename(modelPath.fsPath, ".sql");
    const plusOperatorLeft = type === RunModelType.PARENTS ? "+" : "";
    const plusOperatorRight = type === RunModelType.CHILDREN ? "+" : "";
    return { plusOperatorLeft, modelName, plusOperatorRight };
  }

  private async registerWorkspaceFolder(
    workspaceFolder: WorkspaceFolder
  ): Promise<void> {
    const dbtProjectWorkspaceFolder = this.dbtWorkspaceFolderFactory(
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
