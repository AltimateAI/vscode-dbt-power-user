import {
  NodeMetaData,
  NodeMetaMap,
  RESOURCE_TYPE_MODEL,
  RESOURCE_TYPE_SEED,
  RESOURCE_TYPE_SNAPSHOT,
} from "@altimateai/dbt-integration";

/** A loaded project's node map, keyed in the providers by project root. */
export interface ProjectNodeMap {
  projectName: string;
  nodeMap: NodeMetaMap;
}

// Resource types a `ref()` can point at, in the order dbt prefers them.
const REF_RESOURCE_TYPES = [
  RESOURCE_TYPE_MODEL,
  RESOURCE_TYPE_SEED,
  RESOURCE_TYPE_SNAPSHOT,
];

const lookupByPackage = (
  nodeMap: NodeMetaMap,
  packageName: string,
  name: string,
): NodeMetaData | undefined => {
  for (const resourceType of REF_RESOURCE_TYPES) {
    // An unversioned unique id resolves to the latest version.
    const node = nodeMap.lookupByUniqueId(
      `${resourceType}.${packageName}.${name}`,
    );
    if (node) {
      return node;
    }
  }
  return undefined;
};

/**
 * Resolves the node a `ref()` points at.
 *
 * - `ref('name')`: the current project's own node first, as dbt resolves it
 *   (this also covers versioned models), then the base-name lookup, which
 *   reaches installed packages.
 * - `ref('package', 'name')`: the node with that package, never a same-named
 *   node from another package. A dbt Mesh node injected by a plugin such as
 *   dbt-loom has no local file; when the producer project is loaded in the
 *   workspace, its own node (with file, description and columns) is used:
 *   the node with the same unique id first, so the version matches what the
 *   consumer resolved, else the producer's latest.
 */
export const lookupRefNode = (
  current: ProjectNodeMap,
  loadedProjects: Iterable<ProjectNodeMap>,
  name: string,
  packageName?: string,
): NodeMetaData | undefined => {
  if (packageName === undefined) {
    return (
      lookupByPackage(current.nodeMap, current.projectName, name) ??
      current.nodeMap.lookupByBaseName(name)
    );
  }
  const node = lookupByPackage(current.nodeMap, packageName, name);
  if (node?.path || packageName === current.projectName) {
    return node;
  }
  for (const project of loadedProjects) {
    if (project !== current && project.projectName === packageName) {
      // Prefer the exact version the consumer manifest resolved; a stale
      // producer manifest in the consumer can lag the producer's latest.
      const producerNode =
        (node && project.nodeMap.lookupByUniqueId(node.unique_id)) ||
        lookupByPackage(project.nodeMap, packageName, name);
      if (producerNode) {
        return producerNode;
      }
    }
  }
  return node;
};
