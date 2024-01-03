import {
  CopyToClipboardIcon,
  DislikeIcon,
  LikeIcon,
  RefreshIcon,
} from "@assets/icons";
import { Card, CardBody, Stack, IconButton, Button } from "@uicore";
import { useState } from "react";
import Score from "../score/Score";

const DocumentationResult = (): JSX.Element => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails((prev) => !prev);

  return (
    <Card>
      <CardBody>
        <Stack>
          <div>
            The specified filter condition has a function in it. It is
            recommended to avoid using functions in filter conditions as it can
            cause performance issues.
          </div>
          <Score percentage={59} />
        </Stack>
        <Stack style={{ justifyContent: "space-between" }}>
          <Stack>
            <IconButton title="Like">
              <LikeIcon />
            </IconButton>
            <IconButton title="Dislike">
              <DislikeIcon />
            </IconButton>
            <IconButton title="Copy">
              <CopyToClipboardIcon />
            </IconButton>
            <IconButton title="Regenerate">
              <RefreshIcon />
            </IconButton>
          </Stack>
          <Button color="primary" onClick={toggleDetails}>
            {showDetails ? "See Less" : "Details"}
          </Button>
        </Stack>
        {showDetails ? (
          <div>
            <h5>Details</h5>
            <Stack direction="column" style={{ gap: 5 }}>
              <div>
                <b>Reasoning:</b> To generate data quality checks for the table,
                I need to understand the structure and content of the table.
              </div>
              <div>
                <b>Plan:</b> Use schema_sql_db command- Analyze the schema and
                sample rows- Generate data quality checks
              </div>
              <div>
                <b>Criticism:</b> &quot;None&quot;
              </div>
              <div>
                <b>Speak:</b> &quot;I will get the schema and sample rows for
                the airfare_scraped table.&quot;
              </div>
            </Stack>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
};

export default DocumentationResult;
