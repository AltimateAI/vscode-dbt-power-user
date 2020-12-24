import * as vscode from "vscode";
import { readFileSync } from "fs";
import { safeLoad } from "js-yaml";
import * as path from "path";
import { arrayEquals, debounce } from "../utils";
import { dbtProjectContainer } from "./dbtProjectContainer";
import { SourceFileChangedEvent } from "./sourceFileChangedEvent";
import { ManifestChangedHandler } from "./manifestChangedHandler";

export class DBTProject {
  static DBT_PROJECT_FILE = "dbt_project.yml";
  static DBT_MODULES = "dbt_modules";
  static MANIFEST_FILE = "manifest.json";
  static RUN_RESULTS_FILE = "run_results.json";
  private static TARGET_PATH_VAR = "target-path";
  private static SOURCE_PATHS_VAR = "source-paths";

  private dbtProjectWatcher?: vscode.FileSystemWatcher;
  private manifestWatcher?: vscode.FileSystemWatcher;
  private runResultsWatcher?: vscode.FileSystemWatcher;
  private targetFolderWatcher?: vscode.FileSystemWatcher;
  private sourceFolderWatchers: vscode.FileSystemWatcher[] = [];
  private currentTargetPath?: string;
  private currentSourcePaths?: string[];
  private projectRoot: vscode.Uri;
  private manifestChangedHandler?: ManifestChangedHandler;

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
    this.createProjectConfigWatcher();
    const projectConfig = this.readAndParseProjectConfig();

    const projectName = projectConfig.name;
    const targetPath = projectConfig[DBTProject.TARGET_PATH_VAR] as string;
    const sourcePaths = projectConfig[DBTProject.SOURCE_PATHS_VAR] as string[];

    this.createTargetWatchers(targetPath);
    this.createSourceWatchers(sourcePaths);

    this.manifestChangedHandler = new ManifestChangedHandler(this.projectRoot, projectName);
    this.manifestChangedHandler.parseManifest(targetPath);
  }

  private createProjectConfigWatcher() {
    if (this.dbtProjectWatcher === undefined) {
      this.dbtProjectWatcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(
          this.projectRoot.path,
          DBTProject.DBT_PROJECT_FILE
        )
      );
      this.setupRefreshHandler(this.dbtProjectWatcher);
    }
  }

  private createTargetWatchers(targetPath: string) {
    if (
      this.currentTargetPath === undefined ||
      this.currentTargetPath !== targetPath
    ) {
      this.manifestWatcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(
          this.projectRoot.path,
          `${targetPath}/${DBTProject.MANIFEST_FILE}`
        )
      );
      this.setupRefreshHandler(this.manifestWatcher);

      this.runResultsWatcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(
          this.projectRoot.path,
          `${targetPath}/${DBTProject.RUN_RESULTS_FILE}`
        )
      );
      this.setupRefreshHandler(this.runResultsWatcher);

      this.targetFolderWatcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(this.projectRoot.path, targetPath)
      );
      this.targetFolderWatcher.onDidDelete(() => this.tryRefresh());

      this.currentTargetPath = targetPath;
    }
  }

  private createSourceWatchers(sourcePaths: string[]) {
    if (
      this.currentSourcePaths === undefined ||
      !arrayEquals(this.currentSourcePaths, sourcePaths)
    ) {
      this.sourceFolderWatchers = [];
      sourcePaths.forEach(sourcePath => {
        const parsedSourcePath = vscode.Uri.parse(sourcePath);
        const globPattern = vscode.Uri.joinPath(parsedSourcePath, '**/*.sql').path.substring(1);
        const sourceFolderWatcher = vscode.workspace.createFileSystemWatcher(
          new vscode.RelativePattern(this.projectRoot, globPattern)
        );
        const event = new SourceFileChangedEvent(this.projectRoot);
        sourceFolderWatcher.onDidChange(() => debounce(() => dbtProjectContainer.raiseSourceFileChangedEvent(event), 1000)());
        this.sourceFolderWatchers.push(sourceFolderWatcher);
      });
      this.currentSourcePaths = sourcePaths;
    }
  }

  private setupRefreshHandler(watcher: vscode.FileSystemWatcher): void {
    watcher.onDidChange(() => this.tryRefresh());
    watcher.onDidCreate(() => this.tryRefresh());
    watcher.onDidDelete(() => this.tryRefresh());
  }
}
