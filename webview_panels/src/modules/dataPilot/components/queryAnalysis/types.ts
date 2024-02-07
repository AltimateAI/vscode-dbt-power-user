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
  code: string;
  fileName: string;
  analysisType?: QueryAnalysisType;
}

export interface QueryExplainResult {
  session_id: string;
  user_prompt: string;
  datapilot_title: string;
  response?: string;
  actions?: DataPilotChatAction[];
  state: RequestState;
}

export type QueryExplainUpdate = Partial<QueryExplainResult> & {
  session_id: string;
};
