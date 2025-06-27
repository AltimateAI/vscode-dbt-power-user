import { DBTGraphType } from "./graphParser";

export class ChildrenParentParser {
  createChildrenParentMetaMap(
    nodesMap: any[],
  ): Promise<{ parentMetaMap: DBTGraphType; childMetaMap: DBTGraphType }> {
    const parentMetaMap: DBTGraphType = {};
    const childMetaMap: DBTGraphType = {};

    // Build parent map from depends_on.nodes
    Object.values(nodesMap).forEach((node) => {
      const dependsOn = node.depends_on?.nodes || [];
      parentMetaMap[node.unique_id] = dependsOn;
    });

    // Build child map by reversing relationships
    Object.entries(parentMetaMap).forEach(([child, parents]) => {
      parents.forEach((parent) => {
        childMetaMap[parent] = childMetaMap[parent] || [];
        childMetaMap[parent].push(child);
      });
    });

    return Promise.resolve({ parentMetaMap, childMetaMap });
  }
}
