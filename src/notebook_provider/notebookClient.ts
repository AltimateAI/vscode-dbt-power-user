import { PythonBridge, PythonException } from "python-bridge";
import { DBTCommandExecutionInfrastructure } from "../dbt_client/dbtIntegration";
import path = require("path");
import { ProgressLocation, window } from "vscode";
import { CommandProcessExecutionFactory } from "../commandProcessExecution";
import { getFirstWorkspacePath } from "../utils";
import { PythonEnvironment } from "../manifest/pythonEnvironment";

export class NotebookClient {
  private python: PythonBridge;
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

  private async initializeNotebookKernel(notebookPath: string) {
    try {
      await this.python.ex`
        from altimate_notebook_kernel import initialize_kernel
        notebook_kernel = initialize_kernel(${notebookPath})
        `;
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
          return;
        }
      }
      window.showErrorMessage((exc as Error).message);
    }
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
