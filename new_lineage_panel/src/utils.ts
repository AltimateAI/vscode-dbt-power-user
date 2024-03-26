import { Edge, MarkerType, Node } from "reactflow";
import { Table } from "./service";
import React from "react";
import { COLUMN_PREFIX, SEE_MORE_PREFIX } from "./constants";

// config constants
export const MAX_EXPAND_TABLE = 5;

// dimensions
export const F_OFFSET_X = 100;
export const F_OFFSET_Y = 100;
export const T_NODE_W = 272;
export const T_NODE_H = 80;
export const C_OFFSET_X = 12;
export const C_OFFSET_Y = T_NODE_H;
const C_NODE_H = 30;
const C_PADDING_Y = 4;
export const T_LEVEL_SEPARATION = 280;
export const T_NODE_Y_SEPARATION = 80;

export const DEFAULT_MIN_ZOOM = 0.05;
// node styles
const DEFAULT_COLOR = "#7A899E";
const HIGHLIGHT_COLOR = "#E38E00";
export const defaultEdgeStyle: React.CSSProperties = {
  stroke: DEFAULT_COLOR,
  strokeWidth: 1,
};
export const highlightEdgeStyle: React.CSSProperties = {
  stroke: HIGHLIGHT_COLOR,
  strokeWidth: 2,
};
export const indirectHighlightEdgeStyle: React.CSSProperties = {
  stroke: HIGHLIGHT_COLOR,
  strokeWidth: 1,
  strokeDasharray: 10,
};
export const defaultMarker = {
  type: "arrow" as MarkerType,
  strokeWidth: 1,
  width: 24,
  height: 24,
  color: DEFAULT_COLOR,
};
export const highlightMarker = {
  type: "arrow" as MarkerType,
  strokeWidth: 1,
  width: 16,
  height: 16,
  color: HIGHLIGHT_COLOR,
};

export const isColumn = (x: { id: string }) => x.id.startsWith(COLUMN_PREFIX);
export const isSeeMore = (x: { id: string }) =>
  x.id.startsWith(SEE_MORE_PREFIX);
export const isNotColumn = (x: { id: string }) =>
  !x.id.startsWith(COLUMN_PREFIX);

export const createTableEdge = (
  n1Level: number,
  n2Level: number,
  n1: string,
  n2: string,
  right: boolean
): Edge => {
  const [src, dst] = right ? [n1, n2] : [n2, n1];
  const [sourceHandle, targetHandle] = right
    ? getSourceTargetHandles(n1Level, n2Level)
    : getSourceTargetHandles(n2Level, n1Level);
  return {
    id: `${src}-${dst}`,
    source: src,
    target: dst,
    sourceHandle,
    targetHandle,
    style: defaultEdgeStyle,
    markerEnd: defaultMarker,
    type:
      n1 === n2
        ? "selfConnecting"
        : n1Level === n2Level
        ? "smoothstep"
        : "default",
  };
};

export const createTableNode = (
  _table: Table,
  level: number,
  parent: string
): Node => {
  return {
    id: _table.table,
    data: { ..._table, level, parent },
    position: { x: 100, y: 100 },
    type: "table",
    width: T_NODE_W,
    height: T_NODE_H,
  };
};

export const createColumnNode = (t: string, c: string): Node => {
  return {
    id: getColumnId(t, c),
    data: { column: c, table: t },
    parentNode: t,
    extent: "parent",
    draggable: false,
    type: "column",
    position: { x: 100, y: 100 },
    height: C_NODE_H,
  };
};

export type EdgeVisibility = Record<string, boolean>;

