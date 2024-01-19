import { UnknownAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export enum RequestTypes {
  AI_DOC_GENERATION,
}

export enum RequestState {
  LOADING,
  ERROR,
  COMPLETED,
}

interface DataPilotChatActions {
  title: string | ReactNode;
  onClick: () => void;
}

export interface DataPilotChat {
  id: string;
  query: string;
  state: RequestState;
  requestType: RequestTypes;
  response?: string;
  actions?: DataPilotChatActions[];
  updatedAt?: Date;
}

export interface DataPilotStateProps {
  items: Record<DataPilotChat["id"], DataPilotChat>;
}

export interface ContextProps {
  state: DataPilotStateProps;
  dispatch: React.Dispatch<UnknownAction>;
}
