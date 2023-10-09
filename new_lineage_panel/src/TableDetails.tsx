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
import { LineageContext } from "./App";
import {
  createNewNodesEdges,
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
import { defaultEdgeStyle, isColumn, isNotColumn } from "./utils";

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
  selectedColumn: string;
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
              selected={_column.name === selectedColumn}
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
    };
    const tableNode = flow.getNode(_column.table);
    if (tableNode) {
      const {
        data: { processed, key, level },
      } = tableNode;
      if (!processed[1]) {
        const { tables } = await upstreamTables(key);
        addNodesEdges(tables, true, level);
      }
      if (!processed[0]) {
        const { tables } = await downstreamTables(key);
        addNodesEdges(tables, false, level);
      }
    }
    setSelectedColumn(_column);
    setShowSidebar(false);

    // resetting existing styles
    const [nodes, edges] = resetTableHighlights(
      _nodes.filter(isNotColumn),
      _edges.filter(isNotColumn)
    );
    edges.forEach((_e) => (_e.style = defaultEdgeStyle));
    flow.setNodes(nodes);
    flow.setEdges(edges);

    // creating helper data for current lineage once
    const levelMap: Record<string, number> = {};
    nodes.forEach((n) => (levelMap[n.id] = n.data.level));
    const tableNodes: Record<string, boolean> = {};
    nodes
      .filter((_n) => _n.type === "table")
      .forEach((_n) => (tableNodes[_n.id] = true));
    const seeMoreIdTableReverseMap: Record<string, string> = {};
    for (const e of edges) {
      if (isColumn(e)) continue;
      const sourceTableExist = tableNodes[e.source];
      const targetTableExist = tableNodes[e.target];
      if (sourceTableExist && targetTableExist) {
        continue;
      }
      if (sourceTableExist) {
        const _n = _nodes.find((_n) => _n.id === e.target)!;
        _n.data.tables.forEach((_t: { table: string }) => {
          seeMoreIdTableReverseMap[_t.table] = e.target;
        });
        continue;
      }
      if (targetTableExist) {
        const _n = _nodes.find((_n) => _n.id === e.source)!;
        _n.data.tables.forEach((_t: { table: string }) => {
          seeMoreIdTableReverseMap[_t.table] = e.source;
        });
      }
    }

    const bfsTraversal = async (right: boolean) => {
      const visited: Record<string, boolean> = {};
      const queue: [string, string][] = [[_column.table, _column.name]];
      while (queue.length > 0) {
        const [_t, _c] = queue.shift()!;
        const id = `${_t}/${_c}`;
        if (visited[id]) {
          continue;
        }
        visited[id] = true;
        const connectedTables: {
          upstreamTables?: string[];
          downstreamTables?: string[];
        } = {};

        if (right) {
          connectedTables.upstreamTables = _edges
            .filter((e) => e.source === _t)
            .map((e) => e.target);
        } else {
          connectedTables.downstreamTables = _edges
            .filter((e) => e.target === _t)
            .map((e) => e.source);
        }

        const newState = await processColumnLineage(
          levelMap,
          seeMoreIdTableReverseMap,
          tableNodes,
          { name: _column.name, table: _column.table },
          connectedTables
        );
        const mergedState = mergeNodesEdges(
          { nodes: flow.getNodes(), edges: flow.getEdges() },
          newState
        );
        flow.setNodes(mergedState.nodes);
        flow.setEdges(mergedState.edges);
        setCollectColumns((prev) => {
          const collectColumns: Record<string, string[]> = { ...prev };
          for (const t in newState.collectColumns) {
            const _columns = newState.collectColumns[t];
            if (!(t in collectColumns)) {
              collectColumns[t] = _columns;
              continue;
            }
            _columns.forEach((c) => {
              if (collectColumns[t].includes(c)) {
                return;
              }
              collectColumns[t].push(c);
            });
          }
          return collectColumns;
        });
      }
    };

    bfsTraversal(true);
    bfsTraversal(false);
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
        selectedColumn={selectedColumn.name}
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
