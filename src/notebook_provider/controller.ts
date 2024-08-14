import { extendErrorWithSupportLinks, provideSingleton } from "../utils";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { QueryManifestService } from "../services/queryManifestService";
import { ClientMapper } from "./clientMapper";
import { NotebookKernelClient } from "./python/notebookKernelClient";
import { TelemetryService } from "../telemetry";
import { TelemetryEvents } from "../telemetry/events";
import {
  commands,
  EventEmitter,
  NotebookCell,
  NotebookCellKind,
  NotebookCellOutput,
  NotebookCellOutputItem,
  NotebookController,
  NotebookDocument,
  NotebookEdit,
  NotebookEditor,
  notebooks,
  Uri,
  workspace,
  WorkspaceEdit,
  Disposable,
  window,
} from "vscode";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { noop } from "./python/constants";
import { RendererMessageHandler } from "./python/rendererMessageHandler";
import { SemVer } from "semver";
import { NotebookCellEvent, RawNotebookCell } from "./types";
import { SupportedLanguages } from "./constants";

@provideSingleton(NotebookKernel)
export class NotebookKernel implements Disposable {
  private readonly _id = "test-notebook-serializer-kernel";
  private readonly _label = "Altimate dbt kernel";

  private _onNotebookCellEvent = new EventEmitter<NotebookCellEvent>();
  public readonly onNotebookCellChangeEvent = this._onNotebookCellEvent.event;

  private readonly disposables: Disposable[] = [this._onNotebookCellEvent];

