import { Edge, Node, ReactFlowInstance } from "reactflow";
import {
  applyEdgeStyling,
  C_OFFSET_X,
  C_OFFSET_Y,
  contains,
  createColumnEdge,
  createColumnNode,
  createTableEdge,
  createTableNode,
  deleteIfExists,
  getColumnEdgeId,
  getColumnId,
  getHelperDataForCLL,
  getSeeMoreId,
  isColumn,
  isNotColumn,
  T_LEVEL_SEPARATION,
  MAX_EXPAND_TABLE,
  F_OFFSET_X,
  F_OFFSET_Y,
  safeConcat,
  T_NODE_H,
  T_NODE_W,
  T_NODE_Y_SEPARATION,
  getColY,
  withinExclusive,
  isSeeMore,
} from "./utils";
import {
  ColumnLineage,
  downstreamTables,
  getConnectedColumns,
  Table,
  upstreamTables,
} from "./service";
import { Dispatch, SetStateAction } from "react";
import { COLUMN_PREFIX } from "./constants";
import { TMoreTables } from "./MoreTables";
import { CLL } from "./service_utils";

const getConnectedTables = (right: boolean, table: string) =>
  right ? upstreamTables(table) : downstreamTables(table);
const calculateNewLevel = (right: boolean, i: number) =>
  right ? i + 1 : i - 1;

