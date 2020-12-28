import { FileSystemWatcher, RelativePattern, Uri, workspace } from "vscode";
import { arrayEquals, debounce } from "../../utils";
import { dbtProjectContainer } from "../dbtProjectContainer";
import { SourceFileChangedEvent } from "../sourceFileChangedEvent";

export class SourceFileWatchers {
  private sourcePaths: string[];
  private currentSourcePaths?: string[];
  private projectRoot: Uri;
  private sourceFolderWatchers: FileSystemWatcher[] = [];

  constructor(projectRoot: Uri, sourcePaths: string[]) {
    this.projectRoot = projectRoot;
    this.sourcePaths = sourcePaths;
  }

  public createSourceFileWatchers() {
    if (
      this.currentSourcePaths === undefined ||
      !arrayEquals(this.currentSourcePaths, this.sourcePaths)
    ) {
      this.sourcePaths.forEach(sourcePath => {
        const parsedSourcePath = Uri.parse(sourcePath);
        const globPattern = Uri.joinPath(parsedSourcePath, '**/*.sql').path.substring(1);
        const sourceFolderWatcher = workspace.createFileSystemWatcher(
          new RelativePattern(this.projectRoot, globPattern)
        );
        const event = new SourceFileChangedEvent(this.projectRoot);
        sourceFolderWatcher.onDidChange(() => debounce(() => dbtProjectContainer.raiseSourceFileChangedEvent(event), 2000)());
        this.sourceFolderWatchers.push(sourceFolderWatcher);
      });
      this.currentSourcePaths = this.sourcePaths;
    }
  }
}