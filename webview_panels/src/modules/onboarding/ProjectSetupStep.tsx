import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { Stack } from "@uicore";
import { Alert, Button, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import classes from "./onboarding.module.scss";

interface Project {
  label: string;
  projectRoot: string;
}

interface ProjectSetupStepProps {
  onComplete?: () => void;
}

type SetupState =
  | "idle"
  | "loading"
  | "running-deps"
  | "validating"
  | "complete"
  | "error";

const ProjectSetupStep = ({
  onComplete,
}: ProjectSetupStepProps): JSX.Element => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | undefined>();
  const [setupState, setSetupState] = useState<SetupState>("idle");
  const [error, setError] = useState<string | undefined>();
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    // Fetch available projects on mount
    const fetchProjects = async () => {
      try {
        setSetupState("loading");
        const projectList = (await executeRequestInSync(
          "getProjects",
          {},
        )) as Project[];
        setProjects(projectList ?? []);

        // Auto-select if only one project
        if (projectList && projectList.length === 1) {
          setSelectedProject(projectList[0].projectRoot);
        }
        setSetupState("idle");
      } catch (err) {
        panelLogger.error("Error fetching projects", err);
        setError(
          "Failed to load projects. Please ensure you have a dbt project open.",
        );
        setSetupState("error");
      }
    };

    void fetchProjects();
  }, []);

  const handleSetupProject = async () => {
    if (!selectedProject) {
      setError("Please select a project first");
      return;
    }

    try {
      setError(undefined);

      // Step 1: Run dbt deps
      setSetupState("running-deps");
      setStatusMessage("Installing dbt dependencies...");
      await executeRequestInSync("runDbtDeps", {
        projectRoot: selectedProject,
      });

      // Step 2: Validate project
      setSetupState("validating");
      setStatusMessage("Validating project setup...");
      await executeRequestInSync("validateProject", {
        projectRoot: selectedProject,
      });

      setSetupState("complete");
      setStatusMessage("Project setup completed successfully!");

      // Call onComplete callback if provided
      if (onComplete) {
        setTimeout(onComplete, 1500);
      }
    } catch (err) {
      panelLogger.error("Error setting up project", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to setup project. Check the terminal for details.",
      );
      setSetupState("error");
    }
  };

  const isLoading = setupState === "loading";
  const isRunning =
    setupState === "running-deps" || setupState === "validating";
  const isComplete = setupState === "complete";

  return (
    <div className={classes.projectSetupContainer}>
      {isLoading ? (
        <div className={classes.loadingContainer}>
          <Spin size="large" />
          <p>Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <Alert
          message="No dbt projects found"
          description="Please ensure you have a dbt project open in your workspace."
          type="warning"
          showIcon
        />
      ) : (
        <>
          <div className={classes.projectSelector}>
            <label htmlFor="project-select" className={classes.projectLabel}>
              Select your dbt project:
            </label>
            <Select
              id="project-select"
              style={{ width: "100%" }}
              placeholder="Choose a project"
              value={selectedProject}
              onChange={setSelectedProject}
              disabled={isRunning || isComplete}
              size="large"
              options={projects.map((project) => ({
                label: project.label,
                value: project.projectRoot,
              }))}
            />
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

          {isRunning && (
            <Alert
              message={statusMessage}
              type="info"
              showIcon
              icon={<Spin size="small" />}
              className={classes.alertMessage}
            />
          )}

          {isComplete && (
            <Alert
              message={statusMessage}
              type="success"
              showIcon
              className={classes.alertMessage}
            />
          )}

          <Stack direction="column" className={classes.setupActions}>
            <Button
              type="primary"
              size="large"
              onClick={handleSetupProject}
              disabled={!selectedProject || isRunning || isComplete}
              loading={isRunning}
              style={{ width: "100%" }}
            >
              {isComplete
                ? "Setup Complete"
                : isRunning
                  ? "Setting up..."
                  : "Setup Project"}
            </Button>

            {!isComplete && (
              <div className={classes.setupInfo}>
                <p>This will:</p>
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
          </Stack>
        </>
      )}
    </div>
  );
};

export default ProjectSetupStep;
