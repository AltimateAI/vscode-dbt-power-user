import { useContext, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { useReactFlow } from "reactflow";
import {
  createColumnEdge,
  createColumnNode,
  createTableEdge,
  createTableNode,
  getColumnId,
  getSeeMoreId,
} from "./utils";
import { layoutElementsOnCanvas } from "./graph";
import { LineageContext } from "./App";
import { ColumnLineage, Table } from "./service";
import { TableHeader } from "./CustomNodes";
import { CustomInput } from "./Form";

export type TMoreTables = {
  prevTable?: string;
  tables?: Table[];
  right?: boolean;
  level?: number;
  lineage?: ColumnLineage[];
};

function MoreTables() {
  const { moreTables, setShowSidebar, rerender } = useContext(LineageContext);
  const { prevTable, tables, right, level, lineage } =
    moreTables as TMoreTables;
  const flow = useReactFlow();

  const onItemClick = async (_table: Table) => {
    const { table } = _table;
    let nodes = flow.getNodes();
    let edges = flow.getEdges();
    const node = nodes.find((n) => n.id === table);
    if (!node) {
      nodes.push(createTableNode(_table, level!, prevTable!));
      const fromLevel = nodes.find((n) => n.id === prevTable)?.data.level;
      edges.push(createTableEdge(fromLevel, level!, prevTable!, table, right!));
      lineage?.forEach((e) => {
        const src = getColumnId(e.source[0], e.source[1]);
        const dst = getColumnId(e.target[0], e.target[1]);
        if (right) {
          if (e.target[0] !== table) return;
          nodes.push(createColumnNode(e.target[0], e.target[1]));
          edges.push(createColumnEdge(src, dst, level! - 1, level!, e.type));
        } else {
          if (e.source[0] !== table) return;
          nodes.push(createColumnNode(e.source[0], e.source[1]));
          edges.push(createColumnEdge(src, dst, level!, level! + 1, e.type));
        }
      });
    } else {
      return;
      // TODO: remove node and edges related to table
      // const columns = nodes
      //   .filter((n) => n.parentNode === table)
      //   .map((n) => [n.data.table, n.data.column]);
      // nodes = nodes
      //   .filter((n) => isNotColumn(n) && n.id !== table)
      //   .filter((n) => isColumn(n) && n.parentNode !== table);
      // const _edgeId = right ? `${prevTable}-${table}` : `${table}-${prevTable}`;
      // edges = edges.filter((e) => e.id !== _edgeId);
    }

    if (tables!.every((t) => !!nodes.find((n) => n.id === t.table))) {
      const seeMoreNodeId = getSeeMoreId(prevTable!, right!);
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
            tables!.filter((t) => t.table.toLowerCase().includes(_search))
          );
        }}
      />
      <div className="mb-3" />
      <div className="h-100 overflow-y">
        <div className="d-flex flex-column gap-sm">
          {filteredTables!.map((t) => {
            const _node = flow.getNode(t.table);
            const isNodeOnOtherLevel = _node && _node.data.level !== level;
            return (
              <div
                key={t.table}
                className={classNames(styles.table_card, {
                  [styles.selected]: _node,
                  // [styles.disabled]: isNodeOnOtherLevel,
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isNodeOnOtherLevel) return;
                  onItemClick(t);
                }}
              >
                <TableHeader
                  nodeType={t.nodeType}
                  label={t.label}
                  table={t.table}
                  tests={t.tests}
                  materialization={t.materialization}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { MoreTables };
