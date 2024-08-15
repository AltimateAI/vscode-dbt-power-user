import {
  FileSystemProvider,
  EventEmitter,
  FileChangeEvent,
  Uri,
  Disposable,
  FileStat,
  FileType,
  FileChangeType,
  Event,
  NotebookCellKind,
  window,
  NotebookDocument,
} from "vscode";
import { provideSingleton } from "../utils";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { TelemetryEvents } from "../telemetry/events";
import { NotebookCellSchema, NotebookSchema } from "./types";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import path = require("path");
import { DatapilotNotebookExtension } from "./constants";

@provideSingleton(NotebookFileSystemProvider)
export class NotebookFileSystemProvider implements FileSystemProvider {
  private _emitter = new EventEmitter<FileChangeEvent[]>();
  readonly onDidChangeFile: Event<FileChangeEvent[]> = this._emitter.event;

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private dbtTerminal: DBTTerminal,
  ) {}
  watch(
    uri: Uri,
    options: { recursive: boolean; excludes: string[] },
  ): Disposable {
    // Implement watch if needed
    return new Disposable(() => {});
  }

  stat(uri: Uri): FileStat {
    return {
      type: FileType.File,
      ctime: Date.now(),
      mtime: Date.now(),
      size: 0,
    };
  }

  readDirectory(uri: Uri): [string, FileType][] {
    // Implement if needed
    return [];
  }

  createDirectory(uri: Uri): void {
    // Not needed for notebooks
  }

  readFile(uri: Uri): Uint8Array {
    const filename = path.basename(uri.fsPath, DatapilotNotebookExtension);
    const notebooksData =
      this.dbtProjectContainer.getFromGlobalState("notebooks") || {};
    const data = notebooksData[filename];
    return new TextEncoder().encode(JSON.stringify(data));
  }

  async writeFile(
    uri: Uri,
    content: Uint8Array,
    options: { create: boolean; overwrite: boolean },
  ): Promise<void> {
    // Save data to your database
    this.customSave(uri, content);

    // Notify that the file has changed
    this._emitter.fire([{ type: FileChangeType.Changed, uri }]);
  }

  delete(uri: Uri, options: { recursive: boolean }): void {
    // Implement delete from your database if needed
  }

  rename(oldUri: Uri, newUri: Uri, options: { overwrite: boolean }): void {
    // Implement rename in your database if needed
  }

  private async customSave(uri: Uri, content: Uint8Array) {
    try {
      console.log("custom save", uri, new TextDecoder().decode(content));
      const notebook = window.activeNotebookEditor?.notebook;
      if (!notebook) {
        this.dbtTerminal.warn(
          TelemetryEvents["Notebook/SaveError"],
          "No active notebook found",
        );
        return;
      }
      this.dbtTerminal.log("saving notebook", notebook);
      const fileName = notebook.metadata.name;
      // update existing file
      if (fileName) {
        this.saveNotebook(notebook, fileName);
        return;
      }
      // save new file
      window.showInputBox({ prompt: "Your notebook name?" }).then((name) => {
        if (!name) {
          return;
        }
        this.saveNotebook(notebook, name);
        window.showInformationMessage("Notebook saved successfully");
      });
    } catch (e) {
      this.dbtTerminal.error(
        TelemetryEvents["Notebook/SaveError"],
        (e as Error).message,
        e,
      );
    }
  }

  private saveNotebook(notebook: NotebookDocument, name: string) {
    const data = notebook.getCells();
    const contents: NotebookCellSchema[] = [];

    for (const cell of data) {
      contents.push({
        cell_type: cell.kind === NotebookCellKind.Code ? "code" : "markdown",
        source: cell.document.getText().split(/\r?\n/g),
        languageId: cell.document.languageId,
        metadata: cell.metadata,
      });
    }

    const output = {
      cells: contents,
      metadata: {
        ...notebook.metadata,
        name,
        createdAt: notebook.metadata.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    } as NotebookSchema;
    this.dbtTerminal.log("saving notebook", name, output);
    const currentValues =
      this.dbtProjectContainer.getFromGlobalState("notebooks") || {};
    this.dbtProjectContainer.setToGlobalState("notebooks", {
      ...currentValues,
      [name]: output,
    });
    this.dbtTerminal.log("notebook saved", name, output);
  }
}
