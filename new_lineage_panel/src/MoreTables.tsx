import { useContext, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { useReactFlow } from "reactflow";
import { SEE_MORE_PREFIX, createForwardEdge, createTableNode } from "./utils";
import { layoutElementsOnCanvas } from "./graph";
import { LineageContext } from "./App";
import { Table } from "./service";
import { NodeTypeIcon } from "./CustomNodes";
import { CustomInput } from "./Form";

export type TMoreTables = {
  prevTable: string;
  tables: Table[];
  right: boolean;
  level: number;
};

function MoreTables() {
  const { moreTables, setShowSidebar } = useContext(LineageContext);
  const { prevTable, tables, right, level } = moreTables as TMoreTables;
  const flow = useReactFlow();

  // hack to force re-render the component
  const [, _rerender] = useState(0);
  const rerender = () => _rerender((x) => x + 1);

  const onItemClick = async (_table: Table) => {
    const { table } = _table;
    let nodes = flow.getNodes();
    let edges = flow.getEdges();
    const node = nodes.find((n) => n.id === table);
    if (!node) {
      nodes.push(createTableNode(_table, level, prevTable));
      edges.push(createForwardEdge(prevTable, table, right));
    } else {
      nodes = nodes.filter((n) => n.id !== table);
      const _edgeId = right ? `${prevTable}-${table}` : `${table}-${prevTable}`;
      edges = edges.filter((e) => e.id !== _edgeId);
    }

    if (tables.every((t) => !!nodes.find((n) => n.id === t.table))) {
      const seeMoreNodeId = SEE_MORE_PREFIX + prevTable;
      const seeMoreEdgeId = right
        ? `${prevTable}-${seeMoreNodeId}`
        : `${seeMoreNodeId}-${prevTable}`;
      nodes = nodes.filter((n) => n.id !== seeMoreNodeId);
      edges = edges.filter((e) => e.id !== seeMoreEdgeId);
      setShowSidebar(false);
    }

    layoutElementsOnCanvas(nodes, edges);
    flow.setNodes(nodes);
    flow.setEdges(edges);
    rerender();
  };

  const [filteredTables, setFilteredTables] = useState(tables);
  return (
    <div className="p-2 h-100 d-flex flex-column">
      <div className="mb-2 fw-semibold fs-5">Tables</div>
      <CustomInput
        bsSize="sm"
        placeholder="Search by table name"
        onChange={(e) => {
          const _search = e.target.value.toLowerCase();
          setFilteredTables(
            tables.filter((t) => t.table.toLowerCase().includes(_search))
          );
        }}
      />
      <div className="mb-3" />
      <div className="h-100 overflow-y">
        <div className="d-flex flex-column gap-sm">
          {filteredTables.map((t) => {
            const _node = flow.getNode(t.table);
            const isNodeOnOtherLevel = _node && _node.data.level !== level;
            return (
              <div
                key={t.table}
                className={classNames(styles.table_card, {
                  [styles.selected]: _node,
                  [styles.disabled]: isNodeOnOtherLevel,
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isNodeOnOtherLevel) return;
                  onItemClick(t);
                }}
              >
                <NodeTypeIcon nodeType={t.nodeType} />
                <div className="d-flex flex-column">
                  <div className="text-overflow">{t.table}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { MoreTables };
