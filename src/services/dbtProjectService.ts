import { Uri, window } from "vscode";
import { DBTProject } from "../manifest/dbtProject";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheProjectAddedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";

@provideSingleton(DbtProjectService)
export class DbtProjectService {
  public constructor(protected dbtProjectContainer: DBTProjectContainer) {}

  public getProject(): DBTProject | undefined {
    if (!window.activeTextEditor?.document.uri) {
      return;
    }
    return this.dbtProjectContainer.findDBTProject(
      window.activeTextEditor.document.uri,
    );
  }

  public getModelsFromProject(
    eventMap: Map<string, ManifestCacheProjectAddedEvent>,
    currentFilePath?: Uri,
  ) {
    if (!currentFilePath) {
      return;
    }

    const projectRootpath =
      this.dbtProjectContainer.getProjectRootpath(currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }

    const event = eventMap.get(projectRootpath.fsPath);
    if (!event) {
      return;
    }

    const models = event.nodeMetaMap.entries();

    const items = Array.from(models)
      .filter(
        ([key, model]) =>
          model.resource_type !== DBTProject.RESOURCE_TYPE_ANALYSIS,
      )
      .map(([key]) => key);

    return items;
  }
}
