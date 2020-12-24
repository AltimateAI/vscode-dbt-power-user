import { FileSystemWatcher, RelativePattern, Uri, workspace } from "vscode";
import { setupWatcherhHandler } from "../../utils";
import { DBTProject } from "../dbtProject";
import { ManifestChangedHandler } from "../manifestChangedHandler";

export class TargetWatchers {
  private projectRoot: Uri;
  private targetPath: string;
  private projectName: string;
  private manifestWatcher?: FileSystemWatcher;
  private runResultsWatcher?: FileSystemWatcher;
  private targetFolderWatcher?: FileSystemWatcher;
  private currentTargetPath?: string;
  private currentProjectName?: string;

  constructor(projectRoot: Uri, targetPath: string, projectName: string) {
    this.projectRoot = projectRoot;
    this.targetPath = targetPath;
    this.projectName = projectName;
  }

  public async createTargetWatchers() {
    if (
      this.currentTargetPath === undefined || // TODO add same logic for projectName
      this.currentTargetPath !== this.targetPath
    ) {
      const manifestChangedHandler = new ManifestChangedHandler(this.projectRoot, this.projectName);
      manifestChangedHandler.parseManifest(this.targetPath);

      const handler = () => {
        manifestChangedHandler.parseManifest(this.targetPath); // TODO this seems to be triggered when source files are changed, which should not happend...
      };

      this.manifestWatcher = this.createManifestWatcher(handler);
      this.runResultsWatcher = this.createRunResultsWatcher(handler);
      this.targetFolderWatcher = this.createTargetFolderWatcher(handler);

      this.currentTargetPath = this.targetPath;

      await manifestChangedHandler.parseManifest(this.targetPath);
    }
  }

  private createManifestWatcher(handler: Function): FileSystemWatcher {
    const manifestWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(
        this.projectRoot.path,
        `${this.targetPath}/${DBTProject.MANIFEST_FILE}`
      )
    );
    setupWatcherhHandler(manifestWatcher, () => handler());
    return manifestWatcher;
  }

  private createRunResultsWatcher(handler: Function): FileSystemWatcher {
    const runResultsWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(
        this.projectRoot.path,
        `${this.targetPath}/${DBTProject.RUN_RESULTS_FILE}`
      )
    );
    setupWatcherhHandler(runResultsWatcher, () => handler());
    return runResultsWatcher;
  }

  private createTargetFolderWatcher(handler: Function): FileSystemWatcher {
    const targetFolderWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(this.projectRoot.path, this.targetPath)
    );
    targetFolderWatcher.onDidDelete(() => handler());
    return targetFolderWatcher;
  }
}