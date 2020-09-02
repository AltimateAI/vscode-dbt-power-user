import * as path from "path";
import { window } from "vscode";
import { NodeTreeItem } from "../treeview_provider/ModelParentTreeviewProvider";

export enum RunModelType {
  PARENTS,
  CHILDREN
}

export const runModelOnActiveWindow = async (type?: RunModelType) => {
  const fullPath = window.activeTextEditor?.document.fileName;
  if (fullPath !== undefined) {
    const fileName = path.basename(fullPath, '.sql');
    runTerminal(fileName, type);
  }
};

export const runModelOnNodeTreeItem = (type: RunModelType) => async (model?: NodeTreeItem) => {
  if (model === undefined) {
    runModelOnActiveWindow(type);
    return;
  }
  const fileName = path.basename(model.url, '.sql');
  runTerminal(fileName, type);
};

const sleep: (timeout: number) => Promise<void> = async (timeout: number) => {
  return new Promise<void>(resolve => {
    setTimeout(resolve, timeout);
  });
};

const runTerminal = async (modelName: string, type?: RunModelType) => {
  const terminal = window.activeTerminal ? window.activeTerminal : window.createTerminal('DBT');
  await sleep(500);
  if (modelName !== undefined) {
    const plusOperatorLeft = type === RunModelType.PARENTS ? '+' : '';
    const plusOperatorRight = type === RunModelType.CHILDREN ? '+' : '';
    terminal.sendText(`dbt run --model ${plusOperatorLeft}${modelName}${plusOperatorRight}`);
    terminal.show(true);
  }
};