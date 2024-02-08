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
import { useCallback, useEffect, useState } from "react";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "../app/requestExecutor";
import classes from "./defer.module.scss";
import { IncomingMessageProps } from "@modules/app/types";

interface DropdownOptions {
  label: string;
  value: number;
}

interface DeferToProductionProps {
  deferToProduction: boolean;
  favorState: boolean;
  manifestPathForDeferral: string;
  manifestPathType: string;
  projectIntegrations: DropdownOptions[];
  dbt_core_integration_id: number;
}
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
  ] = useState<DeferToProductionProps>({
    deferToProduction: false,
    favorState: false,
    manifestPathForDeferral: "",
    manifestPathType: "",
    projectIntegrations: [],
    dbt_core_integration_id: -1,
  });
  const [showManifestError, setShowManifestError] = useState(false);

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

  const handleRemoteManifestIntegration = async (
    config: DeferToProductionProps,
  ) => {
    if (config.manifestPathType === "remote") {
      await setProjectIntegrations();
    }
  };

  const loadDeferConfig = async () => {
    const config = await executeRequestInSync("getDeferToProductionConfig", {});
    if (config) {
      setDeferState(config as DeferToProductionProps);
      await handleRemoteManifestIntegration(config as DeferToProductionProps);
    }
  };

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
    if (!value.endsWith("manifest.json")) {
      setShowManifestError(false);
    } else {
      setShowManifestError(true);
    }
    setDeferState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onLocalManifestBlur = async () => {
    if (!showManifestError) {
      const response = await executeRequestInSync("updateDeferConfig", {
        key: "manifestPathForDeferral",
        value: manifestPathForDeferral,
        isPreviewFeature: true,
      });
      if (!(response as { updated: boolean }).updated) {
        setDeferState((prevState) => ({
          ...prevState,
          manifestPathForDeferral: "",
        }));
      }

      const response2 = await executeRequestInSync("updateDeferConfig", {
        key: "manifestPathType",
        value: manifestPathType,
      });
      if (!(response2 as { updated: boolean }).updated) {
        setDeferState((prevState) => ({
          ...prevState,
          manifestPathType: "",
        }));
      }
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
        manifestPathType: "remote",
      }));
      return;
    }
  };

  const handleManifestPathTypeChange = async (option: string) => {
    if (option === "remote") {
      await setProjectIntegrations();
      if (dbt_core_integration_id > 0) {
        await executeRequestInSync("updateDeferConfig", {
          key: "manifestPathType",
          value: option,
        });
      }
    } else {
      if (manifestPathForDeferral) {
        await executeRequestInSync("updateDeferConfig", {
          key: "manifestPathType",
          value: option,
        });
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
    const response = await executeRequestInSync("testRemoteManifest", {
      dbt_core_integration_id: selectedOption.value,
    });
    const data = response as {
      url: string;
      dbt_core_integration_file_id: number;
    };
    if (data.url === "" && data.dbt_core_integration_file_id === -1) {
      executeRequestInAsync("showInformationMessage", {
        infoMessage: `No remote manifest file present for dbt core integration: ${selectedOption.label}`,
      });
    } else {
      executeRequestInAsync("showInformationMessage", {
        infoMessage: `Project integration connected successfully!`,
      });
      await executeRequestInSync("updateDeferConfig", {
        key: "manifestPathType",
        value: manifestPathType,
      });
      await executeRequestInSync("updateDeferConfig", {
        key: "dbt_core_integration_id",
        value: selectedOption.value,
      });
      setDeferState((prevState) => ({
        ...prevState,
        dbt_core_integration_id: selectedOption.value,
      }));
    }
  };

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
            <FormGroup check className={classes.pathSelection}>
              <div className={classes.pathSelectionRow}>
                <Label
                  check
                  for="localManifestPathRadio"
                  sm={2}
                  className={classes.title}
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => handleManifestPathTypeChange("local")}
                >
                  <Input
                    type="radio"
                    name="localManifestPathRadio"
                    checked={manifestPathType === "local"}
                  />
                  Local Path to manifest folder
                </Label>
                {manifestPathType === "local" && (
                  <Input
                    id="localManifestPath"
                    name="manifestPathForDeferral"
                    placeholder=""
                    type="text"
                    className={classes.pathInput}
                    value={manifestPathForDeferral}
                    onChange={handleLocalManifestPathChange}
                    onBlur={onLocalManifestBlur}
                  />
                )}
              </div>
              {showManifestError && (
                <CardText>
                  The path should indicate the folder where the manifest.json
                  file is located
                </CardText>
              )}
              <div className={classes.pathSelectionRow}>
                <Label
                  check
                  for="manifestPathRadio"
                  sm={2}
                  className={classes.title}
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => handleManifestPathTypeChange("remote")}
                >
                  <Input
                    type="radio"
                    name="manifestPathRadio"
                    checked={manifestPathType === "remote"}
                  />
                  DataPilot dbt Integration
                </Label>
                {manifestPathType === "remote" && projectIntegrations && (
                  <Select
                    options={projectIntegrations}
                    className={classes.pathInput}
                    value={projectIntegrations.find(
                      (i) => i.value === dbt_core_integration_id,
                    )}
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
