import { CommentIcon } from "@assets/icons";
import { ConversationInputForm } from "@lib";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import useAppContext from "@modules/app/useAppContext";
import { panelLogger } from "@modules/logger";
import { Drawer, Card, CardBody, Label, Stack } from "@uicore";
import { FormEvent, useState } from "react";
import classes from "../../styles.module.scss";
import { EntityType } from "@modules/dataPilot/components/docGen/types";

interface Props {
  field: "description";
  value: string;
  name: string;
  model?: string;
  type: EntityType;

}
const AddCoversationButton = ({ model, value, field, name, type }: Props): JSX.Element => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    state: { users, currentUser },
  } = useAppContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    panelLogger.info("adding conversation", comment);
    const result = await executeRequestInSync("createConversation", {
      comment: comment.replace(/@\[(.*?)\]\((.*?)\)/g, "@$2"),
      meta: { field, column: type === EntityType.COLUMN ? name : "", value },
    });
    panelLogger.info("added conversation", result);
    setIsLoading(false);
    setComment("");
  };

  return (
    <Drawer
      buttonProps={{ color: "primary", title: "Start conversation" }}
      buttonText={<CommentIcon />}
      title="Start conversation"
    >
      <Card className="mb-4">
        <CardBody>
          <Stack direction="column">
            <Stack>
              <Label className="mb-0">Model:</Label>
              <div>{model}</div>
            </Stack>
            {type === EntityType.COLUMN ? (
              <Stack>
                <Label className="mb-0">Column:</Label>
                <div>{name}</div>
              </Stack>
            ) : null}
            <Stack>
              <Label className="mb-0">Field:</Label>
              <div>{field}</div>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
      <form onSubmit={handleSubmit} className={classes.conversationInputForm}>
        <ConversationInputForm
          comment={comment}
          setComment={setComment}
          loading={isLoading}
          users={Object.values(users)}
          currentUser={currentUser}
          placeholder="Start a conversation or add others with @"
        />
      </form>
    </Drawer>
  );
};

export default AddCoversationButton;
