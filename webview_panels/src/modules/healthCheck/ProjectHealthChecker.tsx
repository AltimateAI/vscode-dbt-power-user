import {
  Card,
  CardTitle,
  Tag,
  CardBody,
  CardText,
  Button,
  Stack,
  Accordion,
  Sidebar,
} from "@uicore";
import { executeRequestInSync } from "../app/requestExecutor";
import classes from "./healthcheck.module.scss";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { panelLogger } from "@modules/logger";
import { ArrowUpIcon, ArrowDownIcon, FolderIcon } from "@assets/icons";
import { ModelInsight, ProjectHealthcheck } from "./types";
import { IssueList } from "./IssueList";
import { IssueDetail } from "./IssueDetail";

interface DBTConfig {
  id: number;
  name: string;
  description: string;
  created_on: string;
  config: unknown;
  config_schema: unknown[];
}

type ConfigOption =
  | { configPath: string }
  | { config: unknown; config_schema: unknown[] };

type AltimateConfigProps = { projectRoot: string } & ConfigOption;

interface ManualConfigProps {
  configs: DBTConfig[];
  selectedConfig: number;
  setSelectedConfig: Dispatch<SetStateAction<number>>;
  setConfigPath: Dispatch<SetStateAction<string>>;
}

const ManualConfig = (props: ManualConfigProps) => {
  return (
    <div className={classes.accordionContainer}>
      <Accordion
        trigger={(open) => (
          <Stack className="align-items-center">
            <div>
              {props.selectedConfig === -1
                ? "Manual"
                : props.configs.find((c) => c.id === props.selectedConfig)
                    ?.name ?? "Select Config for Checks"}
            </div>
            <div className="spacer" />
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </Stack>
        )}
      >
        {({ close }) => (
          <Stack direction="column" className="gap-0">
            {[
              ...props.configs.map((c) => ({
                value: c.id,
                label: c.name,
              })),
              {
                value: -1,
                label: "Manual",
              },
            ].map((c) => (
              <Stack
                className={
                  classes.row +
                  " " +
                  (c.value === props.selectedConfig ? classes.active : "")
                }
                key={c.value}
                onClick={(e) => {
                  e.stopPropagation();
                  props.setSelectedConfig(c.value);
                  close();
                }}
              >
                <div>{c.label}</div>
              </Stack>
            ))}
          </Stack>
        )}
      </Accordion>

      {props.selectedConfig === -1 && (
        <Button
          size="sm"
          color="primary"
          className="mt-2"
          onClick={async (e) => {
            e.stopPropagation();
            const result = await executeRequestInSync("selectFiles", {
              filters: {
                Files: ["yml"],
              },
              canSelectMany: false,
            });
            const { path } = result as {
              path: string[];
            };
            props.setConfigPath(path[0]);
          }}
        >
          Select config path for manual checks
        </Button>
      )}
    </div>
  );
};

interface SaasConfigProps {
  projects: { projectName: string; projectRoot: string }[];
  selectedProject: string;
  setSelectedProject: Dispatch<SetStateAction<string>>;
}

const SaasConfig = (props: SaasConfigProps) => {
  return (
    <div className={classes.accordionContainer}>
      <Accordion
        trigger={(open) => (
          <Stack className="align-items-center">
            <div>
              {props.projects.find(
                (p) => p.projectRoot === props.selectedProject,
              )?.projectName ?? "Select Projects"}
            </div>
            <div className="spacer" />
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </Stack>
        )}
      >
        {({ close }) => (
          <Stack direction="column" className="gap-0">
            {props.projects.map((p) => (
              <Stack
                className={
                  classes.row +
                  " " +
                  (p.projectRoot === props.selectedProject
                    ? classes.active
                    : "")
                }
                key={p.projectRoot}
                onClick={(e) => {
                  e.stopPropagation();
                  props.setSelectedProject(p.projectRoot);
                  close();
                }}
              >
                <FolderIcon />
                <div>{p.projectName}</div>
              </Stack>
            ))}
          </Stack>
        )}
      </Accordion>
    </div>
  );
};

