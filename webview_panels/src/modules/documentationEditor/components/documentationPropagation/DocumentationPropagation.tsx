import { PropagateIcon } from "@assets/icons";
import { useEffect, useRef, useState } from "react";
import { Drawer, Stack, DrawerRef, Button, Input } from "@uicore";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { ColumnLineage } from "@altimate-components/web/lineage";
import styles from "./styles.module.scss";

interface Props {
  name: string;
  type: EntityType;
}

interface DocsItem {
  model: string;
  column: string;
  description: string;
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

export const DocumentationPropagationButton = ({
  name,
  type,
}: Props): JSX.Element | null => {
  const {
    state: { currentDocsData },
  } = useDocumentationContext();
  const drawerRef = useRef<DrawerRef | null>(null);
  const currColumnDescription =
    currentDocsData?.columns.find((c) => c.name === name)?.description ?? "";
  const startColumn = currentDocsData
    ? [
        {
          model: currentDocsData.uniqueId,
          column: name,
          description: currColumnDescription,
        },
      ]
    : [];
  const [allColumns, setAllColumns] = useState<DocsItem[]>([]);
  const [currColumns, setCurrColumns] = useState<DocsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [tableMetadata, setTableMetadata] = useState<TableMetadata[]>([]);
  const [testsMetadata, setTestsMetadata] = useState<Record<string, unknown>>(
    {},
  );
  const [selectedColumns, setSelectedColumns] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    setAllColumns([]);
    setCurrColumns(startColumn);
    setTableMetadata([]);
    setIsSaved(false);
  }, [currentDocsData?.uniqueId, name]);

  const loadMoreDownstreamModels = async () => {
    executeRequestInAsync("columnLineageBase", { event: "start" });
    setIsLoading(true);
    let i = 0;
    const iAllColumns = [...allColumns];
    let iCurrColumns = currColumns;
    while (i++ < 3) {
      if (iCurrColumns.length === 0) {
        break;
      }
      const result = (await executeRequestInSync("getDownstreamColumns", {
        targets: iCurrColumns.map((c) => [c.model, c.column]),
        model: currentDocsData?.uniqueId,
        column: name,
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
      const newColumns: DocsItem[] = [];
      for (const item of result.column_lineage) {
        if (item.type === "indirect") continue;
        if (item.viewsType === "Transformation") continue;
        if (
          iCurrColumns.find(
            (c) => c.model === item.source[0] && c.column === item.source[1],
          )
        ) {
          newColumns.push({
            model: item.target[0],
            column: item.target[1],
            description:
              result.tables.find((t) => t.table === item.target[0])?.columns[
                item.target[1]
              ]?.description ?? "",
          });
        }
      }
      iCurrColumns = newColumns;
      iAllColumns.push(...newColumns);
    }
    executeRequestInAsync("columnLineageBase", { event: "end" });
    const finalAllColumns: DocsItem[] = [];
    for (const c of iAllColumns) {
      if (
        finalAllColumns.find(
          (_c) => _c.model === c.model && _c.column === c.column,
        )
      ) {
        continue;
      }
      finalAllColumns.push(c);
    }
    setIsLoading(false);
    setAllColumns(finalAllColumns);
    setCurrColumns(iCurrColumns);
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
      req.push({
        name: modelName,
        description: node?.description,
        columns: [{ name: item.column, description: currColumnDescription }],
        dialogType: "Existing file",
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        patchPath: node?.patchPath || defaultPatchPath,
        filePath: node?.url,
        updatedTests: testsMetadata[item.model],
      });
    }

    await executeRequestInSync("saveDocumentationBulk", { models: req });
    setIsSaved(true);
  };

  const setAllColumnsValue = (value: boolean) => {
    setSelectedColumns(
      allColumns.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.model + "/" + curr.column]: value,
        }),
        {},
      ),
    );
  };

  if (type !== EntityType.COLUMN) {
    return null;
  }

  if (!currColumnDescription) {
    return null;
  }

  return (
    <Drawer
      buttonProps={{ color: "primary", title: "Propagate documentation" }}
      buttonText={<PropagateIcon />}
      title="Propagate documentation"
      ref={drawerRef}
      onOpen={() => loadMoreDownstreamModels()}
    >
      <Stack direction="column" className="gap-0 mb-2">
        <div className={styles.itemRow}>
          <div>Model:</div>
          <div>{currentDocsData?.name}</div>
        </div>
        <div className={styles.itemRow}>
          <div>Column:</div>
          <div>{name}</div>
        </div>
        {currColumnDescription && (
          <div className={styles.colDesc}>
            <div>Description:</div>
            <div>{currColumnDescription}</div>
          </div>
        )}
      </Stack>
      {!isLoading && allColumns.length === 0 ? (
        <div className="mt-4">
          No downstream column level lineage detected to propagate the
          documentation
        </div>
      ) : (
        <>
          <Stack className="mb-2">
            <Button color="primary" onClick={() => setAllColumnsValue(true)}>
              Select All
            </Button>
            <Button color="primary" onClick={() => setAllColumnsValue(false)}>
              Unselect All
            </Button>
          </Stack>
          <Stack direction="column" className="gap-md">
            {allColumns.map((item) => {
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
                    <div className={styles.itemRow}>
                      <div>Description:</div>
                      <div>{item.description}</div>
                    </div>
                  </Stack>
                </Stack>
              );
            })}
            {currColumns.length > 0 && (
              <Button
                color="primary"
                outline
                onClick={loadMoreDownstreamModels}
                disabled={isLoading}
              >
                Load 3 more downstream levels
              </Button>
            )}
            <Button
              color="primary"
              disabled={
                Object.values(selectedColumns).filter((v) => Boolean(v))
                  .length === 0
              }
              onClick={() => propagateDocumentation()}
            >
              Propagate documentation to selected models
            </Button>
            {isSaved && <div>Saved documentation successfully</div>}
          </Stack>
        </>
      )}
    </Drawer>
  );
};
