import React, { FunctionComponent, useContext, useMemo } from "react";
import {
  BaseEdge,
  EdgeProps,
  Handle,
  NodeProps,
  Position,
  useReactFlow,
} from "reactflow";
import styles from "./styles.module.scss";
import classNames from "classnames";
import {
  bfsTraversal,
  calculateMinLevel,
  calculateNodeCount,
  expandTableLineage,
  highlightColumnConnections,
  highlightTableConnections,
  layoutElementsOnCanvas,
} from "./graph";
import { LineageContext, StaticLineageContext } from "./Lineage";
import { CLL, openFile } from "./service_utils";
import {
  getColumnId,
  getColY,
  getSeeMoreId,
  VIEWS_TYPE_COLOR,
  ViewsTypes,
  toggleColumnEdges,
  toggleModelEdges,
  T_NODE_W,
} from "./utils";
import { TMoreTables } from "./MoreTables";

import TestsIcon from "./assets/icons/tests.svg?react";
import EphemeralIcon from "./assets/icons/ephemeral.svg?react";
import ExternalProjectIcon from "./assets/icons/external-project.svg?react";
import { COLUMNS_SIDEBAR, EXPOSURE_SIDEBAR, TABLES_SIDEBAR } from "./constants";
import { NODE_TYPE_SHORTHAND } from "./components/Column";
import {
  NODE_TYPE_STYLES,
  NodeTypeIcon,
  TableNodePill,
} from "./components/Column";
import CodeIcon from "./assets/icons/code.svg?react";
import { Tooltip, ViewsTypeBadge } from "./components";

const HANDLE_OFFSET = "-1px";

const BidirectionalHandles = () => (
  <>
    <Handle
      id="left"
      type="source"
      className="invisible"
      isConnectable={false}
      position={Position.Left}
      style={{ left: HANDLE_OFFSET }}
    />
    <Handle
      id="right"
      type="source"
      className="invisible"
      isConnectable={false}
      position={Position.Right}
      style={{ right: HANDLE_OFFSET }}
    />
    <Handle
      id="left"
      type="target"
      className="invisible"
      isConnectable={false}
      position={Position.Left}
      style={{ left: HANDLE_OFFSET }}
    />
    <Handle
      id="right"
      type="target"
      className="invisible"
      isConnectable={false}
      position={Position.Right}
      style={{ right: HANDLE_OFFSET }}
    />
    <Handle
      id="top"
      type="source"
      className="invisible"
      isConnectable={false}
      position={Position.Top}
      style={{ top: HANDLE_OFFSET }}
    />
    <Handle
      id="bottom"
      type="source"
      className="invisible"
      isConnectable={false}
      position={Position.Bottom}
      style={{ bottom: HANDLE_OFFSET }}
    />
    <Handle
      id="top"
      type="target"
      className="invisible"
      isConnectable={false}
      position={Position.Top}
      style={{ top: HANDLE_OFFSET }}
    />
    <Handle
      id="bottom"
      type="target"
      className="invisible"
      isConnectable={false}
      position={Position.Bottom}
      style={{ bottom: HANDLE_OFFSET }}
    />
  </>
);

