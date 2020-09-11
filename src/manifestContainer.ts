import { DBTManifest, OnDBTManifestCacheChanged } from "./dbtManifest";
import { workspace, RelativePattern, WorkspaceFolder, Uri } from "vscode";

type ManifestMetaMap = Map<Uri, DBTManifest>;

class ManifestContainer {
  manifestMetaMap?: ManifestMetaMap;

  async createManifests(): Promise<void> {
    const folders = workspace.workspaceFolders;
    this.manifestMetaMap = new Map();
    if (folders === undefined) { return; }
    for (const folder of folders) {
      const dbtProjectFile = await this.discoverProjectFile(folder);
      if (dbtProjectFile.length === 0) {
        break;
      }
      this.manifestMetaMap.set(folder.uri, new DBTManifest(folder));
    }
  }

  addEventHandler(provider: OnDBTManifestCacheChanged) {
    if (this.manifestMetaMap === undefined) {
      return;
    }
    this.manifestMetaMap.forEach((manifestInstance, uri) => {
      manifestInstance.addOnDBTManifestCacheChangedHandler(
        (event) => provider.onDBTManifestCacheChanged(event, uri.path)
      );
    });
  }

  tryRefreshAll() {
    if (this.manifestMetaMap === undefined) {
      return;
    }
    this.manifestMetaMap.forEach((manifestInstance) => {
      manifestInstance.tryRefresh();
    });
  }

  removeEventHandlers() {
    if (this.manifestMetaMap === undefined) {
      return;
    }
    this.manifestMetaMap.forEach((manifestInstance) => {
      manifestInstance.removeEventHandlers();
    });
  }

  private async discoverProjectFile(folder: WorkspaceFolder): Promise<Uri[]> {
    const dbtProjectFile = await workspace.findFiles(new RelativePattern(folder, 'dbt_project.yml'));
    return dbtProjectFile;
  }
}

export const manifestContainer = new ManifestContainer();