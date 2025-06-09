import { provide } from "inversify-binding-decorators";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { createFullPathForNode } from "./utils";

@provide(ModelDepthParser)
export class ModelDepthParser {
  constructor(private terminal: DBTTerminal) {}

  public createModelDepthsMap(manifest: any): Map<string, number> {
    const modelDepths = new Map<string, number>();

    if (!manifest) {
      return modelDepths;
    }

    // Get all models from the manifest
    const models: { name: string; id: string }[] = [];
    const nodes = manifest.nodes;

    for (const [id, node] of Object.entries(nodes)) {
      if ((node as any).resource_type === "model") {
        models.push({
          name: (node as any).name,
          id: id,
        });
      }
    }

    // Build dependency graph for models only (parent-child based on the manifest's parent_map)
    const parentGraph: Map<string, string[]> = new Map();
    const childGraph: Map<string, string[]> = new Map();

    const parent_map = manifest.parent_map || {};

    for (const model of models) {
      const parents = parent_map[model.id] || [];
      // Only include parent models, not sources or other node types
      const parentModels = parents.filter((parent: string) =>
        parent.startsWith("model."),
      );

      parentGraph.set(model.id, parentModels);

      // Build reverse graph for topological sort
      for (const parent of parentModels) {
        if (!childGraph.has(parent)) {
          childGraph.set(parent, []);
        }
        childGraph.get(parent)!.push(model.id);
      }

      if (!childGraph.has(model.id)) {
        childGraph.set(model.id, []);
      }
    }

    // Calculate depths using topological sort approach for longest paths
    const depths = new Map<string, number>();
    const inDegree = new Map<string, number>();

    // Initialize depths and in-degrees
    for (const model of models) {
      const modelParents = parentGraph.get(model.id) || [];
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
      const children = childGraph.get(currentId) || [];
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
