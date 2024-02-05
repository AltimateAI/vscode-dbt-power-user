import { AltimateIcon, RefreshIcon } from "@assets/icons";
import ResultFeedbackButtons from "@modules/documentationEditor/components/result/ResultFeedbackButtons";
import { Button, Card, CardBody, CardTitle, Stack } from "@uicore";
import { SqlExplainResult } from "./types";
import classes from "../../datapilot.module.scss";
import { Feedback } from "../docGen/types";
import { panelLogger } from "@modules/logger";
import UserQuery from "../common/UserQuery";

interface Props {
  response: SqlExplainResult;
}
const SqlExplainResultComponent = ({
  response: { datapilot_title, response, user_prompt },
}: Props): JSX.Element => {
  const onFeedbackSubmit = (data: Feedback) => {
    panelLogger.info(data);
  };
  return (
    <>
      <UserQuery query={user_prompt} />

      <Card>
        <CardTitle>
          {" "}
          <AltimateIcon /> {datapilot_title}
        </CardTitle>
        <CardBody>
          {response}
          <Stack className={classes.actionButtons}>
            <Stack>
              <Button color="primary">
                <RefreshIcon />
              </Button>
            </Stack>
            <ResultFeedbackButtons
              onFeedbackSubmit={(data) => onFeedbackSubmit(data)}
            />
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default SqlExplainResultComponent;
