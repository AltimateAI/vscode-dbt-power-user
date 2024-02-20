import FeedbackButton from "@modules/commonActionButtons/FeedbackButton";
import HelpButton from "@modules/commonActionButtons/HelpButton";
import { Container, Row, Stack } from "@uicore";
// import BigQueryCostEstimator from "../bigQuery/CostEstimator";
import DeferToProduction from "../defer/DeferToProduction";
import HelpContent from "./components/help/HelpContent";
// import ProjectHealthChecker from "../healthCheck/ProjectHealthChecker";
import classes from "./insights.module.scss";

const Insights = (): JSX.Element => (
  <Container className={classes.insightsContainer}>
    <Stack className={classes.head}>
      <Stack>
        <h3>Insights</h3>
      </Stack>
      <Stack className="align-items-center text-nowrap">
        <HelpButton>
          <HelpContent />
        </HelpButton>
        <FeedbackButton url="https://docs.google.com/forms/d/e/1FAIpQLSeqFBZX_P4chScTTw8w-reRn2fr7NmeGdy8jISJOPdKEWfLaw/viewform" />
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
