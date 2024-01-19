import { UnknownAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

enum RequestTypes {
  AI_GENERATION,
}
interface CopilotChatActions {
  title: string | ReactNode;
  onClick: () => void;
}
export interface CopilotChat {
  id: string;
  title: string;
  query: string;
  requestType: RequestTypes;
  response: string;
  actions?: CopilotChatActions[];
}
export interface CopilotStateProps {
  isCopilotOpen: boolean;
  items: CopilotChat[];
}

export interface ContextProps {
  state: CopilotStateProps;
  dispatch: React.Dispatch<UnknownAction>;
}
