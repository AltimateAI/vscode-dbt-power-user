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
  LoadingIcon,
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
  | { configPath: string; configType: "Manual" }
  | {
      config: unknown;
      config_schema: { files_required: string }[];
      configType: "Saas";
    }
  | { configType: "All" };

type AltimateConfigProps = { projectRoot: string } & ConfigOption;

enum ConfigType {
  Manual,
  Saas,
  All,
}

interface SaasConfigSelectorProps {
  selectedConfig: number | undefined;
  setSelectedConfig: Dispatch<SetStateAction<number | undefined>>;
  configPath: string;
  setConfigPath: Dispatch<SetStateAction<string>>;
  configType: ConfigType;
  setConfigType: Dispatch<SetStateAction<ConfigType>>;
  isConfigLoading: boolean;
  configs: DBTConfig[];
  loadConfigs: () => Promise<void>;
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
            className="text-overflow"
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
            {props.configPath || "Select config path"}
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
                void props.loadConfigs();
              }}
            >
              {props.isConfigLoading ? <LoadingIcon /> : <RefreshIcon />}
            </Button>
            <div className={classes.accordionContainer + " w-100"}>
              <Accordion
                trigger={(open) => (
                  <Stack className="align-items-start">
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
                    {props.configs.map((c) => (
                      <Stack
                        className={
                          classes.row +
                          " " +
                          (props.selectedConfig === c.id ? classes.active : "")
                        }
                        key={c.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          props.setSelectedConfig(c.id);
                          close();
                        }}
                      >
                        <div>{c.name}</div>
                      </Stack>
                    ))}
                  </Stack>
                )}
              </Accordion>
            </div>
          </>
        )}
      </div>
      <div className="d-flex align-items-center gap-sm">
        <Label check sm={2} style={{ whiteSpace: "nowrap" }}>
          <Input
            type="radio"
            className="me-2"
            checked={props.configType === ConfigType.All}
            onClick={() => props.setConfigType(ConfigType.All)}
          />
          Run all checks
        </Label>
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
  const [selectedConfig, setSelectedConfig] = useState<number | undefined>();
  const [configType, setConfigType] = useState(ConfigType.All);
  const [configPath, setConfigPath] = useState("");
  const [requestInProgress, setRequestInProgress] = useState(false);

  const [configs, setConfigs] = useState<DBTConfig[]>([]);
  const [isConfigLoading, setIsConfigLoading] = useState(false);

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

  const loadConfigs = useCallback(async () => {
    try {
      setIsConfigLoading(true);
      const result = (await executeRequestInSync("getInsightConfigs", {})) as {
        items: DBTConfig[];
      };
      setConfigs(result.items);
    } catch (e) {
      panelLogger.log("error in loadConfigs", e);
    } finally {
      setIsConfigLoading(false);
    }
  }, []);

  useEffect(() => {
    void getProjects();
  }, []);

  useEffect(() => {
    if (configType === ConfigType.Saas) {
      void loadConfigs();
    }
  }, [configType]);

  const isStartScanEnabled =
    !requestInProgress &&
    selectedProject &&
    (configType === ConfigType.All ||
      (configType === ConfigType.Manual && configPath) ||
      (configType === ConfigType.Saas && selectedConfig));

  return (
    <Card className={classes.container}>
      <CardTitle tag="h5">Perform project governance</CardTitle>
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
            selectedConfig={selectedConfig}
            setSelectedConfig={setSelectedConfig}
            configPath={configPath}
            setConfigPath={setConfigPath}
            configType={configType}
            setConfigType={setConfigType}
            configs={configs}
            isConfigLoading={isConfigLoading}
            loadConfigs={loadConfigs}
          />

          <Stack>
            <Button
              color={isStartScanEnabled ? "primary" : "secondary"}
              onClick={async () => {
                if (configType === ConfigType.Saas) {
                  void executeRequestInSync("logDBTHealthcheckConfig", {
                    configId: selectedConfig,
                  });
                }
                let args: Record<string, unknown>;
                if (configType === ConfigType.Manual) {
                  args = { configPath, configType: "Manual" };
                } else if (configType === ConfigType.Saas) {
                  args = {
                    configType: "Saas",
                    ...configs?.find((c) => c.id === selectedConfig),
                  };
                } else {
                  args = { configType: "All" };
                }
                try {
                  setRequestInProgress(true);
                  await handleHealthCheck({
                    projectRoot: selectedProject,
                    ...args,
                  } as AltimateConfigProps);
                } finally {
                  setRequestInProgress(false);
                }
              }}
              disabled={!isStartScanEnabled}
            >
              Start scan
            </Button>
            <Button
              color={selectedProject ? "primary" : "secondary"}
              onClick={handleClearProblems}
              disabled={!selectedProject}
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
