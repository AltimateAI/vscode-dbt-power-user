import { provide } from "inversify-binding-decorators";
import { NodeMetaMap } from "../../domain";
import { DBTProject } from "../dbtProject";
import { createFullPathForNode } from ".";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { getExternalProjectNamesFromDbtLoomConfig } from "../../utils";

@provide(NodeParser)
export class NodeParser {
  constructor(private terminal: DBTTerminal) {}

  createNodeMetaMap(
    nodesMap: any[],
    project: DBTProject,
  ): Promise<NodeMetaMap> {
    return new Promise(async (resolve) => {
      this.terminal.debug(
        "NodeParser",
        `Parsing nodes for "${project.getProjectName()}" at ${
          project.projectRoot
        }`,
      );
      const modelMetaMap: NodeMetaMap = new Map();
      if (nodesMap === null || nodesMap === undefined) {
        resolve(modelMetaMap);
      }
      const nodesMaps = Object.values(nodesMap).filter((model) =>
        DBTProject.isResourceNode(model.resource_type),
      );
      const rootPath = project.projectRoot.fsPath;
      // TODO: these things can change so we should recreate them if project config changes
      const projectName = project.getProjectName();
      const packagePath = project.getPackageInstallPath();
      if (packagePath === undefined) {
        throw new Error(
          "packagePath is not defined " + project.projectRoot.fsPath,
        );
      }
      const externalProjectNames = getExternalProjectNamesFromDbtLoomConfig(
        project.projectRoot.fsPath,
      );
      for (const nodesMap of nodesMaps) {
        const {
          name,
          original_file_path,
          database,
          schema,
          alias,
          package_name,
          unique_id,
          columns,
          description,
          patch_path,
          config,
          resource_type,
          depends_on,
        } = nodesMap;
        const fullPath = createFullPathForNode(
          projectName,
          rootPath,
          package_name,
          packagePath,
          original_file_path,
        );
        modelMetaMap.set(name, {
          path: fullPath,
          database,
          schema,
          alias,
          name,
          package_name,
          uniqueId: unique_id,
          columns,
          description,
          patch_path,
          config,
          resource_type,
          depends_on,
          is_external_project: Boolean(
            externalProjectNames?.includes(package_name),
          ),
        });
      }
      this.terminal.debug(
        "NodeParser",
        `Returning nodes for "${project.getProjectName()}" at ${
          project.projectRoot
        }`,
        modelMetaMap,
      );
      resolve(modelMetaMap);
    });
  }
}
