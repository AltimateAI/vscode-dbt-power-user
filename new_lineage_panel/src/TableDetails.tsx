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
import { aiEnabled, LineageContext } from "./App";
import {
  previewFeature,
  showInfoNotification,
  CLL,
} from "./service_utils";
import {
  bfsTraversal,
  expandTableLineage,
  layoutElementsOnCanvas,
  removeColumnNodes,
  resetTableHighlights,
} from "./graph";

// ui components
import { ComponentLoader } from "./Loader";
import { ColumnDatatype } from "./Column";
import { ColorTag } from "./Tags";

// assets
import ExpandLineageIcon from "./assets/icons/expand_lineage.svg?react";
import Preview from "./assets/icons/preview.svg?react";
import { NodeTypeIcon } from "./CustomNodes";
import { CustomInput } from "./Form";
import { defaultEdgeStyle, isNotColumn } from "./utils";
import PurposeSection from "./components/Purpose";

const PreviewIcon = () => {
  return (
    <div className="tooltip-container">
      <Preview />
      <div className="tooltip-text">Preview Feature</div>
    </div>
  );
};

const ColumnCard: FunctionComponent<{
  column: Column;
  handleClick: () => void;
  selected: boolean;
  isSelectable: boolean;
}> = ({ column, handleClick, selected, isSelectable }) => {
  return (
    <div
      className={classNames(styles.column_card, {
        [styles.selected]: selected,
        "cursor-pointer": isSelectable,
      })}
      onClick={handleClick}
      data-testid={"table-details-" + column.name}
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
  const isEphemeral = selectedTable?.materialization === "ephemeral";
  const isAnalysis = selectedTable?.nodeType === "analysis";
  return (
    <div className={classNames(styles.card, "flex-grow column-section")}>
      <div className="d-flex flex-column gap-sm h-100 p-2">
        <div className="d-flex align-items-center gap-xs">
          <div className="fs-5 fw-semibold">Columns</div>
          <div className="spacer" />
          {!isEphemeral && !isAnalysis && (
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
          )}
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
          {!isEphemeral && (
            <>
              <div className="fs-xxs">Select column for lineage</div>
              <PreviewIcon />
            </>
          )}
          <div className="spacer" />
          <div className="fs-xxs text-grey">
            {filteredColumn.length} columns
          </div>
        </div>
        <div className="d-flex flex-column gap-sm">
          {filteredColumn.map((_column) => (
            <ColumnCard
              key={_column.name}
              column={_column}
              handleClick={() => {
                if (isEphemeral) return;
                handleColumnClick(_column);
              }}
              selected={
                _column.name === selectedColumn.name &&
                _column.table === selectedColumn.table
              }
              isSelectable={!isEphemeral}
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
    if (!aiEnabled) {
      previewFeature();
      return;
    }

    if (CLL.inProgress) {
      CLL.showCllInProgressMsg();
      return;
    }

    // remove column selection when already selected
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
      setSelectedColumn({ table: "", name: "", sessionId: "" });
      setCollectColumns({});
      setShowSidebar(false);
      return;
    }

    const tableNode = flow.getNode(_column.table);
    if (!tableNode) {
      throw new Error(`table node ${_column.table} isn't visible`);
    }

    // expand 1st level if not already
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
    const {
      data: { processed },
    } = tableNode;
    if (!processed[1]) await addNodesEdges(true);
    if (!processed[0]) await addNodesEdges(false);

    // initializing states
    const sessionId = window.crypto.randomUUID();
    setSelectedColumn({ ..._column, sessionId });
    setShowSidebar(false);
    setCollectColumns({});
    setConfidence({ confidence: "high" });

    // resetting canvas
    const [nodes, edges] = resetTableHighlights(
      _nodes.filter(isNotColumn),
      _edges.filter(isNotColumn)
    );
    edges.forEach((_e) => (_e.style = defaultEdgeStyle));
    flow.setNodes(nodes);
    flow.setEdges(edges);
    rerender();

    // starting column lineage
    const _bfsTraversal = (right: boolean) =>
      bfsTraversal(
        nodes,
        edges,
        right,
        [_column],
        setConfidence,
        setMoreTables,
        setCollectColumns,
        flow,
        sessionId
      );
    try {
      CLL.start();
      const result = await Promise.all([
        _bfsTraversal(true),
        _bfsTraversal(false),
      ]);
      if (result.every((isLineage) => !isLineage)) {
        if (CLL.isCancelled) {
          setSelectedColumn({ table: "", name: "", sessionId: "" });
        } else {
          showInfoNotification(
            `No lineage found for model ${_column.table} and column ${_column.name}`
          );
        }
      }
    } catch (e) {
      console.error(
        "Error while performing cll for ",
        _column.table,
        _column.name,
        ", error:",
        e
      );
      setSelectedColumn({ table: "", name: "", sessionId: "" });
    } finally {
      CLL.end();
    }
  };
  if (isLoading || !data || !selectedTable) return <ComponentLoader />;
  const tabs = ["Column"];
  if (selectedTable.tests.length) tabs.push("Tests");

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
        {tabs.map((label, i) => (
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
