import { requestExecutor } from "./App";

export type Tables = { table: string; count: number; url: string }[];
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
