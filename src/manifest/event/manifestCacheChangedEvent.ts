import { Uri } from "vscode";
import {
  DocMetaMap,
  ExposureMetaMap,
  GraphMetaMap,
  MacroMetaMap,
  MetricMetaMap,
  NodeMetaMap,
  SourceMetaMap,
  TestMetaMap,
} from "../../dbt_integration/domain";
import { DBTProject } from "../dbtProject";

export interface ManifestCacheProjectAddedEvent {
  project: DBTProject;
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
