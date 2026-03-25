import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { Stack } from "@uicore";
import { Alert, Button, Input, Select } from "antd";
import { useEffect, useState } from "react";
import classes from "./onboarding.module.scss";

type AltimatePhase = "key";

interface AltimateSetupStepProps {
  phase: AltimatePhase;
  onComplete?: () => void;
  onReadyChange?: (ready: boolean, loading?: boolean) => void;
}

const AltimateSetupStep = ({
  phase,
  onComplete,
  onReadyChange,
}: AltimateSetupStepProps): JSX.Element => {
  const [isAltimateConfigured, setIsAltimateConfigured] = useState<
    boolean | null
  >(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [instanceName, setInstanceName] = useState<string>("");
  const [backendURL, setBackendURL] = useState<string>(
    "https://api.myaltimate.com",
  );
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    void checkAltimateConfiguration();
  }, []);

  // Report readiness to parent wizard
  useEffect(() => {
    onReadyChange?.(!!isAltimateConfigured);
  }, [phase, isAltimateConfigured, onReadyChange]);

  const checkAltimateConfiguration = async () => {
    try {
      const response = (await executeRequestInSync(
        "checkAltimateConfiguration",
        {},
      )) as { isConfigured: boolean; dbtIntegrationType?: string };
      setIsAltimateConfigured(response?.isConfigured || false);
    } catch (err) {
      panelLogger.error("Error checking Altimate configuration", err);
      setIsAltimateConfigured(false);
    }
  };

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
        backendURL: backendURL.trim(),
      });

      setSuccess(true);
      setIsAltimateConfigured(true);

      // Wait a bit to show success message, then advance
      setTimeout(() => {
        setSuccess(false);
        onComplete?.();
      }, 1500);
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

  const openUrl = async (url: string) => {
    try {
      await executeRequestInSync("openUrl", { url });
    } catch (err) {
      panelLogger.error("Error opening URL", err);
      // Fallback to window.open if the command fails
      window.open(url, "_blank");
    }
  };

  const handleSignUp = async () => {
    await openUrl("https://app.myaltimate.com/register");
  };

  // Loading state while checking configuration
  if (isAltimateConfigured === null) {
    return (
      <div className={classes.altimateKeyContainer}>
        <p>Checking Altimate configuration...</p>
      </div>
    );
  }

  // If already configured, show success message
  if (isAltimateConfigured) {
    return (
      <div className={classes.altimateKeyContainer}>
        <Alert
          message="Altimate AI is already configured!"
          description="Your API key is set up. Click 'Tutorials' to continue."
          type="success"
          showIcon
          className={classes.alertMessage}
        />
      </div>
    );
  }

  // Show API key setup form
  return (
    <div className={classes.altimateKeyContainer}>
      <Alert
        message={
          <span style={{ fontWeight: 600 }}>
            Don&apos;t have an API key? Get one for free
          </span>
        }
        description={
          <div>
            <p style={{ margin: "0.5rem 0" }}>
              Follow these steps to get started:
            </p>
            <ol style={{ margin: "0 0 1rem", paddingLeft: "1.25rem" }}>
              <li>
                Sign up at{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    void openUrl("https://app.myaltimate.com/register");
                  }}
                >
                  app.myaltimate.com
                </a>
              </li>
              <li>Navigate to Settings &rarr; API Keys</li>
              <li>Copy your API key and instance name</li>
            </ol>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="primary" size="large" onClick={handleSignUp}>
                Sign Up for Free at app.myaltimate.com
              </Button>
            </div>
          </div>
        }
        type="info"
        showIcon
        className={classes.alertMessage}
      />

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

      <div className={classes.formGroup}>
        <label htmlFor="backend-url" className={classes.formLabel}>
          Backend URL:
        </label>
        <Select
          id="backend-url"
          value={backendURL}
          onChange={(value) => setBackendURL(value)}
          disabled={isValidating || success}
          size="large"
          style={{ width: "100%" }}
        >
          <Select.Option value="https://api.myaltimate.com">
            Community, Pro or Team Plan
          </Select.Option>
          <Select.Option value="https://api.getaltimate.com">
            Enterprise Plan
          </Select.Option>
        </Select>
      </div>

      <Stack direction="row" className={classes.altimateKeyActions}>
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

export default AltimateSetupStep;
