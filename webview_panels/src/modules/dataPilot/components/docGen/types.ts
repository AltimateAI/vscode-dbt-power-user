import { DataPilotChatFollowup } from "@modules/dataPilot/types";
import { DBTDocumentationColumn } from "@modules/documentationEditor/state/types";

export interface DocGenFollowup
  extends Partial<DBTDocumentationColumn>,
    DataPilotChatFollowup {
  model?: string;
}

export enum EntityType {
  COLUMN = "column",
  MODEL = "model",
}