  private _executionOrder = 0;
  private readonly _controller: NotebookController;
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private clientMapper: ClientMapper,
    private queryManifestService: QueryManifestService,
    private telemetry: TelemetryService,
    private dbtTerminal: DBTTerminal,
    private rendererMessageHandler: RendererMessageHandler,
  ) {
    this._controller = notebooks.createNotebookController(
      this._id,
      "datapilot-notebook",
      this._label,
    );

    // TODO: move this right place
    // Intercept save commands
    // commands.registerCommand(
    //   "workbench.action.files.save",
    //   (uri: Uri) => this.customSave(uri),
    // );
    // commands.registerCommand(
    //   "workbench.action.files.saveAs",
    //   this.customSaveAs,
    // );

    this._controller.supportedLanguages = SupportedLanguages;
    this._controller.supportsExecutionOrder = true;
    this._controller.executeHandler = this._executeAll.bind(this);

    this._controller.onDidReceiveMessage(
      async (event: {
        editor: NotebookEditor;
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
            return this.sendIPyWidgetsVersion(client);
          case "IPyWidgets_Ready":
            this.sendKernelOptions(client);
            break;
          case "IPyWidgets_msg_received":
            client.onKernelSocketResponse(
              event.message.payload as { id: string },
            );
            break;
          case "IPyWidgets_RegisterMessageHook":
            this.registerMessageHook(event.message.payload);
            break;
          default:
            break;
        }
      },
    );

    this.disposables.push(
      workspace.onDidChangeNotebookDocument((event) => {
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
      workspace.onDidOpenNotebookDocument(async (notebook) => {
        await this.onNotebookOpen(notebook);
      }),
    );
    this.disposables.push(
      workspace.onDidCloseNotebookDocument(async (notebook) => {
        await this.onNotebookClose(notebook);
      }),
    );
  }

  private registerMessageHook(payload: any) {
    this.dbtTerminal.log("Notebook registerMessageHook", payload);
  }

  private sendMessageToPreloadScript(message: unknown) {
    return this._controller.postMessage(message).then(noop, noop);
  }

  private async sendIPyWidgetsVersion(client: NotebookKernelClient) {
    const dependencyVersions = client.jupyterPackagesVersions;

    // Setting a default version of 8 if the version is not found
    // to handle onload issue
    const version = dependencyVersions
      ? new SemVer(dependencyVersions.ipywidgets).major
      : 8;

    this.sendMessageToPreloadScript({
      type: "IPyWidgets_Reply_Widget_Version",
      payload: version,
    });
  }

  private genUniqueId(cell: NotebookCell) {
    const randomStr = (Math.random() + 1).toString(36).substring(7);
    return `${cell.document.languageId.replace(/-/g, "_")}_${randomStr}`;
  }

  // add id to notebook cells if not available, so that cell value could be used in other cells
  private async updateCellId(
    cells: NotebookCell[],
    notebook: NotebookDocument,
  ) {
    const edits: NotebookEdit[] = [];
    cells.forEach((cell) => {
      if (!cell.metadata.cellId) {
        const uniqueId = this.genUniqueId(cell);
        const newMetadata = {
          ...cell.metadata,
          cellId: uniqueId,
        };
        const edit = NotebookEdit.updateCellMetadata(cell.index, newMetadata);
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
      const edit = new WorkspaceEdit();
      edit.set(notebook.uri, edits);
      await workspace.applyEdit(edit);
    }
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

  private async onNotebookClose(notebook: NotebookDocument) {
    const client = await this.clientMapper.getNotebookClient(notebook.uri);
    if (client) {
      client.dispose();
    }

    this.rendererMessageHandler.onNotebookClosed(notebook);
  }

  private async onNotebookOpen(notebook: NotebookDocument) {
    const client = await this.clientMapper.initializeNotebookClient(
      notebook.uri,
    );
    const kernel = await client.getKernel();
    if (!kernel?.realKernel) {
      throw new Error("Unable to initialize kernel");
    }

    this.rendererMessageHandler.hookupKernel(kernel.realKernel, notebook);

    // register for messages from the python kernel socket and send them to the renderer
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

  private async customSave(uri: Uri) {
    try {
      const notebook = window.activeNotebookEditor?.notebook;
      // Check if the file is a "notebook" file
      if (notebook?.uri.fsPath.endsWith(".notebook")) {
        console.log("custom save", notebook);
        window.showInputBox({ prompt: "Your bookmark name?" }).then((name) => {
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
      console.log(e);
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

  private _executeAll(
    cells: NotebookCell[],
    _notebook: NotebookDocument,
    _controller: NotebookController,
  ): void {
    const activeNotebook = window.activeNotebookEditor?.notebook;
    if (!activeNotebook) {
      this.telemetry.sendTelemetryError(
        `${TelemetryEvents["Notebook/Execute"]}Error`,
        new Error("No active notebook found"),
      );
      window.showErrorMessage(
        extendErrorWithSupportLinks("No active notebook found"),
      );
      return;
    }

    for (const cell of cells) {
      this._doExecution(cell, activeNotebook);
    }
  }

  private async _doExecution(
    cell: NotebookCell,
    activeNotebook: NotebookDocument,
  ): Promise<void> {
    const execution = this._controller.createNotebookCellExecution(cell);
    execution.executionOrder = ++this._executionOrder;
    execution.start(Date.now());
    execution.token.onCancellationRequested((_) => {
      execution.end(true, Date.now());
    });

    try {
      // clear the existing output
      void execution.clearOutput();
      const outputCells = [];
      const notebookClient = await this.clientMapper.getNotebookClient(
        activeNotebook.uri,
      );
      switch (cell.document.languageId) {
        case "python":
          this.telemetry.startTelemetryEvent(
            TelemetryEvents["Notebook/Execute"],
            {
              language: cell.document.languageId,
            },
          );
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
          break;

        case "jinja-sql":
        case "sql":
          const project =
            await this.queryManifestService.getOrPickProjectFromWorkspace();
          if (!project) {
            window.showErrorMessage("No dbt project selected.");
            return;
          }
          this.telemetry.startTelemetryEvent(
            TelemetryEvents["Notebook/Execute"],
            {
              language: cell.document.languageId,
            },
          );
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
          // TODO: fix this - not working to auto suggest cell id
          await notebookClient.storeDataInKernel(
            cell.metadata.cellId,
            sqlResult,
          );
          outputCells.push(
            NotebookCellOutputItem.json(
              sqlResult,
              // using custom mime type to render the perspective viewer
              "application/perspective-json",
            ),
          );
          execution.appendOutput(new NotebookCellOutput(outputCells));
          break;

        default:
          window.showErrorMessage(
            `Language: ${cell.document.languageId} not supported`,
          );
          break;
      }

      this.telemetry.endTelemetryEvent(TelemetryEvents["Notebook/Execute"], {
        language: cell.document.languageId,
      });
      execution.end(true, Date.now());
    } catch (err) {
      execution.replaceOutput([
        new NotebookCellOutput([NotebookCellOutputItem.error(err as Error)]),
      ]);
      this.telemetry.endTelemetryEvent(
        TelemetryEvents["Notebook/Execute"],
        err,
        {
          language: cell.document.languageId,
        },
      );
      execution.end(false, Date.now());
    }
  }
}
