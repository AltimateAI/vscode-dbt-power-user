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

const { Text, Paragraph } = Typography;
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
      setExistingIntegrations(response || []);
      setShowExistingIntegrations((response || []).length > 0);
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

  const handleSignUp = () => {
    window.open("https://app.myaltimate.com/register", "_blank");
  };

  const generateDatapilotCommand = (
    integration: Integration,
    env?: IntegrationEnvironment,
  ) => {
    // Use configuration values from state
    const backendURL =
      altimateConfig.backendURL || "https://api.myaltimate.com";
    const configInstanceName =
      altimateConfig.instanceName || "YOUR_INSTANCE_NAME";
    const configApiKey = altimateConfig.apiKey || "YOUR_API_KEY";

    const baseCommand = `datapilot dbt onboard --backend-url ${backendURL} --token ${configApiKey} --instance-name ${configInstanceName} --manifest-path ./target/manifest.json --catalog-path ./target/catalog.json`;

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
        <div className={classes.dbtIntegrationInfo}>
          <h3 className={classes.sectionTitle}>
            🎉 Altimate AI is configured!
          </h3>
          <p className={classes.subtitle}>
            Now, create a dbt integration to unlock powerful collaboration
            features:
          </p>

          <div className={classes.featuresGrid}>
            <Stack direction="row" className={classes.featureRow}>
              <div className={classes.featureItem}>
                <span className={classes.iconChat}>💬</span>
                <span className={classes.featureText}>
                  Get instant answers about your models, tests, and production
                  runs
                </span>
              </div>

              <div className={classes.featureItem}>
                <span className={classes.iconSearch}>🔍</span>
                <span className={classes.featureText}>
                  Explore and search faster within your dbt project
                </span>
              </div>
            </Stack>

            <Stack direction="row" className={classes.featureRow}>
              <div className={classes.featureItem}>
                <span className={classes.iconBrain}>🧠</span>
                <span className={classes.featureText}>
                  Visualize model, column and SQL lineage with clarity
                </span>
              </div>

              <div className={classes.featureItem}>
                <span className={classes.iconChart}>📈</span>
                <span className={classes.featureText}>
                  Get checks on performance, tests, and structure
                </span>
              </div>
            </Stack>

            <Stack direction="row" className={classes.featureRow}>
              <div className={classes.featureItem}>
                <span className={classes.iconMagic}>🪄</span>
                <span className={classes.featureText}>
                  Gain actionable recommendations to optimize your dbt project
                </span>
              </div>

              <div className={classes.featureItem}>
                <span className={classes.iconGear}>⚙️</span>
                <span className={classes.featureText}>
                  Collaborate with your team on code and documentation
                </span>
              </div>
            </Stack>
          </div>
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
                  <h4 className={classes.sectionTitle}>
                    Existing Integrations
                  </h4>
                  <p className={classes.subtitle}>
                    You have {existingIntegrations.length} existing integration
                    {existingIntegrations.length > 1 ? "s" : ""}. Select an
                    integration to view the datapilot CLI command for syncing
                    your dbt project data.
                  </p>
                </div>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => setShowCreateForm(true)}
                >
                  Create New Integration
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
  }

  // If Altimate is not configured, show the API key setup screen
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

      <Stack direction="row" className={classes.altimateKeyActions}>
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

export default AltimateSetupStep;
