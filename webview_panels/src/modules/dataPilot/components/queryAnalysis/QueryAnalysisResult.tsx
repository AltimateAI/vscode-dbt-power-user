import { AltimateIcon, AskIcon, RefreshIcon } from "@assets/icons";
import ResultFeedbackButtons from "@modules/documentationEditor/components/result/ResultFeedbackButtons";
import { Button, Card, CardBody, CardTitle, Input, Stack } from "@uicore";
import { QueryExplainResult, QueryExplainUpdate } from "./types";
import classes from "../../datapilot.module.scss";
import { Feedback } from "../docGen/types";
import { panelLogger } from "@modules/logger";
import UserQuery from "../common/UserQuery";
import QueryAnalysisActionButton from "./QueryAnalysisActionButton";
import { FormEvent } from "react";
import { RequestState } from "@modules/dataPilot/types";

interface Props {
  response: QueryExplainResult;
}
const QueryExplainResultComponent = ({
  response: { datapilot_title, response, user_prompt, actions, state },
}: Props): JSX.Element => {
  const onFeedbackSubmit = (data: Feedback) => {
    panelLogger.info(data);
  };
  const onNewGeneration = (result: QueryExplainUpdate) => {
    panelLogger.info(result);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    panelLogger.info("handleSubmit");
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
          {state === RequestState.LOADING ? (
            <Stack>
              <Button color="warning">Loading...</Button>
            </Stack>
          ) : null}
          {state === RequestState.COMPLETED ? (
            <Stack className={classes.actionButtons}>
              <Stack>
                <Button color="primary" outline>
                  <RefreshIcon />
                </Button>
              </Stack>
              <ResultFeedbackButtons
                onFeedbackSubmit={(data) => onFeedbackSubmit(data)}
              />
            </Stack>
          ) : null}
        </CardBody>
      </Card>
      {actions?.length ? (
        <Stack direction="column">
          <h6>Suggestions</h6>
          <Stack>
            {actions.map((action) => (
              <QueryAnalysisActionButton
                key={action.command}
                action={action}
                onNewGeneration={onNewGeneration}
              />
            ))}
          </Stack>
        </Stack>
      ) : null}
      {state === RequestState.COMPLETED ? (
        <Stack className={classes.askInput}>
          <form onSubmit={handleSubmit}>
            <Input type="textarea" placeholder="Ask a followup" />
            <Button type="submit">
              <AskIcon />
            </Button>
          </form>
        </Stack>
      ) : null}
    </>
  );
};

export default QueryExplainResultComponent;