export const createColumnEdge = (
  source: string,
  target: string,
  srcLevel: number,
  dstLevel: number,
  type: string,
  edgeVisibility: EdgeVisibility
): Edge => {
  const edgeId = getColumnEdgeId(source, target);
  const [sourceHandle, targetHandle] = getSourceTargetHandles(
    srcLevel,
    dstLevel
  );
  return {
    id: edgeId,
    data: { type },
    source,
    target,
    sourceHandle,
    targetHandle,
    style: type === "direct" ? highlightEdgeStyle : indirectHighlightEdgeStyle,
    zIndex: 1000,
    markerEnd: highlightMarker,
    type: srcLevel === dstLevel ? "smoothstep" : "default",
    hidden: edgeVisibility[type],
  };
};

export const getColumnEdgeId = (source: string, target: string) =>
  COLUMN_PREFIX + `${source}-${target}`;

export const applyEdgeStyling = (e: Edge, highlight: boolean) => {
  e.style = highlight ? highlightEdgeStyle : defaultEdgeStyle;
  e.markerEnd = highlight ? highlightMarker : defaultMarker;
};

export const getSourceTargetHandles = (
  l0: number,
  l1: number
): ["left" | "right", "left" | "right"] => {
  if (l0 < l1) return ["right", "left"];
  if (l0 > l1) return ["left", "right"];
  if (l0 < 0) return ["left", "left"];
  return ["right", "right"];
};

export const getHelperDataForCLL = (nodes: Node[], edges: Edge[]) => {
  const levelMap: Record<string, number> = {};
  nodes.forEach((n) => {
    if (isNotColumn(n)) levelMap[n.id] = n.data.level;
  });
  const tableNodes: Record<string, boolean> = {};
  nodes
    .filter((_n) => _n.type === "table")
    .forEach((_n) => (tableNodes[_n.id] = true));
  const seeMoreIdTableReverseMap: Record<string, string> = {};
  for (const e of edges) {
    if (isColumn(e)) continue;
    const sourceTableExist = tableNodes[e.source];
    const targetTableExist = tableNodes[e.target];
    if (sourceTableExist && targetTableExist) {
      continue;
    }
    if (sourceTableExist) {
      const _n = nodes.find((_n) => _n.id === e.target)!;
      _n.data.tables.forEach((_t: { table: string }) => {
        seeMoreIdTableReverseMap[_t.table] = e.target;
      });
      continue;
    }
    if (targetTableExist) {
      const _n = nodes.find((_n) => _n.id === e.source)!;
      _n.data.tables.forEach((_t: { table: string }) => {
        seeMoreIdTableReverseMap[_t.table] = e.source;
      });
    }
  }

  return { levelMap, tableNodes, seeMoreIdTableReverseMap };
};

export const getColumnId = (t: string, c: string) =>
  COLUMN_PREFIX + `${t}/${c}`;
export const getSeeMoreId = (t: string, right: boolean) =>
  SEE_MORE_PREFIX + t + "-" + (right ? "1" : "0");

export const contains = (arr: [string, string][], x: [string, string]) => {
  for (const item of arr) {
    if (item[0] === x[0] && item[1] === x[1]) return true;
  }
  return false;
};

export const safeConcat = <T>(
  obj: Record<string, T[]>,
  key: string,
  values: T[]
) => {
  obj[key] = obj[key] || [];
  obj[key].push(...values);
};

export const getColY = (columnNum: number, tableNum = 1) =>
  columnNum * (C_NODE_H + C_PADDING_Y) + tableNum * C_PADDING_Y;
export const withinInclusive = (a: number, b: number) => (v: number) =>
  a <= v && v <= b;
export const withinExclusive = (a: number, b: number) => (v: number) =>
  a < v && v < b;

export const deleteIfExists = <T extends Node | Edge>(arr: T[], id: string) => {
  const index = arr.findIndex((x) => x.id === id);
  if (index === -1) return;
  arr.splice(index, 1);
};

export const calculateExpand = (
  minVal: number,
  maxVal: number,
  defaultVal: number
) => {
  if (minVal === -1) return maxVal;
  if (defaultVal >= maxVal) return maxVal;
  if (defaultVal >= minVal) return defaultVal;
  return minVal;
};
