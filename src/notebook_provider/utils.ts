import {
  NotebookCell,
  NotebookCellData,
  NotebookCellKind,
  NotebookData,
  NotebookDocument,
} from "vscode";
import { NotebookCellSchema, NotebookSchema } from "./types";

const getCells = (notebook: NotebookData | NotebookDocument) => {
  if ("getCells" in notebook) {
    return notebook.getCells();
  }
  return notebook.cells;
};

const getCellText = (cell: NotebookCellData | NotebookCell) => {
  if (cell instanceof NotebookCellData) {
    return cell.value;
  }

  return cell.document.getText();
};

const getCellLanguageId = (cell: NotebookCellData | NotebookCell) => {
  if (cell instanceof NotebookCellData) {
    return cell.languageId;
  }

  return cell.document.languageId;
};

export const serializeNotebookData = (
  notebook: NotebookData | NotebookDocument,
  name?: string,
) => {
  const contents: NotebookCellSchema[] = [];

  for (const cell of getCells(notebook)) {
    contents.push({
      cell_type: cell.kind === NotebookCellKind.Code ? "code" : "markdown",
      source: getCellText(cell).split(/\r?\n/g),
      languageId: getCellLanguageId(cell),
      metadata: cell.metadata,
    });
  }

  return {
    cells: contents,
    metadata: {
      ...notebook.metadata,
      name,
      createdAt: notebook.metadata?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  } as NotebookSchema;
};
