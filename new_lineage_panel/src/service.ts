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
interface ColumnLineageResponse {
  collectColumns: Record<string, string[]>;
  highlightEdges: [string, string][];
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

export const getColumns = (table: string, online: boolean = false) => {
  return requestExecutor("getColumns", { table, online }) as Promise<
    Columns
  >;
};

export const getConnectedColumns = (body: unknown) => {
  console.log("service:getConnectedColumns -> ", body);
  return requestExecutor("getConnectedColumns", body) as Promise<
    ColumnLineageResponse
  >;
};
