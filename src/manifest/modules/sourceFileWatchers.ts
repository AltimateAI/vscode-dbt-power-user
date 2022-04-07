import {
  Disposable,
  EventEmitter,
  FileSystemWatcher,
  RelativePattern,
  Uri,
  workspace,
  Event,
} from "vscode";
import { arrayEquals, debounce, provideSingleton } from "../../utils";
import { ProjectConfigChangedEvent } from "../event/projectConfigChangedEvent";

@provideSingleton(SourceFileWatchersFactory)
export class SourceFileWatchersFactory {
  createSourceFileWatchers(onProjectConfigChanged: Event<ProjectConfigChangedEvent>) {
    return new SourceFileWatchers(onProjectConfigChanged);
  }
}

export class SourceFileWatchers implements Disposable {
  private _onSourceFileChanged = new EventEmitter<void>();
  public readonly onSourceFileChanged = this._onSourceFileChanged.event;
  private currentSourcePaths?: string[];
  private watchers: FileSystemWatcher[] = [];
  private disposables: Disposable[] = [this._onSourceFileChanged];

  constructor(onProjectConfigChanged: Event<ProjectConfigChangedEvent>) {
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

  private onProjectConfigChanged(event: ProjectConfigChangedEvent) {
    const { sourcePaths, projectRoot } = event;
    if (
      this.currentSourcePaths === undefined ||
      !arrayEquals(this.currentSourcePaths, sourcePaths)
    ) {
      this.disposeWatchers();
      this.watchers = [];
      sourcePaths.forEach((sourcePath) => {
        const parsedSourcePath = Uri.parse(sourcePath);
        const globPattern = Uri.joinPath(
          parsedSourcePath,
          "**/*.sql"
        ).path.substring(1);
        const sourceFolderWatcher = workspace.createFileSystemWatcher(
          new RelativePattern(projectRoot, globPattern)
        );

        const debouncedSourceFileChangedEvent = debounce(
          () => this._onSourceFileChanged.fire(),
          2000
        );

        sourceFolderWatcher.onDidChange(() =>
          debouncedSourceFileChangedEvent()
        );
        this.watchers.push(sourceFolderWatcher);
      });
      this.currentSourcePaths = sourcePaths;
    }
  }
}
