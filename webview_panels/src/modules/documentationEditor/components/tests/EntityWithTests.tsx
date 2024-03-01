import Test from "./Test";
import AddTest from "./AddTest";
import { DBTModelTest } from "@modules/documentationEditor/state/types";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import { Stack, Drawer, DrawerRef } from "@uicore";
import { useMemo, useRef, useState } from "react";
import DisplayTestDetails from "./DisplayTestDetails";
import classes from "../../styles.module.scss";

interface Props {
  title: string;
  tests?: DBTModelTest[];
  type: EntityType;
}

const EntityWithTests = ({ title, tests, type }: Props): JSX.Element => {
  const [selectedTest, setSelectedTest] = useState<DBTModelTest | null>(null);
  const drawerRef = useRef<DrawerRef | null>(null);
  const handleClose = () => {
    setSelectedTest(null);
    drawerRef.current?.close();
  };

  const onSelect = (test: DBTModelTest) => {
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

  return (
    <div className={classes.entityTests}>
      <Stack className={type}>
        <h5>
          {title}
          {type === EntityType.COLUMN ? (
            <AddTest title={title} currentTests={currentTests} />
          ) : null}
        </h5>
        <Stack>
          <p>Tests:</p>
          {tests?.map((test) => (
            <Test key={test.key} test={test} onSelect={onSelect} />
          ))}
        </Stack>
      </Stack>
      <Drawer ref={drawerRef}>
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
