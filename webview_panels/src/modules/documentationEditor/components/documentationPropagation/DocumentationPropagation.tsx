import { CommentIcon } from "@assets/icons";
import { useRef, useState } from "react";
import { Drawer, Stack, DrawerRef, Button, Input } from "@uicore";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { ColumnLineage } from "@lib";
import { panelLogger } from "@modules/logger";

interface Props {
  name: string;
  type: EntityType;
}

interface DocsItem {
  model: string;
  column: string;
  description: string;
}

export const DocumentationPropagationButton = ({
  name,
  type,
}: Props): JSX.Element | null => {
  const {
    state: { currentDocsData },
  } = useDocumentationContext();
  const drawerRef = useRef<DrawerRef | null>(null);
  const startColumn = currentDocsData
    ? [
        {
          model: currentDocsData.uniqueId,
          column: name,
          description:
            currentDocsData.columns?.find((c) => c.name === name)
              ?.description ?? "",
        },
      ]
    : [];
  const [allColumns, setAllColumns] = useState<DocsItem[]>(startColumn);
  const [currColumns, setCurrColumns] = useState<DocsItem[]>(startColumn);
  const [selectedColumns, setSelectedColumns] = useState<
    Record<string, boolean>
  >({});

  const loadMoreDownstreamModels = async () => {
    executeRequestInAsync("columnLineageBase", { event: "start" });
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
      })) as {
        column_lineage: ColumnLineage[];
        tables: {
          table: string;
          columns: Record<
            string,
            { name: string; description: string; data_type: string }
          >;
        }[];
      };
      const newColumns: DocsItem[] = [];
      for (const item of result.column_lineage) {
        if (item.type === "indirect") continue;
        // if (item.viewsType !== "Unchanged") continue;
        if (
          iCurrColumns.find(
            (c) => c.model === item.target[0] && c.column === item.target[1],
          )
        ) {
          newColumns.push({
            model: item.source[0],
            column: item.source[1],
            description:
              result.tables.find((t) => t.table === item.source[0])?.columns[
                item.source[1]
              ]?.description ?? "",
          });
        }
      }
      iCurrColumns = newColumns;
      iAllColumns.push(...newColumns);
      panelLogger.log("thisisit", iCurrColumns, iAllColumns);
    }
    executeRequestInAsync("columnLineageBase", { event: "end" });
    setAllColumns(iAllColumns);
    setCurrColumns(iCurrColumns);
  };

  if (type !== EntityType.COLUMN) {
    return null;
  }

  return (
    <Drawer
      buttonProps={{ color: "primary", title: "Propagate documentation" }}
      buttonText={<CommentIcon />}
      title="Propagate documentation"
      ref={drawerRef}
    >
      <Stack direction="column" className="gap-md">
        {allColumns.map((item) => {
          const key = item.model + "/" + item.column;
          return (
            <Stack key={key}>
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
              <Stack direction="column" className="gap-0">
                <Stack>
                  <div>{item.model}</div>
                  <div>{item.column}</div>
                </Stack>
                <div>{item.description}</div>
              </Stack>
            </Stack>
          );
        })}
        <Button color="primary" onClick={loadMoreDownstreamModels}>
          Load 3 more downstream models
        </Button>
        <Button color="primary">
          Propagate documentation to selected models
        </Button>
      </Stack>
    </Drawer>
  );
};
