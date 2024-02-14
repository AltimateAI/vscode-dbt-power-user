import { UnknownAction } from "@reduxjs/toolkit";
import { QueryExplainUpdate, QueryAnalysisResult } from "../types";

export interface QueryAnalysisStateProps {
  sessionId: string | null;
}
export interface QueryAnalysisContextProps {
  state: QueryAnalysisStateProps;
  dispatch: React.Dispatch<UnknownAction>;
  onNewGeneration: (result: QueryExplainUpdate) => void;
  results: QueryAnalysisResult[];
}
