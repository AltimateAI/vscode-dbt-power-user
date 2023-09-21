import { requestExecutor } from "./App";

export type Tables = { table: string; count: number; url: string }[];
export type Column = {
  name: string;
  rk: string;
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
  collect_columns: Record<string, string[]>;
  highlight_edges: [string, string][];
}

export const upstreamTables = (table: string) => {
  return requestExecutor("upstreamTables", { table }) as Promise<{
    tables: Tables;
  }>;
};

export const downstreamTables = (table: string) => {
  return requestExecutor("downstreamTables", { table }) as Promise<{
    tables: Tables;
  }>;
};

export const getColumns = (table: string) => {
  return requestExecutor("getColumns", {
    table: table.split(".").pop(), // TODO: stopgap solution 
  }) as Promise<
    Columns
  >;
};

export const getConnectedColumns = (body: unknown) => {
  console.log("service:getConnectedColumns -> ", body)
  return requestExecutor("getConnectedColumns", body) as Promise<
    ColumnLineageResponse
  >;
};

export const updateTablePurpose = (body: unknown) =>
  requestExecutor("updateTablePurpose", body) as Promise<{ ok: boolean }>;

export const generateDescription = (body: unknown) =>
  requestExecutor("generateDescription", body) as Promise<unknown>;
