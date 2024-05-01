import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { Button } from "@uicore";

const ShowOldUxButton = (): JSX.Element => {
  const handleClick = () => {
    executeRequestInAsync("updateConfig", { enableQueryPanelV2: false });
  };
  return (
    <Button outline onClick={handleClick}>
      Show old UX
    </Button>
  );
};

export default ShowOldUxButton;
