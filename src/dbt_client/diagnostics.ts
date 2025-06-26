export interface DBTDiagnosticData {
  filePath: string;
  message: string;
  severity: "error" | "warning" | "info" | "hint";
  range?: {
    startLine: number;
    startColumn: number;
    endLine: number;
    endColumn: number;
  };
  source: string;
  category: string;
}

export interface DBTDiagnosticResult {
  pythonBridgeDiagnostics: DBTDiagnosticData[];
  rebuildManifestDiagnostics: DBTDiagnosticData[];
  // This is only available on dbtIntegrationAdapter
  projectConfigDiagnostics?: DBTDiagnosticData[];
}
