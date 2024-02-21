import {
  DBTModelTest,
  DbtGenericTests,
} from "@modules/documentationEditor/state/types";
import { Tag, Tooltip } from "@uicore";
import classes from "../../styles.module.scss";

interface Props {
  test: DBTModelTest;
  onSelect: (test: DBTModelTest) => void;
}

const Test = ({ test, onSelect }: Props): JSX.Element => {
  const isEditableTest =
    test.test_metadata?.name !== DbtGenericTests.NOT_NULL &&
    test.test_metadata?.name !== DbtGenericTests.UNIQUE;

  const handleClick = () => {
    if (isEditableTest) {
      onSelect(test);
    }
  };

  return (
    <Tooltip title={isEditableTest ? "Click to view details" : ""}>
      <Tag
        color="primary"
        key={test.key}
        onClick={handleClick}
        className={classes.testTag}
      >
        {test.key}
      </Tag>
    </Tooltip>
  );
};

export default Test;
