import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CodeOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { Alert, Button, Card, Radio, Select, Space, Spin } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import InstallDbtStep from "./InstallDbtStep";
import classes from "./onboarding.module.scss";

// dbt Logo component
const DbtLogo = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size * 0.9}
    viewBox="0 0 90 81"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M77.5499 3.37C79.4499 5.2 80.7 7.62 80.99 10.25C80.99 11.35 80.6999 12.08 80.0399 13.47C79.3799 14.86 71.25 28.92 68.83 32.8C67.44 35.07 66.71 37.78 66.71 40.42C66.71 43.06 67.44 45.77 68.83 48.04C71.25 51.92 79.3799 66.06 80.0399 67.45C80.6999 68.84 80.99 69.5 80.99 70.6C80.7 73.24 79.53 75.65 77.62 77.41C75.79 79.31 73.3699 80.56 70.8099 80.78C69.7099 80.78 68.9799 80.49 67.6599 79.83C66.3399 79.17 51.99 71.26 48.11 68.84C47.82 68.69 47.5199 68.47 47.1599 68.33L27.97 56.98C28.41 60.64 30.0199 64.16 32.6599 66.72C33.1699 67.23 33.6899 67.67 34.2699 68.11C33.8299 68.33 33.32 68.55 32.88 68.84C29 71.26 14.86 79.39 13.47 80.05C12.08 80.71 11.42 81 10.25 81C7.61 80.71 5.19994 79.54 3.43994 77.63C1.53994 75.8 0.29 73.38 0 70.75C0.07 69.65 0.369951 68.55 0.949951 67.6C1.60995 66.21 9.73991 52.07 12.1599 48.19C13.5499 45.92 14.2799 43.28 14.2799 40.57C14.2799 37.86 13.5499 35.22 12.1599 32.95C9.73991 28.92 1.53995 14.79 0.949951 13.4C0.359951 12.45 0.07 11.35 0 10.25C0.29 7.61 1.46 5.2 3.37 3.37C5.19 1.46 7.59999 0.29 10.24 0C11.34 0.07 12.44 0.37 13.46 0.95C14.63 1.46 24.96 7.47 30.45 10.69L31.7 11.42C32.1399 11.71 32.5099 11.93 32.7999 12.08L33.39 12.45L52.9399 24.02C52.4999 19.63 50.23 15.6 46.71 12.89C47.15 12.67 47.66 12.45 48.1 12.16C51.98 9.74 66.12 1.54 67.51 0.95C68.46 0.37 69.56 0.07 70.73 0C73.29 0.29 75.7099 1.46 77.5399 3.37H77.5499ZM41.5199 45.7L45.6899 41.53C46.2799 40.94 46.2799 40.07 45.6899 39.48L41.5199 35.31C40.9299 34.72 40.06 34.72 39.47 35.31L35.2999 39.48C34.7099 40.07 34.7099 40.94 35.2999 41.53L39.47 45.7C39.98 46.21 40.9299 46.21 41.5199 45.7Z"
      fill="#FF694A"
    />
  </svg>
);

interface DiagnosticsStatus {
  pythonInstalled: boolean;
  dbtInstalled: boolean;
  projectsFound: boolean;
  projectCount: number;
  workspaceCount: number;
  dbtIntegrationMode: string;
  pythonPath?: string;
  pythonVersion?: string;
  dbtVersion?: string;
  dbtPath?: string;
  fileAssociationsConfigured: boolean;
}

type DbtIntegrationType = "core" | "fusion" | "cloud";

type CheckStatus = "pending" | "checking" | "success" | "error";

interface PrerequisiteCheck {
  id: string;
  title: string;
  description: string;
  status: CheckStatus;
  icon: React.ReactNode;
  action?: {
    label: string;
    command?: string;
    customAction?: () => void;
  };
}

interface Project {
  label: string;
  projectRoot: string;
}

type ValidationState =
  | "idle"
  | "loading"
  | "running-deps"
  | "validating"
  | "complete"
  | "error";

type WizardPhase = "prerequisites" | "validation";

export interface PrerequisitesStepHandle {
  triggerNext: () => void;
}

interface PrerequisitesStepProps {
  phase: WizardPhase;
  onComplete?: () => void;
  onReadyChange?: (ready: boolean, loading?: boolean) => void;
}

const PrerequisitesStep = forwardRef<
  PrerequisitesStepHandle,
  PrerequisitesStepProps
