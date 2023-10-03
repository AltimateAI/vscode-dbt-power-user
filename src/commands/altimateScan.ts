import { Diagnostic, Range, Uri } from "vscode";
import { AltimateRequest } from "../altimate";
import { DBTProjectContainer } from "../manifest/dbtProjectContainer";
import {
  ManifestCacheChangedEvent,
  ManifestCacheProjectAddedEvent,
} from "../manifest/event/manifestCacheChangedEvent";
import { TelemetryService } from "../telemetry";
import { provideSingleton } from "../utils";

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
    const altimateCatalog: { [projectName: string]: { [key: string]: any[] } } =
      {};
    const projects = this.dbtProjectContainer.findAllDBTProjects();
    for (const project of projects) {
      try {
        const cata = await project.getCatalog();
        const modelDict: { [key: string]: any[] } = cata.reduce(
          (mdict: { [key: string]: any[] }, model) => {
            const modelKey: string = JSON.stringify({
              projectroot: project.projectRoot.fsPath,
              project: project.getProjectName(),
              database: model.table_database,
              schema: model.table_schema,
              name: model.table_name,
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
    for (const project of projects) {
      const projectEventMap = this.eventMap.get(project.projectRoot.fsPath);
      for (const modelKey of Object.keys(
        altimateCatalog[project.getProjectName() + project.projectRoot],
      )) {
        const modelDict =
          altimateCatalog[project.getProjectName() + project.projectRoot][
            modelKey
          ];
        if (projectEventMap) {
          const { nodeMetaMap } = projectEventMap;
          const {
            projectroot,
            project: projectName,
            database,
            schema,
            name,
          } = JSON.parse(modelKey);
          if (
            !(
              projectroot === project.projectRoot.fsPath &&
              projectName === project.getProjectName()
            )
          ) {
            continue;
          }
          const projectModelKeyMap: { [key: string]: string } = Array.from(
            nodeMetaMap,
          ).reduce((map: { [key: string]: string }, [key, node]) => {
            map[node.alias.toLowerCase()] = node.name;
            return map;
          }, {});
          const projectModel = nodeMetaMap.get(
            projectModelKeyMap[name.toLowerCase()],
          );
          if (
            !projectModel ||
            projectModel.database.toLowerCase() !== database.toLowerCase() ||
            projectModel.schema.toLowerCase() !== schema.toLowerCase()
          ) {
            continue;
          }
          // TODO finally we have the right model
          if (Object.keys(projectModel.columns).length !== modelDict.length) {
            const err_message =
              "Column count mismatch for model: " +
              name +
              "\n" +
              "Current project has: " +
              Object.keys(projectModel.columns).join(", ") +
              "\n" +
              "Expected: " +
              modelDict.map(({ column_name }) => column_name).join(", ");

            project.projectHealth.set(Uri.file(projectModel.path), [
              new Diagnostic(new Range(0, 0, 999, 999), err_message),
            ]);
            console.log(err_message);
          }
        }
      }
    }
  }
}
