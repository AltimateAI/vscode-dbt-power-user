import {
  GraphMetaMap,
  MetricMetaMap,
  NodeData,
  NodeGraphMap,
  NodeMetaMap,
  SourceMetaMap,
  TestMetaMap,
} from "../domain";
import { DBTTerminal } from "../terminal";
import { DBTProjectIntegrationAdapter } from "../dbtIntegrationAdapter";
import { RESOURCE_TYPE_METRIC, RESOURCE_TYPE_TEST } from "../dbtIntegration";

const notEmpty = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

export type DBTGraphType = {
  [name: string]: string[];
};

export class GraphParser {
  constructor(private terminal: DBTTerminal) {}

  createGraphMetaMap(
    project: DBTProjectIntegrationAdapter,
    parentMap: DBTGraphType,
    childrenMap: DBTGraphType,
    nodeMetaMap: NodeMetaMap,
    sourceMetaMap: SourceMetaMap,
    testMetaMap: TestMetaMap,
    metricMetaMap: MetricMetaMap,
  ): GraphMetaMap {
    const projectRoot = project.getProjectRoot();
    const projectName = project.getProjectName();
    this.terminal.debug(
      "GraphParser",
      `Parsing graph for "${projectName}" at ${projectRoot}`,
    );
    const parents: NodeGraphMap = Object.entries(parentMap).reduce(
      (map, [nodeName, nodes]) => {
        const currentNodes = nodes
          .map(
            this.mapToNode(
              sourceMetaMap,
              nodeMetaMap,
              testMetaMap,
              metricMetaMap,
            ),
          )
          .filter(notEmpty);
        map.set(nodeName, { nodes: currentNodes });
        return map;
      },
      new Map(),
    );

    const children: NodeGraphMap = Object.entries(childrenMap).reduce(
      (map, [nodeName, nodes]) => {
        const currentNodes = nodes
          .map(
            this.mapToNode(
              sourceMetaMap,
              nodeMetaMap,
              testMetaMap,
              metricMetaMap,
            ),
          )
          .filter((n) => n?.resourceType !== RESOURCE_TYPE_TEST)
          .filter(notEmpty);
        map.set(nodeName, { nodes: currentNodes });
        return map;
      },
      new Map(),
    );

    const tests: NodeGraphMap = Object.entries(childrenMap).reduce(
      (map, [nodeName, nodes]) => {
        const currentNodes = nodes
          .map(
            this.mapToNode(
              sourceMetaMap,
              nodeMetaMap,
              testMetaMap,
              metricMetaMap,
            ),
          )
          .filter((n) => n?.resourceType === RESOURCE_TYPE_TEST)
          .filter(notEmpty);
        map.set(nodeName, { nodes: currentNodes });
        return map;
      },
      new Map(),
    );

    const metrics: NodeGraphMap = Object.entries(childrenMap).reduce(
      (map, [nodeName, nodes]) => {
        const currentNodes = nodes
          .map(
            this.mapToNode(
              sourceMetaMap,
              nodeMetaMap,
              testMetaMap,
              metricMetaMap,
            ),
          )
          .filter((n) => n?.resourceType === RESOURCE_TYPE_METRIC)
          .filter(notEmpty);
        map.set(nodeName, { nodes: currentNodes });
        return map;
      },
      new Map(),
    );

    const graph = {
      parents,
      children,
      tests,
      metrics,
    };
    this.terminal.debug(
      "GraphParser",
      `Returning graph for "${projectName}" at ${projectRoot}`,
      graph,
    );
    return graph;
  }

  mapToNode(
    sourceMetaMap: SourceMetaMap,
    nodeMetaMap: NodeMetaMap,
    testMetaMap: TestMetaMap,
    metricMetaMap: MetricMetaMap,
  ): (parentNodeName: string) => NodeData | undefined {
    return (parentNodeName) => {
      // Support dots in model names
      const [nodeType, nodePackage, ...restNodeName] =
        parentNodeName.split(".");
      const nodeName = restNodeName.join(".");
      switch (nodeType) {
        case "source": {
          const [sourceName, tableName] = nodeName.split(".");
          const url = sourceMetaMap
            .get(sourceName)
            ?.tables.find((table) => table.name === tableName)?.path!;
          return {
            label: `${tableName} (${sourceName})`,
            key: parentNodeName,
            url: url,
            resourceType: "source",
          };
        }
        case "model": {
          // can this ever be not there?
          const model = nodeMetaMap.lookupByUniqueId(parentNodeName);
          if (!model) {
            return;
          }
          const url = model?.path!;
          return {
            label: model.alias,
            key: parentNodeName,
            url: url,
            resourceType: "model",
          };
        }
        case "seed": {
          // can this ever be not there?
          const model = nodeMetaMap.lookupByUniqueId(parentNodeName);
          if (!model) {
            return;
          }
          const url = model?.path!;
          return {
            label: model.alias,
            key: parentNodeName,
            url: url,
            resourceType: "seed",
          };
        }
        case "test": {
          // nodeName => more interesting label possibilities?
          // console.log(`${nodeName} => (parent: ${parentNodeName})`);
          const url = testMetaMap.get(nodeName.split(".")[0])?.path;
          return {
            label: nodeName,
            key: parentNodeName,
            url: url,
            resourceType: "test",
          };
        }
        case "analysis": {
          const url = nodeMetaMap.lookupByBaseName(nodeName)?.path!;
          return {
            label: nodeName,
            key: parentNodeName,
            url: url,
            resourceType: "analysis",
          };
        }
        case "snapshot": {
          const url = nodeMetaMap.lookupByBaseName(nodeName)?.path!;
          return {
            label: nodeName,
            key: parentNodeName,
            url: url,
            resourceType: "snapshot",
          };
        }
        case "exposure": {
          const url = nodeMetaMap.lookupByBaseName(nodeName)?.path!;
          return {
            label: nodeName,
            key: parentNodeName,
            url: url,
            resourceType: "exposure",
          };
        }
        case "semantic_model": {
          return {
            label: nodeName,
            key: parentNodeName,
            resourceType: "semantic_model",
          };
        }
        default:
          console.log(`Node Type '${nodeType}' not implemented!`);
          return undefined;
      }
    };
  }
}
