import { requestExecutor } from "./App";

export type Table = {
  key: string;
  table: string;
  url: string;
  nodeType: string;
  downstreamCount: number;
  upstreamCount: number;
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

type ColumnLineage = {
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

export const getColumns = (table: string, refresh: boolean) => {
  return requestExecutor("getColumns", { table, refresh }) as Promise<
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
