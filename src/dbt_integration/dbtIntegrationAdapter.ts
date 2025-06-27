import { CommandProcessResult } from "./commandProcessExecution";
import {
  DBTProjectIntegration,
  DBTCommandFactory,
  DBTCommand,
} from "./dbtIntegration";
import { ProjectHealthcheck } from "./dbtCoreIntegration";
import {
  Catalog,
  CATALOG_FILE,
  DataPilotHealtCheckParams,
  DBColumn,
  DBT_PROJECT_FILE,
  DBTNode,
  DeferConfig,
  GraphMetaMap,
  MANIFEST_FILE,
  ParsedManifest,
  RESOURCE_TYPE_MODEL,
  RESOURCE_TYPE_SOURCE,
  RUN_RESULTS_FILE,
  RunModelParams,
  RunResultsData,
  RunResultsEventData,
  Table,
} from "./domain";
import { DBTConfiguration } from "./configuration";
import { DBTFacade } from "./dbtFacade";
import { DBTDiagnosticData } from "./diagnostics";
import { PythonException } from "python-bridge";
import { YAMLError } from "yaml";
import { DocParser } from "./parsers/docParser";
import { GraphParser } from "./parsers/graphParser";
import { MacroParser } from "./parsers/macroParser";
import { NodeParser } from "./parsers/nodeParser";
import { SourceParser } from "./parsers/sourceParser";
import { TestParser } from "./parsers/testParser";
import { ExposureParser } from "./parsers/exposureParser";
import { MetricParser } from "./parsers/metricParser";
import { ChildrenParentParser } from "./parsers/childrenParentParser";
import { ModelDepthParser } from "./parsers/modelDepthParser";
import { DBTTerminal } from "./terminal";
import path from "path";
import { FSWatcher, watch } from "fs";
import { EventEmitter } from "events";
import { readFileSync } from "fs";

export const debounce = (fn: (args: unknown) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
};

/**
 * DBTProjectIntegrationAdapter provides a framework-agnostic implementation of DBTFacade
 * that delegates to the appropriate dbt integration (core, cloud, fusion, corecommand)
 * based on configuration. This class has no VSCode dependencies.
 */
