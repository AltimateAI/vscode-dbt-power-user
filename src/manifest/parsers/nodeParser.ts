import { provide } from "inversify-binding-decorators";
import { createFullPathForNode } from ".";
import { NodeMetaMap } from "../../domain";
import { DBTProject } from "../dbtProject";

@provide(NodeParser)
export class NodeParser {
  createNodeMetaMap(
    projectName: string,
    nodesMap: any[],
    rootPath: string
  ): Promise<NodeMetaMap> {
    return new Promise((resolve) => {
      const modelMetaMap: NodeMetaMap = new Map();
      if (nodesMap === null || nodesMap === undefined) {
        resolve(modelMetaMap);
      }
      Object.values(nodesMap)
        .filter(
          (model) =>
            model.resource_type === DBTProject.RESOURCE_TYPE_MODEL ||
            model.resource_type === DBTProject.RESOURCE_TYPE_SEED ||
            model.resource_type === DBTProject.RESOURCE_TYPE_SNAPSHOT
        )
        .forEach(
          ({
            name,
            original_file_path,
            database,
            schema,
            alias,
            package_name,
            unique_id,
          }) => {
            const fullPath = createFullPathForNode(
              projectName,
              rootPath,
              package_name,
              original_file_path
            );
            if (!fullPath) {
              return;
            }
            modelMetaMap.set(name, {
              path: fullPath,
              database,
              schema,
              alias,
              package_name,
              uniqueId: unique_id,
            });
          }
        );
      resolve(modelMetaMap);
    });
  }
}
