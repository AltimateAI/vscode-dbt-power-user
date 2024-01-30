import { Edge, Node, ReactFlowInstance } from "reactflow";
import {
  applyEdgeStyling,
  C_NODE_H,
  C_OFFSET_X,
  C_OFFSET_Y,
  C_PADDING_Y,
  contains,
  createColumnEdge,
  createColumnNode,
  createTableEdge,
  createTableNode,
  getColumnEdgeId,
  getHelperDataForCLL,
  getSeeMoreId,
  isColumn,
  isNotColumn,
  LEVEL_SEPARATION,
  MAX_EXPAND_TABLE,
  P_OFFSET_X,
  P_OFFSET_Y,
  safeConcat,
  T_NODE_H,
  T_NODE_W,
  T_NODE_Y_SEPARATION,
} from "./utils";
import {
  ColumnLineage,
  downstreamTables,
  getConnectedColumns,
  Table,
  upstreamTables,
} from "./service";
import { Dispatch, SetStateAction } from "react";
import { COLUMN_PREFIX, SEE_MORE_PREFIX } from "./constants";
import { TMoreTables } from "./MoreTables";
import { CllContext } from "./service_utils";

const createNewNodesEdges = (
  prevNodes: Node[],
  prevEdges: Edge[],
  tables: Table[],
  t: string,
  right: boolean,
  level: number
): [Node[], Edge[]] => {
  const newNodes = [...prevNodes];
  const newEdges = [...prevEdges];
  const newLevel = right ? level + 1 : level - 1;
  const _node = newNodes.find((_n) => _n.id === t);
  if (_node) _node.data.processed[right ? 1 : 0] = true;

  const addUniqueEdge = (to: string) => {
    const toLevel = newNodes.find((n) => n.id === to)?.data?.level;
    const _edge = createTableEdge(level, toLevel, t, to, right);
    const existingEdge = newEdges.find((e) => e.id === _edge.id);
    if (!existingEdge) newEdges.push(_edge);
  };

  let tableAdded = 0;
  for (const _t of tables) {
    if (tableAdded >= MAX_EXPAND_TABLE) {
      const nodeId = getSeeMoreId(t, right);
      newNodes.push({
        id: nodeId,
        data: { tables, prevTable: t, right, level: newLevel },
        position: { x: 100, y: 100 },
        type: "seeMore",
        width: T_NODE_W,
        height: 100,
      });
      addUniqueEdge(nodeId);
      break;
    }
    const existingNode = newNodes.find((_n) => _n.id === _t.table);
    if (!existingNode) {
      newNodes.push(createTableNode(_t, newLevel, t));
      tableAdded++;
    }
    addUniqueEdge(_t.table);
  }

  return [newNodes, newEdges];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const layoutElementsOnCanvas = (nodes: Node[], _edges: Edge[]) => {
  let minLevel = Infinity;
  let maxLevel = -Infinity;
  const levelWiseIndex: Record<number, number> = {};
  const levelWiseColumnCount: Record<number, number> = {};
  const tableWiseColumnIndex: Record<string, number> = {};

  for (const n of nodes) {
    if (isColumn(n) && n.parentNode) {
      if (!(n.parentNode in tableWiseColumnIndex)) {
        tableWiseColumnIndex[n.parentNode] = 0;
      }

      n.position = {
        x: C_OFFSET_X,
        y:
          tableWiseColumnIndex[n.parentNode] * C_NODE_H +
          C_OFFSET_Y +
          (C_PADDING_Y >> 1),
      };
      tableWiseColumnIndex[n.parentNode]++;
      continue;
    }
    const level = n.data.level;
    minLevel = Math.min(minLevel, level);
    maxLevel = Math.max(maxLevel, level);
    if (!(level in levelWiseIndex)) {
      levelWiseIndex[level] = 0;
      levelWiseColumnCount[level] = 0;
    }
  }

  const getY = (n: Node, level: number) => {
    const _index = levelWiseIndex[level];
    const _columnCount = levelWiseColumnCount[level] || 0;
    levelWiseIndex[level]++;
    levelWiseColumnCount[level] += tableWiseColumnIndex[n.id];
    return (
      P_OFFSET_Y +
      _index * (T_NODE_Y_SEPARATION + T_NODE_H) +
      C_NODE_H * _columnCount +
      C_PADDING_Y
    );
  };

  const getX = (level: number) => {
    const basisLevel = level - minLevel;
    return basisLevel * (T_NODE_W + LEVEL_SEPARATION) + P_OFFSET_X;
  };

  for (const n of nodes) {
    if (isColumn(n) || n.id.startsWith(SEE_MORE_PREFIX)) {
      continue;
    }
    const level = n.data.level;
    n.position = { x: getX(level), y: getY(n, level) };
  }
  for (const n of nodes) {
    if (!n.id.startsWith(SEE_MORE_PREFIX)) {
      continue;
    }
    const level = n.data.level;
    n.position = { x: getX(level), y: getY(n, level) };
  }
};

export const resetTableHighlights = (
  nodes: Node[],
  edges: Edge[]
): [Node[], Edge[]] => {
  nodes.forEach((n) => (n.style = { opacity: 1 }));
  edges.forEach((e) => applyEdgeStyling(e, false));
  return [nodes, edges];
};

export const highlightTableConnections = (
  nodes: Node[],
  edges: Edge[],
  table: string
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
    (_n) => (_n.style = { opacity: highlightNode[_n.id] ? 1 : 0.5 })
  );

  return [newNodes, newEdges];
};

