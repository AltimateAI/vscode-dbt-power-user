import {
  DataPilotChat,
  DataPilotChatAction,
  RequestState,
} from "@modules/dataPilot/types";

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

export interface QueryAnalysisResult {
  session_id: string;
  user_prompt: string;
  datapilot_title: string;
  response?: string;
  actions?: DataPilotChatAction[];
  state: RequestState;
}

export type QueryExplainUpdate = Partial<QueryAnalysisResult> & {
  session_id: string;
};

export enum QueryAnalysisHistoryType {
  HUMAN = "HumanMessage",
  SYSTEM = "SystemMessage",
}

export interface QueryAnalysisHistory {
  type: QueryAnalysisHistoryType;
  content: string;
  additional_kwargs?: Record<string, unknown>;
}
