export interface CteProfileEntry {
  name: string;
  line: number;
  queryTimeMs: number;
  marginalTimeMs: number;
  rowCount: number;
  tier: "hot" | "warm" | "cool";
}

export interface CteProfileResult {
  uri: string;
  modelName: string;
  status: "running" | "complete" | "partial" | "error";
  totalTimeMs: number;
  totalRows: number;
  // Number of CTEs the profile run was started with; lets the UI render an
  // "X/Y CTEs" suffix for partial runs even after `ctes` only holds the
  // entries that completed.
  totalCount: number;
  ctes: CteProfileEntry[];
  timestamp: number;
  error?: string;
}
