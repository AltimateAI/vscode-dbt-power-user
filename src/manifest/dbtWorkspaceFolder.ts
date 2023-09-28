import { statSync } from "fs";
import { inject } from "inversify";
import * as path from "path";
import {
  Diagnostic,
  Disposable,
  EventEmitter,
  FileSystemWatcher,
  languages,
  RelativePattern,
  Uri,
  Range,
  window,
  workspace,
  WorkspaceFolder,
} from "vscode";
import { DBTProject } from "./dbtProject";
import { ManifestCacheChangedEvent } from "./event/manifestCacheChangedEvent";
import { TelemetryService } from "../telemetry";
import { YAMLError } from "yaml";

export class DBTWorkspaceFolder implements Disposable {
  private watcher: FileSystemWatcher;
  private readonly projectDiscoveryDiagnostics =
    languages.createDiagnosticCollection("dbt");
  private dbtProjects: DBTProject[] = [];
  private disposables: Disposable[] = [];

  constructor(
    @inject("DBTProjectFactory")
    private dbtProjectFactory: (
      path: Uri,
      projectConfig: any,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
    ) => DBTProject,
    private telemetry: TelemetryService,
    private workspaceFolder: WorkspaceFolder,
    private _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
  ) {
    this.watcher = this.createConfigWatcher();
    this.disposables.push(this.watcher);
  }

  async discoverProjects() {
    const dbtProjectFiles = await workspace.findFiles(
      new RelativePattern(
        this.workspaceFolder,
        `**/${DBTProject.DBT_PROJECT_FILE}`,
      ),
      new RelativePattern(
        this.workspaceFolder,
        `**/{${DBTProject.DBT_MODULES.join(",")}}`,
      ),
    );
    const allowListFolders = workspace
      .getConfiguration("dbt")
      .get<string[]>("allowListFolders", [])
      .map((folder) => Uri.joinPath(Uri.file(this.workspaceFolder.uri.path), folder).fsPath);

    const projectFiles = dbtProjectFiles
      .filter((uri) => statSync(uri.fsPath).isFile())
      .filter((uri) => this.notInVenv(uri.fsPath))
      .filter((uri) =>
        allowListFolders.length === 0 || allowListFolders.some((folder) => uri.toString().includes(folder))
      )
      // TODO: also filter out projects within the target folder of another project
      //  This is somewhat difficult as we would need to parse the target-path variable of the project.
      .map((uri) => Uri.file(uri.path.split("/")!.slice(0, -1).join("/")));
    if (projectFiles.length > 20) {
      window.showWarningMessage(
        `dbt Power User detected ${projectFiles.length} projects in your work space, this will negatively affect performance.`,
      );
    }
    this.telemetry.sendTelemetryEvent(
      "discoverProjects",
      {},
      { numProjects: projectFiles.length },
    );
    return projectFiles.forEach((uri) => this.registerDBTProject(uri));
  }

  findDBTProject(uri: Uri): DBTProject | undefined {
    return this.dbtProjects.find((project) => project.contains(uri));
  }

  contains(uri: Uri) {
    return (
      uri.fsPath === this.workspaceFolder.uri.fsPath ||
      uri.fsPath.startsWith(this.workspaceFolder.uri.fsPath + path.sep)
    );
  }

  dispose() {
    this.dbtProjects.forEach((project) => project.dispose());
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private async registerDBTProject(uri: Uri) {
    try {
      const projectConfig = DBTProject.readAndParseProjectConfig(uri);
      const dbtProject = this.dbtProjectFactory(
        uri,
        projectConfig,
        this._onManifestChanged,
      );
      this.dbtProjects.push(dbtProject);
      // sorting the dbt projects descending by path ensures that we find the deepest path first
      this.dbtProjects.sort(
        (a, b) => -a.projectRoot.fsPath.localeCompare(b.projectRoot.fsPath),
      );
      this.projectDiscoveryDiagnostics.clear();
    } catch (error) {
      if (error instanceof YAMLError) {
        this.projectDiscoveryDiagnostics.set(
          Uri.joinPath(uri, DBTProject.DBT_PROJECT_FILE),
          [new Diagnostic(new Range(0, 0, 999, 999), error.message)],
        );
      }
      window.showErrorMessage(
        `Skipping project: could not parse dbt_project_config.yml at '${uri}': ${error}`,
      );
      this.telemetry.sendTelemetryError("registerDBTProjectError", error);
    }
  }

  private unregisterDBTProject(uri: Uri) {
    const projectToDelete = this.dbtProjects.find(
      (dbtProject) => dbtProject.projectRoot.fsPath === uri.fsPath,
    );
    if (projectToDelete === undefined) {
      return;
    }
    projectToDelete.dispose();
    this.dbtProjects.splice(this.dbtProjects.indexOf(projectToDelete));
  }

  private createConfigWatcher(): FileSystemWatcher {
    const watcher = workspace.createFileSystemWatcher(
      new RelativePattern(
        this.workspaceFolder,
        `**/${DBTProject.DBT_PROJECT_FILE}`,
      ),
    );

    const dirName = (uri: Uri) => Uri.file(path.dirname(uri.fsPath));

    watcher.onDidCreate((uri) => {
      if (
        this.notInVenv(uri.fsPath) &&
        this.notInDBtPackages(
          uri.fsPath,
          this.dbtProjects.map((project) => project.projectRoot),
        )
        // TODO: also filter out projects within the target folder of another project
        //  This is somewhat difficult as we would need to parse the target-path variable of the project.
      ) {
        this.registerDBTProject(dirName(uri));
      }
    });
    watcher.onDidDelete((uri) => this.unregisterDBTProject(dirName(uri)));
    this.disposables.push(watcher);
    return watcher;
  }

  private notInVenv(path: string): boolean {
    return !path.includes("site-packages");
  }

  private notInDBtPackages(uri: string, projectRoots: Uri[]) {
    for (const projectRoot of projectRoots) {
      const projectFsPath = projectRoot.fsPath;
      for (const dbtModulesPath of DBTProject.DBT_MODULES) {
        if (uri.startsWith(path.join(projectFsPath, dbtModulesPath))) {
          return false;
        }
      }
    }
    return true;
  }
}
