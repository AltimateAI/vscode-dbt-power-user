import * as vscode from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { QueryManifestService } from "../services/queryManifestService";
import path = require("path");
import { ClientMapper } from "./clientMapper";
import { randomUUID } from "crypto";

interface RawNotebookCell {
  source: string[];
  cell_type: "code" | "markdown";
}

export interface NotebookCellEvent {
  cellId: string;
  notebook: string;
  result?: any;
  event: "add" | "update" | "delete";
  fragment?: string;
  languageId: string;
}

const SupportedLanguages = ["python", "sql", "jinja-sql"];

@provideSingleton(NotebookKernel)
export class NotebookKernel implements vscode.Disposable {
  private readonly _id = "test-notebook-serializer-kernel";
  private readonly _label = "Altimate dbt kernel";

  private _onNotebookCellEvent = new vscode.EventEmitter<NotebookCellEvent>();
  public readonly onNotebookCellChangeEvent = this._onNotebookCellEvent.event;

  private readonly disposables: vscode.Disposable[] = [
    this._onNotebookCellEvent,
  ];

  private _executionOrder = 0;
  private readonly _controller: vscode.NotebookController;

  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private clientMapper: ClientMapper,
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

    this._controller.supportedLanguages = SupportedLanguages;
    this._controller.supportsExecutionOrder = true;
    this._controller.executeHandler = this._executeAll.bind(this);
    this._controller.onDidChangeSelectedNotebooks(
      this.onDidChangeSelectedNotebooks,
      this,
      [],
    );

    this.disposables.push(
      vscode.workspace.onDidChangeNotebookDocument((event) => {
        event.contentChanges.forEach(async (change) => {
          if (change.addedCells) {
            await this.updateCellId(event.notebook.getCells(), event.notebook);
          }
          if (change.removedCells) {
            change.removedCells.forEach((cell) => {
              this._onNotebookCellEvent.fire({
                cellId: cell.metadata.cellId,
                notebook: event.notebook.uri.fsPath,
                result: null,
                event: "delete",
                fragment: cell.document.uri.fragment,
                languageId: cell.document.languageId,
              });
            });
          }
        });
      }),
    );
    this.disposables.push(this._controller);
    this.disposables.push(
      vscode.workspace.onDidOpenNotebookDocument(async (notebook) => {
        await this.onNotebookOpen(notebook);
      }),
    );
    // this._controller.updateNotebookAffinity = async (
    //   notebook: vscode.NotebookDocument,
    //   affinity: vscode.NotebookControllerAffinity,
    // ) => {
    //   console.log("updateNotebookAffinity", notebook.uri.toString(), affinity);
    // };
  }

  private genUniqueId(cell: vscode.NotebookCell) {
    const randomStr = (Math.random() + 1).toString(36).substring(7);
    return `${cell.document.languageId.replace(/-/g, "_")}_${randomStr}`;
  }

  private async updateCellId(
    cells: vscode.NotebookCell[],
    notebook: vscode.NotebookDocument,
  ) {
    const edits: vscode.NotebookEdit[] = [];
    cells.forEach((cell) => {
      if (!cell.metadata.cellId) {
        const uniqueId = this.genUniqueId(cell);
        const newMetadata = {
          ...cell.metadata,
          cellId: uniqueId,
        };
        const edit = vscode.NotebookEdit.updateCellMetadata(
          cell.index,
          newMetadata,
        );
        edits.push(edit);
        this.clientMapper.getNotebookClient(notebook.uri).then((client) => {
          // client.executePythonLocally(`${uniqueId} = 1`).catch((e) => {
          //   console.error(e);
          // });
        });
        this._onNotebookCellEvent.fire({
          cellId: newMetadata.cellId,
          notebook: notebook.uri.fsPath,
          event: "update",
          fragment: cell.document.uri.fragment,
          languageId: cell.document.languageId,
        });
      }
    });
    if (edits.length > 0) {
      const edit = new vscode.WorkspaceEdit();
      edit.set(notebook.uri, edits);
      await vscode.workspace.applyEdit(edit);
    }
  }

  private async onNotebookOpen(notebook: vscode.NotebookDocument) {
    await this.clientMapper.initializeNotebookClient(notebook.uri);
    const cells = notebook.getCells();
    this.updateCellId(cells, notebook);
  }

  dispose() {
    this.disposables.forEach((d) => d.dispose());
  }

  private async onDidChangeSelectedNotebooks(event: {
    notebook: vscode.NotebookDocument;
    selected: boolean;
  }) {
    console.log("onDidChangeSelectedNotebooks", event);
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
    const activeNotebook = vscode.window.activeNotebookEditor?.notebook;
    if (!activeNotebook) {
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
    execution.token.onCancellationRequested((_) => {
      execution.end(true, Date.now());
    });

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

      const outputCells = [];
      const notebookClient = await this.clientMapper.getNotebookClient(
        activeNotebook.uri,
      );
      switch (cell.document.languageId) {
        case "python":
          // const pythonApi: PythonExtension = await PythonExtension.api();
          // const server = createPythonServer([
          //   pythonApi.environments.getActiveEnvironmentPath().path,
          // ]);
          // result = (await server.execute(cell.document.getText()))?.output;
          const result = await notebookClient.executePython(
            cell.document.getText(),
            cell.metadata.cellId,
          );
          for (const item of result) {
            outputCells.push(
              vscode.NotebookCellOutputItem.text(item.value, item.mime),
            );
          }
          break;

        case "jinja-sql":
        case "sql":
          const sqlResult = await project.executeSQL(
            cell.document.getText(),

            "",
            true,
          );

          this._onNotebookCellEvent.fire({
            cellId: cell.metadata.cellId,
            notebook: activeNotebook.uri.fsPath,
            result: sqlResult,
            event: "add",
            languageId: cell.document.languageId,
          });
          await notebookClient.storeDataInKernel(
            cell.metadata.cellId,
            sqlResult,
          );
          outputCells.push(
            vscode.NotebookCellOutputItem.json(
              sqlResult,
              "application/perspective-json",
            ),
          );

        // Testing new cell creation
        // Will be used based on data after execution
        // const newCell = new vscode.NotebookCellData(
        //   vscode.NotebookCellKind.Code,
        //   "select * from ref",
        //   "jinja-sql",
        // );
        // const edit = new vscode.WorkspaceEdit();
        // edit.set(activeNotebook.uri, [
        //   new vscode.NotebookEdit(
        //     new vscode.NotebookRange(
        //       activeNotebook.cellCount,
        //       activeNotebook.cellCount,
        //     ),
        //     [newCell],
        //   ),
        // ]);

        // await vscode.workspace.applyEdit(edit);
        default:
          vscode.window.showErrorMessage("Language not supported");
          break;
      }

      // outputCells.unshift(
      //   vscode.NotebookCellOutputItem.json(
      //     "Cell id: " + cell.metadata.cellId,
      //     "text/plain",
      //   ),
      // );

      // execution.replaceOutput([
      //   new vscode.NotebookCellOutput([
      //     vscode.NotebookCellOutputItem.json(
      //       "Cell id: " + cell.metadata.cellId,
      //       "text/markdown",
      //     ),
      //   ]),
      // ]);
      execution.appendOutput(new vscode.NotebookCellOutput(outputCells));

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
