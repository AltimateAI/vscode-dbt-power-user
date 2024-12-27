import { DocsIcon, SearchIcon } from "@assets/icons";
import { DBTDocumentationColumn } from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import {
  Button,
  Drawer,
  DrawerRef,
  Input,
  List,
  ListGroupItem,
  LoadingButton,
  Stack,
  Tooltip,
} from "@uicore";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import classes from "../../styles.module.scss";
import { panelLogger } from "@modules/logger";

interface Props {
  onClose: () => void;
  generateForColumns: (
    columns: DBTDocumentationColumn[],
    isAll: boolean,
  ) => Promise<DBTDocumentationColumn[]>;
}

/**
 * Component to handle multiple column selections for bulk documentation generation
 * User can select all columns, documented columns or missing columns
 */
const DocGenSelectedColumns = ({
  onClose,
  generateForColumns,
}: Props): JSX.Element => {
  const drawerRef = useRef<DrawerRef | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setsearchQuery] = useState("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const {
    state: { currentDocsData },
  } = useDocumentationContext();

  useEffect(() => {
    drawerRef.current?.open();
  }, []);

  const filteredColumns = useMemo(() => {
    if (!currentDocsData?.columns) return [];
    if (!searchQuery) return currentDocsData.columns;
    return currentDocsData.columns.filter((column) =>
      column.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, currentDocsData?.columns]);

  const handleGenerate = async () => {
    const columns = currentDocsData?.columns.filter((column) =>
      selectedColumns.includes(column.name),
    );
    if (!columns) return;
    setIsGenerating(true);
    try {
      await generateForColumns(columns, false);
      drawerRef.current?.close();
      onClose();
    } catch (error) {
      panelLogger.error("error while generating documentation", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setsearchQuery(e.target.value);
  };

  const handleSelectColumns = (type: "all" | "documented" | "missing") => {
    switch (type) {
      case "all":
        setSelectedColumns(filteredColumns.map((column) => column.name));
        break;
      case "documented":
        setSelectedColumns(
          filteredColumns
            .filter((column) => Boolean(column.description))
            .map((column) => column.name),
        );
        break;
      case "missing":
        setSelectedColumns(
          filteredColumns
            .filter((column) => !column.description)
            .map((column) => column.name),
        );
        break;
      default:
        break;
    }
  };

  const handleSelectedColumns = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (selectedColumns.includes(value)) {
      setSelectedColumns(selectedColumns.filter((column) => column !== value));
    } else {
      setSelectedColumns([...selectedColumns, value]);
    }
  };

  return (
    <Drawer ref={drawerRef} onClose={onClose}>
      <Stack direction="column" className="h-100">
        <Stack className="justify-content-between">
          Generate documentation{" "}
          <LoadingButton
            disabled={selectedColumns.length === 0}
            loading={isGenerating}
            color="primary"
            onClick={handleGenerate}
          >
            Generate{" "}
            {selectedColumns.length ? `(${selectedColumns.length})` : ""}
          </LoadingButton>
        </Stack>
        <Stack className={classes.search}>
          <SearchIcon />
          <Input placeholder="Search columns" onChange={handleFilterChange} />
        </Stack>
        <div></div>
        <Stack>
          <Button onClick={() => handleSelectColumns("all")}>Select All</Button>
          <Button
            color="success"
            onClick={() => handleSelectColumns("documented")}
          >
            <DocsIcon className={classes.docsIconInBtn} /> Documented
          </Button>
          <Button
            color="warning"
            onClick={() => handleSelectColumns("missing")}
          >
            Missing
          </Button>
        </Stack>
        <Stack className="overflow-auto">
          <List className="m-0 p-0">
            {filteredColumns.map((column) => (
              <ListGroupItem
                key={`${column.name}-${column.type}`}
                tag={"label"}
                className="mb-1"
              >
                <Stack>
                  <Input
                    type="checkbox"
                    value={column.name}
                    checked={selectedColumns.includes(column.name)}
                    onChange={handleSelectedColumns}
                  />
                  {column.name}
                  {column.description ? (
                    <Tooltip title="Documented" placement="top">
                      <DocsIcon className={classes.docsIcon} />
                    </Tooltip>
                  ) : null}
                </Stack>
              </ListGroupItem>
            ))}
          </List>
        </Stack>{" "}
      </Stack>
    </Drawer>
  );
};

export default DocGenSelectedColumns;
