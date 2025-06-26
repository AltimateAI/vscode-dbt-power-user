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
} from "../dbt_client/dbtIntegration";
import { ProjectHealthcheck } from "../dbt_client/dbtCoreIntegration";
import { DataPilotHealtCheckParams, Table } from "../domain";
import { DBTConfiguration } from "../dbt_client/configuration";
import { DBTFacade } from "./dbtFacade";
import { DBTDiagnosticData } from "../dbt_client/diagnostics";
import path from "path";

/**
 * DBTIntegrationAdapter provides a framework-agnostic implementation of DBTFacade
 * that delegates to the appropriate dbt integration (core, cloud, fusion, corecommand)
 * based on configuration. This class has no VSCode dependencies.
 */
export class DBTIntegrationAdapter implements DBTFacade {
  private currentIntegration: DBTProjectIntegration;

  constructor(
    private dbtConfiguration: DBTConfiguration,
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

  getSelectedTarget(): string | undefined {
    return this.currentIntegration.getSelectedTarget();
  }

  async getTargetNames(): Promise<string[]> {
    return this.currentIntegration.getTargetNames();
  }

  async setSelectedTarget(targetName: string): Promise<void> {
    return this.currentIntegration.setSelectedTarget(targetName);
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
    // Create a dbt run command and execute it immediately
    const command = {
      statusMessage: "Running dbt model...",
      args: [
        "run",
        "--select",
        `${runModelParams.plusOperatorLeft}${runModelParams.modelName}${runModelParams.plusOperatorRight}`,
        ...this.dbtConfiguration.getRunModelCommandAdditionalParams(),
      ],
      focus: false,
      showProgress: false,
      logToTerminal: false,
    };

    return this.currentIntegration.executeCommandImmediately(command as any);
  }

  async unsafeBuildModelImmediately(
    runModelParams: RunModelParams,
  ): Promise<CommandProcessResult> {
    const command = {
      statusMessage: "Building dbt model...",
      args: [
        "build",
        "--select",
        `${runModelParams.plusOperatorLeft}${runModelParams.modelName}${runModelParams.plusOperatorRight}`,
        ...this.dbtConfiguration.getBuildModelCommandAdditionalParams(),
      ],
      focus: false,
      showProgress: false,
      logToTerminal: false,
    };

    return this.currentIntegration.executeCommandImmediately(command as any);
  }

  async unsafeBuildProjectImmediately(): Promise<CommandProcessResult> {
    const command = {
      statusMessage: "Building dbt project...",
      args: ["build"],
      focus: false,
      showProgress: false,
      logToTerminal: false,
    };

    return this.currentIntegration.executeCommandImmediately(command as any);
  }

  // Testing
  async unsafeRunTestImmediately(
    testName: string,
  ): Promise<CommandProcessResult> {
    const command = {
      statusMessage: "Testing dbt model...",
      args: [
        "test",
        "--select",
        testName,
        ...this.dbtConfiguration.getTestModelCommandAdditionalParams(),
      ],
      focus: false,
      showProgress: false,
      logToTerminal: false,
    };

    return this.currentIntegration.executeCommandImmediately(command as any);
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
    const command = {
      statusMessage: "Compiling dbt models...",
      args: [
        "compile",
        "--select",
        `${runModelParams.plusOperatorLeft}${runModelParams.modelName}${runModelParams.plusOperatorRight}`,
      ],
      focus: false,
      showProgress: false,
      logToTerminal: false,
    };

    return this.currentIntegration.executeCommandImmediately(command as any);
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
    const command = {
      statusMessage: "Generating dbt Docs...",
      args: args || ["docs", "generate"],
      focus: false,
      showProgress: false,
      logToTerminal: false,
    };

    await this.currentIntegration.executeCommandImmediately(command as any);
  }

  // Package Management
  async installDbtPackages(packages: string[]): Promise<any> {
    const command = {
      statusMessage: "Installing packages...",
      args: ["deps", "--add-package", ...packages],
      focus: false,
      showProgress: false,
      logToTerminal: false,
    };

    return this.currentIntegration.executeCommandImmediately(command as any);
  }

  async installDeps(_silent?: boolean): Promise<any> {
    const command = {
      statusMessage: "Installing packages...",
      args: ["deps"],
      focus: false,
      showProgress: false,
      logToTerminal: false,
    };

    return this.currentIntegration.executeCommandImmediately(command as any);
  }

  // Utility Commands
  clean(): any {
    const command = {
      statusMessage: "Cleaning dbt project...",
      args: ["clean"],
      focus: false,
      showProgress: false,
      logToTerminal: false,
    };

    return this.currentIntegration.executeCommandImmediately(command as any);
  }

  debug(focus?: boolean): any {
    const command = {
      statusMessage: "Debugging...",
      args: ["debug"],
      focus: focus || false,
      showProgress: false,
      logToTerminal: false,
    };

    return this.currentIntegration.executeCommandImmediately(command as any);
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
}
