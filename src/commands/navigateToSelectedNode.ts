import { commands, Uri } from "vscode";

const navigateToSelectedNode = async (url: string) => {
  const uri = Uri.file(url);
  await commands.executeCommand('vscode.open', uri, { preview: false });
};

export default navigateToSelectedNode;