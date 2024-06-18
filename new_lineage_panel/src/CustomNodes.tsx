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
  const { type } = data;
  console.log("thsiisis", type, data);
  return (
    <div style={{ width: T_NODE_W, display: "flex", justifyContent: "center" }}>
      <BidirectionalHandles />
      <Tooltip tooltipLabel={data.join_on}>
        <div className={styles.op_node}>
          <img src="data:image/png;base64,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" />
        </div>
      </Tooltip>
    </div>
  );
};
