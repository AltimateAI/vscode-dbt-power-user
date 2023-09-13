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
  type: "arrow",
  strokeWidth: 1,
  width: 24,
  height: 24,
  color: DEFAULT_COLOR,
};
export const highlightMarker = {
  type: "arrow",
  strokeWidth: 1,
  width: 16,
  height: 16,
  color: HIGHLIGHT_COLOR,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const isColumn = (_: any) => false;
