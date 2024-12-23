import { DataPilotChat } from "@modules/dataPilot/types";
import { UnknownAction } from "@reduxjs/toolkit";

export enum Themes {
  Dark = "dark",
  Light = "light",
}
export interface AppStateProps {
  theme: Themes;
  isComponentsApiInitialized: boolean;
  users: Record<number, User>;
  currentUser: User | null;
  tenantInfo: {
    frontendUrl: string | null;
    currency: string;
    teammatesEnabled: boolean;
  };
}

export interface ContextProps {
  state: AppStateProps;
  dispatch: React.Dispatch<UnknownAction>;
  toggleDataPilot: (open: boolean) => void;
  postMessageToDataPilot: (
    message: Partial<DataPilotChat> & { id: DataPilotChat["id"] },
  ) => void;
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

export interface User {
  display_name: string;
  first_name: string;
  last_name: string;
  id: number;
}
