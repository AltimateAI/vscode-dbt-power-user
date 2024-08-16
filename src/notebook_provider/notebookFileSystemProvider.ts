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
  window,
  NotebookDocument,
  workspace,
  commands,
} from "vscode";
import { provideSingleton } from "../utils";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { TelemetryEvents } from "../telemetry/events";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import path = require("path");
import { DatapilotNotebookExtension } from "./constants";
import { serializeNotebookData } from "./utils";

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
    const filename = this.getFileNameFromUri(uri);
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
    await this.customSave(uri, content);

    // Notify that the file has changed
    this._emitter.fire([{ type: FileChangeType.Changed, uri }]);
  }

  delete(uri: Uri, options: { recursive: boolean }): void {
    // Implement delete from your database if needed
  }

  rename(oldUri: Uri, newUri: Uri, options: { overwrite: boolean }): void {
    this._emitter.fire([
      { type: FileChangeType.Deleted, uri: oldUri },
      { type: FileChangeType.Created, uri: newUri },
    ]);
  }

  private getFileNameFromUri(uri: Uri) {
    return path.basename(uri.fsPath, DatapilotNotebookExtension);
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
      const name = await window.showInputBox({ prompt: "Your notebook name?" });
      if (!name) {
        return;
      }
      this.saveNotebook(notebook, name);
      // Open a new document with new name and close the untitled
      const oldFileName = this.getFileNameFromUri(uri);
      const newUri = uri.with({ path: uri.path.replace(oldFileName, name) });
      await commands.executeCommand(
        "workbench.action.revertAndCloseActiveEditor",
      );

      await window.showNotebookDocument(
        await workspace.openNotebookDocument(newUri),
      );

      window.showInformationMessage("Notebook saved successfully");
    } catch (e) {
      this.dbtTerminal.error(
        TelemetryEvents["Notebook/SaveError"],
        (e as Error).message,
        e,
      );
    }
  }

  private saveNotebook(notebook: NotebookDocument, name: string) {
    const output = serializeNotebookData(notebook, name);
    this.dbtTerminal.log("saving notebook", name, output);
    const currentValues =
      this.dbtProjectContainer.getFromGlobalState("notebooks") || {};
    this.dbtProjectContainer.setToGlobalState("notebooks", {
      ...currentValues,
      [name]: output,
    });
    this.dbtTerminal.log("notebook saved", name, output);
    return output;
  }
}
