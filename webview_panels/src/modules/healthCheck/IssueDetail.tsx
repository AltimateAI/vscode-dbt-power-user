import { Card, Drawer } from "@uicore";
import { ModelInsight } from "./types";
import classes from "./healthcheck.module.scss";

const IssueDetail = ({ insight }: { insight: ModelInsight }): JSX.Element => {
  return (
    <Drawer buttonProps={{ size: "sm" }} buttonText={<>Details</>}>
      <div className="p-2 h-100 d-flex flex-column gap-sm">
        <div className="fw-semibold fs-4">{insight.insight.name}</div>
        <div>
          <div className="text-para mb-1">File</div>
          <Card className={classes.sidebarCard + " text-para"}>
            {insight.original_file_path}
          </Card>
        </div>
        <div>
          <div className="text-para mb-1">Type</div>
          <Card className={classes.sidebarCard + " text-para"}>
            {insight.insight.type}
          </Card>
        </div>
        <div>
          <div className="text-para mb-1">Description</div>
          <Card className={classes.sidebarCard + " text-para"}>
            {insight.insight.message}
          </Card>
        </div>
        <div>
          <div className="text-para mb-1">Reason</div>
          <Card className={classes.sidebarCard + " text-para"}>
            {insight.insight.reason_to_flag}
          </Card>
        </div>
        <div>
          <div className="text-para mb-1">Recommendation</div>
          <Card className={classes.sidebarCard + " text-para"}>
            {insight.insight.recommendation}
          </Card>
        </div>
      </div>
    </Drawer>
  );
};

export { IssueDetail };
