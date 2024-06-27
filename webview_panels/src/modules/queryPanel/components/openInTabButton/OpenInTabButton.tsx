import { executeRequestInAsync } from "@modules/app/requestExecutor";
import NewFeatureIndicator from "@modules/newFeature/NewFeatureIndicator";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { Button } from "@uicore";
import { useState } from "react";

const OpenInTabButton = (): JSX.Element | null => {
  const queryTabData = useQueryPanelState();
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
    executeRequestInAsync("queryResultTab:render", { queryTabData });
  };
  if (!queryTabData?.queryResults) {
    return null;
  }
  return (
    <Button outline onClick={handleClick} className="position-relative">
      Open in Tab
      {!isClicked ? (
        <NewFeatureIndicator featureKey="open-query-results-in-tab-clicked" />
      ) : null}
    </Button>
  );
};

export default OpenInTabButton;
