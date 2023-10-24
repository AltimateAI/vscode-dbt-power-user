import { Diagnostic, Uri } from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { TelemetryService } from "../telemetry";
import { provideSingleton } from "../utils";
import { findModelProblems } from "./command_utils";
import { DBTProject } from "../manifest/dbtProject";

export interface AltimateCatalog {
  [projectName: string]: { [key: string]: any[] };
}

@provideSingleton(AltimateScan)
export class AltimateScan {
  private eventMap: Map<string, ManifestCacheProjectAddedEvent> = new Map();
  constructor(
    private dbtProjectContainer: DBTProjectContainer,
    private telemetry: TelemetryService,
    private altimate: AltimateRequest,
  ) {
    dbtProjectContainer.onManifestChanged((event) =>
      this.onManifestCacheChanged(event),
    );
  }

  private async onManifestCacheChanged(event: ManifestCacheChangedEvent) {
    event.added?.forEach((added) => {
      this.eventMap.set(added.projectRoot.fsPath, added);
    });
    event.removed?.forEach((removed) => {
      this.eventMap.delete(removed.projectRoot.fsPath);
    });
  }

  async getProblems() {
    this.telemetry.sendTelemetryEvent("altimateScan");
    const projects = this.dbtProjectContainer.findAllDBTProjects();
    const altimateCatalog: AltimateCatalog = await getCatalog(projects);
    for (const project of projects) {
      const projectEventMap = this.eventMap.get(project.projectRoot.fsPath);
      const projectDiagnostics: { [fullFilePath: string]: Diagnostic[] } = {};

      getProjectProblems(
        altimateCatalog,
        project,
        projectEventMap,
        projectDiagnostics,
      );
      for (const [filePath, fileDiagnostics] of Object.entries(
        projectDiagnostics,
      )) {
        project.projectHealth.set(Uri.file(filePath), fileDiagnostics);
      }
    }
  }
}
function getProjectProblems(
  altimateCatalog: AltimateCatalog,
  project: DBTProject,
  projectEventMap: ManifestCacheProjectAddedEvent | undefined,
  projectDiagnostics: { [fullFilePath: string]: Diagnostic[] },
) {
  if (!projectEventMap) {
    // nothing to do if we dont have any project info loaded
    return;
  }
  const { nodeMetaMap } = projectEventMap;
  for (const [key, value] of nodeMetaMap) {
    console.log(key, value);
    const projectName = project.getProjectName();
    const projectRootUri = project.projectRoot;
    const modelKey = JSON.stringify({
      projectroot: projectRootUri.fsPath,
      project: projectName,
      database: value.database.toLowerCase(),
      schema: value.schema.toLowerCase(),
      name: value.alias.toLowerCase(),
    });
    if (
      Object.keys(altimateCatalog[projectName + projectRootUri]).includes(
        modelKey,
      )
    ) {
      // TODO - other checks
      const modelDict = altimateCatalog[projectName + projectRootUri][modelKey];

      if (modelDict) {
        findModelProblems(
          value,
          modelDict,
          value.alias,
          project,
          projectDiagnostics,
        );
      }
    } else {
      // TODO - model is not materialized - add a diagnostic error here
    }
  }
}

async function getCatalog(projects: DBTProject[]) {
  const altimateCatalog: { [projectName: string]: { [key: string]: any[] } } =
    {};
  for (const project of projects) {
    try {
      const cata = await project.getCatalog();
      const modelDict: { [key: string]: any[] } = cata.reduce(
        (mdict: { [key: string]: any[] }, model) => {
          const modelKey: string = JSON.stringify({
            projectroot: project.projectRoot.fsPath,
            project: project.getProjectName(),
            database: model.table_database.toLowerCase(),
            schema: model.table_schema.toLowerCase(),
            name: model.table_name.toLowerCase(),
          });
          mdict[modelKey] = mdict[modelKey] || [];
          mdict[modelKey].push(model);
          return mdict;
        },
        Object.create(null),
      );
      altimateCatalog[project.getProjectName() + project.projectRoot] =
        modelDict;
    } catch (err) {
      console.log(
        "Error in getting schema for project: " + project.getProjectName(),
        err,
      );
      console.log(err);
    }
  }
  return altimateCatalog;
}
