import { QueryAnalysisType } from "./types";

export const QueryAnalysisCommands = {
  [QueryAnalysisType.EXPLAIN]: "queryAnalysis:explain",
  [QueryAnalysisType.MODIFY]: "queryAnalysis:modify",
};
