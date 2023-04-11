import { provide } from "inversify-binding-decorators";
import * as path from "path";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { SourceMetaMap } from "../../domain";
import { DBTProject } from "../dbtProject";

@provide(SourceParser)
export class SourceParser {
  constructor(private terminal: DBTTerminal) {}

  createSourceMetaMap(
    sourcesMap: any[],
    rootPath: string
  ): Promise<SourceMetaMap> {
    return new Promise((resolve) => {
      const sourceMetaMap: SourceMetaMap = new Map();
      if (sourcesMap === null || sourcesMap === undefined) {
        resolve(sourceMetaMap);
      }
      Object.values(sourcesMap)
        .filter(
          (source) => source.resource_type === DBTProject.RESOURCE_TYPE_SOURCE
        )
        .reduce(
          (
            previousValue: SourceMetaMap,
            { source_name, name, original_file_path, unique_id }
          ) => {
            let source = previousValue.get(source_name);
            if (!source) {
              source = { tables: [], uniqueId: unique_id };
              previousValue.set(source_name, source);
            }
            const fullPath = path.join(rootPath, original_file_path);
            source.tables.push({ name, path: fullPath });
            return previousValue;
          },
          sourceMetaMap
        );
      resolve(sourceMetaMap);
    });
  }
}
