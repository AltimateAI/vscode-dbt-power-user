import path = require("path");
import { CompletionItemKind, Uri, window } from "vscode";
import { DBTProject } from "../manifest/dbtProject";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import { ManifestCacheProjectAddedEvent } from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";

@provideSingleton(DbtProjectService)
export class DbtProjectService {
  public constructor(protected dbtProjectContainer: DBTProjectContainer) {}

  public getProject(): DBTProject | undefined {
    if (!window.activeTextEditor) {
      return undefined;
    }
    const currentFilePath = window.activeTextEditor.document.uri;
    return this.dbtProjectContainer.findDBTProject(currentFilePath);
  }

  public getColumnsFromEventMap(
    eventMap: Map<string, ManifestCacheProjectAddedEvent>,
    modelName: string,
  ) {
    const project = this.getProject();
    if (project === undefined) {
      return undefined;
    }
    const event = eventMap.get(project.projectRoot.fsPath);
    if (event === undefined) {
      return undefined;
    }
    const currentNode = event.nodeMetaMap.get(modelName);
    if (currentNode === undefined) {
      return undefined;
    }

    return currentNode.columns;
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
