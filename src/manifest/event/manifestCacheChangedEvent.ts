import { Uri } from "vscode";
import {
  NodeMetaMap,
  MacroMetaMap,
  SourceMetaMap,
  GraphMetaMap,
} from "../../domain";

export class ManifestCacheProjectAddedEvent {
  projectName: string;
  nodeMetaMap: NodeMetaMap;
  macroMetaMap: MacroMetaMap;
  sourceMetaMap: SourceMetaMap;
  graphMetaMap: GraphMetaMap;
  projectRoot: Uri;

  constructor(
    projectName: string,
    nodeMetaMap: NodeMetaMap,
    macroMetaMap: MacroMetaMap,
    sourceMetaMap: SourceMetaMap,
    parentModelMap: GraphMetaMap,
    projectRoot: Uri
  ) {
    this.projectName = projectName;
    this.nodeMetaMap = nodeMetaMap;
    this.macroMetaMap = macroMetaMap;
    this.sourceMetaMap = sourceMetaMap;
    this.graphMetaMap = parentModelMap;
    this.projectRoot = projectRoot;
  }
}

export class ManifestCacheProjectRemovedEvent {
  projectRoot: Uri;

  constructor(projectRoot: Uri) {
    this.projectRoot = projectRoot;
  }
}

export interface ManifestCacheChangedEvent {
  added?: ManifestCacheProjectAddedEvent[];
  removed?: ManifestCacheProjectRemovedEvent[];
}
