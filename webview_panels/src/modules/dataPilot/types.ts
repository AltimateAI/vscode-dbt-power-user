import { UnknownAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

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
  title: string | ReactNode;
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
}

export interface DataPilotStateProps {
  items: Record<DataPilotChat["id"], DataPilotChat>;
}

export interface ContextProps {
  state: DataPilotStateProps;
  dispatch: React.Dispatch<UnknownAction>;
}
