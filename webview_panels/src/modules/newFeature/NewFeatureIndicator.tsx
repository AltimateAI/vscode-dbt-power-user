import { executeRequestInSync } from "@modules/app/requestExecutor";
import { Tooltip } from "@uicore";
import { ReactNode, useEffect, useState } from "react";

const NewFeatureIndicator = ({
  featureKey,
  children,
}: {
  featureKey: string;
  children: ReactNode;
}): JSX.Element => {
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

  const updateContext = async () => {
    await executeRequestInSync("setContext", { key: featureKey, value: true });
    setShow(false);
  };

  return (
    <span className="position-relative" onClick={updateContext}>
      {children}

      {show ? (
        <Tooltip title="New feature">
          <div className="new-feature" />
        </Tooltip>
      ) : null}
    </span>
  );
};

export default NewFeatureIndicator;
