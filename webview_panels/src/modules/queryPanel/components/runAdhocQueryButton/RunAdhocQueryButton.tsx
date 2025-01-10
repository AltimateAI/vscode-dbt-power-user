import { AddIcon } from "@assets/icons";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { Button } from "@uicore";

const RunAdhocQueryButton = ({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element => {
  const handleClick = () => {
    onClose();
    executeRequestInAsync("runAdhocQuery", {});
  };
  return (
    <Button
      className="w-100"
      outline
      onClick={handleClick}
      icon={<AddIcon />}
      showTextAlways
    >
      New query
    </Button>
  );
};

export default RunAdhocQueryButton;
