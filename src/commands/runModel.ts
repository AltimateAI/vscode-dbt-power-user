import path = require("path");
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

  previewModelOnActiveWindow() {
    const sqlQuery = window.activeTextEditor?.document.getText();
    const sqlTitle = path.basename(window.activeTextEditor?.document.uri.fsPath ?? "untitled.sql") + " " + new Date().toTimeString().split(" ")[0];
    if (sqlQuery !== undefined) {
      this.previewDBTModel(sqlQuery, sqlTitle);
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

  showRunSQLOnActiveWindow() {
    const fullPath = window.activeTextEditor?.document.uri;
    if (fullPath !== undefined) {
      this.showRunSQL(fullPath);
    }
  }

  runDBTModel(modelPath: Uri, type?: RunModelType) {
    this.dbtProjectContainer.runModel(modelPath, type);
  }

  compileDBTModel(modelPath: Uri, type?: RunModelType) {
    this.dbtProjectContainer.compileModel(modelPath, type);
  }

  async previewDBTModel(sql: string, title: string) {
    this.dbtProjectContainer.previewSQL(sql, title);
  }

  showCompiledSQL(modelPath: Uri) {
    this.dbtProjectContainer.showCompiledSQL(modelPath);
  }

  showRunSQL(modelPath: Uri) {
    this.dbtProjectContainer.showRunSQL(modelPath);
  }
}
