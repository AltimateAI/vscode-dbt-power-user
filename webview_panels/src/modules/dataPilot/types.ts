import { UnknownAction } from "@reduxjs/toolkit";

export enum RequestTypes {
  AI_DOC_GENERATION,
  AI_DOC_REGENERATION,
  QUERY_ANALYSIS,
}

export enum RequestState {
  UNINITIALIZED,
  LOADING,
  ERROR,
  COMPLETED,
}

export interface DataPilotChatAction {
  title: string;
  data: Record<string, unknown>;
  command: string;
  user_prompt: string;
  datapilot_title: string;
}

export interface DataPilotChat {
  id: string;
  query: string; // query text that triggered this chat
  state: RequestState; // state of current request
  requestType: RequestTypes; // What type of request is this? ex: AI doc generation
  response?: string; // Response from backend
  actions?: DataPilotChatAction[]; // follow up actions
  updatedAt?: Date;
  meta?: Record<string, unknown>; // any extra data to be stored
}

export interface DataPilotStateProps {
  items: Record<DataPilotChat["id"], DataPilotChat>;
}

export interface ContextProps {
  state: DataPilotStateProps;
  dispatch: React.Dispatch<UnknownAction>;
}
