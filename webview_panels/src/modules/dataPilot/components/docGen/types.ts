import { DBTDocumentationColumn } from "@modules/documentationEditor/state/types";

export interface GeneratedResult extends Partial<DBTDocumentationColumn> {
  model: string;
  id: string;
  prompt: string;
  user_prompt: string;
  datapilot_title: string;
}

export enum EntityType {
  COLUMN = "column",
  MODEL = "model",
}
