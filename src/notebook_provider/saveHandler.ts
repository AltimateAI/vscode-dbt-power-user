import { commands, Disposable, NotebookCellKind, Uri, window } from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { RawNotebookCell } from "./types";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { TelemetryEvents } from "../telemetry/events";

@provideSingleton(NotebookSaveHandler)
export class NotebookSaveHandler implements Disposable {
  private disposables: Disposable[] = [];

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private dbtTerminal: DBTTerminal,
  ) {
    // Intercept save commands
    this.disposables.push(
      commands.registerCommand("workbench.action.files.save", (uri: Uri) =>
        this.customSave(uri),
      ),
    );
    this.disposables.push(
      commands.registerCommand(
        "workbench.action.files.saveAs",
        this.customSaveAs,
      ),
    );
  }

  private async customSave(uri: Uri) {
    try {
      const notebook = window.activeNotebookEditor?.notebook;
      // Check if the file is a "notebook" file
      if (notebook?.uri.fsPath.endsWith(".notebook")) {
        this.dbtTerminal.log("saving notebook", notebook);
        window.showInputBox({ prompt: "Your notebook name?" }).then((name) => {
          if (!name) {
            return;
          }
          // TODO: handle as per requirement
          const data = notebook.getCells();
          const contents: RawNotebookCell[] = [];

          for (const cell of data) {
            contents.push({
              cell_type:
                cell.kind === NotebookCellKind.Code ? "code" : "markdown",
              source: cell.document.getText().split(/\r?\n/g),
              languageId: cell.document.languageId,
            });
          }

          const output = JSON.stringify({ cells: contents });
          const currentValues =
            this.dbtProjectContainer.getFromGlobalState("notebooks") || {};
          this.dbtProjectContainer.setToGlobalState("notebooks", {
            ...currentValues,
            [name]: output,
          });
          console.log("notebook saved", name, contents);
          window.showInformationMessage("Notebook saved successfully");
        });
        // Implement logic to save the notebook content to your server
      } else {
        // If not a notebook file, fallback to default save behavior
        // Trigger the default save command
        await commands.executeCommand("workbench.action.files.save", uri, {
          skipCustomCommand: true,
        });
      }
    } catch (e) {
      this.dbtTerminal.error(
        TelemetryEvents["Notebook/SaveError"],
        (e as Error).message,
        e,
      );
    }
  }

  private async customSaveAs(uri: Uri) {
    // Check if the file is a "notebook" file
    if (uri.fsPath.endsWith(".notebook")) {
      // Implement logic to save the notebook content to your server with a 'save as' functionality
    } else {
      // If not a notebook file, fallback to default save as behavior
      // Trigger the default save as command
      await commands.executeCommand("workbench.action.files.saveAs", uri, {
        skipCustomCommand: true,
      });
    }
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
