import { extensions, Event, Uri, workspace } from "vscode";
import { provideSingleton } from "../utils";

interface PythonExecutionDetails {
  getPythonPath: () => string;
  onDidChangeExecutionDetails: Event<Uri | undefined>;
}

@provideSingleton(PythonEnvironment)
export class PythonEnvironment {
  private executionDetails?: PythonExecutionDetails;

  async getEnvironment(): Promise<PythonExecutionDetails> {
    if (this.executionDetails !== undefined) {
      return this.executionDetails;
    }

    return await this.activatePythonExtension();
  }

  private async activatePythonExtension(): Promise<PythonExecutionDetails> {
    const extension = extensions.getExtension("ms-python.python")!;

    if (!extension.isActive) {
      await extension.activate();
    }
    await extension.exports.ready;

    const settings = extension.exports.settings;

    return (this.executionDetails = {
      getPythonPath: () =>
        settings.getExecutionDetails(workspace.workspaceFile).execCommand[0],
      onDidChangeExecutionDetails: settings.onDidChangeExecutionDetails,
    });
  }
}
