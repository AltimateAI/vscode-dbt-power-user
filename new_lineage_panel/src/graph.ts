import { Edge, Node } from "reactflow";
import {
  applyEdgeStyling,
  C_NODE_H,
  C_OFFSET_X,
  C_OFFSET_Y,
  C_PADDING_Y,
  COLUMN_PREFIX,
  createForwardEdge,
  createTableNode,
  defaultEdgeStyle,
  highlightEdgeStyle,
  highlightMarker,
  isColumn,
  isNotColumn,
  LEVEL_SEPARATION,
  MAX_EXPAND_TABLE,
  SEE_MORE_PREFIX,
  T_NODE_H,
  T_NODE_W,
} from "./utils";
import { getConnectedColumns, Table } from "./service";

export const createNewNodesEdges = (
  prevNodes: Node[],
  prevEdges: Edge[],
  tables: Table[],
  t: string,
  right: boolean,
  level: number,
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
      newNodes.push(createTableNode(_t, newLevel, t));
    }
    addUniqueEdge(createForwardEdge(t, _t.table, right));
  });

  if (tables.length > MAX_EXPAND_TABLE) {
    const _t = SEE_MORE_PREFIX + t + "-" + (right ? "1" : "0");
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
      if (!(n.parentNode in tableWiseColumnIndex)) {
        tableWiseColumnIndex[n.parentNode] = 0;
      }

      n.position = {
        x: C_OFFSET_X,
        y: tableWiseColumnIndex[n.parentNode] * C_NODE_H +
          C_OFFSET_Y +
          (C_PADDING_Y >> 1),
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
    if (n.id.startsWith(SEE_MORE_PREFIX)) {
      return ((_count - 1) >> 1) * T_NODE_H + 100;
    }
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

export const resetTableHighlights = (
  nodes: Node[],
  edges: Edge[],
): [Node[], Edge[]] => {
  nodes.forEach((n) => (n.style = { opacity: 1 }));
  edges.forEach((e) => applyEdgeStyling(e, false));
  return [nodes, edges];
};

export const highlightTableConnections = (
  nodes: Node[],
  edges: Edge[],
  table: string,
): [Node[], Edge[]] => {
  const highlightNode: Record<string, boolean> = {};
  const highlightEdge: Record<string, boolean> = {};
  const bfsTraversal = (src: "source" | "target", dst: "source" | "target") => {
    const queue = [table];
    const visited: Record<string, boolean> = {};
    while (queue.length > 0) {
      const curr = queue.shift()!;
      visited[curr] = true;
      highlightNode[curr] = true;
      edges.forEach((e) => {
        if (e[src] === curr) {
          highlightEdge[e.id] = true;
          if (!visited[e[dst]]) queue.push(e[dst]);
        }
      });
    }
  };
  bfsTraversal("source", "target");
  bfsTraversal("target", "source");

  // apply styling
  const newEdges = [...edges];
  newEdges.forEach((_e) => applyEdgeStyling(_e, highlightEdge[_e.id]));

  const newNodes = [...nodes];
  newNodes.forEach(
    (_n) => (_n.style = { opacity: highlightNode[_n.id] ? 1 : 0.5 }),
  );

  return [newNodes, newEdges];
};

// TODO: fix member_profile-> expand left, expand right, collapse left, collapse right
export const removeRelatedNodesEdges = (
  prevNodes: Node[],
  prevEdges: Edge[],
  table: string,
  right: boolean,
  level: number,
): [Node[], Edge[]] => {
  const nodesToRemove: Record<string, boolean> = {};
  const edgesToRemove: Record<string, boolean> = {};
  const src = right ? "source" : "target";
  const dst = !right ? "source" : "target";

  const nodesIdMap: Record<string, Node> = {};
  for (const n of prevNodes) {
    if (isColumn(n)) continue;
    nodesIdMap[n.id] = n;
  }

  // TODO: check visited == nodesToRemove
  const queue = [table];
  const visited: Record<string, boolean> = {};
  while (queue.length > 0) {
    const curr = queue.shift()!;
    visited[curr] = true;
    prevEdges.forEach((e) => {
      const performVisit = (
        src: "source" | "target",
        dst: "source" | "target",
      ) => {
        if (e[src] !== curr) return;
        const _t = e[dst];
        if (visited[_t]) return;
        const _level = nodesIdMap[_t].data.level;
        if ((right && _level > level) || (!right && _level < level)) {
          queue.push(_t);
          nodesToRemove[_t] = true;
        }
      };
      performVisit(src, dst);
      performVisit(dst, src);
    });
  }

  const columnNodesToRemove: Record<string, boolean> = {};
  const columnEdgesToRemove: Record<string, boolean> = {};

  prevNodes.forEach((n) => {
    if (!nodesToRemove[n.parentNode || ""]) return;
    columnNodesToRemove[n.id] = true;
  });

  prevEdges.forEach((e) => {
    if (isNotColumn(e)) {
      edgesToRemove[e.id] = nodesToRemove[e.source] ||
        nodesToRemove[e.target] || e[src] === table;
    } else {
      columnEdgesToRemove[e.id] = columnNodesToRemove[e.source] ||
        columnNodesToRemove[e.target];
    }
  });

  const remove =
    (dict: Record<string, boolean>) => (x: { id: string | number }) =>
      !dict[x.id];

  const newNodes = prevNodes
    .filter(remove(columnNodesToRemove))
    .filter(remove(nodesToRemove));
  const newEdges = prevEdges
    .filter(remove(columnEdgesToRemove))
    .filter(remove(edgesToRemove));

  const _node = newNodes.find((_n) => _n.id === table);
  if (_node) _node.data.processed[right ? 1 : 0] = false;

  return [newNodes, newEdges];
};

export const processColumnLineage = async (
  _nodes: Node[],
  _edges: Edge[],
  column: { name: string; table: string },
) => {
  let nodes = _nodes.filter(isNotColumn);
  let edges = _edges.filter(isNotColumn);
  [nodes, edges] = resetTableHighlights(nodes, edges);

  const levelMap: Record<string, number> = {};
  nodes.forEach((n) => (levelMap[n.id] = n.data.level));

  const tableNodes: Record<string, boolean> = {};
  _nodes
    .filter((_n) => _n.type === "table")
    .forEach((_n) => (tableNodes[_n.id] = true));
  const seeMoreIdTableReverseMap: Record<string, string> = {};
  const edgesPayload = [];
  for (const e of _edges) {
    if (e.id.startsWith(COLUMN_PREFIX)) continue;
    const sourceTableExist = tableNodes[e.source];
    const targetTableExist = tableNodes[e.target];
    if (sourceTableExist && targetTableExist) {
      edgesPayload.push({ src: e.source, dst: e.target });
    } else if (sourceTableExist) {
      const _n = _nodes.find((_n) => _n.id === e.target)!;
      _n.data.tables.forEach((_t: { table: string }) => {
        edgesPayload.push({ src: e.source, dst: _t.table });
        seeMoreIdTableReverseMap[_t.table] = e.target;
      });
    } else if (targetTableExist) {
      const _n = _nodes.find((_n) => _n.id === e.source)!;
      _n.data.tables.forEach((_t: { table: string }) => {
        edgesPayload.push({ src: _t.table, dst: e.target });
        seeMoreIdTableReverseMap[_t.table] = e.source;
      });
    } else {
      // TODO: check is nothing to do in this case
    }
  }

  const { collectColumns, highlightEdges } = await getConnectedColumns({
    column: column.name,
    table: column.table,
    edges: edgesPayload,
  });

  for (const t in collectColumns) {
    if (!tableNodes[t]) continue;
    collectColumns[t].sort();
    for (const c of collectColumns[t]) {
      nodes.push({
        id: COLUMN_PREFIX + `${t}/${c}`,
        data: { column: c, table: t },
        parentNode: t,
        extent: "parent",
        draggable: false,
        type: "column",
        position: { x: 100, y: 100 },
      });
    }
  }

  edges.forEach((_e) => (_e.style = defaultEdgeStyle));
  const addToEdges = (
    columnId: string,
    id1: string,
    id2: string,
    source: string,
    target: string,
  ) => {
    const [sourceHandle, targetHandle] = getSourceTargetHandles(
      levelMap[id1],
      levelMap[id2],
    );
    edges.push({
      id: columnId,
      source,
      target,
      sourceHandle,
      targetHandle,
      style: highlightEdgeStyle,
      zIndex: 1000,
      markerEnd: highlightMarker,
      type: levelMap[id1] === levelMap[id2] ? "smoothstep" : "default",
    });
  };

  for (const e of highlightEdges) {
    const [t0] = e[0].split("/");
    const [t1] = e[1].split("/");

    const sourceTableExist = tableNodes[t0];
    const targetTableExist = tableNodes[t1];
    const columnId = COLUMN_PREFIX + `${e[0]}-${e[1]}`;

    if (sourceTableExist && targetTableExist) {
      addToEdges(columnId, t0, t1, COLUMN_PREFIX + e[0], COLUMN_PREFIX + e[1]);
    } else if (sourceTableExist) {
      addToEdges(
        columnId,
        t0,
        seeMoreIdTableReverseMap[t1],
        COLUMN_PREFIX + e[0],
        seeMoreIdTableReverseMap[t1],
      );
    } else if (targetTableExist) {
      addToEdges(
        columnId,
        seeMoreIdTableReverseMap[t0],
        t1,
        seeMoreIdTableReverseMap[t0],
        COLUMN_PREFIX + e[1],
      );
    } else {
      // TODO: check is nothing to do in this case
    }
  }

  layoutElementsOnCanvas(nodes, edges);

  return { nodes, edges, collectColumns };
};

const getSourceTargetHandles = (
  l0: number,
  l1: number,
): ["left" | "right", "left" | "right"] => {
  if (l0 < l1) {
    return ["right", "left"];
  }
  // TODO: check if this case will happen for dbt
  if (l0 > l1) {
    return ["left", "right"];
  }
  if (l0 < 0) {
    return ["left", "left"];
  }
  return ["right", "right"];
};

export const removeColumnNodes = (
  _nodes: Node[],
  _edges: Edge[],
): [Node[], Edge[]] => {
  const nodes = _nodes.filter((n) => isNotColumn(n));
  const edges = _edges.filter((n) => isNotColumn(n));
  return [nodes, edges];
};
