import { Edge, Node } from "reactflow";
import {
  C_NODE_H,
  C_OFFSET_X,
  C_OFFSET_Y,
  C_PADDING_Y,
  LEVEL_SEPARATION,
  MAX_EXPAND_TABLE,
  SEE_MORE_PREFIX,
  T_NODE_H,
  T_NODE_W,
  createForwardEdge,
  createReverseEdge,
  createTableNode,
  isColumn,
} from "./utils";

export const createNewNodesEdges = (
  prevNodes: Node[],
  prevEdges: Edge[],
  tables: { table: string; count: number; url: string }[],
  t: string,
  right: boolean,
  level: number
): [Node[], Edge[]] => {
  const newNodes = [...prevNodes];
  const newEdges = [...prevEdges];
  const newLevel = right ? level + 1 : level - 1;
  const _node = newNodes.find((_n) => _n.id === t);
  if (_node) _node.data.processed[right ? 1 : 0] = true;

  const addUniqueEdge = (_edge: Edge) => {
    const existingEdge = newEdges.find((e) => e.id === _edge.id);
    if (!existingEdge) newEdges.push(_edge);
  };

  tables.slice(0, MAX_EXPAND_TABLE).forEach((_t) => {
    const existingNode = newNodes.find((_n) => _n.id === _t.table);
    if (!existingNode) {
      newNodes.push(createTableNode(_t, right, newLevel, t));
      addUniqueEdge(createForwardEdge(t, _t.table, right));
    } else if (right && existingNode.data.level < level) {
      addUniqueEdge(createReverseEdge(t, _t.table, true));
    } else if (!right && existingNode.data.level > level) {
      addUniqueEdge(createReverseEdge(t, _t.table, false));
    } else if (t === _t.table) {
      addUniqueEdge(createForwardEdge(t, _t.table, right));
    }
  });

  if (tables.length > MAX_EXPAND_TABLE) {
    const _t = SEE_MORE_PREFIX + t;
    newNodes.push({
      id: _t,
      data: {
        tables,
        prevTable: t,
        right,
        level: newLevel,
      },
      position: { x: 100, y: 100 },
      type: "seeMore",
      width: T_NODE_W,
      height: 100,
    });
    addUniqueEdge(createForwardEdge(t, _t, right));
  }

  return [newNodes, newEdges];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const layoutElementsOnCanvas = (nodes: Node[], _edges: Edge[]) => {
  let minLevel = Infinity;
  let maxLevel = -Infinity;
  const levelWiseCount: { [k: number]: number } = {};
  const levelWiseIndex: { [k: number]: number } = {};
  const tableWiseColumnIndex: { [k: string]: number } = {};

  for (const n of nodes) {
    if (isColumn(n) && n.parentNode) {
      if (!(n.parentNode in tableWiseColumnIndex))
        tableWiseColumnIndex[n.parentNode] = 0;

      n.position = {
        x: C_OFFSET_X,
        y:
          tableWiseColumnIndex[n.parentNode] * C_NODE_H +
          C_OFFSET_Y +
          (C_PADDING_Y >> 1) +
          2,
      };
      tableWiseColumnIndex[n.parentNode]++;
      continue;
    }
    const level = n.data.level;
    minLevel = Math.min(minLevel, level);
    maxLevel = Math.max(maxLevel, level);
    if (!(level in levelWiseCount)) {
      levelWiseCount[level] = 0;
      levelWiseIndex[level] = 0;
    }
    levelWiseCount[level]++;
  }

  const getY = (n: Node, level: number) => {
    const _count = levelWiseCount[level];
    const _index = levelWiseIndex[level];
    if (n.id.startsWith(SEE_MORE_PREFIX))
      return ((_count - 1) >> 1) * T_NODE_H + 100;
    levelWiseIndex[level]++;
    return (_index - (_count >> 1)) * T_NODE_H + 100;
  };

  for (const n of nodes) {
    if (isColumn(n)) {
      continue;
    }
    const level = n.data.level;
    const basisLevel = level - minLevel;
    const x = basisLevel * (T_NODE_W + LEVEL_SEPARATION) + 100;
    const y = getY(n, level);
    n.position = { x, y };
  }
};
