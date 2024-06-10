import { requestExecutor } from "./service_utils";

export type Table = {
  table: string;
  label: string;
  url: string | undefined;
  nodeType: string;
  materialization?: string;
  downstreamCount: number;
  upstreamCount: number;
  isExternalProject: boolean;
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

export type ExposureMetaData = {
  description?: string;
  depends_on: { macros: [string]; nodes: [string]; sources: [string] };
  label?: string;
  maturity?: string;
  name: string;
  owner: { email: string; name: string };
  tags: [string];
  url?: string;
  type: string;
  config: { enabled: boolean };
  path: string;
  unique_id: string;
  sources?: [string];
  metrics?: unknown[];
  meta?: Record<string, unknown>;
};

interface ColumnLineageResponse {
  column_lineage: ColumnLineage[];
  confidence?: { confidence: string; operator_list?: string[] };
}

interface LineageSettings {
  showSelectEdges: boolean;
  showNonSelectEdges: boolean;
  defaultExpansion: number;
}

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

export const getExposureDetails = (name: string) => {
  return requestExecutor("getExposureDetails", {
    name,
  }) as Promise<ExposureMetaData>;
};

export const getColumns = (table: string, refresh: boolean) => {
  return requestExecutor("getColumns", {
    table,
    refresh,
  }) as Promise<Columns>;
};

export const getConnectedColumns = (body: {
  targets: [string, string][];
  upstreamExpansion: boolean;
  currAnd1HopTables: string[];
  selectedColumn: { name: string; table: string };
}) => {
  return requestExecutor(
    "getConnectedColumns",
    body,
  ) as Promise<ColumnLineageResponse>;
};

export const sendFeedback = (body: {
  feedback_value: "good" | "bad";
  feedback_text: string;
}) => {
  return requestExecutor("sendFeedback", body) as Promise<{ ok: boolean }>;
};

export const getLineageSettings = () => {
  return requestExecutor("getLineageSettings", {}) as Promise<LineageSettings>;
};

export const persistLineageSettings = (body: Partial<LineageSettings>) => {
  return requestExecutor("persistLineageSettings", body) as Promise<{
    ok: boolean;
  }>;
};
