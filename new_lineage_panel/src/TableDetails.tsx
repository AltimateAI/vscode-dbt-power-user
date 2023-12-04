import {
  useContext,
  useState,
  useEffect,
  FunctionComponent,
  Dispatch,
  SetStateAction,
} from "react";
import { useReactFlow } from "reactflow";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { Button } from "reactstrap";
import { getColumns, Columns, Column, Table } from "./service";
import {
  aiEnabled,
  endProgressBar,
  LineageContext,
  startProgressBar,
} from "./App";
import {
  expandTableLineage,
  layoutElementsOnCanvas,
  mergeCollectColumns,
  mergeNodesEdges,
  processColumnLineage,
  removeColumnNodes,
  resetTableHighlights,
} from "./graph";

// ui components
import { ComponentLoader } from "./Loader";
import { ColumnDatatype } from "./Column";
import { ColorTag } from "./Tags";

// assets
import ExpandLineageIcon from "./assets/icons/expand_lineage.svg?react";
import { NodeTypeIcon } from "./CustomNodes";
import { CustomInput } from "./Form";
import {
  defaultEdgeStyle,
  getHelperDataForCLL,
  isColumn,
  isNotColumn,
  safeConcat,
} from "./utils";
import { TMoreTables } from "./MoreTables";

const ColumnCard: FunctionComponent<{
  column: Column;
  handleClick: () => void;
  selected: boolean;
}> = ({ column, handleClick, selected }) => {
  return (
    <div
      className={classNames(styles.column_card, {
        [styles.selected]: selected,
        ["cursor-pointer"]: aiEnabled,
      })}
      onClick={() => {
        if (aiEnabled) handleClick();
      }}
    >
      <div className="d-flex align-items-center gap-xs">
        <ColumnDatatype datatype={column.datatype} />
        <div className="lines-2">{column.name}</div>
        <div className="spacer" />
        {column.can_lineage_expand && (
          <div className={styles.expand_lineage_icon}>
            <ExpandLineageIcon />
          </div>
        )}
        {column.datatype && <ColorTag label={column.datatype} />}
      </div>
      {column.description && (
        <div className="d-flex flex-column">
          <div className="font-normal fs-xxs text-grey">
            {column.description}
          </div>
        </div>
      )}
    </div>
  );
};

