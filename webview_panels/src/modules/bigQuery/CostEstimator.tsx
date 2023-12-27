import {
  Card,
  CardTitle,
  Badge,
  CardBody,
  CardText,
  Button,
  Col,
} from "reactstrap";
import { vscode } from "../vscode";

const BigQueryCostEstimator = (): JSX.Element => {
  const triggerCostEstimate = () => {
    vscode.postMessage({
      command: "bigqueryCostEstimate",
      args: {},
    });
  };
  return (
    <>
      <Col>
        <Card>
          <CardTitle tag="h5">
            BigQuery Cost Estimator
            <Badge color="primary">Performance</Badge>
          </CardTitle>
          <CardBody>
            <CardText>Estimate the cost of a BigQuery query</CardText>
            <Button onClick={triggerCostEstimate} color="primary">
              Estimate cost
            </Button>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card>
          <CardTitle tag="h5">Estimated BigQuery Cost</CardTitle>
          <CardBody>
            <CardText>The query for stg_orders will process 2.2KiB</CardText>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default BigQueryCostEstimator;
