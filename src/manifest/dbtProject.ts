import { existsSync, writeFileSync } from "fs";

import * as path from "path";
import { PythonException } from "python-bridge";
import {
  commands,
  Diagnostic,
  DiagnosticCollection,
  DiagnosticSeverity,
  Disposable,
  Event,
  EventEmitter,
  languages,
  ProgressLocation,
  Range,
  RelativePattern,
  Uri,
  ViewColumn,
  window,
  workspace,
} from "vscode";
import { DBTTerminal } from "../dbt_client/terminal";
import { extendErrorWithSupportLinks, getColumnNameByCase } from "../utils";
import {
  ManifestCacheChangedEvent,
  RebuildManifestStatusChange,
  ManifestCacheProjectAddedEvent,
} from "./event/manifestCacheChangedEvent";
import { ProjectConfigChangedEvent } from "./event/projectConfigChangedEvent";
import { DBTProjectLog } from "./dbtProjectLog";
import { PythonEnvironment } from "./pythonEnvironment";
import { TelemetryService } from "../telemetry";
import {
  DBTProjectIntegration,
  DBTCommandFactory,
  DBTCommandExecutionInfrastructure,
  RunModelParams,
  Catalog,
  DBTNode,
  DBColumn,
  SourceNode,
  HealthcheckArgs,
  DBTCommand,
  validateSQLUsingSqlGlot,
  DBT_PROJECT_FILE,
  RESOURCE_TYPE_ANALYSIS,
  RESOURCE_TYPE_MODEL,
  RESOURCE_TYPE_SEED,
  RESOURCE_TYPE_SNAPSHOT,
  RESOURCE_TYPE_SOURCE,
  RESOURCE_TYPE_EXPOSURE,
  RESOURCE_TYPE_METRIC,
  MANIFEST_FILE,
  CATALOG_FILE,
  DBTCommandExecution,
  DeferConfig,
} from "../dbt_client/dbtIntegration";
import { ProjectHealthcheck } from "../dbt_client/dbtCoreIntegration";
import { AltimateRequest } from "../altimate";
import { NoCredentialsError } from "../services/altimateHttpClient";
import { ValidationProvider } from "../validation_provider";
import { ModelNode } from "../altimate";
import {
  ColumnMetaData,
  DataPilotHealtCheckParams,
  GraphMetaMap,
  NodeGraphMap,
  NodeMetaData,
  Table,
} from "../domain";
import { SharedStateService } from "../services/sharedStateService";
import { TelemetryEvents } from "../telemetry/events";
import { RunResultsEvent } from "./event/runResultsEvent";
import { DeferToProdService } from "../services/deferToProdService";
import { AltimateAuthService } from "../services/altimateAuthService";
import { getProjectRelativePath } from "../utils";
import { inject } from "inversify";
import { DBTFacade } from "./dbtFacade";
import {
  DBTIntegrationAdapter,
  ParsedManifest,
  RunResultsEventData,
} from "./dbtIntegrationAdapter";

interface FileNameTemplateMap {
  [key: string]: string;
}

interface JsonObj {
  [key: string]: string | number | undefined;
}

export class DBTProject implements Disposable, DBTFacade {
  private _manifestCacheEvent?: ManifestCacheProjectAddedEvent;
  readonly projectRoot: Uri;
  private dbtProjectIntegration: DBTIntegrationAdapter;

  private _onProjectConfigChanged =
    new EventEmitter<ProjectConfigChangedEvent>();
  public onProjectConfigChanged = this._onProjectConfigChanged.event;
  private _onRunResults = new EventEmitter<RunResultsEvent>();
  public onRunResults = this._onRunResults.event;
  private _onSourceFileChanged = new EventEmitter<void>();
  public onSourceFileChanged = this._onSourceFileChanged.event;
  private dbtProjectLog?: DBTProjectLog;
  private disposables: Disposable[] = [
    this._onProjectConfigChanged,
    this._onSourceFileChanged,
  ];
  public readonly projectHealth = languages.createDiagnosticCollection("dbt");
  private _onRebuildManifestStatusChange =
    new EventEmitter<RebuildManifestStatusChange>();
  readonly onRebuildManifestStatusChange =
    this._onRebuildManifestStatusChange.event;

  private dbSchemaCache: Record<string, ModelNode> = {};
  private queues: Map<string, DBTCommandExecution[]> = new Map<
    string,
    DBTCommandExecution[]
  >();
  private queueStates: Map<string, boolean> = new Map<string, boolean>();

  constructor(
    @inject("PythonEnvironment")
    private PythonEnvironment: PythonEnvironment,
    @inject("Factory<DBTProjectLog>")
    private dbtProjectLogFactory: (
      onProjectConfigChanged: Event<ProjectConfigChangedEvent>,
    ) => DBTProjectLog,
    private dbtCommandFactory: DBTCommandFactory,
    private terminal: DBTTerminal,
    private eventEmitterService: SharedStateService,
    private telemetry: TelemetryService,
    private executionInfrastructure: DBTCommandExecutionInfrastructure,
    private dbtIntegrationAdapterFactory: (
      projectRoot: string,
      deferConfig: DeferConfig | undefined,
    ) => DBTIntegrationAdapter,
    private altimate: AltimateRequest,
    private validationProvider: ValidationProvider,
    private deferToProdService: DeferToProdService,
    private altimateAuthService: AltimateAuthService,
    path: Uri,
    _projectConfig: any,
    private _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
  ) {
    this.projectRoot = path;
    try {
      this.validationProvider.validateCredentialsSilently();
    } catch (error) {
      this.terminal.error(
        "validateCredentialsSilently",
        "Credential validation failed",
        error,
        false,
      );
    }

    this.dbtProjectLog = this.dbtProjectLogFactory(this.onProjectConfigChanged);

    // Check if dbt loom is installed for telemetry (only for core integration)
    const dbtIntegrationMode = workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");

    if (dbtIntegrationMode === "core") {
      this.isDbtLoomInstalled().then((isInstalled) => {
        this.telemetry.setTelemetryCustomAttribute(
          "dbtLoomInstalled",
          `${isInstalled}`,
        );
      });
    }

    // Create the integration adapter which will handle the integration selection internally
    this.dbtProjectIntegration = this.dbtIntegrationAdapterFactory(
      this.projectRoot.fsPath,
      this.getDeferConfig(),
    );

    // Set up Node.js watcher events to emit VSCode events directly
    this.dbtProjectIntegration.on("sourceFileChanged", () => {
      this.terminal.debug(
        "DBTProject",
        "Received sourceFileChanged event from Node.js file watchers",
      );
      this._onSourceFileChanged.fire();
    });

    this.dbtProjectIntegration.on("projectConfigChanged", () => {
      this.terminal.debug(
        "DBTProject",
        "Received projectConfigChanged event from Node.js project config watcher",
      );
      const event = new ProjectConfigChangedEvent(this);
      this._onProjectConfigChanged.fire(event);
    });

    this.dbtProjectIntegration.on(
      "rebuildManifestStatusChange",
      (status: { inProgress: boolean }) => {
        this.terminal.debug(
          "DBTProject",
          `Received rebuildManifestStatusChange event: inProgress=${status.inProgress}`,
        );
        const event: RebuildManifestStatusChange = {
          project: this,
          inProgress: status.inProgress,
        };
        this._onRebuildManifestStatusChange.fire(event);
      },
    );

    // Handle manifestCreated events from dbtIntegrationAdapter
    this.dbtProjectIntegration.on(
      "manifestCreated",
      (parsedManifest: ParsedManifest) => {
        this.terminal.debug(
          "DBTProject",
          "Received manifestCreated event from dbtIntegrationAdapter",
        );
        const manifestCacheEvent: ManifestCacheProjectAddedEvent = {
          project: this,
          nodeMetaMap: parsedManifest.nodeMetaMap,
          macroMetaMap: parsedManifest.macroMetaMap,
          metricMetaMap: parsedManifest.metricMetaMap,
          sourceMetaMap: parsedManifest.sourceMetaMap,
          graphMetaMap: parsedManifest.graphMetaMap,
          testMetaMap: parsedManifest.testMetaMap,
          docMetaMap: parsedManifest.docMetaMap,
          exposureMetaMap: parsedManifest.exposureMetaMap,
          modelDepthMap: parsedManifest.modelDepthMap,
        };
        this._manifestCacheEvent = manifestCacheEvent;
        this._onManifestChanged.fire({ added: [manifestCacheEvent] });
      },
    );

    // Handle runResultsCreated events from dbtIntegrationAdapter
    this.dbtProjectIntegration.on(
      "runResultsCreated",
      (runResultsData: RunResultsEventData) => {
        this.terminal.debug(
          "DBTProject",
          "Received runResultsCreated event from dbtIntegrationAdapter",
        );
        // Extract unique_ids for cache invalidation
        const uniqueIds = runResultsData.results.map(
          (result) => result.unique_id,
        );

        // Fire the VSCode event with parsed unique_ids
        const runResultsEvent = new RunResultsEvent(this, uniqueIds);
        this._onRunResults.fire(runResultsEvent);
      },
    );

    this.disposables.push(
      this.dbtProjectIntegration,
      this._onManifestChanged.event((event) => {
        const addedEvent = event.added?.find(
          (e) => e.project.projectRoot === this.projectRoot,
        );
        if (addedEvent) {
          this._manifestCacheEvent = addedEvent;
        }
      }),
      this.PythonEnvironment.onPythonEnvironmentChanged(() =>
        this.onPythonEnvironmentChanged(),
      ),
      this.onRunResults((event) => {
        this.invalidateCacheUsingUniqueIds(event.uniqueIds || []);
      }),
    );

    this.terminal.debug(
      "DbtProject",
      `Created ${dbtIntegrationMode} dbt project ${this.getProjectName()} at ${
        this.projectRoot
      }`,
    );
  }

