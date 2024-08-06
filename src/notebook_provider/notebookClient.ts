import type { Data as WebSocketData } from "ws";
import { promisify } from "util";
import { PythonBridge, PythonException } from "python-bridge";
import { DBTCommandExecutionInfrastructure } from "../dbt_client/dbtIntegration";
import path = require("path");
import { ProgressLocation, window } from "vscode";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { getFirstWorkspacePath } from "../utils";
import { PythonEnvironment } from "../manifest/pythonEnvironment";
import { newRawKernel } from "./kernelClient";
import { randomUUID } from "crypto";

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
  async executePython(code: string, cellPath: string) {
    console.log(`Executing python code in cell: ${cellPath}`);
    return this.python.lock<{ mime: string; value: string }[]>(
      (python) => python`notebook_kernel.execute_python(${code})`,
    );
  }
}