const PurposeSection: FunctionComponent<{
  purpose: string;
}> = ({ purpose }) => {
  return (
    <div className={classNames(styles.card, "purpose-section")}>
      <div className="d-flex flex-column gap-sm">
        <div className="d-flex gap-xs flex-column">
          <div className="fs-5 fw-semibold">Description</div>
          <div className={classNames(styles.column_card)}>
            <div className="font-normal fs-xxs">{purpose}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ColumnSection: FunctionComponent<{
  columns: Column[];
  filteredColumn: Column[];
  setFilteredColumn: Dispatch<SetStateAction<Column[]>>;
  handleColumnClick: (x: Column) => Promise<void>;
  selectedTable: Table | null;
  selectedColumn: { name: string; table: string };
  setData: Dispatch<SetStateAction<Columns | null>>;
}> = ({
  columns,
  filteredColumn,
  setFilteredColumn,
  handleColumnClick,
  selectedTable,
  selectedColumn,
  setData,
}) => {
  return (
    <div className={classNames(styles.card, "flex-grow column-section")}>
      <div className="d-flex flex-column gap-sm h-100 p-2">
        <div className="d-flex align-items-center gap-xs">
          <div className="fs-5 fw-semibold">Column</div>
          <div className="spacer" />
          <Button
            size="sm"
            color="primary"
            onClick={() => {
              if (!selectedTable) {
                return;
              }
              getColumns(selectedTable, true).then((_data) => {
                setData(_data);
                setFilteredColumn(_data.columns);
              });
            }}
          >
            Sync with DB
          </Button>
        </div>
        <CustomInput
          bsSize="sm"
          type="text"
          placeholder="Search by column name"
          onChange={(e) => {
            const _search = e.target.value.toLowerCase();
            setFilteredColumn(
              columns.filter((c) => c.name.toLowerCase().includes(_search))
            );
          }}
        />
        <div className="d-flex align-items-center gap-xs">
          <div className="fs-xxs text-grey">
            {filteredColumn.length} columns
          </div>
          <div className="spacer" />
          <div className="text-muted fs-xxs">
            {filteredColumn.every((en) => !en.datatype) ? "Needs DB Sync" : ""}
          </div>
        </div>
        <div className="d-flex flex-column gap-sm">
          {filteredColumn.map((_column) => (
            <ColumnCard
              key={_column.name}
              column={_column}
              handleClick={() => handleColumnClick(_column)}
              selected={
                _column.name === selectedColumn.name &&
                _column.table === selectedColumn.table
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const TestSection: FunctionComponent<{
  tests: { key: string; path: string }[];
}> = ({ tests }) => {
  const [filteredTests, setFilteredTests] = useState(tests);
  return (
    <div className={classNames(styles.card, "flex-grow column-section")}>
      <div className="d-flex flex-column gap-sm h-100 p-2">
        <div className="fs-5 fw-semibold">Tests</div>
        <CustomInput
          bsSize="sm"
          type="text"
          placeholder="Search by test"
          onChange={(e) => {
            const _search = e.target.value.toLowerCase();
            setFilteredTests(
              tests.filter((t) => t.key.toLowerCase().includes(_search))
            );
          }}
        />
        <div className="d-flex align-items-center gap-xs">
          <div className="fs-xxs text-grey">{filteredTests.length} tests</div>
        </div>
        <div className="d-flex flex-column gap-sm">
          {filteredTests.map((_test) => (
            <div key={_test.key} className={styles.column_card}>
              <div className="d-flex align-items-center gap-xs">
                <div className="lines-2">{_test.key}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const TableDetails = () => {
  const {
    selectedTable,
    selectedColumn,
    setSelectedColumn,
    setCollectColumns,
    setShowSidebar,
    rerender,
    setConfidence,
    setMoreTables,
  } = useContext(LineageContext);
  const flow = useReactFlow();
  const [filteredColumn, setFilteredColumn] = useState<Column[]>([]);
  const [data, setData] = useState<Columns | null>(null);
  const [tab, setTab] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!selectedTable) {
      return;
    }
    getColumns(selectedTable, false).then((_data) => {
      setData(_data);
      setFilteredColumn(_data.columns);
      setIsLoading(false);
    });
  }, [selectedTable]);

  const handleColumnClick = async (_column: Column) => {
    if (
      selectedColumn.table === _column.table &&
      selectedColumn.name === _column.name
    ) {
      const [_nodes, _edges] = removeColumnNodes(
        flow.getNodes(),
        flow.getEdges()
      );
      flow.setNodes(_nodes);
      flow.setEdges(_edges);
      setSelectedColumn({ table: "", name: "" });
      setCollectColumns({});
      setShowSidebar(false);
      return;
    }
    startProgressBar();
    console.time();
    let _nodes = flow.getNodes();
    let _edges = flow.getEdges();
    const addNodesEdges = async (right: boolean) => {
      [_nodes, _edges] = await expandTableLineage(
        _nodes,
        _edges,
        _column.table,
        right
      );
      layoutElementsOnCanvas(_nodes, _edges);
    };
    const tableNode = flow.getNode(_column.table);
    if (tableNode) {
      const {
        data: { processed },
      } = tableNode;
      if (!processed[1]) await addNodesEdges(true);
      if (!processed[0]) await addNodesEdges(false);
    }
    setSelectedColumn(_column);
    setShowSidebar(false);
    setCollectColumns({});

    // resetting existing styles
    const [nodes, edges] = resetTableHighlights(
      _nodes.filter(isNotColumn),
      _edges.filter(isNotColumn)
    );
    edges.forEach((_e) => (_e.style = defaultEdgeStyle));
    flow.setNodes(nodes);
    flow.setEdges(edges);
    setConfidence({ confidence: "high" });
    rerender();

    // creating helper data for current lineage once
    const { levelMap, tableNodes, seeMoreIdTableReverseMap } =
      getHelperDataForCLL(nodes, edges);

    const bfsTraversal = async (right: boolean) => {
      const visited: Record<string, boolean> = {};
      const ephemeralAncestors: Record<string, [string, string][]> = {};
      let currTargetColumns: [string, string][] = [
        [_column.table, _column.name],
      ];
      let currEphemeralNodes: string[] = [];
      while (true as boolean) {
        currTargetColumns = currTargetColumns.filter(
          (x) => !visited[x.join("/")]
        );
        if (currTargetColumns.length === 0 && currEphemeralNodes.length === 0) {
          break;
        }
        const currTargetTables: Record<string, boolean> = {};
        currTargetColumns.forEach((x) => {
          visited[x.join("/")] = true;
          currTargetTables[x[0]] = true;
        });

        const [src, dst]: ("source" | "target")[] = right
          ? ["source", "target"]
          : ["target", "source"];
        const hop1Tables: string[] = [];
        const _currEphemeralNodes: string[] = [];
        const collectEphemeralAncestors: string[] = [];
        let noDependents = false;
        for (const e of _edges) {
          if (isColumn(e)) continue;
          const srcTable = e[src];
          const dstNode = e[dst];
          const dstTables = tableNodes[dstNode]
            ? [flow.getNode(dstNode)?.data as Table]
            : (flow.getNode(dstNode)?.data as TMoreTables)?.tables?.filter(
                (t) => !tableNodes[t.table]
              );
          dstTables?.forEach(({ table: dstTable, materialization }) => {
            if (currTargetTables[srcTable]) {
              noDependents = true;
              if (materialization === "ephemeral") {
                // carry forward
                safeConcat(
                  ephemeralAncestors,
                  dstTable,
                  currTargetColumns.filter((c) => c[0] === srcTable)
                );
                _currEphemeralNodes.push(dstTable);
              } else {
                hop1Tables.push(dstTable);
              }
            } else if (currEphemeralNodes.includes(srcTable)) {
              noDependents = true;
              if (materialization === "ephemeral") {
                // carry forward follow through
                safeConcat(
                  ephemeralAncestors,
                  dstTable,
                  ephemeralAncestors[srcTable]
                );
                _currEphemeralNodes.push(dstTable);
              } else {
                collectEphemeralAncestors.push(srcTable);
                hop1Tables.push(dstTable);
              }
            }
          });
        }
        if (!noDependents) {
          break;
        }
        currEphemeralNodes = _currEphemeralNodes;

        const currAnd1HopTables =
          Object.keys(currTargetTables).concat(hop1Tables);

        collectEphemeralAncestors.forEach((t) => {
          currTargetColumns.push(...ephemeralAncestors[t]);
          currAnd1HopTables.push(...ephemeralAncestors[t].map((c) => c[0]));
        });
        try {
          const patchState = await processColumnLineage(
            levelMap,
            seeMoreIdTableReverseMap,
            tableNodes,
            currTargetColumns,
            right,
            Array.from(new Set(currAnd1HopTables)),
            _column
          );
          if (patchState.confidence?.confidence === "low") {
            setConfidence((prev) => {
              const newConfidence = { ...prev, confidence: "low" };
              newConfidence.operator_list = newConfidence.operator_list || [];
              newConfidence.operator_list.push(
                ...(patchState.confidence?.operator_list || [])
              );
              return newConfidence;
            });
          }
          currTargetColumns = patchState.newCurr;
          const [nodes, edges] = mergeNodesEdges(
            { nodes: flow.getNodes(), edges: flow.getEdges() },
            patchState
          );

          setMoreTables((prev) => ({
            ...prev,
            lineage: [...(prev.lineage || []), ...patchState.seeMoreLineage],
          }));

          flow.setNodes(nodes);
          flow.setEdges(edges);
          mergeCollectColumns(setCollectColumns, patchState.collectColumns);
        } catch (e) {
          console.error(e);
        }
      }
    };

    await Promise.all([bfsTraversal(true), bfsTraversal(false)]);
    console.timeEnd();
    endProgressBar();
  };
  if (isLoading || !data || !selectedTable) return <ComponentLoader />;

  return (
    <div className="p-2 h-100 d-flex flex-column gap-md overflow-y">
      <div className={styles.table_details_header}>
        <NodeTypeIcon nodeType={selectedTable.nodeType} />
        <div className="d-flex align-items-center">
          <div className="fw-semibold fs-5 lines-2">{selectedTable.label}</div>
        </div>
      </div>
      {data.purpose && <PurposeSection purpose={data.purpose} />}
      <div className={styles.table_details_tabs}>
        {["Column", "Tests"].map((label, i) => (
          <div
            className={classNames(styles.tab, { [styles.selected]: tab === i })}
            onClick={() => setTab(i)}
          >
            {label}
          </div>
        ))}
      </div>
      {tab === 0 && (
        <ColumnSection
          selectedTable={selectedTable}
          selectedColumn={selectedColumn}
          filteredColumn={filteredColumn}
          setFilteredColumn={setFilteredColumn}
          columns={data.columns}
          handleColumnClick={handleColumnClick}
          setData={setData}
        />
      )}
      {tab === 1 && <TestSection tests={selectedTable.tests} />}
    </div>
  );
};

export { TableDetails };
