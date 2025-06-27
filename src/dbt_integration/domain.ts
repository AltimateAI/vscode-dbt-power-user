export type MacroMetaMap = Map<string, MacroMetaData>;
export type MetricMetaMap = Map<string, MetricMetaData>;
export type SourceMetaMap = Map<string, SourceMetaData>;
export type TestMetaMap = Map<string, TestMetaData>;
export type ExposureMetaMap = Map<string, ExposureMetaData>;
export type DocMetaMap = Map<string, DocMetaData>;
export type NodeMetaType = NodeMetaData;
export type SourceMetaType = SourceTable;

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

export interface RunResultsData {
  results: Array<{
    unique_id: string;
  }>;
}

export interface RunResultsEventData {
  results: Array<{
    unique_id: string;
  }>;
}

type ConfigOption =
  | { configPath: string; configType: "Manual" }
  | {
      config: unknown;
      config_schema: { files_required: string }[];
      configType: "Saas";
    }
  | { configType: "All" };

export type DataPilotHealtCheckParams = { projectRoot: string } & ConfigOption;

export interface NodeMetaMap {
  lookupByBaseName(modelBaseName: string): NodeMetaData | undefined;
  lookupByUniqueId(uniqueId: string): NodeMetaData | undefined;
  nodes(): Iterable<NodeMetaData>;
}

export interface MacroMetaData {
  path: string | undefined; // in dbt cloud, packages are not downloaded locally
  line: number;
  character: number;
  uniqueId: string;
  description?: string;
  arguments?: { name: string; type: string; description: string }[];
  name: string;
  depends_on: DependsOn;
}

interface MetricMetaData {
  name: string;
}

export interface NodeMetaData {
  uniqueId: string;
  path: string | undefined; // in dbt cloud, packages are not downloaded locally
  database: string;
  schema: string;
  alias: string;
  name: string;
  package_name: string;
  description: string;
  patch_path: string;
  columns: { [columnName: string]: ColumnMetaData };
  config: Config;
  resource_type: string;
  depends_on: DependsOn;
  is_external_project: boolean;
  compiled_path: string;
  meta: any;
}

export interface ColumnMetaData {
  name: string;
  description: string;
  data_type: string;
  meta: any;
}

export type Table = {
  label: string;
  table: string;
  url: string | undefined;
  downstreamCount: number;
  upstreamCount: number;
  nodeType: string;
  materialization?: string;
  description?: string;
  tests: any[];
  meta?: Map<string, any>;
  isExternalProject: boolean;
  columns: { [columnName: string]: ColumnMetaData };
  patchPath?: string;
  packageName?: string;
};

interface Config {
  materialized: string;
}

export interface SourceMetaData {
  uniqueId: string;
  name: string;
  database: string;
  schema: string;
  tables: SourceTable[];
  package_name: string;
  is_external_project: boolean;
  meta: any;
}

export interface SourceTable {
  name: string;
  identifier: string;
  path: string | undefined; // in dbt cloud, packages are not downloaded locally
  description: string;
  columns: { [columnName: string]: ColumnMetaData };
}

interface DocMetaData {
  path: string;
  line: number;
  character: number;
}

interface TestMetadataSpecification {
  column_name: string;
  model: string;
}

// for accepted_values
export interface TestMetadataAcceptedValues extends TestMetadataSpecification {
  values?: string[];
}

// for relationship
export interface TestMetadataRelationships extends TestMetadataSpecification {
  field?: string;
  to?: string;
}

interface DependsOn {
  macros: [string];
  nodes: [string];
  sources: [string];
}

export interface TestMetaData {
  path: string | undefined; // in dbt cloud, packages are not downloaded locally
  database: string;
  schema: string;
  alias: string;
  raw_sql: string;
  column_name?: string;
  test_metadata?: {
    kwargs: TestMetadataAcceptedValues | TestMetadataRelationships;
    name: string;
    namespace?: string;
  };
  attached_node?: string;
  depends_on: DependsOn;
  uniqueId: string;
}

