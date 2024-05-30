import * as path from "path";

export type NodeMetaMap = Map<string, NodeMetaData>;
export type MacroMetaMap = Map<string, MacroMetaData>;
export type MetricMetaMap = Map<string, MetricMetaData>;
export type SourceMetaMap = Map<string, SourceMetaData>;
export type TestMetaMap = Map<string, TestMetaData>;
export type ExposureMetaMap = Map<string, ExposureMetaData>;
export type DocMetaMap = Map<string, DocMetaData>;
export type NodeMetaType = NodeMetaData;
export type SourceMetaType = SourceTable;

export interface MacroMetaData {
  path: string | undefined; // in dbt cloud, packages are not downloaded locally
  line: number;
  character: number;
  uniqueId: string;
  description?: string;
  arguments?: { name: string; type: string; description: string }[];
  name: string;
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
}

export interface ColumnMetaData {
  name: string;
  description: string;
  data_type: string;
}

interface Config {
  materialized: string;
}

export interface SourceMetaData {
  uniqueId: string;
  name: string;
  database: string;
  schema: string;
  tables: SourceTable[];
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

interface NodeGraphMetaData {
  currentNode: Node;
  nodes: Node[];
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

interface IconPath {
  light: string;
  dark: string;
}

export abstract class Node {
  label: string;
  key: string;
  url: string | undefined;
  iconPath: IconPath = {
    light: path.join(
      path.resolve(__dirname),
      "../media/images/model_light.svg",
    ),
    dark: path.join(path.resolve(__dirname), "../media/images/model_dark.svg"),
  };
  displayInModelTree: boolean = true;

  constructor(label: string, key: string, url?: string) {
    this.label = label;
    this.key = key;
    this.url = url;
  }
}

export class Model extends Node {}

export class Seed extends Node {}
export class Test extends Node {
  // displayInModelTree = false;
  iconPath = {
    light: path.join(
      path.resolve(__dirname),
      "../media/images/source_light.svg",
    ),
    dark: path.join(path.resolve(__dirname), "../media/images/source_dark.svg"),
  };
}
export class Analysis extends Node {
  displayInModelTree = true;
}
export class Exposure extends Node {
  displayInModelTree = true;
}
export class Metric extends Node {
  displayInModelTree = false;
}
export class Snapshot extends Node {}
export class Source extends Node {
  iconPath = {
    light: path.join(
      path.resolve(__dirname),
      "../media/images/source_light.svg",
    ),
    dark: path.join(path.resolve(__dirname), "../media/images/source_dark.svg"),
  };
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
