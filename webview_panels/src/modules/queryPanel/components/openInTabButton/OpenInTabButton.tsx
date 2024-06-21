import { executeRequestInAsync } from "@modules/app/requestExecutor";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { GradientButton } from "@uicore";

const OpenInTabButton = (): JSX.Element | null => {
  const queryTabData = useQueryPanelState();
  const handleClick = () => {
    executeRequestInAsync("queryResultTab:render", { queryTabData });
  };
  if (!queryTabData?.queryResults) {
    return null;
  }
  return (
    <GradientButton outline onClick={handleClick}>
      Open in Tab
    </GradientButton>
  );
};

export default OpenInTabButton;
