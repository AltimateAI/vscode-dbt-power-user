import { PythonBridge } from "python-bridge";
import { DBTCommandExecutionInfrastructure } from "../dbt_client/dbtIntegration";
import path = require("path");

export class NotebookClient {
  private python: PythonBridge;
  constructor(
    notebookPath: string,
    private executionInfrastructure: DBTCommandExecutionInfrastructure,
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
    } catch (e) {
      // TODO: handle error
      console.error(e);
    }
  }

  // TODO: typecast the return value
  async executePython(code: string, cellPath: string) {
    console.log(`Executing python code in cell: ${cellPath}`);
    return this.python.lock<{ mime: string; value: string }[]>(
      (python) => python`notebook_kernel.execute_python(${code})`,
    );
  }
}