const createNewNodesEdges = (
  nodes: Node[],
  edges: Edge[],
  tables: Table[],
  t: string,
  right: boolean,
  level: number,
  max_expand_table = MAX_EXPAND_TABLE
) => {
  const newLevel = calculateNewLevel(right, level);

  const addUniqueEdge = (to: string) => {
    const toLevel = nodes.find((n) => n.id === to)?.data?.level;
    const _edge = createTableEdge(level, toLevel, t, to, right);
    const existingEdge = edges.find((e) => e.id === _edge.id);
    if (!existingEdge) edges.push(_edge);
  };

  let tableAdded = 0;
  for (const _t of tables) {
    if (tableAdded >= max_expand_table) {
      const nodeId = getSeeMoreId(t, right);
      nodes.push({
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
    const existingNode = nodes.find((_n) => _n.id === _t.table);
    if (!existingNode) {
      nodes.push(createTableNode(_t, newLevel, t));
      tableAdded++;
    }
    addUniqueEdge(_t.table);
  }
};

export const layoutElementsOnCanvas = (nodes: Node[], edges: Edge[]) => {
  let minLevel = Infinity;
  let maxLevel = -Infinity;
  const tableWiseColumnCount: Record<string, number> = {};

  for (const n of nodes) {
    if (isColumn(n) && n.parentNode) {
      // assign position to columns earlier as they are relative to parent
      if (!(n.parentNode in tableWiseColumnCount)) {
        tableWiseColumnCount[n.parentNode] = 0;
      }

      n.position = {
        x: C_OFFSET_X,
        y: C_OFFSET_Y + getColY(tableWiseColumnCount[n.parentNode]),
      };
      tableWiseColumnCount[n.parentNode]++;
    } else {
      // calculate bounds along x axis
      const { level } = n.data;
      minLevel = Math.min(minLevel, level);
      maxLevel = Math.max(maxLevel, level);
    }
  }

  const tableWiseLevelColumnCount: Record<string, number> = {};
  const levelWiseTables: Record<number, string[]> = {};
  const tableWiseLevelPos: Record<string, number> = {};
  const visited: Record<string, boolean> = {};

  // create neightbours list for convenience
  const adjacencyListRight: Record<string, string[]> = {};
  const adjacencyListLeft: Record<string, string[]> = {};
  for (const e of edges) {
    if (isColumn(e)) continue;
    if (
      isSeeMore(nodes.find((x) => x.id === e.source)!) ||
      isSeeMore(nodes.find((x) => x.id === e.target)!)
    )
      continue;
    adjacencyListRight[e.source] = adjacencyListRight[e.source] || [];
    adjacencyListRight[e.source].push(e.target);
    adjacencyListLeft[e.target] = adjacencyListLeft[e.target] || [];
    adjacencyListLeft[e.target].push(e.source);
  }

  // calculate metadata such as tables and columns per level
  // to get tables position along y axis
  const processNode = (n: Node) => {
    const { level } = n.data;
    levelWiseTables[level] = levelWiseTables[level] || [];
    if (!levelWiseTables[level].includes(n.id)) {
      tableWiseLevelPos[n.id] = levelWiseTables[level].length;
      tableWiseLevelColumnCount[n.id] = 0;
      for (const curr of levelWiseTables[level])
        tableWiseLevelColumnCount[n.id] += tableWiseColumnCount[curr] || 0;
      levelWiseTables[level].push(n.id);
    }
  };
  const dfs = (n: string, adjacencyList: Record<string, string[]>) => {
    if (visited[n]) return;
    visited[n] = true;
    processNode(nodes.find((item) => item.id === n)!);
    for (const m of adjacencyList[n] || []) dfs(m, adjacencyList);
  };

  for (const n of nodes) {
    if (isColumn(n)) continue;
    if (isSeeMore(n)) continue;
    if (visited[n.id]) continue;
    dfs(n.id, adjacencyListRight);
    visited[n.id] = false;
    dfs(n.id, adjacencyListLeft);
  }
  // will place see more node at the end of level
  for (const n of nodes) {
    if (isColumn(n)) continue;
    if (!isSeeMore(n)) continue;
    processNode(n);
  }

  // assign position to table and see more nodes
  const getY = (n: Node) => {
    const _index = tableWiseLevelPos[n.id] || 0;
    const _columnCount = tableWiseLevelColumnCount[n.id] || 0;
    return (
      F_OFFSET_Y +
      _index * (T_NODE_H + T_NODE_Y_SEPARATION) +
      getColY(_columnCount, _index)
    );
  };

  const getX = (level: number) => {
    const basisLevel = level - minLevel;
    return basisLevel * (T_NODE_W + T_LEVEL_SEPARATION) + F_OFFSET_X;
  };

  for (const n of nodes) {
    if (isColumn(n)) continue;
    const { level } = n.data;
    n.position = { x: getX(level), y: getY(n) };
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
  CLL.addLinks(column_lineage.length);
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

const mergeNodesEdges = (
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

const mergeCollectColumns = (
  setCollectColumns: Dispatch<SetStateAction<Record<string, string[]>>>,
  newCollectColumns: Record<string, string[]>
) => {
  setCollectColumns((prev) => {
    const collectColumns: Record<string, string[]> = { ...prev };
    for (const t in newCollectColumns) {
      const _columns = newCollectColumns[t];
      if (!(t in collectColumns)) {
        collectColumns[t] = _columns;
        continue;
      }
      collectColumns[t].push(
        ..._columns.filter((c) => !collectColumns[t].includes(c))
      );
    }
    return collectColumns;
  });
};

export const expandTableLineage = async (
  _nodes: Node[],
  _edges: Edge[],
  table: string,
  right: boolean
): Promise<[Node[], Edge[]]> => {
  const nodes = [..._nodes];
  const edges = [..._edges];
  const queue: { table: string; level: number }[] = [
    { table, level: nodes.find((n) => n.id === table)!.data.level },
  ];
  const visited: Record<string, boolean> = {};
  while (queue.length > 0) {
    const { table, level } = queue.shift()!;
    if (visited[table]) continue;
    visited[table] = true;
    const { tables } = await getConnectedTables(right, table);
    createNewNodesEdges(nodes, edges, tables, table, right, level);
    tables.forEach((t) => {
      const _t = nodes.find((n) => n.id === t.table);
      if (_t?.data.materialization === "ephemeral") {
        queue.push({ table: t.table, level: _t.data.level });
      }
    });
  }
  return [nodes, edges];
};

export const expandTableLineageLevelWise = async (
  _nodes: Node[],
  _edges: Edge[],
  _table: string,
  lb: number, // lower bound
  ub: number // upper bound
): Promise<[Node[], Edge[]]> => {
  const nodes = [..._nodes];
  const edges = [..._edges];
  if (lb >= ub) return [nodes, edges];
  const withinExcBounds = withinExclusive(lb, ub);
  const rootLevel = nodes.find((n) => n.id === _table)!.data.level;
  const bfs = async (right: boolean) => {
    const queue: { table: string; level: number }[] = [
      { table: _table, level: rootLevel },
    ];
    const visited: Record<string, boolean> = {};

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (visited[curr.table]) continue;
      visited[curr.table] = true;
      const { tables } = await getConnectedTables(right, curr.table);
      createNewNodesEdges(
        nodes,
        edges,
        tables,
        curr.table,
        right,
        curr.level,
        Infinity
      );
      const newLevel = calculateNewLevel(right, curr.level);
      if (withinExcBounds(newLevel)) {
        queue.push(...tables.map((t) => ({ table: t.table, level: newLevel })));
      } else {
        queue.push(
          ...tables
            .filter((t) => t.materialization === "ephemeral")
            .map((t) => ({ table: t.table, level: newLevel }))
        );
      }
    }
  };
  if (ub > rootLevel) await bfs(true);
  if (lb < rootLevel) await bfs(false);

  return [nodes, edges];
};

const _calculateMinLevel = (
  nodes: Node[],
  edges: Edge[],
  table: string,
  right: boolean
): number => {
  if (!table) return -1;
  const src = right ? "source" : "target";
  const dst = right ? "target" : "source";
  const countKey = right ? "upstreamCount" : "downstreamCount";

  const nodesMap: Record<string, Node> = {};
  const adjacencyList: Record<string, string[]> = {};
  for (const n of nodes) {
    if (isColumn(n)) continue;
    nodesMap[n.id] = n;
    adjacencyList[n.id] = [];
  }
  for (const e of edges) {
    if (isColumn(e)) continue;
    adjacencyList[e[src]].push(e[dst]);
  }

  // get the node with lowest level which can be expanded but not yet expanded
  const bfs = () => {
    const queue = [table];
    const visited: Record<string, boolean> = {};
    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (visited[curr]) continue;
      visited[curr] = true;
      const nodeData = nodesMap[curr].data;
      if (nodeData[countKey] === 0) continue;
      if (adjacencyList[curr].length < nodeData[countKey]) return curr;
      for (const n of adjacencyList[curr]) queue.push(n);
    }
  };
  const targetNode = bfs();

  // unable to find such node means everything is already expanded
  if (!targetNode) return -1;
  const { level: rootLevel } = nodesMap[table].data;
  const { level: targetLevel } = nodesMap[targetNode].data;
  return right ? targetLevel - rootLevel : rootLevel - targetLevel;
};

export const calculateMinLevel = (
  nodes: Node[],
  edges: Edge[],
  table: string
): [number, number] => [
  _calculateMinLevel(nodes, edges, table, false),
  _calculateMinLevel(nodes, edges, table, true),
];

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
    if (CLL.isCancelled) break;
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
      { nodes: flow.getNodes(), edges: flow.getEdges() },
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

export const moveTableFromSeeMoreToCanvas = (
  nodes: Node[],
  edges: Edge[],
  _table: Table,
  { prevTable, tables, right, level, lineage }: TMoreTables
): boolean => {
  const { table } = _table;
  const node = nodes.find((n) => n.id === table);
  if (node) return false;
  nodes.push(createTableNode(_table, level!, prevTable!));
  const fromLevel = nodes.find((n) => n.id === prevTable)?.data.level;
  edges.push(createTableEdge(fromLevel, level!, prevTable!, table, right!));
  lineage?.forEach((e) => {
    const src = getColumnId(e.source[0], e.source[1]);
    const dst = getColumnId(e.target[0], e.target[1]);
    if (right) {
      if (e.target[0] !== table) return;
      nodes.push(createColumnNode(e.target[0], e.target[1]));
      edges.push(createColumnEdge(src, dst, level! - 1, level!, e.type));
    } else {
      if (e.source[0] !== table) return;
      nodes.push(createColumnNode(e.source[0], e.source[1]));
      edges.push(createColumnEdge(src, dst, level!, level! + 1, e.type));
    }
  });

  if (tables!.every((t) => !!nodes.find((n) => n.id === t.table))) {
    const seeMoreNodeId = getSeeMoreId(prevTable!, right!);
    const seeMoreEdgeId = right
      ? `${prevTable}-${seeMoreNodeId}`
      : `${seeMoreNodeId}-${prevTable}`;
    deleteIfExists(nodes, seeMoreNodeId);
    deleteIfExists(edges, seeMoreEdgeId);
    return true;
  }
  return false;
};

export const calculateNodeCount = async (
  nodes: Node[],
  edges: Edge[],
  selectedTable: string,
  leftExpansion: number,
  rightExpansion: number
): Promise<number> => {
  if (!selectedTable) return 0;
  const selectedTableData = nodes.find((n) => n.id === selectedTable)?.data;
  if (!selectedTableData) return 0;
  const { level } = selectedTableData;
  const startingNodesNum = nodes.length;
  const [newNodes] = await expandTableLineageLevelWise(
    nodes,
    edges,
    selectedTable,
    level - leftExpansion,
    level + rightExpansion
  );
  return newNodes.length - startingNodesNum;
};
