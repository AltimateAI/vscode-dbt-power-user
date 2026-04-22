import { TaskLabels } from "@lib";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import useAppContext from "@modules/app/useAppContext";
import { Button, Card, Drawer, Stack } from "@uicore";
import classes from "./healthcheck.module.scss";
import { ModelInsight } from "./types";

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-para mb-1 fw-semibold">{label}</div>
    <Card className={classes.sidebarCard + " text-para"}>{value}</Card>
  </div>
);

const IssueDetail = ({ insight }: { insight: ModelInsight }): JSX.Element => {
  const {
    state: {
      tenantInfo: { frontendUrl },
    },
  } = useAppContext();
  const handleFixWithAltimate = () => {
    const initialMessage = `My dbt project has this governance issue.\n\n**${insight.insight.name}** (severity: ${insight.severity}, type: ${insight.insight.type})\nFile: \`@${insight.original_file_path}\`\n\nDescription: ${insight.insight.message}\nReason flagged: ${insight.insight.reason_to_flag}\nRecommendation: ${insight.insight.recommendation}\n\nExplain why this is flagged and walk me through how to fix it in \`@${insight.original_file_path}\`.`;
    executeRequestInAsync("openAltimateChat", {
      initialMessage,
      title: `Fix: ${insight.insight.name}`,
    });
  };
  return (
    <Drawer buttonProps={{ size: "sm" }} buttonText="Details">
      <div className="p-2 h-100 d-flex flex-column gap-md">
        <Stack className="justify-content-between">
          <div className="fw-semibold fs-4">{insight.insight.name}</div>
          <Stack className="gap-sm">
            <Button
              color="primary"
              size="sm"
              onClick={handleFixWithAltimate}
              data-testid="health-issue-fix-with-altimate"
            >
              Fix with Altimate
            </Button>
            {insight.insight.metadata?.teammate_check_id ? (
              <Button
                onClick={() =>
                  executeRequestInAsync("openURL", {
                    url: `${frontendUrl}/teammates/${TaskLabels.ProjectGovernor}?id=${insight.insight.metadata?.teammate_check_id}`,
                  })
                }
              >
                View check
              </Button>
            ) : null}
          </Stack>
        </Stack>
        <DetailItem label="File" value={insight.original_file_path} />
        <DetailItem label="Type" value={insight.insight.type} />
        <DetailItem label="Description" value={insight.insight.message} />
        <DetailItem label="Reason" value={insight.insight.reason_to_flag} />
        <DetailItem
          label="Recommendation"
          value={insight.insight.recommendation}
        />
      </div>
    </Drawer>
  );
};

export { IssueDetail };
