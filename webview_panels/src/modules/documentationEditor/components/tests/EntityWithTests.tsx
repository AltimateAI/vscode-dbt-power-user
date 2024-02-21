import Test from "./Test";
import AddTest from "./AddTest";
import { DBTModelTest } from "@modules/documentationEditor/state/types";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import { Stack } from "@uicore";
import { useState } from "react";
import DisplayTestDetails from "./DisplayTestDetails";

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

  const getCurrentTests = () =>
    tests
      ?.map((t) => t.test_metadata?.name)
      .filter((item): item is string => !!item);
  return (
    <div>
      <h5>
        {title}
        {type === EntityType.COLUMN ? (
          <AddTest title={title} currentTests={getCurrentTests()} />
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
