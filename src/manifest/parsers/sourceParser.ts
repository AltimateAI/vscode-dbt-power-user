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
    project: DBTProject,
  ): Promise<SourceMetaMap> {
    return new Promise((resolve) => {
      const sourceMetaMap: SourceMetaMap = new Map();
      if (sourcesMap === null || sourcesMap === undefined) {
        resolve(sourceMetaMap);
      }
      const rootPath = project.projectRoot.fsPath;
      // TODO: these things can change so we should recreate them if project config changes
      const projectName = project.getProjectName();
      const packagePath = project.getPackageInstallPath();
      if (packagePath === undefined) {
        throw new Error(
          "packagePath is not defined in " + project.projectRoot.fsPath,
        );
      }
      Object.values(sourcesMap)
        .filter(
          (source) => source.resource_type === DBTProject.RESOURCE_TYPE_SOURCE,
        )
        .reduce(
          (
            previousValue: SourceMetaMap,
            {
              source_name,
              database,
              schema,
              name,
              original_file_path,
              unique_id,
              description,
              columns,
              identifier,
            },
          ) => {
            let source = previousValue.get(source_name);
            if (!source) {
              source = {
                tables: [],
                uniqueId: unique_id,
                name: source_name,
                database: database,
                schema: schema,
              };
              previousValue.set(source_name, source);
            }
            const fullPath = path.join(rootPath, original_file_path);
            source.tables.push({
              name,
              identifier,
              path: fullPath,
              description: description,
              columns: columns,
            });
            return previousValue;
          },
          sourceMetaMap,
        );
      resolve(sourceMetaMap);
    });
  }
}
