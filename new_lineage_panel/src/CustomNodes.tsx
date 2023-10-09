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
  createNewNodesEdges,
  highlightTableConnections,
  layoutElementsOnCanvas,
  resetTableHighlights,
} from "./graph";
import { LineageContext, aiEnabled, openFile, isDarkMode } from "./App";
import { Table, downstreamTables, upstreamTables } from "./service";
import {
  COLUMNS_SIDEBAR,
  C_NODE_H,
  C_PADDING_Y,
  TABLES_SIDEBAR,
} from "./utils";
import { TMoreTables } from "./MoreTables";
import ModelIcon from "./assets/icons/model.svg?react";
import SeedIcon from "./assets/icons/seed.svg?react";
import SourceIcon from "./assets/icons/source.svg?react";
import FolderIcon from "./assets/icons/folder.svg?react";
import FolderDarkIcon from "./assets/icons/folder_dark.svg?react";

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

export const NodeTypeIcon: FunctionComponent<{ nodeType: string }> = ({
  nodeType,
}) => (
  <div>
    {nodeType === "seed" && <SeedIcon />}
    {nodeType === "model" && <ModelIcon />}
    {nodeType === "source" && <SourceIcon />}
  </div>
);

export const TableNode: FunctionComponent<NodeProps> = ({ data }) => {
  const {
    shouldExpand,
    processed,
    table,
    level,
    url,
    upstreamCount,
    downstreamCount,
    key,
    nodeType,
  } = data;
  const flow = useReactFlow();

  const {
    selectedTable,
    setSelectedTable,
    setShowSidebar,
    setSidebarScreen,
    collectColumns,
    selectedColumn,
    rerender,
  } = useContext(LineageContext);

  const _columnLen = Object.keys(collectColumns[table] || {}).length;
  const _showColumns = _columnLen > 0;
  const selected = selectedTable?.table === table;
  const toggleTableSelection = () =>
    setSelectedTable((prev) =>
      prev?.table === table
        ? null
        : {
            table,
            key,
            url,
            nodeType,
            upstreamCount,
            downstreamCount,
          }
    );

  const highlightTable = () => {
    if (selectedColumn.name) return;
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
    // if (selectedColumn.name) {
    //   const {
    //     nodes: _nodes,
    //     edges: _edges,
    //     collectColumns,
    //   } = await processColumnLineage(
    //     nodes,
    //     edges,
    //     selectedColumn,
    //     right ? [false, true] : [true, false]
    //   );
    //   nodes = _nodes;
    //   edges = _edges;
    //   setCollectColumns(collectColumns);
    // }
    if (selectedTable) {
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

  const onDetailsClick = (e: React.MouseEvent) => {
    if (!selected) return;
    e.stopPropagation();
    setShowSidebar(true);
    setSidebarScreen(COLUMNS_SIDEBAR);
  };

  const _edges = flow.getEdges();
  return (
    <div
      className="position-relative"
      style={{
        opacity: !selectedColumn.name ? 1 : _showColumns ? 1 : 0.5,
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
            <NodeTypeIcon nodeType={nodeType} />
            <div className="lines-2">{table}</div>
          </div>
          <div className={styles.divider} />
          <div className="w-100 d-flex align-items-center gap-xs">
            <div
              className={classNames("nodrag", styles.table_handle, {
                invisible:
                  !shouldExpand[0] ||
                  processed[0] ||
                  downstreamCount ===
                    _edges.filter((e) => e.target === table).length,
              })}
              onClick={(e) => {
                e.stopPropagation();
                expandLeft();
              }}
            >
              {processed[0] ? "-" : "+"}
            </div>

            {aiEnabled && (
              <div
                className={classNames(
                  "nodrag",
                  selected ? "text-blue" : "text-grey"
                )}
                onClick={onDetailsClick}
              >
                View Details
              </div>
            )}

            <div
              className={classNames("nodrag", styles.open_file_button)}
              onClick={() => openFile(url)}
            >
              {!aiEnabled && <span className="text-blue">Open file</span>}
              {isDarkMode ? <FolderDarkIcon /> : <FolderIcon />}
            </div>
            <div className="spacer" />

            <div
              className={classNames("nodrag", styles.table_handle, {
                invisible:
                  !shouldExpand[1] ||
                  processed[1] ||
                  upstreamCount ===
                    _edges.filter((e) => e.source === table).length,
              })}
              onClick={(e) => {
                e.stopPropagation();
                expandRight();
              }}
            >
              {processed[1] ? "-" : "+"}
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
      className={styles.see_more_node}
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
