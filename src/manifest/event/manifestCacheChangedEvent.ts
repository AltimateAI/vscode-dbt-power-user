import { Uri } from "vscode";
import {
  NodeMetaMap,
  MacroMetaMap,
  SourceMetaMap,
  GraphMetaMap,
  TestMetaMap,
} from "../../domain";

export class ManifestCacheProjectAddedEvent {
  projectName: string;
  nodeMetaMap: NodeMetaMap;
  macroMetaMap: MacroMetaMap;
  sourceMetaMap: SourceMetaMap;
  graphMetaMap: GraphMetaMap;
  testMetaMap: TestMetaMap;
  projectRoot: Uri;

  constructor(
    projectName: string,
    nodeMetaMap: NodeMetaMap,
    macroMetaMap: MacroMetaMap,
    sourceMetaMap: SourceMetaMap,
    parentModelMap: GraphMetaMap,
    testModelMap: TestMetaMap,
    projectRoot: Uri
  ) {
    this.projectName = projectName;
    this.nodeMetaMap = nodeMetaMap;
    this.macroMetaMap = macroMetaMap;
    this.sourceMetaMap = sourceMetaMap;
    this.graphMetaMap = parentModelMap;
    this.testMetaMap = testModelMap;
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
