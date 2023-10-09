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

type Edge = {
  source :[string, string];
  target :[string, string];
}
interface ColumnLineageResponse {
  columnLineage: Edge[];
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

export const getConnectedColumns = (body: unknown) => {
  return requestExecutor("getConnectedColumns2", body) as Promise<
    ColumnLineageResponse
  >;
};
