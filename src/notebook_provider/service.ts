import { Disposable } from "vscode";
import { provideSingleton } from "../utils";
import { NotebookKernel } from "./controller";
import { NotebookCellEvent } from "./types";

@provideSingleton(NotebookService)
export class NotebookService implements Disposable {
  private disposables: Disposable[] = [];
  private cellByNotebookAutocompleteMap: Map<
    string,
    { cellId: string; fragment: string; languageId: string }[]
  > = new Map();

  constructor(private notebookKernel: NotebookKernel) {
    this.disposables.push(
      this.notebookKernel.onNotebookCellChangeEvent((event) => {
        this.onNotebookCellChanged(event);
      }),
    );
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  getCellByNotebookAutocompleteMap() {
    return this.cellByNotebookAutocompleteMap;
  }

  private onNotebookCellChanged(event: NotebookCellEvent): void {
    if (!event.fragment) {
      return;
    }
    const newValue = {
      cellId: event.cellId,
      fragment: event.fragment,
      languageId: event.languageId,
    };
    const values = this.cellByNotebookAutocompleteMap.get(event.notebook) || [];
    switch (event.event) {
      case "add":
      case "update":
        this.cellByNotebookAutocompleteMap.set(event.notebook, [
          ...values.filter((c) => c.cellId !== event.cellId),
          newValue,
        ]);
        break;
      case "delete":
        this.cellByNotebookAutocompleteMap.set(
          event.notebook,
          values.filter((c) => c.cellId !== event.cellId),
        );

        break;
      default:
        break;
    }
  }
}
