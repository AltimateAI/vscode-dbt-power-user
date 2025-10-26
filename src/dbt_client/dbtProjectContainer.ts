import {
  DataPilotHealtCheckParams,
  DBTTerminal,
  EnvironmentVariables,
  RunModelType,
} from "@altimateai/dbt-integration";
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
import { AltimateRequest } from "../altimate";
import { DBTClient } from "../dbt_client";
import { AltimateDatapilot } from "../dbt_client/datapilot";
import { DBTProject } from "./dbtProject";
import { DBTWorkspaceFolder } from "./dbtWorkspaceFolder";
import {
  ManifestCacheChangedEvent,
  RebuildManifestCombinedStatusChange,
} from "./event/manifestCacheChangedEvent";

enum PromptAnswer {
  YES = "Yes",
  IGNORE = "Ignore",
}

export interface ProjectRegisteredUnregisteredEvent {
  root: Uri;
  name: string;
  registered: boolean;
}

export interface DBTProjectsInitializationEvent {}

export class DBTProjectContainer implements Disposable {
  public onDBTInstallationVerification =
    this.dbtClient.onDBTInstallationVerification;
  private _onDBTProjectsInitializationEvent =
    new EventEmitter<DBTProjectsInitializationEvent>();
  public readonly onDBTProjectsInitialization =
    this._onDBTProjectsInitializationEvent.event;
  dbtWorkspaceFolders: DBTWorkspaceFolder[] = [];
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
  private _onRebuildManifestStatusChange =
    new EventEmitter<RebuildManifestCombinedStatusChange>();
  readonly onRebuildManifestStatusChange =
    this._onRebuildManifestStatusChange.event;
  private rebuildManifestStatusChangeMap = new Map<string, boolean>();

