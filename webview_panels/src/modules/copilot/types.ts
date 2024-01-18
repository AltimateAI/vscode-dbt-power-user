import { UnknownAction } from "@reduxjs/toolkit";

export interface CopilotStateProps {
  isCopilotOpen: boolean;
}

export interface ContextProps {
  state: CopilotStateProps;
  dispatch: React.Dispatch<UnknownAction>;
}
