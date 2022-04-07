import { provide } from "inversify-binding-decorators";
import {
  Analysis,
  GraphMetaMap,
  Model,
  NodeGraphMap,
  NodeMetaMap,
  Seed,
  Source,
  SourceMetaMap,
  Test,
  Node,
  Snapshot,
  Exposure,
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
    modelMetaMap: NodeMetaMap,
    sourceMetaMap: SourceMetaMap
  ): GraphMetaMap {
    const unique = (nodes: any[]) => Array.from(new Set(nodes));

    const parents: NodeGraphMap = Object.entries(parentMap).reduce(
      (map, [nodeName, nodes]) => {
        const currentNodes = unique(nodes)
          .map(this.mapToNode(sourceMetaMap, modelMetaMap))
          .filter(notEmpty);
        map.set(nodeName, { nodes: currentNodes });
        return map;
      },
      new Map()
    );

    const children: NodeGraphMap = Object.entries(childrenMap).reduce(
      (map, [nodeName, nodes]) => {
        const currentNodes = unique(nodes)
          .map(this.mapToNode(sourceMetaMap, modelMetaMap))
          .filter(notEmpty);
        map.set(nodeName, { nodes: currentNodes });
        return map;
      },
      new Map()
    );

    return {
      parents,
      children,
    };
  }

  mapToNode(
    sourceMetaMap: SourceMetaMap,
    nodeMetaMap: NodeMetaMap
  ): (parentNodeName: string) => Node | undefined {
    return (parentNodeName) => {
      // Support dots in model names
      const [nodeType, nodePackage, ...restNodeName] = parentNodeName.split(".");
      const modelName = restNodeName.join('.');
      switch (nodeType) {
        case "source": {
          const [sourceName, tableName] = modelName.split('.');
          const url = sourceMetaMap.get(sourceName)?.tables.find(table => table.name === tableName)?.path!;
          return new Source(
            `${tableName} (${sourceName})`,
            parentNodeName,
            url
          );
        }
        case "model": {
          const url = nodeMetaMap.get(modelName)?.path!;
          return new Model(modelName, parentNodeName, url);
        }
        case "seed": {
          const url = nodeMetaMap.get(modelName)?.path!;
          return new Seed(modelName, parentNodeName, url);
        }
        case "test": {
          const url = nodeMetaMap.get(modelName)?.path!;
          return new Test(modelName, parentNodeName, url);
        }
        case "analysis": {
          const url = nodeMetaMap.get(modelName)?.path!;
          return new Analysis(modelName, parentNodeName, url);
        }
        case "snapshot": {
          const url = nodeMetaMap.get(modelName)?.path!;
          return new Snapshot(modelName, parentNodeName, url);
        }
        case "exposure": {
          const url = nodeMetaMap.get(modelName)?.path!;
          return new Exposure(modelName, parentNodeName, url);
        }
        default:
          console.log(`Node Type '${nodeType}' not implemented!`);
          return undefined;
      }
    };
  }
}
