import {
  DBTCommandExecutionInfrastructure,
  DBTTerminal,
} from "@altimateai/dbt-integration";
import { ClientMapper, NotebookDependencies, NotebookKernelClient } from "@lib";
import { Uri } from "vscode";
import { PythonEnvironment } from "./dbt_client/pythonEnvironment";
import {
  findMissingPython,
  missingPythonMessage,
  promptForPython,
  stampBlocked,
} from "./pythonRequiredFeature";
import { TelemetryService } from "./telemetry";
import { TelemetryEvents } from "./telemetry/events";

// The notebook runs a Jupyter kernel on Python, in every dbt mode.
export const NOTEBOOK_NEEDS = "Altimate notebooks need";

/**
 * Every way a notebook opens (the create command, a .notebook file, a
 * restored tab) starts its Jupyter kernel here. Without a Python interpreter
 * the kernel never starts and the notebook waits for it forever, so ask for
 * one and stop before creating the kernel client.
 */
export class PythonGatedClientMapper extends ClientMapper {
  constructor(
    executionInfrastructure: DBTCommandExecutionInfrastructure,
    notebookDependencies: NotebookDependencies,
    dbtTerminal: DBTTerminal,
    private readonly pythonEnvironment: PythonEnvironment,
    private readonly telemetry: TelemetryService,
  ) {
    super(executionInfrastructure, notebookDependencies, dbtTerminal);
  }

  async initializeNotebookClient(
    notebookUri: Uri,
  ): Promise<NotebookKernelClient> {
    // A notebook restored on window reload opens while the extension is still
    // activating, before the Python extension has answered. Reading the
    // interpreter then throws, so wait for the environment rather than report
    // a working interpreter as missing. A failed initialization falls through:
    // `findMissingPython` then names the missing extension or interpreter.
    try {
      await this.pythonEnvironment.initialize();
    } catch {
      // handled by findMissingPython below
    }
    const missing = findMissingPython(this.pythonEnvironment);
    if (missing) {
      stampBlocked(this.telemetry, TelemetryEvents["Notebook/Launch"], missing);
      void promptForPython(NOTEBOOK_NEEDS, missing);
      throw new Error(missingPythonMessage(NOTEBOOK_NEEDS, missing));
    }
    return super.initializeNotebookClient(notebookUri);
  }
}
