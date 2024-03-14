import FeedbackButton from "@modules/commonActionButtons/FeedbackButton";
import { Container, Row, Stack } from "@uicore";
// import BigQueryCostEstimator from "../bigQuery/CostEstimator";
import DeferToProduction from "../defer/DeferToProduction";
import HelpButton from "./components/help/HelpButton";
// import ProjectHealthChecker from "../healthCheck/ProjectHealthChecker";
import classes from "./insights.module.scss";

const Insights = (): JSX.Element => (
  <Container className={classes.insightsContainer}>
    <Stack className={classes.head}>
      <Stack>
        <h3>Actions</h3>
      </Stack>
      <Stack className="align-items-center text-nowrap">
        <HelpButton />
        <FeedbackButton url="https://docs.google.com/forms/d/e/1FAIpQLSfGsy10RxTeLwFSVH_MLBuzRO5ErTm3YVHLt_YtrleDM4FMLQ/viewform" />
      </Stack>
    </Stack>

    <Row>
      <DeferToProduction />
    </Row>
    {/* <Row>
      <BigQueryCostEstimator />
    </Row>
    <Row>
      <ProjectHealthChecker />
    </Row> */}
  </Container>
);

export default Insights;
