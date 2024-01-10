import { UnknownAction } from "@reduxjs/toolkit";
import { DocumentationStateProps } from "./state/types";

export interface ContextProps {
  state: DocumentationStateProps;
  dispatch: React.Dispatch<UnknownAction>;
}
