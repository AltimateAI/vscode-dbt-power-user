import * as path from "path";

export type DBTGraphType = {
  [name: string]: string[];
};

export type NodeMetaMap = Map<string, NodeMetaData>;
export type MacroMetaMap = Map<string, MacroMetaData>;
export type SourceMetaMap = Map<string, SourceMetaData>;
export type RunResultMetaMap = Map<string, RunResultMetaData>;

interface RunResultMetaData {
  compiledPath?: string;
  error: string;
  timestamp: string;
  status: string;
}

interface MacroMetaData {
  path: string;
  line: number;
  character: number;
}

interface NodeMetaData {
  path: string;
}

interface SourceMetaData {
  path: string;
  tables: SourceTable[];
}

interface SourceTable {
  name: string;
}

interface NodeGraphMetaData {
  nodes: Node[];
}

export type NodeGraphMap = Map<string, NodeGraphMetaData>;

export interface GraphMetaMap {
  parents: NodeGraphMap;
  children: NodeGraphMap;
}

export abstract class Node {
  label: string;
  key: string;
  url: string;
  iconPath?: {
    light: string;
    dark: string;
  };

  constructor(label: string, key: string, url: string) {
    this.label = label;
    this.key = key;
    this.url = url;
  }
}

export class Model extends Node {
  iconPath = {
    light: path.join(path.resolve(__dirname), "../media/model_light.svg"),
    dark: path.join(path.resolve(__dirname), "../media/model_dark.svg"),
  };
}

export class Seed extends Node {}
export class Test extends Node {}
export class Analysis extends Node {}
export class Source extends Node {
  iconPath = {
    light: path.join(path.resolve(__dirname), "../media/source_light.svg"),
    dark: path.join(path.resolve(__dirname), "../media/source_dark.svg"),
  };
}