  constructor(
    private dbtClient: DBTClient,
    @inject("Factory<DBTWorkspaceFolder>")
    private dbtWorkspaceFolderFactory: (
      workspaceFolder: WorkspaceFolder,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
      _onProjectRegisteredUnregistered: EventEmitter<ProjectRegisteredUnregisteredEvent>,
      pythonPath?: string,
      envVars?: EnvironmentVariables,
    ) => DBTWorkspaceFolder,
    @inject("DBTTerminal")
    private dbtTerminal: DBTTerminal,
    private altimateDatapilot: AltimateDatapilot,
    private altimate: AltimateRequest,
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
      this.dbtClient,
      this.dbtTerminal,
    );
    this._onProjectRegisteredUnregistered.event((event) => {
      if (event.registered) {
        this.projects.set(event.root, event.name);
      } else {
        this.projects.delete(event.root);
      }
    });
  }

  setContext(context: ExtensionContext) {
    this.context = context;
  }

  showErrorIfDbtOrPythonNotInstalled() {
    return this.dbtClient.showErrorIfDbtOrPythonNotInstalled();
  }

  showErrorIfDbtIsNotInstalled() {
    return this.dbtClient.showErrorIfDbtIsNotInstalled();
  }

  async initializeDBTProjects(): Promise<void> {
    const folders = workspace.workspaceFolders;
    if (folders === undefined) {
      return;
    }
    await Promise.all(
      folders.map((folder) => this.registerWorkspaceFolder(folder)),
    );
    this._onDBTProjectsInitializationEvent.fire({});
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
    this.setToGlobalState("showSetupWalkthrough", false);
  }

  async initializeWalkthrough() {
    // show setup walkthrough if needed
    const isWalkthroughDisabledFromSettings = workspace
      .getConfiguration("dbt")
      .get("hideWalkthrough", false);
    const showSetupWalkthrough = this.getFromGlobalState(
      "showSetupWalkthrough",
    );
    if (
      !isWalkthroughDisabledFromSettings &&
      (showSetupWalkthrough === undefined || showSetupWalkthrough === true)
    ) {
      this.dbtTerminal.debug(
        "dbtProjectContainer:setupWalkthroughDisplayed",
        "showing SetupWalkthrough: value of showSetupWalkthrough is" +
          showSetupWalkthrough,
      );
      this.showWalkthrough();
    }
  }

  get extensionUri() {
    return this.context!.extensionUri;
  }

  get extensionVersion() {
    return this.context!.extension.packageJSON.version;
  }

  setToWorkspaceState(key: string, value: any) {
    this.context!.workspaceState.update(key, value);
  }
  getFromWorkspaceState(key: string): any {
    return this.context!.workspaceState.get(key);
  }
  setToGlobalState(key: string, value: any) {
    this.context!.globalState.update(key, value);
  }

  getFromGlobalState(key: string): any {
    return this.context!.globalState.get(key);
  }

  get extensionId(): string {
    return this.context?.extension.id.toString() || "";
  }

  get pythonInstalled(): boolean {
    return this.dbtClient.pythonInstalled ?? false;
  }

  get dbtInstalled(): boolean {
    return this.dbtClient.dbtInstalled ?? false;
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

  async reinitialize(): Promise<void> {
    // Dispose all existing workspace folders
    this.dbtWorkspaceFolders.forEach((workspaceFolder) =>
      workspaceFolder.dispose(),
    );
    this.dbtWorkspaceFolders = [];

    // Clear projects map
    this.projects.clear();

    // Clear rebuild manifest status map
    this.rebuildManifestStatusChangeMap.clear();

    // Re-detect DBT with new integration type
    await this.detectDBT();

    // Re-initialize DBT projects
    await this.initializeDBTProjects();
  }

  async initialize() {
    this.getProjects().forEach((project) => project.initialize());
  }

  executeSQL(uri: Uri, query: string, modelName: string): void {
    if (uri.scheme === "untitled") {
      const selectedProject = this.getFromWorkspaceState(
        "dbtPowerUser.projectSelected",
      );
      if (selectedProject) {
        uri = selectedProject.uri;
      }
    }
    this.findDBTProject(uri)?.executeSQLOnQueryPanel(query, modelName);
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

  buildProject(modelPath: Uri, type?: RunModelType) {
    this.findDBTProject(modelPath)?.buildProject();
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

  generateDocs(modelPath: Uri) {
    this.findDBTProject(modelPath)?.generateDocs();
  }

  compileQuery(modelPath: Uri, query: string) {
    return this.findDBTProject(modelPath)?.compileQuery(query);
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
    const plusOperatorLeft =
      type === RunModelType.RUN_PARENTS ||
      type === RunModelType.BUILD_PARENTS ||
      type === RunModelType.BUILD_CHILDREN_PARENTS
        ? "+"
        : "";
    const plusOperatorRight =
      type === RunModelType.RUN_CHILDREN ||
      type === RunModelType.BUILD_CHILDREN ||
      type === RunModelType.BUILD_CHILDREN_PARENTS
        ? "+"
        : "";
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
    this.disposables.push(
      dbtProjectWorkspaceFolder.onRebuildManifestStatusChange((e) => {
        this.rebuildManifestStatusChangeMap.set(
          e.project.projectRoot.fsPath,
          e.inProgress,
        );
        const inProgressProjects: DBTProject[] = Array.from(
          this.rebuildManifestStatusChangeMap.entries(),
        )
          .filter(([_, inProgress]) => inProgress)
          .map(([root, _]) => root)
          .map((root) => this.findDBTProject(Uri.file(root)))
          .filter((project) => project !== undefined) as DBTProject[];

        this._onRebuildManifestStatusChange.fire({
          projects: inProgressProjects,
          inProgress: inProgressProjects.length > 0,
        });
      }),
    );
    this.dbtWorkspaceFolders.push(dbtProjectWorkspaceFolder);
    this.dbtTerminal.debug(
      "dbtProjectContainer:registerWorkspaceFolder",
      "dbtWorkspaceFolders",
      this.dbtWorkspaceFolders,
    );
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

  async checkIfAltimateDatapilotInstalled() {
    const datapilotVersion =
      await this.altimateDatapilot.checkIfAltimateDatapilotInstalled();
    const { altimate_datapilot_version } =
      await this.altimate.getDatapilotVersion(this.extensionVersion);
    return datapilotVersion === altimate_datapilot_version;
  }

  async installAltimateDatapilot() {
    const { altimate_datapilot_version } =
      await this.altimate.getDatapilotVersion(this.extensionVersion);
    await this.altimateDatapilot.installAltimateDatapilot(
      altimate_datapilot_version,
    );
  }

  executeAltimateDatapilotHealthcheck(args: DataPilotHealtCheckParams) {
    const project = this.getProjects().find(
      (p) => p.projectRoot.fsPath.toString() === args.projectRoot,
    );
    if (!project) {
      throw new Error(`Unable to find project ${args.projectRoot}`);
    }
    return project.performDatapilotHealthcheck(args);
  }
}
