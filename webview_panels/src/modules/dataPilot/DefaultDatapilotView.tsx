import { AltimateIcon, YellowEyeIcon } from "@assets/icons";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { Button, Stack } from "@uicore";
import { useEffect, useState } from "react";
import classes from "./datapilot.module.scss";

const DefaultDatapilotView = () => {
  const [isNewDocsPanelEnabled, setIsNewDocsPanelEnabled] = useState(true);

  const enableNewUx = () => {
    executeRequestInAsync("enableNewDocsPanel", { enable: true });
    setIsNewDocsPanelEnabled(true);
  };

  const loadNewDocsPanelState = async () => {
    const result = (await executeRequestInSync("getNewDocsPanelState", {})) as {
      enabled: boolean;
    };
    setIsNewDocsPanelEnabled(result.enabled);
  };

  useEffect(() => {
    loadNewDocsPanelState().catch((err) =>
      panelLogger.error("error loading new docs panel state", err),
    );
  }, []);

  return (
    <Stack direction="column" className={classes.defaultView}>
      <Stack>
        <AltimateIcon />
        <div>
          <h1>Hello, there!</h1>
          <p className="p3">
            How can I help you today? <YellowEyeIcon />
          </p>
        </div>
      </Stack>
      <section>
        <h3>Accelerate Your Work</h3>
        <p className="p3">
          Hi there, I am your DataPilot and I’m here to help you get things done
          faster. I can help with documentation, query explanation / debugging,
          and dbt model generations. Please check{" "}
          <a href="https://docs.myaltimate.com/document/generatedoc/">
            documentation
          </a>{" "}
          to know more.
        </p>
        <p className="p3">
          I am still learning, and not perfect. Please share your feedback, so I
          can help you even better.{" "}
        </p>
      </section>

      {!isNewDocsPanelEnabled ? (
        <section>
          <h3>Enable docs generation new UX</h3>
          <p className="p3">
            Please enable new UX for docs generation to enable this
            functionality &nbsp;
            <Button
              color="primary"
              onClick={enableNewUx}
              style={{ marginTop: "1rem" }}
            >
              Enable New UX
            </Button>
          </p>
        </section>
      ) : null}
    </Stack>
  );
};

export default DefaultDatapilotView;
