import { existsSync, statSync } from "fs";
import { inject } from "inversify";
import * as path from "path";
import {
  Diagnostic,
  Disposable,
  env,
  EventEmitter,
  FileSystemWatcher,
  languages,
  Range,
  RelativePattern,
  Uri,
  window,
  workspace,
  WorkspaceFolder,
} from "vscode";
import { YAMLError } from "yaml";
import { TelemetryService } from "../telemetry";
import { DBTProject } from "./dbtProject";
import { ProjectRegisteredUnregisteredEvent } from "./dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  RebuildManifestStatusChange,
} from "./event/manifestCacheChangedEvent";

import {
  DBT_PROJECT_FILE,
  DBTProjectDetection,
  DBTTerminal,
  isInsidePackagesPath,
  readAndParseProjectConfig,
  resolvePackagesInstallPath,
} from "@altimateai/dbt-integration";
import { getDbtIntegrationMode } from "./integrationMode";
import { ProjectStartQueue } from "./projectStartQueue";

// Sentinel for the empty-after-retries case in `retryWithBackoff`. Lets the
// caller distinguish "this folder has no dbt project" (silent, expected for
// multi-root workspaces) from a real `findFiles` failure (telemetry-worthy).
class NoProjectsFound extends Error {}

/**
 * Where dbt projects are not looked for: installed packages and Python
 * site-packages hold `dbt_project.yml` files that are not the user's projects.
 * Shared with the integration-mode decision, which lists projects the same way.
 */
export const PROJECT_EXCLUDE_PATTERN =
  "**/{dbt_packages,site-packages,dbt_internal_packages}";

