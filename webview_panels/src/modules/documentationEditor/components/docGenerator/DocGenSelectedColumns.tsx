import { DBTDocumentationColumn } from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import {
  Button,
  Drawer,
  DrawerRef,
  Input,
  List,
  ListGroupItem,
  Stack,
} from "@uicore";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

interface Props {
  onClose: () => void;
  generateForColumns: (columns: DBTDocumentationColumn[]) => void;
}
const DocGenSelectedColumns = ({
  onClose,
  generateForColumns,
}: Props): JSX.Element => {
  const drawerRef = useRef<DrawerRef | null>(null);
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

  const handleGenerate = () => {
    const columns = currentDocsData?.columns.filter((column) =>
      selectedColumns.includes(column.name),
    );
    if (!columns) return;
    generateForColumns(columns);
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

  return (
    <Drawer ref={drawerRef} onClose={onClose}>
      <Stack direction="column" className="h-100">
        <Stack className="justify-content-between">
          Generate documentation{" "}
          <Button onClick={handleGenerate}>Generate</Button>
        </Stack>
        <div>
          <Input placeholder="Search columns" onChange={handleFilterChange} />
        </div>
        <Stack>
          <Button onClick={() => handleSelectColumns("all")}>Select All</Button>
          <Button
            color="success"
            onClick={() => handleSelectColumns("documented")}
          >
            Documented
          </Button>
          <Button
            color="warning"
            onClick={() => handleSelectColumns("missing")}
          >
            Missing
          </Button>
        </Stack>
        <Stack className="overflow-auto">
          <List>
            {filteredColumns.map((column) => (
              <ListGroupItem
                key={`${column.name}-${column.type}`}
                tag={"label"}
              >
                <Input
                  type="checkbox"
                  value={column.name}
                  checked={selectedColumns.includes(column.name)}
                />
                {column.name}
              </ListGroupItem>
            ))}
          </List>
        </Stack>{" "}
      </Stack>
    </Drawer>
  );
};

export default DocGenSelectedColumns;