>(({ phase, onComplete, onReadyChange }, ref) => {
  const [checking, setChecking] = useState(false);
  const [showInstallDbt, setShowInstallDbt] = useState(false);
  const [diagnostics, setDiagnostics] = useState<DiagnosticsStatus | null>(
    null,
  );
  const [error, setError] = useState<string | undefined>();
  const [dbtIntegrationType, setDbtIntegrationType] =
    useState<DbtIntegrationType>("core");
  const [changingIntegration, setChangingIntegration] = useState(false);
  const [showIntegrationOptions, setShowIntegrationOptions] = useState(false);
  const [expandedCheckId, setExpandedCheckId] = useState<string | null>(null);
  const [validationState, setValidationState] =
    useState<ValidationState>("idle");
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | undefined>();
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [checks, setChecks] = useState<PrerequisiteCheck[]>([
    {
      id: "project",
      title: "dbt Project",
      description: "A dbt project folder must be open in VSCode",
      status: "pending",
      icon: <FolderOpenOutlined />,
      action: {
        label: "Open Folder",
        command: "vscode.openFolder",
      },
    },
    {
      id: "python",
      title: "Python Interpreter",
      description: "Python interpreter must be configured",
      status: "pending",
      icon: <CodeOutlined />,
      action: {
        label: "Select Interpreter",
        command: "python.setInterpreter",
      },
    },
    {
      id: "dbt",
      title: "dbt Installation",
      description: "dbt must be installed",
      status: "pending",
      icon: <DbtLogo size={24} />,
      action: {
        label: "Install dbt",
        customAction: () => setShowInstallDbt(true),
      },
    },
    {
      id: "fileAssociations",
      title: "File Associations",
      description:
        "SQL and YAML files should be associated with dbt file types",
      status: "pending",
      icon: <FileTextOutlined />,
      action: {
        label: "Configure",
        customAction: async () => {
          try {
            await executeRequestInSync("configureFileAssociations", {});
            // Re-run diagnostics after configuring
            setTimeout(() => void runDiagnostics(), 500);
          } catch (err) {
            panelLogger.error("Error configuring file associations", err);
            setError(
              err instanceof Error
                ? err.message
                : "Failed to configure file associations",
            );
          }
        },
      },
    },
  ]);

  const runDiagnostics = async () => {
    try {
      setChecking(true);
      setError(undefined);

      // Set all checks to "checking" status
      setChecks((prev) =>
        prev.map((check) => ({ ...check, status: "checking" as CheckStatus })),
      );

      const status = (await executeRequestInSync(
        "getDiagnosticsStatus",
        {},
      )) as DiagnosticsStatus;

      setDiagnostics(status);
      setDbtIntegrationType(
        (status.dbtIntegrationMode as DbtIntegrationType) || "core",
      );

      // Update check statuses based on diagnostics
      setChecks((prev) =>
        prev.map((check) => {
          let newStatus: CheckStatus = "pending";

          if (check.id === "project") {
            newStatus = status.projectsFound ? "success" : "error";
          } else if (check.id === "python") {
            newStatus = status.pythonInstalled ? "success" : "error";
          } else if (check.id === "dbt") {
            newStatus = status.dbtInstalled ? "success" : "error";
          } else if (check.id === "fileAssociations") {
            newStatus = status.fileAssociationsConfigured ? "success" : "error";
          }

          return { ...check, status: newStatus };
        }),
      );
    } catch (err) {
      panelLogger.error("Error running diagnostics", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to run diagnostics. Please try again.",
      );

      // Set all checks to error
      setChecks((prev) =>
        prev.map((check) => ({ ...check, status: "error" as CheckStatus })),
      );
    } finally {
      setChecking(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const projectList = (await executeRequestInSync(
        "getProjects",
        {},
      )) as Project[];
      setProjects(projectList ?? []);

      // Auto-select if only one project
      if (projectList && projectList.length === 1) {
        setSelectedProject(projectList[0].projectRoot);
      }
    } catch (err) {
      panelLogger.error("Error fetching projects", err);
      setError(
        "Failed to load projects. Please ensure you have a dbt project open.",
      );
    }
  };

  const handleValidateSetup = async () => {
    if (!selectedProject) {
      setError("Please select a project first");
      return;
    }

    try {
      setError(undefined);

      // Step 1: Run dbt deps
      setValidationState("running-deps");
      setStatusMessage("Installing dbt dependencies...");
      await executeRequestInSync("runDbtDeps", {
        projectRoot: selectedProject,
      });

      // Step 2: Validate project
      setValidationState("validating");
      setStatusMessage("Validating project setup...");
      await executeRequestInSync("validateProject", {
        projectRoot: selectedProject,
      });

      setValidationState("complete");
      setStatusMessage("Project setup completed successfully!");
    } catch (err) {
      panelLogger.error("Error validating setup", err);
      setValidationState("error");
    }
  };

  useEffect(() => {
    // Run diagnostics on mount
    void runDiagnostics();
    // Fetch projects on mount
    void fetchProjects();

    // Listen for Python environment changes
    const handleMessage = (event: MessageEvent) => {
      const data = event.data as { command?: string };
      if (data.command === "pythonEnvironmentChanged") {
        panelLogger.info(
          "PrerequisitesStep",
          "Python environment changed, refreshing diagnostics",
        );
        void runDiagnostics();
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleAction = async (check: PrerequisiteCheck) => {
    if (check.action?.customAction) {
      check.action.customAction();
    } else if (check.action?.command) {
      try {
        await executeRequestInSync("executeCommand", {
          vscodeCommand: check.action.command,
        });

        // Re-run diagnostics after executing command
        setTimeout(() => void runDiagnostics(), 1000);
      } catch (err) {
        panelLogger.error(`Error executing action for ${check.id}`, err);
        setError(
          err instanceof Error
            ? err.message
            : `Failed to execute ${check.action.label}`,
        );
      }
    }
  };

  const handleDbtInstallComplete = () => {
    setShowInstallDbt(false);
    // Re-run diagnostics after dbt installation
    void runDiagnostics();
  };

  const handleDbtInstallSkip = () => {
    setShowInstallDbt(false);
  };

  const handleIntegrationTypeChange = async (newType: DbtIntegrationType) => {
    try {
      setChangingIntegration(true);
      setError(undefined);

      await executeRequestInSync("setDbtIntegration", {
        integrationType: newType,
      });

      setDbtIntegrationType(newType);

      // Re-run diagnostics after changing integration type
      setTimeout(() => void runDiagnostics(), 500);
    } catch (err) {
      panelLogger.error("Error changing dbt integration type", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to change dbt integration type",
      );
    } finally {
      setChangingIntegration(false);
    }
  };

  const getStatusIcon = (status: CheckStatus) => {
    switch (status) {
      case "checking":
        return <SyncOutlined spin style={{ color: "#1890ff" }} />;
      case "success":
        return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
      case "error":
        return <CloseCircleOutlined style={{ color: "#ff4d4f" }} />;
      default:
        return null;
    }
  };

  const allChecksPassed =
    diagnostics?.pythonInstalled &&
    diagnostics?.dbtInstalled &&
    diagnostics?.projectsFound &&
    diagnostics?.fileAssociationsConfigured;

  const isValidating =
    validationState === "running-deps" || validationState === "validating";
  const isValidationComplete = validationState === "complete";

  // Report readiness to parent wizard
  const isStepReady = phase === "prerequisites" ? !!allChecksPassed : true;

  useEffect(() => {
    onReadyChange?.(isStepReady);
  }, [isStepReady]);

  useImperativeHandle(ref, () => ({
    triggerNext: () => {
      onComplete?.();
    },
  }));

  const getCheckDetails = (checkId: string): React.ReactNode => {
    if (!diagnostics) return null;

    const detailStyle = {
      marginTop: "0.5rem",
      fontSize: "0.9rem",
      color: "var(--vscode-foreground)",
    };

    const labelStyle = {
      margin: "0.25rem 0",
      color: "var(--vscode-foreground)",
    };

    const codeStyle = {
      fontSize: "0.85rem",
      backgroundColor: "var(--vscode-textCodeBlock-background)",
      color: "var(--vscode-editor-foreground)",
      padding: "0.125rem 0.25rem",
      borderRadius: "3px",
      fontFamily: "var(--vscode-editor-font-family)",
    };

    switch (checkId) {
      case "project":
        return (
          <div style={detailStyle}>
            <p style={labelStyle}>
              <strong>Projects found:</strong> {diagnostics.projectCount}
            </p>
            <p style={labelStyle}>
              <strong>Workspaces:</strong> {diagnostics.workspaceCount}
            </p>
          </div>
        );
      case "python":
        return (
          <div
            style={{
              ...detailStyle,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                {diagnostics.pythonPath && (
                  <p
                    style={{ ...labelStyle, wordBreak: "break-all", margin: 0 }}
                  >
                    <strong>Path:</strong>{" "}
                    <code style={codeStyle}>{diagnostics.pythonPath}</code>
                  </p>
                )}
                {diagnostics.pythonVersion && (
                  <p style={{ ...labelStyle, margin: "0.25rem 0 0 0" }}>
                    <strong>Version:</strong> {diagnostics.pythonVersion}
                  </p>
                )}
              </div>
              <Button
                size="small"
                onClick={async (e) => {
                  e.stopPropagation();
                  const check = checks.find((c) => c.id === "python");
                  if (check) {
                    await handleAction(check);
                  }
                }}
                disabled={checking}
              >
                Change
              </Button>
            </div>
          </div>
        );
      case "dbt":
        return (
          <div style={detailStyle}>
            {diagnostics.dbtVersion && (
              <p style={labelStyle}>
                <strong>Version:</strong> {diagnostics.dbtVersion}
              </p>
            )}
            {diagnostics.dbtPath && (
              <p style={{ ...labelStyle, wordBreak: "break-all" }}>
                <strong>Path:</strong>{" "}
                <code style={codeStyle}>{diagnostics.dbtPath}</code>
              </p>
            )}
            <p style={labelStyle}>
              <strong>Integration mode:</strong>{" "}
              {diagnostics.dbtIntegrationMode}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const toggleCheckDetails = (checkId: string) => {
    setExpandedCheckId(expandedCheckId === checkId ? null : checkId);
  };

  if (showInstallDbt) {
    return (
      <div className={classes.prerequisitesContainer}>
        <InstallDbtStep
          onComplete={handleDbtInstallComplete}
          onSkip={handleDbtInstallSkip}
        />
      </div>
    );
  }

  return (
    <div className={classes.prerequisitesContainer}>
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(undefined)}
          className={classes.alertMessage}
          style={{ marginTop: "1.5rem" }}
        />
      )}

      {phase === "prerequisites" && (
        <>
          <div className={classes.prerequisitesInfo}>
            <p>
              Before you can use dbt Power User, we need to ensure the following
              prerequisites are met:
            </p>
          </div>

          {allChecksPassed && (
            <Alert
              message="All prerequisites met!"
              description="Your environment is properly configured. Click 'Next' to continue."
              type="success"
              showIcon
              className={classes.alertMessage}
            />
          )}

          {diagnostics && !allChecksPassed && (
            <Alert
              message="Some prerequisites are not met"
              description={
                <div>
                  <p style={{ margin: "0 0 0.5rem 0" }}>
                    Please resolve the issues below, then recheck.
                  </p>
                  <Button
                    size="large"
                    onClick={() => void runDiagnostics()}
                    disabled={checking}
                    icon={checking ? <SyncOutlined spin /> : <SyncOutlined />}
                  >
                    {checking ? "Checking..." : "Recheck Prerequisites"}
                  </Button>
                </div>
              }
              type="warning"
              showIcon
              className={classes.alertMessage}
            />
          )}

          <Card className={classes.prerequisiteCard}>
            <div className={classes.prerequisiteCardHeader}>
              <div className={classes.prerequisiteCardTitle}>
                <span className={classes.prerequisiteIcon}>
                  <DatabaseOutlined />
                </span>
                <div>
                  <h3>dbt Integration Type</h3>
                  {!showIntegrationOptions && (
                    <>
                      <p className={classes.prerequisiteDescription}>
                        <strong>
                          {dbtIntegrationType === "core" && "dbt Core"}
                          {dbtIntegrationType === "fusion" &&
                            "dbt Fusion (beta)"}
                          {dbtIntegrationType === "cloud" && "dbt Cloud CLI"}
                        </strong>
                        {" - "}
                        {dbtIntegrationType === "core" &&
                          "Local dbt installation via Python"}
                        {dbtIntegrationType === "fusion" &&
                          "dbt Fusion CLI for enhanced performance"}
                        {dbtIntegrationType === "cloud" &&
                          "Connect to dbt Cloud"}
                      </p>
                    </>
                  )}
                </div>
              </div>
              {!showIntegrationOptions && (
                <Button
                  onClick={() => setShowIntegrationOptions(true)}
                  disabled={changingIntegration || checking}
                >
                  Change
                </Button>
              )}
            </div>

            {showIntegrationOptions && (
              <div className={classes.prerequisiteAction}>
                <p
                  className={classes.prerequisiteDescription}
                  style={{ marginBottom: "1rem" }}
                >
                  Choose how dbt Power User connects to dbt. You can change this
                  later in settings.
                </p>
                <Radio.Group
                  value={dbtIntegrationType}
                  onChange={(e) => {
                    void handleIntegrationTypeChange(
                      e.target.value as DbtIntegrationType,
                    );
                    setShowIntegrationOptions(false);
                  }}
                  disabled={changingIntegration || checking}
                >
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    <Radio value="core">
                      <div className={classes.radioOption}>
                        <strong>dbt Core</strong>
                        <p className={classes.radioDescription}>
                          Use local dbt installation via Python. Best for local
                          development with full control.
                        </p>
                      </div>
                    </Radio>
                    <Radio value="fusion">
                      <div className={classes.radioOption}>
                        <strong>dbt Fusion (beta)</strong>
                        <p className={classes.radioDescription}>
                          Use dbt Fusion CLI for enhanced performance and
                          additional features (beta)
                        </p>
                      </div>
                    </Radio>
                    <Radio value="cloud">
                      <div className={classes.radioOption}>
                        <strong>dbt Cloud CLI</strong>
                        <p className={classes.radioDescription}>
                          Connect to dbt Cloud for teams using dbt Cloud CLI
                        </p>
                      </div>
                    </Radio>
                  </Space>
                </Radio.Group>
                <div style={{ marginTop: "1rem" }}>
                  <Button onClick={() => setShowIntegrationOptions(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </Card>

          <div className={classes.prerequisiteChecks}>
            {checks.map((check) => (
              <Card
                key={check.id}
                className={classes.prerequisiteCard}
                onClick={() =>
                  check.status === "success" && toggleCheckDetails(check.id)
                }
                style={{
                  cursor: check.status === "success" ? "pointer" : "default",
                }}
              >
                <div className={classes.prerequisiteCardHeader}>
                  <div className={classes.prerequisiteCardTitle}>
                    <span className={classes.prerequisiteIcon}>
                      {check.icon}
                    </span>
                    <div style={{ flex: 1 }}>
                      <h3>{check.title}</h3>
                      <p className={classes.prerequisiteDescription}>
                        {check.description}
                      </p>
                      {check.status === "success" &&
                        expandedCheckId === check.id &&
                        getCheckDetails(check.id)}
                    </div>
                  </div>
                  <div className={classes.prerequisiteStatus}>
                    {getStatusIcon(check.status)}
                  </div>
                </div>

                {check.status === "error" && check.action && (
                  <div className={classes.prerequisiteAction}>
                    <Button
                      type="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        void handleAction(check);
                      }}
                      disabled={checking}
                    >
                      {check.action.label}
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </>
      )}

      {phase === "validation" && (
        <>
          <div className={classes.validationSection}>
            <h3>Validate Setup</h3>
            <p>Select your dbt project and validate your setup.</p>
          </div>

          {projects.length > 0 ? (
            <Card className={classes.prerequisiteCard}>
              <div className={classes.projectSelector}>
                <label
                  htmlFor="project-select"
                  className={classes.prerequisiteDescription}
                >
                  <strong>Select your dbt project:</strong>
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "0.5rem",
                    minWidth: 0,
                  }}
                >
                  <Select
                    id="project-select"
                    style={{ flex: 1, minWidth: 0 }}
                    placeholder="Choose a project"
                    value={selectedProject}
                    onChange={setSelectedProject}
                    disabled={isValidating || isValidationComplete}
                    size="large"
                    options={projects.map((project) => ({
                      label: project.label,
                      value: project.projectRoot,
                    }))}
                  />
                  <Button
                    type="primary"
                    size="large"
                    style={{ flexShrink: 0 }}
                    onClick={() => void handleValidateSetup()}
                    loading={isValidating}
                    disabled={!selectedProject || isValidating}
                  >
                    {isValidating ? "Validating..." : "Validate Setup"}
                  </Button>
                </div>
              </div>

              {isValidating && (
                <Alert
                  message={statusMessage}
                  type="info"
                  showIcon
                  icon={<Spin size="small" />}
                  className={classes.alertMessage}
                  style={{ marginTop: "1rem" }}
                />
              )}

              {isValidationComplete && (
                <Alert
                  message={statusMessage}
                  type="success"
                  showIcon
                  className={classes.alertMessage}
                  style={{ marginTop: "1rem" }}
                />
              )}

              {!isValidationComplete && selectedProject && (
                <div
                  className={classes.setupInfo}
                  style={{ marginTop: "1rem" }}
                >
                  <p>
                    <strong>This will:</strong>
                  </p>
                  <ul>
                    <li>
                      Select the project:{" "}
                      <strong>
                        {projects.find((p) => p.projectRoot === selectedProject)
                          ?.label ?? "..."}
                      </strong>
                    </li>
                    <li>
                      Run <code>dbt deps</code> to install packages
                    </li>
                    <li>
                      Run <code>dbt debug</code> to validate your setup
                    </li>
                  </ul>
                </div>
              )}
            </Card>
          ) : (
            <Alert
              message="No dbt projects found"
              description="Please ensure you have a dbt project open in your workspace."
              type="warning"
              showIcon
            />
          )}
        </>
      )}
    </div>
  );
});

PrerequisitesStep.displayName = "PrerequisitesStep";

export default PrerequisitesStep;
