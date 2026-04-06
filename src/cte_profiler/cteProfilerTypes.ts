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
  ctes: CteProfileEntry[];
  timestamp: number;
  error?: string;
}

export interface CteRunProgress {
  uri: string;
  completedIndex: number;
  totalCtes: number;
  currentCte: string;
}
