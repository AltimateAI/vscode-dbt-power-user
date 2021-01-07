import {
  EventEmitter,
  FileSystemWatcher,
  RelativePattern,
  Uri,
  workspace,
} from "vscode";
import { arrayEquals, debounce } from "../../utils";
import {
  OnProjectConfigChanged,
  ProjectConfigChangedEvent,
} from "../event/projectConfigChangedEvent";
import { SourceFileChangedEvent } from "../event/sourceFileChangedEvent";

export class SourceFileWatchers implements OnProjectConfigChanged {
  private static _onSourceFileChanged = new EventEmitter<SourceFileChangedEvent>();
  public static readonly onSourceFileChanged = SourceFileWatchers._onSourceFileChanged.event;
  private currentSourcePaths?: string[];
  private sourceFolderWatchers: FileSystemWatcher[] = [];

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
        const event = new SourceFileChangedEvent(projectRoot);

        const debouncedSourceFileChangedEvent = debounce(
          () => SourceFileWatchers._onSourceFileChanged.fire(event),
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
