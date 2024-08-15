import { executeRequestInAsync } from "@modules/app/requestExecutor";
import NewFeatureIndicator from "@modules/newFeature/NewFeatureIndicator";
import useQueryPanelState from "@modules/queryPanel/useQueryPanelState";
import { Button } from "@uicore";

const NewNotebookButton = (): JSX.Element => {
  const { queryResults } = useQueryPanelState();
  const handleClick = () => {
    executeRequestInAsync("openNewNotebook", { query: queryResults?.raw_sql });
  };
  return (
    <NewFeatureIndicator featureKey="new-notebook-button-clicked">
      <Button outline onClick={handleClick}>
        + New notebook
      </Button>
    </NewFeatureIndicator>
  );
};

export default NewNotebookButton;
