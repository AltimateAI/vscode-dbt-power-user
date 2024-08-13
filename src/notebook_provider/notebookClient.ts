import type * as KernelMessage from "@jupyterlab/services/lib/kernel/messages";
import type * as nbformat from "@jupyterlab/nbformat";
import type { Data as WebSocketData } from "ws";
import { promisify } from "util";
import { PythonBridge, PythonException } from "python-bridge";
import { DBTCommandExecutionInfrastructure } from "../dbt_client/dbtIntegration";
import path = require("path");
import {
  Event,
  EventEmitter,
  NotebookCell,
  NotebookCellOutput,
  NotebookCellOutputItem,
  ProgressLocation,
  window,
  Disposable,
} from "vscode";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { getFirstWorkspacePath } from "../utils";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { newRawKernel } from "./kernelClient";
import { randomUUID } from "crypto";
import {
  cellOutputMappers,
  CellOutputMimeTypes,
  cellOutputToVSCCellOutput,
  concatMultilineString,
  formatStreamText,
  getParentHeaderMsgId,
  handleTensorBoardDisplayDataOutput,
  shouldMessageBeMirroredWithRenderer,
} from "./helpers";
import { readFileSync } from "fs";
import { Identifiers, WIDGET_MIMETYPE } from "./constants";
import { noop } from "./controller";
import { serializeDataViews } from "./serializers";
import { createDeferred } from "./async";

type ExecuteResult = nbformat.IExecuteResult & {
  transient?: { display_id?: string };
};
type DisplayData = nbformat.IDisplayData & {
  transient?: { display_id?: string };
};
type WidgetData = {
  version_major: number;
  version_minor: number;
  model_id: string;
};

interface ConnectionSettings {
  control_port: number;
  hb_port: number;
  iopub_port: number;
  ip: string;
  key: string;
  kernel_name: string;
  shell_port: number;
  signature_scheme: string;
  stdin_port: number;
  transport: string;
}

export interface IPyWidgetMessage {
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}
export class NotebookClient implements Disposable {
  private disposables: Disposable[] = [];
  private lastUsedStreamOutput?: {
    stream: "stdout" | "stderr";
    output: NotebookCellOutput;
  };
  private static modelIdsOwnedByCells = new WeakMap<
    NotebookCell,
    Set<string>
  >();
  public get postMessage(): Event<IPyWidgetMessage> {
    return this._postMessageEmitter.event;
  }

  private _postMessageEmitter = new EventEmitter<IPyWidgetMessage>();
  private python: PythonBridge;
  private kernel: ReturnType<typeof newRawKernel> | undefined;
  private isInitializing = true;
  private readonly ownedCommIds = new Set<string>();
  private readonly commIdsMappedToWidgetOutputModels = new Set<string>();
  private cellHasErrorsInOutput?: boolean;
  private readonly ownedRequestMsgIds = new Set<string>();
  private commIdsMappedToParentWidgetModel = new Map<string, string>();
  private streamsReAttachedToExecutingCell = false;
  private isUsingIPyWidgets = false;
  private outputWidgetIds = new Set<string>();
  private registerdCommTargets = new Set<string>();
  private readonly deserialize: (
    data: string | ArrayBuffer,
  ) => KernelMessage.IMessage<KernelMessage.MessageType>;
  private outputsAreSpecificToAWidget: {
    /**
     * Comm Id (or model_id) of widget that will handle all messages and render them via the widget manager.
     * This could be a widget in another cell.
     */
    handlingCommId: string;
    /**
     * All messages that have a parent_header.msg_id = msg_id will be swallowed and handled by the widget with model_id = this.handlingCommId.
     * These requests could be from another cell, ie messages can original from one cell and end up getting displayed in another.
     * E.g. widget is in cell 1 and output will be redirected from cell 2 into widget 1.
     */
    msgIdsToSwallow: string;
    /**
     * If true, then we should clear all of the output owned by the widget defined by the commId.
     * By owned, we mean the output added after the Output Widget and not the widget itself.
     */
    clearOutputOnNextUpdateToOutput?: boolean;
  }[] = [];

  constructor(
    notebookPath: string,
    private executionInfrastructure: DBTCommandExecutionInfrastructure,
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private pythonEnvironment: PythonEnvironment,
  ) {
    const jupyterLabSerialize =
      require("@jupyterlab/services/lib/kernel/serialize") as typeof import("@jupyterlab/services/lib/kernel/serialize"); // NOSONAR
    this.deserialize = jupyterLabSerialize.deserialize;

    this.python = this.executionInfrastructure.createPythonBridge(
      path.dirname(notebookPath),
    );
    this.initializeNotebookKernel(notebookPath);
  }

