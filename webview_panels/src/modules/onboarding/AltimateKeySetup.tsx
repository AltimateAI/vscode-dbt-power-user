import { useState } from "react";
import { Input, Button, Alert } from "antd";
import { Stack } from "@uicore";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import classes from "./onboarding.module.scss";

interface AltimateKeySetupProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

const AltimateKeySetup = ({
  onComplete,
  onSkip,
}: AltimateKeySetupProps): JSX.Element => {
  const [apiKey, setApiKey] = useState<string>("");
  const [instanceName, setInstanceName] = useState<string>("");
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) {
      setError("Please enter an API key");
      return;
    }

    if (!instanceName.trim()) {
      setError("Please enter an instance name");
      return;
    }

    try {
      setIsValidating(true);
      setError(undefined);

      await executeRequestInSync("saveAltimateKey", {
        apiKey: apiKey.trim(),
        instanceName: instanceName.trim(),
      });

      setSuccess(true);

      // Call onComplete after a short delay
      if (onComplete) {
        setTimeout(onComplete, 1500);
      }
    } catch (err) {
      panelLogger.error("Error saving Altimate API key", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save API key. Please check your credentials.",
      );
    } finally {
      setIsValidating(false);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  const handleSignUp = () => {
    window.open("https://app.myaltimate.com/register", "_blank");
  };

  return (
    <div className={classes.altimateKeyContainer}>
      <div className={classes.altimateKeyInfo}>
        <p>To get your free Altimate API key:</p>
        <ol>
          <li>
            Sign up at{" "}
            <a
              href="https://app.myaltimate.com/register"
              target="_blank"
              rel="noopener noreferrer"
            >
              app.myaltimate.com
            </a>
          </li>
          <li>Navigate to Settings → API Keys</li>
          <li>Copy your API key and instance name</li>
        </ol>
      </div>

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(undefined)}
          className={classes.alertMessage}
        />
      )}

      {success && (
        <Alert
          message="API key saved successfully!"
          type="success"
          showIcon
          className={classes.alertMessage}
        />
      )}

      <div className={classes.formGroup}>
        <label htmlFor="instance-name" className={classes.formLabel}>
          Instance Name:
        </label>
        <Input
          id="instance-name"
          placeholder="Enter your instance name"
          value={instanceName}
          onChange={(e) => setInstanceName(e.target.value)}
          disabled={isValidating || success}
          size="large"
        />
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="api-key" className={classes.formLabel}>
          API Key:
        </label>
        <Input.Password
          id="api-key"
          placeholder="Enter your Altimate API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          disabled={isValidating || success}
          size="large"
        />
      </div>

      <Stack direction="row" className={classes.altimateKeyActions}>
        <Button
          size="large"
          onClick={handleSkip}
          disabled={isValidating || success}
        >
          Skip this step
        </Button>
        <Button
          size="large"
          onClick={handleSignUp}
          disabled={isValidating || success}
        >
          Sign Up for Free
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={handleSaveKey}
          loading={isValidating}
          disabled={success}
        >
          {success ? "Saved" : "Save API Key"}
        </Button>
      </Stack>
    </div>
  );
};

export default AltimateKeySetup;
