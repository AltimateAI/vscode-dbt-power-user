import { DBTModelTest } from "@modules/documentationEditor/state/types";
import { Tag, Tooltip } from "@uicore";
import classes from "../../styles.module.scss";

interface Props {
  test: DBTModelTest;
  onSelect: (test: DBTModelTest) => void;
  selectedTest: DBTModelTest | null;
}

const Test = ({ test, onSelect, selectedTest }: Props): JSX.Element => {
  const handleClick = () => {
    onSelect(test);
  };

  return (
    <Tooltip
      title={"Click to view details"}
      id={`tooltip-${test.column_name ?? ""}-${test.test_metadata?.name ?? ""}`}
    >
      <Tag
        color={selectedTest?.key === test.key ? "primary" : ""}
        key={test.key}
        onClick={handleClick}
        className={classes.testTag}
      >
        {test.test_metadata?.name ?? test.key}
      </Tag>
    </Tooltip>
  );
};

export default Test;
