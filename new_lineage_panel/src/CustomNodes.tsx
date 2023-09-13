import { FunctionComponent } from "react";
import { BaseEdge, EdgeProps, Handle, NodeProps, Position } from "reactflow";
import styles from "./styles.module.scss";
import classNames from "classnames";

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
  const [table, schema] = destructTable(data.id);
  return (
    <div className="position-relative">
      <div className={styles.table_node}>
        <div
          className={classNames(
            styles.header,
            "d-flex flex-column align-items-start gap-xs"
          )}
        >
          <div className={styles.table_header}>
            <div />
            <div className="lines-2 text-black">{table}</div>
            <div />
            <div className="text-muted text-overflow">{schema}</div>
          </div>
        </div>
      </div>

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
