import {
  Disposable,
  Event,
  EventEmitter,
  FileSystemWatcher,
  RelativePattern,
  workspace,
} from "vscode";
import { provideSingleton, setupWatcherHandler } from "../../utils";
import { DBTProject } from "../dbtProject";
import { ManifestCacheChangedEvent } from "../event/manifestCacheChangedEvent";
import { ProjectConfigChangedEvent } from "../event/projectConfigChangedEvent";
import { ManifestParser } from "../parsers";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";

@provideSingleton(TargetWatchersFactory)
export class TargetWatchersFactory {
  constructor(
    private manifestParser: ManifestParser,
    private dbtTerminal: DBTTerminal,
  ) {}

  createTargetWatchers(
    _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
    onProjectConfigChanged: Event<ProjectConfigChangedEvent>,
  ) {
    return new TargetWatchers(
      _onManifestChanged,
      onProjectConfigChanged,
      this.manifestParser,
      this.dbtTerminal,
    );
  }
}

export class TargetWatchers implements Disposable {
  private manifestWatcher?: FileSystemWatcher;
  private targetFolderWatcher?: FileSystemWatcher;
  private currentTargetPath?: string;
  private currentProjectName?: string;
  private disposables: Disposable[] = [];
  private _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>;
  private watchers: FileSystemWatcher[] = [];

  constructor(
    _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
    onProjectConfigChanged: Event<ProjectConfigChangedEvent>,
    private manifestParser: ManifestParser,
    private dbtTerminal: DBTTerminal,
  ) {
    this._onManifestChanged = _onManifestChanged;
    this.disposables.push(
      onProjectConfigChanged((event) => this.onProjectConfigChanged(event)),
    );
  }

  dispose() {
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
    this.disposeWatchers();
  }

  private disposeWatchers() {
    this.watchers.forEach((watcher) => watcher.dispose());
  }

  private async onProjectConfigChanged(event: ProjectConfigChangedEvent) {
    const projectName = event.project.getProjectName();
    const targetPath = event.project.getTargetPath();
    if (!targetPath) {
      this.dbtTerminal.debug(
        "targetWatchers:onProjectConfigChanged",
        "targetPath should be defined at this stage for project " +
          event.project.projectRoot.fsPath,
      );
      return;
    }
    if (
      this.currentTargetPath === undefined ||
      this.currentTargetPath !== targetPath ||
      this.currentProjectName === undefined ||
      this.currentProjectName !== projectName
    ) {
      this.disposeWatchers();
      this.watchers = [];

      const handler = async () => {
        const manifestCacheChangedEvent =
          await this.manifestParser.parseManifest(event.project);
        if (manifestCacheChangedEvent) {
          this._onManifestChanged.fire(manifestCacheChangedEvent);
        }
      };

      this.manifestWatcher = this.createManifestWatcher(event);
      setupWatcherHandler(this.manifestWatcher, () => handler());

      this.targetFolderWatcher = this.createTargetFolderWatcher(event);
      this.targetFolderWatcher.onDidDelete(() => () => handler());

      this.currentTargetPath = targetPath;
      this.currentProjectName = projectName;

      this.watchers.push(this.manifestWatcher, this.targetFolderWatcher);

      const manifestCacheChangedEvent = await this.manifestParser.parseManifest(
        event.project,
      );
      if (manifestCacheChangedEvent) {
        this._onManifestChanged.fire(manifestCacheChangedEvent);
      }
    }
  }

  private createManifestWatcher(
    event: ProjectConfigChangedEvent,
  ): FileSystemWatcher {
    const targetPath = event.project.getTargetPath();
    if (!targetPath) {
      const error = new Error(
        "targetPath is undefined in " + event.project.projectRoot.fsPath,
      );
      this.dbtTerminal.error(
        "createManifestWatcherError",
        "targetPath is undefined",
        error,
      );
      throw error;
    }
    const projectRoot = event.project.projectRoot;
    const manifestWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(targetPath, DBTProject.MANIFEST_FILE),
    );
    return manifestWatcher;
  }

  private createTargetFolderWatcher(
    event: ProjectConfigChangedEvent,
  ): FileSystemWatcher {
    const targetPath = event.project.getTargetPath();
    if (!targetPath) {
      const error = new Error(
        "targetPath is undefined in " + event.project.projectRoot.fsPath,
      );
      this.dbtTerminal.error(
        "createTargetFolderWatcherError",
        "targetPath is undefined",
        error,
      );
      throw error;
    }
    const targetFolderWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(targetPath, "*"),
    );
    return targetFolderWatcher;
  }
}
