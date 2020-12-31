import path = require("path");
import { SourceMetaMap } from "../../domain";
import { DBTProject } from "../dbtProject";

export class SourceParser {
  static createSourceMetaMap(sourcesMap: any[]): Promise<SourceMetaMap> {
    return new Promise((resolve) => {
      const sourceMetaMap: SourceMetaMap = new Map();
      if (sourcesMap === null || sourcesMap === undefined) {
        console.log(
          "No sources found in manifest! Are we on an older dbt version?"
        );
        resolve(sourceMetaMap);
      }
      Object.values(sourcesMap)
        .filter(
          (source) => source.resource_type === DBTProject.RESOURCE_TYPE_SOURCE
        )
        .reduce(
          (
            previousValue: SourceMetaMap,
            { source_name, name, root_path, original_file_path }
          ) => {
            let source = previousValue.get(source_name);
            if (!source) {
              const fullPath = path.join(root_path, original_file_path);
              source = { path: fullPath, tables: [] };
              previousValue.set(source_name, source);
            }
            source.tables.push({ name });
            return previousValue;
          },
          sourceMetaMap
        );
      resolve(sourceMetaMap);
    });
  }
}
