import * as path from "path";
import { window } from "vscode";
import { workspace } from "vscode";
import { manifestContainer } from "../manifest/dbtProjectContainer";
import { NodeTreeItem } from "../treeview_provider/ModelParentTreeviewProvider";

export enum RunModelType {
  PARENTS,
  CHILDREN,
}

export const runModelOnActiveWindow = async (type?: RunModelType) => {
  const fullPath = window.activeTextEditor?.document.fileName;
  if (fullPath !== undefined) {
    const fileName = path.basename(fullPath, ".sql");
    runTerminal(fileName, type);
  }
};

export const runModelOnNodeTreeItem = (type: RunModelType) => async (
  model?: NodeTreeItem
) => {
  if (model === undefined) {
    runModelOnActiveWindow(type);
    return;
  }
  const fileName = path.basename(model.url, ".sql");
  runTerminal(fileName, type);
};

const sleep: (timeout: number) => Promise<void> = async (timeout: number) => {
  return new Promise<void>((resolve) => {
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
    const terminal =
      workspace
        .getConfiguration("vscodeDbtPowerUser")
        .get<boolean>("useCurrentTerminal") && window.activeTerminal
        ? window.activeTerminal
        : window.createTerminal({
            name: "DBT",
            cwd: projectRootpath,
          });
    // should sleep after the terminal cration in order for the venv to be activated
    await sleep(1000);
    const plusOperatorLeft = type === RunModelType.PARENTS ? "+" : "";
    const plusOperatorRight = type === RunModelType.CHILDREN ? "+" : "";
    const dbt_command = workspace
      .getConfiguration("vscodeDbtPowerUser")
      .get("dbtRunCommand", "dbt run");

    terminal.sendText(`${dbt_command} --model ${plusOperatorLeft}${modelName}${plusOperatorRight}`);
    terminal.show(true);
  }
};
