import { AltimateIcon } from "@assets/icons";
import ResultFeedbackButtons from "@modules/documentationEditor/components/result/ResultFeedbackButtons";
import { Button, Card, CardBody, CardTitle, List, Stack } from "@uicore";
import {
  Feedback,
  EntityType,
  FeedbackRequest,
  FeedbackType,
  GeneratedResult,
} from "./types";
import classes from "../../datapilot.module.scss";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { panelLogger } from "@modules/logger";
import { DataPilotChat } from "../../types";
import UserQuery from "../common/UserQuery";
import useAiGenerationUtils from "../common/useAiGenerationUtils";

interface Props {
  generatedResults: GeneratedResult[];
  chat: DataPilotChat;
}
const NewGenerationResults = ({
  generatedResults,
  chat,
}: Props): JSX.Element | null => {
  const handleDocInsert = (result: GeneratedResult) =>
    executeRequestInAsync("docgen:insert", { ...result });
  const { onAiGenerationRender } = useAiGenerationUtils();

  const onFeedbackSubmit = async (
    feedbackData: Feedback,
    result: GeneratedResult,
  ) => {
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

    panelLogger.info("feedback submitted", data);
    await executeRequestInSync("sendFeedback", {
      comment: feedbackData.feedback_message,
      rating: feedbackData.feedback_type,
      data,
    });
  };

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
                    onFeedbackSubmit={(data) => onFeedbackSubmit(data, result)}
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
