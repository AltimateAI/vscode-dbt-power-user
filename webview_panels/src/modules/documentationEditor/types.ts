import { UnknownAction } from "@reduxjs/toolkit";
import { DBTDocumentationColumn, DocumentationStateProps } from "./state/types";

export interface ContextProps {
  state: DocumentationStateProps;
  dispatch: React.Dispatch<UnknownAction>;
}

export interface GenerationDBDataProps {
  project: string;
  model: string;
  timestamp: number;
  data: Partial<DBTDocumentationColumn>;
}
