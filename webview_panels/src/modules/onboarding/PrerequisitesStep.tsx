import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CodeOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  SyncOutlined,
  ToolOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { Alert, Button, Card, Radio, Select, Space, Spin } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import InstallDbtStep from "./InstallDbtStep";
import classes from "./onboarding.module.scss";

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

type CheckStatus = "pending" | "checking" | "success" | "warning" | "error";

interface CheckAction {
  label: string;
  command?: string;
  customAction?: () => void;
}

interface PrerequisiteCheck {
  id: string;
  title: string;
  description: string;
  status: CheckStatus;
  icon: React.ReactNode;
  action?: CheckAction;
  secondaryAction?: CheckAction;
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
      secondaryAction: {
        label: "Detect from terminal",
        command: "dbtPowerUser.detectPythonFromTerminal",
      },
    },
    {
      id: "dbt",
      title: "dbt Installation",
      description: "dbt must be installed",
      status: "pending",
      icon: <ToolOutlined />,
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

  const runDiagnostics = async (silent = false) => {
    try {
      if (!silent) {
        setChecking(true);
        setError(undefined);

        // Set all checks to "checking" status
        setChecks((prev) =>
          prev.map((check) => ({
            ...check,
            status: "checking" as CheckStatus,
          })),
        );
      }

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
            if (!status.pythonInstalled) {
              newStatus = "error";
            } else if (!status.dbtInstalled) {
              // Python found but dbt is not installed in this interpreter
              newStatus = "warning";
            } else {
              newStatus = "success";
            }
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
      if (!silent) {
        setChecking(false);
      }
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
        void runDiagnostics(true);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const executeCheckAction = async (action: CheckAction, checkId: string) => {
    if (action.customAction) {
      action.customAction();
    } else if (action.command) {
      try {
        await executeRequestInSync("executeCommand", {
          vscodeCommand: action.command,
        });

        // Re-run diagnostics after executing command
        setTimeout(() => void runDiagnostics(), 1000);
      } catch (err) {
        panelLogger.error(`Error executing action for ${checkId}`, err);
        setError(
          err instanceof Error
            ? err.message
            : `Failed to execute ${action.label}`,
        );
      }
    }
  };

  const handleAction = async (check: PrerequisiteCheck) => {
    if (check.action) {
      await executeCheckAction(check.action, check.id);
    }
  };

  const handleSecondaryAction = async (check: PrerequisiteCheck) => {
    if (check.secondaryAction) {
      await executeCheckAction(check.secondaryAction, check.id);
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
      case "warning":
        return <WarningOutlined style={{ color: "#faad14" }} />;
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
      case "python": {
        const pythonCheck = checks.find((c) => c.id === "python");
        const showDetailButtons = pythonCheck?.status === "success";
        return (
          <div style={detailStyle}>
            {diagnostics.pythonPath && (
              <p style={{ ...labelStyle, wordBreak: "break-all", margin: 0 }}>
                <strong>Path:</strong>{" "}
                <code style={codeStyle}>{diagnostics.pythonPath}</code>
              </p>
            )}
            {diagnostics.pythonVersion && (
              <p style={{ ...labelStyle, margin: "0.25rem 0 0 0" }}>
                <strong>Version:</strong> {diagnostics.pythonVersion}
              </p>
            )}
            {showDetailButtons && (
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginTop: "0.5rem",
                }}
              >
                <Button
                  size="small"
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (pythonCheck) {
                      await handleAction(pythonCheck);
                    }
                  }}
                  disabled={checking}
                >
                  Change
                </Button>
                <Button
                  size="small"
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (pythonCheck) {
                      await handleSecondaryAction(pythonCheck);
                    }
                  }}
                  disabled={checking}
                >
                  Detect from terminal
                </Button>
              </div>
            )}
          </div>
        );
      }
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
          initialIntegrationType={dbtIntegrationType}
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
              Before you can use Power User for dbt™, we need to ensure the
              following prerequisites are met:
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
                  Choose how Power User for dbt™ connects to dbt. You can change
                  this later in settings.
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
            {checks.map((check) => {
              const canExpand =
                check.status === "success" || check.status === "warning";
              return (
                <Card
                  key={check.id}
                  className={classes.prerequisiteCard}
                  onClick={() => canExpand && toggleCheckDetails(check.id)}
                  style={{
                    cursor: canExpand ? "pointer" : "default",
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
                          {check.status === "warning"
                            ? "Python found, but dbt is not installed in this interpreter"
                            : check.description}
                        </p>
                        {canExpand &&
                          expandedCheckId === check.id &&
                          getCheckDetails(check.id)}
                      </div>
                    </div>
                    <div className={classes.prerequisiteStatus}>
                      {getStatusIcon(check.status)}
                    </div>
                  </div>

                  {(check.status === "error" || check.status === "warning") &&
                    check.action && (
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
                        {check.secondaryAction && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              void handleSecondaryAction(check);
                            }}
                            disabled={checking}
                            style={{ marginLeft: "0.5rem" }}
                          >
                            {check.secondaryAction.label}
                          </Button>
                        )}
                      </div>
                    )}
                </Card>
              );
            })}
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
