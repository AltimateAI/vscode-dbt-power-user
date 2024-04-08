import { TextDocument, Uri, window } from "vscode";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { DBTProject } from "../manifest/dbtProject";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
import { SharedStateService } from "./sharedStateService";

@provideSingleton(QueryManifestService)
export class QueryManifestService {
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private dbtTerminal: DBTTerminal,
    protected emitterService: SharedStateService,
  ) {
    dbtProjectContainer.onManifestChanged((event) =>
      this.onManifestCacheChanged(event),
    );
  }

  private async onManifestCacheChanged(event: ManifestCacheChangedEvent) {
    event.added?.forEach((added) => {
      this.eventMap.set(added.project.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
    this.emitterService.fire({
      command: "manifestCacheChanged",
      payload: {},
    });
  }

  public getProject(): DBTProject | undefined {
    return this.getProjectByUri(window.activeTextEditor?.document.uri);
  }

  public getProjectByUri(uri?: Uri): DBTProject | undefined {
    if (!uri) {
      return;
    }
    return this.dbtProjectContainer.findDBTProject(uri);
  }

  public getProjectNamesInWorkspace(): string[] | undefined {
    return this.dbtProjectContainer
      .getProjects()
      .map((project) => project.getProjectName());
  }

  public getEventByCurrentProject():
    | {
        event: ManifestCacheProjectAddedEvent | undefined;
        currentDocument: TextDocument;
      }
    | undefined {
    if (window.activeTextEditor === undefined || this.eventMap === undefined) {
      return;
    }

    const currentDocument = window.activeTextEditor.document;
    const currentFilePath = currentDocument.uri;
    return { event: this.getEventByDocument(currentFilePath), currentDocument };
  }

  public getEventByDocument(currentFilePath: Uri) {
    this.dbtTerminal.debug(
      "getting event for project, currentFilePath: ",
      currentFilePath.fsPath,
    );
    const projectRootpath =
      this.dbtProjectContainer.getProjectRootpath(currentFilePath);
    if (projectRootpath === undefined) {
      this.dbtTerminal.debug(
        "no project for currentFilePath: ",
        currentFilePath.fsPath,
      );
      return;
    }

    const event = this.eventMap.get(projectRootpath.fsPath);
    if (event === undefined) {
      this.dbtTerminal.debug("no event for project: ", projectRootpath.fsPath);
      return;
    }
    return event;
  }

  public getSourcesInProject(currentFilePath?: Uri) {
    if (!currentFilePath) {
      return;
    }

    const projectRootpath =
      this.dbtProjectContainer.getProjectRootpath(currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }

    const event = this.eventMap.get(projectRootpath.fsPath);
    if (!event) {
      return;
    }

    const sources = event.sourceMetaMap.entries();
    console.log(event.sourceMetaMap.size, sources);
    const items = Array.from(sources).map(([key, source]) => ({
      name: key,
      tables: source.tables.map((t) => t.name),
    }));

    return items;
  }

  public getModelsInProject(currentFilePath?: Uri) {
    if (!currentFilePath) {
      return;
    }

    const projectRootpath =
      this.dbtProjectContainer.getProjectRootpath(currentFilePath);
    if (projectRootpath === undefined) {
      return;
    }

    const event = this.eventMap.get(projectRootpath.fsPath);
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