// TODO: fix member_profile-> expand left, expand right, collapse left, collapse right
export const removeRelatedNodesEdges = (
  prevNodes: Node[],
  prevEdges: Edge[],
  table: string,
  right: boolean,
  level: number
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
        dst: "source" | "target"
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
      edgesToRemove[e.id] =
        nodesToRemove[e.source] || nodesToRemove[e.target] || e[src] === table;
    } else {
      columnEdgesToRemove[e.id] =
        columnNodesToRemove[e.source] || columnNodesToRemove[e.target];
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

const processColumnLineage = async (
  levelMap: Record<string, number>,
  seeMoreIdTableReverseMap: Record<string, string>,
  tableNodes: Record<string, boolean>,
  curr: [string, string][],
  right: boolean,
  currAnd1HopTables: string[],
  selectedColumn: { name: string; table: string },
  sessionId: string
) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const { column_lineage, confidence } = await getConnectedColumns({
    targets: curr,
    upstreamExpansion: right,
    currAnd1HopTables,
    selectedColumn,
    sessionId,
  });
  CllContext.addLinks(column_lineage.length);
  const columnLineage = column_lineage.filter((e) =>
    right ? contains(curr, e.source) : contains(curr, e.target)
  );
  const newCurr = columnLineage.map((e) => (right ? e.target : e.source));
  const collectColumns: Record<string, string[]> = {};

  const addToCollectColumns = ([_table, _column]: [string, string]) => {
    collectColumns[_table] = collectColumns[_table] || [];
    if (!collectColumns[_table].includes(_column)) {
      collectColumns[_table].push(_column);
    }
  };

  const addToEdges = (
    id1: string,
    id2: string,
    source: string,
    target: string,
    type: string
  ) => {
    const id = getColumnEdgeId(source, target);
    if (edges.find((e) => e.id === id)) return;
    edges.push(
      createColumnEdge(source, target, levelMap[id1], levelMap[id2], type)
    );
  };

  const seeMoreLineage: ColumnLineage[] = [];

  for (const e of columnLineage) {
    addToCollectColumns(e.source);
    addToCollectColumns(e.target);
    const [t0] = e.source;
    const [t1] = e.target;

    const sourceTableExist = tableNodes[t0];
    const targetTableExist = tableNodes[t1];
    const source = COLUMN_PREFIX + e.source.join("/");
    const target = COLUMN_PREFIX + e.target.join("/");

    if (sourceTableExist && targetTableExist) {
      addToEdges(t0, t1, source, target, e.type);
    } else if (sourceTableExist) {
      const seeMoreId = seeMoreIdTableReverseMap[t1];
      addToEdges(t0, seeMoreId, source, seeMoreId, e.type);
      seeMoreLineage.push(e);
    } else if (targetTableExist) {
      const seeMoreId = seeMoreIdTableReverseMap[t0];
      addToEdges(seeMoreId, t1, seeMoreId, target, e.type);
      seeMoreLineage.push(e);
    } else {
      seeMoreLineage.push(e);
      // TODO: check is nothing to do in this case
    }
  }

  for (const t in collectColumns) {
    if (!tableNodes[t]) continue;
    collectColumns[t].sort();
    for (const c of collectColumns[t]) {
      nodes.push(createColumnNode(t, c));
    }
  }

  return { nodes, edges, collectColumns, newCurr, confidence, seeMoreLineage };
};

