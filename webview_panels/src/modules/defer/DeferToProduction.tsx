import {
  Tag,
  Button,
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
import { useCallback, useEffect, useState } from "react";
import { SettingsIcon } from "@assets/icons";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "../app/requestExecutor";
import classes from "./defer.module.scss";
import { IncomingMessageProps } from "@modules/app/types";
import { panelLogger } from "@modules/logger";

interface DropdownOptions {
  label: string;
  value: number;
}
interface DeferToProductionProps {
  deferToProduction: boolean;
  favorState: boolean;
  localManifestPathForDeferral: string;
  manifestPathType: string;
  projectIntegrations: DropdownOptions[];
}
const DeferToProduction = (): JSX.Element => {
  const [
    {
      deferToProduction,
      favorState,
      localManifestPathForDeferral,
      manifestPathType,
      projectIntegrations,
    },
    setDeferState,
  ] = useState<DeferToProductionProps>({
    deferToProduction: false,
    favorState: false,
    localManifestPathForDeferral: "",
    manifestPathType: "",
    projectIntegrations: [],
  });
  const [hideBody, setHideBody] = useState(true);

  const onMesssage = useCallback(
    (event: MessageEvent<IncomingMessageProps>) => {
      const { command, args } = event.data;
      switch (command) {
        case "updateDeferConfig":
          setDeferState(args as unknown as DeferToProductionProps);
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

  const loadDeferConfig = async () => {
    const config = await executeRequestInSync("getDeferToProductionConfig", {});
    if (config) {
      setDeferState(config as DeferToProductionProps);
    }
  };
  useEffect(() => {
    loadDeferConfig().catch(() => {
      return;
    });
  }, []);

  const toggleBody = () => setHideBody(!hideBody);

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
    const response = await executeRequestInSync("updateDeferConfig", {
      key: name,
      value: checked,
      isPreviewFeature: true,
    });
    if ((response as { updated: boolean }).updated) {
      updateDeferAndFavorState({ key: name, value: checked });
    }
  };

  const handleLocalManifestPathChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, name } = event.target;
    setDeferState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onLocalManifestBlur = async () => {
    const response = await executeRequestInSync("updateDeferConfig", {
      key: "localManifestPathForDeferral",
      value: localManifestPathForDeferral,
      isPreviewFeature: true,
    });
    if (!(response as { updated: boolean }).updated) {
      setDeferState((prevState) => ({
        ...prevState,
        localManifestPathForDeferral: "",
      }));
    }
  };

  const handleManifestPathTypeChange = async (option: string) => {
    if (option === "remote") {
      const response = await executeRequestInSync(
        "fetchProjectIntegrations",
        {},
      );
      if (Array.isArray(response)) {
        setDeferState((prevState) => ({
          ...prevState,
          projectIntegrations: response.map(
            (item: { name: string; id: number }) => ({
              label: item.name,
              value: item.id,
            }),
          ),
          manifestPathType: option,
        }));
        return;
      }
    }
    setDeferState((prevState) => ({
      ...prevState,
      manifestPathType: option,
    }));
  };

  const handleIntegrationSelect = async (selectedOption: {
    label: string;
    value: number;
  }) => {
    const response = await executeRequestInSync("downloadManifest", {
      dbt_core_integration_id: selectedOption.value,
    });
    const data = response as {
      url: string;
      dbt_core_integration_file_id: number;
      manifestPath: string;
    };
    if (data.url === "" && data.dbt_core_integration_file_id === -1) {
      executeRequestInAsync("showInfoNotification", {
        infoMessage: `No remote manifest file present for dbt core integration: ${selectedOption.label}`,
      });
    } else {
      if (data.manifestPath) {
        panelLogger.log(`Manifest path: ${data.manifestPath}`);
        setDeferState((prevState) => ({
          ...prevState,
          localManifestPathForDeferral: data.manifestPath,
        }));
      }
    }
  };

  return (
    <Col lg={7}>
      <Card className={classes.insightsCard}>
        <CardTitle className={classes.cardTitle} tag="h5">
          Enable defer_to_production
          <Tag color="primary">Performance</Tag>
          <Button outline onClick={toggleBody}>
            <SettingsIcon />
          </Button>
        </CardTitle>
        <CardBody hidden={hideBody}>
          <CardText>
            Run subset of models without building their parent models
          </CardText>
          <Form>
            <FormGroup switch className={classes.formSwitch}>
              <Label>
                Defer_to_production
                <Input
                  type="switch"
                  onChange={handleStateChange}
                  name="deferToProduction"
                  checked={deferToProduction}
                />
              </Label>
            </FormGroup>
            <Label>Save your file location</Label>
            <FormGroup check className={classes.pathSelection}>
              <div className={classes.pathSelectionRow}>
                <Label
                  check
                  for="manifestPath"
                  sm={2}
                  className={classes.title}
                  style={{ whiteSpace: "nowrap" }}
                >
                  <Input
                    type="radio"
                    name="localManifestPathRadio"
                    checked={manifestPathType === "local"}
                    onChange={() => handleManifestPathTypeChange("local")}
                  />
                  Local Path to manifest file
                </Label>
                {manifestPathType === "local" && (
                  <Input
                    id="localManifestPath"
                    name="localManifestPathForDeferral"
                    placeholder=""
                    type="text"
                    className={classes.pathInput}
                    value={localManifestPathForDeferral}
                    onChange={handleLocalManifestPathChange}
                    onBlur={onLocalManifestBlur}
                  />
                )}
              </div>
              <div className={classes.pathSelectionRow}>
                <Label
                  check
                  for="remoteManifestPath"
                  sm={2}
                  className={classes.title}
                  style={{ whiteSpace: "nowrap" }}
                >
                  <Input
                    type="radio"
                    name="manifestPathRadio"
                    checked={manifestPathType === "remote"}
                    onChange={() => handleManifestPathTypeChange("remote")}
                  />
                  DataPilot dbt Integration
                </Label>

                {manifestPathType === "remote" && (
                  <Select
                    options={projectIntegrations}
                    className={classes.pathInput}
                    onChange={(newValue) =>
                      handleIntegrationSelect(
                        newValue as { label: string; value: number },
                      )
                    }
                  />
                )}
              </div>
            </FormGroup>
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
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default DeferToProduction;
