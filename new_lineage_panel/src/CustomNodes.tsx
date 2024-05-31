import React, { FunctionComponent, useContext } from "react";
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
  highlightTableConnections,
  layoutElementsOnCanvas,
} from "./graph";
import { LineageContext } from "./App";
import { CLL, openFile } from "./service_utils";
import { getColY, getSeeMoreId } from "./utils";
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
    isExternalProject
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
    if (selectedColumn.name) return;
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
        await bfsTraversal(
          nodes,
          edges,
          right,
          collectColumns[table].map((c) => ({ table, name: c })),
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
              {isExternalProject ? <TableNodePill
                  id={"table-node-is-external-" + tableId}
                  icon={<ExternalProjectIcon />}
                  text="ext"
                  label="External Project"
                /> : null}
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
  const { column, table } = data;
  const { selectedColumn } = useContext(LineageContext);
  const isSelected =
    selectedColumn.table === table && selectedColumn.name === column;

  return (
    <div
      className={classNames(
        styles.column_node,
        isSelected ? styles.selected : styles.default
      )}
    >
      {column}
      <BidirectionalHandles />
    </div>
  );
};
