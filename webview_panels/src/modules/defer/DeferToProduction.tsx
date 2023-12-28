import { useState } from "react";
import {
  Badge,
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
} from "reactstrap";
import { SettingsIcon } from "../../assets/icons";
import { executeRequestInAsync } from "../app/requestExecutor";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectDeferState } from "./deferSelectors";
import { updateDeferAndFavorState } from "./deferSlice";

const DeferToProduction = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { defer, favorState, manifestPathForDeferral } =
    useAppSelector(selectDeferState);
  const [hideBody, setHideBody] = useState(true);

  const toggleBody = () => setHideBody(!hideBody);

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    executeRequestInAsync("updateConfig", { key: name, value: checked });
    dispatch(updateDeferAndFavorState({ key: name, value: checked }));
  };

  return (
    <Col className="col-6">
      <Card>
        <CardTitle tag="h5">
          Enable defer_to_production
          <Badge color="primary">Performance</Badge>
          <Button onClick={toggleBody}>
            <SettingsIcon />
          </Button>
        </CardTitle>
        <CardBody hidden={hideBody}>
          <CardText>
            Run subset of models without building their parent models
          </CardText>
          <Form>
            <FormGroup switch>
              <Label>
                Defer_to_production
                <Input
                  type="switch"
                  onChange={handleStateChange}
                  name="defer"
                  checked={defer}
                />
              </Label>
            </FormGroup>
            <FormGroup row>
              <Label for="manifestPath" sm={2}>
                Path to manifest file
              </Label>
              <Input
                id="manifestPath"
                name="manifestPath"
                placeholder=""
                type="text"
                value={manifestPathForDeferral}
              />
            </FormGroup>
            <FormGroup switch>
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
