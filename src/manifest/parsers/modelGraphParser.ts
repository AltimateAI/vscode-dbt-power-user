import { provide } from "inversify-binding-decorators";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { ModelGraphMetaMap } from "../../domain";
import { DBTProject } from "../dbtProject";

@provide(ModelGraphParser)
export class ModelGraphParser {
  constructor(private terminal: DBTTerminal) {}

  createModelGraphMetaMap(
    nodesMap: any[],
    sourcesMap: any[],
    rootPath: string
  ): Promise<ModelGraphMetaMap> {
    return new Promise((resolve) => {
      const modelGraphMap: ModelGraphMetaMap = new Map();
      Object.values(nodesMap)
        .filter((node) => node.resource_type === DBTProject.RESOURCE_TYPE_MODEL)
        .forEach(({ name, depends_on, unique_id }) => {
          modelGraphMap.set(unique_id, {
            uniqueId: unique_id,
            name,
            dependencies:
              depends_on !== undefined ? depends_on["nodes"] : undefined,
          });
        });
      Object.values(sourcesMap)
        .filter(
          (source) => source.resource_type === DBTProject.RESOURCE_TYPE_SOURCE
        )
        .forEach(({ unique_id, source_name, identifier }) => {
          modelGraphMap.set(unique_id, {
            uniqueId: unique_id,
            name: `${source_name}_${identifier}`,
          });
        });
      resolve(modelGraphMap);
    });
  }
}
