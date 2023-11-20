import { provide } from "inversify-binding-decorators";
import {
  Analysis,
  Exposure,
  GraphMetaMap,
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

type DBTGraphType = {
  [name: string]: string[];
};

@provide(GraphParser)
export class GraphParser {
  createGraphMetaMap(
    parentMap: DBTGraphType,
    childrenMap: DBTGraphType,
    nodeMetaMap: NodeMetaMap,
    sourceMetaMap: SourceMetaMap,
    testMetaMap: TestMetaMap,
  ): GraphMetaMap {
    const unique = (nodes: any[]) => Array.from(new Set(nodes));

    const parents: NodeGraphMap = Object.entries(parentMap).reduce(
      (map, [nodeName, nodes]) => {
        const currentNodes = unique(nodes)
          .map(this.mapToNode(sourceMetaMap, nodeMetaMap, testMetaMap))
          .filter(notEmpty);
        map.set(nodeName, { nodes: currentNodes });
        return map;
      },
      new Map(),
    );

    const children: NodeGraphMap = Object.entries(childrenMap).reduce(
      (map, [nodeName, nodes]) => {
        const currentNodes = unique(nodes)
          .map(this.mapToNode(sourceMetaMap, nodeMetaMap, testMetaMap))
          .filter((n) => !(n instanceof Test))
          .filter(notEmpty);
        map.set(nodeName, { nodes: currentNodes });
        return map;
      },
      new Map(),
    );

    const tests: NodeGraphMap = Object.entries(childrenMap).reduce(
      (map, [nodeName, nodes]) => {
        const currentNodes = unique(nodes)
          .map(this.mapToNode(sourceMetaMap, nodeMetaMap, testMetaMap))
          .filter((n) => n instanceof Test)
          .filter(notEmpty);
        map.set(nodeName, { nodes: currentNodes });
        return map;
      },
      new Map(),
    );

    return {
      parents,
      children,
      tests,
    };
  }

  mapToNode(
    sourceMetaMap: SourceMetaMap,
    nodeMetaMap: NodeMetaMap,
    testMetaMap: TestMetaMap,
  ): (parentNodeName: string) => Node | undefined {
    return (parentNodeName) => {
      // Support dots in model names
      const [nodeType, nodePackage, ...restNodeName] =
        parentNodeName.split(".");
      const nodeName = restNodeName.join(".");
      switch (nodeType) {
        case "source": {
          // TODO: match source label to graph children nodes key
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
          const url = nodeMetaMap.get(nodeName)?.path!;
          return new Model(nodeName, parentNodeName, url);
        }
        case "seed": {
          const url = nodeMetaMap.get(nodeName)?.path!;
          return new Seed(nodeName, parentNodeName, url);
        }
        case "test": {
          // nodeName => more interesting label possibilities?
          // console.log(`${nodeName} => (parent: ${parentNodeName})`);
          const url = testMetaMap.get(nodeName.split(".")[0])?.path;
          return new Test(nodeName, parentNodeName, url ?? "");
        }
        case "analysis": {
          const url = nodeMetaMap.get(nodeName)?.path!;
          return new Analysis(nodeName, parentNodeName, url);
        }
        case "snapshot": {
          const url = nodeMetaMap.get(nodeName)?.path!;
          return new Snapshot(nodeName, parentNodeName, url);
        }
        case "exposure": {
          const url = nodeMetaMap.get(nodeName)?.path!;
          return new Exposure(nodeName, parentNodeName, url);
        }
        default:
          console.log(`Node Type '${nodeType}' not implemented!`);
          return undefined;
      }
    };
  }
}
