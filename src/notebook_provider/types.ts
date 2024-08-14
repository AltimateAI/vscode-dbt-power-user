export interface RawNotebook {
  cells: RawNotebookCell[];
}

export interface RawNotebookCell {
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