const ProjectHealthcheckInput = ({
  handleHealthCheck,
  handleClearProblems,
}: {
  handleHealthCheck: (args: AltimateConfigProps) => Promise<void>;
  handleClearProblems: () => void;
}): JSX.Element => {
  const [projects, setProjects] = useState<
    { projectName: string; projectRoot: string }[]
  >([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [configs, setConfigs] = useState<DBTConfig[]>([]);
  // 0: no config selected; -1: manual selected; +ve values are config id
  const [selectedConfig, setSelectedConfig] = useState(0);
  const [configPath, setConfigPath] = useState("");

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

  const getConfigs = useCallback(async () => {
    const result = (await executeRequestInSync("getInsightConfigs", {})) as {
      configs: { items: DBTConfig[] };
    };
    panelLogger.log("result->", result);
    setConfigs(result.configs.items);
  }, []);

  useEffect(() => {
    panelLogger.log("project health");
    void getProjects();
    void getConfigs();
  }, []);

  const isEnabled =
    selectedProject &&
    ((selectedConfig === -1 && configPath) || selectedConfig > 0);
  return (
    <Card className={classes.container}>
      <CardTitle tag="h5">
        Perform project health check
        <Tag color="primary">Performance</Tag>
      </CardTitle>
      <CardBody>
        <CardText>Run project health check</CardText>
        <Stack direction="column">
          <SaasConfig
            projects={projects}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />

          <ManualConfig
            configs={configs}
            selectedConfig={selectedConfig}
            setSelectedConfig={setSelectedConfig}
            setConfigPath={setConfigPath}
          />

          <div className={classes.notification}>
            <span>
              You can save your config in the altimate AI SAAS instance. Click{" "}
            </span>
            <a
              href="https://app.myaltimate.com/register"
              className={classes.link}
            >
              here
            </a>
            <span> to go to altimate AI SAAS instance.</span>
          </div>

          <Stack>
            <Button
              color={isEnabled ? "primary" : "secondary"}
              onClick={() => {
                const args = {
                  projectRoot: selectedProject,
                  ...(selectedConfig === -1
                    ? { configPath }
                    : configs.find((c) => c.id === selectedConfig))!,
                };
                void handleHealthCheck(args);
              }}
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

const ProjectHealthChecker = (): JSX.Element => {
  const [modalOpen, setModalOpen] = useState(false);
  const [projectHealthcheck, setProjectHealthcheck] =
    useState<ProjectHealthcheck | null>(null);
  const handleHealthCheck = async (args: AltimateConfigProps) => {
    const result = (await executeRequestInSync(
      "altimateScan",
      args as unknown as Record<string, unknown>,
    )) as {
      projectHealthcheck: ProjectHealthcheck;
    };
    panelLogger.log("projectHealthcheck:", result.projectHealthcheck);
    setProjectHealthcheck(result.projectHealthcheck);
  };
  const [selectedInsight, setSeletedInsight] = useState<ModelInsight | null>(
    null,
  );
  return (
    <>
      <Stack direction="column">
        <ProjectHealthcheckInput
          handleHealthCheck={handleHealthCheck}
          handleClearProblems={() => setProjectHealthcheck(null)}
        />
        {projectHealthcheck && (
          <IssueList
            projectHealthcheck={projectHealthcheck}
            setSeletedInsight={setSeletedInsight}
            setModalOpen={setModalOpen}
          />
        )}
      </Stack>
      <Sidebar
        isOpen={modalOpen}
        toggleModal={() => {
          setModalOpen(false);
          setSeletedInsight(null);
        }}
      >
        {selectedInsight && <IssueDetail insight={selectedInsight} />}
      </Sidebar>
    </>
  );
};

export default ProjectHealthChecker;
