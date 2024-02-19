import { executeRequestInAsync } from "@modules/app/requestExecutor";
import CommonActionButtons from "@modules/commonActionButtons/CommonActionButtons";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import { Stack } from "@uicore";
import { useEffect, useMemo } from "react";
import SyncWithDatabase from "./components/docGenerator/SyncWithDatabase";
import ColumnsWithTests from "./components/tests/ColumnsWithTests";
import EntityWithTests from "./components/tests/EntityWithTests";
import useDocumentationContext from "./state/useDocumentationContext";
import classes from "./styles.module.scss";

const DocumentationTests = () => {
  const {
    state: { currentDocsData, currentDocsTests },
  } = useDocumentationContext();

  useEffect(() => {
    executeRequestInAsync("getCurrentModelTests", {});
  }, []);

  const modelTests = useMemo(() => {
    return currentDocsTests?.filter((test) => !test.column_name);
  }, [currentDocsTests]);
  if (!currentDocsTests) {
    return <div>Unable to find tests for the selected model</div>;
  }

  return (
    <div className={classes.docGenerator}>
      <Stack className={classes.head}>
        <Stack>
          <h3>Tests for {currentDocsData?.name}</h3>
        </Stack>
        <CommonActionButtons />
      </Stack>
      <EntityWithTests
        title="Model"
        tests={modelTests}
        type={EntityType.MODEL}
      />
      <Stack className={classes.columnHeader}>
        <h3>Columns</h3>
        <div>
          <SyncWithDatabase />
        </div>
      </Stack>
      <ColumnsWithTests />
    </div>
  );
};

export default DocumentationTests;
