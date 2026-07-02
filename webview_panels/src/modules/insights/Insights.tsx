import CreditsChip from "@modules/commonActionButtons/CreditsChip";
import FeedbackButton from "@modules/commonActionButtons/FeedbackButton";
import { Container, Stack, Tabs } from "@uicore";
// import BigQueryCostEstimator from "../bigQuery/CostEstimator";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import Notebooks from "@modules/notebooks/Notebooks";
import { useEffect, useMemo, useState } from "react";
import DeferToProduction from "../defer/DeferToProduction";
import ProjectHealthChecker from "../healthCheck/ProjectHealthChecker";
import HelpButton from "./components/help/HelpButton";
import classes from "./insights.module.scss";

const Insights = (): JSX.Element => {
  const [notebooksEnabled, setNotebooksEnabled] = useState(false);

  useEffect(() => {
    executeRequestInSync("configEnabled", {
      section: "dbt",
      config: "enableNotebooks",
    })
      .then((response) => setNotebooksEnabled(response as boolean))
      .catch((err) => panelLogger.error("error while getting config", err));
  }, []);

  const tabs = useMemo(() => {
    const list = [
      {
        label: "Defer to prod",
        component: <DeferToProduction />,
      },
      {
        label: "Project Governance",
        component: <ProjectHealthChecker />,
      },
    ];

    if (!notebooksEnabled) {
      return list;
    }

    return [
      ...list,
      {
        label: "Notebooks",
        component: <Notebooks />,
      },
    ];
  }, [notebooksEnabled]);

  return (
    <Container className={classes.insightsContainer}>
      <Stack direction="column" className="align-items-start">
        <Stack className={`${classes.head} w-100`}>
          <Stack>
            <h3>Actions</h3>
          </Stack>
          <Stack className="align-items-center text-nowrap">
            <CreditsChip />
            <HelpButton />
            <FeedbackButton url="https://form.jotform.com/251114272082143" />
          </Stack>
        </Stack>
        <Tabs tabs={tabs} />
      </Stack>

      {/* <Row>
      <BigQueryCostEstimator />
    </Row> */}
    </Container>
  );
};

export default Insights;
