import { existsSync, statSync } from "fs";
import { inject, postConstruct } from "inversify";
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
import {
  ManifestCacheChangedEvent,
  RebuildManifestStatusChange,
} from "./event/manifestCacheChangedEvent";
import { TelemetryService } from "../telemetry";
import { YAMLError } from "yaml";
import { ProjectRegisteredUnregisteredEvent } from "./dbtProjectContainer";

import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DBTProjectDetection } from "src/dbt_client/dbtIntegration";

export class DBTWorkspaceFolder implements Disposable {
  private watcher: FileSystemWatcher;
  readonly projectDiscoveryDiagnostics =
    languages.createDiagnosticCollection("dbt");
  private dbtProjects: DBTProject[] = [];
  private disposables: Disposable[] = [];
  private _onRebuildManifestStatusChange =
    new EventEmitter<RebuildManifestStatusChange>();
  readonly onRebuildManifestStatusChange =
    this._onRebuildManifestStatusChange.event;
  private dbtProjectDetection: DBTProjectDetection | undefined;

  constructor(
    @inject("DBTProjectFactory")
    private dbtProjectFactory: (
      path: Uri,
      projectConfig: any,
      _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
    ) => DBTProject,
    @inject("Factory<DBTProjectDetection>")
    private dbtProjectDetectionFactory: () => DBTProjectDetection,
    private telemetry: TelemetryService,
    private dbtTerminal: DBTTerminal,
    public workspaceFolder: WorkspaceFolder,
    private _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
    private _onProjectRegisteredUnregistered: EventEmitter<ProjectRegisteredUnregisteredEvent>,
  ) {
    this.watcher = this.createConfigWatcher();
    this.disposables.push(this.watcher);
  }

  getAllowListFolders() {
    const nonFilteredAlolowListFolders = workspace
      .getConfiguration("dbt")
      .get<string[]>("allowListFolders", [])
      .map((folder) => {
        if (!path.isAbsolute(folder)) {
          return path.join(this.workspaceFolder.uri.fsPath, folder);
        }
        return folder;
      });
    const allowListFolders = nonFilteredAlolowListFolders.filter((folder) =>
      existsSync(folder),
    );
    if (nonFilteredAlolowListFolders.length === allowListFolders.length) {
      console.warn(
        "filtered out non-existing allowListFolders",
        allowListFolders,
        nonFilteredAlolowListFolders,
      );
      this.telemetry.sendTelemetryEvent("nonExistingAllowListFolders");
    }
    return allowListFolders;
  }

