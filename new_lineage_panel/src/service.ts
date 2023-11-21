import { requestExecutor } from "./App";

export type Table = {
  key: string;
  table: string;
  url: string;
  nodeType: string;
  materialization?: string;
  downstreamCount: number;
  upstreamCount: number;
  tests: { key: string; path: string }[];
};
export type Column = {
  name: string;
  table: string;
  datatype: string;
  can_lineage_expand: boolean;
  description: string;
};
export type Columns = {
  id: string;
  purpose: string;
  columns: Column[];
};

export type ColumnLineage = {
  source: [string, string];
  target: [string, string];
  type: string;
};
interface ColumnLineageResponse {
  column_lineage: ColumnLineage[];
  confidence?: { confidence: string; operator_list?: string[] };
}

export const upstreamTables = (tableKey: string) => {
  return requestExecutor("upstreamTables", { table: tableKey }) as Promise<{
    tables: Table[];
  }>;
};

export const downstreamTables = (tableKey: string) => {
  return requestExecutor("downstreamTables", { table: tableKey }) as Promise<{
    tables: Table[];
  }>;
};

export const getColumns = (
  { key, nodeType }: { key: string; nodeType: string },
  refresh: boolean,
) => {
  return requestExecutor("getColumns", {
    table: key,
    refresh,
    nodeType,
  }) as Promise<
    Columns
  >;
};

export const getConnectedColumns = (body: {
  targets: [string, string][];
  upstreamExpansion: boolean;
  currAnd1HopTables: string[];
  selectedColumn: { name: string; table: string };
}) => {
  return requestExecutor("getConnectedColumns", body) as Promise<
    ColumnLineageResponse
  >;
};
