import { CardTitle, Container, Row } from "@uicore";
import BigQueryCostEstimator from "../bigQuery/CostEstimator";
import DeferToProduction from "../defer/DeferToProduction";
import ProjectHealthChecker from "../healthCheck/ProjectHealthChecker";
import classes from "./insights.module.scss";

const Insights = (): JSX.Element => (
  <Container className={classes.insightsContainer}>
    <CardTitle className={classes.title} tag="h4">
      Insights
    </CardTitle>

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
