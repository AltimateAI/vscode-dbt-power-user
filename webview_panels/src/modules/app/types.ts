import { UnknownAction } from "@reduxjs/toolkit";

export interface AppStateProps {
  theme: string;
}

export interface ContextProps {
  state: AppStateProps;
  dispatch: React.Dispatch<UnknownAction>;
  toggleDataPilot: (open: boolean) => void;
  postMessageToDataPilot: (message: Record<string, unknown>) => void;
}

export interface IncomingMessageProps {
  command: string;
  args: Record<string, unknown>;
}

export interface IncomingSyncResponse {
  syncRequestId: string;
  body: unknown;
  status: boolean;
  error: string;
}