  private async isDbtLoomInstalled(): Promise<boolean> {
    const dbtLoomThread = this.executionInfrastructure.createPythonBridge(
      this.projectRoot.fsPath,
    );
    try {
      await dbtLoomThread.ex`from dbt_loom import *`;
      return true;
    } catch (error) {
      return false;
    } finally {
      await this.executionInfrastructure.closePythonBridge(dbtLoomThread);
    }
  }

  private invalidateCacheUsingUniqueIds(uniqueIds: string[]) {
    for (const uniqueId of uniqueIds) {
      if (uniqueId in this.dbSchemaCache) {
        delete this.dbSchemaCache[uniqueId];
      }
    }
  }

  getProjectName() {
    return this.dbtProjectIntegration.getProjectName();
  }

  getProjectRoot() {
    return this.projectRoot.fsPath;
  }

  getSelectedTarget() {
    return this.dbtProjectIntegration.getSelectedTarget();
  }

  getTargetNames() {
    return this.dbtProjectIntegration.getTargetNames();
  }

  async setSelectedTarget(targetName: string) {
    await window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "Changing target...",
        cancellable: false,
      },
      () => this.dbtProjectIntegration.setSelectedTarget(targetName),
    );
  }

  getDBTProjectFilePath() {
    return path.join(this.projectRoot.fsPath, DBT_PROJECT_FILE);
  }

  getTargetPath() {
    return this.dbtProjectIntegration.getTargetPath();
  }

  getPackageInstallPath() {
    return this.dbtProjectIntegration.getPackageInstallPath();
  }

  getModelPaths() {
    return this.dbtProjectIntegration.getModelPaths();
  }

  getSeedPaths() {
    return this.dbtProjectIntegration.getSeedPaths();
  }

  getMacroPaths() {
    return this.dbtProjectIntegration.getMacroPaths();
  }

  getManifestPath() {
    const targetPath = this.getTargetPath();
    if (!targetPath) {
      return;
    }
    return path.join(targetPath, MANIFEST_FILE);
  }

  getCatalogPath() {
    const targetPath = this.getTargetPath();
    if (!targetPath) {
      return;
    }
    return path.join(targetPath, CATALOG_FILE);
  }

  getPythonBridgeStatus() {
    return this.dbtProjectIntegration.getPythonBridgeStatus();
  }

  getAllDiagnostic(): Diagnostic[] {
    const projectURI = Uri.file(
      path.join(this.projectRoot.fsPath, DBT_PROJECT_FILE),
    );
    const integrationDiagnostics =
      this.getCurrentProjectIntegration().getDiagnostics();

    // Convert diagnostic data to VSCode Diagnostics
    const convertedDiagnostics = [
      ...integrationDiagnostics.pythonBridgeDiagnostics.map(
        (data) =>
          new Diagnostic(
            new Range(
              data.range?.startLine || 0,
              data.range?.startColumn || 0,
              data.range?.endLine || 999,
              data.range?.endColumn || 999,
            ),
            data.message,
            this.mapSeverityToVSCode(data.severity),
          ),
      ),
      ...integrationDiagnostics.rebuildManifestDiagnostics.map(
        (data) =>
          new Diagnostic(
            new Range(
              data.range?.startLine || 0,
              data.range?.startColumn || 0,
              data.range?.endLine || 999,
              data.range?.endColumn || 999,
            ),
            data.message,
            this.mapSeverityToVSCode(data.severity),
          ),
      ),
      ...(integrationDiagnostics.projectConfigDiagnostics || []).map(
        (data) =>
          new Diagnostic(
            new Range(
              data.range?.startLine || 0,
              data.range?.startColumn || 0,
              data.range?.endLine || 999,
              data.range?.endColumn || 999,
            ),
            data.message,
            this.mapSeverityToVSCode(data.severity),
          ),
      ),
    ];

    return [
      ...convertedDiagnostics,
      ...(this.projectHealth.get(projectURI) || []),
    ];
  }

  private mapSeverityToVSCode(severity: string): DiagnosticSeverity {
    switch (severity) {
      case "error":
        return DiagnosticSeverity.Error;
      case "warning":
        return DiagnosticSeverity.Warning;
      case "info":
        return DiagnosticSeverity.Information;
      case "hint":
        return DiagnosticSeverity.Hint;
      default:
        return DiagnosticSeverity.Error;
    }
  }

  async performDatapilotHealthcheck(args: DataPilotHealtCheckParams) {
    const manifestPath = this.getManifestPath();
    if (!manifestPath) {
      throw new Error(
        `Unable to find manifest path for project ${this.getProjectName()}`,
      );
    }
    const healthcheckArgs: HealthcheckArgs = { manifestPath };
    if (args.configType === "Manual") {
      healthcheckArgs.configPath = args.configPath;
    } else {
      if (args.configType === "Saas") {
        healthcheckArgs.config = args.config;
      }
      if (
        args.configType === "All" ||
        args.config_schema.some((i) => i.files_required.includes("Catalog"))
      ) {
        const docsGenerateCommand =
          this.dbtCommandFactory.createDocsGenerateCommand();
        docsGenerateCommand.focus = false;
        docsGenerateCommand.logToTerminal = false;
        docsGenerateCommand.showProgress = false;
        await this.unsafeGenerateDocsImmediately();
        healthcheckArgs.catalogPath = this.getCatalogPath();
        if (!healthcheckArgs.catalogPath) {
          throw new Error(
            `Unable to find catalog path for project ${this.getProjectName()}`,
          );
        }
      }
    }
    this.terminal.debug(
      "performDatapilotHealthcheck",
      "Performing healthcheck",
      healthcheckArgs,
    );
    // Create isolated Python bridge for healthcheck
    const healthCheckThread = this.executionInfrastructure.createPythonBridge(
      this.projectRoot.fsPath,
    );

    let projectHealthcheck: ProjectHealthcheck;
    try {
      await healthCheckThread.ex`from dbt_utils import *`;
      projectHealthcheck = await healthCheckThread.lock<ProjectHealthcheck>(
        (python) =>
          python!`to_dict(project_healthcheck(${healthcheckArgs.manifestPath}, ${healthcheckArgs.catalogPath}, ${healthcheckArgs.configPath}, ${healthcheckArgs.config}, ${this.altimate.getAIKey()}, ${this.altimate.getInstanceName()}, ${this.altimate.getAltimateUrl()}))`,
      );
    } finally {
      await this.executionInfrastructure.closePythonBridge(healthCheckThread);
    }
    // temp fix: ideally datapilot should return absolute path
    for (const key in projectHealthcheck.model_insights) {
      for (const item of projectHealthcheck.model_insights[key]) {
        item.path = path.join(this.projectRoot.fsPath, item.original_file_path);
      }
    }
    return projectHealthcheck;
  }

  async initialize(): Promise<void> {
    // Create command queue for this project
    this.createQueue("all");

    try {
      await this.dbtProjectIntegration.initialize();
    } catch (error) {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "An unexpected error occured while initializing the dbt project at " +
            this.projectRoot +
            ": " +
            error +
            ".",
        ),
      );
    }

    // ensure all watchers are cleaned up
    if (this.dbtProjectLog) {
      this.disposables.push(this.dbtProjectLog);
    }

    this.terminal.debug(
      "DbtProject",
      `Initialized dbt project ${this.getProjectName()} at ${this.projectRoot}`,
    );
  }

  async rebuildManifest(): Promise<void> {
    this.dbtProjectIntegration.rebuildManifest();
  }

  private async onPythonEnvironmentChanged() {
    this.terminal.debug(
      "DbtProject",
      `Python environment for dbt project ${this.getProjectName()} at ${
        this.projectRoot
      } has changed`,
    );
    await this.initialize();
  }

  async refreshProjectConfig(): Promise<void> {
    this.dbtProjectIntegration.refreshProjectConfig();
  }

  async parseManifest(): Promise<ParsedManifest | undefined> {
    return await this.dbtProjectIntegration.parseManifest();
  }

  getAdapterType() {
    return this.dbtProjectIntegration.getAdapterType() || "unknown";
  }

  findPackageName(uri: Uri): string | undefined {
    const documentPath = uri.path;
    const pathSegments = documentPath
      .replace(new RegExp(this.projectRoot + "/", "g"), "")
      .split("/");
    const packagesInstallPath = this.getPackageInstallPath();
    if (packagesInstallPath && uri.fsPath.startsWith(packagesInstallPath)) {
      return pathSegments[1];
    }
    return undefined;
  }

  contains(uri: Uri) {
    return (
      uri.fsPath === this.projectRoot.fsPath ||
      uri.fsPath.startsWith(this.projectRoot.fsPath + path.sep)
    );
  }

  async runModel(runModelParams: RunModelParams) {
    if (!this.validateIntegrationPrerequisites()) {
      return undefined;
    }

    const runModelCommand =
      this.dbtCommandFactory.createRunModelCommand(runModelParams);

    try {
      const command =
        await this.getCurrentProjectIntegration().runModel(runModelCommand);
      this.telemetry.sendTelemetryEvent("runModel");
      if (command) {
        this.addCommandToQueue("all", command);
      }
    } catch (error) {
      this.handleNoCredentialsError(error);
    }
  }

  async unsafeRunModelImmediately(runModelParams: RunModelParams) {
    const runModelCommand =
      this.dbtCommandFactory.createRunModelCommand(runModelParams);
    runModelCommand.showProgress = false;
    runModelCommand.logToTerminal = false;
    this.telemetry.sendTelemetryEvent("runModel");
    return this.getCurrentProjectIntegration().executeCommandImmediately(
      runModelCommand,
    );
  }

  async buildModel(runModelParams: RunModelParams) {
    if (!this.validateIntegrationPrerequisites()) {
      return undefined;
    }

    const buildModelCommand =
      this.dbtCommandFactory.createBuildModelCommand(runModelParams);

    try {
      const command =
        await this.getCurrentProjectIntegration().buildModel(buildModelCommand);
      this.telemetry.sendTelemetryEvent("buildModel");
      if (command) {
        this.addCommandToQueue("all", command);
      }
    } catch (error) {
      this.handleNoCredentialsError(error);
    }
  }

  async unsafeBuildModelImmediately(runModelParams: RunModelParams) {
    const buildModelCommand =
      this.dbtCommandFactory.createBuildModelCommand(runModelParams);
    buildModelCommand.showProgress = false;
    buildModelCommand.logToTerminal = false;
    this.telemetry.sendTelemetryEvent("buildModel");
    return this.getCurrentProjectIntegration().executeCommandImmediately(
      buildModelCommand,
    );
  }

  async buildProject() {
    if (!this.validateIntegrationPrerequisites()) {
      return;
    }

    const buildProjectCommand =
      this.dbtCommandFactory.createBuildProjectCommand();

    try {
      const command =
        await this.getCurrentProjectIntegration().buildProject(
          buildProjectCommand,
        );
      this.telemetry.sendTelemetryEvent("buildProject");
      if (command) {
        this.addCommandToQueue("all", command);
      }
    } catch (error) {
      this.handleNoCredentialsError(error);
    }
  }

  async unsafeBuildProjectImmediately() {
    const buildProjectCommand =
      this.dbtCommandFactory.createBuildProjectCommand();
    buildProjectCommand.showProgress = false;
    buildProjectCommand.logToTerminal = false;
    this.telemetry.sendTelemetryEvent("buildProject");
    return this.getCurrentProjectIntegration().executeCommandImmediately(
      buildProjectCommand,
    );
  }

  async runTest(testName: string) {
    if (!this.validateIntegrationPrerequisites()) {
      return undefined;
    }

    const testModelCommand =
      this.dbtCommandFactory.createTestModelCommand(testName);

    try {
      const command =
        await this.getCurrentProjectIntegration().runTest(testModelCommand);
      this.telemetry.sendTelemetryEvent("runTest");
      if (command) {
        this.addCommandToQueue("all", command);
      }
    } catch (error) {
      this.handleNoCredentialsError(error);
    }
  }

  async unsafeRunTestImmediately(testName: string) {
    const testModelCommand =
      this.dbtCommandFactory.createTestModelCommand(testName);
    testModelCommand.showProgress = false;
    testModelCommand.logToTerminal = false;
    this.telemetry.sendTelemetryEvent("runTest");
    return this.getCurrentProjectIntegration().executeCommandImmediately(
      testModelCommand,
    );
  }

  async runModelTest(modelName: string) {
    if (!this.validateIntegrationPrerequisites()) {
      return undefined;
    }

    const testModelCommand =
      this.dbtCommandFactory.createTestModelCommand(modelName);

    try {
      const command =
        await this.getCurrentProjectIntegration().runModelTest(
          testModelCommand,
        );
      this.telemetry.sendTelemetryEvent("runModelTest");
      if (command) {
        this.addCommandToQueue("all", command);
      }
    } catch (error) {
      this.handleNoCredentialsError(error);
    }
  }

  async unsafeRunModelTestImmediately(modelName: string) {
    const testModelCommand =
      this.dbtCommandFactory.createTestModelCommand(modelName);
    testModelCommand.showProgress = false;
    testModelCommand.logToTerminal = false;
    this.telemetry.sendTelemetryEvent("runModelTest");
    return this.getCurrentProjectIntegration().executeCommandImmediately(
      testModelCommand,
    );
  }

  private handleNoCredentialsError(error: unknown) {
    if (error instanceof NoCredentialsError) {
      this.altimateAuthService.handlePreviewFeatures();
      return;
    }
    window.showErrorMessage((error as Error).message);
  }

  private validateIntegrationPrerequisites(): boolean {
    // Validate different prerequisites based on integration type
    const dbtIntegrationMode = workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");

    switch (dbtIntegrationMode) {
      case "cloud":
      case "fusion":
        // For cloud/fusion integrations, validate authentication
        try {
          this.validationProvider.validateCredentialsSilently();
          return true;
        } catch (e) {
          window.showErrorMessage((e as Error).message);
          return false;
        }
      case "core":
      case "corecommand":
      default:
        // For core integrations, check if we have a proper dbt installation
        // We'll validate through the integration's diagnostic system
        const diagnostics =
          this.getCurrentProjectIntegration().getDiagnostics();
        const hasErrors = [
          ...diagnostics.pythonBridgeDiagnostics,
          ...diagnostics.rebuildManifestDiagnostics,
        ].some((diagnostic) => diagnostic.severity === "error");

        if (hasErrors) {
          window.showErrorMessage(
            "dbt installation or Python environment is not properly configured",
          );
          return false;
        }
        return true;
    }
  }

  private requiresAuthentication(): boolean {
    const dbtIntegrationMode = workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");
    return dbtIntegrationMode === "cloud";
  }

  throwIfNotAuthenticated() {
    if (this.requiresAuthentication()) {
      this.validationProvider.throwIfNotAuthenticated();
    }
  }

  async compileModel(runModelParams: RunModelParams) {
    if (!this.validateIntegrationPrerequisites()) {
      return;
    }

    const compileModelCommand =
      this.dbtCommandFactory.createCompileModelCommand(runModelParams);
    const command =
      await this.getCurrentProjectIntegration().compileModel(
        compileModelCommand,
      );
    this.telemetry.sendTelemetryEvent("compileModel");
    if (command) {
      this.addCommandToQueue("all", command);
    }
  }

  async unsafeCompileModelImmediately(runModelParams: RunModelParams) {
    const compileModelCommand =
      this.dbtCommandFactory.createCompileModelCommand(runModelParams);
    compileModelCommand.showProgress = false;
    compileModelCommand.logToTerminal = false;
    this.telemetry.sendTelemetryEvent("compileModel");
    return this.getCurrentProjectIntegration().executeCommandImmediately(
      compileModelCommand,
    );
  }

  async unsafeGenerateDocsImmediately(args?: string[]) {
    const docsGenerateCommand =
      this.dbtCommandFactory.createDocsGenerateCommand();
    args?.forEach((arg) => docsGenerateCommand.addArgument(arg));
    docsGenerateCommand.focus = false;
    docsGenerateCommand.logToTerminal = false;
    const result =
      await this.getCurrentProjectIntegration().executeCommandImmediately(
        docsGenerateCommand,
      );
    if (result?.stderr) {
      throw new Error(result.stderr);
    }
  }

  async generateDocs() {
    if (!this.validateIntegrationPrerequisites()) {
      return;
    }

    const docsGenerateCommand =
      this.dbtCommandFactory.createDocsGenerateCommand();
    const command =
      await this.getCurrentProjectIntegration().generateDocs(
        docsGenerateCommand,
      );
    this.telemetry.sendTelemetryEvent("generateDocs");
    if (command) {
      this.addCommandToQueue("all", command);
    }
  }

  clean() {
    this.throwIfNotAuthenticated();
    const cleanCommand = this.dbtCommandFactory.createCleanCommand();
    this.telemetry.sendTelemetryEvent("clean");
    return this.getCurrentProjectIntegration().clean(cleanCommand);
  }

  debug(focus: boolean = true) {
    const debugCommand = this.dbtCommandFactory.createDebugCommand(focus);
    this.telemetry.sendTelemetryEvent("debug");
    return this.getCurrentProjectIntegration().debug(debugCommand);
  }

  async installDbtPackages(packages: string[]) {
    this.telemetry.sendTelemetryEvent("installDbtPackages");
    const installPackagesCommand =
      this.dbtCommandFactory.createAddPackagesCommand(packages);
    // Add packages first
    await this.getCurrentProjectIntegration().deps(installPackagesCommand);
    // Then install
    return await this.getCurrentProjectIntegration().deps(
      this.dbtCommandFactory.createInstallDepsCommand(),
    );
  }

  async installDeps(silent = false) {
    this.telemetry.sendTelemetryEvent("installDeps");
    const installDepsCommand =
      this.dbtCommandFactory.createInstallDepsCommand();
    if (silent) {
      installDepsCommand.focus = false;
    }
    return this.getCurrentProjectIntegration().deps(installDepsCommand);
  }

  async compileNode(modelName: string): Promise<string | undefined> {
    this.telemetry.sendTelemetryEvent("compileNode");
    this.throwDiagnosticsErrorIfAvailable();
    try {
      return await this.getCurrentProjectIntegration().unsafeCompileNode(
        modelName,
      );
    } catch (exc: any) {
      if (exc instanceof PythonException) {
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            `An error occured while trying to compile your node: ${modelName}` +
              exc.exception.message +
              ".",
          ),
        );
        this.telemetry.sendTelemetryError("compileNodePythonError", exc);
        return (
          "Exception: " +
          exc.exception.message +
          "\n\n" +
          "Detailed error information:\n" +
          exc
        );
      }
      this.telemetry.sendTelemetryError("compileNodeUnknownError", exc);
      // Unknown error
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not compile model " +
            modelName +
            ": " +
            (exc as Error).message +
            ".",
        ),
      );
      return "Detailed error information:\n" + exc;
    }
  }

  async unsafeCompileNode(modelName: string): Promise<string | undefined> {
    this.telemetry.sendTelemetryEvent("unsafeCompileNode");
    this.throwDiagnosticsErrorIfAvailable();
    this.throwIfNotAuthenticated();
    return await this.getCurrentProjectIntegration().unsafeCompileNode(
      modelName,
    );
  }

  async validateSql(request: { sql: string; dialect: string; models: any[] }) {
    this.throwDiagnosticsErrorIfAvailable();
    this.throwIfNotAuthenticated();
    const sqlValidationThread = this.executionInfrastructure.createPythonBridge(
      this.projectRoot.fsPath,
    );
    const { sql, dialect, models } = request;
    try {
      await sqlValidationThread.ex`from dbt_utils import *`;
      return validateSQLUsingSqlGlot(sqlValidationThread, sql, dialect, models);
    } finally {
      await this.executionInfrastructure.closePythonBridge(sqlValidationThread);
    }
  }

  async validateSQLDryRun(query: string) {
    this.throwIfNotAuthenticated();
    try {
      return this.getCurrentProjectIntegration().validateSQLDryRun(query);
    } catch (exc) {
      const exception = exc as { exception: { message: string } };
      window.showErrorMessage(
        exception.exception.message || "Could not validate sql with dry run.",
      );
      this.telemetry.sendTelemetryError("validateSQLDryRunError", {
        error: exc,
      });
    }
  }

  getDBTVersion(): number[] | undefined {
    // TODO: do this when config or python env changes and cache value
    try {
      return this.getCurrentProjectIntegration().getVersion();
    } catch (exc) {
      window.showErrorMessage(
        extendErrorWithSupportLinks("Could not get dbt version." + exc),
      );
      this.telemetry.sendTelemetryError("getDBTVersionError", { error: exc });
    }
  }

  async compileQuery(
    query: string,
    originalModelName: string | undefined = undefined,
  ): Promise<string | undefined> {
    this.telemetry.sendTelemetryEvent("compileQuery");
    try {
      return await this.getCurrentProjectIntegration().unsafeCompileQuery(
        query,
        originalModelName,
      );
    } catch (exc: any) {
      if (exc instanceof PythonException) {
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            "An error occured while trying to compile your query: " +
              exc.exception.message +
              ".",
          ),
        );
        this.telemetry.sendTelemetryError("compileQueryPythonError", exc);
        return undefined;
      }
      this.telemetry.sendTelemetryError("compileQueryUnknownError", exc);
      // Unknown error
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not compile query: " + (exc as Error).message,
        ),
      );
      return undefined;
    }
  }

  showCompiledSql(modelPath: Uri) {
    this.findModelInTargetfolder(modelPath, "compiled");
  }

  showRunSQL(modelPath: Uri) {
    this.findModelInTargetfolder(modelPath, "run");
  }

  createYMLContent(
    columnsInRelation: { [key: string]: string }[],
    modelName: string,
  ): string {
    let yamlString = "version: 2\n\nmodels:\n";
    yamlString += `  - name: ${modelName}\n    description: ""\n    columns:\n`;
    for (const item of columnsInRelation) {
      yamlString += `    - name: ${item.column}\n      description: ""\n`;
    }
    return yamlString;
  }

  async unsafeCompileQuery(
    query: string,
    originalModelName: string | undefined = undefined,
  ) {
    this.throwIfNotAuthenticated();
    return this.getCurrentProjectIntegration().unsafeCompileQuery(
      query,
      originalModelName,
    );
  }

  async getColumnsOfModel(modelName: string) {
    this.throwIfNotAuthenticated();
    const result =
      await this.getCurrentProjectIntegration().getColumnsOfModel(modelName);
    await this.getCurrentProjectIntegration().cleanupConnections();
    return result;
  }

  async getColumnsOfSource(sourceName: string, tableName: string) {
    this.throwIfNotAuthenticated();
    const result = await this.getCurrentProjectIntegration().getColumnsOfSource(
      sourceName,
      tableName,
    );
    await this.getCurrentProjectIntegration().cleanupConnections();
    return result;
  }

  async getColumnValues(model: string, column: string) {
    this.telemetry.startTelemetryEvent(
      TelemetryEvents["DocumentationEditor/GetDistinctColumnValues"],
      { column, model },
    );

    try {
      this.throwIfNotAuthenticated();
      this.terminal.debug(
        "getColumnValues",
        "finding distinct values for column",
        true,
        { model, column },
      );
      const query = `select ${column} from {{ ref('${model}')}} group by ${column}`;
      const queryExecution =
        await this.getCurrentProjectIntegration().executeSQL(
          query,
          100, // setting this 100 as executeSql needs a limit and distinct values will be usually less in number
          model,
        );
      const result = await queryExecution.executeQuery();
      this.telemetry.endTelemetryEvent(
        TelemetryEvents["DocumentationEditor/GetDistinctColumnValues"],
        undefined,
        { column, model },
      );
      return result.table.rows.flat();
    } catch (error) {
      this.telemetry.endTelemetryEvent(
        TelemetryEvents["DocumentationEditor/GetDistinctColumnValues"],
        error,
        { column, model },
      );
      throw error;
    } finally {
      await this.getCurrentProjectIntegration().cleanupConnections();
    }
  }

  async getBulkSchemaFromDB(req: DBTNode[], signal: AbortSignal) {
    this.throwIfNotAuthenticated();
    try {
      const result =
        await this.getCurrentProjectIntegration().getBulkSchemaFromDB(
          req,
          signal,
        );
      await this.getCurrentProjectIntegration().cleanupConnections();
      return result;
    } finally {
      await this.getCurrentProjectIntegration().cleanupConnections();
    }
  }

  async validateWhetherSqlHasColumns(sql: string) {
    const dialect = this.getAdapterType();
    try {
      return await this.getCurrentProjectIntegration().validateWhetherSqlHasColumns(
        sql,
        dialect,
      );
    } catch (e) {
      this.terminal.error(
        "validateWhetherSqlHasColumnsError",
        "Error while validating whether sql has columns",
        e,
        true,
      );
      return false;
    } finally {
      await this.getCurrentProjectIntegration().cleanupConnections();
    }
  }

  async getCatalog(): Promise<Catalog> {
    this.throwIfNotAuthenticated();
    try {
      const result = await this.getCurrentProjectIntegration().getCatalog();
      return result;
    } catch (exc: any) {
      if (exc instanceof PythonException) {
        this.telemetry.sendTelemetryError("catalogPythonError", exc, {
          adapter: this.getAdapterType(),
        });
        window.showErrorMessage(
          "Some of the scans could not run as connectivity to database for the project " +
            this.getProjectName() +
            " is not available. ",
        );
        return [];
      }
      // Unknown error
      this.telemetry.sendTelemetryError("catalogUnknownError", exc, {
        adapter: this.getAdapterType(),
      });
      window.showErrorMessage(
        "Some of the scans could not run as connectivity to database for the project " +
          this.getProjectName() +
          " is not available. ",
      );
      return [];
    } finally {
      await this.getCurrentProjectIntegration().cleanupConnections();
    }
  }

  async generateSchemaYML(modelPath: Uri, modelName: string) {
    try {
      // Create filePath based on model location
      const currentDir = path.dirname(modelPath.fsPath);
      const location = path.join(currentDir, modelName + "_schema.yml");
      if (!existsSync(location)) {
        this.telemetry.sendTelemetryEvent("generateSchemaYML", {
          adapter: this.getAdapterType(),
        });
        const columnsInRelation = await this.getColumnsOfModel(modelName);
        // Generate yml file content
        const fileContents = this.createYMLContent(
          columnsInRelation,
          modelName,
        );
        writeFileSync(location, fileContents);
        const doc = await workspace.openTextDocument(Uri.file(location));
        window.showTextDocument(doc);
      } else {
        window.showErrorMessage(
          `A file called ${modelName}_schema.yml already exists in ${currentDir}. If you want to generate the schema yml, please rename the other file or delete it if you want to generate the yml again.`,
        );
      }
    } catch (exc: any) {
      if (exc instanceof PythonException) {
        this.telemetry.sendTelemetryError("generateSchemaYMLPythonError", exc, {
          adapter: this.getAdapterType(),
        });
        window.showErrorMessage(
          extendErrorWithSupportLinks(
            "An error occured while trying to generate the schema yml " +
              exc.exception.message +
              ".",
          ),
        );
      }
      // Unknown error
      this.telemetry.sendTelemetryError("generateSchemaYMLUnknownError", exc, {
        adapter: this.getAdapterType(),
      });
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not generate schema yaml: " + (exc as Error).message,
        ),
      );
    }
  }

  async generateModel(
    sourceName: string,
    tableName: string,
    sourcePath: string,
  ) {
    await window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "Generating model...",
        cancellable: false,
      },
      async () => {
        try {
          const prefix = workspace
            .getConfiguration("dbt")
            .get<string>("prefixGenerateModel", "base");

          // Map setting to fileName
          const fileNameTemplateMap: FileNameTemplateMap = {
            "{prefix}_{sourceName}_{tableName}": `${prefix}_${sourceName}_${tableName}`,
            "{prefix}_{sourceName}__{tableName}": `${prefix}_${sourceName}__${tableName}`,
            "{prefix}_{tableName}": `${prefix}_${tableName}`,
            "{tableName}": `${tableName}`,
          };

          // Default filename template
          let fileName = `${prefix}_${sourceName}_${tableName}`;

          const fileNameTemplate = workspace
            .getConfiguration("dbt")
            .get<string>(
              "fileNameTemplateGenerateModel",
              "{prefix}_{sourceName}_{tableName}",
            );

          this.telemetry.sendTelemetryEvent("generateModel", {
            prefix: prefix,
            filenametemplate: fileNameTemplate,
            adapter: this.getAdapterType(),
          });

          // Parse setting to fileName
          if (fileNameTemplate in fileNameTemplateMap) {
            fileName = fileNameTemplateMap[fileNameTemplate];
          }
          // Create filePath based on source.yml location
          const location = path.join(sourcePath, fileName + ".sql");
          if (!existsSync(location)) {
            const columnsInRelation = await this.getColumnsOfSource(
              sourceName,
              tableName,
            );
            this.terminal.debug(
              "dbtProject:generateModel",
              `Generating columns for source ${sourceName} and table ${tableName}`,
              columnsInRelation,
            );

            const fileContents = `with source as (
        select * from {{ source('${sourceName}', '${tableName}') }}
  ),
  renamed as (
      select
          ${columnsInRelation
            .map((column) => `{{ adapter.quote("${column.column}") }}`)
            .join(",\n        ")}

      from source
  )
  select * from renamed
    `;
            writeFileSync(location, fileContents);
            const doc = await workspace.openTextDocument(Uri.file(location));
            window.showTextDocument(doc);
          } else {
            window.showErrorMessage(
              `A model called ${fileName} already exists in ${sourcePath}. If you want to generate the model, please rename the other model or delete it if you want to generate the model again.`,
            );
          }
        } catch (exc: any) {
          if (exc instanceof PythonException) {
            this.telemetry.sendTelemetryError("generateModelPythonError", exc, {
              adapter: this.getAdapterType(),
            });
            window.showErrorMessage(
              "An error occured while trying to generate the model " +
                exc.exception.message,
            );
          }
          // Unknown error
          this.telemetry.sendTelemetryError("generateModelUnknownError", exc, {
            adapter: this.getAdapterType(),
          });
          window.showErrorMessage(
            extendErrorWithSupportLinks(
              "An error occured while trying to generate the model:" +
                exc +
                ".",
            ),
          );
        }
      },
    );
  }

  async executeSQLWithLimit(
    query: string,
    modelName: string,
    limit: number,
    returnImmediately?: boolean,
    returnRawResults?: boolean,
  ) {
    // if user added a semicolon at the end, let,s remove it.
    query = query.replace(/;\s*$/, "");

    // Check if query already contains a LIMIT clause and extract it
    const limitRegex = /\bLIMIT\s+(\d+)\s*$/i;
    const limitMatch = query.match(limitRegex);

    if (limitMatch) {
      // Override the limit with the one from the query
      const queryLimit = parseInt(limitMatch[1], 10);
      if (queryLimit > 0) {
        limit = queryLimit;
      }
      // Remove the LIMIT clause from the query as we'll add it back later
      query = query.replace(limitRegex, "").trim();
    }

    if (limit <= 0) {
      window.showErrorMessage("Please enter a positive number for query limit");
      return;
    }
    this.telemetry.sendTelemetryEvent("executeSQL", {
      adapter: this.getAdapterType(),
      limit: limit.toString(),
    });
    this.terminal.debug("executeSQL", query, {
      adapter: this.getAdapterType(),
      limit: limit.toString(),
    });

    this.throwDiagnosticsErrorIfAvailable();
    this.throwIfNotAuthenticated();
    if (returnImmediately) {
      const execution = await this.getCurrentProjectIntegration().executeSQL(
        query,
        limit,
        modelName,
      );
      const result = await execution.executeQuery();
      if (returnRawResults) {
        return result;
      }
      const rows: JsonObj[] = [];
      // Convert compressed array format to dict[]
      for (let i = 0; i < result.table.rows.length; i++) {
        result.table.rows[i].forEach((value: any, j: any) => {
          rows[i] = { ...rows[i], [result.table.column_names[j]]: value };
        });
      }
      const data = {
        columnNames: result.table.column_names,
        columnTypes: result.table.column_types,
        data: rows,
        raw_sql: query,
        compiled_sql: result.compiled_sql,
      };

      return data;
    }
    this.eventEmitterService.fire({
      command: "executeQuery",
      payload: {
        query,
        fn: this.getCurrentProjectIntegration().executeSQL(
          query,
          limit,
          modelName,
        ),
        projectName: this.getProjectName(),
      },
    });
  }

  executeSQL(
    query: string,
    modelName: string,
    returnImmediately?: boolean,
    returnRawResults?: boolean,
  ) {
    const limit = workspace
      .getConfiguration("dbt")
      .get<number>("queryLimit", 500);
    return this.executeSQLWithLimit(
      query,
      modelName,
      limit,
      returnImmediately,
      returnRawResults,
    );
  }

  async dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private async findModelInTargetfolder(modelPath: Uri, type: string) {
    const targetPath = this.getTargetPath();
    if (!targetPath) {
      return;
    }
    const relativePath = path.relative(
      this.projectRoot.fsPath,
      modelPath.fsPath,
    );

    const targetModels = await workspace.findFiles(
      new RelativePattern(targetPath, path.join(type, "**", relativePath)),
    );
    if (targetModels.length > 0) {
      commands.executeCommand("vscode.open", targetModels[0], {
        preview: false,
        preserveFocus: true,
        viewColumn: ViewColumn.Beside,
      });
    }
  }

  static isResourceNode(resource_type: string): boolean {
    return (
      resource_type === RESOURCE_TYPE_MODEL ||
      resource_type === RESOURCE_TYPE_SEED ||
      resource_type === RESOURCE_TYPE_ANALYSIS ||
      resource_type === RESOURCE_TYPE_SNAPSHOT
    );
  }
  static isResourceHasDbColumns(resource_type: string): boolean {
    return (
      resource_type === RESOURCE_TYPE_MODEL ||
      resource_type === RESOURCE_TYPE_SEED ||
      resource_type === RESOURCE_TYPE_SNAPSHOT
    );
  }

  getNonEphemeralParents(keys: string[]): string[] {
    if (!this._manifestCacheEvent) {
      throw Error(
        "No manifest has been generated. Maybe dbt project has not been parsed yet?",
      );
    }
    const { nodeMetaMap, graphMetaMap } = this._manifestCacheEvent;
    const { parents } = graphMetaMap;
    const parentSet = new Set<string>();
    const queue = keys;
    const visited: Record<string, boolean> = {};
    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (visited[curr]) {
        continue;
      }
      visited[curr] = true;
      const parent = parents.get(curr);
      if (!parent) {
        continue;
      }
      for (const n of parent.nodes) {
        const splits = n.key.split(".");
        const resource_type = splits[0];
        if (resource_type !== RESOURCE_TYPE_MODEL) {
          parentSet.add(n.key);
          continue;
        }
        if (
          nodeMetaMap.lookupByUniqueId(n.key)?.config.materialized ===
          "ephemeral"
        ) {
          queue.push(n.key);
        } else {
          parentSet.add(n.key);
        }
      }
    }
    return Array.from(parentSet);
  }

  getChildrenModels({ table }: { table: string }): Table[] {
    return this.getConnectedTables("children", table);
  }

  getParentModels({ table }: { table: string }): Table[] {
    return this.getConnectedTables("parents", table);
  }

  private getConnectedTables(key: keyof GraphMetaMap, table: string): Table[] {
    const event = this._manifestCacheEvent;
    if (!event) {
      throw Error(
        "No manifest has been generated. Maybe dbt project has not been parsed yet?",
      );
    }
    const { graphMetaMap, nodeMetaMap } = event;
    const node = nodeMetaMap.lookupByBaseName(table);
    if (!node) {
      throw Error("nodeMetaMap has no entries for " + table);
    }
    const dependencyNodes = graphMetaMap[key];
    const dependencyNode = dependencyNodes.get(node.uniqueId);
    if (!dependencyNode) {
      throw Error("graphMetaMap[" + key + "] has no entries for " + table);
    }
    const tables: Map<string, Table> = new Map();
    dependencyNode.nodes.forEach(({ url, key }) => {
      const _node = this.createTable(url, key);
      if (!_node) {
        return;
      }
      if (!tables.has(_node.table)) {
        tables.set(_node.table, _node);
      }
    });
    return Array.from(tables.values()).sort((a, b) =>
      a.table.localeCompare(b.table),
    );
  }

  private createTable(
    tableUrl: string | undefined,
    key: string,
  ): Table | undefined {
    if (!this._manifestCacheEvent) {
      throw new Error("The dbt manifest is not available");
    }
    const splits = key.split(".");
    const nodeType = splits[0];
    const { graphMetaMap, testMetaMap } = this._manifestCacheEvent;
    const upstreamCount = this.getConnectedNodeCount(
      graphMetaMap["children"],
      key,
    );
    const downstreamCount = this.getConnectedNodeCount(
      graphMetaMap["parents"],
      key,
    );
    if (nodeType === RESOURCE_TYPE_SOURCE) {
      const { sourceMetaMap } = this._manifestCacheEvent;
      const schema = splits[2];
      const table = splits[3];
      const _node = sourceMetaMap.get(schema);
      if (!_node) {
        return;
      }
      const _table = _node.tables.find((t) => t.name === table);
      if (!_table) {
        return;
      }
      return {
        table: key,
        label: table,
        url: tableUrl,
        upstreamCount,
        downstreamCount,
        nodeType,
        isExternalProject: _node.is_external_project,
        tests: (graphMetaMap["tests"].get(key)?.nodes || []).map((n) => {
          const testKey = n.label.split(".")[0];
          return { ...testMetaMap.get(testKey), key: testKey };
        }),
        columns: _table.columns,
        description: _table?.description,
        packageName: _node.package_name,
      };
    }
    if (nodeType === RESOURCE_TYPE_METRIC) {
      return {
        table: key,
        label: splits[2],
        url: tableUrl,
        upstreamCount,
        downstreamCount,
        nodeType,
        materialization: undefined,
        tests: [],
        columns: {},
        isExternalProject: false,
      };
    }
    const { nodeMetaMap } = this._manifestCacheEvent;

    const table = splits[2];
    if (nodeType === RESOURCE_TYPE_EXPOSURE) {
      return {
        table: key,
        label: table,
        url: tableUrl,
        upstreamCount,
        downstreamCount,
        nodeType,
        materialization: undefined,
        tests: [],
        columns: {},
        isExternalProject: false,
      };
    }

    const node = nodeMetaMap.lookupByUniqueId(key);
    if (!node) {
      return;
    }

    const materialization = node.config.materialized;
    return {
      table: key,
      label: node.alias,
      url: tableUrl,
      upstreamCount,
      downstreamCount,
      isExternalProject: node.is_external_project,
      nodeType,
      materialization,
      description: node.description,
      columns: node.columns,
      patchPath: node.patch_path,
      tests: (graphMetaMap["tests"].get(key)?.nodes || []).map((n) => {
        const testKey = n.label.split(".")[0];
        return { ...testMetaMap.get(testKey), key: testKey };
      }),
      packageName: node.package_name,
      meta: node.meta,
    };
  }

  private getConnectedNodeCount(g: NodeGraphMap, key: string) {
    return g.get(key)?.nodes.length || 0;
  }

  mergeColumnsFromDB(
    node: Pick<ModelNode, "columns">,
    columnsFromDB: DBColumn[],
  ) {
    if (!columnsFromDB || columnsFromDB.length === 0) {
      return false;
    }
    if (columnsFromDB.length > 100) {
      // Flagging events where more than 100 columns are fetched from db to get a sense of how many of these happen
      this.telemetry.sendTelemetryEvent("excessiveColumnsFetchedFromDB");
    }
    const columnsFromManifest: Record<string, ColumnMetaData> = {};
    Object.entries(node.columns).forEach(([k, v]) => {
      columnsFromManifest[getColumnNameByCase(k, this.getAdapterType())] = v;
    });

    for (const c of columnsFromDB) {
      const columnNameFromDB = getColumnNameByCase(
        c.column,
        this.getAdapterType(),
      );
      const existing_column = columnsFromManifest[columnNameFromDB];
      if (existing_column) {
        existing_column.data_type = (
          existing_column.data_type || c.dtype
        )?.toLowerCase();
        continue;
      }
      node.columns[columnNameFromDB] = {
        name: columnNameFromDB,
        data_type: c.dtype?.toLowerCase(),
        description: "",
        meta: {},
      };
    }
    if (Object.keys(node.columns).length > columnsFromDB.length) {
      // Flagging events where columns fetched from db are less than the number of columns in the manifest
      this.telemetry.sendTelemetryEvent("possibleStaleSchema");
    }
    return true;
  }

  public findPackageVersion(packageName: string) {
    const version =
      this.getCurrentProjectIntegration().findPackageVersion(packageName);
    this.terminal.debug(
      "dbtProject:findPackageVersion",
      `found ${packageName} version: ${version}`,
    );
    return version;
  }

  async getBulkCompiledSql(models: string[]) {
    if (models.length === 0) {
      return {};
    }
    if (!this._manifestCacheEvent) {
      throw new Error("The dbt manifest is not available");
    }
    const { nodeMetaMap } = this._manifestCacheEvent;
    return this.getCurrentProjectIntegration().getBulkCompiledSQL(
      models
        .map((m) => nodeMetaMap.lookupByUniqueId(m))
        .filter(Boolean) as NodeMetaData[],
    );
  }

  async getNodesWithDBColumns(modelsToFetch: string[], signal: AbortSignal) {
    const mappedNode: Record<string, ModelNode> = {};
    const relationsWithoutColumns: string[] = [];
    if (modelsToFetch.length === 0) {
      return { mappedNode, relationsWithoutColumns, mappedCompiledSql: {} };
    }
    if (!this._manifestCacheEvent) {
      throw new Error("The dbt manifest is not available");
    }
    const { nodeMetaMap, sourceMetaMap } = this._manifestCacheEvent;
    const bulkSchemaRequest: DBTNode[] = [];

    for (const key of modelsToFetch) {
      if (this.dbSchemaCache[key]) {
        this.telemetry.sendTelemetryEvent("dbSchemaCacheHit", { model: key });
        mappedNode[key] = this.dbSchemaCache[key];
        continue;
      }
      const splits = key.split(".");
      const resource_type = splits[0];
      if (resource_type === RESOURCE_TYPE_SOURCE) {
        const source = sourceMetaMap.get(splits[2]);
        const tableName = splits[3];
        if (!source) {
          continue;
        }
        const table = source?.tables.find((t) => t.name === tableName);
        if (!table) {
          continue;
        }
        bulkSchemaRequest.push({
          unique_id: key,
          name: source.name,
          resource_type,
          table: table.name,
        } as SourceNode);
        const node = {
          database: source.database,
          schema: source.schema,
          name: table.name,
          alias: table.identifier,
          uniqueId: key,
          columns: table.columns,
          path: table.path,
        };
        mappedNode[key] = node;
      } else if (DBTProject.isResourceNode(resource_type)) {
        const node = nodeMetaMap.lookupByUniqueId(key);
        if (!node) {
          continue;
        }
        if (DBTProject.isResourceHasDbColumns(resource_type)) {
          bulkSchemaRequest.push({
            unique_id: key,
            name: node.name,
            resource_type,
          });
        }
        mappedNode[key] = node;
      }
    }

    const dbSchemaRequest = bulkSchemaRequest.filter(
      (r) => r.resource_type !== RESOURCE_TYPE_MODEL,
    );

    const sqlglotSchemaRequest = bulkSchemaRequest.filter(
      (r) => r.resource_type === RESOURCE_TYPE_MODEL,
    );
    let startTime = Date.now();
    const sqlglotSchemaResponse = await this.getBulkCompiledSql(
      sqlglotSchemaRequest.map((r) => r.unique_id),
    );
    const compiledSqlTime = Date.now() - startTime;

    if (signal.aborted) {
      return {
        mappedNode,
        relationsWithoutColumns,
        mappedCompiledSql: sqlglotSchemaResponse,
      };
    }

    const sqlglotSchemas: Record<string, DBColumn[]> = {};
    const dialect = this.getAdapterType();

    startTime = Date.now();
    // can't parallelize because underlying python lock
    for (const r of sqlglotSchemaRequest) {
      if (!sqlglotSchemaResponse[r.unique_id]) {
        dbSchemaRequest.push(r);
        continue;
      }

      try {
        const columns =
          await this.getCurrentProjectIntegration().fetchSqlglotSchema(
            sqlglotSchemaResponse[r.unique_id],
            dialect,
          );
        sqlglotSchemas[r.unique_id] = columns.map((c) => ({
          column: c,
          dtype: "string",
        }));
      } catch (e) {
        this.terminal.warn(
          "sqlglotSchemaFetchingFailed",
          `Error while sqlglot schema fetching for ${r.unique_id}`,
          true,
          e,
        );
        dbSchemaRequest.push(r);
      }
    }
    const sqlglotSchemaTime = Date.now() - startTime;

    if (signal.aborted) {
      return {
        mappedNode,
        relationsWithoutColumns,
        mappedCompiledSql: sqlglotSchemaResponse,
      };
    }

    startTime = Date.now();
    const dbSchemaResponse =
      await this.getCurrentProjectIntegration().getBulkSchemaFromDB(
        dbSchemaRequest,
        signal,
      );
    const dbFetchTime = Date.now() - startTime;

    const bulkSchemaResponse = { ...dbSchemaResponse, ...sqlglotSchemas };

    for (const key of modelsToFetch) {
      if (!bulkSchemaRequest.find((r) => r.unique_id === key)) {
        continue;
      }
      const node = mappedNode[key];
      if (!node) {
        continue;
      }
      const dbColumnAdded = this.mergeColumnsFromDB(
        node,
        bulkSchemaResponse[key],
      );
      if (!dbColumnAdded) {
        relationsWithoutColumns.push(key);
      } else {
        // only adding to cache when successfully fetched columns from db
        this.dbSchemaCache[key] = mappedNode[key];
      }
    }

    console.log("getNodesWithDBColumnsTimings", {
      compiledSqlTime,
      sqlglotSchemaTime,
      dbFetchTime,
      modelInfosLength: modelsToFetch.length,
    });
    this.telemetry.sendTelemetryEvent("getNodesWithDBColumnsTimings", {
      compiledSqlTime: compiledSqlTime.toString(),
      sqlglotSchemaTime: sqlglotSchemaTime.toString(),
      dbFetchTime: dbFetchTime.toString(),
      modelInfosLength: modelsToFetch.length.toString(),
    });

    return {
      mappedNode,
      relationsWithoutColumns,
      mappedCompiledSql: sqlglotSchemaResponse,
    };
  }

  async applyDeferConfig(): Promise<void> {
    const deferConfig = this.getDeferConfig();
    await this.getCurrentProjectIntegration().applyDeferConfig(deferConfig);
  }

  throwDiagnosticsErrorIfAvailable() {
    // Check integration diagnostics
    const integrationDiagnostics =
      this.getCurrentProjectIntegration().getDiagnostics();
    const allIntegrationDiagnostics = [
      ...integrationDiagnostics.pythonBridgeDiagnostics,
      ...integrationDiagnostics.rebuildManifestDiagnostics,
    ];

    for (const diagnostic of allIntegrationDiagnostics) {
      if (diagnostic.severity === "error") {
        throw new Error(diagnostic.message);
      }
    }

    // Check VSCode diagnostic collections
    const vscodeCollections: DiagnosticCollection[] = [this.projectHealth];

    for (const diagnosticCollection of vscodeCollections) {
      for (const [_, diagnostics] of diagnosticCollection) {
        const error = diagnostics.find(
          (diagnostic) => diagnostic.severity === DiagnosticSeverity.Error,
        );
        if (error) {
          throw new Error(error.message);
        }
      }
    }
  }

  private getDeferConfig(): DeferConfig | undefined {
    const relativePath = getProjectRelativePath(this.projectRoot);
    const currentConfig: Record<string, DeferConfig> =
      this.deferToProdService.getDeferConfigByWorkspace();
    if (currentConfig[relativePath]) {
      const config = currentConfig[relativePath];
      return {
        deferToProduction: config.deferToProduction,
        manifestPathForDeferral: config.manifestPathForDeferral,
        favorState: config.favorState,
      };
    }
  }

  private createQueue(queueName: string) {
    this.queues.set(queueName, []);
  }

  private addCommandToQueue(queueName: string, command: DBTCommand): void {
    this.queues.get(queueName)!.push({
      command: async (signal) => {
        await command.execute(signal);
      },
      statusMessage: command.statusMessage,
      focus: command.focus,
      signal: command.signal,
      showProgress: command.showProgress,
    });
    this.pickCommandToRun(queueName);
  }

  private async pickCommandToRun(queueName: string): Promise<void> {
    const queue = this.queues.get(queueName)!;
    const running = this.queueStates.get(queueName);
    if (!running && queue.length > 0) {
      this.queueStates.set(queueName, true);
      const { command, statusMessage, focus, showProgress } = queue.shift()!;
      const commandExecution = async (signal?: AbortSignal) => {
        try {
          await command(signal);
        } catch (error) {
          if (error instanceof NoCredentialsError) {
            this.altimateAuthService.handlePreviewFeatures();
            return;
          }
          window.showErrorMessage(
            extendErrorWithSupportLinks(
              `Could not run command '${statusMessage}': ` + error + ".",
            ),
          );
          this.telemetry.sendTelemetryError("queueRunCommandError", error, {
            command: statusMessage,
          });
        }
      };

      if (showProgress) {
        await window.withProgress(
          {
            location: focus
              ? ProgressLocation.Notification
              : ProgressLocation.Window,
            cancellable: true,
            title: statusMessage,
          },
          async (_, token) => {
            const abortController = new AbortController();
            token.onCancellationRequested(() => abortController.abort());
            await commandExecution(abortController.signal);
          },
        );
      } else {
        await commandExecution();
      }
      this.queueStates.set(queueName, false);
      this.pickCommandToRun(queueName);
    }
  }

  private getCurrentProjectIntegration(): DBTProjectIntegration {
    return this.dbtProjectIntegration.getCurrentProjectIntegration();
  }
}
