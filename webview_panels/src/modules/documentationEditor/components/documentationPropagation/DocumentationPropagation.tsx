import { ArrowDownIcon, ArrowUpIcon, PropagateIcon } from "@assets/icons";
import { useEffect, useRef, useState } from "react";
import {
  Drawer,
  Stack,
  DrawerRef,
  Button,
  Input,
  Loader,
  Card,
  CardBody,
} from "@uicore";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { ColumnLineage } from "@lib";
import styles from "./styles.module.scss";
import { updateBulkDocsPropRightPanel } from "@modules/documentationEditor/state/documentationSlice";

interface Props {
  name: string;
  type: EntityType;
}

interface DocsItem {
  model: string;
  column: string;
  description: string;
  root?: string;
}

interface TableMetadata {
  table: string;
  description: string;
  patchPath?: string;
  packageName: string;
  url: string;
  columns: Record<
    string,
    { name: string; description: string; data_type: string }
  >;
}
interface DownstreamColumns {
  column_lineage: ColumnLineage[];
  tables: TableMetadata[];
  tests: Record<string, unknown>;
}

const mergeDocItems = (a: DocsItem[], b: DocsItem[]): DocsItem[] => {
  const result = [...a];
  for (const item of b) {
    if (
      !result.find((i) => i.model === item.model && i.column === item.column)
    ) {
      result.push(item);
    }
  }
  return result;
};

