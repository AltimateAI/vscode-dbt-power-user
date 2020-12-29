import * as path from "path";
import { window } from "vscode";
import { dbtProjectContainer } from "../manifest/dbtProjectContainer";
import { NodeTreeItem } from "../treeview_provider/ModelParentTreeviewProvider";

export enum RunModelType {
  PARENTS,
  CHILDREN,
}

export const runModelOnActiveWindow = async (type?: RunModelType) => {
  const fullPath = window.activeTextEditor?.document.fileName;
  if (fullPath !== undefined) {
    const fileName = path.basename(fullPath, ".sql");
    runDBTModel(fileName, type);
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
  runDBTModel(fileName, type);
};

const runDBTModel = async (modelName: string, type?: RunModelType) => {
  if (window.activeTextEditor === undefined) {
    return;
  }
  const currentFilePath = window.activeTextEditor.document.uri;
  const projectRootpath = dbtProjectContainer.getProjectRootpath(currentFilePath);

  if (modelName !== undefined && projectRootpath !== undefined) {
    if (dbtProjectContainer.dbtClient === undefined) {
      return;
    }
    const dbtClient = dbtProjectContainer.dbtClient;
    const plusOperatorLeft = type === RunModelType.PARENTS ? "+" : "";
    const plusOperatorRight = type === RunModelType.CHILDREN ? "+" : "";
    dbtClient.runDBTRunModelCommand({ plusOperatorLeft, modelName, plusOperatorRight, cwd: projectRootpath.fsPath });
  }
};
