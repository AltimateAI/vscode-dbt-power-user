import { executeRequestInSync } from "@modules/app/requestExecutor";
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
  return <div className="new-feature" />;
};

export default NewFeatureIndicator;