const SingleColumnCard = ({
  isLoading,
  columnName,
  columnDescription,
  selectedColumns,
  setSelectedColumns,
  downstreamColumns,
}: {
  isLoading: boolean;
  columnName: string;
  columnDescription: string;
  selectedColumns: Record<string, boolean>;
  setSelectedColumns: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  downstreamColumns: DocsItem[];
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const setAllColumnsValue = (value: boolean) => {
    setSelectedColumns((prev) => ({
      ...prev,
      ...Object.fromEntries(
        downstreamColumns.map((curr) => [
          curr.model + "/" + curr.column,
          value,
        ]),
      ),
    }));
  };
  if (!isExpanded) {
    return (
      <Card>
        <CardBody>
          <div
            className={styles.singleColumnAccordion}
            onClick={() => setIsExpanded(true)}
          >
            <ArrowDownIcon />
          </div>
          <Stack direction="column">
            <div className={styles.itemRow}>
              <div>Column:</div>
              <div>{columnName}</div>
            </div>
            {isLoading ? (
              <Stack className="align-items-center">
                <Loader size="xsmall" />
                <div className={styles.captionText}>Loading...</div>
              </Stack>
            ) : (
              <div className={styles.captionText}>
                Downstream columns: {downstreamColumns.length}
              </div>
            )}
          </Stack>
        </CardBody>
      </Card>
    );
  }
  return (
    <Card data-testid={`docs_prop_column_card_${columnName}`}>
      <CardBody>
        <div
          className={styles.singleColumnAccordion}
          onClick={() => setIsExpanded(false)}
        >
          <ArrowUpIcon />
        </div>
        <Stack direction="column" className="gap-0 mb-2">
          <div className={styles.itemRow}>
            <div>Column:</div>
            <div>{columnName}</div>
          </div>
          {columnDescription && (
            <div className={styles.itemRow}>
              <div>Description:</div>
              <div>{columnDescription}</div>
            </div>
          )}
        </Stack>
        {!isLoading && downstreamColumns.length === 0 ? (
          <div className="mt-4">
            No downstream column level lineage detected to propagate the
            documentation
          </div>
        ) : null}
        {!isLoading && downstreamColumns.length > 0 ? (
          <Stack className="mb-2">
            <Button
              color="primary"
              outline
              onClick={() => setAllColumnsValue(true)}
            >
              Select All
            </Button>
            <Button
              color="primary"
              outline
              onClick={() => setAllColumnsValue(false)}
            >
              Unselect All
            </Button>
          </Stack>
        ) : null}
        <Stack
          direction="column"
          className="gap-sm"
          data-testid={`docs_prop_downstream_columns_${columnName}`}
        >
          {downstreamColumns.map((item) => {
            const key = item.model + "/" + item.column;
            return (
              <Stack key={key} className={styles.itemCard}>
                <Input
                  type="checkbox"
                  checked={selectedColumns[key]}
                  onChange={() =>
                    setSelectedColumns((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))
                  }
                />
                <Stack direction="column" className="gap-0 w-100">
                  <div className={styles.itemRow}>
                    <div>Model:</div>
                    <div>{item.model.split(".").pop()}</div>
                  </div>
                  <div className={styles.itemRow}>
                    <div>Column:</div>
                    <div>{item.column}</div>
                  </div>
                  {item.description && (
                    <div className={styles.itemRow}>
                      <div>Description:</div>
                      <div>{item.description}</div>
                    </div>
                  )}
                </Stack>
              </Stack>
            );
          })}
        </Stack>
        {isLoading && (
          <Stack className="align-items-center mt-2">
            <Loader size="xsmall" />
            <div className={styles.captionText}>Loading...</div>
          </Stack>
        )}
      </CardBody>
    </Card>
  );
};

const useDocumentationPropagation = ({
  startColumns,
}: {
  startColumns: DocsItem[];
}) => {
  const {
    state: { currentDocsData },
  } = useDocumentationContext();
  const [allColumns, setAllColumns] = useState<DocsItem[]>([]);
  const [currColumns, setCurrColumns] = useState<DocsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isColumnLineageLoading, setIsColumnLineageLoading] = useState<
    Record<string, boolean>
  >({});
  const [tableMetadata, setTableMetadata] = useState<TableMetadata[]>([]);
  const isCancelled = useRef(false);
  const [testsMetadata, setTestsMetadata] = useState<Record<string, unknown>>(
    {},
  );
  const [selectedColumns, setSelectedColumns] = useState<
    Record<string, boolean>
  >({});

  const loadMoreDownstreamModels = async () => {
    isCancelled.current = false;
    setIsLoading(true);
    setIsColumnLineageLoading(
      Object.fromEntries(currColumns.map((curr) => [curr.column, true])),
    );
    let iCurrColumns = currColumns;
    while (iCurrColumns.length > 0 && !isCancelled.current) {
      const result = (await executeRequestInSync("getDownstreamColumns", {
        targets: iCurrColumns.map((c) => [c.model, c.column]),
        model: currentDocsData?.uniqueId,
        column: iCurrColumns[0].column,
      })) as DownstreamColumns;
      if (!result.column_lineage) {
        break;
      }
      setTableMetadata((prev) => [...prev, ...result.tables]);
      setTestsMetadata((prev) => ({ ...prev, ...result.tests }));
      if (result.column_lineage.length === 0) {
        iCurrColumns = [];
        break;
      }
      const tempColumnLoadingState = Object.fromEntries(
        currColumns.map((curr) => [curr.column, false]),
      );
      const newColumns: DocsItem[] = [];
      for (const item of result.column_lineage) {
        if (item.type === "indirect") continue;
        if (item.viewsType === "Transformation") continue;
        const [model, column] = item.source;
        const sourceColumn = iCurrColumns.find(
          (c) => c.model === model && c.column === column,
        );
        if (!sourceColumn) continue;
        newColumns.push({
          model: item.target[0],
          column: item.target[1],
          description:
            result.tables.find((t) => t.table === item.target[0])?.columns[
              item.target[1]
            ]?.description ?? "",
          root: sourceColumn.root,
        });
        if (sourceColumn.root) tempColumnLoadingState[sourceColumn.root] = true;
      }
      iCurrColumns = newColumns;
      setAllColumns((prev) => mergeDocItems(prev, newColumns));
      setIsColumnLineageLoading(tempColumnLoadingState);
    }
    setIsLoading(false);
    setCurrColumns(iCurrColumns);
  };

  const cancelColumnLineage = async () => {
    isCancelled.current = true;
    await executeRequestInSync("cancelColumnLineage", {});
  };

  const propagateDocumentation = async () => {
    const defaultPackageName = tableMetadata.filter((t) => t.packageName)[0]
      ?.packageName;
    const defaultPatchPath = defaultPackageName
      ? defaultPackageName + "://models/schema.yml"
      : "";

    const req = [];

    for (const item of allColumns) {
      const key = item.model + "/" + item.column;
      if (!selectedColumns[key]) continue;
      const splits = item.model.split(".");
      const modelName = splits[splits.length - 1];
      const node = tableMetadata.find((t) => t.table === item.model);
      const columnDescription =
        currentDocsData?.columns.find((c) => c.name === item.root)
          ?.description ?? "";
      req.push({
        name: modelName,
        description: node?.description,
        columns: [{ name: item.column, description: columnDescription }],
        dialogType: "Existing file",
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        patchPath: node?.patchPath || defaultPatchPath,
        filePath: node?.url,
        updatedTests: testsMetadata[item.model],
      });
    }

    await executeRequestInSync("saveDocumentationBulk", {
      models: req,
      numColumns: startColumns.length,
    });
  };

  const reset = () => {
    setAllColumns([]);
    setCurrColumns(startColumns);
    setTableMetadata([]);
  };
  return {
    isLoading,
    allColumns,
    selectedColumns,
    setSelectedColumns,
    loadMoreDownstreamModels,
    propagateDocumentation,
    cancelColumnLineage,
    reset,
    isColumnLineageLoading,
  };
};

