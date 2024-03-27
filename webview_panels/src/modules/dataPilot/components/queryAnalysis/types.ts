import { DataPilotChat, DataPilotChatFollowup } from "@modules/dataPilot/types";

export enum QueryAnalysisType {
  EXPLAIN = "explain",
  FIX = "fix",
  MODIFY = "modify",
  TRANSLATE = "translate",
}
export interface DatapilotQueryAnalysisChat extends DataPilotChat {
  query: string;
  fileName: string;
  analysisType?: QueryAnalysisType;
}

export type QueryExplainUpdate = Partial<DataPilotChatFollowup>;

export enum QueryAnalysisHistoryType {
  HUMAN = "HumanMessage",
  SYSTEM = "SystemMessage",
}

export interface QueryAnalysisHistory {
  type: QueryAnalysisHistoryType;
  content: string;
  additional_kwargs?: Record<string, unknown>;
}
