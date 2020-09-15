import { Manifest } from "./manifest";
import { workspace, RelativePattern, WorkspaceFolder, Uri } from "vscode";
import { OnManifestCacheChanged } from "./manifestCacheChangedEvent";

type ManifestMetaMap = Map<Uri, Manifest>;

class ManifestContainer {
  private manifestMetaMap?: ManifestMetaMap;

  constructor() {
    workspace.onDidChangeWorkspaceFolders(() => {
      this.createManifests();
    });
  }

  async createManifests(): Promise<void> {
    const folders = workspace.workspaceFolders;
    if (folders === undefined) {
      return;
    }

    const manifests: ManifestMetaMap = new Map();

    for (const folder of folders) {
      const projectUris = await this.discoverProjects(folder);
      projectUris.forEach((projectUri) => {
        manifests.set(projectUri, new Manifest(projectUri));
      });
    }
    this.manifestMetaMap = manifests;
  }

  addEventHandler(provider: OnManifestCacheChanged): void {
    if(this.manifestMetaMap === undefined) {
      console.error("Trying to add eventhandlers to an empty manifests map!");
      return;
    }
    this.manifestMetaMap.forEach((manifestInstance) => {
      manifestInstance.addOnManifestCacheChangedHandler((event) =>
        provider.onManifestCacheChanged(event)
      );
    });
  }

  async tryRefreshAll(): Promise<void> {
    if(this.manifestMetaMap === undefined) {
      console.error("Trying to refresh an empty manifests map!");
      return;
    }
    this.manifestMetaMap.forEach((manifestInstance) => {
      manifestInstance.tryRefresh();
    });
  }

  removeEventHandlers(): void {
    if(this.manifestMetaMap === undefined) {
      return;
    }
    this.manifestMetaMap.forEach((manifestInstance) => {
      manifestInstance.removeEventHandlers();
    });
  }

  getPackageName = (currentPath: Uri): string | undefined => {
    const projectPath = this.getProjectRootpath(currentPath);
    if (projectPath === undefined) {
      return undefined;
    }

    const documentPath = currentPath.path;
    const pathSegments = documentPath.replace(projectPath.path, "").split("/");

    const insidePackage =
      pathSegments.length > 1 &&
      pathSegments[0] === Manifest.DBT_MODULES;

    if (insidePackage) {
      return pathSegments[1];
    }
    return undefined;
  };

  getProjectRootpath = (currentFilePath: Uri): Uri | undefined => {
    if(this.manifestMetaMap === undefined) {
      console.error("Trying to call getProjectRootpath an empty manifests map!");
      return;
    }
    for (const projectRootUri of Array.from(this.manifestMetaMap.keys())) {
      if (currentFilePath.path.startsWith(projectRootUri.path + "/")) {
        return projectRootUri;
      }
    }
    return undefined;
  };

  private async discoverProjects(folder: WorkspaceFolder): Promise<Uri[]> {
    const dbtProjectFiles = await workspace.findFiles(
      new RelativePattern(folder, `**/${Manifest.DBT_PROJECT_FILE}`),
      new RelativePattern(folder, `**/${Manifest.DBT_MODULES}`)
    );
    return dbtProjectFiles.map((uri) =>
      Uri.file(uri.path.split("/")!.slice(0, -1).join("/"))
    );
  }
}

export const manifestContainer = new ManifestContainer();
