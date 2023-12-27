import {
  Card,
  CardTitle,
  Badge,
  CardBody,
  CardText,
  Button,
  Col,
} from "reactstrap";

const ProjectHealthChecker = (): JSX.Element => (
  <>
    <Col>
      <Card>
        <CardTitle tag="h5">
          Perform project health check
          <Badge color="primary">Performance</Badge>
        </CardTitle>
        <CardBody>
          <CardText>Run project health check</CardText>
          <Button color="primary">Start scan</Button>
        </CardBody>
      </Card>
    </Col>
    <Col>hi</Col>
  </>
);

export default ProjectHealthChecker;
