import { DBTModelTest } from "@modules/documentationEditor/state/types";
import { Tag, Tooltip } from "@uicore";

interface Props {
  test: DBTModelTest;
  onSelect: (test: DBTModelTest) => void;
  selectedTest: DBTModelTest | null;
  className?: string;
}

const Test = ({
  test,
  onSelect,
  selectedTest,
  className,
}: Props): JSX.Element => {
  const handleClick = () => {
    onSelect(test);
  };

  return (
    <Tooltip
      title={"Click to view details"}
      id={`tooltip-${test.column_name ?? ""}-${test.test_metadata?.name ?? ""}`}
    >
      <Tag
        color={selectedTest?.key === test.key ? "primary" : "default"}
        key={test.key}
        onClick={handleClick}
        className={className}
      >
        {test.test_metadata?.name ?? test.key}
      </Tag>
    </Tooltip>
  );
};

export default Test;
