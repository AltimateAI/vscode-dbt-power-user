import { ArrowDownIcon, ArrowRightIcon } from "@assets/icons";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { Button, Card, CardBody, CardTitle, Dropdown, Stack } from "@uicore";
import { useMemo, useState } from "react";
import classes from "./healthcheck.module.scss";
import { IssueDetail } from "./IssueDetail";
import { ModelInsight, ProjectHealthcheck } from "./types";

const IssueList = ({
  projectHealthcheck,
}: {
  projectHealthcheck: ProjectHealthcheck;
}): JSX.Element => {
  const [fileFilter, setFileFilter] = useState("");
  const [insightTypeFilter, setInsightTypeFilter] = useState("");
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { model_insights } = projectHealthcheck;
  const [openAccordion, setOpenAccordion] = useState<Record<string, boolean>>(
    {},
  );
  const insightFilenames = useMemo(() => {
    return Object.entries(model_insights).map(([k, v]) => ({
      label: v[0].original_file_path,
      value: k,
    }));
  }, [model_insights]);
  const insightTypes = useMemo(
    () =>
      Array.from(
        new Set(
          Object.values(model_insights)
            .flat()
            .map((x) => x.insight.type),
        ),
      ).map((x) => ({ label: x, value: x })),
    [model_insights],
  );
  const filteredModelInsights = useMemo(() => {
    const modelInsights: Record<string, ModelInsight[]> = {};
    const insights = Object.values(model_insights)
      .flat()
      .filter(
        (v) =>
          (!fileFilter || v.unique_id === fileFilter) &&
          (!insightTypeFilter || v.insight.type === insightTypeFilter),
      );
    for (const insight of insights) {
      modelInsights[insight.unique_id] = modelInsights[insight.unique_id] || [];
      modelInsights[insight.unique_id].push(insight);
    }
    return modelInsights;
  }, [fileFilter, insightTypeFilter, model_insights]);
  panelLogger.log(filteredModelInsights);
  return (
    <Card className={classes.container}>
      <CardTitle>
        <Stack className="align-items-center">
          <div className="h5">Issues</div>
          <div className="spacer" />
          <Dropdown
            label="File Name"
            options={insightFilenames}
            onOptionSelect={(k) => setFileFilter(k)}
            selectedValue={fileFilter}
          />
          <Dropdown
            label="Type"
            options={insightTypes}
            onOptionSelect={(k) => setInsightTypeFilter(k)}
            selectedValue={insightTypeFilter}
          />
        </Stack>
      </CardTitle>
      <CardBody>
        <div className={classes.issuesContainer}>
          <div className={classes.tableHeader}>
            {["File", "Types", "Action"].map((h) => (
              <div key={h}>{h}</div>
            ))}
          </div>
          {Object.entries(filteredModelInsights).map(([k, v]) => (
            <>
              <div
                className={classes.tableDataRow}
                key={k}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenAccordion((prev) => ({ ...prev, [k]: !prev[k] }));
                  void executeRequestInSync("openFile", {
                    path: v[0].path,
                  });
                }}
              >
                <div className="d-flex gap-sm align-items-center">
                  {openAccordion[k] ? <ArrowDownIcon /> : <ArrowRightIcon />}
                  <div className="lines-1">{v[0].original_file_path}</div>
                </div>
                <div />
                <div />
              </div>
              {openAccordion[k] &&
                v.map((insight, i) => (
                  <div
                    className={classes.tableDataRowAccordionItem}
                    key={`${k}-${i + 1}`}
                  >
                    <div>{insight.insight.name}</div>
                    <div>{insight.insight.type}</div>
                    <div>
                      <Stack className="gap-sm">
                        <Button
                          color="primary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            const initialMessage = `My dbt project has this governance issue.\n\n**${insight.insight.name}** (severity: ${insight.severity}, type: ${insight.insight.type})\nFile: \`@${insight.original_file_path}\`\n\nDescription: ${insight.insight.message}\nReason flagged: ${insight.insight.reason_to_flag}\nRecommendation: ${insight.insight.recommendation}\n\nExplain why this is flagged and walk me through how to fix it in \`@${insight.original_file_path}\`.`;
                            executeRequestInAsync("openAltimateChat", {
                              initialMessage,
                              title: `Fix: ${insight.insight.name}`,
                            });
                          }}
                          data-testid="health-issue-row-fix-with-altimate"
                        >
                          Fix with Altimate
                        </Button>
                        <IssueDetail insight={insight} />
                      </Stack>
                    </div>
                  </div>
                ))}
            </>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export { IssueList };
