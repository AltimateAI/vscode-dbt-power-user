import { executeRequestInAsync } from "@modules/app/requestExecutor";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { Button } from "@uicore";

const OpenInTabButton = (): JSX.Element | null => {
  const queryTabData = useQueryPanelState();
  const handleClick = () => {
    executeRequestInAsync("queryResultTab:render", { queryTabData });
  };
  if (!queryTabData?.queryResults) {
    return null;
  }
  return (
    <Button outline onClick={handleClick}>
      Open in Tab
    </Button>
  );
};

export default OpenInTabButton;
