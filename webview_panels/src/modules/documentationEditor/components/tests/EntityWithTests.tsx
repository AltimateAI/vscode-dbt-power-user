import Test from "./Test";
import AddTest from "./AddTest";
import { DBTModelTest, Pages } from "@modules/documentationEditor/state/types";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import { Stack, Drawer, DrawerRef, Button } from "@uicore";
import { useMemo, useRef, useState } from "react";
import DisplayTestDetails from "./DisplayTestDetails";
import classes from "../../styles.module.scss";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { TestsIcon } from "@assets/icons";
import { executeRequestInAsync } from "@modules/app/requestExecutor";

interface Props {
  title: string;
  tests?: DBTModelTest[];
  type: EntityType;
}

const MaxVisibleTests = 3;

const EntityWithTests = ({ title, tests, type }: Props): JSX.Element | null => {
  const {
    state: { selectedPages, currentDocsData },
  } = useDocumentationContext();
  const [selectedTest, setSelectedTest] = useState<DBTModelTest | null>(null);
  const [showAllTests, setshowAllTests] = useState(false);
  const drawerRef = useRef<DrawerRef | null>(null);
  const handleClose = () => {
    setSelectedTest(null);
    drawerRef.current?.close();
  };

  const handleShowAllTests = () => setshowAllTests(true);

  const onSelect = (test: DBTModelTest) => {
    executeRequestInAsync("sendTelemetryEvent", {
      eventName: `showTestDetails`,
      properties: {
        column: EntityType.COLUMN === type ? title : undefined,
        model: currentDocsData?.name,
      },
    });
    setSelectedTest(test);
    drawerRef.current?.open();
  };

  const currentTests = useMemo(
    () =>
      tests
        ?.map((t) => t.test_metadata?.name)
        .filter((item): item is string => !!item),
    [tests],
  );
  const isTestEnabled = useMemo(
    () => selectedPages.includes(Pages.TESTS),
    [selectedPages],
  );

  const visibleTests = showAllTests
    ? tests
    : (tests ?? []).slice(0, MaxVisibleTests);
  const remainingTests = (tests ?? []).length - MaxVisibleTests;

  if (!isTestEnabled || (type === EntityType.MODEL && !tests?.length)) {
    return null;
  }
  return (
    <div className={classes.entityTests}>
      <Stack className={type}>
        <Stack>
          <p className="mb-0">
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
          {type === EntityType.COLUMN ? (
            <AddTest title={title} currentTests={currentTests} />
          ) : null}
        </Stack>
      </Stack>
      <Drawer ref={drawerRef} onClose={handleClose}>
        {selectedTest ? (
          <DisplayTestDetails
            onClose={handleClose}
            test={selectedTest}
            column={title}
          />
        ) : null}
      </Drawer>
    </div>
  );
};

export default EntityWithTests;
