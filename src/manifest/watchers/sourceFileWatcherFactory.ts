import { FileSystemWatcher, RelativePattern, Uri, workspace } from "vscode";
import { debounce } from "../../utils";
import { dbtProjectContainer } from "../dbtProjectContainer";
import { SourceFileChangedEvent } from "../sourceFileChangedEvent";

export class SourceFileWatcherFactory {
    static createSourceFileWatchers(projectRoot: Uri, sourcePaths: string[]): FileSystemWatcher[] {
        const sourceFolderWatchers: FileSystemWatcher[] = [];
        sourcePaths.forEach(sourcePath => {
            const parsedSourcePath = Uri.parse(sourcePath);
            const globPattern = Uri.joinPath(parsedSourcePath, '**/*.sql').path.substring(1);
            const sourceFolderWatcher = workspace.createFileSystemWatcher(
                new RelativePattern(projectRoot, globPattern)
            );
            const event = new SourceFileChangedEvent(projectRoot);
            sourceFolderWatcher.onDidChange(() => debounce(() => dbtProjectContainer.raiseSourceFileChangedEvent(event), 2000)());
            sourceFolderWatchers.push(sourceFolderWatcher);
        });
        return sourceFolderWatchers;
    }
}