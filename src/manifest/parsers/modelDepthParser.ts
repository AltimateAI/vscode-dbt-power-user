import { provide } from "inversify-binding-decorators";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { DBTGraphType } from "./graphParser";

@provide(ModelDepthParser)
export class ModelDepthParser {
  constructor(private terminal: DBTTerminal) {}

  public createModelDepthsMap(
    nodeMap: any[],
    parentMetaMap: DBTGraphType,
    childMetaMap: DBTGraphType,
  ): Map<string, number> {
    const modelDepths = new Map<string, number>();

    // Get all models from the manifest
    const models: { name: string; id: string }[] = [];

    for (const [id, node] of Object.entries(nodeMap)) {
      if (node.resource_type === "model") {
        models.push({
          name: node.name,
          id: id,
        });
      }
    }

    // Calculate depths using topological sort approach for longest paths
    const depths = new Map<string, number>();
    const inDegree = new Map<string, number>();

    // Initialize depths and in-degrees
    for (const model of models) {
      const parents = parentMetaMap[model.id] || [];
      const modelParents = parents.filter((parent) =>
        parent.startsWith("model."),
      );
      // Models that only depend on sources (no model dependencies) start at depth 1
      // Models that depend on other models start at depth 0 and will be calculated
      depths.set(model.id, modelParents.length === 0 ? 1 : 0);
      inDegree.set(model.id, modelParents.length);
    }

    // Queue for nodes with no model dependencies (only depend on sources)
    const queue: string[] = [];
    for (const model of models) {
      if (inDegree.get(model.id) === 0) {
        queue.push(model.id);
      }
    }

    // Process nodes in topological order
    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const currentDepth = depths.get(currentId)!;

      // Update depths of children (nodes that depend on this one)
      const children = childMetaMap[currentId] || [];
      for (const childId of children) {
        // Set depth to maximum of current depth or (parent depth + 1)
        const newDepth = Math.max(depths.get(childId)!, currentDepth + 1);
        depths.set(childId, newDepth);

        // Decrease in-degree and add to queue if all dependencies processed
        const newInDegree = inDegree.get(childId)! - 1;
        inDegree.set(childId, newInDegree);

        if (newInDegree === 0) {
          queue.push(childId);
        }
      }
    }

    // Store the calculated depths
    for (const model of models) {
      const depth = depths.get(model.id)!;
      modelDepths.set(model.name, depth);
      modelDepths.set(model.id, depth);
    }

    this.terminal.debug(
      "ModelDepthParser",
      `Model depths calculated for ${modelDepths.size} models`,
    );

    return modelDepths;
  }
}
