import { CardTitle, Container, Row } from "reactstrap";
import BigQueryCostEstimator from "../bigQuery/CostEstimator";
import DeferToProduction from "../defer/DeferToProduction";
import ProjectHealthChecker from "../healthCheck/ProjectHealthChecker";

const Insights = (): JSX.Element => (
  <Container style={{ maxWidth: "100%" }}>
    <CardTitle tag="h5">Insights</CardTitle>

    <Row>
      <DeferToProduction />
    </Row>
    <Row>
      <BigQueryCostEstimator />
    </Row>
    <Row>
      <ProjectHealthChecker />
    </Row>
  </Container>
);

export default Insights;