export const TableNode: FunctionComponent<NodeProps> = ({ data }) => {
  const {
    label,
    table,
    url,
    upstreamCount,
    downstreamCount,
    nodeType,
    tests,
    materialization,
    isExternalProject,
  } = data;
  const flow = useReactFlow();

  const {
    selectedTable,
    setSidebarScreen,
    collectColumns,
    selectedColumn,
    setCollectColumns,
    rerender,
    setConfidence,
    setMoreTables,
    setMinRange,
    setNodeCount,
    leftExpansion,
    rightExpansion,
    selectCheck,
    nonSelectCheck,
    setSelectedTable,
  } = useContext(LineageContext);

  const _columnLen = Object.keys(collectColumns[table] || {}).length;
  const _showColumns = _columnLen > 0;
  const selected = selectedTable === table;

  const highlightTable = () => {
    if (selectedColumn.name && selectedColumn.table === table) return;
    const _nodes = flow.getNodes();
    const _edges = flow.getEdges();
    const [nodes, edges] = highlightTableConnections(_nodes, _edges, table);
    flow.setNodes(nodes);
    flow.setEdges(edges);
  };

  const expand = async (right: boolean) => {
    if (CLL.inProgress) {
      CLL.showCllInProgressMsg();
      return;
    }
    let [nodes, edges] = await expandTableLineage(
      flow.getNodes(),
      flow.getEdges(),
      table,
      right
    );
    [nodes, edges] = highlightTableConnections(nodes, edges, selectedTable);
    layoutElementsOnCanvas(nodes, edges);
    flow.setNodes(nodes);
    flow.setEdges(edges);
    setMinRange(calculateMinLevel(nodes, edges, selectedTable));
    setNodeCount(
      await calculateNodeCount(
        nodes,
        edges,
        selectedTable,
        leftExpansion,
        rightExpansion
      )
    );
    rerender();
    if (selectedColumn.name) {
      try {
        CLL.start();
        const currentEdges = flow.getEdges();
        // Model edges should be hidden when column lineage is selected
        toggleModelEdges(currentEdges, false);
        toggleColumnEdges(currentEdges, true);
        flow.setEdges(currentEdges);
        await bfsTraversal(
          nodes,
          edges,
          right,
          collectColumns[table].map((c) => ({ table, name: c.column })),
          setConfidence,
          setMoreTables,
          setCollectColumns,
          flow,
          selectedColumn,
          { direct: selectCheck, indirect: nonSelectCheck }
        );
        rerender();
      } catch (e) {
        console.log("cll:error:", e);
      } finally {
        CLL.end();
      }
      return;
    }
  };

  const expandRight = () => expand(true);
  const expandLeft = () => expand(false);

  const onDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selected) return;
    if (nodeType === "semantic_model") {
      return;
    }
    if (nodeType === "exposure") {
      setSidebarScreen(EXPOSURE_SIDEBAR);
      return;
    }
    setSidebarScreen(COLUMNS_SIDEBAR);
  };

  const _edges = flow.getEdges();
  const nType = nodeType as keyof typeof NODE_TYPE_SHORTHAND;
  const tableId = table.replace(/[^a-zA-Z0-9]/g, "-");
  return (
    <div
      className="position-relative"
      style={{
        opacity: !selectedColumn.name ? 1 : _showColumns ? 1 : 0.5,
      }}
    >
      <div
        className={styles.table_node}
        onClick={async () => {
          const nodes = flow.getNodes();
          const edges = flow.getEdges();
          setMinRange(calculateMinLevel(nodes, edges, table));
          setNodeCount(
            await calculateNodeCount(
              nodes,
              edges,
              table,
              leftExpansion,
              rightExpansion
            )
          );
          highlightTable();
          setSelectedTable(table);
          if (url) {
            openFile(url);
          }
        }}
      >
        <div
          className={classNames(
            styles.header,
            "d-flex flex-column align-items-start gap-xs",
            {
              [styles.selected]: selected,
              [styles.collapse]: !_showColumns,
            }
          )}
        >
          <div className="d-flex flex-column align-items-start gap-xs w-100">
            <div className={styles.table_header}>
              <div
                className={classNames(
                  styles.node_icon,
                  NODE_TYPE_STYLES[nType]
                )}
              >
                <NodeTypeIcon nodeType={nType} />
                <div>{NODE_TYPE_SHORTHAND[nType]}</div>
              </div>
              <div className="lines-2">{label}</div>
            </div>
            <div
              className={classNames(
                "w-100 d-flex align-items-center gap-xs",
                styles.node_extra_info
              )}
            >
              <div
                className={classNames("nodrag", styles.table_handle, {
                  invisible:
                    downstreamCount === 0 ||
                    downstreamCount ===
                      _edges.filter((e) => e.target === table).length ||
                    flow.getNode(getSeeMoreId(table, false)),
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  expandLeft();
                }}
                data-testid={"expand-left-btn-" + table}
              >
                +
              </div>
              {tests?.length > 0 && (
                <TableNodePill
                  id={"table-node-tests-" + tableId}
                  icon={<TestsIcon />}
                  text={tests.length.toString()}
                  label="Tests"
                />
              )}
              {materialization && (
                <TableNodePill
                  id={"table-node-materilization-" + tableId}
                  icon={<EphemeralIcon />}
                  text={materialization}
                  label="Materialization"
                />
              )}
              {isExternalProject ? (
                <TableNodePill
                  id={"table-node-is-external-" + tableId}
                  icon={<ExternalProjectIcon />}
                  text="ext"
                  label={`External Project: ${table}`}
                />
              ) : null}
              <div className="spacer" />
              <div
                className={classNames(
                  "nodrag",
                  selected && nodeType !== "semantic_model"
                    ? "text-blue"
                    : "text-grey"
                )}
                onClick={onDetailsClick}
                data-testid={"view-details-btn-" + table}
              >
                Details
              </div>
              <div
                className={classNames("nodrag", styles.table_handle, {
                  invisible:
                    upstreamCount === 0 ||
                    upstreamCount ===
                      _edges.filter((e) => e.source === table).length ||
                    flow.getNode(getSeeMoreId(table, true)),
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  expandRight();
                }}
                data-testid={"expand-right-btn-" + table}
              >
                +
              </div>
            </div>
          </div>
        </div>
        {_showColumns && (
          <>
            <div className={styles.divider} />
            <div
              className={classNames(styles.content, {
                [styles.selected]: selected,
              })}
              style={{ height: getColY(_columnLen) }}
            />
          </>
        )}
      </div>

      <BidirectionalHandles />
    </div>
  );
};

export const StaticTableNode: FunctionComponent<NodeProps> = ({ data }) => {
  const { table, nodeType } = data;

  const { selectedColumn, collectColumns, details, setSelectedTable } =
    useContext(StaticLineageContext);

  const _columnLen = Object.keys(collectColumns[table] || {}).length;
  const _showColumns = _columnLen > 0;
  const selected = selectedColumn?.table === table;
  const nType = nodeType as keyof typeof NODE_TYPE_SHORTHAND;

  return (
    <div
      className="position-relative"
      style={{
        opacity: !selectedColumn ? 1 : _showColumns ? 1 : 0.5,
      }}
    >
      <div className={styles.table_node}>
        <div
          className={classNames(
            styles.header,
            "d-flex flex-column align-items-start",
            {
              [styles.selected]: selected,
              [styles.collapse]: !_showColumns,
            }
          )}
        >
          <div className={styles.table_header}>
            <div
              className={classNames(styles.node_icon, NODE_TYPE_STYLES[nType])}
            >
              <NodeTypeIcon nodeType={nType} />
              <div>{NODE_TYPE_SHORTHAND[nType]}</div>
            </div>
            <div className="lines-2">{table}</div>
          </div>
          <div
            className={classNames(
              "nodrag ms-3",
              details ? "text-primary" : "text-muted"
            )}
          >
            <span
              className={!details ? styles.cursor_disabled : ""}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTable(table);
              }}
            >
              View Details
            </span>
          </div>
        </div>
        {_showColumns && (
          <div
            className={classNames(styles.content, {
              [styles.selected]: selected,
            })}
            style={{ height: getColY(_columnLen) }}
          />
        )}
      </div>
      <BidirectionalHandles />
    </div>
  );
};

