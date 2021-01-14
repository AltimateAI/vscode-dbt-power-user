import * as path from "path";
import { window } from "vscode";
import { DbtProjectContainer } from "../manifest/dbtProjectContainer";
import { NodeTreeItem } from "../treeview_provider/ModelTreeviewProvider";
import { provideSingleton } from "../utils";

export enum RunModelType {
  PARENTS,
  CHILDREN,
}

@provideSingleton(RunModel)
export class RunModel {
  constructor(private dbtProjectContainer: DbtProjectContainer) {}

  runModelOnActiveWindow(type?: RunModelType) {
    const fullPath = window.activeTextEditor?.document.fileName;
    if (fullPath !== undefined) {
      const fileName = path.basename(fullPath, ".sql");
      this.runDBTModel(fileName, type);
    }
  }

  runModelOnNodeTreeItem(type: RunModelType) {
    return (model?: NodeTreeItem) => {
      if (model === undefined) {
        this.runModelOnActiveWindow(type);
        return;
      }
      const fileName = path.basename(model.url, ".sql");
      this.runDBTModel(fileName, type);
    };
  }

  runDBTModel(modelName: string, type?: RunModelType) {
    if (window.activeTextEditor === undefined) {
      return;
    }
    const currentFilePath = window.activeTextEditor.document.uri;
    const plusOperatorLeft = type === RunModelType.PARENTS ? "+" : "";
    const plusOperatorRight = type === RunModelType.CHILDREN ? "+" : "";
    this.dbtProjectContainer
      .findDBTProject(currentFilePath)
      ?.runModel({ plusOperatorLeft, modelName, plusOperatorRight });
  }
}
