import path = require("path");
import { Uri, window } from "vscode";
import { GenerateModelFromSourceParams } from "../code_lens_provider/sourceModelCreationCodeLensProvider";
import { RunModelType } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { NodeTreeItem } from "../treeview_provider/modelTreeviewProvider";
import { provideSingleton } from "../utils";

@provideSingleton(RunModel)
export class RunModel {
  constructor(private dbtProjectContainer: DBTProjectContainer) {}

  runModelOnActiveWindow(type?: RunModelType) {
    if (!window.activeTextEditor) {
      return;
    }
    const fullPath = window.activeTextEditor.document.uri;
    this.runDBTModel(fullPath, type);
  }

  buildModelOnActiveWindow(type?: RunModelType) {
    if (!window.activeTextEditor) {
      return;
    }
    const fullPath = window.activeTextEditor.document.uri;
    this.buildDBTModel(fullPath, type);
  }

  runTestsOnActiveWindow() {
    if (!window.activeTextEditor) {
      return;
    }
    const fullPath = window.activeTextEditor.document.uri;
    this.runDBTModelTest(fullPath);
  }

  compileModelOnActiveWindow() {
    if (!window.activeTextEditor) {
      return;
    }
    const fullPath = window.activeTextEditor.document.uri;
    this.compileDBTModel(fullPath);
  }

  compileQueryOnActiveWindow() {
    if (!window.activeTextEditor) {
      return;
    }
    const fullPath = window.activeTextEditor.document.uri;
    const query = window.activeTextEditor.document.getText();
    if (query !== undefined) {
      this.compileDBTQuery(fullPath, query);
    }
  }

  executeQueryOnActiveWindow() {
    if (!window.activeTextEditor) {
      return;
    }
    const cursor = window.activeTextEditor.selection;
    const query = window.activeTextEditor.document.getText(
      cursor.isEmpty ? undefined : cursor
    );
    const queryName =
      "Results: " +
      path.basename(window.activeTextEditor.document.uri.fsPath ?? "Ad Hoc") +
      " " +
      (cursor.isEmpty ? "" : "(Ad Hoc) ") +
      new Date().toTimeString().split(" ")[0];
    this.executeSQL(window.activeTextEditor.document.uri, query, queryName);
  }

  runModelOnNodeTreeItem(type: RunModelType) {
    return (model?: NodeTreeItem) => {
      if (model === undefined) {
        this.runModelOnActiveWindow(type);
        return;
      }
      switch (type) {
        case RunModelType.TEST: {
          if (model.label) {
            this.runDBTTest(
              Uri.file(model.url),
              model.label.toString().split(".")[0]
            );
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
  generateSchemaYMLOnActiveWindow() {
    const fullPath = window.activeTextEditor?.document.uri;
    if (fullPath !== undefined) {
      this.generateSchemaYML(fullPath);
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

  buildDBTModel(modelPath: Uri, type?: RunModelType) {
    this.dbtProjectContainer.buildModel(modelPath, type);
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

  async executeSQL(uri: Uri, query: string, title: string) {
    this.dbtProjectContainer.executeSQL(uri, query);
  }

  showCompiledSQL(modelPath: Uri) {
    this.dbtProjectContainer.showCompiledSQL(modelPath);
  }

  generateSchemaYML(modelPath: Uri) {
    const modelName = path.basename(modelPath.fsPath, ".sql");
    this.dbtProjectContainer.generateSchemaYML(modelPath, modelName);
  }

  showRunSQL(modelPath: Uri) {
    this.dbtProjectContainer.showRunSQL(modelPath);
  }

  createModelBasedonSourceConfig(params: GenerateModelFromSourceParams) {
    const project = this.dbtProjectContainer.findDBTProject(params.currentDoc);
    const sourcePath = path.dirname(params.currentDoc.fsPath);
    if (project) {
      project.generateModel(
        params.sourceName,
        params.database,
        params.schema,
        params.tableName,
        sourcePath
      );
    } else {
      window.showErrorMessage(
        "Could not generate model! If error persists please create a Github issue."
      );
    }
  }
}
