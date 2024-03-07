import { useState } from "react";
import { Col, Card, CardTitle, CardBody, CardText, Button, Tag } from "@uicore";
import { executeRequestInSync } from "../app/requestExecutor";

interface BigQueryCostEstimateResponse {
  modelName: string;
  result: {
    bytes_processed: string;
  };
}
const BigQueryCostEstimator = (): JSX.Element => {
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimatedCost, setEstimatedCost] =
    useState<BigQueryCostEstimateResponse | null>(null);

  const triggerCostEstimate = async () => {
    setIsEstimating(true);
    setEstimatedCost(null);
    const result = await executeRequestInSync("bigqueryCostEstimate", {});
    setIsEstimating(false);
    setEstimatedCost(result as BigQueryCostEstimateResponse);
  };
  return (
    <>
      <Col lg={7}>
        <Card>
          <CardTitle tag="h6">
            BigQuery Cost Estimator
            <Tag color="primary">Performance</Tag>
          </CardTitle>
          <CardBody>
            <CardText>Estimate the cost of a BigQuery query</CardText>
            <Button
              disabled={isEstimating}
              onClick={triggerCostEstimate}
              color="primary"
            >
              Estimate cost
            </Button>
          </CardBody>
        </Card>
      </Col>
      <Col>
        {estimatedCost ?? isEstimating ? (
          <Card>
            <CardTitle tag="h5">Estimated BigQuery Cost</CardTitle>
            <CardBody>
              <CardText>
                {isEstimating
                  ? "Estimating..."
                  : `The query for ${estimatedCost?.modelName} will process ${estimatedCost?.result.bytes_processed}`}
              </CardText>
            </CardBody>
          </Card>
        ) : null}
      </Col>
    </>
  );
};

export default BigQueryCostEstimator;
