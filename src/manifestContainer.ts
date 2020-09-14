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
      const projects = await this.discoverDBTProject(folder);
      if (projects === undefined) {
        break;
      }
      projects.forEach(project => {
        this.manifestMetaMap.set(project, new DBTManifest(project.path));
      });
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

  getProjectRootpath = (currentFilePath: string): string | undefined => {
    for (const projectRootUri of Array.from(this.manifestMetaMap.keys())) {
      if (currentFilePath.startsWith(projectRootUri.path + '/')) {
        return projectRootUri.path;
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