import {
  DBTModelTest,
  DbtGenericTests,
} from "@modules/documentationEditor/state/types";
import { Tag } from "@uicore";

interface Props {
  test: DBTModelTest;
  onSelect: (test: DBTModelTest) => void;
}

const Test = ({ test, onSelect }: Props): JSX.Element => {
  const handleClick = () => {
    if (
      test.test_metadata?.name !== DbtGenericTests.NOT_NULL &&
      test.test_metadata?.name !== DbtGenericTests.UNIQUE
    ) {
      onSelect(test);
    }

    if (!test.column_name) {
      // singular test for model
    }

    if (!test.test_metadata?.name) {
      return;
    }

    const testName = test.test_metadata.name;

    if (!Object.values(DbtGenericTests).includes(testName as DbtGenericTests)) {
      // macro test
    }

    if ((testName as DbtGenericTests) === DbtGenericTests.ACCEPTED_VALUES) {
      // accepted value test
    }

    if ((testName as DbtGenericTests) === DbtGenericTests.RELATIONSHIPS) {
      // relationship test
    }
  };

  return (
    <Tag color="primary" key={test.key} onClick={handleClick}>
      {test.key}
    </Tag>
  );
};

export default Test;
