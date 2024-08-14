import { Disposable, Uri, workspace } from "vscode";
import { provideSingleton } from "../utils";
import { NotebookFileSystemProvider } from "./notebookFileSystemProvider";

@provideSingleton(FilesystemProviders)
export class FilesystemProviders implements Disposable {
  private disposables: Disposable[] = [];
  constructor() {
    this.disposables.push(
      workspace.registerFileSystemProvider(
        "memfs",
        new NotebookFileSystemProvider(),
        {},
      ),
    );

    workspace.onWillSaveNotebookDocument((e) => {
      if (e.notebook.notebookType === "datapilot-notebook") {
        // Check if the file is a ".notebook" file
        console.log("Notebook file saving:", e.notebook.uri.fsPath);

        // Call your custom save functionality here
        console.log("custom save", e.notebook);
      }
    });

    workspace.onDidSaveNotebookDocument((doc) => {
      if (doc.notebookType === "datapilot-notebook") {
        // Check if the saved file is a ".notebook" file
        console.log("Notebook file saved:", doc.uri.fsPath);

        // Call your custom save functionality here
        console.log("custom save", document);
      }
    });
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
