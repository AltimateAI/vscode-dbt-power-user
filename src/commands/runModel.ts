import path = require("path");
import { RunModelType } from "@altimateai/dbt-integration";
import { Uri, window } from "vscode";
import { GenerateModelFromSourceParams } from "../code_lens_provider/sourceModelCreationCodeLensProvider";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { QueryManifestService } from "../services/queryManifestService";
import { NodeTreeItem } from "../treeview_provider/modelTreeviewProvider";
import { extendErrorWithSupportLinks } from "../utils";

export class RunModel {
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private queryManifestService: QueryManifestService,
  ) {}

  /**
   * Returns the singular test name for the given file URI, or undefined if
   * the file is not a singular data test in the current project's manifest.
   *
   * Singular tests are SQL files under the project's configured `test-paths`
   * that appear in the manifest as test resources without `test_metadata`
   * (generic tests have `test_metadata`, singular tests do not).
   */
  private getSingularTestName(uri: Uri): string | undefined {
    const event = this.queryManifestService.getEventByDocument(uri);
    if (!event) {
      return undefined;
    }
    const filePath = uri.fsPath;
    for (const [name, testData] of event.testMetaMap) {
      // Singular tests have no `test_metadata` (that's reserved for generic
      // tests like `not_null`, `unique`, etc.). Match by file path so we
      // don't rely on hardcoded `tests/` and honor project `test-paths`.
      if (testData.test_metadata === undefined && testData.path === filePath) {
        return name;
      }
    }
    return undefined;
  }

  runModelOnActiveWindow(type?: RunModelType) {
    if (!window.activeTextEditor) {
      return;
    }
    const fullPath = window.activeTextEditor.document.uri;

    // If this is a singular test file, run it as a test regardless of the
    // requested RunModelType — `dbt run` on a test file is never meaningful.
    // Also handles the "Run Test" command palette entry, which falls through
    // here with `type === RunModelType.TEST` when invoked without a tree item.
    const singularTestName = this.getSingularTestName(fullPath);
    if (singularTestName !== undefined) {
      this.runDBTTest(fullPath, singularTestName);
      return;
    }

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

    // Singular tests must be selected by their own test name, not by the
    // surrounding model. For generic tests attached to models, fall back to
    // the existing model-test path which selects tests that reference the
    // current model.
    const singularTestName = this.getSingularTestName(fullPath);
    if (singularTestName !== undefined) {
      this.runDBTTest(fullPath, singularTestName);
      return;
    }

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

  private getQuery() {
    if (!window.activeTextEditor) {
      return;
    }
    const cursor = window.activeTextEditor.selection;
    return window.activeTextEditor.document.getText(
      cursor.isEmpty ? undefined : cursor,
    );
  }

  executeQueryOnActiveWindow() {
    const query = this.getQuery();
    if (query === undefined) {
      return;
    }
    const modelPath = window.activeTextEditor?.document.uri;
    if (modelPath) {
      const modelName = path.basename(modelPath.fsPath, ".sql");
      this.executeSQL(window.activeTextEditor!.document.uri, query, modelName);
    }
  }

  runModelOnNodeTreeItem(type: RunModelType) {
    return (model?: NodeTreeItem) => {
      if (model === undefined) {
        this.runModelOnActiveWindow(type);
        return;
      }
      if (!model.url) {
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
        case RunModelType.BUILD_CHILDREN:
        case RunModelType.BUILD_CHILDREN_PARENTS:
        case RunModelType.BUILD_PARENTS: {
          // Catch Parents || Children RunTypes
          this.buildDBTModel(Uri.file(model.url), type);
          break;
        }
        case RunModelType.RUN_CHILDREN:
        case RunModelType.RUN_PARENTS: {
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

  generateDBTDocsOnActiveWindow() {
    const fullPath = window.activeTextEditor?.document.uri;
    if (fullPath !== undefined) {
      this.generateDBTDocs(fullPath);
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

  generateDBTDocs(modelPath: Uri, type?: RunModelType) {
    this.dbtProjectContainer.generateDocs(modelPath);
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

  async executeSQL(uri: Uri, query: string, modelName: string) {
    this.dbtProjectContainer.executeSQL(uri, query, modelName);
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
      project.generateModel(params.sourceName, params.tableName, sourcePath);
    } else {
      window.showErrorMessage(
        extendErrorWithSupportLinks(
          "Could not generate model! No project found for " +
            params.currentDoc.fsPath +
            ".",
        ),
      );
    }
  }
}
