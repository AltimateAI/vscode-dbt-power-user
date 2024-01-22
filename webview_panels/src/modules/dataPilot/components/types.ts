import { DBTDocumentationColumn } from "@modules/documentationEditor/state/types";

export interface GeneratedResult extends Partial<DBTDocumentationColumn> {
  model: string;
}
