import { AddIcon } from "@assets/icons";
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
      icon={<AddIcon />}
    >
      New query
    </Button>
  );
};

export default RunAdhocQueryButton;
