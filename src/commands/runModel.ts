import path = require("path");
import { Uri, window } from "vscode";
import { GenerateModelFromSourceParams } from "../code_lens_provider/sourceModelCreationCodeLensProvider";
import { RunModelType } from "../domain";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { NodeTreeItem } from "../treeview_provider/modelTreeviewProvider";
import { provideSingleton } from "../utils";
import TelemetryService from "../telemetry";

const telemetryService = TelemetryService.getInstance();
@provideSingleton(RunModel)
export class RunModel {
  constructor(private dbtProjectContainer: DBTProjectContainer) {}

  @telemetryService.withTelemetry("runModelOnActiveWindow")
  runModelOnActiveWindow(type?: RunModelType) {
    if (!window.activeTextEditor) {
      return;
    }
    const fullPath = window.activeTextEditor.document.uri;
    this.runDBTModel(fullPath, type);
    TelemetryService.getInstance().sendTelemetryEvent("runModelOnActiveWindow");
  }

  @telemetryService.withTelemetry("buildModelOnActiveWindow")
  buildModelOnActiveWindow(type?: RunModelType) {
    if (!window.activeTextEditor) {
      return;
    }
    const fullPath = window.activeTextEditor.document.uri;
    this.buildDBTModel(fullPath, type);
  }

  @telemetryService.withTelemetry("runTestsOnActiveWindow")
  runTestsOnActiveWindow() {
    if (!window.activeTextEditor) {
      return;
    }
    const fullPath = window.activeTextEditor.document.uri;
    this.runDBTModelTest(fullPath);
  }

  @telemetryService.withTelemetry("compileModelOnActiveWindow")
  compileModelOnActiveWindow() {
    if (!window.activeTextEditor) {
      return;
    }
    const fullPath = window.activeTextEditor.document.uri;
    this.compileDBTModel(fullPath);
  }

  @telemetryService.withTelemetry("compileQueryOnActiveWindow")
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

  @telemetryService.withTelemetry("executeQueryOnActiveWindow")
  executeQueryOnActiveWindow() {
    if (!window.activeTextEditor) {
      return;
    }
    const cursor = window.activeTextEditor.selection;
    const query = window.activeTextEditor.document.getText(
      cursor.isEmpty ? undefined : cursor,
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
              model.label.toString().split(".")[0],
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

  @telemetryService.withTelemetry("showCompiledSQLOnActiveWindow")
  showCompiledSQLOnActiveWindow() {
    const fullPath = window.activeTextEditor?.document.uri;
    if (fullPath !== undefined) {
      this.showCompiledSQL(fullPath);
    }
  }
  @telemetryService.withTelemetry("generateSchemaYMLOnActiveWindow")
  generateSchemaYMLOnActiveWindow() {
    const fullPath = window.activeTextEditor?.document.uri;
    if (fullPath !== undefined) {
      this.generateSchemaYML(fullPath);
    }
  }
  @telemetryService.withTelemetry("showRunSQLOnActiveWindow")
  showRunSQLOnActiveWindow() {
    const fullPath = window.activeTextEditor?.document.uri;
    if (fullPath !== undefined) {
      this.showRunSQL(fullPath);
    }
  }

  @telemetryService.withTelemetry("generateDBTDocsOnActiveWindow")
  generateDBTDocsOnActiveWindow() {
    const fullPath = window.activeTextEditor?.document.uri;
    if (fullPath !== undefined) {
      this.generateDBTDocs(fullPath);
    }
  }

  @telemetryService.withTelemetry("runDBTModel")
  runDBTModel(modelPath: Uri, type?: RunModelType) {
    this.dbtProjectContainer.runModel(modelPath, type);
  }

  buildDBTModel(modelPath: Uri, type?: RunModelType) {
    this.dbtProjectContainer.buildModel(modelPath, type);
  }

  compileDBTModel(modelPath: Uri, type?: RunModelType) {
    this.dbtProjectContainer.compileModel(modelPath, type);
  }

  @telemetryService.withTelemetry("generateDBTDocs")
  generateDBTDocs(modelPath: Uri, type?: RunModelType) {
    this.dbtProjectContainer.generateDocs(modelPath);
  }

  compileDBTQuery(modelPath: Uri, query: string) {
    this.dbtProjectContainer.compileQuery(modelPath, query);
  }

  @telemetryService.withTelemetry("runDBTTest")
  runDBTTest(modelPath: Uri, testName: string) {
    this.dbtProjectContainer.runTest(modelPath, testName);
  }
  @telemetryService.withTelemetry("runDBTModelTest")
  runDBTModelTest(modelPath: Uri) {
    const modelName = path.basename(modelPath.fsPath, ".sql");
    this.dbtProjectContainer.runModelTest(modelPath, modelName);
  }
  @telemetryService.withTelemetry("executeSQL")
  async executeSQL(uri: Uri, query: string, title: string) {
    this.dbtProjectContainer.executeSQL(uri, query);
  }

  @telemetryService.withTelemetry("showCompiledSQL")
  showCompiledSQL(modelPath: Uri) {
    this.dbtProjectContainer.showCompiledSQL(modelPath);
  }
  @telemetryService.withTelemetry("generateSchemaYML")
  generateSchemaYML(modelPath: Uri) {
    const modelName = path.basename(modelPath.fsPath, ".sql");
    this.dbtProjectContainer.generateSchemaYML(modelPath, modelName);
  }
  @telemetryService.withTelemetry("showRunSQL")
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
        sourcePath,
      );
    } else {
      window.showErrorMessage(
        "Could not generate model! If error persists please create a Github issue.",
      );
    }
  }
}
