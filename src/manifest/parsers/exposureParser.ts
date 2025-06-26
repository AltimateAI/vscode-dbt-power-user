import { provide } from "inversify-binding-decorators";
import * as path from "path";
import { ExposureMetaMap } from "../../domain";
import { DBTTerminal } from "../../dbt_client/terminal";
import { inject } from "inversify";
import { RESOURCE_TYPE_EXPOSURE } from "../../dbt_client/dbtIntegration";
import { DBTIntegrationAdapter } from "../dbtIntegrationAdapter";

@provide(ExposureParser)
export class ExposureParser {
  constructor(
    @inject("DBTTerminal")
    private terminal: DBTTerminal,
  ) {}

  createExposureMetaMap(
    exposuresMap: any[],
    project: DBTIntegrationAdapter,
  ): Promise<ExposureMetaMap> {
    return new Promise((resolve) => {
      const projectRoot = project.getProjectRoot();
      const projectName = project.getProjectName();
      this.terminal.debug(
        "ExposureParser",
        `Parsing exposures for "${projectName}" at ${projectRoot}`,
      );
      const exposureMetaMap: ExposureMetaMap = new Map();
      if (exposuresMap === null || exposuresMap === undefined) {
        resolve(exposureMetaMap);
      }
      Object.values(exposuresMap)
        .filter((exposure) => exposure.resource_type === RESOURCE_TYPE_EXPOSURE)
        .forEach((exposure) => {
          const fullPath = path.join(projectRoot, exposure.original_file_path);
          exposureMetaMap.set(exposure.name, { ...exposure, path: fullPath });
        });
      this.terminal.debug(
        "ExposureParser",
        `Returning exposures for "${projectName}" at ${projectRoot}`,
        exposureMetaMap,
      );
      resolve(exposureMetaMap);
    });
  }
}
