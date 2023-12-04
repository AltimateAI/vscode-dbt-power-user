import React, { FunctionComponent, ReactElement, useContext } from "react";
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
  mergeCollectColumns,
  mergeNodesEdges,
  processColumnLineage,
  resetTableHighlights,
} from "./graph";
import { LineageContext, openFile, isDarkMode } from "./App";
import { downstreamTables, upstreamTables } from "./service";
import {
  COLUMNS_SIDEBAR,
  C_NODE_H,
  C_PADDING_Y,
  TABLES_SIDEBAR,
  getHelperDataForCLL,
} from "./utils";
import { TMoreTables } from "./MoreTables";
import ModelIcon from "./assets/icons/model.svg?react";
import SeedIcon from "./assets/icons/seed.svg?react";
import SourceIcon from "./assets/icons/source.svg?react";
import ExposureIcon from "./assets/icons/exposure.svg?react";
import SnapshotIcon from "./assets/icons/snapshot.svg?react";
import MetricsIcon from "./assets/icons/metrics.svg?react";
import MacrosIcon from "./assets/icons/macros.svg?react";
import FolderIcon from "./assets/icons/folder.svg?react";
import FolderDarkIcon from "./assets/icons/folder_dark.svg?react";
import TestsIcon from "./assets/icons/tests.svg?react";
import EphemeralIcon from "./assets/icons/ephemeral.svg?react";
import { UncontrolledTooltip } from "reactstrap";

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
    {nodeType === "exposure" && <ExposureIcon />}
    {nodeType === "snapshot" && <SnapshotIcon />}
    {nodeType === "metrics" && <MetricsIcon />}
    {nodeType === "macros" && <MacrosIcon />}
  </div>
);

const NODE_TYPE_SHORTHAND = {
  seed: "SED",
  model: "MDL",
  source: "SRC",
  exposure: "EXP",
  snapshot: "SNP",
  metrics: "MET",
  macros: "SEM",
};

const NODE_TYPE_STYLES = {
  seed: styles.seed,
  model: styles.model,
  source: styles.source,
  exposure: styles.exposure,
  snapshot: styles.snapshot,
  metrics: styles.metrics,
  macros: styles.macros,
};

const TableNodePill: FunctionComponent<{
  id: string;
  icon: ReactElement;
  label: string;
  text: string;
}> = ({ id, icon, text, label }) => (
  <>
    <div className={styles.table_node_pill} id={id}>
      <div className={styles.icon}>{icon}</div>
      <div>{text}</div>
    </div>
    <UncontrolledTooltip target={id}>{label}</UncontrolledTooltip>
  </>
);

export const TableHeader: FunctionComponent<{
  nodeType: unknown;
  label: string;
  table: string;
  tests: { key: string; path: string }[];
  materialization?: string | undefined;
}> = ({ nodeType, label, table, tests, materialization }) => {
  const nType = nodeType as keyof typeof NODE_TYPE_SHORTHAND;
  return (
    <div className="d-flex flex-column align-items-start gap-xs w-100">
      <div className={styles.table_header}>
        <div className={classNames(styles.node_icon, NODE_TYPE_STYLES[nType])}>
          <NodeTypeIcon nodeType={nType} />
          <div>{NODE_TYPE_SHORTHAND[nType]}</div>
        </div>
        <div className="lines-2">{label}</div>
      </div>
      <div className={classNames("d-flex gap-xs", styles.node_extra_info)}>
        {tests?.length > 0 && (
          <TableNodePill
            id={"table-node-tests-" + table.replaceAll(".", "-")}
            icon={<TestsIcon />}
            text={tests.length.toString()}
            label="Tests"
          />
        )}
        {materialization && (
          <TableNodePill
            id={"table-node-materilization-" + table.replaceAll(".", "-")}
            icon={<EphemeralIcon />}
            text={materialization}
            label="Materialization"
          />
        )}
      </div>
    </div>
  );
};

export const TableNode: FunctionComponent<NodeProps> = ({ data }) => {
  const {
    shouldExpand,
    processed,
    label,
    table,
    level,
    url,
    upstreamCount,
    downstreamCount,
    nodeType,
    tests,
    materialization,
  } = data;
  const flow = useReactFlow();

  const {
    selectedTable,
    setSelectedTable,
    setShowSidebar,
    setSidebarScreen,
    collectColumns,
    selectedColumn,
    setCollectColumns,
    rerender,
  } = useContext(LineageContext);

  const _columnLen = Object.keys(collectColumns[table] || {}).length;
  const _showColumns = _columnLen > 0;
  const selected = selectedTable?.table === table;
  const toggleTableSelection = () =>
    setSelectedTable((prev) => (prev?.table === table ? null : data));

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

  const expand = async (right: boolean) => {
    if (processed[right ? 1 : 0]) return;
    let nodes = flow.getNodes();
    let edges = flow.getEdges();
    const getConnectedTables = right ? upstreamTables : downstreamTables;
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
    if (selectedColumn.name) {
      const { levelMap, tableNodes, seeMoreIdTableReverseMap } =
        getHelperDataForCLL(nodes, edges);
      // const currAnd1HopTables = tables.map((t) => t.table);
      const currAnd1HopTables = [];
      currAnd1HopTables.push(table);
      const curr = (collectColumns[table] || []).map(
        (c) => [table, c] as [string, string]
      );
      const patchState = await processColumnLineage(
        levelMap,
        seeMoreIdTableReverseMap,
        tableNodes,
        curr,
        right,
        currAnd1HopTables,
        selectedColumn
      );
      [nodes, edges] = mergeNodesEdges({ nodes, edges }, patchState);
      mergeCollectColumns(setCollectColumns, patchState.collectColumns);
    } else if (selectedTable) {
      [nodes, edges] = highlightTableConnections(
        nodes,
        edges,
        selectedTable.table
      );
    }
    layoutElementsOnCanvas(nodes, edges);
    flow.setNodes(nodes);
    flow.setEdges(edges);
    rerender();
  };

  const expandRight = () => expand(true);
  const expandLeft = () => expand(false);

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
          <TableHeader
            nodeType={nodeType}
            label={label}
            table={table}
            tests={tests}
            materialization={materialization}
          />
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

            <div
              className={classNames(
                "nodrag",
                selected ? "text-blue" : "text-grey"
              )}
              onClick={onDetailsClick}
            >
              View Details
            </div>

            <div
              className={classNames("nodrag", styles.open_file_button)}
              onClick={() => openFile(url)}
            >
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
  const { tables = [], prevTable, right, level } = data as TMoreTables;
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
