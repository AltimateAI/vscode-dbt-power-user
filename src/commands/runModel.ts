import { Uri, window } from "vscode";
import { RunModelType } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { NodeTreeItem } from "../treeview_provider/ModelTreeviewProvider";
import { provideSingleton } from "../utils";

@provideSingleton(RunModel)
export class RunModel {
  constructor(private dbtProjectContainer: DBTProjectContainer) {}

  runModelOnActiveWindow(type?: RunModelType) {
    const fullPath = window.activeTextEditor?.document.uri;
    if (fullPath !== undefined) {
      this.runDBTModel(fullPath, type);
    }
  }

  compileModelOnActiveWindow(type?: RunModelType) {
    const fullPath = window.activeTextEditor?.document.uri;
    if (fullPath !== undefined) {
      this.compileDBTModel(fullPath, type);
    }
  }

  runModelOnNodeTreeItem(type: RunModelType) {
    return (model?: NodeTreeItem) => {
      if (model === undefined) {
        this.runModelOnActiveWindow(type);
        return;
      }
      this.runDBTModel(Uri.file(model.url), type);
    };
  }

  showCompiledSQLOnActiveWindow() {
    const fullPath = window.activeTextEditor?.document.uri;
    if (fullPath !== undefined) {
      this.showCompiledSQL(fullPath);
    }
  }

  showRanSQLOnActiveWindow() {
    const fullPath = window.activeTextEditor?.document.uri;
    if (fullPath !== undefined) {
      this.showRanSQL(fullPath);
    }
  }

  runDBTModel(modelPath: Uri, type?: RunModelType) {
    this.dbtProjectContainer.runModel(modelPath, type);
  }

  compileDBTModel(modelPath: Uri, type?: RunModelType) {
    this.dbtProjectContainer.compileModel(modelPath, type);
  }

  showCompiledSQL(modelPath: Uri) {
    this.dbtProjectContainer.showCompiledSQL(modelPath);
  }

  showRanSQL(modelPath: Uri) {
    this.dbtProjectContainer.showRanSQL(modelPath);
  }
}
