import { Uri } from "vscode";
import {
  DocMetaMap,
  ExposureMetaMap,
  GraphMetaMap,
  MacroMetaMap,
  NodeMetaMap,
  SourceMetaMap,
  TestMetaMap,
} from "../../domain";

export interface ManifestCacheProjectAddedEvent {
  projectName: string;
  nodeMetaMap: NodeMetaMap;
  macroMetaMap: MacroMetaMap;
  sourceMetaMap: SourceMetaMap;
  graphMetaMap: GraphMetaMap;
  testMetaMap: TestMetaMap;
  docMetaMap: DocMetaMap;
  exposureMetaMap: ExposureMetaMap;
  projectRoot: Uri;
}

export interface ManifestCacheProjectRemovedEvent {
  projectRoot: Uri;
}

export interface ManifestCacheChangedEvent {
  added?: ManifestCacheProjectAddedEvent[];
  removed?: ManifestCacheProjectRemovedEvent[];
}
