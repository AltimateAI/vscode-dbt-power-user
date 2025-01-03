import Test from "./Test";
import AddTest from "./AddTest";
import { DBTModelTest } from "@modules/documentationEditor/state/types";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import { Stack, Drawer, DrawerRef, Button } from "@uicore";
import { useMemo, useRef, useState } from "react";
import DisplayTestDetails from "./DisplayTestDetails";
import classes from "../../styles.module.scss";
import { TestsIcon } from "@assets/icons";
import { sendTelemetryEvent } from "../telemetry";
import { TelemetryEvents } from "@telemetryEvents";

interface Props {
  title: string;
  tests?: DBTModelTest[];
  type: EntityType;
}

const MaxVisibleTests = 3;

const EntityWithTests = ({ title, tests, type }: Props): JSX.Element | null => {
  const [selectedTest, setSelectedTest] = useState<DBTModelTest | null>(null);
  const [showAllTests, setshowAllTests] = useState(false);
  const drawerRef = useRef<DrawerRef | null>(null);
  const handleClose = () => {
    setSelectedTest(null);
    drawerRef.current?.close();
  };

  const handleShowAllTests = () => setshowAllTests(true);

  const onSelect = (test: DBTModelTest) => {
    setSelectedTest(test);
    sendTelemetryEvent(
      type === EntityType.MODEL
        ? TelemetryEvents["DocumentationEditor/ModelTestClick"]
        : TelemetryEvents["DocumentationEditor/ColumnTestClick"],
      { entityName: title, testName: test.test_metadata?.name ?? test.key },
    );
    drawerRef.current?.open();
  };

  const currentTests = useMemo(
    () =>
      tests
        ?.map((t) => t.test_metadata?.name)
        .filter((item): item is string => !!item),
    [tests],
  );

  const visibleTests = showAllTests
    ? tests
    : (tests ?? []).slice(0, MaxVisibleTests);
  const remainingTests = (tests ?? []).length - MaxVisibleTests;

  return (
    <div className={classes.entityTests}>
      <Stack className={type}>
        <div className={classes.testsRow}>
          <p className="mb-0 d-inline">
            <TestsIcon /> Tests:
          </p>
          {visibleTests?.map((test) => (
            <Test
              key={test.key}
              test={test}
              onSelect={onSelect}
              selectedTest={selectedTest}
            />
          ))}
          {!showAllTests && tests && tests.length > MaxVisibleTests ? (
            <Button
              outline
              onClick={handleShowAllTests}
              className={classes.showAllTests}
              title={`Show all tests`}
            >
              {remainingTests} {remainingTests > 1 ? "tests" : "test"} +
            </Button>
          ) : null}
          <AddTest title={title} currentTests={currentTests} type={type} />
        </div>
      </Stack>
      <Drawer ref={drawerRef} onClose={handleClose}>
        {selectedTest ? (
          <DisplayTestDetails
            onClose={handleClose}
            test={selectedTest}
            column={title}
            type={type}
          />
        ) : null}
      </Drawer>
    </div>
  );
};

export default EntityWithTests;