export class DBTProjectIntegrationAdapter
  extends EventEmitter
  implements DBTFacade
{
  private currentIntegration: DBTProjectIntegration;
  private consecutiveReadFailures = 0;
  private sourceFileWatchers: FSWatcher[] = [];
  private currentSourcePaths?: string[];
  private isWatchingSourceFiles = false;
  private projectConfigWatcher?: FSWatcher;
  private depsInitialized = false;
  private projectConfigDiagnostics: DBTDiagnosticData[] = [];
  private targetWatchers: FSWatcher[] = [];
  private currentTargetPath?: string;
  private isWatchingTargetFiles = false;
  private lastParsedManifest?: ParsedManifest;

  constructor(
    private dbtConfiguration: DBTConfiguration,
    private dbtCommandFactory: DBTCommandFactory,
    private dbtCoreIntegrationFactory: (
      projectRoot: string,
      diagnostics: DBTDiagnosticData[],
      deferConfig: DeferConfig | undefined,
      onDiagnosticsChanged: () => void,
    ) => DBTProjectIntegration,
    private dbtCloudIntegrationFactory: (
      projectRoot: string,
      diagnostics: DBTDiagnosticData[],
      deferConfig: DeferConfig | undefined,
      onDiagnosticsChanged: () => void,
    ) => DBTProjectIntegration,
    private dbtFusionIntegrationFactory: (
      projectRoot: string,
      diagnostics: DBTDiagnosticData[],
      deferConfig: DeferConfig | undefined,
      onDiagnosticsChanged: () => void,
    ) => DBTProjectIntegration,
    private dbtCoreCommandIntegrationFactory: (
      projectRoot: string,
      diagnostics: DBTDiagnosticData[],
      deferConfig: DeferConfig | undefined,
      onDiagnosticsChanged: () => void,
    ) => DBTProjectIntegration,
    private projectRoot: string,
    private deferConfig: DeferConfig | undefined,
    private childrenParentParser: ChildrenParentParser,
    private nodeParser: NodeParser,
    private macroParser: MacroParser,
    private metricParser: MetricParser,
    private graphParser: GraphParser,
    private sourceParser: SourceParser,
    private testParser: TestParser,
    private exposureParser: ExposureParser,
    private docParser: DocParser,
    private terminal: DBTTerminal,
    private modelDepthParser: ModelDepthParser,
  ) {
    super();
    this.currentIntegration = this.createIntegration();
  }

  private createIntegration(): DBTProjectIntegration {
    const integrationMode = this.dbtConfiguration.getDbtIntegration();

    const onDiagnosticsChanged = () => this.emit("diagnosticsChanged");

    switch (integrationMode) {
      case "cloud":
        return this.dbtCloudIntegrationFactory(
          this.projectRoot,
          this.projectConfigDiagnostics,
          this.deferConfig,
          onDiagnosticsChanged,
        );
      case "fusion":
        return this.dbtFusionIntegrationFactory(
          this.projectRoot,
          this.projectConfigDiagnostics,
          this.deferConfig,
          onDiagnosticsChanged,
        );
      case "corecommand":
        return this.dbtCoreCommandIntegrationFactory(
          this.projectRoot,
          this.projectConfigDiagnostics,
          this.deferConfig,
          onDiagnosticsChanged,
        );
      default: // "core"
        return this.dbtCoreIntegrationFactory(
          this.projectRoot,
          this.projectConfigDiagnostics,
          this.deferConfig,
          onDiagnosticsChanged,
        );
    }
  }

  // Project Information
  getProjectName(): string {
    return this.currentIntegration.getProjectName();
  }

  getProjectRoot(): string {
    return this.projectRoot;
  }

  getSelectedTarget(): string | undefined {
    return this.currentIntegration.getSelectedTarget();
  }

  async getTargetNames(): Promise<string[]> {
    return this.currentIntegration.getTargetNames();
  }

  async setSelectedTarget(targetName: string): Promise<void> {
    await this.currentIntegration.setSelectedTarget(targetName);
    await this.currentIntegration.applySelectedTarget();
  }

  getDBTProjectFilePath(): string {
    // Construct path from project root since integrations don't provide this directly
    return path.join(this.projectRoot, DBT_PROJECT_FILE);
  }

  getTargetPath(): string | undefined {
    return this.currentIntegration.getTargetPath();
  }

  getPackageInstallPath(): string | undefined {
    return this.currentIntegration.getPackageInstallPath();
  }

  getModelPaths(): string[] | undefined {
    return this.currentIntegration.getModelPaths();
  }

  getSeedPaths(): string[] | undefined {
    return this.currentIntegration.getSeedPaths();
  }

  getMacroPaths(): string[] | undefined {
    return this.currentIntegration.getMacroPaths();
  }

  getManifestPath(): string | undefined {
    const targetPath = this.getTargetPath();
    return targetPath ? path.join(targetPath, MANIFEST_FILE) : undefined;
  }

  getCatalogPath(): string | undefined {
    const targetPath = this.getTargetPath();
    return targetPath ? path.join(targetPath, CATALOG_FILE) : undefined;
  }

  // Diagnostics and Status
  getPythonBridgeStatus(): any {
    return this.currentIntegration.getPythonBridgeStatus();
  }

  getDiagnostics() {
    this.currentIntegration.getDiagnostics();
  }

  private addProjectConfigDiagnostic(diagnostic: DBTDiagnosticData): void {
    // Add to project config diagnostics array
    this.projectConfigDiagnostics.push(diagnostic);
    this.emit("diagnosticsChanged");
  }

  private clearProjectConfigDiagnostics(): void {
    // Clear project config diagnostics
    this.projectConfigDiagnostics.length = 0;
    this.emit("diagnosticsChanged");
  }

  getAdapterType(): string {
    return this.currentIntegration.getAdapterType() || "unknown";
  }

  getDBTVersion(): number[] | undefined {
    return this.currentIntegration.getVersion();
  }

  // Project Operations
  async initialize(): Promise<void> {
    await this.currentIntegration.initializeProject();
    await this.refreshProjectConfig();
    this.emit("projectConfigChanged");
    await this.rebuildManifest();

    // Start project config watcher and file watchers automatically after initialization
    this.startProjectConfigWatcher();
    this.startSourceFilesWatcher();
    this.startTargetWatchers();
  }

  async refreshProjectConfig(): Promise<void> {
    this.terminal.debug(
      "DBTProjectIntegrationAdapter",
      `Going to refresh the project "${this.getProjectName()}" at ${
        this.projectRoot
      } configuration`,
    );

    try {
      await this.currentIntegration.refreshProjectConfig();
      // Clear any existing project config diagnostics
      this.clearProjectConfigDiagnostics();
    } catch (error) {
      const projectConfigFile = this.getDBTProjectFilePath();

      if (error instanceof YAMLError) {
        this.addProjectConfigDiagnostic({
          filePath: projectConfigFile,
          message: "dbt_project.yml is invalid : " + error.message,
          severity: "error",
          range: {
            startLine: 0,
            startColumn: 0,
            endLine: 999,
            endColumn: 999,
          },
          source: "dbt-project",
          category: "project-config",
        });
      } else if (error instanceof PythonException) {
        this.addProjectConfigDiagnostic({
          filePath: projectConfigFile,
          message: "dbt configuration is invalid : " + error.exception.message,
          severity: "error",
          range: {
            startLine: 0,
            startColumn: 0,
            endLine: 999,
            endColumn: 999,
          },
          source: "dbt-project",
          category: "project-config",
        });
      }

      this.terminal.debug(
        "DBTProjectIntegrationAdapter",
        `An error occurred while trying to refresh the project "${this.getProjectName()}" at ${
          this.projectRoot
        } configuration`,
        error,
      );
      return;
    }

    // Update file watchers when project config changes
    this.updateSourceFilesWatchers();
    this.updateTargetWatchers();

    const sourcePaths = this.getModelPaths();
    const macroPaths = this.getMacroPaths();
    const seedPaths = this.getSeedPaths();

    if (sourcePaths && macroPaths && seedPaths) {
      this.terminal.debug(
        "DBTProjectIntegrationAdapter",
        `Project config refreshed successfully for "${this.getProjectName()}" at ${
          this.projectRoot
        }`,
        "targetPaths",
        this.getTargetPath(),
        "modelPaths",
        this.getModelPaths(),
        "seedPaths",
        this.getSeedPaths(),
        "macroPaths",
        this.getMacroPaths(),
        "packagesInstallPath",
        this.getPackageInstallPath(),
        "version",
        this.getDBTVersion(),
        "adapterType",
        this.getAdapterType(),
      );
    } else {
      this.terminal.warn(
        "DBTProjectIntegrationAdapter",
        "Could not complete project config refresh because project is not initialized properly. dbt path settings cannot be determined",
      );
    }
  }

  async rebuildManifest(): Promise<void> {
    this.terminal.debug(
      "DBTProjectIntegrationAdapter",
      `Going to rebuild the manifest for project at ${this.projectRoot}`,
    );

    // Emit start status
    this.emit("rebuildManifestStatusChange", {
      inProgress: true,
    });

    // Install dependencies if configured and not already initialized
    const installDepsOnProjectInitialization =
      this.dbtConfiguration.getInstallDepsOnProjectInitialization();
    if (!this.depsInitialized && installDepsOnProjectInitialization) {
      try {
        this.terminal.debug(
          "DBTProjectIntegrationAdapter",
          "Installing dbt dependencies before first manifest rebuild",
        );
        await this.installDeps(true);
        this.depsInitialized = true;
      } catch (error: any) {
        // this is best effort
        this.terminal.warn(
          "DBTProjectIntegrationAdapter",
          "An error occurred while installing dependencies",
          error,
        );
      }
    }

    try {
      await this.currentIntegration.rebuildManifest();
      this.terminal.debug(
        "DBTProjectIntegrationAdapter",
        `Finished rebuilding the manifest for project at ${this.projectRoot}`,
      );

      // Parse and emit manifestCreated event after successful rebuild
      const parsedManifest = await this.parseManifest();
      if (parsedManifest) {
        this.emit("manifestCreated", parsedManifest);
      }
    } catch (error) {
      this.terminal.error(
        "DBTProjectIntegrationAdapter",
        "Error rebuilding manifest",
        error,
      );
      throw error;
    } finally {
      // Emit end status regardless of success/failure
      this.emit("rebuildManifestStatusChange", {
        inProgress: false,
      });
    }
  }

  async parseManifest(): Promise<ParsedManifest | undefined> {
    this.terminal.debug(
      "DBTProjectIntegrationAdapter",
      `Going to parse manifest for project at ${this.projectRoot}`,
    );

    const targetPath = this.getTargetPath();
    if (!targetPath) {
      this.terminal.debug(
        "DBTProjectIntegrationAdapter",
        "targetPath should be defined at this stage for project " +
          this.projectRoot,
      );
      return;
    }

    const manifest = this.readAndParseManifestFile(targetPath);
    if (manifest === undefined) {
      return;
    }

    const { nodes, sources, macros, semantic_models, docs, exposures } =
      manifest;

    // Run all parsers in parallel
    const parentChildrenPromise =
      this.childrenParentParser.createChildrenParentMetaMap(nodes);
    const nodeMetaMapPromise = this.nodeParser.createNodeMetaMap(nodes, this);
    const macroMetaMapPromise = this.macroParser.createMacroMetaMap(
      macros,
      this,
    );
    const metricMetaMapPromise = this.metricParser.createMetricMetaMap(
      semantic_models,
      this,
    );
    const sourceMetaMapPromise = this.sourceParser.createSourceMetaMap(
      sources,
      this,
    );
    const testMetaMapPromise = this.testParser.createTestMetaMap(nodes, this);
    const exposuresMetaMapPromise = this.exposureParser.createExposureMetaMap(
      exposures,
      this,
    );
    const docMetaMapPromise = this.docParser.createDocMetaMap(docs, this);

    const [
      { parentMetaMap, childMetaMap },
      nodeMetaMap,
      macroMetaMap,
      metricMetaMap,
      sourceMetaMap,
      testMetaMap,
      docMetaMap,
      exposureMetaMap,
    ] = await Promise.all([
      parentChildrenPromise,
      nodeMetaMapPromise,
      macroMetaMapPromise,
      metricMetaMapPromise,
      sourceMetaMapPromise,
      testMetaMapPromise,
      docMetaMapPromise,
      exposuresMetaMapPromise,
    ]);

    // Calculate model depths
    const modelDepthMap = this.modelDepthParser.createModelDepthsMap(
      nodes,
      parentMetaMap,
      childMetaMap,
    );

    const graphMetaMap = this.graphParser.createGraphMetaMap(
      this,
      parentMetaMap,
      childMetaMap,
      nodeMetaMap,
      sourceMetaMap,
      testMetaMap,
      metricMetaMap,
    );

    const parsedManifest = {
      nodeMetaMap,
      macroMetaMap,
      metricMetaMap,
      sourceMetaMap,
      graphMetaMap,
      testMetaMap,
      docMetaMap,
      exposureMetaMap,
      modelDepthMap,
    };

    // Store reference to last parsed manifest
    this.lastParsedManifest = parsedManifest;

    return parsedManifest;
  }

  private readAndParseManifestFile(targetPath: string): any {
    const pathParts = [targetPath];
    if (!path.isAbsolute(targetPath)) {
      pathParts.unshift(this.projectRoot);
    }
    const manifestLocation = path.join(...pathParts, MANIFEST_FILE);

    this.terminal.debug(
      "DBTProjectIntegrationAdapter",
      `Reading manifest at ${manifestLocation} for project at ${this.projectRoot}`,
    );

    try {
      const { readFileSync } = require("fs");
      const manifestFile = readFileSync(manifestLocation, "utf8");
      const parsedManifest = JSON.parse(manifestFile);
      this.consecutiveReadFailures = 0; // Reset counter on success
      return parsedManifest;
    } catch (error) {
      this.consecutiveReadFailures++;
      if (this.consecutiveReadFailures > 3) {
        this.terminal.error(
          "DBTProjectIntegrationAdapter",
          `Could not read/parse manifest file at ${manifestLocation} after ${this.consecutiveReadFailures} attempts`,
          error,
        );
      }
    }
  }

  // Node.js File Watcher Operations
  private startSourceFilesWatcher(): void {
    if (this.isWatchingSourceFiles) {
      return;
    }

    this.terminal.debug(
      "DBTProjectIntegrationAdapter",
      `Starting Node.js file watchers for project at ${this.projectRoot}`,
    );

    this.isWatchingSourceFiles = true;
    this.setupSourceFileWatchers();
  }

  private stopFileWatching(): void {
    if (!this.isWatchingSourceFiles) {
      return;
    }

    this.terminal.debug(
      "DBTProjectIntegrationAdapter",
      `Stopping Node.js file watchers for project at ${this.projectRoot}`,
    );

    this.disposeSourceFileWatchers();
    this.isWatchingSourceFiles = false;
  }

  private updateSourceFilesWatchers(): void {
    if (!this.isWatchingSourceFiles) {
      return;
    }

    const sourcePaths = this.getModelPaths();
    const macroPaths = this.getMacroPaths();
    const seedPaths = this.getSeedPaths();

    if (!sourcePaths || !macroPaths || !seedPaths) {
      this.terminal.debug(
        "DBTProjectIntegrationAdapter",
        "Cannot update file watchers - source paths not available",
      );
      return;
    }

    const allPaths = [...sourcePaths, ...macroPaths, ...seedPaths];

    // Check if paths have changed
    if (
      this.currentSourcePaths &&
      this.arrayEquals(this.currentSourcePaths, allPaths)
    ) {
      return;
    }

    this.terminal.debug(
      "DBTProjectIntegrationAdapter",
      "Updating Node.js file watchers with new paths",
      allPaths,
    );

    // Recreate watchers with new paths
    this.disposeSourceFileWatchers();
    this.currentSourcePaths = allPaths;
    this.setupSourceFileWatchers();
  }

  private setupSourceFileWatchers(): void {
    if (!this.currentSourcePaths) {
      // Initialize currentSourcePaths if not already set
      const sourcePaths = this.getModelPaths();
      const macroPaths = this.getMacroPaths();
      const seedPaths = this.getSeedPaths();

      if (!sourcePaths || !macroPaths || !seedPaths) {
        this.terminal.debug(
          "DBTProjectIntegrationAdapter",
          "Cannot setup file watchers - source paths not available",
        );
        return;
      }

      this.currentSourcePaths = [...sourcePaths, ...macroPaths, ...seedPaths];
    }

    const debouncedFileChangeHandler = debounce(async () => {
      this.terminal.debug(
        "DBTProjectIntegrationAdapter",
        `SourceFileChanged event fired for "${this.getProjectName()}" at ${this.projectRoot}`,
      );
      this.emit("sourceFileChanged");
      try {
        await this.rebuildManifest();
      } catch (error) {
        this.terminal.error(
          "DBTProjectIntegrationAdapterError",
          `Failed to rebuild manifest after file change: ${error instanceof Error ? error.message : String(error)}`,
          error,
        );
      }
    }, this.getDebounceForRebuildManifest());

    for (const sourcePath of this.currentSourcePaths) {
      try {
        // Watch directory recursively for dbt file types
        const watcher = watch(
          sourcePath,
          { recursive: true },
          (eventType, filename) => {
            if (filename && this.isDbtFile(filename)) {
              this.terminal.debug(
                "DBTProjectIntegrationAdapter",
                `File ${eventType}: ${filename} in ${sourcePath}`,
              );
              debouncedFileChangeHandler();
            }
          },
        );

        this.sourceFileWatchers.push(watcher);

        this.terminal.debug(
          "DBTProjectIntegrationAdapter",
          `Started Node.js file watcher for ${sourcePath}`,
        );
      } catch (error) {
        this.terminal.error(
          "DBTProjectIntegrationAdapter",
          `Failed to create file watcher for ${sourcePath}`,
          error,
        );
      }
    }
  }

  private disposeSourceFileWatchers(): void {
    for (const watcher of this.sourceFileWatchers) {
      try {
        watcher.close();
      } catch (error) {
        this.terminal.error(
          "DBTProjectIntegrationAdapter",
          "Error closing file watcher",
          error,
        );
      }
    }
    this.sourceFileWatchers = [];
  }

  private isDbtFile(filename: string): boolean {
    const ext = path.extname(filename).toLowerCase();
    return [".sql", ".yml", ".yaml", ".csv"].includes(ext);
  }

  private arrayEquals<T>(a: T[], b: T[]): boolean {
    return a.length === b.length && a.every((val, i) => val === b[i]);
  }

  getDebounceForRebuildManifest(): number {
    // Use the same debounce timing as the integration
    return this.currentIntegration.getDebounceForRebuildManifest?.() || 500;
  }

  // Project Config Watcher Operations
  private startProjectConfigWatcher(): void {
    if (this.projectConfigWatcher) {
      return;
    }

    const dbtProjectFilePath = this.getDBTProjectFilePath();

    this.terminal.debug(
      "DBTProjectIntegrationAdapter",
      `Starting Node.js project config watcher for ${dbtProjectFilePath}`,
    );

    try {
      const debouncedConfigChangeHandler = debounce(async () => {
        this.terminal.debug(
          "DBTProjectIntegrationAdapter",
          "dbt_project.yml changed, refreshing project config",
        );

        try {
          await this.refreshProjectConfig();
          this.emit("projectConfigChanged");
          await this.rebuildManifest();
        } catch (error) {
          this.terminal.error(
            "DBTProjectIntegrationAdapter",
            "Error refreshing project config after file change",
            error,
          );
        }
      }, 500);

      this.projectConfigWatcher = watch(dbtProjectFilePath, (eventType) => {
        if (eventType === "change") {
          this.terminal.debug(
            "DBTProjectIntegrationAdapter",
            `dbt_project.yml ${eventType} detected`,
          );
          debouncedConfigChangeHandler();
        }
      });

      this.terminal.debug(
        "DBTProjectIntegrationAdapter",
        `Started Node.js project config watcher for ${dbtProjectFilePath}`,
      );
    } catch (error) {
      this.terminal.error(
        "DBTProjectIntegrationAdapter",
        `Failed to create project config watcher for ${dbtProjectFilePath}`,
        error,
      );
    }
  }

  private stopProjectConfigWatcher(): void {
    if (this.projectConfigWatcher) {
      try {
        this.projectConfigWatcher.close();
        this.projectConfigWatcher = undefined;
        this.terminal.debug(
          "DBTProjectIntegrationAdapter",
          "Stopped Node.js project config watcher",
        );
      } catch (error) {
        this.terminal.error(
          "DBTProjectIntegrationAdapter",
          "Error closing project config watcher",
          error,
        );
      }
    }
  }

  async performDatapilotHealthcheck(
    args: DataPilotHealtCheckParams,
  ): Promise<ProjectHealthcheck> {
    // This method requires casting since the integration interface doesn't include it
    // but it's available on dbt core integration
    if ("performDatapilotHealthcheck" in this.currentIntegration) {
      return (this.currentIntegration as any).performDatapilotHealthcheck(args);
    }
    throw new Error(
      "Datapilot healthcheck not supported by current integration",
    );
  }

  // Model Execution
  async unsafeRunModelImmediately(
    runModelParams: RunModelParams,
  ): Promise<CommandProcessResult> {
    const command =
      this.dbtCommandFactory.createRunModelCommand(runModelParams);
    // Override the defaults to match the immediate execution requirements
    command.focus = false;
    command.showProgress = false;
    command.logToTerminal = false;

    return this.currentIntegration.executeCommandImmediately(command);
  }

  async unsafeBuildModelImmediately(
    runModelParams: RunModelParams,
  ): Promise<CommandProcessResult> {
    const command =
      this.dbtCommandFactory.createBuildModelCommand(runModelParams);
    // Override the defaults to match the immediate execution requirements
    command.focus = false;
    command.showProgress = false;
    command.logToTerminal = false;

    return this.currentIntegration.executeCommandImmediately(command);
  }

  async unsafeBuildProjectImmediately(): Promise<CommandProcessResult> {
    const command = this.dbtCommandFactory.createBuildProjectCommand();
    // Override the defaults to match the immediate execution requirements
    command.focus = false;
    command.showProgress = false;
    command.logToTerminal = false;

    return this.currentIntegration.executeCommandImmediately(command);
  }

  // Testing
  async unsafeRunTestImmediately(
    testName: string,
  ): Promise<CommandProcessResult> {
    const command = this.dbtCommandFactory.createTestModelCommand(testName);
    // Override the defaults to match the immediate execution requirements
    command.focus = false;
    command.showProgress = false;
    command.logToTerminal = false;

    return this.currentIntegration.executeCommandImmediately(command);
  }

  async unsafeRunModelTestImmediately(
    modelName: string,
  ): Promise<CommandProcessResult> {
    return this.unsafeRunTestImmediately(modelName);
  }

  // Compilation
  async unsafeCompileModelImmediately(
    runModelParams: RunModelParams,
  ): Promise<CommandProcessResult> {
    const command =
      this.dbtCommandFactory.createCompileModelCommand(runModelParams);
    // Override the defaults to match the immediate execution requirements
    command.focus = false;
    command.showProgress = false;
    command.logToTerminal = false;

    return this.currentIntegration.executeCommandImmediately(command);
  }

  async unsafeCompileNode(modelName: string): Promise<string | undefined> {
    return this.currentIntegration.unsafeCompileNode(modelName);
  }

  async unsafeCompileQuery(
    query: string,
    originalModelName?: string,
  ): Promise<string | undefined> {
    return this.currentIntegration.unsafeCompileQuery(query, originalModelName);
  }

  // Documentation
  async unsafeGenerateDocsImmediately(args?: string[]): Promise<void> {
    const command = args
      ? new DBTCommand("Generating dbt Docs...", args, false, false, false)
      : this.dbtCommandFactory.createDocsGenerateCommand();
    // Override the defaults to match the immediate execution requirements
    command.focus = false;
    command.showProgress = false;
    command.logToTerminal = false;

    await this.currentIntegration.executeCommandImmediately(command);
  }

  // Package Management
  async installDbtPackages(packages: string[]): Promise<any> {
    const command = this.dbtCommandFactory.createAddPackagesCommand(packages);
    // Override the defaults to match the immediate execution requirements
    command.focus = false;
    command.showProgress = false;
    command.logToTerminal = false;

    return this.currentIntegration.executeCommandImmediately(command);
  }

  async installDeps(_silent?: boolean): Promise<any> {
    const command = this.dbtCommandFactory.createInstallDepsCommand();
    // Override the defaults to match the immediate execution requirements
    command.focus = false;
    command.showProgress = false;
    command.logToTerminal = false;

    return this.currentIntegration.executeCommandImmediately(command);
  }

  // Utility Commands
  clean(): any {
    const command = this.dbtCommandFactory.createCleanCommand();
    // Override the defaults to match the immediate execution requirements
    command.focus = false;
    command.showProgress = false;
    command.logToTerminal = false;

    return this.currentIntegration.executeCommandImmediately(command);
  }

  debug(focus?: boolean): any {
    const command = this.dbtCommandFactory.createDebugCommand(focus || false);
    // Override the defaults to match the immediate execution requirements
    command.showProgress = false;
    command.logToTerminal = false;

    return this.currentIntegration.executeCommandImmediately(command);
  }

  // SQL Operations
  async validateSql(request: {
    sql: string;
    dialect: string;
    models: any[];
  }): Promise<any> {
    return this.currentIntegration.validateWhetherSqlHasColumns(
      request.sql,
      request.dialect,
    );
  }

  async validateSQLDryRun(query: string): Promise<any> {
    return this.currentIntegration.validateSQLDryRun(query);
  }

  async validateWhetherSqlHasColumns(sql: string): Promise<boolean> {
    const adapterType = this.getAdapterType();
    return this.currentIntegration.validateWhetherSqlHasColumns(
      sql,
      adapterType,
    );
  }

  // Query Execution
  async executeSQLWithLimit(
    query: string,
    modelName: string,
    limit: number,
    returnImmediately?: boolean,
    _returnRawResults?: boolean,
  ): Promise<any> {
    const queryExecution = await this.currentIntegration.executeSQL(
      query,
      limit,
      modelName,
    );

    if (returnImmediately) {
      return queryExecution;
    }

    return queryExecution.executeQuery();
  }

  async executeSQL(
    query: string,
    modelName: string,
    returnImmediately?: boolean,
    _returnRawResults?: boolean,
  ): Promise<any> {
    const limit = this.dbtConfiguration.getQueryLimit();
    return this.executeSQLWithLimit(
      query,
      modelName,
      limit,
      returnImmediately,
      _returnRawResults,
    );
  }

  // Schema Operations
  async getColumnsOfModel(
    modelName: string,
  ): Promise<{ [key: string]: string }[]> {
    const columns = await this.currentIntegration.getColumnsOfModel(modelName);
    return columns.map((col) => ({ [col.column]: col.dtype }));
  }

  async getColumnsOfSource(
    sourceName: string,
    tableName: string,
  ): Promise<{ [key: string]: string }[]> {
    const columns = await this.currentIntegration.getColumnsOfSource(
      sourceName,
      tableName,
    );
    return columns.map((col) => ({ [col.column]: col.dtype }));
  }

  async getColumnValues(model: string, column: string): Promise<any[]> {
    // This functionality would require custom SQL execution
    const query = this.dbtConfiguration
      .getQueryTemplate()
      .replace("{limit}", this.dbtConfiguration.getQueryLimit().toString())
      .replace("{sql}", `SELECT DISTINCT ${column} FROM {{ ref('${model}') }}`);

    const result = await this.executeSQL(query, model);
    return result.table.rows.map((row: any[]) => row[0]);
  }

  async getBulkSchemaFromDB(
    req: DBTNode[],
    signal: AbortSignal,
  ): Promise<Record<string, DBColumn[]>> {
    return this.currentIntegration.getBulkSchemaFromDB(req, signal);
  }

  async getCatalog(): Promise<Catalog> {
    return this.currentIntegration.getCatalog();
  }

  // Lineage and Relationships
  getNonEphemeralParents(keys: string[]): string[] {
    if (!this.lastParsedManifest) {
      throw Error(
        "No manifest has been generated. Maybe dbt project has not been parsed yet?",
      );
    }
    const { nodeMetaMap, graphMetaMap } = this.lastParsedManifest;
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
    if (!this.lastParsedManifest) {
      throw Error(
        "No manifest has been generated. Maybe dbt project has not been parsed yet?",
      );
    }
    const { graphMetaMap, nodeMetaMap } = this.lastParsedManifest;
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
    if (!this.lastParsedManifest) {
      throw new Error("The dbt manifest is not available");
    }
    const splits = key.split(".");
    const nodeType = splits[0];
    const { graphMetaMap, testMetaMap } = this.lastParsedManifest;
    const upstreamCount = this.getConnectedNodeCount(
      graphMetaMap["children"],
      key,
    );
    const downstreamCount = this.getConnectedNodeCount(
      graphMetaMap["parents"],
      key,
    );
    if (nodeType === RESOURCE_TYPE_SOURCE) {
      const { sourceMetaMap } = this.lastParsedManifest;
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
      };
    } else {
      const { nodeMetaMap } = this.lastParsedManifest;
      const node = nodeMetaMap.lookupByUniqueId(key);
      if (!node) {
        return;
      }
      return {
        table: key,
        label: node.name,
        url: tableUrl,
        upstreamCount,
        downstreamCount,
        nodeType,
        isExternalProject: node.package_name !== this.getProjectName(),
        tests: (graphMetaMap["tests"].get(key)?.nodes || []).map((n) => {
          const testKey = n.label.split(".")[0];
          return { ...testMetaMap.get(testKey), key: testKey };
        }),
        columns: node.columns,
        description: node?.description,
      };
    }
  }

  private getConnectedNodeCount(
    connectionGraph: Map<
      string,
      { nodes: { key: string; label: string; url?: string }[] }
    >,
    key: string,
  ): number {
    return connectionGraph.get(key)?.nodes.length || 0;
  }

  // Target File Watcher Operations
  private startTargetWatchers(): void {
    if (this.isWatchingTargetFiles) {
      return;
    }

    const targetPath = this.getTargetPath();
    if (!targetPath) {
      this.terminal.debug(
        "DBTProjectIntegrationAdapter",
        "Cannot start target watchers - target path not available",
      );
      return;
    }

    this.terminal.debug(
      "DBTProjectIntegrationAdapter",
      `Starting Node.js target watchers for project at ${this.projectRoot}`,
    );

    this.isWatchingTargetFiles = true;
    this.currentTargetPath = targetPath;
    this.setupTargetWatchers();
  }

  private stopTargetWatchers(): void {
    if (!this.isWatchingTargetFiles) {
      return;
    }

    this.terminal.debug(
      "DBTProjectIntegrationAdapter",
      `Stopping Node.js target watchers for project at ${this.projectRoot}`,
    );

    this.disposeTargetWatchers();
    this.isWatchingTargetFiles = false;
    this.currentTargetPath = undefined;
  }

  private updateTargetWatchers(): void {
    if (!this.isWatchingTargetFiles) {
      return;
    }

    const targetPath = this.getTargetPath();
    if (!targetPath) {
      this.terminal.debug(
        "DBTProjectIntegrationAdapter",
        "Cannot update target watchers - target path not available",
      );
      this.stopTargetWatchers();
      return;
    }

    // Check if target path has changed
    if (this.currentTargetPath === targetPath) {
      return;
    }

    this.terminal.debug(
      "DBTProjectIntegrationAdapter",
      "Updating Node.js target watchers with new target path",
      targetPath,
    );

    // Recreate watchers with new target path
    this.disposeTargetWatchers();
    this.currentTargetPath = targetPath;
    this.setupTargetWatchers();
  }

  private setupTargetWatchers(): void {
    if (!this.currentTargetPath) {
      return;
    }

    try {
      // Create single target folder watcher for both manifest and run results
      const targetFolderWatcher = this.createTargetFolderWatcher(
        this.currentTargetPath,
      );
      if (targetFolderWatcher) {
        this.targetWatchers.push(targetFolderWatcher);
      }
    } catch (error) {
      this.terminal.error(
        "DBTProjectIntegrationAdapter",
        "Error setting up target watchers",
        error,
      );
    }
  }

  private createTargetFolderWatcher(targetPath: string): FSWatcher | null {
    try {
      const handleFileChange = debounce(async () => {
        // Check for manifest changes
        try {
          const parsedManifest = await this.parseManifest();
          if (parsedManifest) {
            this.emit("manifestCreated", parsedManifest);
          }
        } catch (error) {
          // Manifest might not exist or be invalid, which is normal
        }

        // Check for run results changes
        const runResultsPath = path.join(targetPath, RUN_RESULTS_FILE);
        try {
          const runResultsData = this.parseRunResultsFile(runResultsPath);
          if (runResultsData) {
            this.emit("runResultsCreated", runResultsData);
          }
        } catch (error) {
          // Run results might not exist, which is normal
        }
      }, 300);

      const watcher = watch(
        targetPath,
        { recursive: false },
        (eventType, filename) => {
          if (
            filename &&
            (filename === MANIFEST_FILE || filename === RUN_RESULTS_FILE)
          ) {
            this.terminal.debug(
              "DBTProjectIntegrationAdapter",
              `Target folder ${eventType} detected: ${filename} in ${targetPath}`,
            );
            handleFileChange();
          }
        },
      );

      this.terminal.debug(
        "DBTProjectIntegrationAdapter",
        `Started Node.js target folder watcher for ${targetPath}`,
      );
      return watcher;
    } catch (error) {
      this.terminal.error(
        "DBTProjectIntegrationAdapter",
        `Failed to create target folder watcher for ${targetPath}`,
        error,
      );
      return null;
    }
  }

  private parseRunResultsFile(filePath: string): RunResultsEventData | null {
    try {
      const fileContent = readFileSync(filePath, "utf8").toString();
      if (!fileContent) {
        return null;
      }

      const runResults: RunResultsData = JSON.parse(fileContent);

      return {
        results: runResults.results,
      };
    } catch (error) {
      this.terminal.error(
        "DBTProjectIntegrationAdapter",
        `Unable to parse run_results.json: ${error}`,
        error,
      );
      return null;
    }
  }

  private disposeTargetWatchers(): void {
    for (const watcher of this.targetWatchers) {
      try {
        watcher.close();
      } catch (error) {
        this.terminal.error(
          "DBTProjectIntegrationAdapter",
          "Error closing target watcher",
          error,
        );
      }
    }
    this.targetWatchers = [];
  }

  // Disposal
  async dispose(): Promise<void> {
    this.stopFileWatching();
    this.stopProjectConfigWatcher();
    this.stopTargetWatchers();
    this.currentIntegration.dispose();
    this.removeAllListeners();
  }

  // Escape hatch for calling methods on the ProjectIntegration
  // TODO: remove this at some point
  getCurrentProjectIntegration(): DBTProjectIntegration {
    return this.currentIntegration;
  }
}
