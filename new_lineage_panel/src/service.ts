import { requestExecutor } from "./App";

export type Table = {
  table: string;
  url: string;
  downstreamCount: number;
  upstreamCount: number;
};
export const upstreamTables = (table: string) => {
  return requestExecutor("upstreamTables", { table }) as Promise<{
    tables: Table[];
  }>;
};

export const downstreamTables = (table: string) => {
  return requestExecutor("downstreamTables", { table }) as Promise<{
    tables: Table[];
  }>;
};
