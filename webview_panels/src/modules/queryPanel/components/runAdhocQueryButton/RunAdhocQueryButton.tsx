import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { Button } from "@uicore";

const RunAdhocQueryButton = (): JSX.Element => {
  const handleClick = () => {
    executeRequestInAsync("runAdhocQuery", {});
  };
  return (
    <Button outline onClick={handleClick}>
      Run adhoc query
    </Button>
  );
};

export default RunAdhocQueryButton;
