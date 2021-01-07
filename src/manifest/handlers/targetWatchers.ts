import { Disposable, FileSystemWatcher, RelativePattern, workspace } from "vscode";
import { setupWatcherHandler } from "../../utils";
import { DBTProject } from "../dbtProject";
import { ManifestChangedHandler } from "../event/manifestChangedHandler";
import { OnProjectConfigChanged, ProjectConfigChangedEvent } from "../event/projectConfigChangedEvent";

export class TargetWatchers implements OnProjectConfigChanged, Disposable {
  private manifestWatcher?: FileSystemWatcher;
  private runResultsWatcher?: FileSystemWatcher;
  private targetFolderWatcher?: FileSystemWatcher;
  private currentTargetPath?: string;
  private currentProjectName?: string;
  private disposables: Disposable[] = [];

  dispose() {
    this.disposables.forEach(disposable => disposable.dispose());
  }

  public async onProjectConfigChanged(event: ProjectConfigChangedEvent) {
    const { targetPath, projectName, projectRoot } = event;
    if (
      this.currentTargetPath === undefined ||
      this.currentTargetPath !== targetPath ||
      this.currentProjectName === undefined ||
      this.currentProjectName !== projectName
    ) {
      this.dispose();
      const manifestChangedHandler = new ManifestChangedHandler(projectRoot, projectName);

      const handler = () => {
        manifestChangedHandler.parseManifest(targetPath);
      };

      this.manifestWatcher = this.createManifestWatcher(event);
      setupWatcherHandler(this.manifestWatcher, () => handler());

      this.runResultsWatcher = this.createRunResultsWatcher(event);
      setupWatcherHandler(this.runResultsWatcher, () => handler());

      this.targetFolderWatcher = this.createTargetFolderWatcher(event);
      this.targetFolderWatcher.onDidDelete(() => () => handler());

      this.currentTargetPath = targetPath;
      this.currentProjectName = projectName;

      this.disposables.push(manifestChangedHandler, this.manifestWatcher, this.runResultsWatcher, this.targetFolderWatcher);

      await manifestChangedHandler.parseManifest(targetPath);
    }
  }

  private createManifestWatcher(event: ProjectConfigChangedEvent): FileSystemWatcher {
    const { targetPath, projectRoot } = event;
    const manifestWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(
        projectRoot.path,
        `${targetPath}/${DBTProject.MANIFEST_FILE}`
      )
    );
    return manifestWatcher;
  }

  private createRunResultsWatcher(event: ProjectConfigChangedEvent): FileSystemWatcher {
    const { targetPath, projectRoot } = event;
    const runResultsWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(
        projectRoot.path,
        `${targetPath}/${DBTProject.RUN_RESULTS_FILE}`
      )
    );
    return runResultsWatcher;
  }

  private createTargetFolderWatcher(event: ProjectConfigChangedEvent): FileSystemWatcher {
    const { targetPath, projectRoot } = event;
    const targetFolderWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(projectRoot.path, targetPath)
    );
    return targetFolderWatcher;
  }
}
