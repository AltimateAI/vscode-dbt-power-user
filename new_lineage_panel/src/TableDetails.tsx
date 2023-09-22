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
import {
  updateTablePurpose,
  generateDescription,
  // getTableDescriptionById,
  getColumns,
  Columns,
  Column,
} from "./service";
import { LineageContext } from "./App";
import { processColumnLineage } from "./graph";

// ui components
import { ComponentLoader } from "./Loader";
import { ColumnDatatype } from "./Column";
import { ColorTag } from "./Tags";

// assets
import ProcessingScreen from "./assets/icons/processing_screen.gif";
import ExpandLineageIcon from "./assets/icons/expand_lineage.svg?react";
import EditIcon from "./assets/icons/edit.svg?react";
import RobotLogo from "./assets/icons/robot1.svg?react";
import RotateIcon from "./assets/icons/rotate.svg?react";

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
          <div>Description</div>
          <div className="text-muted font-normal">{column.description}</div>
        </div>
      )}
    </div>
  );
};

const HeaderSection: FunctionComponent<{ table: string; tableKey: string }> = ({
  table,
  tableKey,
}) => {
  return (
    <div>
      <div className="mb-2">
        {/* {getIconByDatastoreType(datastore_type)} */}
        <div className="fw-semibold fs-5 lines-2">{table}</div>
      </div>
      <div className="text-primary">{tableKey.split(".")?.[0]}</div>
    </div>
  );
};

const PurposeSection: FunctionComponent<{
  tableId: string;
  purpose: string;
}> = ({ tableId, purpose: defaultPurpose }) => {
  const [purpose, setPurpose] = useState(defaultPurpose);
  const [isPurposeEditing, setPurposeEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={classNames(styles.card, "bg-blue")}>
      <div className="d-flex flex-column gap-sm">
        <div className="d-flex gap-xs flex-column">
          <div className="fs-5 fw-semibold">Generate Description & Tags</div>
          <div className={classNames(styles.column_card)}>
            {purpose ? (
              <>
                <div className="d-flex gap-xs align-items-center">
                  <div>Description</div>
                  <EditIcon
                    className={classNames("cursor-pointer", styles.edit_icon, {
                      [styles.active]: isPurposeEditing,
                    })}
                    onClick={() => {
                      if (isPurposeEditing) {
                        setPurpose(defaultPurpose);
                        setPurposeEditing(false);
                      } else {
                        setPurposeEditing(true);
                      }
                    }}
                  />
                  <div className="spacer" />
                  <Button
                    color="white"
                    size="sm"
                    onClick={async (e) => {
                      e.stopPropagation();
                      setIsLoading(true);
                      await generateDescription({ tableId });
                      setIsLoading(false);
                    }}
                  >
                    <RotateIcon />
                  </Button>
                </div>
                <div className="divider" />
              </>
            ) : (
              <div className="d-flex gap-xs">
                <div>Description</div>
                <div className="spacer" />
                <Button
                  color="primary"
                  size="sm"
                  onClick={async (e) => {
                    e.stopPropagation();
                    setIsLoading(true);
                    await generateDescription({ tableId });
                    setIsLoading(false);
                  }}
                >
                  <RobotLogo />
                  {isLoading ? "Generating..." : "Generate Description"}
                </Button>
              </div>
            )}

            {isLoading ? (
              <div
                className={classNames(
                  "d-flex gap-xs align-items-center flex-column",
                  styles.processing_div
                )}
              >
                <img
                  src={ProcessingScreen}
                  className={classNames(styles.gif_img)}
                />
                <div className="spacer" />
                <div className="text-muted font-normal">
                  Checking query history
                </div>
              </div>
            ) : isPurposeEditing ? (
              <>
                <Input
                  type="textarea"
                  disabled={!isPurposeEditing}
                  rows={defaultPurpose ? 8 : 2}
                  className={styles.multiline_input}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Enter the purpose for the table"
                />
                <Button
                  onClick={async (e) => {
                    e.stopPropagation();
                    const data = await updateTablePurpose({ tableId, purpose });
                    if (data.ok) {
                      setPurposeEditing(false);
                    }
                  }}
                >
                  Update
                </Button>
              </>
            ) : (
              <div className="text-muted font-normal">{purpose}</div>
            )}
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
          <div className="text-muted">{filteredColumn.length} columns</div>
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
    const _nodes = flow.getNodes();
    const _edges = flow.getEdges();
    const { nodes, edges, collectColumns } = await processColumnLineage(
      _nodes,
      _edges,
      { name: _column.name, table: _column.table }
    );

    flow.setNodes(nodes);
    flow.setEdges(edges);
    setSelectedColumn(_column.name);
    setCollectColumns(collectColumns);
    setShowSidebar(false);
  };
  if (isLoading || !data || !selectedTable) return <ComponentLoader />;

  return (
    <div className="p-2 h-100 d-flex flex-column gap-md text-black overflow-y">
      <HeaderSection table={selectedTable.table} tableKey={selectedTable.key} />
      <PurposeSection tableId={data.id} purpose={data.purpose} />
      <ColumnSection
        selectedColumn={selectedColumn}
        filteredColumn={filteredColumn}
        setFilteredColumn={setFilteredColumn}
        columns={data.columns}
        handleColumnClick={handleColumnClick}
      />
    </div>
  );
};

export { TableDetails };
