import { inject } from "inversify";
import { basename } from "path";
import {
  Disposable,
  EventEmitter,
  ExtensionContext,
  Uri,
  window,
  workspace,
  WorkspaceFolder,
} from "vscode";
import { DBTClient } from "../dbt_client";
import { DBTCommand } from "../dbt_client/dbtCommandFactory";
import { EnvironmentVariables, RunModelType } from "../domain";
import { provideSingleton } from "../utils";
import { DBTProject } from "./dbtProject";
import { DBTWorkspaceFolder } from "./dbtWorkspaceFolder";
import { ManifestCacheChangedEvent } from "./event/manifestCacheChangedEvent";
import { DBTTerminal } from "../dbt_client/dbtTerminal";

@provideSingleton(DBTProjectContainer)
export class DBTProjectContainer implements Disposable {
  public onDBTInstallationVerification =
    this.dbtClient.onDBTInstallationVerification;
  private dbtWorkspaceFolders: DBTWorkspaceFolder[] = [];
  private _onManifestChanged = new EventEmitter<ManifestCacheChangedEvent>();
  public readonly onManifestChanged = this._onManifestChanged.event;
  private disposables: Disposable[] = [this._onManifestChanged];
  private context?: ExtensionContext;

  constructor(
    private dbtClient: DBTClient,
    private terminal: DBTTerminal,
    @inject("Factory<DBTWorkspaceFolder>")
    private dbtWorkspaceFolderFactory: (
      workspaceFolder: WorkspaceFolder,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
      pythonPath?: string,
      envVars?: EnvironmentVariables,
    ) => DBTWorkspaceFolder,
  ) {
    this.disposables.push(
      workspace.onDidChangeWorkspaceFolders(async (event) => {
        const { added, removed } = event;
        await Promise.all(
          added.map(
            async (folder) => await this.registerWorkspaceFolder(folder),
          ),
        );
        removed.forEach((removedWorkspaceFolder) =>
          this.unregisterWorkspaceFolder(removedWorkspaceFolder),
        );
      }),
    );
  }

  setContext(context: ExtensionContext) {
    this.context = context;
  }

  async initializeDBTProjects(): Promise<void> {
    const folders = workspace.workspaceFolders;
    if (folders === undefined) {
      return;
    }
    await Promise.all(
      folders.map((folder) => this.registerWorkspaceFolder(folder)),
    );
  }

  get extensionUri() {
    return this.context!.extensionUri;
  }

  get extensionVersion() {
    return this.context!.extension.packageJSON.version;
  }

  setToWorkspaceState(key: string, value: any) {
    this.context?.workspaceState.update(key, value);
  }
  getFromWorkspaceState(key: string): any {
    return this.context?.workspaceState.get(key);
  }
  setToGlobalState(key: string, value: any) {
    this.context?.globalState.update(key, value);
  }

  getFromGlobalState(key: string): any {
    this.context?.globalState.get(key);
  }

  get extensionId(): string {
    return this.context?.extension.id.toString() || "";
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

  executeSQL(uri: Uri, query: string): void {
    this.findDBTProject(uri)?.executeSQL(query);
  }

  runModel(modelPath: Uri, type?: RunModelType) {
    this.findDBTProject(modelPath)?.runModel(
      this.createModelParams(modelPath, type),
    );
  }

  buildModel(modelPath: Uri, type?: RunModelType) {
    this.findDBTProject(modelPath)?.buildModel(
      this.createModelParams(modelPath, type),
    );
  }

  runTest(modelPath: Uri, testName: string) {
    this.findDBTProject(modelPath)?.runTest(testName);
  }

  runModelTest(modelPath: Uri, modelName: string) {
    this.findDBTProject(modelPath)?.runModelTest(modelName);
  }

  compileModel(modelPath: Uri, type?: RunModelType) {
    this.findDBTProject(modelPath)?.compileModel(
      this.createModelParams(modelPath, type),
    );
  }

  generateDocs(modelPath: Uri, type?: RunModelType) {
    this.findDBTProject(modelPath)?.generateDocs();
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

  generateSchemaYML(modelPath: Uri, modelName: string) {
    this.findDBTProject(modelPath)?.generateSchemaYML(modelPath, modelName);
  }

  findDBTProject(uri: Uri): DBTProject | undefined {
    return this.findDBTWorkspaceFolder(uri)?.findDBTProject(uri);
  }

  findAllDBTProjects(): DBTProject[] {
    const allProjects: DBTProject[] = [];
    this.dbtWorkspaceFolders.forEach((workspaceFolder) => {
      const workspaceProjects = workspaceFolder.findDBTProjects();
      allProjects.push(...workspaceProjects);
    });
    return allProjects;
  }

  async runCommandAndReturnResults(command: DBTCommand): Promise<string> {
    const runModelProcess = await this.dbtClient?.executeCommand(command);
    const runModelOutput: string = await runModelProcess.complete();
    this.terminal.log(
      `${runModelProcess.formatText(runModelOutput.toString())}`,
    );
    return (runModelOutput || "").toString();
  }

  addCommandToQueue(command: DBTCommand) {
    if (this.dbtClient === undefined) {
      if (command.focus) {
        window.showErrorMessage(
          "Can't run the command. Please ensure you have selected a Python interpreter with DBT installed.",
        );
      }
      return;
    }
    this.dbtClient.addCommandToQueue(command);
  }

  getAdapters(): string[] {
    return Array.from(
      new Set<string>(
        this.dbtWorkspaceFolders.flatMap((workspaceFolder) =>
          workspaceFolder.getAdapters(),
        ),
      ),
    );
  }

  getPythonEnvironment() {
    return this.dbtClient.getPythonEnvironment();
  }

  dispose() {
    this.dbtWorkspaceFolders.forEach((workspaceFolder) =>
      workspaceFolder.dispose(),
    );
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private createModelParams(modelPath: Uri, type?: RunModelType) {
    const modelName = basename(modelPath.fsPath, ".sql");
    const plusOperatorLeft = type === RunModelType.PARENTS ? "+" : "";
    const plusOperatorRight = type === RunModelType.CHILDREN ? "+" : "";
    return { plusOperatorLeft, modelName, plusOperatorRight };
  }

  private async registerWorkspaceFolder(
    workspaceFolder: WorkspaceFolder,
  ): Promise<void> {
    const dbtProjectWorkspaceFolder = this.dbtWorkspaceFolderFactory(
      workspaceFolder,
      this._onManifestChanged,
    );
    this.dbtWorkspaceFolders.push(dbtProjectWorkspaceFolder);
    await dbtProjectWorkspaceFolder.discoverProjects();
  }

  private unregisterWorkspaceFolder(workspaceFolder: WorkspaceFolder): void {
    const folderToDelete = this.findDBTWorkspaceFolder(workspaceFolder.uri);
    if (folderToDelete === undefined) {
      return;
    }
    this.dbtWorkspaceFolders.splice(
      this.dbtWorkspaceFolders.indexOf(folderToDelete),
    );
    folderToDelete.dispose();
  }

  private findDBTWorkspaceFolder(uri: Uri): DBTWorkspaceFolder | undefined {
    return this.dbtWorkspaceFolders.find((folder) => folder.contains(uri));
  }
}
