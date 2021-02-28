import {
  Disposable,
  EventEmitter,
  FileSystemWatcher,
  RelativePattern,
  workspace,
  Event,
} from "vscode";
import { provideSingleton, setupWatcherHandler } from "../../utils";
import { DBTProject } from "../dbtProject";
import { ManifestCacheChangedEvent } from "../event/manifestCacheChangedEvent";
import { ManifestParser } from "../parsers";
import { ProjectConfigChangedEvent } from "../event/projectConfigChangedEvent";

@provideSingleton(TargetWatchersFactory)
export class TargetWatchersFactory {
  constructor(private manifestParser: ManifestParser) {}

  createTargetWatchers(
    _onManifestChanged: EventEmitter<ManifestCacheChangedEvent>,
    onProjectConfigChanged: Event<ProjectConfigChangedEvent>
  ) {
    return new TargetWatchers(_onManifestChanged, onProjectConfigChanged, this.manifestParser);
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
    private manifestParser: ManifestParser
  ) {
    this._onManifestChanged = _onManifestChanged;
    this.disposables.push(
      onProjectConfigChanged((event) => this.onProjectConfigChanged(event))
    );
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
    this.disposeWatchers();
  }

  private disposeWatchers() {
    this.watchers.forEach((watcher) => watcher.dispose());
  }

  private async onProjectConfigChanged(event: ProjectConfigChangedEvent) {
    const { targetPath, projectName, projectRoot } = event;
    if (
      this.currentTargetPath === undefined ||
      this.currentTargetPath !== targetPath ||
      this.currentProjectName === undefined ||
      this.currentProjectName !== projectName
    ) {
      this.disposeWatchers();
      this.watchers = [];

      const handler = async () => {
        const manifestCacheChangedEvent = await this.manifestParser.parseManifest(projectRoot, projectName, targetPath);
        this._onManifestChanged.fire(manifestCacheChangedEvent);
      };

      this.manifestWatcher = this.createManifestWatcher(event);
      setupWatcherHandler(this.manifestWatcher, () => handler());

      this.targetFolderWatcher = this.createTargetFolderWatcher(event);
      this.targetFolderWatcher.onDidDelete(() => () => handler());

      this.currentTargetPath = targetPath;
      this.currentProjectName = projectName;

      this.watchers.push(
        this.manifestWatcher,
        this.targetFolderWatcher
      );

      const manifestCacheChangedEvent = await this.manifestParser.parseManifest(projectRoot, projectName, targetPath);
      this._onManifestChanged.fire(manifestCacheChangedEvent);
    }
  }

  private createManifestWatcher(
    event: ProjectConfigChangedEvent
  ): FileSystemWatcher {
    const { targetPath, projectRoot } = event;
    const manifestWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(
        projectRoot.path,
        `${targetPath}/${DBTProject.MANIFEST_FILE}`
      )
    );
    return manifestWatcher;
  }

  private createTargetFolderWatcher(
    event: ProjectConfigChangedEvent
  ): FileSystemWatcher {
    const { targetPath, projectRoot } = event;
    const targetFolderWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(projectRoot.path, targetPath)
    );
    return targetFolderWatcher;
  }
}
