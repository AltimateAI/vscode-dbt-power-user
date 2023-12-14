import { provide } from "inversify-binding-decorators";
import * as path from "path";
import { ExposureMetaMap } from "../../domain";
import { DBTProject } from "../dbtProject";

@provide(ExposureParser)
export class ExposureParser {
  createExposureMetaMap(
    exposuresMap: any[],
    rootPath: string,
  ): Promise<ExposureMetaMap> {
    return new Promise((resolve) => {
      const exposureMetaMap: ExposureMetaMap = new Map();
      if (exposuresMap === null || exposuresMap === undefined) {
        resolve(exposureMetaMap);
      }
      Object.values(exposuresMap)
        .filter(
          (exposure) =>
            exposure.resource_type === DBTProject.RESOURCE_TYPE_EXPOSURE,
        )
        .forEach((exposure) => {
          const fullPath = path.join(rootPath, exposure.original_file_path);
          exposureMetaMap.set(exposure.name, { ...exposure, path: fullPath });
        });
      resolve(exposureMetaMap);
    });
  }
}
