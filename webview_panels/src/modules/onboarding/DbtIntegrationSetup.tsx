import { useState } from "react";
import { Button, Alert } from "antd";
import { Stack } from "@uicore";
import classes from "./onboarding.module.scss";

interface DbtIntegrationSetupProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

const DbtIntegrationSetup = ({
  onComplete,
  onSkip,
}: DbtIntegrationSetupProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenAltimate = () => {
    window.open("https://app.myaltimate.com/integrations/new", "_blank");
    setIsOpened(true);
  };

  const handleContinue = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <div className={classes.dbtIntegrationContainer}>
      <div className={classes.dbtIntegrationInfo}>
        <p>
          Create a dbt integration in Altimate to unlock collaboration and
          governance features:
        </p>
        <ul>
          <li>Sync your dbt documentation and lineage to the cloud</li>
          <li>Collaborate with your team on code and documentation</li>
          <li>Set up project governance and quality checks</li>
          <li>Track query history and share bookmarks</li>
          <li>Export lineage diagrams and documentation</li>
        </ul>
      </div>

      {isOpened && (
        <Alert
          message="Integration setup opened"
          description="Complete the integration setup in your browser, then click 'Continue' below to proceed."
          type="info"
          showIcon
          className={classes.alertMessage}
        />
      )}

      <div className={classes.dbtIntegrationSteps}>
        <p>
          <strong>Steps to create the integration:</strong>
        </p>
        <ol>
          <li>Click &quot;Open Altimate Platform&quot; below</li>
          <li>Select your dbt integration type (Core or Cloud)</li>
          <li>Follow the guided setup in the Altimate platform</li>
          <li>Return here and click &quot;Continue&quot; when done</li>
        </ol>
      </div>

      <Stack direction="row" className={classes.dbtIntegrationActions}>
        <Button size="large" onClick={handleSkip}>
          Skip this step
        </Button>
        <Button type="default" size="large" onClick={handleOpenAltimate}>
          Open Altimate Platform
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={handleContinue}
          disabled={!isOpened}
        >
          Continue
        </Button>
      </Stack>

      <div className={classes.helpText}>
        <p>
          Need help?{" "}
          <a
            href="https://docs.myaltimate.com/setup/integrations/"
            target="_blank"
            rel="noopener noreferrer"
          >
            View integration documentation
          </a>
        </p>
      </div>
    </div>
  );
};

export default DbtIntegrationSetup;
