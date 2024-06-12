import { PropsWithChildren, useContext, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { useReactFlow } from "reactflow";
import { layoutElementsOnCanvas, moveTableFromSeeMoreToCanvas } from "./graph";
import { LineageContext } from "./Lineage";
import { ColumnLineage, Table } from "./service";
import { CustomInput } from "./components/Form";
import TestsIcon from "./assets/icons/tests.svg?react";
import EphemeralIcon from "./assets/icons/ephemeral.svg?react";
import { NODE_TYPE_SHORTHAND } from "./components/Column";
import {
  NODE_TYPE_STYLES,
  NodeTypeIcon,
  TableNodePill,
} from "./components/Column";

export type TMoreTables = {
  prevTable?: string;
  tables?: Table[];
  right?: boolean;
  level?: number;
  lineage?: ColumnLineage[];
};

function TableHeader({
  nodeType,
  label,
  table,
  tests,
  materialization,
}: PropsWithChildren<{
  nodeType: unknown;
  label: string;
  table: string;
  tests: { key: string; path: string }[];
  materialization?: string | undefined;
}>) {
  const nType = nodeType as keyof typeof NODE_TYPE_SHORTHAND;
  const tableId = table.replace(/[^a-zA-Z0-9]/g, "-");
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
      </div>
    </div>
  );
}

function MoreTables() {
  const {
    moreTables,
    rerender,
    setSidebarScreen,
    selectCheck,
    nonSelectCheck,
  } = useContext(LineageContext);
  const { tables, level } = moreTables as TMoreTables;
  const flow = useReactFlow();

  const onItemClick = async (_table: Table) => {
    const nodes = [...flow.getNodes()];
    const edges = [...flow.getEdges()];
    const allTablesAdded = moveTableFromSeeMoreToCanvas(
      nodes,
      edges,
      _table,
      moreTables,
      { direct: selectCheck, indirect: nonSelectCheck }
    );
    if (allTablesAdded) {
      setSidebarScreen("");
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
