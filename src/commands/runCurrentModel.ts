import * as path from "path";
import * as vscode from "vscode";

const runCurrentModel = () => {
  const terminal = vscode.window.createTerminal('DBT');
  const fullPath = vscode.window.activeTextEditor?.document.fileName;
  if (fullPath !== undefined) {
    const fileName = path.basename(fullPath, '.sql');
    terminal.sendText(`dbt run --model ${fileName}`);
    terminal.show(true);
  }
};

export default runCurrentModel;
