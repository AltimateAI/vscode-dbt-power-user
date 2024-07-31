import { PythonExtension } from "@vscode/python-extension";
import * as vscode from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { SharedStateService } from "../services/sharedStateService";
import { QueryManifestService } from "../services/queryManifestService";
import path = require("path");
import { Jupyter } from "@vscode/jupyter-extension";
import { createPythonServer } from "./pythonServer";

interface RawNotebookCell {
  source: string[];
  cell_type: "code" | "markdown";
}

@provideSingleton(NotebookKernel)
export class NotebookKernel {
  private readonly _id = "test-notebook-serializer-kernel";
  private readonly _label = "Altimate dbt kernel";
  private readonly _supportedLanguages = ["python", "sql", "jinja-sql"];

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
    // vscode.commands.registerCommand(
    //   "workbench.action.files.save",
    //   (uri: vscode.Uri) => this.customSave(uri),
    // );
    // vscode.commands.registerCommand(
    //   "workbench.action.files.saveAs",
    //   this.customSaveAs,
    // );

    this._controller.supportedLanguages = this._supportedLanguages;
    this._controller.supportsExecutionOrder = true;
    this._controller.executeHandler = this._executeAll.bind(this);
    this._controller.onDidChangeSelectedNotebooks(
      this.onDidChangeSelectedNotebooks,
      this,
      [],
    );
    // this._controller.updateNotebookAffinity = async (
    //   notebook: vscode.NotebookDocument,
    //   affinity: vscode.NotebookControllerAffinity,
    // ) => {
    //   console.log("updateNotebookAffinity", notebook.uri.toString(), affinity);
    // };
  }

  private async onDidChangeSelectedNotebooks(event: {
    notebook: vscode.NotebookDocument;
    selected: boolean;
  }) {
    // const jupyterExt =
    //   vscode.extensions.getExtension<Jupyter>("ms-toolsai.jupyter");
    // if (!jupyterExt) {
    //   throw new Error("Jupyter Extension not installed");
    // }
    // if (!jupyterExt.isActive) {
    //   jupyterExt.activate();
    // }
    // jupyterExt.exports.kernels.
    // const isControllerChanged = event.selected;
    // if (!isControllerChanged) {
    //   return;
    // }
    // const uri = vscode.window.activeNotebookEditor?.notebook.uri;
    // if (!uri) {
    //   return;
    // }
    // // If current notebook belongs to project, dont do anything
    // if (this.queryManifestService.getProjectByUri(uri)) {
    //   return;
    // }
    // const project =
    //   await this.queryManifestService.getOrPickProjectFromWorkspace();
    // if (!project) {
    //   vscode.window.showErrorMessage("No dbt project selected");
    //   return;
    // }
    // await vscode.commands.executeCommand(
    //   "workbench.action.revertAndCloseActiveEditor",
    // );
    // const fileUri = vscode.Uri.parse(
    //   `${project.projectRoot}/${path.basename(uri.fsPath)}`,
    // ).with({ scheme: uri.scheme || "untitled" });
    // vscode.workspace.openNotebookDocument(fileUri).then((doc) => {
    //   // set this to sql language so we can bind codelens and other features
    //   // languages.setTextDocumentLanguage(doc, "jinja-sql");
    //   vscode.window.showNotebookDocument(doc).then((editor) => {});
    // });
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

    if (!vscode.window.activeNotebookEditor?.notebook.uri) {
      return;
    }
    // const jupyterExt =
    //   vscode.extensions.getExtension<Jupyter>("ms-toolsai.jupyter");
    // if (!jupyterExt) {
    //   throw new Error("Jupyter Extension not installed");
    // }
    // if (!jupyterExt.isActive) {
    //   jupyterExt.activate();
    // }

    // if (cell.document.languageId !== "jinja-sql") {
    //   jupyterExt.exports.kernels
    //     .getKernel(vscode.window.activeNotebookEditor.notebook.uri)
    //     .then(async (kernel) => {
    //       execution.executionOrder = ++this._executionOrder;
    //       execution.start(Date.now());
    //       try {
    //         if (!kernel){
    //           throw new Error("Kernel not found");
    //         }
    //         // clear the existing output
    //         void execution.clearOutput();
    //         const text = cell.document.getText();
    //         const result = kernel.executeCode(
    //           text,
    //           null as unknown as vscode.CancellationToken,
    //         );
    //         execution.replaceOutput([
    //           new vscode.NotebookCellOutput([
    //             vscode.NotebookCellOutputItem.text(
    //               JSON.stringify(result),
    //               "text/plain",
    //             ),
    //           ]),
    //         ]);

    //         execution.end(true, Date.now());
    //       } catch (err) {
    //         execution.replaceOutput([
    //           new vscode.NotebookCellOutput([
    //             vscode.NotebookCellOutputItem.error(err as Error),
    //           ]),
    //         ]);
    //         execution.end(false, Date.now());
    //       }
    //     });
    //   return;
    // }
    execution.executionOrder = ++this._executionOrder;
    execution.start(Date.now());

    try {
      // clear the existing output
      void execution.clearOutput();
      // TODO: clean this up
      const project =
        await this.queryManifestService.getOrPickProjectFromWorkspace();
      if (!project) {
        vscode.window.showErrorMessage("No dbt project selected.");
        return;
      }

      let result;
      const outputCells = [];
      if (cell.document.languageId === "python") {
        // const pythonApi: PythonExtension = await PythonExtension.api();
        // const server = createPythonServer([
        //   pythonApi.environments.getActiveEnvironmentPath().path,
        // ]);
        // result = (await server.execute(cell.document.getText()))?.output;

        result = (await project.executePython(
          cell.document.getText(),
        )) as any[];
        for (const item of result) {
          try {
            const text =
              item.startsWith("'") && item.endsWith("'")
                ? item.slice(1, -1)
                : item;
            outputCells.push(
              vscode.NotebookCellOutputItem.json(
                JSON.parse(text),
                "application/json",
              ),
            );
          } catch (_e) {
            outputCells.push(vscode.NotebookCellOutputItem.stdout(item));
          }
        }
      } else {
        result = await project.executeSQL(
          cell.document.getText(),

          "",
          true,
        );
        outputCells.push(
          vscode.NotebookCellOutputItem.json(
            result,
            "application/perspective-json",
          ),
        );

        // Testing new cell creation
        // Will be used based on data after execution
        const newCell = new vscode.NotebookCellData(
          vscode.NotebookCellKind.Code,
          "select * from ref",
          "jinja-sql",
        );
        const edit = new vscode.WorkspaceEdit();
        edit.set(vscode.window.activeNotebookEditor.notebook.uri, [
          new vscode.NotebookEdit(
            new vscode.NotebookRange(
              vscode.window.activeNotebookEditor.notebook.cellCount,
              vscode.window.activeNotebookEditor.notebook.cellCount,
            ),
            [newCell],
          ),
        ]);

        await vscode.workspace.applyEdit(edit);
      }

      execution.replaceOutput(new vscode.NotebookCellOutput(outputCells));

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
