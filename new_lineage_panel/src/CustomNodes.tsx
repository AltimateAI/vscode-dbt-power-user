/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent, useContext, useState } from "react";
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
  createNewNodesEdges,
  highlightTableConnections,
  layoutElementsOnCanvas,
  processColumnLineage,
  removeRelatedNodesEdges,
  resetTableHighlights,
} from "./graph";
import { LineageContext, openFile } from "./App";
import { Table, downstreamTables, upstreamTables } from "./service";
import {
  COLUMNS_SIDEBAR,
  C_NODE_H,
  C_PADDING_Y,
  TABLES_SIDEBAR,
} from "./utils";
import { TMoreTables } from "./MoreTables";
import DBTIcon from "./assets/icons/dbt.svg?react";

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
  const { shouldExpand, processed, table, level, url, key } = data;
  const flow = useReactFlow();
  // hack to force re-render the component
  const [, _rerender] = useState(0);
  const rerender = () => _rerender((x) => x + 1);

  const {
    selectedTable,
    setSelectedTable,
    setShowSidebar,
    setSidebarScreen,
    collectColumns,
    selectedColumn,
    setCollectColumns
  } = useContext(LineageContext);

  const _columnLen = Object.keys(collectColumns[table] || {}).length;
  const _showColumns = _columnLen > 0;
  const selected = selectedTable?.table === table;
  const toggleTableSelection = () =>
    setSelectedTable((prev) =>
      prev?.table === table ? null : { table, key, url }
    );

  const highlightTable = () => {
    if (selectedColumn) return;
    const _nodes = flow.getNodes();
    const _edges = flow.getEdges();
    const [nodes, edges] = selected
      ? resetTableHighlights(_nodes, _edges)
      : highlightTableConnections(_nodes, _edges, table);
    flow.setNodes(nodes);
    flow.setEdges(edges);
  };

  const expand = async (tables: Table[], right: boolean) => {
    if (processed[right ? 1 : 0]) return;
    let [nodes, edges] = createNewNodesEdges(
      flow.getNodes(),
      flow.getEdges(),
      tables,
      table,
      right,
      level
    );
    if (selectedColumn) {
      const {
        nodes: _nodes,
        edges: _edges,
        collectColumns,
      } = await processColumnLineage(
        nodes,
        edges,
        selectedColumn
      );
      nodes = _nodes;
      edges = _edges;
      setCollectColumns(collectColumns);
    } else if (selectedTable) {
      const [_nodes, _edges] = highlightTableConnections(
        nodes,
        edges,
        selectedTable.table
      );
      nodes = _nodes;
      edges = _edges;
    }
    layoutElementsOnCanvas(nodes, edges);
    flow.setNodes(nodes);
    flow.setEdges(edges);
    rerender();
  };

  const expandRight = async () => {
    const { tables } = await upstreamTables(key);
    await expand(tables, true);
  };

  const expandLeft = async () => {
    const { tables } = await downstreamTables(key);
    await expand(tables, false);
  };

  const collapse = (right: boolean) => () => {
    const [nodes, edges] = removeRelatedNodesEdges(
      flow.getNodes(),
      flow.getEdges(),
      table,
      right,
      level
    );
    layoutElementsOnCanvas(nodes, edges);
    flow.setNodes(nodes);
    flow.setEdges(edges);
    rerender();
  };

  const collapseLeft = collapse(false);
  const collapseRight = collapse(true);

  const onDetailsClick = (e: React.MouseEvent) => {
    if (!selected) return;
    e.stopPropagation();
    setShowSidebar(true);
    setSidebarScreen(COLUMNS_SIDEBAR);
  };

  return (
    <div
      className="position-relative"
      style={{
        opacity: !selectedColumn ? 1 : _showColumns ? 1 : 0.5,
      }}
    >
      <div
        className={styles.table_node}
        onClick={(e) => {
          e.stopPropagation();
          toggleTableSelection();
          highlightTable();
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
          <div className={styles.table_header}>
            <DBTIcon />
            <div className="d-flex flex-column">
              <div className="lines-2 text-black">{table}</div>
              <div className="text-muted text-overflow">
                {key.split(".")?.[0]}
              </div>
            </div>
          </div>
          <div className="d-flex gap-sm">
            <div
              className={classNames(
                "nodrag",
                selected ? "text-primary" : "text-muted"
              )}
              onClick={() => openFile(url)}
            >
              Open file
            </div>
            <div
              className={classNames(
                "nodrag",
                selected ? "text-primary" : "text-muted"
              )}
              onClick={onDetailsClick}
            >
              View Details
            </div>
          </div>
        </div>
        {_showColumns && (
          <div
            className={classNames(styles.content, {
              [styles.selected]: selected,
            })}
            style={{ height: _columnLen * C_NODE_H + C_PADDING_Y }}
          />
        )}
      </div>
      {shouldExpand[1] && (
        <div
          className={classNames(
            "nodrag",
            styles.table_handle,
            styles.right_handle
          )}
          onClick={(e) => {
            e.stopPropagation();
            if (processed[1]) {
              collapseRight();
            } else {
              expandRight();
            }
          }}
        >
          {processed[1] ? "-" : "+"}
        </div>
      )}
      {shouldExpand[0] && (
        <div
          className={classNames(
            "nodrag",
            styles.table_handle,
            styles.left_handle
          )}
          onClick={(e) => {
            e.stopPropagation();
            if (processed[0]) {
              collapseLeft();
            } else {
              expandLeft();
            }
          }}
        >
          {processed[0] ? "-" : "+"}
        </div>
      )}

      <BidirectionalHandles />
    </div>
  );
};

export const SeeMoreNode: FunctionComponent<NodeProps> = ({ data }) => {
  const { tables, prevTable, right, level } = data as TMoreTables;
  const { setShowSidebar, setMoreTables, setSidebarScreen } =
    useContext(LineageContext);
  const flow = useReactFlow();
  return (
    <div
      className={classNames("d-flex", styles.see_more_node)}
      onClick={(e) => {
        e.stopPropagation();
        setShowSidebar(true);
        setSidebarScreen(TABLES_SIDEBAR);
        setMoreTables({ tables, prevTable, right, level });
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

  return (
    <div
      className={classNames(styles.column_node, {
        [styles.selected]: selectedColumn.table === table && selectedColumn.name === column,
      })}
    >
      {column}
      <BidirectionalHandles />
    </div>
  );
};
