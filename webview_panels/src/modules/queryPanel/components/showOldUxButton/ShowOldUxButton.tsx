import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { Button } from "@uicore";

const ShowOldUxButton = (): JSX.Element => {
  const handleClick = () => {
    executeRequestInAsync("updateConfig", { enableQueryPanelV2: false });
  };
  return (
    <Button outline onClick={handleClick}>
      Switch to legacy UI
    </Button>
  );
};

export default ShowOldUxButton;
