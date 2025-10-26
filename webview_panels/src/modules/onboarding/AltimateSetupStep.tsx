import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { Stack } from "@uicore";
import {
  Alert,
  Button,
  Collapse,
  Input,
  message,
  Radio,
  Select,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import classes from "./onboarding.module.scss";

const { Text, Paragraph, Title } = Typography;
const { Panel } = Collapse;

interface AltimateSetupStepProps {
  onComplete?: () => void;
}

type IntegrationType = "dbt_core" | "dbt_cloud";

interface DbtProject {
  label: string;
  projectRoot: string;
}

interface IntegrationEnvironment {
  id: number;
  name: string;
}

interface SyncHistoryItem {
  type: "Completed" | "In Progress" | "Failed";
  time: string;
  log_file: string | null;
}

interface Integration {
  id: number;
  name: string;
  environments: IntegrationEnvironment[];
  created_at: string;
  last_modified_at: string;
  last_file_upload_time: string | null;
  is_deleted: boolean;
  integration_type: "dbt_core" | "dbt_cloud";
  sync_history?: SyncHistoryItem[];
}

const AltimateSetupStep = ({
  onComplete,
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

  // Integration creation state
  const [projects, setProjects] = useState<DbtProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [integrationType, setIntegrationType] =
    useState<IntegrationType>("dbt_core");
  const [environment, setEnvironment] = useState<string>("Production");
  const [isCreatingIntegration, setIsCreatingIntegration] = useState(false);
  const [integrationCreated, setIntegrationCreated] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);

  // Existing integrations state
  const [existingIntegrations, setExistingIntegrations] = useState<
    Integration[]
  >([]);
  const [showExistingIntegrations, setShowExistingIntegrations] =
    useState(false);
  const [selectedIntegrationId, setSelectedIntegrationId] = useState<
    number | null
  >(null);
  const [selectedEnvironmentId, setSelectedEnvironmentId] = useState<
    number | null
  >(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loadingSyncStatus, setLoadingSyncStatus] = useState<
    Record<string, boolean>
  >({});

  // Datapilot state
  const [isDatapilotInstalled, setIsDatapilotInstalled] = useState(false);
  const [isInstallingDatapilot, setIsInstallingDatapilot] = useState(false);

  // Altimate config for datapilot command
  const [altimateConfig, setAltimateConfig] = useState<{
    apiKey: string;
    instanceName: string;
    backendURL: string;
  }>({ apiKey: "", instanceName: "", backendURL: "" });

  // Toggle for API key setup
  const [hasApiKey, setHasApiKey] = useState(true);

  useEffect(() => {
    void checkAltimateConfiguration();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoadingProjects(true);
      const response = (await executeRequestInSync(
        "getProjects",
        {},
      )) as DbtProject[];
      setProjects(response || []);

      // Auto-select first project if only one exists
      if (response && response.length === 1) {
        setSelectedProject(response[0].label);
      }
    } catch (err) {
      panelLogger.error("Error loading projects", err);
      setProjects([]);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const loadIntegrations = async () => {
    try {
      const response = (await executeRequestInSync(
        "getIntegrations",
        {},
      )) as Integration[];

      // For each integration, fetch its sync status
      const integrationsWithSync = await Promise.all(
        (response || []).map(async (integration) => {
          if (integration.environments && integration.environments.length > 0) {
            try {
              const syncData = (await executeRequestInSync(
                "getIntegrationSyncStatus",
                {
                  integrationId: integration.id,
                  environment: integration.environments[0].name,
                },
              )) as Integration | null;

              if (syncData?.sync_history) {
                return { ...integration, sync_history: syncData.sync_history };
              }
            } catch (err) {
              panelLogger.error(
                "Error fetching sync status for integration",
                err,
              );
            }
          }
          return integration;
        }),
      );

      setExistingIntegrations(integrationsWithSync);
      setShowExistingIntegrations(integrationsWithSync.length > 0);
    } catch (err) {
      panelLogger.error("Error loading integrations", err);
      setExistingIntegrations([]);
    }
  };

  const checkDatapilotInstallation = async () => {
    try {
      const response = (await executeRequestInSync(
        "checkDatapilotInstalled",
        {},
      )) as { isInstalled: boolean };
      setIsDatapilotInstalled(response?.isInstalled || false);
    } catch (err) {
      panelLogger.error("Error checking datapilot installation", err);
      setIsDatapilotInstalled(false);
    }
  };

  const installDatapilot = async () => {
    try {
      setIsInstallingDatapilot(true);
      const response = (await executeRequestInSync("installDatapilot", {})) as {
        success: boolean;
      };
      if (response?.success) {
        setIsDatapilotInstalled(true);
        void message.success("Datapilot CLI installed successfully!");
      } else {
        void message.error("Failed to install Datapilot CLI");
      }
    } catch (err) {
      panelLogger.error("Error installing datapilot", err);
      void message.error("Failed to install Datapilot CLI");
    } finally {
      setIsInstallingDatapilot(false);
    }
  };

  const loadAltimateConfig = async () => {
    try {
      const response = (await executeRequestInSync(
        "getAltimateConfig",
        {},
      )) as {
        apiKey: string;
        instanceName: string;
        backendURL: string;
      };
      setAltimateConfig(
        response || { apiKey: "", instanceName: "", backendURL: "" },
      );
    } catch (err) {
      panelLogger.error("Error loading Altimate config", err);
    }
  };

  const checkAltimateConfiguration = async () => {
    try {
      const response = (await executeRequestInSync(
        "checkAltimateConfiguration",
        {},
      )) as { isConfigured: boolean; dbtIntegrationType?: string };
      setIsAltimateConfigured(response?.isConfigured || false);

      // Get dbt integration type and map it to Altimate integration type
      if (response?.dbtIntegrationType) {
        const dbtType = response.dbtIntegrationType;
        if (dbtType === "cloud") {
          setIntegrationType("dbt_cloud");
        } else {
          // Default to dbt_core for "core" and "fusion"
          setIntegrationType("dbt_core");
        }
      }

      // If Altimate is configured, load projects, integrations, config, and check datapilot in parallel
      if (response?.isConfigured) {
        await Promise.all([
          loadProjects(),
          loadIntegrations(),
          loadAltimateConfig(),
          checkDatapilotInstallation(),
        ]);
      }
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

      // Load projects, integrations, config, and check datapilot after saving API key in parallel
      await Promise.all([
        loadProjects(),
        loadIntegrations(),
        loadAltimateConfig(),
        checkDatapilotInstallation(),
      ]);

      // Wait a bit to show success message, then transition to integration setup
      setTimeout(() => {
        setSuccess(false);
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

  const handleCreateIntegration = async () => {
    if (!selectedProject.trim()) {
      setError("Please select a project");
      return;
    }

    try {
      setIsCreatingIntegration(true);
      setError(undefined);

      await executeRequestInSync("createDbtIntegration", {
        name: selectedProject.trim(),
        environment: environment,
        integrationType: integrationType,
      });

      setIntegrationCreated(true);

      // Call onComplete after a short delay
      if (onComplete) {
        setTimeout(onComplete, 1500);
      }
    } catch (err) {
      panelLogger.error("Error creating dbt integration", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create dbt integration. Please try again or use manual setup.",
      );
    } finally {
      setIsCreatingIntegration(false);
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

  const generateDatapilotCommand = (
    integration: Integration,
    env?: IntegrationEnvironment,
  ) => {
    // Use configuration values from state
    const configBackendURL =
      altimateConfig.backendURL || "https://api.myaltimate.com";
    const configInstanceName =
      altimateConfig.instanceName || "YOUR_INSTANCE_NAME";
    const configApiKey = altimateConfig.apiKey || "YOUR_API_KEY";

    const baseCommand = `datapilot dbt onboard --backend-url ${configBackendURL} --token ${configApiKey} --instance-name ${configInstanceName} --manifest-path ./target/manifest.json --catalog-path ./target/catalog.json`;

    let completeCommand = "";
    if (integration.integration_type === "dbt_core") {
      completeCommand = `${baseCommand} --dbt_core_integration_id ${integration.id}`;
      if (env) {
        completeCommand += ` --dbt_core_integration_environment ${env?.id}`;
      }
    } else if (integration.integration_type === "dbt_cloud") {
      completeCommand = `${baseCommand} --dbt_integration_id ${integration.id}`;
      if (env) {
        completeCommand += ` --dbt_integration_environment ${env?.id}`;
      }
    }

    return completeCommand;
  };

  const handleCopyCommand = (command: string) => {
    void navigator.clipboard.writeText(command);
    void message.success("Command copied to clipboard!");
  };

  const fetchSyncStatus = async (
    integrationId: number,
    environmentName: string,
  ) => {
    const key = `${integrationId}-${environmentName}`;
    try {
      setLoadingSyncStatus((prev) => ({ ...prev, [key]: true }));
      const syncData = (await executeRequestInSync("getIntegrationSyncStatus", {
        integrationId,
        environment: environmentName,
      })) as Integration | null;

      if (syncData?.sync_history) {
        // Update the integration with sync history
        setExistingIntegrations((prev) =>
          prev.map((integration) =>
            integration.id === integrationId
              ? { ...integration, sync_history: syncData.sync_history }
              : integration,
          ),
        );
      }
    } catch (err) {
      panelLogger.error("Error fetching sync status", err);
    } finally {
      setLoadingSyncStatus((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleAccordionChange = (key: string | string[]) => {
    const activeKey = Array.isArray(key) ? key[0] : key;
    const integrationId = activeKey ? parseInt(activeKey, 10) : null;
    setSelectedIntegrationId(integrationId);

    // Auto-select first environment if integration is opened and has environments
    if (integrationId) {
      const integration = existingIntegrations.find(
        (i) => i.id === integrationId,
      );
      if (integration?.environments && integration.environments.length > 0) {
        const firstEnv = integration.environments[0];
        setSelectedEnvironmentId(firstEnv.id);

        // Fetch sync status for the first environment
        void fetchSyncStatus(integrationId, firstEnv.name);
      } else {
        // No environments, set to null
        setSelectedEnvironmentId(null);
      }
    } else {
      setSelectedEnvironmentId(null);
    }
  };

  const handleEnvironmentChange = (envId: number) => {
    setSelectedEnvironmentId(envId);

    // Fetch sync status for the newly selected environment
    if (selectedIntegrationId) {
      const integration = existingIntegrations.find(
        (i) => i.id === selectedIntegrationId,
      );
      const selectedEnv = integration?.environments.find((e) => e.id === envId);
      if (selectedEnv) {
        void fetchSyncStatus(selectedIntegrationId, selectedEnv.name);
      }
    }
  };

  // Calculate current star level based on progress
  const getStarLevel = () => {
    if (!isAltimateConfigured) return 1; // No API key = 1 star

    // Check if any integration has completed sync
    const hasCompletedSync = existingIntegrations.some(
      (integration) =>
        integration.sync_history &&
        integration.sync_history.length > 0 &&
        integration.sync_history[0].type === "Completed",
    );

    if (hasCompletedSync) return 3; // API key + synced integration = 3 stars
    if (existingIntegrations.length > 0) return 2; // API key + integration (not synced) = 2 stars
    return 2; // API key only = 2 stars
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
              ⭐
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
              ⭐⭐
            </div>
          </div>

          {/* Level 3 */}
          <div style={{ flex: 1, textAlign: "center", zIndex: 1 }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background:
                  currentLevel >= 3
                    ? "#87d068"
                    : "var(--vscode-editor-background)",
                border:
                  currentLevel >= 3
                    ? "2px solid #87d068"
                    : "2px solid var(--vscode-panel-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontSize: "0.55rem",
                opacity: currentLevel >= 3 ? 1 : 0.5,
                filter: currentLevel >= 3 ? "none" : "grayscale(100%)",
              }}
            >
              ⭐⭐⭐
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
        {currentLevel === 3 ? (
          <div style={{ textAlign: "center" }}>
            <Text
              style={{
                fontSize: "1.5rem",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              🎉
            </Text>
            <Text
              strong
              style={{
                display: "block",
                marginBottom: "0.25rem",
                color: "#87d068",
              }}
            >
              All Features Unlocked!
            </Text>
            <Text
              style={{
                fontSize: "0.85rem",
                color: "var(--vscode-foreground)",
                opacity: 0.9,
              }}
            >
              You&apos;re now a Senior Analytics Engineer with full access to
              AI-powered insights
            </Text>
          </div>
        ) : currentLevel === 2 ? (
          <div>
            <Text className={classes.progressCardHeading}>
              🎯 Next: Unlock 3-Star Features
            </Text>
            <Text className={classes.progressCardDescription}>
              Sync your dbt integration to unlock:
            </Text>
            <div className={classes.progressCardFeatures}>
              <Text className={classes.progressCardFeatureItem}>
                💬 Instant answers about models and tests
              </Text>
              <Text className={classes.progressCardFeatureItem}>
                🔍 Project health checks
              </Text>
              <Text className={classes.progressCardFeatureItem}>
                🪄 AI optimization recommendations
              </Text>
            </div>
          </div>
        ) : (
          <div>
            <Text className={classes.progressCardHeading}>
              🎯 Next: Unlock 2-Star Features
            </Text>
            <Text className={classes.progressCardDescription}>
              Add your Altimate API key to unlock:
            </Text>
            <div className={classes.progressCardFeatures}>
              <Text className={classes.progressCardFeatureItem}>
                🧠 Advanced lineage visualization
              </Text>
              <Text className={classes.progressCardFeatureItem}>
                💡 SQL query explanations
              </Text>
              <Text className={classes.progressCardFeatureItem}>
                📝 Auto-generated documentation
              </Text>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSyncStatus = (integration: Integration) => {
    const key = `${integration.id}-${
      integration.environments.find((e) => e.id === selectedEnvironmentId)?.name
    }`;
    const isLoading = loadingSyncStatus[key];

    if (isLoading) {
      return (
        <div style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
          <Spin size="small" style={{ marginRight: "0.5rem" }} />
          <Text style={{ color: "var(--vscode-descriptionForeground)" }}>
            Checking sync status...
          </Text>
        </div>
      );
    }

    if (!integration.sync_history || integration.sync_history.length === 0) {
      return (
        <Alert
          message="No sync history available"
          description="This integration has not been synced yet. Run the datapilot command below to sync your project data. Once synced, features like instant answers and project health checks will become available."
          type="warning"
          showIcon
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        />
      );
    }

    const latestSync = integration.sync_history[0];
    let statusColor:
      | "success"
      | "processing"
      | "error"
      | "default"
      | "warning" = "default";
    let statusText = "";
    let statusIcon: React.ReactNode = null;

    switch (latestSync.type) {
      case "Completed":
        statusColor = "success";
        statusText = "Synced";
        break;
      case "In Progress":
        statusColor = "processing";
        statusText = "Syncing...";
        statusIcon = <Spin size="small" />;
        break;
      case "Failed":
        statusColor = "error";
        statusText = "Sync Failed";
        break;
    }

    return (
      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <div>
            <Text
              strong
              style={{
                marginRight: "0.5rem",
                color: "var(--vscode-foreground)",
              }}
            >
              Sync Status:
            </Text>
            <Tag
              color={statusColor}
              icon={statusIcon}
              style={{ fontWeight: "500" }}
            >
              {statusText}
            </Tag>
            {latestSync.type === "Completed" && (
              <Text
                style={{
                  fontSize: "0.85rem",
                  color: "var(--vscode-descriptionForeground)",
                  marginLeft: "0.5rem",
                }}
              >
                Last synced: {new Date(latestSync.time).toLocaleString()}
              </Text>
            )}
          </div>

          {latestSync.type === "Completed" && (
            <Alert
              message="Integration is ready!"
              description="Your integration is synced and ready to use. You can now use features like instant answers about your models, tests, and production runs, as well as project health checks."
              type="success"
              showIcon
              style={{ marginTop: "0.5rem" }}
            />
          )}

          {latestSync.type === "Failed" && (
            <Alert
              message="Sync failed"
              description="The last sync attempt failed. Please try running the datapilot command again. Check the logs for more details."
              type="error"
              showIcon
              style={{ marginTop: "0.5rem" }}
            />
          )}

          {latestSync.type === "In Progress" && (
            <Alert
              message="Sync in progress"
              description="Your project data is currently being synced. This may take a few minutes depending on the size of your project."
              type="info"
              showIcon
              style={{ marginTop: "0.5rem" }}
            />
          )}

          {integration.sync_history.length > 1 && (
            <div style={{ marginTop: "0.5rem" }}>
              <Text
                style={{
                  fontSize: "0.85rem",
                  color: "var(--vscode-descriptionForeground)",
                }}
              >
                Previous syncs:{" "}
                {integration.sync_history.slice(1, 4).map((sync, idx) => (
                  <Tag
                    key={idx}
                    color={
                      sync.type === "Completed"
                        ? "success"
                        : sync.type === "Failed"
                          ? "error"
                          : "default"
                    }
                    style={{ marginLeft: idx === 0 ? 0 : "0.25rem" }}
                  >
                    {sync.type === "Completed"
                      ? "✓"
                      : sync.type === "Failed"
                        ? "✗"
                        : "•"}{" "}
                    {new Date(sync.time).toLocaleDateString()}
                  </Tag>
                ))}
              </Text>
            </div>
          )}
        </Space>
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

  // If Altimate is already configured, show the integration creation screen
  if (isAltimateConfigured) {
    return (
      <div className={classes.dbtIntegrationContainer}>
        {renderProgressCard()}

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

        {integrationCreated && (
          <Alert
            message="Integration created successfully!"
            type="success"
            showIcon
            className={classes.alertMessage}
          />
        )}

        {showExistingIntegrations &&
          existingIntegrations.length > 0 &&
          !showCreateForm && (
            <div style={{ marginBottom: "1.5rem" }}>
              <Stack
                direction="row"
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <Title
                    level={4}
                    style={{ margin: 0, marginBottom: "0.5rem" }}
                  >
                    Your dbt Integrations
                  </Title>
                  <Text
                    style={{ color: "var(--vscode-descriptionForeground)" }}
                  >
                    Select an integration below to sync your project data
                  </Text>
                </div>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => setShowCreateForm(true)}
                >
                  + New Integration
                </Button>
              </Stack>

              {!isDatapilotInstalled && (
                <Alert
                  message="Datapilot CLI not installed"
                  description={
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Text>
                        The datapilot CLI is required to push manifest and
                        catalog files to Altimate.
                      </Text>
                      <Button
                        onClick={installDatapilot}
                        loading={isInstallingDatapilot}
                        type="primary"
                        size="small"
                      >
                        Install Datapilot CLI
                      </Button>
                    </Space>
                  }
                  type="warning"
                  showIcon
                  style={{ marginBottom: "1rem" }}
                />
              )}

              <Collapse
                accordion
                onChange={handleAccordionChange}
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  backgroundColor: "var(--vscode-editor-background)",
                  border: "1px solid var(--vscode-panel-border)",
                }}
              >
                {existingIntegrations.map((integration) => (
                  <Panel
                    key={integration.id.toString()}
                    header={
                      <Space>
                        <Text
                          strong
                          style={{ color: "var(--vscode-foreground)" }}
                        >
                          {integration.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: "0.85rem",
                            color: "var(--vscode-descriptionForeground)",
                          }}
                        >
                          (
                          {integration.integration_type === "dbt_core"
                            ? "dbt Core"
                            : "dbt Cloud"}
                          )
                        </Text>
                        {integration.last_file_upload_time && (
                          <Text
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--vscode-descriptionForeground)",
                            }}
                          >
                            • Last uploaded:{" "}
                            {new Date(
                              integration.last_file_upload_time,
                            ).toLocaleDateString()}
                          </Text>
                        )}
                      </Space>
                    }
                  >
                    {integration.environments &&
                      integration.environments.length > 0 && (
                        <>
                          {integration.environments.length > 1 ? (
                            <div style={{ marginBottom: "1rem" }}>
                              <Text
                                strong
                                style={{
                                  marginRight: "0.5rem",
                                  color: "var(--vscode-foreground)",
                                }}
                              >
                                Select Environment:
                              </Text>
                              <Radio.Group
                                value={selectedEnvironmentId}
                                onChange={(e) =>
                                  handleEnvironmentChange(
                                    e.target.value as number,
                                  )
                                }
                              >
                                {integration.environments.map((env) => (
                                  <Radio
                                    key={env.id}
                                    value={env.id}
                                    style={{
                                      color: "var(--vscode-foreground)",
                                    }}
                                  >
                                    {env.name}
                                  </Radio>
                                ))}
                              </Radio.Group>
                            </div>
                          ) : (
                            <Text
                              strong
                              style={{
                                display: "block",
                                marginBottom: "0.5rem",
                                color: "var(--vscode-foreground)",
                              }}
                            >
                              Environment: {integration.environments[0].name}
                            </Text>
                          )}
                        </>
                      )}

                    {selectedIntegrationId === integration.id && (
                      <>
                        {renderSyncStatus(integration)}

                        <Text
                          style={{
                            display: "block",
                            marginBottom: "0.5rem",
                            color: "var(--vscode-descriptionForeground)",
                          }}
                        >
                          Run this command to sync your manifest and catalog:
                        </Text>
                        <Paragraph
                          code
                          copyable={{
                            text: generateDatapilotCommand(
                              integration,
                              selectedEnvironmentId &&
                                integration.environments &&
                                integration.environments.length > 0
                                ? integration.environments.find(
                                    (e) => e.id === selectedEnvironmentId,
                                  )
                                : undefined,
                            ),
                            onCopy: () =>
                              handleCopyCommand(
                                generateDatapilotCommand(
                                  integration,
                                  selectedEnvironmentId &&
                                    integration.environments &&
                                    integration.environments.length > 0
                                    ? integration.environments.find(
                                        (e) => e.id === selectedEnvironmentId,
                                      )
                                    : undefined,
                                ),
                              ),
                          }}
                          style={{
                            marginTop: "0.5rem",
                            backgroundColor:
                              "var(--vscode-textCodeBlock-background)",
                            color: "var(--vscode-textPreformat-foreground)",
                            border: "1px solid var(--vscode-panel-border)",
                            padding: "0.75rem",
                            borderRadius: "4px",
                            fontSize: "0.85rem",
                            wordBreak: "break-all",
                          }}
                        >
                          {generateDatapilotCommand(
                            integration,
                            selectedEnvironmentId &&
                              integration.environments &&
                              integration.environments.length > 0
                              ? integration.environments.find(
                                  (e) => e.id === selectedEnvironmentId,
                                )
                              : undefined,
                          )}
                        </Paragraph>
                      </>
                    )}
                  </Panel>
                ))}
              </Collapse>
            </div>
          )}

        {(!showExistingIntegrations || showCreateForm) &&
          !integrationCreated && (
            <>
              {showCreateForm && showExistingIntegrations && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <Button
                    size="large"
                    onClick={() => setShowCreateForm(false)}
                    style={{ marginBottom: "1rem" }}
                  >
                    ← Back to Integrations
                  </Button>
                </div>
              )}

              <Title level={4} style={{ marginBottom: "1.5rem" }}>
                Create dbt Integration
              </Title>

              <div className={classes.formGroup}>
                <label htmlFor="project" className={classes.formLabel}>
                  dbt Project:
                </label>
                {isLoadingProjects ? (
                  <div style={{ padding: "0.5rem 0" }}>Loading projects...</div>
                ) : projects.length === 0 ? (
                  <Alert
                    message="No dbt projects found"
                    description="Please ensure a dbt project is open in your workspace."
                    type="warning"
                    showIcon
                  />
                ) : projects.length === 1 ? (
                  <Input
                    id="project"
                    value={selectedProject}
                    disabled
                    size="large"
                    style={{
                      backgroundColor: "var(--vscode-input-background)",
                    }}
                  />
                ) : (
                  <Select
                    id="project"
                    value={selectedProject}
                    onChange={setSelectedProject}
                    disabled={isCreatingIntegration}
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Select a dbt project"
                    options={projects.map((p) => ({
                      label: p.label,
                      value: p.label,
                    }))}
                  />
                )}
              </div>

              <div className={classes.formGroup}>
                <label htmlFor="environment" className={classes.formLabel}>
                  Environment:
                </label>
                <Input
                  id="environment"
                  placeholder="Production"
                  value={environment}
                  onChange={(e) => setEnvironment(e.target.value)}
                  disabled={isCreatingIntegration}
                  size="large"
                />
              </div>

              <div className={classes.formGroup}>
                <label className={classes.formLabel}>Integration Type:</label>
                <Radio.Group
                  value={integrationType}
                  onChange={(e) =>
                    setIntegrationType(e.target.value as IntegrationType)
                  }
                  disabled={isCreatingIntegration}
                >
                  <Radio value="dbt_core">
                    <div className={classes.radioOption}>
                      <strong>dbt Core</strong>
                      <p className={classes.radioDescription}>
                        For dbt Core projects
                      </p>
                    </div>
                  </Radio>
                  <Radio value="dbt_cloud">
                    <div className={classes.radioOption}>
                      <strong>dbt Cloud</strong>
                      <p className={classes.radioDescription}>
                        For dbt Cloud projects
                      </p>
                    </div>
                  </Radio>
                </Radio.Group>
              </div>
            </>
          )}

        {(!showExistingIntegrations || showCreateForm) && (
          <Stack direction="row" className={classes.dbtIntegrationActions}>
            {!integrationCreated && (
              <Button
                type="primary"
                size="large"
                onClick={handleCreateIntegration}
                loading={isCreatingIntegration}
              >
                Create Integration
              </Button>
            )}
          </Stack>
        )}

        <div className={classes.helpText}>
          <p>
            Need help?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                void openUrl("https://docs.myaltimate.com/setup/integrations/");
              }}
              style={{ cursor: "pointer" }}
            >
              View integration documentation
            </a>
          </p>
        </div>
      </div>
    );
  }

  // If Altimate is not configured, show the API key setup screen
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
              message="API key saved successfully! Now let's set up your dbt integration..."
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
              <li>Navigate to Settings → API Keys</li>
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
