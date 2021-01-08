import {
  Disposable,
  EventEmitter,
  FileSystemWatcher,
  RelativePattern,
  Uri,
  workspace,
  Event,
} from "vscode";
import { arrayEquals, debounce } from "../../utils";
import { ProjectConfigChangedEvent } from "../event/projectConfigChangedEvent";

export class SourceFileWatchers implements Disposable {
  private _onSourceFileChanged = new EventEmitter<void>();
  public readonly onSourceFileChanged = this._onSourceFileChanged.event;
  private currentSourcePaths?: string[];
  private sourceFolderWatchers: FileSystemWatcher[] = [];
  private disposables: Disposable[] = [
    this._onSourceFileChanged,
    ...this.sourceFolderWatchers,
  ];

  constructor(onProjectConfigChanged: Event<ProjectConfigChangedEvent>) {
    onProjectConfigChanged((event) => this.onProjectConfigChanged(event));
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }

  onProjectConfigChanged(event: ProjectConfigChangedEvent) {
    const { sourcePaths, projectRoot } = event;
    if (
      this.currentSourcePaths === undefined ||
      !arrayEquals(this.currentSourcePaths, sourcePaths)
    ) {
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
        this.sourceFolderWatchers.push(sourceFolderWatcher);
      });
      this.currentSourcePaths = sourcePaths;
    }
  }
}
