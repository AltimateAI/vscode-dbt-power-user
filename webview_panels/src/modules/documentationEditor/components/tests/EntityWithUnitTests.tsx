import { AddIcon } from "@assets/icons";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { EntityType } from "@modules/documentationEditor/state/entityType";
import { DBTUnitTest } from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { TelemetryEvents } from "@telemetryEvents";
import { Button, Drawer, DrawerRef, IconButton, Stack } from "@uicore";
import { useRef, useState } from "react";
import classes from "../../styles.module.scss";
import { sendTelemetryEvent } from "../telemetry";
import UnitTestDetails from "./UnitTestDetails";

interface Props {
  title: string;
  unitTests?: DBTUnitTest[];
}

const MaxVisibleUnitTests = 3;

const EntityWithUnitTests = ({ title, unitTests }: Props): JSX.Element => {
  const {
    state: { currentDocsData },
  } = useDocumentationContext();
  const [showAllTests, setShowAllTests] = useState(false);
  const [selectedTest, setSelectedTest] = useState<DBTUnitTest | null>(null);
  const drawerRef = useRef<DrawerRef | null>(null);

  const handleClose = () => {
    setSelectedTest(null);
    drawerRef.current?.close();
  };

  const onSelect = (test: DBTUnitTest) => {
    setSelectedTest(test);
    drawerRef.current?.open();
  };

  const visibleTests = showAllTests
    ? unitTests
    : (unitTests ?? []).slice(0, MaxVisibleUnitTests);
  const remainingTests = (unitTests ?? []).length - MaxVisibleUnitTests;

  const handleGenerateClick = () => {
    sendTelemetryEvent(
      TelemetryEvents["DocumentationEditor/UnitTestGenerateClick"],
      { entityName: title },
    );
    const model = currentDocsData?.name ?? title;
    executeRequestInAsync("openAltimateCodeChatForUnitTest", {
      model,
      initialMessage: `I want to add dbt unit tests for model "${model}". Refer to the model's existing data tests and SQL logic to propose appropriate unit tests.`,
      title: `Add Unit Tests for model: ${model}`,
    });
  };

  return (
    <>
      <div className={classes.entityTests}>
        <Stack className={EntityType.MODEL}>
          <div className={classes.testsRow}>
            <p className="mb-0 d-inline">Unit Tests:</p>
            {visibleTests?.map((test) => (
              <button
                key={test.name}
                className={`badge ${classes.newTestTag}`}
                onClick={() => onSelect(test)}
                style={{ cursor: "pointer" }}
              >
                {test.name}
              </button>
            ))}
            {!showAllTests &&
            unitTests &&
            unitTests.length > MaxVisibleUnitTests ? (
              <Button
                outline
                onClick={() => setShowAllTests(true)}
                className={classes.showAllTests}
                title="Show all unit tests"
              >
                {remainingTests} {remainingTests > 1 ? "tests" : "test"} +
              </Button>
            ) : null}
            <IconButton
              onClick={handleGenerateClick}
              color="secondary"
              className={classes.btnAddTest}
              title={`Generate unit tests for ${title}`}
            >
              <AddIcon />
            </IconButton>
          </div>
        </Stack>
      </div>
      <Drawer ref={drawerRef} onClose={handleClose}>
        {selectedTest ? (
          <UnitTestDetails
            test={selectedTest}
            modelName={currentDocsData?.name ?? title}
          />
        ) : null}
      </Drawer>
    </>
  );
};

export default EntityWithUnitTests;