  private async retryWithBackoff<T>(
    fn: () => Thenable<T>,
    retries: number = 5,
    backoff: number = 1000,
  ): Promise<T> {
    let attempt = 0;
    while (attempt < retries) {
      try {
        const result = await fn();
        if (Array.isArray(result) && result.length === 0) {
          this.dbtTerminal.debug(
            "discoverProjects",
            "no projects found. retrying...",
            false,
          );
          throw new Error("no projects found. retrying");
        }
        return result;
      } catch (error) {
        attempt++;
        if (attempt >= retries) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, backoff * attempt));
      }
    }
    this.dbtTerminal.debug(
      "discoverProjects",
      "no projects found after maximum retries",
      false,
    );
    throw new Error("no projects found after maximum retries");
  }

  async discoverProjects() {
    // Ignore dbt_packages and venv/site-packages/dbt project folders
    const excludePattern =
      "**/{dbt_packages,site-packages,dbt_internal_packages}";
    const dbtProjectFiles = await this.retryWithBackoff(
      () =>
        workspace.findFiles(
          new RelativePattern(
            this.workspaceFolder,
            `**/${DBTProject.DBT_PROJECT_FILE}`,
          ),
          new RelativePattern(this.workspaceFolder, excludePattern),
        ),
      5,
      1000,
    );
    this.dbtTerminal.info(
      "discoverProjects",
      "foundProjects",
      false,
      dbtProjectFiles,
    );

    const allowListFolders = this.getAllowListFolders();
    this.dbtTerminal.info(
      "discoverProjects",
      "allowListFolders",
      false,
      allowListFolders,
    );

    const projectDirectories = dbtProjectFiles
      .filter((uri) => existsSync(uri.fsPath) && statSync(uri.fsPath).isFile())
      .filter((uri) => this.notInVenv(uri.fsPath))
      .filter((uri) => {
        return (
          allowListFolders.length === 0 ||
          allowListFolders.some((folder) => uri.fsPath.startsWith(folder))
        );
      })
      .map((uri) => Uri.file(uri.path.split("/")!.slice(0, -1).join("/")));

    this.dbtTerminal.info(
      "discoverProjects",
      "foundProjectsAfterFilter",
      false,
      projectDirectories,
    );

    this.telemetry.sendTelemetryEvent(
      "discoverProjects",
      {},
      { numProjects: projectDirectories.length },
    );

    const dbtIntegrationMode = workspace
      .getConfiguration("dbt")
      .get<string>("dbtIntegration", "core");

    const filteredProjects =
      await this.dbtProjectDetectionFactory().discoverProjects(
        projectDirectories,
      );

    this.dbtTerminal.info(
      "discoverProjects",
      "foundProjectsAfterProjectIntegrationFilter",
      false,
      filteredProjects,
    );

    await Promise.all(
      filteredProjects.map(async (uri) => {
        await this.registerDBTProject(uri);
      }),
    );
  }

  findDBTProject(uri: Uri): DBTProject | undefined {
    return this.dbtProjects.find((project) => project.contains(uri));
  }

  getProjects(): DBTProject[] {
    return this.dbtProjects;
  }

  contains(uri: Uri) {
    return (
      uri.fsPath === this.workspaceFolder.uri.fsPath ||
      uri.fsPath.startsWith(this.workspaceFolder.uri.fsPath + path.sep)
    );
  }

  getAdapters(): string[] {
    return Array.from(
      new Set<string>(
        this.dbtProjects.map((project) => project.getAdapterType()),
      ),
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
      this.disposables.push(
        dbtProject.onRebuildManifestStatusChange((e) => {
          this._onRebuildManifestStatusChange.fire(e);
        }),
      );
      this.dbtProjects.push(dbtProject);
      // sorting the dbt projects descending by path ensures that we find the deepest path first
      this.dbtProjects.sort(
        (a, b) => -a.projectRoot.fsPath.localeCompare(b.projectRoot.fsPath),
      );
      await dbtProject.initialize();
      this.projectDiscoveryDiagnostics.clear();
      this._onProjectRegisteredUnregistered.fire({
        root: uri,
        name: dbtProject.getProjectName(),
        registered: true,
      });
    } catch (error) {
      this.dbtTerminal.error(
        "registerDBTProject",
        `Unable to register dbt project for ${uri.fsPath}`,
        error,
      );
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

  private async unregisterDBTProject(uri: Uri) {
    const projectToDelete = this.dbtProjects.find(
      (dbtProject) => dbtProject.projectRoot.fsPath === uri.fsPath,
    );
    if (projectToDelete === undefined) {
      return;
    }
    this.dbtProjects.splice(this.dbtProjects.indexOf(projectToDelete), 1);
    this._onProjectRegisteredUnregistered.fire({
      root: uri,
      name: projectToDelete.getProjectName(),
      registered: false,
    });
    await projectToDelete.dispose();
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
      const allowListFolders = this.getAllowListFolders();
      if (
        existsSync(uri.fsPath) &&
        statSync(uri.fsPath).isFile() &&
        this.notInVenv(uri.fsPath) &&
        this.notInDBtPackages(
          uri.fsPath,
          this.dbtProjects.map((project) => project.getPackageInstallPath()),
        ) &&
        (allowListFolders.length === 0 ||
          allowListFolders.some((folder) => uri.fsPath.startsWith(folder)))
      ) {
        this.registerDBTProject(dirName(uri));
      }
    });
    watcher.onDidDelete((uri) => this.unregisterDBTProject(dirName(uri)));
    this.disposables.push(watcher);
    return watcher;
  }

  private notInVenv(path: string): boolean {
    const notInVenv = !path.includes("site-packages");
    if (!notInVenv) {
      this.dbtTerminal.info(
        "discoverProjects",
        "foundProjectInVenv",
        false,
        path,
      );
    }
    return notInVenv;
  }

  private notInDBtPackages(
    uri: string,
    packagesInstallPaths: (string | undefined)[],
  ) {
    for (const packagesInstallPath of packagesInstallPaths) {
      if (packagesInstallPath) {
        if (uri.startsWith(packagesInstallPath)) {
          return false;
        }
      }
    }
    return true;
  }
}
