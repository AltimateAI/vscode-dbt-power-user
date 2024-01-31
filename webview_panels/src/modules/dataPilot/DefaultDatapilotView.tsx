import { AltimateIcon } from "@assets/icons";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { Button, Stack } from "@uicore";
import { useEffect, useState } from "react";
import classes from "./datapilot.module.scss";
import PreviewFeatureIcon from "@modules/previewFeature/PreviewFeatureIcon";

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
      <Stack style={{ alignItems: "end" }}>
        <AltimateIcon />
        <div>
          <h3>Hello, there!</h3>
          <h6>
            How can I help you today? <PreviewFeatureIcon />
          </h6>
        </div>
      </Stack>
      <section>
        <h6>Accelerate Your Work</h6>
        <p>
          Hi there, I am your DataPilot and I’m here to help you get things done
          faster. I can help with documentation, query explanation / debugging,
          and dbt model generations. Please check{" "}
          <a href="https://docs.myaltimate.com/document/generatedoc/">
            documentation
          </a>{" "}
          to know more.
        </p>
        <br />
        <p>
          I am still learning, and not perfect. Please share your feedback, so I
          can help you even better.{" "}
        </p>
      </section>

      {!isNewDocsPanelEnabled ? (
        <section>
          <h6>Enable new experience for doc generation</h6>
          <p>
            For now, DataPilot Chat is only available when new experience is
            enabled in the Documentation Editor and API key is added in the
            extension settings.
          </p>
          <p className="text-end mt-3">
            <Button color="primary" onClick={enableNewUx}>
              Enable New Experience
            </Button>
          </p>
        </section>
      ) : null}
    </Stack>
  );
};

export default DefaultDatapilotView;
