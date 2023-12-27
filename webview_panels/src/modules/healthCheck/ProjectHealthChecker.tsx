import {
  Card,
  CardTitle,
  Badge,
  CardBody,
  CardText,
  Button,
  Col,
} from "reactstrap";
import { executeRequestInAsync } from "../app/requestExecutor";

const ProjectHealthChecker = (): JSX.Element => {
  const handleHealthCheck = () => {
    executeRequestInAsync("altimateScan", {});
  };
  return (
    <Col>
      <Card>
        <CardTitle tag="h5">
          Perform project health check
          <Badge color="primary">Performance</Badge>
        </CardTitle>
        <CardBody>
          <CardText>Run project health check</CardText>
          <Button color="primary" onClick={handleHealthCheck}>
            Start scan
          </Button>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProjectHealthChecker;
