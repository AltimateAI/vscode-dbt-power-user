import {
  Card,
  CardTitle,
  Tag,
  CardBody,
  CardText,
  Button,
  Col,
  Stack,
} from "@uicore";
import { executeRequestInAsync } from "../app/requestExecutor";

const ProjectHealthChecker = (): JSX.Element => {
  const handleHealthCheck = () => {
    executeRequestInAsync("altimateScan", {});
  };
  const handleClearProblems = () => {
    executeRequestInAsync("clearAltimateScanResults", {});
  };
  return (
    <Col lg={7}>
      <Card>
        <CardTitle tag="h5">
          Perform project health check
          <Tag color="primary">Performance</Tag>
        </CardTitle>
        <CardBody>
          <CardText>Run project health check</CardText>
          <Stack>
            <Button color="primary" onClick={handleHealthCheck}>
              Start scan
            </Button>
            <Button color="primary" onClick={handleClearProblems}>
              Clear problems
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProjectHealthChecker;
