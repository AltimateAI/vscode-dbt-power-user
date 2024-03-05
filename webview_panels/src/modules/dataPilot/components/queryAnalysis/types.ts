import { DataPilotChat, DataPilotChatFollowup } from "@modules/dataPilot/types";

export enum QueryAnalysisType {
  EXPLAIN = "explain",
  FIX = "fix",
  MODIFY = "modify",
}
export interface DatapilotQueryAnalysisChat extends DataPilotChat {
  query: string;
  fileName: string;
  analysisType?: QueryAnalysisType;
}

export type DatapilotCustomTestChat = DataPilotChat;

export type QueryAnalysisFollowup = DataPilotChatFollowup;

export type QueryExplainUpdate = Partial<QueryAnalysisFollowup>;

export enum QueryAnalysisHistoryType {
  HUMAN = "HumanMessage",
  SYSTEM = "SystemMessage",
}

export interface QueryAnalysisHistory {
  type: QueryAnalysisHistoryType;
  content: string;
  additional_kwargs?: Record<string, unknown>;
}
