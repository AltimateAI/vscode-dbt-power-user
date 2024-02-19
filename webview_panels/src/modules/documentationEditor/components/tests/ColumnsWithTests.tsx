import { EntityType } from "@modules/dataPilot/components/docGen/types";
import { DBTModelTest } from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Stack } from "@uicore";
import { useMemo } from "react";
import EntityWithTests from "./EntityWithTests";

const ColumnsWithTests = () => {
  const {
    state: { currentDocsTests, currentDocsData },
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

  if (!currentDocsData?.columns.length) {
    return null;
  }
  return (
    <Stack direction="column">
      {currentDocsData.columns.map(({ name }) => (
        <EntityWithTests
          title={name}
          key={name}
          tests={testsPerColumns[name]}
          type={EntityType.COLUMN}
        />
      ))}
    </Stack>
  );
};

export default ColumnsWithTests;