export class DBTWorkspaceFolder implements Disposable {
  private watcher: FileSystemWatcher;
  readonly projectDiscoveryDiagnostics =
    languages.createDiagnosticCollection("dbt");
  private dbtProjects: DBTProject[] = [];
  /** Roots of the projects waiting in the start queue. */
  private waitingToStart = new Set<string>();
  private disposables: Disposable[] = [];
  private _onRebuildManifestStatusChange =
    new EventEmitter<RebuildManifestStatusChange>();
  readonly onRebuildManifestStatusChange =
    this._onRebuildManifestStatusChange.event;

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
    @inject("DBTTerminal")
    private dbtTerminal: DBTTerminal,
    public workspaceFolder: WorkspaceFolder,
    private _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
    private _onProjectRegisteredUnregistered: EventEmitter<ProjectRegisteredUnregisteredEvent>,
    private projectStartQueue: ProjectStartQueue,
  ) {
    this.watcher = this.createConfigWatcher();
    this.disposables.push(this.watcher);
  }

  getAllowListFolders() {
    const nonFilteredAllowListFolders = workspace
      .getConfiguration("dbt", this.workspaceFolder.uri)
      .get<string[]>("allowListFolders", [])
      .map((folder) => {
        if (!path.isAbsolute(folder)) {
          return path.join(this.workspaceFolder.uri.fsPath, folder);
        }
        return folder;
      });
    const allowListFolders = nonFilteredAllowListFolders.filter((folder) =>
      existsSync(folder),
    );
    if (nonFilteredAllowListFolders.length !== allowListFolders.length) {
      console.warn(
        "filtered out non-existing allowListFolders",
        allowListFolders,
        nonFilteredAllowListFolders,
      );
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
          throw new NoProjectsFound("no projects found. retrying");
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
    throw new NoProjectsFound("no projects found after maximum retries");
  }

  async discoverProjects() {
    const excludePattern = PROJECT_EXCLUDE_PATTERN;
    // Multi-root workspaces activate the extension when any folder contains
    // `dbt_project.yml`, but discoverProjects runs on every folder. A folder
    // that genuinely has no dbt project must resolve to an empty result
    // rather than fail activation. The constructor's `createConfigWatcher`
    // still watches this folder, so a project added later is picked up.
    let dbtProjectFiles: Uri[] = [];
    try {
      dbtProjectFiles = await this.retryWithBackoff(
        () =>
          workspace.findFiles(
            new RelativePattern(this.workspaceFolder, `**/${DBT_PROJECT_FILE}`),
            new RelativePattern(this.workspaceFolder, excludePattern),
          ),
        5,
        1000,
      );
    } catch (error) {
      if (!(error instanceof NoProjectsFound)) {
        this.telemetry.sendTelemetryError("discoverProjectsError", error);
      }
      dbtProjectFiles = [];
    }
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

    // Resolve the registered projects' packages paths once, rather than per
    // candidate inside the filter below.
    const packagesInstallPaths = this.knownPackagesInstallPaths();
    const projectDirectories = dbtProjectFiles
      .filter((uri) => existsSync(uri.fsPath) && statSync(uri.fsPath).isFile())
      .filter(
        (uri) => !this.isInstalledPackage(uri.fsPath, packagesInstallPaths),
      )
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

    const dbtIntegrationMode = getDbtIntegrationMode();

    const filteredProjects =
      await this.dbtProjectDetectionFactory().discoverProjects(
        projectDirectories.map((uri) => uri.fsPath),
      );

    if (filteredProjects.length > 20) {
      window.showWarningMessage(
        `Power User for dbt detected ${filteredProjects.length} projects in your workspace, this will negatively affect performance.`,
      );
    }

    this.dbtTerminal.info(
      "discoverProjects",
      "foundProjectsAfterProjectIntegrationFilter",
      false,
      filteredProjects,
    );

    // The project of the file being edited starts first, ahead of this
    // folder's projects and of those other folders queued already.
    const activeProject = this.innermostProjectOf(
      filteredProjects,
      window.activeTextEditor?.document.uri,
    );
    const startOrder = activeProject
      ? [activeProject, ...filteredProjects.filter((p) => p !== activeProject)]
      : filteredProjects;
    await Promise.all(
      startOrder.map(async (projectPath) => {
        await this.registerDBTProject(
          Uri.file(projectPath),
          projectPath === activeProject,
        );
      }),
    );
  }

  /** The deepest of `projectRoots` that holds `file`. */
  private innermostProjectOf(
    projectRoots: string[],
    file: Uri | undefined,
  ): string | undefined {
    if (file?.scheme !== "file") {
      return undefined;
    }
    return projectRoots
      .filter(
        (root) =>
          file.fsPath === root || file.fsPath.startsWith(root + path.sep),
      )
      .sort((a, b) => b.length - a.length)[0];
  }

  findDBTProject(uri: Uri): DBTProject | undefined {
    return this.dbtProjects.find((project) => project.contains(uri));
  }

  getProjects(): DBTProject[] {
    return this.dbtProjects;
  }

  contains(uri: Uri) {
    if (!uri?.fsPath) {
      return false;
    }
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
    this.waitingToStart.clear();
    this.dbtProjects.forEach((project) => project.dispose());
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  /**
   * Starts the project through the window's start queue: each start spawns
   * Python and parses the project, so a few run at a time. `first` puts it
   * ahead of the projects waiting.
   */
  private async registerDBTProject(uri: Uri, first = false) {
    const root = uri.fsPath;
    this.waitingToStart.add(root);
    await this.projectStartQueue.run(async () => {
      // Skipped when it was removed while it waited (its dbt_project.yml
      // deleted, or this folder closed), or when another event for the same
      // root, queued alongside it, started it.
      if (this.waitingToStart.delete(root)) {
        await this.startDBTProject(uri);
      }
    }, first);
  }

  private async startDBTProject(uri: Uri) {
    try {
      const projectConfig = readAndParseProjectConfig(uri.fsPath);
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
        const yamlDiagnostic = new Diagnostic(
          new Range(0, 0, 999, 999),
          error.message,
        );
        yamlDiagnostic.source = "Power User for dbt";
        yamlDiagnostic.code = {
          value: "Fix with Altimate Code",
          target: Uri.parse(
            `${env.uriScheme}://innoverio.vscode-dbt-power-user/troubleshoot?source=dbt&error=${encodeURIComponent(error.message)}`,
          ),
        };
        this.projectDiscoveryDiagnostics.set(
          Uri.joinPath(uri, DBT_PROJECT_FILE),
          [yamlDiagnostic],
        );
      }
      window.showErrorMessage(
        `Skipping project: could not parse dbt_project_config.yml at '${uri}': ${error}`,
      );
      this.telemetry.sendTelemetryError("registerDBTProjectError", error);
    }
  }

  private async unregisterDBTProject(uri: Uri) {
    // One still waiting to start never starts.
    this.waitingToStart.delete(uri.fsPath);
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
      new RelativePattern(this.workspaceFolder, `**/${DBT_PROJECT_FILE}`),
    );

    const dirName = (uri: Uri) => Uri.file(path.dirname(uri.fsPath));

    watcher.onDidCreate((uri) => {
      const allowListFolders = this.getAllowListFolders();
      if (
        existsSync(uri.fsPath) &&
        statSync(uri.fsPath).isFile() &&
        !this.isInstalledPackage(uri.fsPath) &&
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

  /**
   * A `dbt_project.yml` belonging to an installed package or a virtualenv,
   * rather than to a standalone project the user wants registered.
   *
   * The rule itself lives in `@altimateai/dbt-integration` so that every
   * consumer applies it identically; this only supplies the packages paths of
   * the projects registered in this folder.
   */
  private isInstalledPackage(
    fsPath: string,
    packagesInstallPaths: string[] = this.knownPackagesInstallPaths(),
  ): boolean {
    const isPackage = isInsidePackagesPath(fsPath, packagesInstallPaths);
    if (isPackage) {
      this.dbtTerminal.info(
        "discoverProjects",
        "foundProjectInPackagesPath",
        false,
        fsPath,
      );
    }
    return isPackage;
  }

  private knownPackagesInstallPaths(): string[] {
    return this.dbtProjects.map((project) => {
      // `getPackageInstallPath()` stays undefined until a project finishes
      // initializing, and `dbt deps` writes each package's `dbt_project.yml`
      // during that window — so a watcher event arriving mid-initialization
      // must not depend on it. Reading the configured path back out of
      // `dbt_project.yml` is synchronous and closes that gap.
      return (
        project.getPackageInstallPath() ??
        resolvePackagesInstallPath(project.projectRoot.fsPath)
      );
    });
  }
}
