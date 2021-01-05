import { extensions, Event, Uri, workspace } from "vscode";

interface PythonExecutionDetails {
  getPythonPath: () => string;
  onDidChangeExecutionDetails: Event<Uri | undefined>;
}

export class PythonEnvironment {
  private static executionDetails?: PythonExecutionDetails;

  static async getEnvironment(): Promise<PythonExecutionDetails> {
    if (PythonEnvironment.executionDetails !== undefined) {
      return PythonEnvironment.executionDetails;
    }

    return await PythonEnvironment.activatePythonExtension();
  }

  private static async activatePythonExtension(): Promise<PythonExecutionDetails> {
    const extension = extensions.getExtension("ms-python.python")!;

    if (!extension.isActive) {
      await extension.activate();
    }
    await extension.exports.ready;

    const settings = extension.exports.settings;

    return PythonEnvironment.executionDetails = {
      getPythonPath: () => (settings.getExecutionDetails(workspace.workspaceFile)
        .execCommand[0]),
      onDidChangeExecutionDetails: settings.onDidChangeExecutionDetails, // TODO this should be disposed when no longer needed
    };
  }
}