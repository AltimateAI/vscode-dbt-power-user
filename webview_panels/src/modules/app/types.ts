import { UnknownAction } from "@reduxjs/toolkit";

export type AppStateProps = {
  theme: string;
};

export type ContextProps = {
  state: AppStateProps;
  dispatch: React.Dispatch<UnknownAction>;
};
