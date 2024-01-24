import { UnknownAction } from "@reduxjs/toolkit";

export enum RequestTypes {
  AI_DOC_GENERATION,
  AI_DOC_REGENERATION,
}

export enum RequestState {
  LOADING,
  ERROR,
  COMPLETED,
}

export interface DataPilotChatAction {
  title: string;
  data: Record<string, unknown>;
}

export interface DataPilotChat {
  id: string;
  query: string;
  state: RequestState;
  requestType: RequestTypes;
  response?: string;
  actions?: DataPilotChatAction[];
  updatedAt?: Date;
  meta?: Record<string, unknown>;
}

export interface DataPilotStateProps {
  items: Record<DataPilotChat["id"], DataPilotChat>;
}

export interface ContextProps {
  state: DataPilotStateProps;
  dispatch: React.Dispatch<UnknownAction>;
}
