import { CommandProcessResult } from "../commandProcessExecution";
import {
  RunModelParams,
  DBTNode,
  DBColumn,
  Catalog,
} from "../dbt_client/dbtIntegration";
import { AltimateConfigProps } from "../webview_provider/insightsPanel";
import { ProjectHealthcheck } from "../dbt_client/dbtCoreIntegration";
import { Table } from "src/domain";

/**
 * Framework-agnostic facade interface for dbt project operations.
 * Defines the contract for all dbt project functionality including
 * configuration, model execution, testing, compilation, and more.
 *
 * This interface abstracts away VSCode-specific dependencies to allow
 * for testing and potential use in other contexts.
 */
export interface DBTFacade {
  // Project Information
  getProjectName(): string;
  getSelectedTarget(): string;
  getTargetNames(): string[];
  setSelectedTarget(targetName: string): Promise<void>;
  getDBTProjectFilePath(): string;
  getTargetPath(): string | undefined;
  getPackageInstallPath(): string | undefined;
  getModelPaths(): string[] | undefined;
  getSeedPaths(): string[] | undefined;
  getMacroPaths(): string[] | undefined;
  getManifestPath(): string | undefined;
  getCatalogPath(): string | undefined;

  // Diagnostics and Status
  getPythonBridgeStatus(): any;
  getAdapterType(): string;
  getDBTVersion(): number[] | undefined;

  // Project Operations
  initialize(): Promise<void>;
  refreshProjectConfig(): Promise<void>;
  performDatapilotHealthcheck(
    args: AltimateConfigProps,
  ): Promise<ProjectHealthcheck>;

  // Utility Methods
  findPackageName(uri: string): string | undefined;
  contains(uri: string): boolean;
  findPackageVersion(packageName: string): string | undefined;

  // Model Execution
  runModel(
    runModelParams: RunModelParams,
  ): Promise<CommandProcessResult | undefined>;
  unsafeRunModelImmediately(
    runModelParams: RunModelParams,
  ): Promise<CommandProcessResult>;
  buildModel(
    runModelParams: RunModelParams,
  ): Promise<CommandProcessResult | undefined>;
  unsafeBuildModelImmediately(
    runModelParams: RunModelParams,
  ): Promise<CommandProcessResult>;
  buildProject(): Promise<CommandProcessResult | undefined>;
  unsafeBuildProjectImmediately(): Promise<CommandProcessResult>;

  // Testing
  runTest(testName: string): Promise<CommandProcessResult | undefined>;
  unsafeRunTestImmediately(testName: string): Promise<CommandProcessResult>;
  runModelTest(modelName: string): Promise<CommandProcessResult | undefined>;
  unsafeRunModelTestImmediately(
    modelName: string,
  ): Promise<CommandProcessResult>;

  // Compilation
  compileModel(runModelParams: RunModelParams): Promise<void>;
  unsafeCompileModelImmediately(
    runModelParams: RunModelParams,
  ): Promise<CommandProcessResult>;
  compileNode(modelName: string): Promise<string | undefined>;
  unsafeCompileNode(modelName: string): Promise<string | undefined>;
  compileQuery(
    query: string,
    originalModelName?: string,
  ): Promise<string | undefined>;
  unsafeCompileQuery(
    query: string,
    originalModelName?: string,
  ): Promise<string | undefined>;

  // Documentation
  generateDocs(): Promise<void>;
  unsafeGenerateDocsImmediately(args?: string[]): Promise<void>;

  // Package Management
  installDbtPackages(packages: string[]): Promise<any>;
  installDeps(silent?: boolean): Promise<any>;

  // Utility Commands
  clean(): any;
  debug(focus?: boolean): any;
  // TODO; Evaluate if these methods need to be migrated
  // throwIfNotAuthenticated(): void;

  // SQL Operations
  validateSql(request: {
    sql: string;
    dialect: string;
    models: any[];
  }): Promise<any>;
  validateSQLDryRun(query: string): Promise<any>;
  validateWhetherSqlHasColumns(sql: string): Promise<boolean>;

  // Query Execution
  executeSQLWithLimit(
    query: string,
    modelName: string,
    limit: number,
    returnImmediately?: boolean,
    returnRawResults?: boolean,
  ): Promise<any>;
  executeSQL(
    query: string,
    modelName: string,
    returnImmediately?: boolean,
    returnRawResults?: boolean,
  ): Promise<any>;

  // Schema Operations
  getColumnsOfModel(modelName: string): Promise<{ [key: string]: string }[]>;
  getColumnsOfSource(
    sourceName: string,
    tableName: string,
  ): Promise<{ [key: string]: string }[]>;
  getColumnValues(model: string, column: string): Promise<any[]>;
  getBulkSchemaFromDB(
    req: DBTNode[],
    signal: AbortSignal,
  ): Promise<Record<string, DBColumn[]>>;
  getCatalog(): Promise<Catalog>;

  // File Generation
  // TODO; Evaluate if these methods need to be migrated
  // generateSchemaYML(modelPath: string, modelName: string): Promise<void>;
  // generateModel(
  //   sourceName: string,
  //   tableName: string,
  //   sourcePath: string,
  // ): Promise<void>;
  // createYMLContent(
  //   columnsInRelation: { [key: string]: string }[],
  //   modelName: string,
  // ): string;

  // File Navigation
  // TODO; Evaluate if these methods need to be migrated
  // showCompiledSql(modelPath: string): void;
  // showRunSQL(modelPath: string): void;

  // Lineage and Relationships
  getNonEphemeralParents(keys: string[]): string[];
  getChildrenModels({ table }: { table: string }): Table[];
  getParentModels({ table }: { table: string }): Table[];

  // Bulk Operations
  // TODO: migrate this method later
  // getBulkCompiledSql(models: string[]): Promise<Record<string, string>>;
  // TODO: migrate this method later
  // getNodesWithDBColumns(
  //   modelsToFetch: string[],
  //   signal: AbortSignal,
  // ): Promise<{
  //   mappedNode: Record<string, ModelNode>;
  //   relationsWithoutColumns: string[];
  //   mappedCompiledSql: Record<string, string>;
  // }>;

  // Configuration
  applyDeferConfig(): Promise<void>;
  throwDiagnosticsErrorIfAvailable(): void;

  // Utility
  // TODO: migrate this method later
  // mergeColumnsFromDB(
  //   node: Pick<ModelNode, "columns">,
  //   columnsFromDB: DBColumn[],
  // ): boolean;

  // Disposal
  dispose(): Promise<void>;
}
