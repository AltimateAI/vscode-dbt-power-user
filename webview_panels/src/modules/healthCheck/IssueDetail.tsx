import { Card, Drawer } from "@uicore";
import { ModelInsight } from "./types";
import classes from "./healthcheck.module.scss";

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-para mb-1 fw-semibold">{label}</div>
    <Card className={classes.sidebarCard + " text-para"}>{value}</Card>
  </div>
);

const IssueDetail = ({ insight }: { insight: ModelInsight }): JSX.Element => {
  return (
    <Drawer buttonProps={{ size: "sm" }} buttonText={<>Details</>}>
      <div className="p-2 h-100 d-flex flex-column gap-md">
        <div className="fw-semibold fs-4">{insight.insight.name}</div>
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
