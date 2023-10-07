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
  processColumnLineage,
  removeColumnNodes,
} from "./graph";

// ui components
import { ComponentLoader } from "./Loader";
import { ColumnDatatype } from "./Column";
import { ColorTag } from "./Tags";

// assets
import ExpandLineageIcon from "./assets/icons/expand_lineage.svg?react";
import { NodeTypeIcon } from "./CustomNodes";
import { CustomInput } from "./Form";

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
    const { nodes, edges, collectColumns } = await processColumnLineage(
      _nodes,
      _edges,
      { name: _column.name, table: _column.table }
    );

    flow.setNodes(nodes);
    flow.setEdges(edges);
    setSelectedColumn(_column);
    setCollectColumns(collectColumns);
    setShowSidebar(false);
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