export const SeeMoreNode: FunctionComponent<NodeProps> = ({ data }) => {
  const { tables = [], prevTable, right, level } = data as TMoreTables;
  const { setMoreTables, setSidebarScreen } = useContext(LineageContext);
  const flow = useReactFlow();
  return (
    <div
      className={styles.see_more_node}
      onClick={(e) => {
        e.stopPropagation();
        setSidebarScreen(TABLES_SIDEBAR);
        setMoreTables((prev) => ({ ...prev, tables, prevTable, right, level }));
      }}
    >
      <div className="fw-semibold">See more</div>
      <div className="spacer" />
      <div>{tables.filter((t) => !flow.getNode(t.table)).length || ""}</div>
      <BidirectionalHandles />
    </div>
  );
};

export const SelfConnectingEdge: FunctionComponent<EdgeProps> = (props) => {
  const { sourceX, sourceY, targetX, targetY, markerEnd } = props;
  const radiusX = (sourceX - targetX) * 0.6;
  const radiusY = 50;
  const edgePath = `M ${sourceX - 5} ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${
    targetX + 2
  } ${targetY}`;

  return <BaseEdge path={edgePath} markerEnd={markerEnd} />;
};

export const ColumnNode: FunctionComponent<NodeProps> = ({ data }) => {
  const { column, table, viewsType, viewsCode, nodeType } = data;
  const {
    selectedColumn,
    setSelectedTable,
    setSelectedColumn,
    setViewsCodeModal,
  } = useContext(LineageContext);
  const isSelected =
    selectedColumn.table === table && selectedColumn.name === column;

  const viewsColor = viewsType && VIEWS_TYPE_COLOR[viewsType as ViewsTypes];
  const customStyles = viewsColor ? { borderColor: viewsColor } : {};
  const flow = useReactFlow();

  const handleClick = () => {
    const currentNode = flow.getNode(getColumnId(table, column));
    if (!currentNode) {
      return;
    }
    setSelectedTable("");
    setSelectedColumn({ name: column, table });
    highlightColumnConnections(currentNode, flow);
  };

  const viewsCodesFlat = useMemo(() => {
    const arr = Object.values(
      (viewsCode as Record<string, [string, string][]>) || {}
    )
      .flat()
      .filter(([, type]) => type === "transform")
      .map(([code]) => code);
    const result: string[] = [];
    for (const item of arr) {
      if (result.includes(item)) continue;
      result.push(item);
    }
    return result;
  }, [viewsCode]);

  return (
    <div
      className={classNames(
        styles.column_node,
        isSelected ? styles.selected : styles.default
      )}
      style={customStyles}
      onClick={handleClick}
    >
      <div className={styles.column_name}>{column}</div>
      <BidirectionalHandles />
      <div className={styles.column_top_right}>
        {viewsCodesFlat.length > 0 && (
          <Tooltip tooltipLabel={"Click to view code"}>
            <div
              className={styles.column_code_icon}
              onClick={(e) => {
                e.stopPropagation();
                setViewsCodeModal({
                  table,
                  viewsType,
                  viewsCode,
                  nodeType,
                  column,
                });
              }}
            >
              <CodeIcon />
            </div>
          </Tooltip>
        )}
        {viewsType && viewsType !== "Non select" && (
          <ViewsTypeBadge viewsType={viewsType} />
        )}
      </div>
    </div>
  );
};

export const OpNode: FunctionComponent<NodeProps> = ({ data }) => {
  const { type, expression } = data;
  console.log("thsiisis", data);
  return (
    <div style={{ width: T_NODE_W, display: "flex", justifyContent: "center" }}>
      <BidirectionalHandles />
      <Tooltip tooltipLabel={expression}>
        <div className={styles.op_node}>
          {type === "INNER_JOIN" && (
            <img src="data:image/png;base64,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" />
          )}
          {type === "LEFT_JOIN" && (
            <img src="data:image/png;base64,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" />
          )}
          {type === "RIGHT_JOIN" && (
            <img src="data:image/png;base64,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" />
          )}
          {type === "OUTER_JOIN" && (
            <img src="data:image/png;base64,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" />
          )}
        </div>
      </Tooltip>
    </div>
  );
};
