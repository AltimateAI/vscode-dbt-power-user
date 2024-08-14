import {
  CancellationToken,
  NotebookCellData,
  NotebookCellKind,
  NotebookData,
  NotebookSerializer,
  Disposable,
} from "vscode";
import { provideSingleton } from "../utils";
import { RawNotebook, RawNotebookCell } from "./types";
import { DefaultNotebookCellLanguage } from "./constants";

@provideSingleton(DatapilotNotebookSerializer)
export class DatapilotNotebookSerializer
  implements NotebookSerializer, Disposable
{
  dispose() {
    throw new Error("Method not implemented.");
  }
  async deserializeNotebook(
    content: Uint8Array,
    _token: CancellationToken,
  ): Promise<NotebookData> {
    const contents = new TextDecoder().decode(content);

    let raw: RawNotebookCell[];
    try {
      raw = (<RawNotebook>JSON.parse(contents)).cells;
    } catch {
      raw = [
        {
          cell_type: "code",
          source: [],
          languageId: DefaultNotebookCellLanguage,
          metadata: {},
        },
      ];
    }

    const cells = raw.map(
      (item) =>
        new NotebookCellData(
          NotebookCellKind.Code,
          item.source?.join("\n"),
          item.languageId,
        ),
    );

    return new NotebookData(cells);
  }

  async serializeNotebook(
    data: NotebookData,
    _token: CancellationToken,
  ): Promise<Uint8Array> {
    const contents: RawNotebookCell[] = [];

    for (const cell of data.cells) {
      contents.push({
        cell_type: cell.kind === NotebookCellKind.Code ? "code" : "markdown",
        source: cell.value.split(/\r?\n/g),
        languageId: cell.languageId,
        metadata: cell.metadata,
      });
    }

    return new TextEncoder().encode(JSON.stringify({ cells: contents }));
  }
}