export const mergeNodesEdges = (
  prevState: { nodes: Node[]; edges: Edge[] },
  patchState: { nodes: Node[]; edges: Edge[] }
): [Node[], Edge[]] => {
  const nodes = [...prevState.nodes];
  const edges = [...prevState.edges];
  const nodesId: Record<string, boolean> = {};
  const edgesId: Record<string, boolean> = {};
  nodes.forEach((n) => (nodesId[n.id] = true));
  edges.forEach((e) => (edgesId[e.id] = true));
  patchState.nodes.forEach((n) => !nodesId[n.id] && nodes.push(n));
  patchState.edges.forEach((e) => !edgesId[e.id] && edges.push(e));
  layoutElementsOnCanvas(nodes, edges);
  return [nodes, edges];
};

export const removeColumnNodes = (
  _nodes: Node[],
  _edges: Edge[]
): [Node[], Edge[]] => {
  const nodes = _nodes.filter((n) => isNotColumn(n));
  const edges = _edges.filter((n) => isNotColumn(n));
  return [nodes, edges];
};

export const mergeCollectColumns = (
  setCollectColumns: Dispatch<SetStateAction<Record<string, string[]>>>,
  newCcollectColumns: Record<string, string[]>
) => {
  setCollectColumns((prev) => {
    const collectColumns: Record<string, string[]> = { ...prev };
    for (const t in newCcollectColumns) {
      const _columns = newCcollectColumns[t];
      if (!(t in collectColumns)) {
        collectColumns[t] = _columns;
        continue;
      }
      _columns.forEach((c) => {
        if (collectColumns[t].includes(c)) {
          return;
        }
        collectColumns[t].push(c);
      });
    }
    return collectColumns;
  });
};

export const expandTableLineage = async (
  nodes: Node[],
  edges: Edge[],
  table: string,
  right: boolean
): Promise<[Node[], Edge[]]> => {
  const getConnectedTables = right ? upstreamTables : downstreamTables;
  const level = nodes.find((n) => n.id === table)?.data?.level;
  const queue: { table: string; level: number }[] = [{ table, level }];
  const visited: Record<string, boolean> = {};
  while (queue.length > 0) {
    const { table, level } = queue.shift()!;
    if (visited[table]) continue;
    visited[table] = true;
    const { tables } = await getConnectedTables(table);
    const [_nodes, _edges] = createNewNodesEdges(
      nodes,
      edges,
      tables,
      table,
      right,
      level
    );
    nodes = _nodes;
    edges = _edges;
    tables.forEach((t) => {
      if (t.materialization === "ephemeral") {
        const _t = nodes.find((n) => n.id === t.table);
        if (!_t) return;
        queue.push({ table: t.table, level: _t.data.level });
      }
    });
  }
  return [nodes, edges];
};

