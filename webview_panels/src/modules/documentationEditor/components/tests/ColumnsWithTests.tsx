import { EntityType } from "@modules/dataPilot/components/docGen/types";
import { DBTModelTest } from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Stack } from "@uicore";
import { useMemo } from "react";
import EntityWithTests from "./EntityWithTests";

const ColumnsWithTests = () => {
  const {
    state: { currentDocsTests },
  } = useDocumentationContext();

  const testsPerColumns = useMemo(() => {
    return currentDocsTests?.reduce(
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
    );
  }, [currentDocsTests]);

  if (!testsPerColumns) {
    return null;
  }
  return (
    <Stack direction="column">
      {Object.entries(testsPerColumns)?.map(([columnName, tests]) => (
        <EntityWithTests
          title={columnName}
          key={columnName}
          tests={tests}
          type={EntityType.COLUMN}
        />
      ))}
    </Stack>
  );
};

export default ColumnsWithTests;
