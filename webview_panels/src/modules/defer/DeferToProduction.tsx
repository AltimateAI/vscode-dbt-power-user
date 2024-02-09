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
import { ManifestPathType } from "./constants";

interface DropdownOptions {
  label: string;
  value: number;
}

interface DeferToProductionProps {
  deferToProduction: boolean;
  favorState: boolean;
  manifestPathForDeferral: string;
  manifestPathType: ManifestPathType;
  projectIntegrations: DropdownOptions[];
  dbt_core_integration_id: number;
}

interface ManifestSelectionProps {
  manifestPathForDeferral: string;
  manifestPathType: ManifestPathType;
  projectIntegrations: DropdownOptions[];
  dbt_core_integration_id: number;
  setDeferState: React.Dispatch<React.SetStateAction<DeferToProductionProps>>;
  setProjectIntegrations: () => Promise<void>;
}

const ManifestSelection = ({
  manifestPathType,
  manifestPathForDeferral,
  projectIntegrations,
  dbt_core_integration_id,
  setDeferState,
  setProjectIntegrations,
}: ManifestSelectionProps): JSX.Element => {
  const [showManifestError, setShowManifestError] = useState(false);

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
      const response = await executeRequestInSync("updateDeferConfig", [
        {
          key: "manifestPathForDeferral",
          value: manifestPathForDeferral,
          isPreviewFeature: true,
        },
        {
          key: "manifestPathType",
          value: manifestPathType,
        },
      ]);
      if (!(response as { updated: boolean }).updated) {
        setDeferState((prevState) => ({
          ...prevState,
          manifestPathForDeferral: "",
          manifestPathType: ManifestPathType.EMPTY,
        }));
      }
    }
  };

  const handleManifestPathTypeChange = async (option: ManifestPathType) => {
    if (option === ManifestPathType.REMOTE) {
      await setProjectIntegrations();
      if (dbt_core_integration_id > 0) {
        await executeRequestInSync("updateDeferConfig", {
          key: "manifestPathType",
          value: option,
        });
      }
    }
    if (option === ManifestPathType.LOCAL) {
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
      return;
    }
    executeRequestInAsync("showInformationMessage", {
      infoMessage: `Project integration connected successfully!`,
    });
    await executeRequestInSync("updateDeferConfig", [
      {
        key: "manifestPathType",
        value: manifestPathType,
      },
      {
        key: "dbt_core_integration_id",
        value: selectedOption.value,
      },
    ]);
    setDeferState((prevState) => ({
      ...prevState,
      dbt_core_integration_id: selectedOption.value,
    }));
  };

  return (
    <FormGroup check className={classes.pathSelection}>
      <div className={classes.pathSelectionRow}>
        <Label
          check
          for="localManifestPathRadio"
          sm={2}
          className={classes.title}
          style={{ whiteSpace: "nowrap" }}
        >
          <Input
            type="radio"
            id="localManifestPathRadio"
            checked={manifestPathType === ManifestPathType.LOCAL}
            onClick={() => handleManifestPathTypeChange(ManifestPathType.LOCAL)}
          />
          Local Path to manifest folder
        </Label>
        {manifestPathType === ManifestPathType.LOCAL && (
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
          The path should indicate the folder where the manifest.json file is
          located
        </CardText>
      )}
      <div className={classes.pathSelectionRow}>
        <Label
          check
          for="manifestPathRadio"
          sm={2}
          className={classes.title}
          style={{ whiteSpace: "nowrap" }}
          onClick={() => handleManifestPathTypeChange(ManifestPathType.REMOTE)}
        >
          <Input
            type="radio"
            id="manifestPathRadio"
            checked={manifestPathType === ManifestPathType.REMOTE}
          />
          DataPilot dbt Integration
        </Label>
        {manifestPathType === ManifestPathType.REMOTE &&
          projectIntegrations && (
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
  );
};

const DefaultInsightsPanel = (): JSX.Element => {
  return <></>;
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
  ] = useState<DeferToProductionProps>({
    deferToProduction: false,
    favorState: false,
    manifestPathForDeferral: "",
    manifestPathType: ManifestPathType.EMPTY,
    projectIntegrations: [],
    dbt_core_integration_id: -1,
  });
  const [showPanel, setShowPanel] = useState(false);

  const onMesssage = useCallback(
    (event: MessageEvent<IncomingMessageProps>) => {
      const { command, args } = event.data;
      switch (command) {
        case "updateDeferConfig":
          if (args) {
            setDeferState(args as unknown as DeferToProductionProps);
            setShowPanel(true);
          }
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

  return showPanel ? (
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
            <ManifestSelection
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
          </Form>
        </CardBody>
      </Card>
    </Col>
  ) : (
    <DefaultInsightsPanel />
  );
};

export default DeferToProduction;
