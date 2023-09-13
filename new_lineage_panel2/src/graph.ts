import { Edge, Node } from "reactflow";
import {
  C_NODE_H,
  C_OFFSET_X,
  C_OFFSET_Y,
  C_PADDING_Y,
  LEVEL_SEPARATION,
  SEE_MORE_PREFIX,
  T_NODE_H,
  T_NODE_W,
  isColumn,
} from "./utils";

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
