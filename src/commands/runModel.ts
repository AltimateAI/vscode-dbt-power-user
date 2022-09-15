import path = require("path");
import { Uri, window } from "vscode";
import { RunModelType } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { NodeTreeItem } from "../treeview_provider/ModelTreeviewProvider";
import { provideSingleton } from "../utils";

@provideSingleton(RunModel)
export class RunModel {
  constructor(private dbtProjectContainer: DBTProjectContainer) { }

  runModelOnActiveWindow() {
    // TODO: try catch with server
    const fullPath = window.activeTextEditor?.document.uri;
    if (fullPath !== undefined) {
      this.runDBTModel(fullPath);
    }
  }

  runTestsOnActiveWindow() {
    // TODO: try catch with server?
    const fullPath = window.activeTextEditor?.document.uri;
    if (fullPath !== undefined) {
      this.runDBTModelTest(fullPath);
    }
  }

  compileModelOnActiveWindow() {
    const fullPath = window.activeTextEditor?.document.uri;
    if (fullPath !== undefined) {
      this.compileDBTModel(fullPath);
    }
  }

  compileQueryOnActiveWindow() {
    const fullPath = window.activeTextEditor?.document.uri;
    if (fullPath !== undefined) {
      const query = window.activeTextEditor?.document.getText();
      if (query !== undefined) {
        this.compileDBTQuery(fullPath, query);
      }
    }
  }

  previewModelOnActiveWindow() {
    if (!window.activeTextEditor) {
      return;
    }
    const sqlSelected = window.activeTextEditor.selection;
    const sqlQuery = window.activeTextEditor.document.getText(
      sqlSelected.isEmpty ? undefined : sqlSelected);
    const sqlTitle = path.basename(window.activeTextEditor?.document.uri.fsPath ?? "Untitled.sql")
      + " "
      + new Date().toTimeString().split(" ")[0];
    this.previewDBTModel(sqlQuery, sqlTitle);
  }

  runModelOnNodeTreeItem(type: RunModelType) {
    return (model?: NodeTreeItem) => {
      if (model === undefined) {
        this.runModelOnActiveWindow();
        return;
      }
      switch (type) {
        case (RunModelType.TEST): {
          if (model.label) {
            this.runDBTTest(Uri.file(model.url), model.label.toString().split(".")[0]);
          }
          break;
        }
        default: {
          // Catch Parents || Children RunTypes
          this.runDBTModel(Uri.file(model.url), type);
          break;
        }
      }
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

  compileDBTQuery(modelPath: Uri, query: string) {
    this.dbtProjectContainer.compileQuery(modelPath, query);
  }

  runDBTTest(modelPath: Uri, testName: string) {
    this.dbtProjectContainer.runTest(modelPath, testName);
  }

  runDBTModelTest(modelPath: Uri) {
    const modelName = path.basename(modelPath.fsPath, ".sql");
    this.dbtProjectContainer.runModelTest(modelPath, modelName);
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
