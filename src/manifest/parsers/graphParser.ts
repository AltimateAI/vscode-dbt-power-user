import { provide } from "inversify-binding-decorators";
import {
  Analysis,
  Exposure,
  GraphMetaMap,
  Metric,
  MetricMetaMap,
  Model,
  Node,
  NodeGraphMap,
  NodeMetaMap,
  Seed,
  Snapshot,
  Source,
  SourceMetaMap,
  Test,
  TestMetaMap,
} from "../../domain";
import { notEmpty } from "../../utils";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { DBTProject } from "../dbtProject";

type DBTGraphType = {
  [name: string]: string[];
};

@provide(GraphParser)
export class GraphParser {
  constructor(private terminal: DBTTerminal) {}

  createGraphMetaMap(
    project: DBTProject,
    parentMap: DBTGraphType,
    childrenMap: DBTGraphType,
    nodeMetaMap: NodeMetaMap,
    sourceMetaMap: SourceMetaMap,
    testMetaMap: TestMetaMap,
    metricMetaMap: MetricMetaMap,
  ): GraphMetaMap {
    this.terminal.debug(
      "GraphParser",
      `Parsing graph for "${project.getProjectName()}" at ${
        project.projectRoot
      }`,
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
          .filter((n) => !(n instanceof Test))
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
          .filter((n) => n instanceof Test)
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
          .filter((n) => n instanceof Metric)
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
      `Returning graph for "${project.getProjectName()}" at ${
        project.projectRoot
      }`,
      graph,
    );
    return graph;
  }

  mapToNode(
    sourceMetaMap: SourceMetaMap,
    nodeMetaMap: NodeMetaMap,
    testMetaMap: TestMetaMap,
    metricMetaMap: MetricMetaMap,
  ): (parentNodeName: string) => Node | undefined {
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
          return new Source(
            `${tableName} (${sourceName})`,
            parentNodeName,
            url,
          );
        }
        case "model": {
          // can this ever be not there?
          const model = nodeMetaMap.lookupByUniqueId(parentNodeName);
          if (!model) {
            return;
          }
          const url = model?.path!;
          return new Model(model.alias, parentNodeName, url);
        }
        case "seed": {
          // can this ever be not there?
          const model = nodeMetaMap.lookupByUniqueId(parentNodeName);
          if (!model) {
            return;
          }
          const url = model?.path!;
          return new Seed(model.alias, parentNodeName, url);
        }
        case "test": {
          // nodeName => more interesting label possibilities?
          // console.log(`${nodeName} => (parent: ${parentNodeName})`);
          const url = testMetaMap.get(nodeName.split(".")[0])?.path;
          return new Test(nodeName, parentNodeName, url ?? "");
        }
        case "analysis": {
          const url = nodeMetaMap.lookupByBaseName(nodeName)?.path!;
          return new Analysis(nodeName, parentNodeName, url);
        }
        case "snapshot": {
          const url = nodeMetaMap.lookupByBaseName(nodeName)?.path!;
          return new Snapshot(nodeName, parentNodeName, url);
        }
        case "exposure": {
          const url = nodeMetaMap.lookupByBaseName(nodeName)?.path!;
          return new Exposure(nodeName, parentNodeName, url);
        }
        case "semantic_model": {
          return new Metric(nodeName, parentNodeName);
        }
        default:
          console.log(`Node Type '${nodeType}' not implemented!`);
          return undefined;
      }
    };
  }
}
