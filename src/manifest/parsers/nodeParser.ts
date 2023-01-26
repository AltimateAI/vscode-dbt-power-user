import { provide } from "inversify-binding-decorators";
import * as path from "path";
import { NodeMetaMap } from "../../domain";
import { DBTProject } from "../dbtProject";

@provide(NodeParser)
export class NodeParser {
  createNodeMetaMap(nodesMap: any[], rootPath: string): Promise<NodeMetaMap> {
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
          }) => {
            const fullPath = path.join(rootPath, original_file_path);
            modelMetaMap.set(name, {
              path: fullPath,
              database,
              schema,
              alias,
              package_name,
            });
          }
        );
      resolve(modelMetaMap);
    });
  }
}
