import { provide } from "inversify-binding-decorators";
import { NodeMetaMap } from "../../domain";
import { DBTProject } from "../dbtProject";
import { createFullPathForNode } from ".";

@provide(NodeParser)
export class NodeParser {
  createNodeMetaMap(
    nodesMap: any[],
    project: DBTProject,
  ): Promise<NodeMetaMap> {
    return new Promise(async (resolve) => {
      const modelMetaMap: NodeMetaMap = new Map();
      if (nodesMap === null || nodesMap === undefined) {
        resolve(modelMetaMap);
      }
      const nodesMaps = Object.values(nodesMap).filter(
        (model) =>
          model.resource_type === DBTProject.RESOURCE_TYPE_MODEL ||
          model.resource_type === DBTProject.RESOURCE_TYPE_SEED ||
          model.resource_type === DBTProject.RESOURCE_TYPE_ANALYSIS ||
          model.resource_type === DBTProject.RESOURCE_TYPE_SNAPSHOT,
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
        } = nodesMap;
        const fullPath = createFullPathForNode(
          projectName,
          rootPath,
          package_name,
          packagePath,
          original_file_path,
        );
        if (!fullPath) {
          return;
        }
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
        });
      }
      resolve(modelMetaMap);
    });
  }
}
