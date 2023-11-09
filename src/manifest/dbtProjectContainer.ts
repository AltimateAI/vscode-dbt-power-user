import { inject } from "inversify";
import { basename } from "path";
import {
  commands,
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

enum PromptAnswer {
  YES = "Yes",
  IGNORE = "Ignore",
}

export interface ProjectRegisteredUnregisteredEvent {
  root: Uri;
  name: string;
  registered: boolean;
}

@provideSingleton(DBTProjectContainer)
export class DBTProjectContainer implements Disposable {
  public onDBTInstallationVerification =
    this.dbtClient.onDBTInstallationVerification;
  private dbtWorkspaceFolders: DBTWorkspaceFolder[] = [];
  private _onManifestChanged = new EventEmitter<ManifestCacheChangedEvent>();
  private _onProjectRegisteredUnregistered =
    new EventEmitter<ProjectRegisteredUnregisteredEvent>();
  public readonly onManifestChanged = this._onManifestChanged.event;
  private disposables: Disposable[] = [
    this._onManifestChanged,
    this._onProjectRegisteredUnregistered,
  ];
  private context?: ExtensionContext;
  private projects: Map<Uri, string> = new Map<Uri, string>();

  constructor(
    private dbtClient: DBTClient,
    private terminal: DBTTerminal,
    @inject("Factory<DBTWorkspaceFolder>")
    private dbtWorkspaceFolderFactory: (
      workspaceFolder: WorkspaceFolder,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
      _onProjectRegisteredUnregistered: EventEmitter<ProjectRegisteredUnregisteredEvent>,
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
    this._onProjectRegisteredUnregistered.event((event) => {
      if (event.registered) {
        this.projects.set(event.root, event.name);
      } else {
        this.projects.delete(event.root);
      }
      const projects = Array.from(this.projects.entries());
      commands.executeCommand(
        "setContext",
        "dbtPowerUser.projectCount",
        projects.length,
      );
      if (projects.length === 1) {
        this.setToWorkspaceState("dbtPowerUser.projectSelected", {
          label: projects[0][1],
          description: projects[0][0].fsPath,
          uri: projects[0][0],
        });
        // For some reason we can't use dbtPowerUser.projectSelected to control the steps
        commands.executeCommand(
          "setContext",
          "dbtPowerUser.walkthroughProjectSelected",
          true,
        );
      } else {
        // reset the experience so the user can reselect another project when running again
        this.setToWorkspaceState("dbtPowerUser.projectSelected", null);
        commands.executeCommand(
          "setContext",
          "dbtPowerUser.walkthroughProjectSelected",
          false,
        );
      }
    });
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

  async showWalkthrough() {
    const answer = await window.showInformationMessage(
      `Thanks for installing dbt Power User. Do you need help setting up the extension?`,
      PromptAnswer.YES,
      PromptAnswer.IGNORE,
    );
    commands.executeCommand(
      "setContext",
      "dbtPowerUser.showSetupWalkthrough",
      false,
    );
    if (answer === PromptAnswer.YES) {
      commands.executeCommand("dbtPowerUser.openSetupWalkthrough");
    }
  }

  async initializeWalkthrough() {
    // show setup walkthrough if needed
    const showSetupWalkthrough = this.context!.globalState.get(
      "showSetupWalkthrough",
    );
    if (showSetupWalkthrough === undefined || showSetupWalkthrough === true) {
      this.showWalkthrough();
    }

    const allProjects = await this.getProjects();

    commands.executeCommand(
      "setContext",
      "dbtPowerUser.projectCount",
      allProjects.length,
    );
    const existingAssociations = workspace
      .getConfiguration("files")
      .get<any>("associations", {});
    let showFileAssociationsStep = false;
    Object.entries({
      "*.sql": ["jinja-sql", "sql"],
      "*.yml": ["jinja-yaml", "yaml"],
    }).forEach(([key, value]) => {
      if (existingAssociations[key] === undefined) {
        showFileAssociationsStep ||= true;
      }
      showFileAssociationsStep ||= !value.includes(existingAssociations[key]);
    });
    commands.executeCommand(
      "setContext",
      "dbtPowerUser.showFileAssociationStep",
      showFileAssociationsStep,
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

  getProjects(): DBTProject[] {
    return this.dbtWorkspaceFolders.flatMap((workspaceFolder) =>
      workspaceFolder.getProjects(),
    );
  }

  async runCommandAndReturnResults(command: DBTCommand): Promise<string> {
    const commandProcess = await this.dbtClient?.executeCommand(command);
    const commandOutput: string = await commandProcess.complete();
    this.terminal.log(`${commandProcess.formatText(commandOutput.toString())}`);
    return (commandOutput || "").toString();
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
      this._onProjectRegisteredUnregistered,
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
