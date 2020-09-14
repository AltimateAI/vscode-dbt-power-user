import { DBTManifest, OnDBTManifestCacheChanged } from "./dbtManifest";
import { workspace, RelativePattern, WorkspaceFolder, Uri } from "vscode";
import { DBT_PROJECT_FILE } from "./utils";

type ManifestMetaMap = Map<Uri, DBTManifest>;

class ManifestContainer {
  manifestMetaMap: ManifestMetaMap = new Map();

  constructor() {
    workspace.onDidChangeWorkspaceFolders(() => {
      this.createManifests();
    });
  }

  async createManifests(): Promise<void> {
    const folders = workspace.workspaceFolders;
    if (folders === undefined) { return; }

    for (const folder of folders) {
      if (await this.isDBTProject(folder)) {
        this.manifestMetaMap.set(folder.uri, new DBTManifest(folder));
      }
    }
  }

  addEventHandler(provider: OnDBTManifestCacheChanged): void {
    this.manifestMetaMap.forEach((manifestInstance, uri) => {
      manifestInstance.addOnDBTManifestCacheChangedHandler(
        (event) => provider.onDBTManifestCacheChanged(event, uri.path)
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

  private async isDBTProject(folder: WorkspaceFolder): Promise<boolean> {
    const dbtProjectFile = await workspace.findFiles(new RelativePattern(folder, DBT_PROJECT_FILE));
    if (dbtProjectFile.length > 0) {
      return true;
    }
    return false;
  }
}

export const manifestContainer = new ManifestContainer();