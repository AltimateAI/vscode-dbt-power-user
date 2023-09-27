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
import { Button, Input } from "reactstrap";
import { getColumns, Columns, Column } from "./service";
import { LineageContext } from "./App";
import { processColumnLineage, removeColumnNodes } from "./graph";

// ui components
import { ComponentLoader } from "./Loader";
import { ColumnDatatype } from "./Column";
import { ColorTag } from "./Tags";

// assets
import ExpandLineageIcon from "./assets/icons/expand_lineage.svg?react";
import { NodeTypeIcon } from "./CustomNodes";

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
        <ColorTag
          label={column.datatype || "object"}
          color={styles.column_tag}
        />
      </div>
      {column.description && (
        <div className="d-flex flex-column">
          <div className="text-muted font-normal fs-xxs">
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
    <div className={classNames(styles.card, "bg-blue")}>
      <div className="d-flex flex-column gap-sm">
        <div className="d-flex gap-xs flex-column">
          <div className="fs-5 fw-semibold">Description</div>
          <div className={classNames(styles.column_card)}>
            <div className="text-muted font-normal fs-xxs">{purpose}</div>
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
  selectedColumn: string;
}> = ({
  columns,
  filteredColumn,
  setFilteredColumn,
  handleColumnClick,
  selectedColumn,
}) => {
  const [search, setSearch] = useState("");
  return (
    <div className={classNames(styles.card, "flex-grow bg-gray")}>
      <div className="d-flex flex-column gap-sm h-100 p-2">
        <div className="d-flex align-items-center gap-xs">
          <div className="fs-5 fw-semibold">Column</div>
        </div>
        <Input
          bsSize="sm"
          placeholder="Search by column name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            const _search = e.target.value.toLowerCase();
            setFilteredColumn(
              columns.filter((c) => c.name.toLowerCase().includes(_search))
            );
          }}
        />
        <div className="d-flex align-items-center gap-xs">
          <div className="text-muted fs-xxs">
            {filteredColumn.length} columns
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
    getColumns(selectedTable.table).then((_data) => {
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
    const _nodes = flow.getNodes();
    const _edges = flow.getEdges();
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
    <div className="p-2 h-100 d-flex flex-column gap-md text-black overflow-y">
      <div className={styles.table_details_header}>
        <NodeTypeIcon nodeType={selectedTable.nodeType} />
        <div className="d-flex align-items-center">
          <div className="fw-semibold fs-5 lines-2">{selectedTable.table}</div>
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
                setIsLoading(false);
              });
            }}
          >
            Re-Sync
          </Button>
        </div>
      </div>
      <PurposeSection tableId={data.id} purpose={data.purpose} />
      <ColumnSection
        selectedColumn={selectedColumn.name}
        filteredColumn={filteredColumn}
        setFilteredColumn={setFilteredColumn}
        columns={data.columns}
        handleColumnClick={handleColumnClick}
      />
    </div>
  );
};

export { TableDetails };
