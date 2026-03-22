import path = require("path");
import { RunModelType } from "@altimateai/dbt-integration";
import { Uri, window } from "vscode";
import { GenerateModelFromSourceParams } from "../code_lens_provider/sourceModelCreationCodeLensProvider";
import { DBTProjectContainer } from "../dbt_client/dbtProjectContainer";
import { toProjectQuickPickItem } from "../quickpick/projectQuickPick";
import { QueryManifestService } from "../services/queryManifestService";
import { NodeTreeItem } from "../treeview_provider/modelTreeviewProvider";
import { extendErrorWithSupportLinks } from "../utils";

export class RunModel {
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private queryManifestService: QueryManifestService,
  ) {}

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

  async compileQueryOnActiveWindow() {
    if (!window.activeTextEditor) {
      return;
    }
    // For untitled files, ensure a project is selected before capturing
    // editor state — the await may show a picker, during which the user
    // could switch editors.
    if (window.activeTextEditor.document.uri.scheme === "untitled") {
      const resolved = await this.ensureProjectForUntitledUri();
      if (!resolved) {
        return;
      }
    }
    // Re-read editor state after the await to avoid stale references
    if (!window.activeTextEditor) {
      return;
    }
    const fullPath = window.activeTextEditor.document.uri;
    const query = window.activeTextEditor.document.getText();
    if (query !== undefined) {
      this.compileDBTQuery(fullPath, query);
    }
  }

  /**
   * Ensures a dbt project is stored in workspace state for untitled files.
   * If no project is stored yet — or the stored project is stale (removed
   * between sessions) — falls back to getOrPickProjectFromWorkspace() which
   * auto-selects the single project or prompts the user to pick one.
   * Returns true if a project is available, false if the user cancelled or
   * no projects exist.
   */
  private async ensureProjectForUntitledUri(): Promise<boolean> {
    const selectedProject = this.dbtProjectContainer.getFromWorkspaceState(
      "dbtPowerUser.projectSelected",
    );
    if (selectedProject?.uri) {
      // Validate the stored project still exists in the workspace
      const raw = selectedProject.uri;
      const storedUri = Uri.file(raw.fsPath || raw.path);
      if (this.dbtProjectContainer.findDBTProject(storedUri)) {
        return true;
      }
      // Stale — clear it and fall through to re-pick
      this.dbtProjectContainer.setToWorkspaceState(
        "dbtPowerUser.projectSelected",
        undefined,
      );
    }
    const project =
      await this.queryManifestService.getOrPickProjectFromWorkspace();
    if (!project) {
      window.showErrorMessage("Unable to find dbt project for this query.");
      return false;
    }
    this.dbtProjectContainer.setToWorkspaceState(
      "dbtPowerUser.projectSelected",
      toProjectQuickPickItem(project),
    );
    return true;
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

  async executeQueryOnActiveWindow() {
    if (!window.activeTextEditor) {
      return;
    }
    // For untitled files, ensure a project is selected before capturing
    // editor state — the await may show a picker, during which the user
    // could switch editors.
    if (window.activeTextEditor.document.uri.scheme === "untitled") {
      const resolved = await this.ensureProjectForUntitledUri();
      if (!resolved) {
        return;
      }
    }
    // Re-read editor state after the await to avoid stale references
    const query = this.getQuery();
    if (query === undefined) {
      return;
    }
    const modelPath = window.activeTextEditor?.document.uri;
    if (!modelPath) {
      return;
    }
    const modelName =
      modelPath.scheme === "untitled"
        ? "untitled"
        : path.basename(modelPath.fsPath, ".sql");
    this.executeSQL(modelPath, query, modelName);
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
