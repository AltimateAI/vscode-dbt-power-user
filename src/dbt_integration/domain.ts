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
