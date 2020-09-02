import { commands, Uri, window } from "vscode";

const navigateToFileWithErrorMessage = async (url: string, errorMessage: string) => {
  const uri = Uri.file(url);
  window.showErrorMessage(errorMessage);
  await commands.executeCommand('vscode.open', uri, { preview: false });
};

export default navigateToFileWithErrorMessage;