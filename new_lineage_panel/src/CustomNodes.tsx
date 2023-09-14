/* eslint-disable @typescript-eslint/no-unused-vars */
import { FunctionComponent, useState } from "react";
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
import { createNewNodesEdges, layoutElementsOnCanvas } from "./graph";
import { openFile } from "./App";
import { Tables, downstreamTables, upstreamTables } from "./service";

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

const destructTable = (id: string) => {
  const splits = id.split(".");
  const table = splits.pop() || "";
  return [table, splits.join(".")];
};

export const TableNode: FunctionComponent<NodeProps> = ({ data }) => {
  const { shouldExpand, processed, table, level, url } = data;
  const flow = useReactFlow();
  // hack to force re-render the component
  const [, _rerender] = useState(0);
  const rerender = () => _rerender((x) => x + 1);

  const expand = async (t: string, tables: Tables, right: boolean) => {
    if (processed[right ? 1 : 0]) return;
    // tables.sort((a, b) => {
    //   const [, , tableA] = destructTable(a.table);
    //   const [, , tableB] = destructTable(b.table);
    //   return tableA.localeCompare(tableB);
    // });
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const collapse = (_right: boolean) => (_t: string) => {
    // const [nodes, edges] = removeRelatedNodesEdges(
    //   flow.getNodes(),
    //   flow.getEdges(),
    //   t,
    //   right,
    //   level
    // );
    // layoutElementsOnCanvas(nodes, edges);
    // flow.setNodes(nodes);
    // flow.setEdges(edges);
    // rerender();
  };

  const collapseLeft = collapse(false);
  const collapseRight = collapse(true);

  const [label, schema] = destructTable(table);
  return (
    <div className="position-relative" onClick={() => openFile(url)}>
      <div className={styles.table_node}>
        <div
          className={classNames(
            styles.header,
            "d-flex flex-column align-items-start gap-xs"
          )}
        >
          <div className={styles.table_header}>
            <div />
            <div className="lines-2 text-black">{label}</div>
            <div />
            <div className="text-muted text-overflow">{schema}</div>
          </div>
        </div>
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
              collapseRight(table);
            } else {
              expandRight(table);
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
              collapseLeft(table);
            } else {
              expandLeft(table);
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

export const SelfConnectingEdge: FunctionComponent<EdgeProps> = (props) => {
  const { sourceX, sourceY, targetX, targetY, markerEnd } = props;
  const radiusX = (sourceX - targetX) * 0.6;
  const radiusY = 50;
  const edgePath = `M ${sourceX - 5} ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${
    targetX + 2
  } ${targetY}`;

  return <BaseEdge path={edgePath} markerEnd={markerEnd} />;
};
