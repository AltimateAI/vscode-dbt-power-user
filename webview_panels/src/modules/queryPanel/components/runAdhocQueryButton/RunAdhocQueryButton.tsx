import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { Button } from "@uicore";

const RunAdhocQueryButton = (): JSX.Element => {
  const handleClick = () => {
    executeRequestInAsync("runAdhocQuery", {});
  };
  return (
    <Button
      aria-label="open-adhoc-query"
      outline
      onClick={handleClick}
      title="New query"
    >
      +Q
    </Button>
  );
};

export default RunAdhocQueryButton;
