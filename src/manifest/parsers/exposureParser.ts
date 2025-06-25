import { provide } from "inversify-binding-decorators";
import * as path from "path";
import { ExposureMetaMap } from "../../domain";
import { DBTProject } from "../dbtProject";
import { DBTTerminal } from "../../dbt_client/terminal";
import { inject } from "inversify";
import { RESOURCE_TYPE_EXPOSURE } from "../../dbt_client/dbtIntegration";

@provide(ExposureParser)
export class ExposureParser {
  constructor(
    @inject("DBTTerminal")
    private terminal: DBTTerminal,
  ) {}

  createExposureMetaMap(
    exposuresMap: any[],
    project: DBTProject,
  ): Promise<ExposureMetaMap> {
    return new Promise((resolve) => {
      this.terminal.debug(
        "ExposureParser",
        `Parsing exposures for "${project.getProjectName()}" at ${
          project.projectRoot
        }`,
      );
      const exposureMetaMap: ExposureMetaMap = new Map();
      if (exposuresMap === null || exposuresMap === undefined) {
        resolve(exposureMetaMap);
      }
      Object.values(exposuresMap)
        .filter((exposure) => exposure.resource_type === RESOURCE_TYPE_EXPOSURE)
        .forEach((exposure) => {
          const fullPath = path.join(
            project.projectRoot.fsPath,
            exposure.original_file_path,
          );
          exposureMetaMap.set(exposure.name, { ...exposure, path: fullPath });
        });
      this.terminal.debug(
        "ExposureParser",
        `Returning exposures for "${project.getProjectName()}" at ${
          project.projectRoot
        }`,
        exposureMetaMap,
      );
      resolve(exposureMetaMap);
    });
  }
}
