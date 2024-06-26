import { executeRequestInSync } from "@modules/app/requestExecutor";
import { Tooltip } from "@uicore";
import { useEffect, useState } from "react";

const NewFeatureIndicator = ({
  featureKey,
}: {
  featureKey: string;
}): JSX.Element | null => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    executeRequestInSync("getFromContext", { key: featureKey })
      .then((value) => {
        setShow(!value);
      })
      .catch(() => {
        setShow(true);
      });
  }, []);

  if (!show) {
    return null;
  }
  return (
    <Tooltip title="New feature">
      <div className="new-feature" />
    </Tooltip>
  );
};

export default NewFeatureIndicator;
