import { provide } from "inversify-binding-decorators";
import * as path from "path";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { SourceMetaMap } from "../../domain";
import { DBTProject } from "../dbtProject";
import { getExternalProjectNamesFromDbtLoomConfig } from "../../utils";

@provide(SourceParser)
export class SourceParser {
  constructor(private terminal: DBTTerminal) {}

  createSourceMetaMap(
    sourcesMap: any[],
    project: DBTProject,
  ): Promise<SourceMetaMap> {
    return new Promise((resolve) => {
      this.terminal.debug(
        "SourceParser",
        `Parsing sources for "${project.getProjectName()}" at ${
          project.projectRoot
        }`,
      );
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
      const externalProjectNames = getExternalProjectNamesFromDbtLoomConfig(
        project.projectRoot.fsPath,
      );
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
              package_name,
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
                package_name,
                is_external_project: Boolean(
                  externalProjectNames?.includes(package_name),
                ),
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
      this.terminal.debug(
        "SourceParser",
        `Returning sources for "${project.getProjectName()}" at ${
          project.projectRoot
        }`,
        sourceMetaMap,
      );
      resolve(sourceMetaMap);
    });
  }
}
