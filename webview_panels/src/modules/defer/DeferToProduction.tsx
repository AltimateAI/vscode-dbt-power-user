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

const DeferToProduction = (): JSX.Element => {
  const [hideBody, setHideBody] = useState(true);

  const toggleBody = () => setHideBody(!hideBody);

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
                <Input type="switch" />
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
              />
            </FormGroup>
            <FormGroup switch>
              <Label>
                Favor-state
                <Input type="switch" />
              </Label>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default DeferToProduction;
