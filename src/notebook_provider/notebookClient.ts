import type * as nbformat from "@jupyterlab/nbformat";
import type { Data as WebSocketData } from "ws";
import { promisify } from "util";
import { PythonBridge, PythonException } from "python-bridge";
import { DBTCommandExecutionInfrastructure } from "../dbt_client/dbtIntegration";
import path = require("path");
import {
  NotebookCellOutput,
  NotebookCellOutputItem,
  ProgressLocation,
  window,
} from "vscode";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { getFirstWorkspacePath } from "../utils";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { newRawKernel } from "./kernelClient";
import { randomUUID } from "crypto";
import { cellOutputMappers, cellOutputToVSCCellOutput, handleTensorBoardDisplayDataOutput } from "./helpers";

export class NotebookClient {
  private python: PythonBridge;
  private kernel: ReturnType<typeof newRawKernel> | undefined;
  private isInitializing = true;
  constructor(
    notebookPath: string,
    private executionInfrastructure: DBTCommandExecutionInfrastructure,
    private commandProcessExecutionFactory: CommandProcessExecutionFactory,
    private pythonEnvironment: PythonEnvironment,
  ) {
    this.python = this.executionInfrastructure.createPythonBridge(
      path.dirname(notebookPath),
    );
    this.initializeNotebookKernel(notebookPath);
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
        notebook_kernel = initialize_kernel(${notebookPath})
        `;

      const getPorts = promisify((await import("portfinder")).getPorts);
      const ports = await getPorts(5, { host: "127.0.0.1", port: undefined });
      const pid = await this.python.lock<{ mime: string; value: string }[]>(
        (python) => python`notebook_kernel.get_session_id()`,
      );
      const kernelProcess = {
        connection: {
          key: randomUUID(),
          signature_scheme: "hmac-sha256",
          transport: "tcp",
          ip: "127.0.0.1",
          hb_port: ports[0],
          control_port: ports[1],
          shell_port: ports[2],
          stdin_port: ports[3],
          iopub_port: ports[4],
          kernel_name: "python",
        },
        pid,
      };
      const result = newRawKernel(kernelProcess, randomUUID(), "username", {
        name: "python",
        id: randomUUID(),
      });
      this.kernel = result;
      console.log(result);
      const newSocket = result.socket;
      newSocket?.addReceiveHook(this.onKernelSocketMessage); // NOSONAR
      newSocket?.addSendHook(this.mirrorSend); // NOSONAR
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
    console.log("mirrorSend", data);
  }
  private async onKernelSocketMessage(data: WebSocketData): Promise<void> {
    console.log("onKernelSocketMessage", data);
  }

  async storeDataInKernel(cellId: string, data: any) {
    console.log(`storeDataInKernel: ${cellId}`, data);
    return this.python.lock<{ mime: string; value: string }[]>(
      (python) => python`notebook_kernel.store_sql_result(${cellId}, ${data})`,
    );
  }

  // TODO: typecast the return value
  async executePython(
    code: string,
    cellPath: string,
    onOutput: (output: NotebookCellOutput) => void,
  ) {
    console.log(`Executing python code in cell: ${cellPath}`);
    const jupyterLab =
      require("@jupyterlab/services") as typeof import("@jupyterlab/services");
    const request = await this.kernel?.realKernel.requestExecute({ code });
    if (!request) {
      return;
    }
    request.onStdin = (msg) => {
      console.log("onStdin", msg);
    }
    request.onIOPub = (msg) => {
      // started();
      if (jupyterLab.KernelMessage.isStreamMsg(msg)) {
        onOutput(
          cellOutputToVSCCellOutput({
            output_type: "stream",
            name: msg.content.name,
            text: msg.content.text,
          }),
        );
      } else if (jupyterLab.KernelMessage.isExecuteResultMsg(msg)) {
        onOutput(
          cellOutputToVSCCellOutput({
            output_type: "execute_result",
            data: msg.content.data,
            metadata: msg.content.metadata,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transient: msg.content.transient as any, // NOSONAR
            execution_count: msg.content.execution_count,
          }),
        );
      } else if (jupyterLab.KernelMessage.isDisplayDataMsg(msg)) {
        onOutput(
          cellOutputToVSCCellOutput({
            output_type: "display_data",
            data: handleTensorBoardDisplayDataOutput(msg.content.data),
            metadata: msg.content.metadata,
            transient: msg.content.transient,
          }),
        );
      } else if (jupyterLab.KernelMessage.isUpdateDisplayDataMsg(msg)) {
        onOutput(
          cellOutputToVSCCellOutput({
            output_type: "display_data",
            data: handleTensorBoardDisplayDataOutput(msg.content.data),
            metadata: msg.content.metadata,
            transient: msg.content.transient,
          }),
        );
      } else if (jupyterLab.KernelMessage.isErrorMsg(msg)) {
        onOutput(
          cellOutputToVSCCellOutput({
            output_type: "error",
            ename: msg.content.ename,
            evalue: msg.content.evalue,
            traceback: msg.content.traceback,
          }),
        );
      } else if (
        jupyterLab.KernelMessage.isExecuteInputMsg(msg) ||
        jupyterLab.KernelMessage.isStatusMsg(msg)
      ) {
        //
      } else {
        console.warn(
          `Got unexpected io pub message when executing code sillenty (${msg.header.msg_type})`,
        );
      }
    };
    return request;
    // return this.python.lock<{ mime: string; value: string }[]>(
    //   (python) => python`notebook_kernel.execute_python(${code})`,
    // );
  }
}
