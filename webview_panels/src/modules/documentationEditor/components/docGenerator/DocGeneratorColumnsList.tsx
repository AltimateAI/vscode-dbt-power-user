import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Alert, Stack } from "@uicore";
import DocGeneratorColumn from "./DocGeneratorColumn";
import classes from "../../styles.module.scss";
import BulkGenerateButton from "./BulkGenerateButton";
import SyncWithDatabase from "./SyncWithDatabase";
import { useMemo } from "react";
import { DBTModelTest } from "@modules/documentationEditor/state/types";

const DocGeneratorColumnsList = (): JSX.Element => {
  const {
    state: { currentDocsData, currentDocsTests },
  } = useDocumentationContext();

  const testsPerColumns = useMemo(() => {
    return (
      currentDocsTests?.reduce(
        (acc: Record<string, DBTModelTest[]>, columnTest) => {
          if (!columnTest.column_name) {
            return acc;
          }
          acc[columnTest.column_name] = acc[columnTest.column_name] ?? [];
          return {
            ...acc,
            [columnTest.column_name]: [
              ...acc[columnTest.column_name],
              columnTest,
            ],
          };
        },
        {},
      ) ?? {}
    );
  }, [currentDocsTests]);

  return (
    <div>
      <div style={{ marginBottom: 40, marginTop: 16 }}>
        <Stack className={classes.columnHeader}>
          <h3>Columns</h3>
          <div>
            <SyncWithDatabase />
          </div>
          <BulkGenerateButton />
        </Stack>
        <Alert color="warning">
          Note: If you don’t want to override existing documentation, please
          (re)generate documentation at the individual column level below
        </Alert>
      </div>
      {!currentDocsData?.columns ? (
        <Stack>
          No columns found in the dbt manifest for {currentDocsData?.name}.
        </Stack>
      ) : null}
      <Stack direction="column" className={classes.columns}>
        {currentDocsData?.columns.map((column) => (
          <DocGeneratorColumn
            key={column.name}
            column={column}
            tests={testsPerColumns[column.name]}
          />
        ))}
      </Stack>
    </div>
  );
};

export default DocGeneratorColumnsList;
