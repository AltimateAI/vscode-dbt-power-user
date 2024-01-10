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
  Stack,
} from "@uicore";
import { useEffect, useState } from "react";
import { SettingsIcon } from "@assets/icons";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "../app/requestExecutor";
import classes from "./defer.module.scss";

interface DeferToProductionProps {
  deferToProduction: boolean;
  favorState: boolean;
  manifestPathForDeferral: string;
}
const DeferToProduction = (): JSX.Element => {
  const [
    { deferToProduction, favorState, manifestPathForDeferral },
    setDeferState,
  ] = useState<DeferToProductionProps>({
    deferToProduction: false,
    favorState: false,
    manifestPathForDeferral: "",
  });
  const [hideBody, setHideBody] = useState(true);

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

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    executeRequestInAsync("updateConfig", { key: name, value: checked });
    updateDeferAndFavorState({ key: name, value: checked });
  };

  const handleManifestPathChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, name } = event.target;
    setDeferState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onManifestBlur = () => {
    executeRequestInAsync("updateConfig", {
      key: "manifestPathForDeferral",
      value: manifestPathForDeferral,
    });
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
            <FormGroup>
              <Stack>
                <Label for="manifestPath" sm={2}>
                  Path to manifest file
                </Label>
                <Input
                  id="manifestPath"
                  name="manifestPathForDeferral"
                  placeholder=""
                  type="text"
                  value={manifestPathForDeferral}
                  onChange={handleManifestPathChange}
                  onBlur={onManifestBlur}
                />
              </Stack>
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
