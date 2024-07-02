import { executeRequestInAsync } from "@modules/app/requestExecutor";
import NewFeatureIndicator from "@modules/newFeature/NewFeatureIndicator";
import { Button } from "@uicore";

const RunAdhocQueryButton = (): JSX.Element => {
  const handleClick = () => {
    executeRequestInAsync("runAdhocQuery", {});
  };
  return (
    <Button outline onClick={handleClick} className="position-relative">
      + New query
      <NewFeatureIndicator featureKey="run-adhoc-query-button-clicked" />
    </Button>
  );
};

export default RunAdhocQueryButton;
