import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Stack,
  Accordion,
  Input,
  Label,
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
import {
  ArrowDownIcon,
  FolderIcon,
  ArrowLeftIcon,
  RefreshIcon,
} from "@assets/icons";
import { ProjectHealthcheck } from "./types";
import { IssueList } from "./IssueList";

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

enum ConfigType {
  Manual,
  Saas,
}

interface SaasConfigSelectorProps {
  configs: DBTConfig[];
  selectedConfig: number;
  setSelectedConfig: Dispatch<SetStateAction<number>>;
  setConfigPath: Dispatch<SetStateAction<string>>;
  refreshConfig: () => void;
  configType: ConfigType;
  setConfigType: Dispatch<SetStateAction<ConfigType>>;
}

const SaasConfigSelector = (props: SaasConfigSelectorProps) => {
  return (
    <div className="d-flex flex-column gap-sm">
      <div className="d-flex align-items-center gap-sm">
        <Label check sm={2} style={{ whiteSpace: "nowrap" }}>
          <Input
            type="radio"
            className="me-2"
            checked={props.configType === ConfigType.Manual}
            onClick={() => props.setConfigType(ConfigType.Manual)}
          />
          Manual
        </Label>
        {props.configType === ConfigType.Manual && (
          <Button
            size="sm"
            color="primary"
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
            Select config path
          </Button>
        )}
      </div>
      <div className="d-flex align-items-center gap-sm">
        <Label check sm={2} style={{ whiteSpace: "nowrap" }}>
          <Input
            type="radio"
            className="me-2"
            checked={props.configType === ConfigType.Saas}
            onClick={() => props.setConfigType(ConfigType.Saas)}
          />
          Select config
        </Label>
        {props.configType === ConfigType.Saas && (
          <>
            <Button
              color="link"
              onClick={(e) => {
                e.stopPropagation();
                props.refreshConfig();
              }}
            >
              <RefreshIcon />
            </Button>
            <div className={classes.accordionContainer + " w-100"}>
              <Accordion
                trigger={(open) => (
                  <Stack className="align-items-center">
                    <div>
                      {props.configs.find((c) => c.id === props.selectedConfig)
                        ?.name ?? "Select healthcheck configs"}
                    </div>
                    <div className="spacer" />
                    {open ? <ArrowDownIcon /> : <ArrowLeftIcon />}
                  </Stack>
                )}
              >
                {({ close }) => (
                  <Stack direction="column" className="gap-0">
                    {props.configs
                      .map((c) => ({
                        value: c.id,
                        label: c.name,
                      }))
                      .map((c) => (
                        <Stack
                          className={
                            classes.row +
                            " " +
                            (c.value === props.selectedConfig
                              ? classes.active
                              : "")
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface ProjectSelectorProps {
  projects: { projectName: string; projectRoot: string }[];
  selectedProject: string;
  setSelectedProject: Dispatch<SetStateAction<string>>;
}

const ProjectSelector = (props: ProjectSelectorProps) => {
  const selectedProject = props.projects.find(
    (p) => p.projectRoot === props.selectedProject,
  );
  return (
    <div className={classes.accordionContainer}>
      <Accordion
        trigger={(open) => (
          <Stack className="align-items-center">
            <div className="lines-1">
              {selectedProject
                ? `${selectedProject.projectName} (${selectedProject.projectRoot})`
                : "Select Projects"}
            </div>
            <div className="spacer" />
            {open ? <ArrowDownIcon /> : <ArrowLeftIcon />}
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
                <div className="lines-1">
                  {p.projectName} ({p.projectRoot})
                </div>
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
  const [selectedConfig, setSelectedConfig] = useState(0);
  const [configType, setConfigType] = useState(ConfigType.Manual);
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
      items: DBTConfig[];
    };
    setConfigs(result.items);
  }, []);

  useEffect(() => {
    void getProjects();
    void getConfigs();
  }, []);

  const isEnabled =
    selectedProject &&
    ((configType === ConfigType.Manual && configPath) || selectedConfig > 0);
  return (
    <Card className={classes.container}>
      <CardTitle tag="h5">Perform project healthcheck</CardTitle>
      <CardBody>
        <CardText>
          Find areas of a dbt project that are misaligned with dbt best
          practices
        </CardText>
        <Stack direction="column">
          <ProjectSelector
            projects={projects}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />

          <SaasConfigSelector
            configs={configs}
            selectedConfig={selectedConfig}
            setSelectedConfig={setSelectedConfig}
            setConfigPath={setConfigPath}
            refreshConfig={getConfigs}
            configType={configType}
            setConfigType={setConfigType}
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
                if (selectedConfig !== -1) {
                  void executeRequestInSync("logDBTHealthcheckConfig", {
                    configId: selectedConfig,
                  });
                }
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
  return (
    <>
      <Stack direction="column">
        <ProjectHealthcheckInput
          handleHealthCheck={handleHealthCheck}
          handleClearProblems={() => setProjectHealthcheck(null)}
        />
        {projectHealthcheck && (
          <IssueList projectHealthcheck={projectHealthcheck} />
        )}
      </Stack>
    </>
  );
};

export default ProjectHealthChecker;
