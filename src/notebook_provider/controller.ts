import * as vscode from "vscode";
import { provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { QueryManifestService } from "../services/queryManifestService";
import path = require("path");
import { ClientMapper } from "./clientMapper";
import { NotebookKernelClient } from "./python/notebookKernelClient";

// eslint-disable-next-line no-empty,@typescript-eslint/no-empty-function
export function noop() {}

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

type QueryWidgetStateCommand = {
  command: "query-widget-state";
  model_id: string;
};

const SupportedLanguages = ["python", "sql", "jinja-sql"];

@provideSingleton(NotebookKernel)
export class NotebookKernel implements vscode.Disposable {
  private readonly _id = "test-notebook-serializer-kernel";
  private readonly _label = "Altimate dbt kernel";

  private _onNotebookCellEvent = new vscode.EventEmitter<NotebookCellEvent>();
  public readonly onNotebookCellChangeEvent = this._onNotebookCellEvent.event;
  private readonly widgetOutputsPerNotebook = new WeakMap<
    vscode.NotebookDocument,
    Set<string>
  >();

  private readonly disposables: vscode.Disposable[] = [
    this._onNotebookCellEvent,
  ];

  private _executionOrder = 0;
  private readonly _controller: vscode.NotebookController;
  private messageChannel: vscode.NotebookRendererMessaging;
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

    // @ts-ignore
    this._controller.onDidReceiveMessage(
      async (event: {
        editor: vscode.NotebookEditor;
        message: { type: string } & Record<string, unknown>;
      }) => {
        const client = await this.clientMapper.getNotebookClient(
          event.editor.notebook.uri,
        );
        switch (event.message.type) {
          case "IPyWidgets_registerCommTarget":
            client.registerCommTarget(event.message.payload as string);
            break;
          case "IPyWidgets_Request_Widget_Version":
            return this.sendIPyWidgetsVersion();
          case "IPyWidgets_Ready":
            this.sendKernelOptions(client);
            this.sendBaseUrl();
            break;
          case "IPyWidgets_msg_received":
            client.onKernelSocketResponse(
              event.message.payload as { id: string },
            );
            break;
          default:
            break;
        }
      },
    );
    this.messageChannel = vscode.notebooks.createRendererMessaging(
      "my-notebook-renderer-1",
    );

    this.messageChannel.onDidReceiveMessage(({ editor, message }) => {
      if (
        message &&
        typeof message === "object" &&
        message.command === "query-widget-state"
      ) {
        return this.queryWidgetState(this.messageChannel, editor, message);
      }
      if (
        message &&
        typeof message === "object" &&
        message.command === "ipywidget-renderer-loaded"
      ) {
        return this.sendWidgetVersionAndState(this.messageChannel, editor);
      }

      console.log("messageChannel", message);
    });

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
    this.disposables.push(
      vscode.workspace.onDidCloseNotebookDocument(async (notebook) => {
        await this.onNotebookClose(notebook);
      }),
    );
    // this._controller.updateNotebookAffinity = async (
    //   notebook: vscode.NotebookDocument,
    //   affinity: vscode.NotebookControllerAffinity,
    // ) => {
    //   console.log("updateNotebookAffinity", notebook.uri.toString(), affinity);
    // };
  }

  private sendMessageToPreloadScript(message: unknown) {
    // @ts-ignore
    return this._controller.postMessage(message).then(noop, noop);
  }

  private async sendIPyWidgetsVersion() {
    this.sendMessageToPreloadScript({
      type: "IPyWidgets_Reply_Widget_Version",
      // TODO: get right version
      payload: 8,
    });
  }
  private queryWidgetState(
    comms: vscode.NotebookRendererMessaging,
    editor: vscode.NotebookEditor,
    message: QueryWidgetStateCommand,
  ) {
    // TODO fix this state properly
    const availableModels = this.widgetOutputsPerNotebook.get(editor.notebook);
    const kernelSelected = true; // !!this.controllers.getSelected(editor.notebook);
    const hasWidgetState = true; // !!availableModels?.has(message.model_id);
    comms
      .postMessage(
        {
          command: "query-widget-state",
          model_id: message.model_id,
          hasWidgetState,
          kernelSelected,
        },
        editor,
      )
      .then(noop, noop);
  }
  private sendWidgetVersionAndState(
    comms: vscode.NotebookRendererMessaging,
    editor: vscode.NotebookEditor,
  ) {
    // Support for loading Widget state from ipynb files.
    // Temporarily disabled. See https://github.com/microsoft/vscode-jupyter/issues/11117
    // const metadata = getNotebookMetadata(editor.notebook);
    // const widgetState = metadata?.widgets;

    // const kernel = this.kernelProvider.get(editor.notebook);
    // const state =
    //     widgetState && widgetState[WIDGET_STATE_MIMETYPE]
    //         ? widgetState && widgetState[WIDGET_STATE_MIMETYPE].state
    //         : undefined;
    // let versionInWidgetState: 7 | 8 | undefined = undefined;
    // if (state) {
    //     const findModuleWithVersion = Object.keys(state).find((key) =>
    //         ['@jupyter-widgets/base', '@jupyter-widgets/controls'].includes(state[key].model_module)
    //     );
    //     versionInWidgetState =
    //         findModuleWithVersion && state[findModuleWithVersion].model_module_version
    //             ? state[findModuleWithVersion].model_module_version.startsWith('2.')
    //                 ? 8
    //                 : 7
    //             : undefined;
    // }
    // TODO: copy from vscode-jupyter
    // const version = kernel?.ipywidgetsVersion; // || versionInWidgetState;
    const version = 8;
    // if (kernel?.ipywidgetsVersion) {
    //   console.log(
    //     `IPyWidget version in Kernel is ${kernel?.ipywidgetsVersion}.`,
    //   );
    // }
    // if (versionInWidgetState) {
    //     logger.trace(`IPyWidget version in Kernel is ${versionInWidgetState}.`);
    // }
    // if (kernel?.ipywidgetsVersion && versionInWidgetState) {
    //     logger.warn(
    //         `IPyWidget version in Kernel is ${kernel?.ipywidgetsVersion} and in widget state is ${versionInWidgetState}.}`
    //     );
    // }
    const kernelSelected = true;
    comms
      .postMessage(
        {
          command: "ipywidget-renderer-init",
          version,
          widgetState: undefined,
          kernelSelected,
        },
        editor,
      )
      .then(noop, noop);
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

  private async sendBaseUrl() {
    // @ts-ignore
    const baseUrl = this._controller.asWebviewUri(
      vscode.Uri.file(
        path.join(
          this.dbtProjectContainer.extensionUri.fsPath,
          "temp",
          "scripts",
          "jupyter",
        ),
      ),
    );
    // TODO: check type if needed
    this.sendMessageToPreloadScript({
      type: "IPyWidgets_BaseUrl_Response",
      message: "IPyWidgets_BaseUrl_Response",
      payload: baseUrl.toString(),
    });
  }

  private async sendKernelOptions(client?: NotebookKernelClient) {
    const kernel = await client?.getKernel();
    if (kernel?.realKernel) {
      this.sendMessageToPreloadScript({
        type: "IPyWidgets_kernelOptions",
        payload: {
          id: kernel.realKernel.id || "",
          clientId: kernel.realKernel.clientId || "",
          userName: kernel.realKernel.username || "",
          model: kernel.realKernel.model || { id: "", name: "" },
        },
      });
      return;
    }
  }

  private async onNotebookClose(notebook: vscode.NotebookDocument) {
    const client = await this.clientMapper.getNotebookClient(notebook.uri);
    if (client) {
      client.dispose();
    }
    this.widgetOutputsPerNotebook.delete(notebook);
  }

  private async onNotebookOpen(notebook: vscode.NotebookDocument) {
    const client = await this.clientMapper.initializeNotebookClient(
      notebook.uri,
    );
    if (!(await client.getKernel())?.realKernel) {
      throw new Error("Unable to initialize kernel");
    }
    this.disposables.push(
      client.postMessage((e) => {
        this.sendMessageToPreloadScript(e);
      }, this),
    );

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
          const kernel = await notebookClient.getKernel();
          if (kernel) {
            this.sendMessageToPreloadScript({
              type: "IPyWidgets_kernelOptions",
              payload: {
                id: kernel.realKernel.id || "",
                clientId: kernel.realKernel.clientId || "",
                userName: kernel.realKernel.username || "",
                model: kernel.realKernel.model || { id: "", name: "" },
              },
            });
          }
          // console.log("isSent", isSent);
          // const pythonApi: PythonExtension = await PythonExtension.api();
          // const server = createPythonServer([
          //   pythonApi.environments.getActiveEnvironmentPath().path,
          // ]);
          // result = (await server.execute(cell.document.getText()))?.output;

          // execution.appendOutput(cellOutputToVSCCellOutput({
          //   output_type: "stream",
          //   name: "stdout",
          //   text: "hi",
          // }));

          const output = await notebookClient.executePython(
            cell.document.getText(),
            cell,
            (output) => {
              execution.appendOutput(output);
            },
          );

          if (output) {
            execution.appendOutput(output);
          }
          // output.items.forEach((item) => {
          //   outputCells.push(
          //     vscode.NotebookCellOutputItem.stdout(
          //       item.data,
          //       // item.mime
          //     )
          //   );
          // })

          //   }
          // );
          // await Promise.resolve();
          // result?.done;
          // if (!result){
          //   throw new Error("No result found");
          // }
          // for (const item of result) {
          //   if (item.mime === "application/vnd.jupyter.widget-view+json") {
          //     const data = (item.value) as unknown as Record<string, unknown>;
          //     if (data.version_major === undefined) {
          //       this.sendMessageToPreloadScript({
          //         type: "IPyWidgets_msg",
          //         payload: {data},
          //       });
          //     }
          //   }
          // }
          // for (const item of result) {
          //   if (item.mime === "application/vnd.jupyter.widget-view+json") {
          //     const data = (item.value) as unknown as Record<string, unknown>;
          //     if (data.version_major !== undefined) {
          //       const set =
          //         this.widgetOutputsPerNotebook.get(activeNotebook) ||
          //         new Set<string>();
          //       set.add(item.value.model_id);
          //       this.widgetOutputsPerNotebook.set(activeNotebook, set);
          //     }
          //     outputCells.push(
          //       vscode.NotebookCellOutputItem.json(item.value, item.mime)
          //     );
          //   }
          // }
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
          execution.appendOutput(new vscode.NotebookCellOutput(outputCells));

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
      // execution.appendOutput(new vscode.NotebookCellOutput(outputCells));

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
