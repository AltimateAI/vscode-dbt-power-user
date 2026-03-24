import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { Stack } from "@uicore";
import { Alert, Button, Input, Radio, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import classes from "./onboarding.module.scss";

const { Text, Title } = Typography;

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

  // Toggle for API key setup
  const [hasApiKey, setHasApiKey] = useState(true);

  useEffect(() => {
    void checkAltimateConfiguration();
  }, []);

  // Report readiness to parent wizard
  useEffect(() => {
    onReadyChange?.(!!isAltimateConfigured);
  }, [phase, isAltimateConfigured]);

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

  // Calculate current star level based on progress
  const getStarLevel = () => {
    if (!isAltimateConfigured) return 1; // No API key = 1 star
    return 2; // API key configured = 2 stars
  };

  const renderProgressCard = () => {
    const currentLevel = getStarLevel();

    return (
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--vscode-editor-background) 0%, var(--vscode-editorWidget-background) 100%)",
          border: "2px solid var(--vscode-focusBorder)",
          borderRadius: "12px",
          padding: "1rem 1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        {/* Title */}
        <Title
          level={5}
          style={{
            margin: 0,
            marginBottom: "0.75rem",
            color: "var(--vscode-foreground)",
            textAlign: "center",
            fontSize: "1.1rem",
          }}
        >
          Your Analytics Engineering Journey
        </Title>

        {/* Star Progress Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.75rem",
            position: "relative",
          }}
        >
          {/* Progress line */}
          <div
            style={{
              position: "absolute",
              top: "15px",
              left: "10%",
              right: "10%",
              height: "3px",
              background: "var(--vscode-panel-border)",
              zIndex: 0,
            }}
          >
            <div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #108ee9 0%, #87d068 100%)",
                width: `${((currentLevel - 1) / 2) * 100}%`,
                transition: "width 0.5s ease",
              }}
            />
          </div>

          {/* Level 1 */}
          <div style={{ flex: 1, textAlign: "center", zIndex: 1 }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background:
                  currentLevel >= 1
                    ? "#108ee9"
                    : "var(--vscode-editor-background)",
                border:
                  currentLevel >= 1
                    ? "2px solid #108ee9"
                    : "2px solid var(--vscode-panel-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontSize: "0.8rem",
                opacity: currentLevel >= 1 ? 1 : 0.5,
                filter: currentLevel >= 1 ? "none" : "grayscale(100%)",
              }}
            >
              {"\u2B50"}
            </div>
          </div>

          {/* Level 2 */}
          <div style={{ flex: 1, textAlign: "center", zIndex: 1 }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background:
                  currentLevel >= 2
                    ? "#52c41a"
                    : "var(--vscode-editor-background)",
                border:
                  currentLevel >= 2
                    ? "2px solid #52c41a"
                    : "2px solid var(--vscode-panel-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontSize: "0.65rem",
                opacity: currentLevel >= 2 ? 1 : 0.5,
                filter: currentLevel >= 2 ? "none" : "grayscale(100%)",
              }}
            >
              {"\u2B50\u2B50"}
            </div>
          </div>

          {/* Level 3 */}
          <div style={{ flex: 1, textAlign: "center", zIndex: 1 }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "var(--vscode-editor-background)",
                border: "2px solid var(--vscode-panel-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontSize: "0.55rem",
                opacity: 0.5,
                filter: "grayscale(100%)",
              }}
            >
              {"\u2B50\u2B50\u2B50"}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "var(--vscode-panel-border)",
            margin: "0.5rem 0",
          }}
        />

        {/* Next Step Section */}
        {currentLevel === 2 ? (
          <div>
            <Text className={classes.progressCardHeading}>
              API Key Configured!
            </Text>
            <Text className={classes.progressCardDescription}>
              Your Altimate API key is set up. You now have access to:
            </Text>
            <div className={classes.progressCardFeatures}>
              <Text className={classes.progressCardFeatureItem}>
                Advanced lineage visualization
              </Text>
              <Text className={classes.progressCardFeatureItem}>
                SQL query explanations
              </Text>
              <Text className={classes.progressCardFeatureItem}>
                Auto-generated documentation
              </Text>
            </div>
          </div>
        ) : (
          <div>
            <Text className={classes.progressCardHeading}>
              Next: Unlock 2-Star Features
            </Text>
            <Text className={classes.progressCardDescription}>
              Add your Altimate API key to unlock:
            </Text>
            <div className={classes.progressCardFeatures}>
              <Text className={classes.progressCardFeatureItem}>
                Advanced lineage visualization
              </Text>
              <Text className={classes.progressCardFeatureItem}>
                SQL query explanations
              </Text>
              <Text className={classes.progressCardFeatureItem}>
                Auto-generated documentation
              </Text>
            </div>
          </div>
        )}
      </div>
    );
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
        {renderProgressCard()}
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
      {renderProgressCard()}

      {/* Toggle for API key availability */}
      <div
        style={{
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        <Radio.Group
          value={hasApiKey}
          onChange={(e) => setHasApiKey(e.target.value as boolean)}
          buttonStyle="solid"
          size="large"
        >
          <Radio.Button value={true}>I have an Altimate API key</Radio.Button>
          <Radio.Button value={false}>
            I don&apos;t have an Altimate API key
          </Radio.Button>
        </Radio.Group>
      </div>

      {hasApiKey ? (
        <>
          <div className={classes.altimateKeyInfo}>
            <Title level={4} className={classes.sectionHeading}>
              Enter Your Altimate API Key
            </Title>
            <p>Enter your Altimate instance name and API key below:</p>
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
        </>
      ) : (
        <>
          <div className={classes.altimateKeyInfo}>
            <Title level={4} className={classes.sectionHeading}>
              Get Your Free Altimate API Key
            </Title>
            <p>Follow these steps to become an Analytics Engineer:</p>
            <ol>
              <li>
                Sign up at{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    void openUrl("https://app.myaltimate.com/register");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  app.myaltimate.com
                </a>
              </li>
              <li>Navigate to Settings &rarr; API Keys</li>
              <li>Copy your API key and instance name</li>
              <li>Switch to &quot;I have an Altimate API key&quot; above</li>
            </ol>
          </div>

          <Stack direction="row" className={classes.altimateKeyActions}>
            <Button
              type="primary"
              size="large"
              onClick={handleSignUp}
              style={{ width: "100%" }}
            >
              Sign Up for Free at app.myaltimate.com
            </Button>
          </Stack>
        </>
      )}
    </div>
  );
};

export default AltimateSetupStep;
