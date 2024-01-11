import { RefreshIcon } from "@assets/icons";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { updateColumnsInCurrentDocsData } from "@modules/documentationEditor/state/documentationSlice";
import {
  DBTDocumentationColumn,
  DocsGenerateModelRequestV2,
} from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { panelLogger } from "@modules/logger";
import { Alert, Button, Stack } from "@uicore";
import { useEffect, useRef, useState } from "react";
import DocGeneratorColumn from "./DocGeneratorColumn";
import GenerateAllButton from "./GenerateAllButton";
import classes from "../../styles.module.scss";

const DocGeneratorColumnsList = (): JSX.Element => {
  const {
    state: { currentDocsData },
    dispatch,
  } = useDocumentationContext();

  const [, setForceUpdate] = useState(Date.now());
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      setForceUpdate(Date.now());
    }
  }, []);

  const chunk = (a: string[], n: number) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    [...Array(Math.ceil(a.length / n))].map((_, i) =>
      a.slice(n * i, n + n * i),
    );

  const handleSubmit = async (data: DocsGenerateModelRequestV2) => {
    if (!data.columns?.length) {
      return;
    }

    const chunks = chunk(data.columns, 2);
    const result = await Promise.all(
      chunks.map((columns) =>
        executeRequestInSync("generateDocsForColumn", {
          description: data.description,
          user_instructions: data.user_instructions,
          columnNames: columns,
          columns: currentDocsData?.columns,
        }),
      ),
    );

    // convert 2 dim array to 1d with columns
    const allColumnsData = (
      result as { columns: Partial<DBTDocumentationColumn>[] }[]
    )
      .map((d) => d.columns)
      .flat();

    dispatch(updateColumnsInCurrentDocsData({ columns: allColumnsData }));
  };

  const onSyncBtnClick = () => {
    executeRequestInSync("fetchMetadataFromDatabase", {}).catch((err) =>
      panelLogger.error("error while syncing with db", err),
    );
  };

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        <div ref={ref}>
          <Stack className={classes.columnHeader}>
            <h1>Columns</h1>
            <Button color="warning" onClick={onSyncBtnClick}>
              <RefreshIcon /> Sync with the Database
            </Button>
            {ref.current ? (
              <GenerateAllButton
                showColumns
                onSubmit={handleSubmit}
                container={ref.current}
                buttonText="Generate all"
              />
            ) : null}
          </Stack>
        </div>
        <Alert color="warning">
          Note: If you need to override existing documentation, please
          (re)generate documentation at individual column level
        </Alert>
      </div>
      <Stack direction="column" style={{ gap: 24 }}>
        {currentDocsData?.columns.map((column) => (
          <DocGeneratorColumn key={column.name} column={column} />
        ))}
      </Stack>
    </div>
  );
};

export default DocGeneratorColumnsList;
