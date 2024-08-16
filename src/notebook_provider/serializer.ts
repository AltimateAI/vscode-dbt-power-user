import {
  CancellationToken,
  NotebookCellData,
  NotebookCellKind,
  NotebookData,
  NotebookSerializer,
  Disposable,
} from "vscode";
import { provideSingleton } from "../utils";
import { NotebookSchema } from "./types";
import { DefaultNotebookCellLanguage } from "./constants";
import { serializeNotebookData } from "./utils";

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

    let raw: NotebookSchema;
    try {
      raw = <NotebookSchema>JSON.parse(contents);
    } catch {
      raw = {
        cells: [
          {
            cell_type: "code",
            source: [],
            languageId: DefaultNotebookCellLanguage,
            metadata: {},
          },
        ],
      };
    }

    const cells = raw.cells.map(
      (item) =>
        new NotebookCellData(
          NotebookCellKind.Code,
          item.source?.join("\n"),
          item.languageId,
        ),
    );

    const notebookdata = new NotebookData(cells);
    notebookdata.metadata = raw.metadata;
    return notebookdata;
  }

  async serializeNotebook(
    data: NotebookData,
    _token: CancellationToken,
  ): Promise<Uint8Array> {
    const output = serializeNotebookData(data);

    return new TextEncoder().encode(JSON.stringify(output));
  }
}
