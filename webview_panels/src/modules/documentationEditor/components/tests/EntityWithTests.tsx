import Test from "./Test";
import AddTest from "./AddTest";
import { DBTModelTest } from "@modules/documentationEditor/state/types";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import { Stack } from "@uicore";
import { useMemo, useState } from "react";
import DisplayTestDetails from "./DisplayTestDetails";
import classes from "../../styles.module.scss";

interface Props {
  title: string;
  tests?: DBTModelTest[];
  type: EntityType;
}

const EntityWithTests = ({ title, tests, type }: Props): JSX.Element => {
  const [selectedTest, setSelectedTest] = useState<DBTModelTest | null>(null);

  const handleClose = () => {
    setSelectedTest(null);
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
      <h5>
        {title}
        {type === EntityType.COLUMN ? (
          <AddTest title={title} currentTests={currentTests} />
        ) : null}
      </h5>
      <Stack>
        <p>Tests:</p>
        {tests?.map((test) => (
          <Test key={test.key} test={test} onSelect={setSelectedTest} />
        ))}
      </Stack>
      {selectedTest ? (
        <DisplayTestDetails
          onClose={handleClose}
          test={selectedTest}
          column={title}
        />
      ) : null}
    </div>
  );
};

export default EntityWithTests;