export const BulkDocumentationPropagationPanel = (): JSX.Element | null => {
  const {
    state: { showBulkDocsPropRightPanel, currentDocsData },
    dispatch,
  } = useDocumentationContext();
  const drawerRef = useRef<DrawerRef | null>(null);

  const startColumns =
    currentDocsData?.columns
      .filter((c) => Boolean(c.description))
      .map((c) => ({
        model: currentDocsData.uniqueId,
        column: c.name,
        description: c.description ?? "",
        root: c.name,
      })) ?? [];

  const {
    isLoading,
    allColumns,
    selectedColumns,
    setSelectedColumns,
    loadMoreDownstreamModels,
    propagateDocumentation,
    cancelColumnLineage,
    reset,
  } = useDocumentationPropagation({ startColumns });

  useEffect(() => {
    reset();
  }, [currentDocsData?.uniqueId]);

  useEffect(() => {
    if (!drawerRef.current) return;
    if (showBulkDocsPropRightPanel) {
      void loadMoreDownstreamModels();
      drawerRef.current.open();
    } else {
      drawerRef.current.close();
    }
  }, [showBulkDocsPropRightPanel]);

  const setAllColumnsValue = (value: boolean) => {
    setSelectedColumns(
      Object.fromEntries(
        allColumns.map((curr) => [curr.model + "/" + curr.column, value]),
      ),
    );
  };

  return (
    <Drawer
      ref={drawerRef}
      onClose={() => {
        dispatch(updateBulkDocsPropRightPanel(false));
        void cancelColumnLineage();
      }}
    >
      <Stack direction="column" className="h-100">
        <div className={styles.itemRow}>
          <div>Model:</div>
          <div>{currentDocsData?.name}</div>
        </div>
        <Stack direction="column" className="mb-1 overflow-y">
          {currentDocsData?.columns
            .filter((c) => Boolean(c.description))
            .sort(
              (a, b) =>
                allColumns.filter((item) => item.root === b.name).length -
                allColumns.filter((item) => item.root === a.name).length,
            )
            .map((c) => (
              <SingleColumnCard
                key={c.name}
                setSelectedColumns={setSelectedColumns}
                selectedColumns={selectedColumns}
                columnDescription={c.description ?? ""}
                columnName={c.name}
                isLoading={isLoading}
                downstreamColumns={allColumns.filter(
                  (item) => item.root === c.name,
                )}
              />
            ))}
        </Stack>
        <Stack direction="column" className={styles.propagateContainer}>
          <Stack className="align-items-center">
            <div>Downstream columns:</div>
            <div>{Object.values(allColumns).flat().length}</div>
            {isLoading && <Loader size="small" />}
            <div className="spacer" />
            {isLoading ? (
              <Button
                color="primary"
                outline
                onClick={() => cancelColumnLineage()}
              >
                Cancel
              </Button>
            ) : allColumns.length > 0 ? (
              <Stack>
                <Button
                  color="primary"
                  outline
                  onClick={() => setAllColumnsValue(true)}
                >
                  Select All
                </Button>
                <Button
                  color="primary"
                  outline
                  onClick={() => setAllColumnsValue(false)}
                >
                  Unselect All
                </Button>
              </Stack>
            ) : null}
          </Stack>
          <Button
            color="primary"
            disabled={
              Object.values(selectedColumns).filter((v) => Boolean(v))
                .length === 0 || isLoading
            }
            onClick={async () => {
              await propagateDocumentation();
              drawerRef.current?.close();
            }}
            className="w-100"
          >
            Propagate documentation (
            {Object.values(selectedColumns).filter((v) => Boolean(v)).length})
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export const DocumentationPropagationButton = ({
  name,
  type,
}: Props): JSX.Element | null => {
  const {
    state: { currentDocsData, showBulkDocsPropRightPanel },
    dispatch,
  } = useDocumentationContext();
  const drawerRef = useRef<DrawerRef | null>(null);
  const currColumnDescription =
    currentDocsData?.columns.find((c) => c.name === name)?.description ?? "";
  const startColumns = currentDocsData
    ? [
        {
          model: currentDocsData.uniqueId,
          column: name,
          description: currColumnDescription,
        },
      ]
    : [];
  const {
    isLoading,
    allColumns,
    selectedColumns,
    setSelectedColumns,
    loadMoreDownstreamModels,
    propagateDocumentation,
    cancelColumnLineage,
    reset,
  } = useDocumentationPropagation({ startColumns });

  useEffect(() => {
    reset();
  }, [currentDocsData?.uniqueId, name]);

  useEffect(() => {
    if (!drawerRef.current) return;
    if (showBulkDocsPropRightPanel) {
      void loadMoreDownstreamModels();
      drawerRef.current.open();
    } else {
      drawerRef.current.close();
    }
  }, [showBulkDocsPropRightPanel]);

  if (type !== EntityType.COLUMN) {
    return null;
  }

  if (!currColumnDescription) {
    return null;
  }

  return (
    <Drawer
      buttonProps={{
        color: "primary",
        title: "Propagate documentation",
        "data-testid": `doc_prop_${name}`,
      }}
      buttonText={<PropagateIcon />}
      title="Propagate documentation"
      ref={drawerRef}
      onClose={() => {
        dispatch(updateBulkDocsPropRightPanel(false));
        void cancelColumnLineage();
      }}
    >
      <Stack direction="column" className="h-100">
        <div className={styles.itemRow}>
          <div>Model:</div>
          <div>{currentDocsData?.name}</div>
        </div>
        <SingleColumnCard
          setSelectedColumns={setSelectedColumns}
          selectedColumns={selectedColumns}
          columnDescription={currColumnDescription}
          columnName={name}
          isLoading={isLoading}
          downstreamColumns={allColumns}
        />
        <div className="spacer" />
        <Stack direction="column">
          <Stack className="align-items-center">
            <div>Downstream columns:</div>
            <div>{allColumns.length}</div>
            {isLoading && (
              <Loader size="small" data-testid="docs_prop_loader" />
            )}
            <div className="spacer" />
            {isLoading && (
              <Button
                color="primary"
                outline
                onClick={() => cancelColumnLineage()}
              >
                Cancel
              </Button>
            )}
          </Stack>
          <Button
            color="primary"
            disabled={
              Object.values(selectedColumns).filter((v) => Boolean(v))
                .length === 0 || isLoading
            }
            onClick={async () => {
              await propagateDocumentation();
              drawerRef.current?.close();
            }}
            className="w-100"
          >
            Propagate documentation
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};
