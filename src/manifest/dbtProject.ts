import * as vscode from "vscode";
import { readFileSync } from "fs";
import { safeLoad } from "js-yaml";
import * as path from "path";
import { arrayEquals } from "../utils";
import { ProjectConfigWatcherFactory } from "./watchers/projectConfigWatcherFactory";
import { SourceFileWatcherFactory } from "./watchers/sourceFileWatcherFactory";
import { TargetWatchers } from "./watchers/targetWatchers";

export class DBTProject {
  static DBT_PROJECT_FILE = "dbt_project.yml";
  static DBT_MODULES = "dbt_modules";
  static MANIFEST_FILE = "manifest.json";
  static RUN_RESULTS_FILE = "run_results.json";
  private static TARGET_PATH_VAR = "target-path";
  private static SOURCE_PATHS_VAR = "source-paths";

  private dbtProjectWatcher?: vscode.FileSystemWatcher;
  private sourceFolderWatchers?: vscode.FileSystemWatcher[];
  private currentSourcePaths?: string[];
  private projectRoot: vscode.Uri;

  constructor(path: vscode.Uri) {
    this.projectRoot = path;
  }

  async tryRefresh() {
    try {
      await this.refresh();
    } catch (error) {
      console.log(
        "We should never come here, means that our exceptions are not handled!",
        error
      );
    }
  }

  readAndParseProjectConfig() {
    const dbtProjectYamlFile = readFileSync(
      path.join(this.projectRoot.fsPath, DBTProject.DBT_PROJECT_FILE),
      "utf8"
    );
    return safeLoad(dbtProjectYamlFile) as any;
  }

  private async refresh() {
    if (this.dbtProjectWatcher === undefined) {
      this.dbtProjectWatcher = ProjectConfigWatcherFactory.createProjectConfigWatcher(this.projectRoot, () => this.tryRefresh());
    }
    const projectConfig = this.readAndParseProjectConfig();

    const projectName = projectConfig.name;
    const targetPath = projectConfig[DBTProject.TARGET_PATH_VAR] as string;
    const sourcePaths = projectConfig[DBTProject.SOURCE_PATHS_VAR] as string[];

    await new TargetWatchers(this.projectRoot, targetPath, projectName).createTargetWatchers();
    this.createSourceWatchers(sourcePaths);
  }

  private createSourceWatchers(sourcePaths: string[]) { // TODO create separate class as well
    if (
      this.currentSourcePaths === undefined ||
      !arrayEquals(this.currentSourcePaths, sourcePaths)
    ) {
      this.sourceFolderWatchers = SourceFileWatcherFactory.createSourceFileWatchers(this.projectRoot, sourcePaths);
      this.currentSourcePaths = sourcePaths;
    }
  }
}
