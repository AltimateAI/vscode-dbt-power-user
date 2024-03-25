import { AltimateIcon } from "@assets/icons";
import ResultFeedbackButtons from "@modules/feedback/ResultFeedbackButtons";
import { Button, Card, CardBody, CardTitle, List, Stack } from "@uicore";
import {
  Feedback,
  FeedbackRequest,
  FeedbackType,
} from "../../../feedback/types";
import classes from "../../datapilot.module.scss";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { DataPilotChat } from "../../types";
import UserQuery from "../common/UserQuery";
import useAiGenerationUtils from "../common/useAiGenerationUtils";
import { useCallback } from "react";
import { DocGenFollowup, EntityType } from "./types";

interface Props {
  generatedResults: DocGenFollowup[];
  chat: DataPilotChat;
}
const NewGenerationResults = ({
  generatedResults,
  chat,
}: Props): JSX.Element | null => {
  const handleDocInsert = (result: DocGenFollowup) =>
    executeRequestInAsync("docgen:insert", { ...result });
  const { onAiGenerationRender } = useAiGenerationUtils();

  const getFeedbackData = useCallback(
    (result: DocGenFollowup, feedbackData: Feedback) => {
      const data = {
        requestDetails: chat.meta,
        messageSequence: [
          {
            content: chat.response,
            type: FeedbackType.RESPONSE,
          },
          ...generatedResults.map((r) => {
            const baseData = {
              content: r.description,
              type: FeedbackType.RESPONSE,
            };
            if (result.id === r.id) {
              return { ...feedbackData, ...baseData };
            }
            return baseData;
          }),
        ],
        name: result.name,
        type: chat.meta?.columnName ? EntityType.COLUMN : EntityType.MODEL,
      } as FeedbackRequest;
      return data;
    },
    [chat.meta, chat.response, generatedResults],
  );

  if (!generatedResults.length) {
    return null;
  }
  return (
    <List className={classes.chatList}>
      {generatedResults.map((result) => (
        <>
          <li ref={onAiGenerationRender}>
            <UserQuery query={result.user_prompt} />
          </li>
          <li key={result.name}>
            <Card>
              <CardTitle>
                {" "}
                <AltimateIcon /> {result.datapilot_title}
              </CardTitle>
              <CardBody>
                {result.description}
                <Stack className={classes.actionButtons}>
                  <Stack>
                    <Button
                      color="primary"
                      onClick={() => handleDocInsert(result)}
                    >
                      Insert
                    </Button>
                  </Stack>
                  <ResultFeedbackButtons
                    getFeedbackData={(data: Feedback) =>
                      getFeedbackData(result, data)
                    }
                  />
                </Stack>
              </CardBody>
            </Card>
          </li>
        </>
      ))}
    </List>
  );
};

export default NewGenerationResults;
