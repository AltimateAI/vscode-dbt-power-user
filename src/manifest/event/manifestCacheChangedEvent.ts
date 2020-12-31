import { Uri } from "vscode";
import {
  NodeMetaMap,
  MacroMetaMap,
  SourceMetaMap,
  RunResultMetaMap,
  GraphMetaMap
} from "../../domain";

export interface OnManifestCacheChanged {
  onManifestCacheChanged: OnManifestCacheChangedHandler;
}

export type OnManifestCacheChangedHandler = (event: ManifestCacheChangedEvent) => void;

export class ManifestCacheProjectAddedEvent {
  projectName: string;
  nodeMetaMap: NodeMetaMap;
  macroMetaMap: MacroMetaMap;
  sourceMetaMap: SourceMetaMap;
  graphMetaMap: GraphMetaMap;
  runResultMetaMap: RunResultMetaMap;
  projectRoot: Uri;

  constructor(
    projectName: string,
    nodeMetaMap: NodeMetaMap,
    macroMetaMap: MacroMetaMap,
    sourceMetaMap: SourceMetaMap,
    parentModelMap: GraphMetaMap,
    runResultMetaMap: RunResultMetaMap,
    projectRoot: Uri
  ) {
    this.projectName = projectName;
    this.nodeMetaMap = nodeMetaMap;
    this.macroMetaMap = macroMetaMap;
    this.sourceMetaMap = sourceMetaMap;
    this.graphMetaMap = parentModelMap;
    this.runResultMetaMap = runResultMetaMap;
    this.projectRoot = projectRoot;
  }
}

export class ManifestCacheProjectRemovedEvent {
  projectRoot: Uri;

  constructor(
    projectRoot: Uri
  ) {
    this.projectRoot = projectRoot;
  }
}

export interface ManifestCacheChangedEvent {
  added?: ManifestCacheProjectAddedEvent[];
  removed?: ManifestCacheProjectRemovedEvent[];
}
