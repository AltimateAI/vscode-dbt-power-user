import { UnknownAction } from "@reduxjs/toolkit";
import { DatapilotResponseComponents } from "./constants";

export enum RequestTypes {
  ADD_CUSTOM_TEST = "ADD_CUSTOM_TEST",
  AI_DOC_GENERATION = "AI_DOC_GENERATION",
  AI_DOC_REGENERATION = "AI_DOC_REGENERATION",
  QUERY_ANALYSIS = "QUERY_ANALYSIS",
}

export enum RequestState {
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  UNINITIALIZED = "UNINITIALIZED",
}

export interface DataPilotChatAction {
  title: string;
  data: Record<string, unknown>;
  command: string;
  userPrompt: string;
  datapilotTitle: string;
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
  followups?: DataPilotChatFollowup[];
  filePath?: string;
}

export interface DataPilotChatFollowup {
  id: string;
  userPrompt: string;
  datapilotTitle: string;
  response?: string;
  component?: keyof typeof DatapilotResponseComponents;
  actions?: DataPilotChatAction[];
  codeBlockActions?: {
    title: string;
    onClick: (
      followup: DataPilotChatFollowup,
      buttonTitle: string,
    ) => void | Promise<void>;
  }[];
  state: RequestState;
  hideFeedback?: boolean;
  hideFollowup?: boolean;
}

export interface DataPilotStateProps {
  items: Record<DataPilotChat["id"], DataPilotChat>;
  currentSessionId?: DataPilotChat["id"];
  showHelp: boolean;
  packageVersions: Record<string, string>;
}

export interface ContextProps {
  state: DataPilotStateProps;
  dispatch: React.Dispatch<UnknownAction>;
}
