import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Alert, Stack } from "@uicore";
import DocGeneratorColumn from "./DocGeneratorColumn";
import classes from "../../styles.module.scss";
import BulkGenerateButton from "./BulkGenerateButton";
import SyncWithDatabase from "./SyncWithDatabase";
import { useMemo } from "react";
import { DBTModelTest, Pages } from "@modules/documentationEditor/state/types";

const DocGeneratorColumnsList = (): JSX.Element => {
  const {
    state: { currentDocsData, currentDocsTests, selectedPages },
  } = useDocumentationContext();
  const isDocumentationPageSelected = useMemo(
    () => selectedPages.includes(Pages.DOCUMENTATION),
    [selectedPages],
  );

  const testsPerColumns = useMemo(() => {
    return (
      currentDocsTests?.reduce(
        (acc: Record<string, DBTModelTest[]>, columnTest) => {
          const columnNameInLowerCase = columnTest.column_name?.toLowerCase();
          if (!columnNameInLowerCase) {
            return acc;
          }
          acc[columnNameInLowerCase] = acc[columnNameInLowerCase] ?? [];
          return {
            ...acc,
            [columnNameInLowerCase]: [
              ...acc[columnNameInLowerCase],
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
      <div style={{ marginBottom: 40 }}>
        <Stack className={classes.columnHeader}>
          <Stack>
            <h3>Columns</h3>
            <SyncWithDatabase />
          </Stack>
          {isDocumentationPageSelected ? <BulkGenerateButton /> : null}
        </Stack>
        {isDocumentationPageSelected ? (
          <Alert color="warning">
            Note: If you don’t want to override existing documentation, please
            (re)generate documentation at the individual column level below
          </Alert>
        ) : null}
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
            tests={testsPerColumns[column.name.toLowerCase()]}
          />
        ))}
      </Stack>
    </div>
  );
};

export default DocGeneratorColumnsList;