export interface ExposureMetaData {
  description?: string;
  depends_on: DependsOn;
  label?: string;
  maturity?: string;
  name: string;
  owner: { email: string; name: string };
  tags: [string];
  url?: string;
  type: string;
  config: { enabled: boolean };
  path: string | undefined; // in dbt cloud, packages are not downloaded locally
  unique_id: string;
  sources?: [string];
  metrics?: unknown[];
  meta?: Record<string, unknown>;
}

export interface NodeData {
  label: string;
  key: string;
  url?: string;
  resourceType: string;
}

interface NodeGraphMetaData {
  currentNode: NodeData;
  nodes: NodeData[];
}

interface ModelGraphMetaData {
  uniqueId: string;
  name: string;
  dependencies?: string[];
}

export type NodeGraphMap = Map<string, NodeGraphMetaData>;
export type ModelGraphMetaMap = Map<string, ModelGraphMetaData>;

export interface GraphMetaMap {
  parents: NodeGraphMap;
  children: NodeGraphMap;
  tests: NodeGraphMap;
  metrics: NodeGraphMap;
}

export enum RunModelType {
  RUN_PARENTS,
  RUN_CHILDREN,
  BUILD_PARENTS,
  BUILD_CHILDREN,
  BUILD_CHILDREN_PARENTS,
  TEST,
  SNAPSHOT,
}

export interface EnvironmentVariables {
  [key: string]: string | undefined;
}

export const DBT_PROJECT_FILE = "dbt_project.yml";
export const MANIFEST_FILE = "manifest.json";
export const RUN_RESULTS_FILE = "run_results.json";
export const CATALOG_FILE = "catalog.json";
export const RESOURCE_TYPE_MODEL = "model";
export const RESOURCE_TYPE_MACRO = "macro";
export const RESOURCE_TYPE_ANALYSIS = "analysis";
export const RESOURCE_TYPE_SOURCE = "source";
export const RESOURCE_TYPE_EXPOSURE = "exposure";
export const RESOURCE_TYPE_SEED = "seed";
export const RESOURCE_TYPE_SNAPSHOT = "snapshot";
export const RESOURCE_TYPE_TEST = "test";
export const RESOURCE_TYPE_METRIC = "semantic_model";

export function isResourceNode(resourceType: string): boolean {
  return (
    resourceType === RESOURCE_TYPE_MODEL ||
    resourceType === RESOURCE_TYPE_SEED ||
    resourceType === RESOURCE_TYPE_ANALYSIS ||
    resourceType === RESOURCE_TYPE_SNAPSHOT
  );
}

export function isResourceHasDbColumns(resourceType: string): boolean {
  return (
    resourceType === RESOURCE_TYPE_MODEL ||
    resourceType === RESOURCE_TYPE_SEED ||
    resourceType === RESOURCE_TYPE_SNAPSHOT
  );
}
export interface DBTCommandExecution {
  command: (signal?: AbortSignal) => Promise<void>;
  statusMessage: string;
  showProgress?: boolean;
  focus?: boolean;
  signal?: AbortSignal;
}

export enum ManifestPathType {
  EMPTY = "",
  LOCAL = "local",
  REMOTE = "remote",
}

export interface DeferConfig {
  deferToProduction: boolean;
  favorState: boolean;
  manifestPathForDeferral: string | null;
  manifestPathType?: ManifestPathType;
  dbtCoreIntegrationId?: number;
}
export interface RunModelParams {
  plusOperatorLeft: string;
  modelName: string;
  plusOperatorRight: string;
}

export type DBColumn = { column: string; dtype: string };

export type Node = {
  unique_id: string;
  name: string;
  resource_type: string;
};

export type SourceNode = {
  unique_id: string;
  name: string;
  resource_type: "source";
  table: string;
};

export type DBTNode = Node | SourceNode;

type CatalogItem = {
  table_database: string;
  table_schema: string;
  table_name: string;
  column_name: string;
  column_type: string;
};

export type Catalog = CatalogItem[];
export interface HealthcheckArgs {
  manifestPath: string;
  catalogPath?: string;
  config?: any;
  configPath?: string;
}