export const bfsTraversal = async (
  nodes: Node[],
  edges: Edge[],
  right: boolean,
  columns: { name: string; table: string }[],
  setConfidence: Dispatch<
    SetStateAction<{ confidence: string; operator_list?: string[] | undefined }>
  >,
  setMoreTables: Dispatch<SetStateAction<TMoreTables>>,
  setCollectColumns: Dispatch<SetStateAction<Record<string, string[]>>>,
  flow: ReactFlowInstance,
  sessionId: string
) => {
  let isLineage = false;
  // creating helper data for current lineage once
  const { levelMap, tableNodes, seeMoreIdTableReverseMap } =
    getHelperDataForCLL(nodes, edges);

  const _getNode = (id: string) => nodes.find((n) => n.id === id);

  const visited: Record<string, boolean> = {};
  const ephemeralAncestors: Record<string, [string, string][]> = {};
  let currTargetColumns: [string, string][] = columns.map((c) => [
    c.table,
    c.name,
  ]);
  let currEphemeralNodes: string[] = [];
  while (true as boolean) {
    if (CllContext.isCancelled) {
      break;
    }
    currTargetColumns = currTargetColumns.filter((x) => !visited[x.join("/")]);
    if (currTargetColumns.length === 0 && currEphemeralNodes.length === 0) {
      break;
    }
    const currTargetTables: Record<string, boolean> = {};
    currTargetColumns.forEach((x) => {
      visited[x.join("/")] = true;
      currTargetTables[x[0]] = true;
    });

    const [src, dst]: ("source" | "target")[] = right
      ? ["source", "target"]
      : ["target", "source"];
    const hop1Tables: string[] = [];
    const _currEphemeralNodes: string[] = [];
    const collectEphemeralAncestors: string[] = [];
    let noDependents = false;
    for (const e of edges) {
      if (isColumn(e)) continue;
      const srcTable = e[src];
      const dstNode = e[dst];
      const dstTables = tableNodes[dstNode]
        ? [_getNode(dstNode)?.data as Table]
        : (_getNode(dstNode)?.data as TMoreTables)?.tables?.filter(
            (t) => !tableNodes[t.table]
          );
      dstTables?.forEach(({ table: dstTable, materialization }) => {
        if (currTargetTables[srcTable]) {
          noDependents = true;
          if (materialization === "ephemeral") {
            // carry forward
            safeConcat(
              ephemeralAncestors,
              dstTable,
              currTargetColumns.filter((c) => c[0] === srcTable)
            );
            _currEphemeralNodes.push(dstTable);
          } else {
            hop1Tables.push(dstTable);
          }
        } else if (currEphemeralNodes.includes(srcTable)) {
          noDependents = true;
          if (materialization === "ephemeral") {
            // carry forward follow through
            safeConcat(
              ephemeralAncestors,
              dstTable,
              ephemeralAncestors[srcTable]
            );
            _currEphemeralNodes.push(dstTable);
          } else {
            collectEphemeralAncestors.push(srcTable);
            hop1Tables.push(dstTable);
          }
        }
      });
    }
    if (!noDependents) {
      break;
    }
    currEphemeralNodes = _currEphemeralNodes;

    const currAnd1HopTables = Object.keys(currTargetTables).concat(hop1Tables);

    collectEphemeralAncestors.forEach((t) => {
      currTargetColumns.push(...ephemeralAncestors[t]);
      currAnd1HopTables.push(...ephemeralAncestors[t].map((c) => c[0]));
    });
    const patchState = await processColumnLineage(
      levelMap,
      seeMoreIdTableReverseMap,
      tableNodes,
      currTargetColumns,
      right,
      Array.from(new Set(currAnd1HopTables)),
      columns[0],
      sessionId
    );
    if (patchState.confidence?.confidence === "low") {
      setConfidence((prev) => {
        const newConfidence = { ...prev, confidence: "low" };
        newConfidence.operator_list = newConfidence.operator_list || [];
        newConfidence.operator_list.push(
          ...(patchState.confidence?.operator_list || [])
        );
        return newConfidence;
      });
    }
    currTargetColumns = patchState.newCurr;
    if (!isLineage && currTargetColumns.length > 0) {
      isLineage = true;
    }
    const [_nodes, _edges] = mergeNodesEdges(
      {
        nodes: flow.getNodes(),
        edges: flow.getEdges(),
      },
      patchState
    );

    setMoreTables((prev) => ({
      ...prev,
      lineage: [...(prev.lineage || []), ...patchState.seeMoreLineage],
    }));

    layoutElementsOnCanvas(_nodes, _edges);
    flow.setNodes(_nodes);
    flow.setEdges(_edges);
    mergeCollectColumns(setCollectColumns, patchState.collectColumns);
  }
  return isLineage;
};
