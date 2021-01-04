import { extensions, Event, Uri, workspace } from "vscode";

interface PythonExecutionDetails {
  pythonPath: string;
  onDidChangeExecutionDetails: Event<Uri | undefined>;
}

export class PythonEnvironment {

  static async getEnvironment(): Promise<PythonExecutionDetails> {
    const extension = extensions.getExtension("ms-python.python")!;
  
    if (!extension.isActive) {
      await extension.activate();
    }
    await extension.exports.ready;
  
    const settings = extension.exports.settings;
  
    return {
      pythonPath: settings.getExecutionDetails(workspace.workspaceFile)
        .execCommand[0],
      onDidChangeExecutionDetails: settings.onDidChangeExecutionDetails,
    };
  }
}
