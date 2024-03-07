import {
  Disposable,
  Event,
  EventEmitter,
  FileSystemWatcher,
  RelativePattern,
  Uri,
  workspace,
} from "vscode";
import { arrayEquals, debounce, provideSingleton } from "../../utils";
import { ProjectConfigChangedEvent } from "../event/projectConfigChangedEvent";

@provideSingleton(SourceFileWatchersFactory)
export class SourceFileWatchersFactory {
  createSourceFileWatchers(
    onProjectConfigChanged: Event<ProjectConfigChangedEvent>,
  ) {
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

  private onProjectConfigChanged(event: ProjectConfigChangedEvent) {
    const project = event.project;
    // TODO: these things can change so we should recreate them if project config changes
    const sourcePaths = project.getModelPaths();
    if (sourcePaths === undefined) {
      throw new Error(
        "sourcePaths is not defined in project in " +
          project.projectRoot.fsPath,
      );
    }
    const macroPaths = project.getMacroPaths();
    if (macroPaths === undefined) {
      throw new Error(
        "macroPaths is not defined in " + project.projectRoot.fsPath,
      );
    }
    const paths = sourcePaths.concat(macroPaths);
    if (
      this.currentSourcePaths === undefined ||
      !arrayEquals(this.currentSourcePaths, sourcePaths)
    ) {
      this.disposeWatchers();
      this.watchers = [];
      paths.forEach((sourcePath) => {
        const sourceFolderWatcher = workspace.createFileSystemWatcher(
          new RelativePattern(sourcePath, "**/*.{sql,yml,yaml}"),
        );

        const debouncedSourceFileChangedEvent = debounce(
          () => this._onSourceFileChanged.fire(),
          500,
        );

        sourceFolderWatcher.onDidChange(() =>
          debouncedSourceFileChangedEvent(),
        );
        this.watchers.push(sourceFolderWatcher);
      });
      this.currentSourcePaths = sourcePaths;
    }
  }
}
