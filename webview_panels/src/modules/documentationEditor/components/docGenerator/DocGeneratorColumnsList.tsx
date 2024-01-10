import { RefreshIcon } from "@assets/icons";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { updateColumnsInCurrentDocsData } from "@modules/documentationEditor/state/documentationSlice";
import {
  DBTDocumentationColumn,
  DocsGenerateModelRequestV2,
} from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Alert, Button, Stack } from "@uicore";
import { useEffect, useRef, useState } from "react";
import DocGeneratorColumn from "./DocGeneratorColumn";
import GenerateAllButton from "./GenerateAllButton";

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

  const handleSubmit = async (data: DocsGenerateModelRequestV2) => {
    if (!data.columns?.length) {
      return;
    }

    const result = await executeRequestInSync("generateDocsForColumn", {
      description: data.description,
      user_instructions: data.user_instructions,
      columnNames: data.columns,
      columns: currentDocsData?.columns,
    });

    dispatch(
      updateColumnsInCurrentDocsData(
        result as { columns: Partial<DBTDocumentationColumn>[] },
      ),
    );
  };
  return (
    <div>
      <div ref={ref}>
        <Stack>
          <h1>Columns</h1>
          <Button color="warning">
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
      <Stack direction="column">
        {currentDocsData?.columns.map((column) => (
          <DocGeneratorColumn key={column.name} column={column} />
        ))}
      </Stack>
    </div>
  );
};

export default DocGeneratorColumnsList;
