import { join } from "path";
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

@provideSingleton(TargetWatchersFactory)
export class TargetWatchersFactory {
  constructor(private manifestParser: ManifestParser) {}

  createTargetWatchers(
    _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
    onProjectConfigChanged: Event<ProjectConfigChangedEvent>,
  ) {
    return new TargetWatchers(
      _onManifestChanged,
      onProjectConfigChanged,
      this.manifestParser,
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
      console.error("targetPath should be defined at this stage!");
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
      console.error("targetPath is undefined");
      throw new Error("targetPath is undefined");
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
      console.error("targetPath is undefined");
      throw new Error("targetPath is undefined");
    }
    const targetFolderWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(targetPath, "*"),
    );
    return targetFolderWatcher;
  }
}
