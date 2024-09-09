import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import NewFeatureIndicator from "@modules/newFeature/NewFeatureIndicator";
import { Button } from "@uicore";
import { useEffect, useState } from "react";

const NewNotebookButton = (): JSX.Element | null => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    executeRequestInAsync("openNewNotebook", {});
  };

  useEffect(() => {
    executeRequestInSync("configEnabled", {
      section: "dbt",
      config: "enableNotebooks",
    })
      .then((response) => setShow(response as boolean))
      .catch((err) => panelLogger.error("error while getting config", err));
  }, []);

  if (!show) {
    return null;
  }

  return (
    <>
      <NewFeatureIndicator featureKey="new-notebook-button-clicked">
        <Button outline onClick={handleClick}>
          + New notebook
        </Button>
      </NewFeatureIndicator>
    </>
  );
};

export default NewNotebookButton;
