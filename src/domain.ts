
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