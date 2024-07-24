import { executeRequestInAsync } from "@modules/app/requestExecutor";
import NewFeatureIndicator from "@modules/newFeature/NewFeatureIndicator";
import { Button } from "@uicore";

const NewNotebookButton = (): JSX.Element => {
  const handleClick = () => {
    executeRequestInAsync("openNewNotebook", {});
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
