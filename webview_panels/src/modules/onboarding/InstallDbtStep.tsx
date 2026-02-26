import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { Stack } from "@uicore";
import { Alert, Button, Card, Radio, Space } from "antd";
import { useState } from "react";
import classes from "./onboarding.module.scss";

interface InstallDbtStepProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

type DbtIntegrationType = "core" | "fusion" | "cloud";
type InstallState = "idle" | "installing" | "complete" | "error";

const InstallDbtStep = ({
  onComplete,
  onSkip,
}: InstallDbtStepProps): JSX.Element => {
  const [integrationType, setIntegrationType] =
    useState<DbtIntegrationType>("core");
  const [installState, setInstallState] = useState<InstallState>("idle");
  const [error, setError] = useState<string | undefined>();

  const handleInstall = async () => {
    try {
      setError(undefined);
      setInstallState("installing");

      await executeRequestInSync("installDbt", {
        integrationType,
      });

      setInstallState("complete");

      // Call onComplete callback if provided
      if (onComplete) {
        setTimeout(onComplete, 1500);
      }
    } catch (err) {
      panelLogger.error("Error installing dbt", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to install dbt. Check the terminal for details.",
      );
      setInstallState("error");
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  const isInstalling = installState === "installing";
  const isComplete = installState === "complete";

  return (
    <div className={classes.installDbtContainer}>
      <div className={classes.installDbtInfo}>
        <p>
          Choose your dbt integration type and install dbt to enable all
          features of dbt Power User:
        </p>
      </div>

      <Card className={classes.integrationTypeCard}>
        <Radio.Group
          value={integrationType}
          onChange={(e) =>
            setIntegrationType(e.target.value as DbtIntegrationType)
          }
          disabled={isInstalling || isComplete}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Radio value="core">
              <div className={classes.radioOption}>
                <strong>dbt Core</strong>
                <p className={classes.radioDescription}>
                  Install dbt Core with a specific adapter (Snowflake, BigQuery,
                  Postgres, etc.). Best for local development and full control
                  over your dbt environment.
                </p>
              </div>
            </Radio>
            <Radio value="fusion">
              <div className={classes.radioOption}>
                <strong>dbt Fusion</strong>
                <p className={classes.radioDescription}>
                  Install dbt Fusion CLI for enhanced dbt functionality.
                  Provides improved performance and additional features on top
                  of dbt Core.
                </p>
              </div>
            </Radio>
            <Radio value="cloud">
              <div className={classes.radioOption}>
                <strong>dbt Cloud CLI</strong>
                <p className={classes.radioDescription}>
                  Install the dbt Cloud CLI to work with dbt Cloud environments.
                  Ideal for teams using dbt Cloud for orchestration and
                  collaboration.
                </p>
              </div>
            </Radio>
          </Space>
        </Radio.Group>
      </Card>

      {error && (
        <Alert
          message="Installation Error"
          description={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(undefined)}
          className={classes.alertMessage}
        />
      )}

      {isComplete && (
        <Alert
          message="Installation successful!"
          description={`dbt ${integrationType} has been installed successfully.`}
          type="success"
          showIcon
          className={classes.alertMessage}
        />
      )}

      <Stack direction="row" className={classes.installDbtActions}>
        <Button
          size="large"
          onClick={handleSkip}
          disabled={isInstalling || isComplete}
        >
          Skip this step
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={handleInstall}
          disabled={isInstalling || isComplete}
          loading={isInstalling}
        >
          {isComplete
            ? "Installed"
            : isInstalling
              ? "Installing..."
              : `Install dbt ${integrationType}`}
        </Button>
      </Stack>

      <div className={classes.helpText}>
        <p>
          Need help choosing?{" "}
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

export default InstallDbtStep;
