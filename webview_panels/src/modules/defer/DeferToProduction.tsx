import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Select,
} from "@uicore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { executeRequestInSync } from "../app/requestExecutor";
import classes from "./defer.module.scss";
import { IncomingMessageProps } from "@modules/app/types";
import {
  DbtIntegrationMode,
  DbtProject,
  DeferToProductionProps,
} from "./types";
import { ManifestPathType } from "./constants";
import { ManifestSelection } from "./ManifestSelection";
import { panelLogger } from "@modules/logger";
import PreviewFeatureIcon from "@modules/previewFeature/PreviewFeatureIcon";

const DefaultDeferState = {
  deferToProduction: false,
  favorState: false,
  manifestPathForDeferral: "",
  manifestPathType: ManifestPathType.EMPTY,
  projectIntegrations: [],
  dbtCoreIntegrationId: undefined,
};

const DeferToProduction = (): JSX.Element => {
  const [
    {
      deferToProduction,
      favorState,
      manifestPathForDeferral,
      manifestPathType,
      projectIntegrations,
      dbtCoreIntegrationId,
    },
    setDeferState,
  ] = useState<DeferToProductionProps>(DefaultDeferState);
  const [fetchingProjectIntegrations, setFetchingProjectIntegrations] =
    useState(false);
  const [dbtProjects, setDbtProjects] = useState<DbtProject[]>([]);
  const [dbtProjectRoot, setDbtProjectRoot] = useState("");
  const [dbtIntegrationMode, setDbtIntegrationMode] = useState(
    DbtIntegrationMode.CORE,
  );
  const [showProjectDropdown, setShowProjectDropdown] = useState(true);

  const updateDeferState = (args: {
    config: DeferToProductionProps;
    projectPath: string;
    dbtIntegrationMode: DbtIntegrationMode;
  }) => {
    setDeferState(args.config || DefaultDeferState);
    setDbtProjectRoot(args.projectPath);
    setDbtIntegrationMode(args.dbtIntegrationMode);
  };

  const onMesssage = useCallback(
    (event: MessageEvent<IncomingMessageProps>) => {
      const { command, args } = event.data;
      switch (command) {
        case "renderDeferConfig":
          updateDeferState(
            args as {
              config: DeferToProductionProps;
              projectPath: string;
              dbtIntegrationMode: DbtIntegrationMode;
            },
          );
          break;
        default:
          break;
      }
    },
    [],
  );

  useEffect(() => {
    window.addEventListener("message", onMesssage);
    return () => {
      window.removeEventListener("message", onMesssage);
    };
  }, [onMesssage]);

  const handleRemoteManifestIntegration = async (
    config: DeferToProductionProps,
  ) => {
    if (config.manifestPathType === ManifestPathType.REMOTE) {
      await setProjectIntegrations();
    }
  };

  const loadProjects = async () => {
    const projects = await executeRequestInSync("getProjects", {});
    const localProjects = projects as DbtProject[];
    if (localProjects.length === 1) {
      setDbtProjectRoot(localProjects[0].projectRoot);
      setShowProjectDropdown(false);
    } else {
      setDbtProjects(localProjects);
    }
  };

  const loadDeferConfig = async () => {
    const response = (await executeRequestInSync("getDeferToProductionConfig", {
      projectRoot: dbtProjectRoot,
    })) as {
      config: DeferToProductionProps;
      projectPath: string;
      dbtIntegrationMode: DbtIntegrationMode;
    };
    updateDeferState(response);
    if (response.config) {
      await handleRemoteManifestIntegration(response.config);
    }
  };

  useEffect(() => {
    loadProjects().catch(() => {
      return;
    });
  }, []);

  useEffect(() => {
    loadDeferConfig().catch(() => {
      return;
    });
  }, [dbtProjectRoot]);

  const updateDeferAndFavorState = ({
    key,
    value,
  }: {
    key: string;
    value: boolean;
  }) => {
    setDeferState((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleStateChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked, name } = event.target;
    panelLogger.log("dbtProjectRoot", dbtProjectRoot);
    const response = await executeRequestInSync("updateDeferConfig", {
      config: [
        {
          key: name,
          value: checked,
          isPreviewFeature: true,
        },
      ],
      projectRoot: dbtProjectRoot,
    });
    if ((response as { updated: boolean }).updated) {
      updateDeferAndFavorState({ key: name, value: checked });
    }
  };

  const setProjectIntegrations = async (clearCache?: boolean) => {
    setFetchingProjectIntegrations(true);
    const response = await executeRequestInSync("fetchProjectIntegrations", {
      clearCache,
    });
    if (Array.isArray(response)) {
      setDeferState((prevState) => ({
        ...prevState,
        projectIntegrations: response.map(
          (item: { name: string; id: number }) => ({
            label: item.name,
            value: item.id,
          }),
        ),
        manifestPathType: ManifestPathType.REMOTE,
      }));
    }
    setFetchingProjectIntegrations(false);
  };

  const handleProjectSelect = (selectedOption: {
    label: string;
    value: string;
  }) => {
    setDbtProjectRoot(selectedOption.value);
    setDeferState(DefaultDeferState);
  };

  const selectedProject = useMemo(() => {
    const project = dbtProjects.find((p) => p.projectRoot === dbtProjectRoot);
    if (!project) {
      return;
    }

    return {
      label: `${project.projectName} (${project.projectRoot})`,
      value: project.projectRoot,
    };
  }, [dbtProjects, dbtProjectRoot]);

  return (
    <Col lg={7}>
      <Card className={classes.insightsCard}>
        <CardTitle className={classes.cardTitle} tag="h5">
          Defer to production <PreviewFeatureIcon />
        </CardTitle>
        <CardBody>
          <CardText>
            Save costs and time by only running a subset of models without
            building upstream models (
            <a
              href="https://docs.getdbt.com/reference/node-selection/defer"
              target="_blank"
              rel="noopener noreferrer"
            >
              more info
            </a>
            ).
          </CardText>
          <Form>
            {showProjectDropdown && (
              <Label className={classes.projectSelect}>
                Select dbt project
                <Select
                  options={dbtProjects.map((d) => {
                    return {
                      label: `${d.projectName} (${d.projectRoot})`,
                      value: d.projectRoot,
                    };
                  })}
                  defaultValue={selectedProject}
                  value={selectedProject}
                  onChange={(newValue) =>
                    handleProjectSelect(
                      newValue as { label: string; value: string },
                    )
                  }
                  placeholder="Select Project"
                />
              </Label>
            )}
            {dbtProjectRoot && (
              <>
                <FormGroup switch className={classes.formSwitch}>
                  <Label>
                    Enable defer to production
                    <Input
                      type="switch"
                      onChange={handleStateChange}
                      name="deferToProduction"
                      checked={deferToProduction}
                    />
                  </Label>
                </FormGroup>
                {dbtIntegrationMode !== DbtIntegrationMode.CLOUD ? (
                  <>
                    <ManifestSelection
                      fetchingProjectIntegrations={fetchingProjectIntegrations}
                      dbtProjectRoot={dbtProjectRoot}
                      manifestPathForDeferral={manifestPathForDeferral}
                      manifestPathType={manifestPathType}
                      projectIntegrations={projectIntegrations}
                      dbtCoreIntegrationId={dbtCoreIntegrationId}
                      setDeferState={setDeferState}
                      setProjectIntegrations={setProjectIntegrations}
                    />
                  </>
                ) : null}
                {dbtIntegrationMode !== DbtIntegrationMode.CLOUD ? (
                  <>
                    <FormGroup switch className={classes.formSwitch}>
                      <Label>
                        Favor-state
                        <Input
                          type="switch"
                          onChange={handleStateChange}
                          checked={favorState}
                          name="favorState"
                        />
                      </Label>
                    </FormGroup>
                  </>
                ) : null}
              </>
            )}
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default DeferToProduction;
