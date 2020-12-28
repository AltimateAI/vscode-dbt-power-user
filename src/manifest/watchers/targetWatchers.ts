import { FileSystemWatcher, RelativePattern, Uri, workspace } from "vscode";
import { setupWatcherhHandler } from "../../utils";
import { DBTProject } from "../dbtProject";
import { ManifestChangedHandler } from "../manifestChangedHandler";

export class TargetWatchers {
  private projectRoot: Uri;
  private manifestWatcher?: FileSystemWatcher;
  private runResultsWatcher?: FileSystemWatcher;
  private targetFolderWatcher?: FileSystemWatcher;
  private currentTargetPath?: string;
  private currentProjectName?: string;

  constructor(projectRoot: Uri) {
    this.projectRoot = projectRoot;
  }

  public async createTargetWatchers(targetPath: string, projectName: string) {
    if (
      this.currentTargetPath === undefined ||
      this.currentTargetPath !== targetPath ||
      this.currentProjectName === undefined ||
      this.currentProjectName !== projectName
    ) {
      const manifestChangedHandler = new ManifestChangedHandler(this.projectRoot, projectName);

      const handler = () => {
        manifestChangedHandler.parseManifest(targetPath);
      };

      this.manifestWatcher = this.createManifestWatcher(targetPath);
      setupWatcherhHandler(this.manifestWatcher, () => handler());

      this.runResultsWatcher = this.createRunResultsWatcher(targetPath);
      setupWatcherhHandler(this.runResultsWatcher, () => handler());

      this.targetFolderWatcher = this.createTargetFolderWatcher(targetPath);
      this.targetFolderWatcher.onDidDelete(() => () => handler());

      this.currentTargetPath = targetPath;
      this.currentProjectName = projectName;

      await manifestChangedHandler.parseManifest(targetPath);
    }
  }

  private createManifestWatcher(targetPath: string): FileSystemWatcher {
    const manifestWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(
        this.projectRoot.path,
        `${targetPath}/${DBTProject.MANIFEST_FILE}`
      )
    );
    return manifestWatcher;
  }

  private createRunResultsWatcher(targetPath: string): FileSystemWatcher {
    const runResultsWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(
        this.projectRoot.path,
        `${targetPath}/${DBTProject.RUN_RESULTS_FILE}`
      )
    );
    return runResultsWatcher;
  }

  private createTargetFolderWatcher(targetPath: string): FileSystemWatcher {
    const targetFolderWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(this.projectRoot.path, targetPath)
    );
    return targetFolderWatcher;
  }
}