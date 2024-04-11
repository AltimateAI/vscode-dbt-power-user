import { CommentIcon } from "@assets/icons";
import { ConversationInputForm } from "@lib";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import useAppContext from "@modules/app/useAppContext";
import { panelLogger } from "@modules/logger";
import { Drawer } from "@uicore";
import { FormEvent, useState } from "react";

interface Props {
  field: "description";
  column?: string;
}
const AddCoversationButton = ({ field, column }: Props): JSX.Element => {
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
      meta: { field, column },
    });
    panelLogger.info("added conversation", result);
    setIsLoading(false);
    setComment("");
  };

  return (
    <Drawer
      buttonProps={{ outline: true, style: { right: 50 } }}
      buttonText={<CommentIcon />}
      title="Start conversation"
    >
      <form onSubmit={handleSubmit}>
        <ConversationInputForm
          comment={comment}
          setComment={setComment}
          loading={isLoading}
          users={Object.values(users)}
          currentUser={currentUser}
        />
      </form>
    </Drawer>
  );
};

export default AddCoversationButton;
