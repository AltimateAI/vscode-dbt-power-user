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
} from "@uicore";
import { useCallback, useEffect, useState } from "react";
import { executeRequestInSync } from "../app/requestExecutor";
import classes from "./defer.module.scss";
import { IncomingMessageProps } from "@modules/app/types";
import { DeferToProductionProps } from "./types";
import { ManifestPathType } from "./constants";
import { ManifestSelection } from "./ManifestSelection";

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
      config: [
        {
          key: name,
          value: checked,
          isPreviewFeature: true,
        },
      ],
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
  );
};

export default DeferToProduction;
