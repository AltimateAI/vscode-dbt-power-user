/* eslint-disable @typescript-eslint/no-unused-vars */
import { FunctionComponent, useContext, useState } from "react";
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
  removeRelatedNodesEdges,
  resetTableHighlights,
} from "./graph";
import { LineageContext, openFile } from "./App";
import { Table, downstreamTables, upstreamTables } from "./service";
import { TABLES_SIDEBAR, destructTable } from "./utils";
import { TMoreTables } from "./MoreTables";
import ModelIcon from "./assets/icons/model.svg?react";
import SeedIcon from "./assets/icons/seed.svg?react";
import SourceIcon from "./assets/icons/source.svg?react";
import FolderIcon from "./assets/icons/folder.svg?react";

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
    shouldExpand,
    processed,
    table,
    level,
    url,
    upstreamCount,
    downstreamCount,
  } = data;
  const flow = useReactFlow();

  const { selectedTable, setSelectedTable, rerender } =
    useContext(LineageContext);

  const selected = selectedTable === table;
  const toggleTableSelection = () =>
    setSelectedTable((prev) => (prev === table ? "" : table));

  const highlightTable = () => {
    const _nodes = flow.getNodes();
    const _edges = flow.getEdges();
    const [nodes, edges] = selected
      ? resetTableHighlights(_nodes, _edges)
      : highlightTableConnections(_nodes, _edges, table);
    flow.setNodes(nodes);
    flow.setEdges(edges);
  };

  const expand = async (t: string, tables: Table[], right: boolean) => {
    const [nodes, edges] = createNewNodesEdges(
      flow.getNodes(),
      flow.getEdges(),
      tables,
      t,
      right,
      level
    );
    layoutElementsOnCanvas(nodes, edges);
    flow.setNodes(nodes);
    flow.setEdges(edges);
    rerender();
  };

  const expandRight = async (t: string) => {
    const { tables } = await upstreamTables(t);
    await expand(t, tables, true);
  };

  const expandLeft = async (t: string) => {
    const { tables } = await downstreamTables(t);
    await expand(t, tables, false);
  };

  const collapse = (right: boolean) => (t: string) => {
    const [nodes, edges] = removeRelatedNodesEdges(
      flow.getNodes(),
      flow.getEdges(),
      t,
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

  const [label, schema] = destructTable(table);
  const _edges = flow.getEdges();
  return (
    <div className="position-relative">
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
            { [styles.selected]: selected }
          )}
        >
          <div className={styles.table_header}>
            <div>
              {schema === "seed" && <SeedIcon />}
              {schema === "model" && <ModelIcon />}
              {schema === "source" && <SourceIcon />}
            </div>
            <div className="lines-2 text-black">{label}</div>
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
                expandLeft(table);
              }}
            >
              {processed[0] ? "-" : "+"}
            </div>
            <div
              className={classNames("nodrag", styles.open_file_button)}
              onClick={() => openFile(url)}
            >
              <FolderIcon />
              <span className="text-primary">Open file</span>
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
                expandRight(table);
              }}
            >
              {processed[1] ? "-" : "+"}
            </div>
          </div>
        </div>
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
