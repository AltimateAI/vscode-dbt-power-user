import { ChevronDownIcon, ChevronRightIcon } from "@assets/icons";
import { ReactNode } from "react";
import { NodeRendererProps, Tree } from "react-arborist";
import { TreeProps } from "react-arborist/dist/module/types/tree-props";
import styles from "./treeview.module.scss";

export interface NodeType extends Record<string, unknown> {
  name: string;
  icon?: ReactNode;
  actions?: ReactNode[];
  id: string;
}
const Node = ({ node, style, dragHandle }: NodeRendererProps<NodeType>) => {
  return (
    <div
      className={styles.node}
      style={style}
      ref={dragHandle}
      onClick={() => node.toggle()}
      title={node.data.name}
    >
      {node.isLeaf ? (
        ""
      ) : node.isOpen ? (
        <ChevronDownIcon />
      ) : (
        <ChevronRightIcon />
      )}{" "}
      {node.data.icon} {node.data.name}
      {node.data.actions?.map((action) => action)}
    </div>
  );
};

const Treeview = (props: TreeProps<NodeType>): JSX.Element => {
  return <Tree {...props}>{Node}</Tree>;
};

export default Treeview;
