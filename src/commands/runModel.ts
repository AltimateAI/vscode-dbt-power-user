import * as path from "path";
import { window } from "vscode";
import { workspace } from "vscode";
import { manifestContainer } from "../manifest/manifestContainer";
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
  if (window.activeTextEditor === undefined) {
    return;
  }
  const currentFilePath = window.activeTextEditor.document.uri;
  const projectRootpath = manifestContainer.getProjectRootpath(currentFilePath);
  
  if (modelName !== undefined && projectRootpath !== undefined) {
    const terminal = workspace.getConfiguration('innoverio-vscode-dbt-power-user.setting').get('current_terminal') && window.activeTerminal 
      ? window.activeTerminal 
      : window.createTerminal({
        name: 'DBT',
        cwd: projectRootpath,
       });
    // should sleep after the terminal cration in order for the venv to be activated
    await sleep(500);
    const plusOperatorLeft = type === RunModelType.PARENTS ? '+' : '';
    const plusOperatorRight = type === RunModelType.CHILDREN ? '+' : '';
    const dbt_command =  workspace.getConfiguration('innoverio-vscode-dbt-power-user.setting').get('dbt_command') 
      ? workspace.getConfiguration('innoverio-vscode-dbt-power-user.setting').get('dbt_command') 
      : `dbt run`
    terminal.sendText(dbt_command + ` --model ${plusOperatorLeft}${modelName}${plusOperatorRight}`);
    terminal.show(true);
  }
};