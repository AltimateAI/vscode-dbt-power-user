import { FileSystemWatcher, RelativePattern, Uri, workspace } from "vscode";
import { arrayEquals, debounce } from "../../utils";
import { dbtProjectContainer } from "../dbtProjectContainer";
import { OnProjectConfigChanged, ProjectConfigChangedEvent } from "../event/projectConfigChangedEvent";
import { SourceFileChangedEvent } from "../event/sourceFileChangedEvent";

export class SourceFileWatchers implements OnProjectConfigChanged {
  private currentSourcePaths?: string[];
  private sourceFolderWatchers: FileSystemWatcher[] = [];

  public onProjectConfigChanged(event: ProjectConfigChangedEvent) {
    const { sourcePaths, projectRoot } = event;
    if (
      this.currentSourcePaths === undefined ||
      !arrayEquals(this.currentSourcePaths, sourcePaths)
    ) {
      sourcePaths.forEach(sourcePath => {
        const parsedSourcePath = Uri.parse(sourcePath);
        const globPattern = Uri.joinPath(parsedSourcePath, '**/*.sql').path.substring(1);
        const sourceFolderWatcher = workspace.createFileSystemWatcher(
          new RelativePattern(projectRoot, globPattern)
        );
        const event = new SourceFileChangedEvent(projectRoot);
        sourceFolderWatcher.onDidChange(() => debounce(() => dbtProjectContainer.raiseSourceFileChangedEvent(event), 2000)());
        this.sourceFolderWatchers.push(sourceFolderWatcher);
      });
      this.currentSourcePaths = sourcePaths;
    }
  };
}