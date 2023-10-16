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
import {
  getColumns,
  Columns,
  Column,
  upstreamTables,
  downstreamTables,
  Table,
} from "./service";
import { endProgressBar, LineageContext, startProgressBar } from "./App";
import {
  createNewNodesEdges,
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
import { defaultEdgeStyle, getHelperDataForCLL, isNotColumn } from "./utils";

const ColumnCard: FunctionComponent<{
  column: Column;
  handleClick: () => void;
  selected: boolean;
}> = ({ column, handleClick, selected }) => {
  return (
    <div
      className={classNames(styles.column_card, {
        [styles.selected]: selected,
      })}
      onClick={handleClick}
    >
      <div className="d-flex align-items-center gap-xs">
        <ColumnDatatype datatype={column.datatype} />
        <div>{column.name}</div>
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
  tableId: string;
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
              getColumns(selectedTable.table, true).then((_data) => {
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

const TableDetails = () => {
  const {
    selectedTable,
    selectedColumn,
    setSelectedColumn,
    setCollectColumns,
    setShowSidebar,
    rerender,
  } = useContext(LineageContext);
  const flow = useReactFlow();
  const [filteredColumn, setFilteredColumn] = useState<Column[]>([]);
  const [data, setData] = useState<Columns | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!selectedTable) {
      return;
    }
    getColumns(selectedTable.table, false).then((_data) => {
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
    const addNodesEdges = (tables: Table[], right: boolean, level: number) => {
      [_nodes, _edges] = createNewNodesEdges(
        _nodes,
        _edges,
        tables,
        _column.table,
        right,
        level
      );
      layoutElementsOnCanvas(_nodes, _edges);
    };
    const tableNode = flow.getNode(_column.table);
    if (tableNode) {
      const {
        data: { processed, key, level },
      } = tableNode;
      if (!processed[1]) {
        try {
          const { tables } = await upstreamTables(key);
          addNodesEdges(tables, true, level);
        } catch (e) {
          console.error(e);
        }
      }
      if (!processed[0]) {
        try {
          const { tables } = await downstreamTables(key);
          addNodesEdges(tables, false, level);
        } catch (e) {
          console.error(e);
        }
      }
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
    rerender();

    // creating helper data for current lineage once
    const { levelMap, tableNodes, seeMoreIdTableReverseMap } =
      getHelperDataForCLL(nodes, edges);

    const bfsTraversal = async (right: boolean) => {
      const visited: Record<string, boolean> = {};
      let curr: [string, string][] = [[_column.table, _column.name]];
      let n = 3;
      while (n-- > 0) {
        const unvistedColumns = curr.filter((x) => !visited[x.join("/")]);
        if (unvistedColumns.length === 0) {
          continue;
        }
        const tablesInCurrIter: Record<string, boolean> = {};
        unvistedColumns.forEach((x) => {
          visited[x.join("/")] = true;
          tablesInCurrIter[x[0]] = true;
        });

        const currAnd1HopTables = right
          ? _edges
              .filter((e) => tablesInCurrIter[e.source])
              .map((e) => e.target)
          : _edges
              .filter((e) => tablesInCurrIter[e.target])
              .map((e) => e.source);

        if (currAnd1HopTables.length === 0) {
          continue;
        }
        currAnd1HopTables.push(...Object.keys(tablesInCurrIter));

        try {
          const patchState = await processColumnLineage(
            levelMap,
            seeMoreIdTableReverseMap,
            tableNodes,
            curr,
            right,
            currAnd1HopTables,
            _column
          );
          curr = patchState.newCurr;
          const [nodes, edges] = mergeNodesEdges(
            { nodes: flow.getNodes(), edges: flow.getEdges() },
            patchState
          );
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
          <div className="fw-semibold fs-5 lines-2">{selectedTable.table}</div>
        </div>
      </div>
      <PurposeSection tableId={data.id} purpose={data.purpose} />
      <ColumnSection
        selectedTable={selectedTable}
        selectedColumn={selectedColumn}
        filteredColumn={filteredColumn}
        setFilteredColumn={setFilteredColumn}
        columns={data.columns}
        handleColumnClick={handleColumnClick}
        setData={setData}
      />
    </div>
  );
};

export { TableDetails };
