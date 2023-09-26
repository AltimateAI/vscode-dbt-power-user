import { Edge, MarkerType, Node } from "reactflow";
import { Table } from "./service";

// config constants
export const MAX_EXPAND_TABLE = 5;

// value constants
export const COLUMNS_SIDEBAR = "columns";
export const TABLES_SIDEBAR = "tables";
export const COLUMN_PREFIX = "column-";
export const SEE_MORE_PREFIX = "see-more-";

// dimensions
export const T_NODE_W = 260;
export const T_NODE_H = 200;
export const C_OFFSET_X = 12;
export const C_OFFSET_Y = 92;
export const C_NODE_H = 36;
export const C_PADDING_Y = 16;
export const LEVEL_SEPARATION = 150;

// node styles
const DEFAULT_COLOR = "#7A899E";
const HIGHLIGHT_COLOR = "#E38E00";
export const defaultEdgeStyle = { stroke: DEFAULT_COLOR, strokeWidth: 1 };
export const highlightEdgeStyle = { stroke: HIGHLIGHT_COLOR, strokeWidth: 2 };
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
export const isNotColumn = (x: { id: string }) =>
  !x.id.startsWith(COLUMN_PREFIX);

const _createEdge =
  (sourceHandle: string, targetHandle: string, edgeType: string) =>
  (n1: string, n2: string, right: boolean): Edge => {
    let src = n1;
    let dst = n2;
    if (!right) {
      src = n2;
      dst = n1;
    }
    if (n1 === n2) {
      edgeType = "selfConnecting";
    }
    return {
      id: `${src}-${dst}`,
      source: src,
      target: dst,
      sourceHandle,
      targetHandle,
      style: defaultEdgeStyle,
      markerEnd: defaultMarker,
      type: edgeType,
    };
  };

export const createForwardEdge = _createEdge("right", "left", "default");
export const createReverseEdge = _createEdge("left", "right", "default");

export const createTableNode = (
  { key, table, count, url, nodeType }: Table,
  right: boolean,
  level: number,
  parent: string,
): Node => {
  const expand = count > 0;
  return {
    id: table,
    data: {
      key,
      table,
      url,
      level,
      parent,
      nodeType,
      shouldExpand: right ? [false, expand] : [expand, false],
      processed: right ? [true, false] : [false, true],
    },
    position: { x: 100, y: 100 },
    type: "table",
    width: T_NODE_W,
    height: T_NODE_H,
  };
};

export const applyEdgeStyling = (e: Edge, highlight: boolean) => {
  e.style = highlight ? highlightEdgeStyle : defaultEdgeStyle;
  e.markerEnd = highlight ? highlightMarker : defaultMarker;
};
