import { Manifest } from "./manifest";
import { workspace, RelativePattern, WorkspaceFolder, Uri } from "vscode";
import { OnManifestCacheChanged } from "./manifestCacheChangedEvent";

type ManifestMetaMap = Map<Uri, Manifest>;

class ManifestContainer {
  private manifestMetaMap: ManifestMetaMap = new Map();

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

    for (const folder of folders) {
      const projectUris = await this.discoverProjects(folder);
      if (projectUris === undefined) {
        break;
      }
      projectUris.forEach((projectUri) => {
        this.manifestMetaMap.set(projectUri, new Manifest(projectUri));
      });
    }
  }

  addEventHandler(provider: OnManifestCacheChanged): void {
    this.manifestMetaMap.forEach((manifestInstance) => {
      manifestInstance.addOnManifestCacheChangedHandler((event) =>
        provider.onManifestCacheChanged(event)
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
