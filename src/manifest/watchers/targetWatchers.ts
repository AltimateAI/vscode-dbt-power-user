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
        manifestChangedHandler.parseManifest(this.targetPath);
      };

      this.manifestWatcher = this.createManifestWatcher();
      setupWatcherhHandler(this.manifestWatcher, () => handler());

      this.runResultsWatcher = this.createRunResultsWatcher();
      setupWatcherhHandler(this.runResultsWatcher, () => handler());

      this.targetFolderWatcher = this.createTargetFolderWatcher();
      this.targetFolderWatcher.onDidDelete(() => () => handler());

      this.currentTargetPath = this.targetPath;

      await manifestChangedHandler.parseManifest(this.targetPath);
    }
  }

  private createManifestWatcher(): FileSystemWatcher {
    const manifestWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(
        this.projectRoot.path,
        `${this.targetPath}/${DBTProject.MANIFEST_FILE}`
      )
    );
    return manifestWatcher;
  }

  private createRunResultsWatcher(): FileSystemWatcher {
    const runResultsWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(
        this.projectRoot.path,
        `${this.targetPath}/${DBTProject.RUN_RESULTS_FILE}`
      )
    );
    return runResultsWatcher;
  }

  private createTargetFolderWatcher(): FileSystemWatcher {
    const targetFolderWatcher = workspace.createFileSystemWatcher(
      new RelativePattern(this.projectRoot.path, this.targetPath)
    );
    return targetFolderWatcher;
  }
}