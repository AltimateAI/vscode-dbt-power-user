import * as vscode from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { SharedStateService } from "../services/sharedStateService";
import { QueryManifestService } from "../services/queryManifestService";

interface RawNotebookCell {
  source: string[];
  cell_type: "code" | "markdown";
}

@provideSingleton(NotebookKernel)
export class NotebookKernel {
  private readonly _id = "test-notebook-serializer-kernel";
  private readonly _label = "Altimate dbt kernel";
  private readonly _supportedLanguages = ["sql", "jinja-sql"];

  private _executionOrder = 0;
  private readonly _controller: vscode.NotebookController;

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private eventEmitterService: SharedStateService,
    private queryManifestService: QueryManifestService,
  ) {
    this._controller = vscode.notebooks.createNotebookController(
      this._id,
      "my-notebook",
      this._label,
    );

    // TODO: move this right place
    // Intercept save commands
    vscode.commands.registerCommand(
      "workbench.action.files.save",
      (uri: vscode.Uri) => this.customSave(uri),
    );
    // vscode.commands.registerCommand(
    //   "workbench.action.files.saveAs",
    //   this.customSaveAs,
    // );

    this._controller.supportedLanguages = this._supportedLanguages;
    this._controller.supportsExecutionOrder = true;
    this._controller.executeHandler = this._executeAll.bind(this);
    // this._controller.updateNotebookAffinity = async (
    //   notebook: vscode.NotebookDocument,
    //   affinity: vscode.NotebookControllerAffinity,
    // ) => {
    //   console.log("updateNotebookAffinity", notebook.uri.toString(), affinity);
    // };
  }

  private async customSave(uri: vscode.Uri) {
    try {
      const notebook = vscode.window.activeNotebookEditor?.notebook;
      // Check if the file is a "notebook" file
      if (notebook?.uri.fsPath.endsWith(".notebook")) {
        console.log("custom save", notebook);
        vscode.window
          .showInputBox({ prompt: "Your bookmark name?" })
          .then((name) => {
            if (!name) {
              return;
            }
            // TODO: handle as per requirement
            const data = notebook.getCells();
            const contents: RawNotebookCell[] = [];

            for (const cell of data) {
              contents.push({
                cell_type:
                  cell.kind === vscode.NotebookCellKind.Code
                    ? "code"
                    : "markdown",
                source: cell.document.getText().split(/\r?\n/g),
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
            vscode.window.showInformationMessage("Notebook saved successfully");
          });
        // Implement logic to save the notebook content to your server
      } else {
        // If not a notebook file, fallback to default save behavior
        // Trigger the default save command
        await vscode.commands.executeCommand(
          "workbench.action.files.save",
          uri,
          {
            skipCustomCommand: true,
          },
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  private async customSaveAs(uri: vscode.Uri) {
    // Check if the file is a "notebook" file
    if (uri.fsPath.endsWith(".notebook")) {
      // Implement logic to save the notebook content to your server with a 'save as' functionality
    } else {
      // If not a notebook file, fallback to default save as behavior
      // Trigger the default save as command
      await vscode.commands.executeCommand(
        "workbench.action.files.saveAs",
        uri,
        { skipCustomCommand: true },
      );
    }
  }

  dispose(): void {
    this._controller.dispose();
  }

  private _executeAll(
    cells: vscode.NotebookCell[],
    _notebook: vscode.NotebookDocument,
    _controller: vscode.NotebookController,
  ): void {
    for (const cell of cells) {
      this._doExecution(cell);
    }
  }

  private async _doExecution(cell: vscode.NotebookCell): Promise<void> {
    const execution = this._controller.createNotebookCellExecution(cell);

    execution.executionOrder = ++this._executionOrder;
    execution.start(Date.now());

    try {
      // TODO: clean this up
      const project =
        await this.queryManifestService.getOrPickProjectFromWorkspace();
      if (!project) {
        vscode.window.showErrorMessage("No dbt project selected.");
        return;
      }
      const result = await project.executeSQL(
        cell.document.getText(),

        "",
        true,
      );
      execution.replaceOutput([
        new vscode.NotebookCellOutput([
          vscode.NotebookCellOutputItem.json(
            result,
            "x-application/github-issues",
          ),
        ]),
      ]);

      execution.end(true, Date.now());
    } catch (err) {
      execution.replaceOutput([
        new vscode.NotebookCellOutput([
          vscode.NotebookCellOutputItem.error(err as Error),
        ]),
      ]);
      execution.end(false, Date.now());
    }
  }
}
