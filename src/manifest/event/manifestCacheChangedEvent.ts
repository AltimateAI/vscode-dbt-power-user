import { Uri } from "vscode";
import {
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
  projectRoot: Uri;
}

export interface ManifestCacheProjectRemovedEvent {
  projectRoot: Uri;
}

export interface ManifestCacheChangedEvent {
  added?: ManifestCacheProjectAddedEvent[];
  removed?: ManifestCacheProjectRemovedEvent[];
}
