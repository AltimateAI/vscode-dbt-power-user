export interface NotebookItem {
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  id: string;
  tags: string[];
  notebookData: NotebookSchema;
}
export interface NotebookSchema {
  cells: NotebookCellSchema[];
  metadata?: Record<string, unknown>;
}

export interface NotebookCellSchema {
  source: string[];
  cell_type: "code" | "markdown";
  languageId: string;
  metadata?: Record<string, unknown>;
}

export interface NotebookCellEvent {
  cellId: string;
  notebook: string;
  result?: any;
  event: "add" | "update" | "delete";
  fragment?: string;
  languageId: string;
}

export interface OpenNotebookRequest {
  notebookId?: string;
  template?: string;
  query?: string;
}
