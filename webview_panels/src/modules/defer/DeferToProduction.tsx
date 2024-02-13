import {
  Tag,
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
import { DbtProject, DeferToProductionProps } from "./types";
import { ManifestPathType } from "./constants";
import { ManifestSelection } from "./ManifestSelection";
import { panelLogger } from "@modules/logger";

const DefaultDeferState = {
  deferToProduction: false,
  favorState: false,
  manifestPathForDeferral: "",
  manifestPathType: ManifestPathType.EMPTY,
  projectIntegrations: [],
  dbt_core_integration_id: -1,
};

const DeferToProduction = (): JSX.Element => {
  const [
    {
      deferToProduction,
      favorState,
      manifestPathForDeferral,
      manifestPathType,
      projectIntegrations,
      dbt_core_integration_id,
    },
    setDeferState,
  ] = useState<DeferToProductionProps>(DefaultDeferState);

  const [dbtProjects, setDbtProjects] = useState<DbtProject[]>([]);
  const [dbtProjectRoot, setDbtProjectRoot] = useState("");
  const [showProjectDropdown, setShowProjectDropdown] = useState(true);

  const updateDeferState = (args: {
    config: DeferToProductionProps;
    projectPath: string;
  }) => {
    setDeferState(args.config || DefaultDeferState);
    setDbtProjectRoot(args.projectPath);
  };

  const onMesssage = useCallback(
    (event: MessageEvent<IncomingMessageProps>) => {
      const { command, args } = event.data;
      switch (command) {
        case "updateDeferConfig":
          updateDeferState(
            args as {
              config: DeferToProductionProps;
              projectPath: string;
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
    })) as { config: DeferToProductionProps; projectPath: string };
    if (response.config) {
      setDeferState(response.config || DefaultDeferState);
      await handleRemoteManifestIntegration(response.config);
    }
    setDbtProjectRoot(response.projectPath);
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
  }, []);

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
    panelLogger.log("dbtProjectRoot");
    panelLogger.log(dbtProjectRoot);
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

  const setProjectIntegrations = async () => {
    const response = await executeRequestInSync("fetchProjectIntegrations", {});
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
      return;
    }
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
          Enable defer to production
          <Tag color="primary">Performance</Tag>
        </CardTitle>
        <CardBody>
          <CardText>Save costs by only running what is changed</CardText>
          <Form>
            {showProjectDropdown && (
              <Select
                options={dbtProjects.map((d) => {
                  return {
                    label: `${d.projectName} (${d.projectRoot})`,
                    value: d.projectRoot,
                  };
                })}
                defaultValue={selectedProject}
                value={selectedProject}
                className={classes.projectSelect}
                onChange={(newValue) =>
                  handleProjectSelect(
                    newValue as { label: string; value: string },
                  )
                }
                placeholder="Select Project"
              />
            )}
            {dbtProjectRoot && (
              <>
                <FormGroup switch className={classes.formSwitch}>
                  <Label>
                    Defer to production
                    <Input
                      type="switch"
                      onChange={handleStateChange}
                      name="deferToProduction"
                      checked={deferToProduction}
                    />
                  </Label>
                </FormGroup>
                <Label>Save your file location</Label>
                <ManifestSelection
                  dbtProjectRoot={dbtProjectRoot}
                  manifestPathForDeferral={manifestPathForDeferral}
                  manifestPathType={manifestPathType}
                  projectIntegrations={projectIntegrations}
                  dbt_core_integration_id={dbt_core_integration_id}
                  setDeferState={setDeferState}
                  setProjectIntegrations={setProjectIntegrations}
                />
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
            )}
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default DeferToProduction;
