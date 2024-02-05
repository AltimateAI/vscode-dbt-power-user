import { DataPilotChat, DataPilotChatAction } from "@modules/dataPilot/types";

export enum SqlAnalysisType {
  SQL_EXPLAIN = "explain",
}
export interface DatapilotSqlAnalysisChat extends DataPilotChat {
  code: string;
  fileName: string;
  analysisType?: SqlAnalysisType;
}

export interface SqlExplainResult {
  user_prompt: string;
  datapilot_title: string;
  response: string;
  actions?: DataPilotChatAction[];
}
