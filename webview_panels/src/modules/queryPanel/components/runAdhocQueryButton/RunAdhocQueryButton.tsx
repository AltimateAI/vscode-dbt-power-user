import { executeRequestInAsync } from "@modules/app/requestExecutor";
import NewFeatureIndicator from "@modules/newFeature/NewFeatureIndicator";
import { Button } from "@uicore";

const RunAdhocQueryButton = (): JSX.Element => {
  const handleClick = () => {
    executeRequestInAsync("runAdhocQuery", {});
  };
  return (
    <NewFeatureIndicator featureKey="run-adhoc-query-button-clicked">
      <Button outline onClick={handleClick}>
        + New query
      </Button>
    </NewFeatureIndicator>
  );
};

export default RunAdhocQueryButton;
