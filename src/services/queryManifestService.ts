import { TextDocument, Uri, window } from "vscode";
import { DBTTerminal } from "@altimateai/dbt-integration";
import { DBTProject } from "../manifest/dbtProject";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { provideSingleton } from "../utils";
import { SharedStateService } from "./sharedStateService";
import { ProjectQuickPick } from "../quickpick/projectQuickPick";
import { inject } from "inversify";

@provideSingleton(QueryManifestService)
export class QueryManifestService {
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();

  public constructor(
    private dbtProjectContainer: DBTProjectContainer,
    @inject("DBTTerminal")
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

  public getModelsInProject(
    currentFilePath?: Uri,
  ): Iterable<string> | undefined {
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

    // TODO: fix for model versions
    return Array.from(event.nodeMetaMap.nodes()).map((node) => node.name);
  }

  // get project based on current active editor
  // if no editor, then ask user to pick project
  public async getOrPickProjectFromWorkspace() {
    const uri =
      window.activeTextEditor?.document.uri ||
      window.activeNotebookEditor?.notebook.uri;
    const project = uri ? this.dbtProjectContainer.findDBTProject(uri) : null;

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
