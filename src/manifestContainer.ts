import { DBTManifest, OnDBTManifestCacheChanged } from "./dbtManifest";
import { workspace, RelativePattern, WorkspaceFolder, Uri } from "vscode";
import { DBT_PROJECT_FILE } from "./utils";

type ManifestMetaMap = Map<Uri, DBTManifest>;

class ManifestContainer {
  private manifestMetaMap: ManifestMetaMap = new Map();

  constructor() {
    workspace.onDidChangeWorkspaceFolders(() => {
      this.createManifests();
    });
  }

  async createManifests(): Promise<void> {
    const folders = workspace.workspaceFolders;
    if (folders === undefined) { return; }

    for (const folder of folders) {
      const projectUris = await this.discoverDBTProject(folder);
      if (projectUris === undefined) {
        break;
      }
      projectUris.forEach(projectUri => {
        this.manifestMetaMap.set(projectUri, new DBTManifest(projectUri));
      });
    }
  }

  addEventHandler(provider: OnDBTManifestCacheChanged): void {
    this.manifestMetaMap.forEach((manifestInstance) => {
      manifestInstance.addOnDBTManifestCacheChangedHandler(
        (event) => provider.onDBTManifestCacheChanged(event)
      );
    });
  }

  async tryRefreshAll(): Promise<void> {
    this.manifestMetaMap.forEach((manifestInstance) => {
      manifestInstance.tryRefresh();
    });
  }

  removeEventHandlers(): void {
    this.manifestMetaMap.forEach((manifestInstance) => {
      manifestInstance.removeEventHandlers();
    });
  }

  getProjectRootpath = (currentFilePath: Uri): Uri | undefined => {
    for (const projectRootUri of Array.from(this.manifestMetaMap.keys())) {
      if (currentFilePath.path.startsWith(projectRootUri.path + '/')) {
        return projectRootUri;
      }
    }
    return undefined;
  };

  private async discoverDBTProject(folder: WorkspaceFolder): Promise<Uri[] | undefined> {
    const dbtProjectFiles = await workspace.findFiles(new RelativePattern(folder, DBT_PROJECT_FILE));
    if (dbtProjectFiles.length > 0) {
      return [folder.uri];
    }
    return undefined;
  }
}

export const manifestContainer = new ManifestContainer();