import { User } from "@modules/app/types";
import { NotebookCellKind } from "vscode";

export declare interface NotebookCellSchema {
  source: string[];
  cell_type: NotebookCellKind;
  languageId: string;
  metadata?: Record<string, unknown>;
}
export interface NotebookSchema {
  cells: NotebookCellSchema[];
  metadata?: Record<string, unknown>;
}
export interface NotebookItem {
  id: number;
  name: string;
  data: NotebookSchema;
  description: string;
  created_on: string;
  updated_on: string;
  tags: {
    id: number;
    tag: string;
  }[];
  privacy: string;
  created_by_user: User;
}

export interface PreconfiguredNotebookItem {
  name: string;
  description: string;
  created_on: string;
  updated_at: string;
  id: string;
  tags: string[];
  data: NotebookSchema;
}
