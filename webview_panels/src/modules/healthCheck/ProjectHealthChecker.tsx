import {
  Card,
  CardTitle,
  Tag,
  CardBody,
  CardText,
  Button,
  Stack,
  Accordion,
  Dropdown,
} from "@uicore";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "../app/requestExecutor";
import classes from "./healthcheck.module.scss";
import { useCallback, useEffect, useState } from "react";
import { panelLogger } from "@modules/logger";
import { ArrowUpIcon, ArrowDownIcon, FolderIcon } from "@assets/icons";

const ProjectHealthcheckInput = (): JSX.Element => {
  const [projects, setProjects] = useState<
    { projectName: string; projectRoot: string }[]
  >([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [configs, setConfigs] = useState<{ label: string; value: string }[]>(
    [],
  );
  const [selectedConfig, setSelectedConfig] = useState("manual");

  const getProjects = useCallback(async () => {
    const result = (await executeRequestInSync("getProjects", {})) as {
      projectName: string;
      projectRoot: string;
    }[];
    setProjects(result);
    if (result.length === 1) {
      setSelectedProject(result[0].projectRoot);
    }
  }, []);

  useEffect(() => {
    panelLogger.log("project health");
    void getProjects();
    setConfigs([{ label: "Manual", value: "manual" }]);
  }, []);

  const handleHealthCheck = () => {
    executeRequestInAsync("altimateScan", { projectRoot: selectedProject });
  };
  const handleClearProblems = () => {
    executeRequestInAsync("clearAltimateScanResults", {});
  };

  const isEnabled = selectedProject && selectedConfig;
  return (
    <Card className={classes.container}>
      <CardTitle tag="h5">
        Perform project health check
        <Tag color="primary">Performance</Tag>
      </CardTitle>
      <CardBody>
        <CardText>Run project health check</CardText>
        <Stack direction="column">
          <div className={classes.accordion}>
            <Accordion
              trigger={(open) => (
                <Stack className="align-items-center">
                  <div>
                    {projects.find((p) => p.projectRoot === selectedProject)
                      ?.projectName ?? "Select Projects"}
                  </div>
                  <div className="spacer" />
                  {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </Stack>
              )}
            >
              <Stack direction="column">
                {projects.map((p) => (
                  <Stack
                    className={classes.row}
                    key={p.projectRoot}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(p.projectRoot);
                    }}
                  >
                    <FolderIcon />
                    <div>{p.projectName}</div>
                  </Stack>
                ))}
              </Stack>
            </Accordion>
          </div>

          <div className={classes.accordion}>
            <Accordion
              trigger={(open) => (
                <Stack className="align-items-center">
                  <div>
                    {configs.find((c) => c.value === selectedConfig)?.label ??
                      "Select Config for Checks"}
                  </div>
                  <div className="spacer" />
                  {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </Stack>
              )}
            >
              <Stack direction="column">
                {configs.map((c) => (
                  <Stack
                    className={classes.row}
                    key={c.value}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedConfig(c.value);
                    }}
                  >
                    <div>{c.label}</div>
                  </Stack>
                ))}
              </Stack>
            </Accordion>
          </div>

          <div className={classes.notification}>
            <span>
              You can save your config in the ultimate AI SAS instance. Click{" "}
            </span>
            <a href="https://docs.myaltimate.com" className={classes.link}>
              here
            </a>
            <span> to go to ultimate AI SAAS instance.</span>
          </div>

          <Stack>
            <Button
              color={isEnabled ? "primary" : "secondary"}
              onClick={handleHealthCheck}
              disabled={!isEnabled}
            >
              Start scan
            </Button>
            <Button
              color={isEnabled ? "primary" : "secondary"}
              onClick={handleClearProblems}
              disabled={!isEnabled}
            >
              Clear problems
            </Button>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

const Issues = (): JSX.Element => {
  return (
    <Card className={classes.container}>
      <CardTitle tag="h5">
        <Stack>
          <div>Issues</div>
          <div className="spacer" />
          <Dropdown
            label="File Name"
            options={[
              { label: "asd1", value: "asd1" },
              { label: "asd2", value: "asd2" },
            ]}
            onOptionSelect={(k) => panelLogger.log(k)}
          />
          <Dropdown
            label="Error Type"
            options={[
              { label: "asd1", value: "asd1" },
              { label: "asd2", value: "asd2" },
            ]}
            onOptionSelect={(k) => panelLogger.log(k)}
          />
        </Stack>
      </CardTitle>
      <CardBody></CardBody>
    </Card>
  );
};

const ProjectHealthChecker = (): JSX.Element => {
  return (
    <Stack direction="column">
      <ProjectHealthcheckInput />
      <Issues />
    </Stack>
  );
};

export default ProjectHealthChecker;