  async dispose() {
    this.disposables.forEach((d) => d.dispose());
    try {
      await this.python.ex`
        notebook_kernel.close_notebook()
        `;
    } catch (error) {
      console.error(error);
      // TODO: add telemetry
    }
  }

  public async getKernel(): Promise<
    ReturnType<typeof newRawKernel> | undefined
  > {
    return new Promise((resolve) => {
      const timer = setInterval(() => {
        if (!this.isInitializing) {
          resolve(this.kernel);
          clearInterval(timer);
        }
      }, 500);
    });
  }

  private async initializeNotebookKernel(notebookPath: string) {
    try {
      await this.python.ex`
        from altimate_notebook_kernel import initialize_kernel
        notebook_kernel = AltimateNotebookKernel(${notebookPath})
        `;

      const connectionFile = await this.python.lock<string>(
        (python) => python`notebook_kernel.get_connection_file()`,
      );
      const connectionSettings = JSON.parse(
        readFileSync(connectionFile, { encoding: "utf-8" }),
      ) as ConnectionSettings;
      const pid = await this.python.lock<{ mime: string; value: string }[]>(
        (python) => python`notebook_kernel.get_session_id()`,
      );
      const kernelProcess = {
        connection: connectionSettings,
        pid,
      };
      const result = newRawKernel(kernelProcess, randomUUID(), randomUUID(), {
        name: connectionSettings.kernel_name,
        id: randomUUID(),
      });
      this.kernel = result;
      console.log("newRawKernel", result);
      const newSocket = result.socket;
      newSocket?.addReceiveHook(this.onKernelSocketMessage.bind(this)); // NOSONAR
      newSocket?.addSendHook(this.mirrorSend.bind(this)); // NOSONAR
    } catch (exc) {
      // TODO: handle error
      console.error(exc);
      if (exc instanceof PythonException) {
        // python errors can be about anything, so we just associate the error with the project file
        //  with a fixed range
        if (exc.message.includes("No module named 'jupyter_client'")) {
          const selected = await window.showInformationMessage(
            "You need [ipykernel](https://pypi.org/project/ipykernel/) and [jupyter_client](https://github.com/jupyter/jupyter_client) to use the notebook",
            "Install",
            "Cancel",
          );
          if (selected === "Install") {
            await window.withProgress(
              {
                title: `Installing jupyter_client...`,
                location: ProgressLocation.Notification,
                cancellable: false,
              },
              async () => {
                try {
                  const args = [
                    "-m",
                    "pip",
                    "install",
                    "ipykernel",
                    "jupyter_client",
                    "jupyter_contrib_nbextensions",
                  ];
                  console.log(this.pythonEnvironment.pythonPath, args);
                  const { stdout, stderr } =
                    await this.commandProcessExecutionFactory
                      .createCommandProcessExecution({
                        command: this.pythonEnvironment.pythonPath,
                        args,
                        cwd: getFirstWorkspacePath(),
                        envVars: this.pythonEnvironment.environmentVariables,
                      })
                      .completeWithTerminalOutput();
                  if (
                    !stdout.includes("Successfully installed") &&
                    !stdout.includes("Requirement already satisfied") &&
                    stderr
                  ) {
                    throw new Error(stderr);
                  }
                  await this.initializeNotebookKernel(notebookPath);
                } catch (err) {
                  window.showErrorMessage((err as Error).message);
                }
              },
            );
          }
          this.isInitializing = false;
          return;
        }
      }
      window.showErrorMessage((exc as Error).message);
    }

    this.isInitializing = false;
  }

