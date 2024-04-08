import FeedbackButton from "@modules/commonActionButtons/FeedbackButton";
import HelpButton from "@modules/commonActionButtons/HelpButton";
import { Container, Stack, Tabs } from "@uicore";
// import BigQueryCostEstimator from "../bigQuery/CostEstimator";
import DeferToProduction from "../defer/DeferToProduction";
import ProjectHealthChecker from "../healthCheck/ProjectHealthChecker";
import classes from "./insights.module.scss";

const Insights = (): JSX.Element => (
  <Container className={classes.insightsContainer}>
    <Stack direction="column" className="align-items-start">
      <Stack className={`${classes.head} w-100`}>
        <Stack>
          <h3>Actions</h3>
        </Stack>
        <Stack className="align-items-center text-nowrap">
          <HelpButton />
          <FeedbackButton url="https://docs.google.com/forms/d/e/1FAIpQLSfGsy10RxTeLwFSVH_MLBuzRO5ErTm3YVHLt_YtrleDM4FMLQ/viewform" />
        </Stack>
      </Stack>
      <Tabs
        tabs={[
          {
            label: "Defer to prod",
            component: <DeferToProduction />,
          },
          {
            label: "Project Governance",
            component: <ProjectHealthChecker />,
          },
        ]}
      />
    </Stack>

    {/* <Row>
      <BigQueryCostEstimator />
    </Row> */}
  </Container>
);

export default Insights;
