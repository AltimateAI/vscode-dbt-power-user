import * as path from "path";
import { window } from "vscode";
import { NodeTreeItem } from "../treeview_provider/ModelParentTreeviewProvider";

export enum RunModelType {
  CURRENT,
  PARENTS,
  CHILDREN
}

const runModel = (type: RunModelType) => async (model?: NodeTreeItem) => {
  const terminal = window.activeTerminal ? window.activeTerminal : window.createTerminal('DBT');
  await sleep(500);
  const fullPath = model === undefined ? window.activeTextEditor?.document.fileName : model.url;
  if (fullPath !== undefined) {
    const fileName = path.basename(fullPath, '.sql');
    const plusOperatorLeft = type === RunModelType.PARENTS ? '+' : '';
    const plusOperatorRight = type === RunModelType.CHILDREN ? '+' : '';;
    terminal.sendText(`dbt run --model ${plusOperatorLeft}${fileName}${plusOperatorRight}`);
    terminal.show(true);
  }
};

const sleep: (timeout: number) => Promise<void>  = async (timeout: number) => {
  return new Promise<void>(resolve => {
      setTimeout(resolve, timeout);
  });
};

export default runModel;