  private async mirrorSend(
    data: any,
    _cb?: (err?: Error) => void,
  ): Promise<void> {
    // If this is shell control message, mirror to the other side. This is how
    // we get the kernel in the UI to have the same set of futures we have on this side
    if (
      typeof data === "string" &&
      data.includes("shell") &&
      data.includes("execute_request")
    ) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const msg = this.deserialize(data) as KernelMessage.IExecuteRequestMsg;
      if (
        msg.channel === "shell" &&
        msg.header.msg_type === "execute_request"
      ) {
        if (!shouldMessageBeMirroredWithRenderer(msg)) {
          return;
        }
        const promise = this.mirrorExecuteRequest(
          msg as KernelMessage.IExecuteRequestMsg,
        ); // NOSONAR
        // If there are no ipywidgets thusfar in the notebook, then no need to synchronize messages.
        if (this.isUsingIPyWidgets) {
          await promise;
        }
      }
    }
  }

  private raisePostMessage(message: string, payload: unknown) {
    // TODO validate type
    // @ts-ignore
    this._postMessageEmitter.fire({ message, payload, type: message });
  }

  private mirrorExecuteRequest(msg: KernelMessage.IExecuteRequestMsg) {
    const promise = createDeferred<void>();
    // this.waitingMessageIds.set(msg.header.msg_id, { startTime: Date.now(), resultPromise: promise });
    this.raisePostMessage("IPyWidgets_mirror_execute", {
      id: msg.header.msg_id,
      msg,
    });
    return promise.promise;
  }

  private async onKernelSocketMessage(data: WebSocketData): Promise<void> {
    // Hooks expect serialized data as this normally comes from a WebSocket

    const msgUuid = randomUUID();
    // const promise = createDeferred<void>();
    // this.waitingMessageIds.set(msgUuid, {
    //   startTime: Date.now(),
    //   resultPromise: promise,
    // });

    if (typeof data === "string") {
      if (shouldMessageBeMirroredWithRenderer(data)) {
        this.raisePostMessage("IPyWidgets_msg", {
          id: msgUuid,
          data,
        });
      }
    } else {
      this.raisePostMessage("IPyWidgets_binary_msg", {
        id: msgUuid,
        data: serializeDataViews([data as any]),
      });
    }

    // Lets deserialize only if we know we have a potential case
    // where this message contains some data we're interested in.
    const mustDeserialize =
      typeof data !== "string" ||
      data.includes(WIDGET_MIMETYPE) ||
      data.includes(Identifiers.DefaultCommTarget) ||
      data.includes("comm_open") ||
      data.includes("comm_close") ||
      data.includes("comm_msg");
    if (mustDeserialize) {
      const message = this.deserialize(data as any) as any;
      if (!shouldMessageBeMirroredWithRenderer(message)) {
        return;
      }

      // Check for hints that would indicate whether ipywidgest are used in outputs.
      if (
        message &&
        message.content &&
        message.content.data &&
        (message.content.data[WIDGET_MIMETYPE] ||
          message.content.target_name === Identifiers.DefaultCommTarget)
      ) {
        this.isUsingIPyWidgets = true;
      }

      const isIPYWidgetOutputModelOpen =
        message.header?.msg_type === "comm_open" &&
        message.content?.data?.state?._model_module ===
          "@jupyter-widgets/output" &&
        message.content?.data?.state?._model_name === "OutputModel";
      const isIPYWidgetOutputModelClose =
        message.header?.msg_type === "comm_close" &&
        this.outputWidgetIds.has(message.content?.comm_id);

      if (isIPYWidgetOutputModelOpen) {
        this.outputWidgetIds.add(message.content.comm_id);
      } else if (isIPYWidgetOutputModelClose) {
        this.outputWidgetIds.delete(message.content.comm_id);
      }
      // TODO check if this is needed
      // else if (this.messageNeedsFullHandle(message)) {
      //   this.fullHandleMessage = {
      //     id: message.header.msg_id,
      //     promise: createDeferred<void>(),
      //   };
      //   await promise.promise;
      //   await this.fullHandleMessage.promise.promise;
      //   this.fullHandleMessage = undefined;
      // }
    }
  }

  async storeDataInKernel(cellId: string, data: any) {
    console.log(`storeDataInKernel: ${cellId}`, data);
    return this.python.lock<{ mime: string; value: string }[]>(
      (python) => python`notebook_kernel.store_sql_result(${cellId}, ${data})`,
    );
  }

  async registerCommTarget(payload: string) {
    // TODO: register one payload only once
    if (this.registerdCommTargets.has(payload)) {
      console.log(`registerCommTarget already registered: ${payload}`);
      return;
    }
    this.registerdCommTargets.add(payload);
    console.log(`registerCommTarget registering: ${payload}`);
    const kernel = await this.getKernel();
    if (!kernel) {
      this.registerdCommTargets.delete(payload);
      throw new Error("Kernel not found for registering comm target");
    }
    return kernel.realKernel.registerCommTarget(
      payload as string,
      (comm, msg) => {
        console.log(`registerCommTarget registered: ${payload}`, comm, msg);
      },
    );
  }

  // TODO: typecast the return value
  async executePython(
    code: string,
    cell: NotebookCell,
    onOutput: (output: NotebookCellOutput) => void,
  ): Promise<NotebookCellOutput[] | undefined> {
    return new Promise(async (resolve, reject) => {
      const cellPath = cell.metadata.cellId;
      console.log(`Executing python code in cell: ${cellPath}`);
      const jupyterLab =
        require("@jupyterlab/services") as typeof import("@jupyterlab/services");
      console.log("kernel status", this.kernel?.realKernel.status);

      const request = await this.kernel?.realKernel.requestExecute(
        {
          code,
          silent: false,
          stop_on_error: false,
          allow_stdin: true,
          store_history: true,
        },
        false,
        { cellId: cell.document.uri.toString() },
      );
      if (!request) {
        resolve(undefined);
        return;
      }

      request.onReply = (msg) => {
        // Cell has been deleted or the like.
        if (cell.document.isClosed) {
          request.dispose();
          return;
        }

        // Refer https://github.com/microsoft/vscode-jupyter/blob/main/src/kernels/execution/cellExecutionMessageHandler.ts#L874 if needed
        const reply = msg.content as KernelMessage.IExecuteReply;

        if (reply.payload) {
          reply.payload.forEach((payload) => {
            if (payload.data && payload.data.hasOwnProperty("text/plain")) {
              onOutput(
                this.addToCellData(
                  {
                    // Mark as stream output so the text is formatted because it likely has ansi codes in it.
                    output_type: "stream",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    text: (payload.data as any)["text/plain"].toString(),
                    name: "stdout",
                    metadata: {},
                    execution_count: reply.execution_count,
                  },
                  msg,
                  cell,
                ),
              );
            }
          });
        }
      };

      const outputs: (NotebookCellOutput | undefined)[] = [];
      request.done.finally(() => {
        console.log("finally");
        request.dispose();
        resolve(outputs.filter((o): o is NotebookCellOutput => !!o));
      });
      request.onStdin = (msg) => {
        console.log("onStdin", msg);
      };
      request.onIOPub = (msg) => {
        if (jupyterLab.KernelMessage.isCommOpenMsg(msg)) {
          this.handleCommOpen(msg);
        } else if (jupyterLab.KernelMessage.isExecuteResultMsg(msg)) {
          outputs.push(
            this.handleExecuteResult(
              msg as KernelMessage.IExecuteResultMsg,
              cell,
            ),
          );
        } else if (jupyterLab.KernelMessage.isExecuteInputMsg(msg)) {
          this.handleExecuteInput(msg as KernelMessage.IExecuteInputMsg);
        } else if (jupyterLab.KernelMessage.isStatusMsg(msg)) {
          // Status is handled by the result promise. While it is running we are active. Otherwise we're stopped.
          // So ignore status messages.
          const statusMsg = msg as KernelMessage.IStatusMsg;
          this.handleStatusMessage(statusMsg);
        } else if (jupyterLab.KernelMessage.isStreamMsg(msg)) {
          outputs.concat(
            this.handleStreamMessage(msg as KernelMessage.IStreamMsg, cell),
          );
        } else if (jupyterLab.KernelMessage.isDisplayDataMsg(msg)) {
          outputs.push(
            this.handleDisplayData(msg as KernelMessage.IDisplayDataMsg, cell),
          );
        } else if (jupyterLab.KernelMessage.isUpdateDisplayDataMsg(msg)) {
          // TODO: check this
          this.handleUpdateDisplayDataMessage(msg);
        } else if (jupyterLab.KernelMessage.isClearOutputMsg(msg)) {
          this.handleClearOutput(msg as KernelMessage.IClearOutputMsg);
        } else if (jupyterLab.KernelMessage.isErrorMsg(msg)) {
          outputs.push(this.handleError(msg as KernelMessage.IErrorMsg, cell));
        } else if (jupyterLab.KernelMessage.isCommOpenMsg(msg)) {
          // Noop.
        } else if (jupyterLab.KernelMessage.isCommMsgMsg(msg)) {
          this.handleCommMsg(msg);
        } else if (jupyterLab.KernelMessage.isCommCloseMsg(msg)) {
          // Noop.
        } else {
          console.warn(
            `Unknown message ${msg.header.msg_type} : hasData=${"data" in msg.content}`,
          );
        }
      };
      return request;
    });
  }

  private handleUpdateDisplayDataMessage(
    msg: KernelMessage.IUpdateDisplayDataMsg,
  ) {
    console.log("handleUpdateDisplayDataMessage", msg);
    // const displayId = msg.content.transient.display_id;
    // if (!displayId) {
    //     logger.warn('Update display data message received, but no display id', msg.content);
    //     return;
    // }
    // const outputToBeUpdated = CellOutputDisplayIdTracker.getMappedOutput(this.cell.notebook, displayId);
    // if (!outputToBeUpdated) {
    //     // Possible this is a display Id that was created by code executed by an extension.
    //     logger.trace('Update display data message received, but no output found to update', msg.content);
    //     return;
    // }
    // if (outputToBeUpdated.cell.document.isClosed) {
    //     logger.warn('Update display data message received, but output cell is closed', msg.content);
    //     return;
    // }
    // const output = translateCellDisplayOutput(
    //     new NotebookCellOutput(outputToBeUpdated.outputItems, outputToBeUpdated.outputContainer.metadata)
    // );
    // const newOutput = cellOutputToVSCCellOutput({
    //     ...output,
    //     data: msg.content.data,
    //     metadata: msg.content.metadata
    // } as nbformat.IDisplayData);
    // // If there was no output and still no output, then nothing to do.
    // if (outputToBeUpdated.outputItems.length === 0 && newOutput.items.length === 0) {
    //     logger.trace('Update display data message received, but no output to update', msg.content);
    //     return;
    // }
    // // Compare each output item (at the end of the day everything is serializable).
    // // Hence this is a safe comparison.
    // let outputMetadataHasChanged = false;
    // if (outputToBeUpdated.outputItems.length === newOutput.items.length) {
    //     let allAllOutputItemsSame = true;
    //     if (!fastDeepEqual(outputToBeUpdated.outputContainer.metadata || {}, newOutput.metadata || {})) {
    //         outputMetadataHasChanged = true;
    //         allAllOutputItemsSame = false;
    //     }
    //     if (allAllOutputItemsSame) {
    //         for (let index = 0; index < outputToBeUpdated.outputItems.length; index++) {
    //             if (!fastDeepEqual(outputToBeUpdated.outputItems[index], newOutput.items[index])) {
    //                 allAllOutputItemsSame = false;
    //                 break;
    //             }
    //         }
    //     }
    //     if (allAllOutputItemsSame) {
    //         // If everything is still the same, then there's nothing to update.
    //         logger.trace(
    //             'Update display data message received, but no output to update (data is the same)',
    //             msg.content
    //         );
    //         return;
    //     }
    // }
    // // Possible execution of cell has completed (the task would have been disposed).
    // // This message could have come from a background thread.
    // // In such circumstances, create a temporary task & use that to update the output (only cell execution tasks can update cell output).
    // const task = this.execution || this.createTemporaryTask();
    // traceCellMessage(this.cell, `Replace output items in display data ${newOutput.items.length}`);
    // if (outputMetadataHasChanged) {
    //     // https://github.com/microsoft/vscode/issues/181369
    //     // This operation is very unsafe as we replace all of the outputs, when we need to replace just one output.
    //     // Unsafe because its possible some new outputs were added to this cell (appended).
    //     // However this is the only way we can update the output along with its metadata.
    //     const newOutputs = outputToBeUpdated.cell.outputs.map((o) => {
    //         const jupyterOutput = translateCellDisplayOutput(o);
    //         // Replace just the item that stores the display data.
    //         if (
    //             jupyterOutput.output_type === 'display_data' &&
    //             'transient' in jupyterOutput &&
    //             jupyterOutput.transient &&
    //             typeof jupyterOutput.transient === 'object' &&
    //             'display_id' in jupyterOutput.transient &&
    //             typeof jupyterOutput.transient.display_id === 'string' &&
    //             jupyterOutput.transient.display_id === displayId
    //         ) {
    //             return newOutput;
    //         }
    //         return o;
    //     });
    //     task?.replaceOutput(newOutputs, outputToBeUpdated.cell).then(noop, noop);
    //     CellOutputDisplayIdTracker.trackOutputByDisplayId(
    //         outputToBeUpdated.cell,
    //         displayId,
    //         newOutput,
    //         newOutput.items
    //     );
    // } else {
    //     task?.replaceOutputItems(newOutput.items, outputToBeUpdated.outputContainer).then(noop, noop);
    //     CellOutputDisplayIdTracker.trackOutputByDisplayId(
    //         outputToBeUpdated.cell,
    //         // Though the items have been replaced, the output container is still the same, hence keep track of the last output object.
    //         displayId,
    //         outputToBeUpdated.outputContainer,
    //         newOutput.items
    //     );
    // }
    // this.endTemporaryTask();
  }
  private handleCommOpen(msg: KernelMessage.ICommOpenMsg) {
    this.ownedCommIds.add(msg.content.comm_id);
    // Check if this is a message for an Output Widget,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state: { _model_module: string } | undefined =
      (msg.content.data?.state as any) || undefined;
    if (
      msg.content.target_name === Identifiers.DefaultCommTarget &&
      state &&
      state._model_module === "@jupyter-widgets/output"
    ) {
      this.commIdsMappedToWidgetOutputModels.add(msg.content.comm_id);
    }
  }
  private handleCommMsg(msg: KernelMessage.ICommMsgMsg) {
    const data = msg.content.data as Partial<{
      method: "update";
      state: { msg_id: string } | { children: string[] };
    }>;
    if (!data || data.method !== "update" || typeof data.state !== "object") {
      return;
    }

    if ("msg_id" in data.state && typeof data.state.msg_id === "string") {
      // When such a comm message is received, then
      // the kernel is instructing the front end (UI widget manager)
      // to handle all of the messages that would have other wise been handled as regular execution messages for msg_id.
      const parentHeader =
        "msg_id" in msg.parent_header ? msg.parent_header : undefined;
      if (
        this.ownedRequestMsgIds.has(msg.content.comm_id) ||
        (parentHeader && this.ownedRequestMsgIds.has(parentHeader.msg_id))
      ) {
        if (data.state.msg_id) {
          // Any future messages sent from `parent_header.msg_id = msg_id` must be handled by the widget with the `mode_id = msg.content.comm_id`.
          this.outputsAreSpecificToAWidget.push({
            handlingCommId: msg.content.comm_id,
            msgIdsToSwallow: data.state.msg_id,
          });
        } else if (
          this.outputsAreSpecificToAWidget.length &&
          this.outputsAreSpecificToAWidget[
            this.outputsAreSpecificToAWidget.length - 1
          ].handlingCommId === msg.content.comm_id
        ) {
          // Handle all messages the normal way.
          this.outputsAreSpecificToAWidget.pop();
        }
      }
    } else if (
      "children" in data.state &&
      Array.isArray(data.state.children) &&
      this.ownedCommIds.has(msg.content.comm_id)
    ) {
      // This is the kernel instructing the widget manager that some outputs (comm_ids)
      // are in fact children of another output (comm).
      // We need to keep track of this so that we know who the common parent is.
      const IPY_MODEL_PREFIX = "IPY_MODEL_";
      data.state.children.forEach((item) => {
        if (typeof item !== "string") {
          return console.warn(
            `Came across a comm update message a child that isn't a string`,
            item,
          );
        }
        if (!item.startsWith(IPY_MODEL_PREFIX)) {
          return console.warn(
            `Came across a comm update message a child that start start with ${IPY_MODEL_PREFIX}`,
            item,
          );
        }
        const commId = item.substring(IPY_MODEL_PREFIX.length);
        this.ownedCommIds.add(commId);
        this.commIdsMappedToParentWidgetModel.set(commId, msg.content.comm_id);
      });
    }
  }
  private handleExecuteResult(
    msg: KernelMessage.IExecuteResultMsg,
    cellPath: NotebookCell,
  ) {
    return this.addToCellData(
      {
        output_type: "execute_result",
        data: msg.content.data,
        metadata: msg.content.metadata,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transient: msg.content.transient as any, // NOSONAR
        execution_count: msg.content.execution_count,
      },
      msg,
      cellPath,
    );
  }

  private addToCellData(
    output:
      | ExecuteResult
      | DisplayData
      | nbformat.IStream
      | nbformat.IError
      | nbformat.IOutput,
    originalMessage: KernelMessage.IMessage,
    cellPath: NotebookCell,
  ) {
    if (
      output.data &&
      typeof output.data === "object" &&
      WIDGET_MIMETYPE in output.data
    ) {
      const widgetData = output.data[WIDGET_MIMETYPE] as WidgetData;
      if (widgetData && "model_id" in widgetData) {
        const modelIds =
          NotebookClient.modelIdsOwnedByCells.get(cellPath) ||
          new Set<string>();
        modelIds.add(widgetData.model_id);
        NotebookClient.modelIdsOwnedByCells.set(cellPath, modelIds);
      }
    }
    const cellOutput = cellOutputToVSCCellOutput(output);
    const displayId =
      "transient" in output &&
      typeof output.transient === "object" &&
      output.transient &&
      "display_id" in output.transient &&
      typeof output.transient?.display_id === "string"
        ? output.transient?.display_id
        : undefined;
    // if (this.cell.document.isClosed) {
    //     return;
    // }
    console.log(
      cellPath,
      () =>
        `Update output with mimes ${cellOutput.items.map((item) => item.mime).toString()}`,
    );
    // Append to the data (we would push here but VS code requires a recreation of the array)
    // Possible execution of cell has completed (the task would have been disposed).
    // This message could have come from a background thread.
    // In such circumstances, create a temporary task & use that to update the output (only cell execution tasks can update cell output).
    // const task = this.execution || this.createTemporaryTask();
    // Clear if necessary
    // this.clearOutputIfNecessary(task);
    // Keep track of the display_id against the output item, we might need this to update this later.
    // if (displayId) {
    //     CellOutputDisplayIdTracker.trackOutputByDisplayId(this.cell, displayId, cellOutput, cellOutput.items);
    // }

    // this.clearLastUsedStreamOutput();
    // console.log(this.cell, 'Append output in addToCellData');
    // If the output belongs to a widget, then add the output to that specific widget (i.e. just below the widget).
    let outputShouldBeAppended = true;
    const parentHeaderMsgId = getParentHeaderMsgId(originalMessage);
    if (
      this.outputsAreSpecificToAWidget.length &&
      this.outputsAreSpecificToAWidget[
        this.outputsAreSpecificToAWidget.length - 1
      ].msgIdsToSwallow === parentHeaderMsgId &&
      cellOutput.items.every((item) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.canMimeTypeBeRenderedByWidgetManager(item),
      )
    ) {
      // Plain text outputs will be displayed by the widget.
      outputShouldBeAppended = false;
    } else if (
      this.outputsAreSpecificToAWidget.length &&
      this.outputsAreSpecificToAWidget[
        this.outputsAreSpecificToAWidget.length - 1
      ].msgIdsToSwallow === parentHeaderMsgId
    ) {
      // const result = this.updateJupyterOutputWidgetWithOutput(
      //     {
      //         commId: this.outputsAreSpecificToAWidget[this.outputsAreSpecificToAWidget.length - 1]
      //             .handlingCommId,
      //         outputToAppend: cellOutput
      //     },
      //     task
      // );

      // if (result?.outputAdded) {
      //     outputShouldBeAppended = false;
      // }

      console.error("unknown operation");
    }
    // if (outputShouldBeAppended) {
    //     task?.appendOutput([cellOutput]).then(noop, noop);
    // }
    // this.endTemporaryTask();
    return cellOutput;
  }

  private canMimeTypeBeRenderedByWidgetManager(
    outputItem: NotebookCellOutputItem,
  ) {
    const mime = outputItem.mime;
    if (
      mime === CellOutputMimeTypes.stderr ||
      mime === CellOutputMimeTypes.stdout ||
      mime === CellOutputMimeTypes.error
    ) {
      // These are plain text mimetypes that can be rendered by the Jupyter Lab widget manager.
      return true;
    }
    if (mime === WIDGET_MIMETYPE) {
      const data: WidgetData = JSON.parse(
        new TextDecoder().decode(outputItem.data),
      );
      // Jupyter Output widgets cannot be rendered properly by the widget manager,
      // We need to render that.
      if (
        typeof data.model_id === "string" &&
        this.commIdsMappedToWidgetOutputModels.has(data.model_id)
      ) {
        return false;
      }
      return true;
    }
    if (mime.startsWith("application/vnd")) {
      // Custom vendored mimetypes cannot be rendered by the widget manager, it relies on the output renderers.
      return false;
    }
    // Everything else can be rendered by the Jupyter Lab widget manager.
    return true;
  }
  private handleExecuteInput(msg: KernelMessage.IExecuteInputMsg) {
    // if (msg.content.execution_count && this.execution) {
    //     this.execution.executionOrder = msg.content.execution_count;
    // }
  }

  private handleStatusMessage(msg: KernelMessage.IStatusMsg) {
    // traceCellMessage(cell, `Kernel switching to ${msg.content.execution_state}`);
  }
  private handleStreamMessage(
    msg: KernelMessage.IStreamMsg,
    cell: NotebookCell,
  ) {
    if (
      getParentHeaderMsgId(msg) &&
      this.outputsAreSpecificToAWidget.length &&
      this.outputsAreSpecificToAWidget[
        this.outputsAreSpecificToAWidget.length - 1
      ].msgIdsToSwallow === getParentHeaderMsgId(msg)
    ) {
      // Stream messages will be handled by the Output Widget.
      return;
    }

    // eslint-disable-next-line complexity
    // traceCellMessage(this.cell, `Update streamed output, new output '${msg.content.text.substring(0, 100)}'`);
    // Possible execution of cell has completed (the task would have been disposed).
    // This message could have come from a background thread.
    // In such circumstances, create a temporary task & use that to update the output (only cell execution tasks can update cell output).
    // const task = this.execution || this.createTemporaryTask();

    const outputName =
      msg.content.name === "stdout"
        ? NotebookCellOutputItem.stdout("").mime
        : NotebookCellOutputItem.stderr("").mime;
    // If we're resuming a previously executing cell (e.g. by reloading vscode),
    // & the last output is an output with the same stream output items then use that (instead of creating a whole new output).
    // Because with streams we always append to the existing output (unless we have different mime types or different stream types)
    if (
      /*!this.request &&*/ !this.streamsReAttachedToExecutingCell &&
      !this.lastUsedStreamOutput
    ) {
      if (
        cell.outputs.length &&
        cell.outputs[cell.outputs.length - 1].items.length >= 1 &&
        cell.outputs[cell.outputs.length - 1].items.every(
          (item) => item.mime === outputName,
        )
      ) {
        this.lastUsedStreamOutput = {
          output: cell.outputs[0],
          stream: msg.content.name,
        };
      }
    }
    this.streamsReAttachedToExecutingCell = true;

    // Clear output if waiting for a clear
    // const { previousValueOfClearOutputOnNextUpdateToOutput } = this.clearOutputIfNecessary(task);
    // Ensure we append to previous output, only if the streams as the same &
    // If the last output is the desired stream type.
    if (this.lastUsedStreamOutput?.stream === msg.content.name) {
      const output = cellOutputToVSCCellOutput({
        output_type: "stream",
        name: msg.content.name,
        text: msg.content.text,
      });
      // traceCellMessage(this.cell, `Append output items '${msg.content.text.substring(0, 100)}`);
      // task?.appendOutputItems(output.items, this.lastUsedStreamOutput.output).then(noop, noop);
      return [output, this.lastUsedStreamOutput.output];
    }
    // else if (previousValueOfClearOutputOnNextUpdateToOutput) {
    //     // Replace the current outputs with a single new output.
    //     const text = concatMultilineString(msg.content.text);
    //     const output = cellOutputToVSCCellOutput({
    //         output_type: 'stream',
    //         name: msg.content.name,
    //         text
    //     });
    //     this.lastUsedStreamOutput = { output, stream: msg.content.name };
    //     // traceCellMessage(this.cell, `Replace output with '${text.substring(0, 100)}'`);
    //     // task?.replaceOutput([output]).then(noop, noop);
    //     return [output];
    // }
    else {
      // Create a new output
      const text = formatStreamText(concatMultilineString(msg.content.text));
      const output = cellOutputToVSCCellOutput({
        output_type: "stream",
        name: msg.content.name,
        text,
      });
      // this.lastUsedStreamOutput = { output, stream: msg.content.name };
      // traceCellMessage(this.cell, `Append new output '${text.substring(0, 100)}'`);
      // task?.appendOutput([output]).then(noop, noop);
      return [output];
    }
    // this.endTemporaryTask();
  }

  private handleDisplayData(
    msg: KernelMessage.IDisplayDataMsg,
    cell: NotebookCell,
  ) {
    const output = {
      output_type: "display_data",
      data: handleTensorBoardDisplayDataOutput(msg.content.data),
      metadata: msg.content.metadata,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transient: msg.content.transient as any, // NOSONAR
    };
    return this.addToCellData(output, msg, cell);
  }

  private handleClearOutput(msg: KernelMessage.IClearOutputMsg) {
    // Check if this message should be handled by a specific Output Widget.
    if (
      this.outputsAreSpecificToAWidget.length &&
      this.outputsAreSpecificToAWidget[
        this.outputsAreSpecificToAWidget.length - 1
      ].msgIdsToSwallow === getParentHeaderMsgId(msg)
    ) {
      if (msg.content.wait) {
        if (this.outputsAreSpecificToAWidget.length) {
          this.outputsAreSpecificToAWidget[
            this.outputsAreSpecificToAWidget.length - 1
          ].clearOutputOnNextUpdateToOutput = true;
        }
      } else {
        console.log("clear output");
        // const task = this.execution || this.createTemporaryTask();
        // this.updateJupyterOutputWidgetWithOutput({ clearOutput: true }, task);
        // this.endTemporaryTask();
      }
      return;
    }

    // Regular output.
    // if (msg.content.wait) {
    //     this.clearOutputOnNextUpdateToOutput = true;
    // } else {
    //     // Possible execution of cell has completed (the task would have been disposed).
    //     // This message could have come from a background thread.
    //     // In such circumstances, create a temporary task & use that to update the output (only cell execution tasks can update cell output).
    //     // Clear all outputs and start over again.
    //     // const task = this.execution || this.createTemporaryTask();
    //     // this.clearLastUsedStreamOutput();
    //     task?.clearOutput().then(noop, noop);
    //     // this.endTemporaryTask();
    // }
  }

  private handleError(msg: KernelMessage.IErrorMsg, cell: NotebookCell) {
    const traceback = msg.content.traceback;
    console.log(`Traceback for error ${traceback}`);
    // this.formatters.forEach((formatter) => {
    //     traceback = formatter.format(cell, traceback);
    // });
    console.log(`Traceback for error after formatting ${traceback}`);
    const output: nbformat.IError = {
      output_type: "error",
      ename: msg.content.ename,
      evalue: msg.content.evalue,
      traceback,
    };

    // if (cell.notebook.notebookType !== 'interactive') {
    //     const cellExecution = CellExecutionCreator.get(cell);
    //     if (cellExecution && msg.content.ename !== 'KeyboardInterrupt') {
    //         cellExecution.errorInfo = {
    //             message: `${msg.content.ename}: ${msg.content.evalue}`,
    //             location: findErrorLocation(msg.content.traceback, this.cell),
    //             uri: cell.document.uri,
    //             stack: msg.content.traceback.join('\n')
    //         };
    //     }
    // }

    this.cellHasErrorsInOutput = true;
    return this.addToCellData(output, msg, cell);
  }
}
