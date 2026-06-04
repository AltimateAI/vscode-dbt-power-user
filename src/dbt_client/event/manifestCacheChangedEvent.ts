import {
  DocMetaMap,
  ExposureMetaMap,
  FunctionMetaMap,
  GraphMetaMap,
  MacroMetaMap,
  MetricMetaMap,
  NodeMetaMap,
  SourceMetaMap,
  TestMetaMap,
} from "@altimateai/dbt-integration";
import { Uri } from "vscode";
// Local type until @altimateai/dbt-integration exports it
export type UnitTestMeta = { name: string; model: string; path?: string };
export type UnitTestMetaMap = Map<string, UnitTestMeta>;

import { DBTProject } from "../dbtProject";

export interface ManifestCacheProjectAddedEvent {
  project: DBTProject;
  nodeMetaMap: NodeMetaMap;
  macroMetaMap: MacroMetaMap;
  metricMetaMap: MetricMetaMap;
  sourceMetaMap: SourceMetaMap;
  graphMetaMap: GraphMetaMap;
  testMetaMap: TestMetaMap;
  unitTestMetaMap: UnitTestMetaMap;
  docMetaMap: DocMetaMap;
  exposureMetaMap: ExposureMetaMap;
  functionMetaMap: FunctionMetaMap;
  modelDepthMap: Map<string, number>;
}

export interface ManifestCacheProjectRemovedEvent {
  projectRoot: Uri;
}

export interface ManifestCacheChangedEvent {
  added?: ManifestCacheProjectAddedEvent[];
  removed?: ManifestCacheProjectRemovedEvent[];
}

export interface RebuildManifestStatusChange {
  project: DBTProject;
  inProgress: boolean;
}

export interface RebuildManifestCombinedStatusChange {
  projects: DBTProject[];
  inProgress: boolean;
}
