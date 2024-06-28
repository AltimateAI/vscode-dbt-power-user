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
import { ProjectQuickPick } from "../quickpick/projectQuickPick";

@provideSingleton(QueryManifestService)
export class QueryManifestService {
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private dbtTerminal: DBTTerminal,
    protected emitterService: SharedStateService,
    private projectQuickPick: ProjectQuickPick,
  ) {
    dbtProjectContainer.onDBTProjectsInitialization(() => {
      this.emitterService.fire({
        command: "dbtProjectsInitialized",
        payload: {},
      });
    });

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
    // remove duplicates
    return [
      ...new Set(
        this.dbtProjectContainer
          .getProjects()
          .map((project) => project.getProjectName()),
      ),
    ];
  }

  public getProjectByName(projectName: string) {
    const projects = this.dbtProjectContainer.getProjects();
    return projects.find((project) => project.getProjectName() === projectName);
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

  // get project based on current active editor
  // if no editor, then ask user to pick project
  public async getOrPickProjectFromWorkspace() {
    const project = window.activeTextEditor
      ? this.dbtProjectContainer.findDBTProject(
          window.activeTextEditor.document.uri,
        )
      : null;
    if (project) {
      return project;
    }
    this.dbtTerminal.debug(
      "getProject",
      "no project name provided, getting all projects in workspace",
    );
    const projects = this.dbtProjectContainer.getProjects();
    if (projects.length === 1) {
      this.dbtTerminal.debug(
        "getProject",
        `single project in workspace, returning project: ${projects[0].getProjectName()}`,
      );
      return projects[0];
    }

    this.dbtTerminal.debug(
      "getProject",
      "multiple projects in workspace, prompting user to select project",
    );

    const pickedProject = await this.projectQuickPick.projectPicker(projects);
    if (!pickedProject) {
      this.dbtTerminal.debug("getProject", "no project selected, returning");
      return;
    }

    this.dbtTerminal.debug(
      "getProject",
      `project selected: ${pickedProject.uri}`,
    );
    return this.dbtProjectContainer.findDBTProject(pickedProject.uri);
  }
}
