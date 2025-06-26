import { CommandProcessResult } from "../commandProcessExecution";
import {
  RunModelParams,
  DBTNode,
  DBColumn,
  Catalog,
  DBTProjectIntegration,
  DeferConfig,
  DBT_PROJECT_FILE,
  MANIFEST_FILE,
  CATALOG_FILE,
  DBTCommandFactory,
  DBTCommand,
} from "../dbt_client/dbtIntegration";
import { ProjectHealthcheck } from "../dbt_client/dbtCoreIntegration";
import {
  DataPilotHealtCheckParams,
  DocMetaMap,
  ExposureMetaMap,
  GraphMetaMap,
  MacroMetaMap,
  MetricMetaMap,
  NodeMetaMap,
  SourceMetaMap,
  Table,
  TestMetaMap,
} from "../domain";
import { DBTConfiguration } from "../dbt_client/configuration";
import { DBTFacade } from "./dbtFacade";
import { DBTDiagnosticData } from "../dbt_client/diagnostics";
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
import { DBTTerminal } from "../dbt_client/terminal";
import path from "path";

export interface ParsedManifest {
  nodeMetaMap: NodeMetaMap;
  macroMetaMap: MacroMetaMap;
  metricMetaMap: MetricMetaMap;
  sourceMetaMap: SourceMetaMap;
  graphMetaMap: GraphMetaMap;
  testMetaMap: TestMetaMap;
  docMetaMap: DocMetaMap;
  exposureMetaMap: ExposureMetaMap;
  modelDepthMap: Map<string, number>;
}

/**
 * DBTIntegrationAdapter provides a framework-agnostic implementation of DBTFacade
 * that delegates to the appropriate dbt integration (core, cloud, fusion, corecommand)
 * based on configuration. This class has no VSCode dependencies.
 */
export class DBTIntegrationAdapter implements DBTFacade {
  private currentIntegration: DBTProjectIntegration;
  private consecutiveReadFailures = 0;

  constructor(
    private dbtConfiguration: DBTConfiguration,
    private dbtCommandFactory: DBTCommandFactory,
    private dbtCoreIntegrationFactory: (
      projectRoot: string,
      diagnostics: DBTDiagnosticData[],
      deferConfig: DeferConfig | undefined,
    ) => DBTProjectIntegration,
    private dbtCloudIntegrationFactory: (
      projectRoot: string,
      deferConfig: DeferConfig | undefined,
    ) => DBTProjectIntegration,
    private dbtFusionIntegrationFactory: (
      projectRoot: string,
      deferConfig: DeferConfig | undefined,
    ) => DBTProjectIntegration,
    private dbtCoreCommandIntegrationFactory: (
      projectRoot: string,
      diagnostics: DBTDiagnosticData[],
      deferConfig: DeferConfig | undefined,
    ) => DBTProjectIntegration,
    private projectRoot: string,
    private projectConfigDiagnostics: DBTDiagnosticData[],
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
    this.currentIntegration = this.createIntegration();
  }

  private createIntegration(): DBTProjectIntegration {
    const integrationMode = this.dbtConfiguration.getDbtIntegration();

    switch (integrationMode) {
      case "cloud":
        return this.dbtCloudIntegrationFactory(
          this.projectRoot,
          this.deferConfig,
        );
      case "fusion":
        return this.dbtFusionIntegrationFactory(
          this.projectRoot,
          this.deferConfig,
        );
      case "corecommand":
        return this.dbtCoreCommandIntegrationFactory(
          this.projectRoot,
          this.projectConfigDiagnostics,
          this.deferConfig,
        );
      default: // "core"
        return this.dbtCoreIntegrationFactory(
          this.projectRoot,
          this.projectConfigDiagnostics,
          this.deferConfig,
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

  getAdapterType(): string {
    return this.currentIntegration.getAdapterType() || "unknown";
  }

  getDBTVersion(): number[] | undefined {
    return this.currentIntegration.getVersion();
  }

  // Project Operations
  async initialize(): Promise<void> {
    return this.currentIntegration.initializeProject();
  }

  async refreshProjectConfig(): Promise<void> {
    return this.currentIntegration.refreshProjectConfig();
  }

  // Manifest Operations
  async rebuildManifest(): Promise<void> {
    return this.currentIntegration.rebuildManifest();
  }

  async parseManifest(): Promise<ParsedManifest | undefined> {
    this.terminal.debug(
      "DBTIntegrationAdapter",
      `Going to parse manifest for project at ${this.projectRoot}`,
    );

    const targetPath = this.getTargetPath();
    if (!targetPath) {
      this.terminal.debug(
        "DBTIntegrationAdapter",
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

    return {
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
  }

  private readAndParseManifestFile(targetPath: string): any {
    const pathParts = [targetPath];
    if (!path.isAbsolute(targetPath)) {
      pathParts.unshift(this.projectRoot);
    }
    const manifestLocation = path.join(...pathParts, MANIFEST_FILE);

    this.terminal.debug(
      "DBTIntegrationAdapter",
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
          "DBTIntegrationAdapter",
          `Could not read/parse manifest file at ${manifestLocation} after ${this.consecutiveReadFailures} attempts`,
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

  // Lineage and Relationships - these methods require access to manifest
  // Since the adapter doesn't have direct manifest access, we'd need to implement
  // these by parsing the manifest file or delegating to a manifest service
  getNonEphemeralParents(_keys: string[]): string[] {
    // This would require manifest parsing logic
    // For now, return empty array
    return [];
  }

  getChildrenModels({ table: _table }: { table: string }): Table[] {
    // This would require manifest parsing logic
    // For now, return empty array
    return [];
  }

  getParentModels({ table: _table }: { table: string }): Table[] {
    // This would require manifest parsing logic
    // For now, return empty array
    return [];
  }

  // Disposal
  async dispose(): Promise<void> {
    this.currentIntegration.dispose();
  }

  // Escape hatch for calling methods on the ProjectIntegration
  // TODO: remove this at some point
  getCurrentProjectIntegration(): DBTProjectIntegration {
    return this.currentIntegration;
  }
}
