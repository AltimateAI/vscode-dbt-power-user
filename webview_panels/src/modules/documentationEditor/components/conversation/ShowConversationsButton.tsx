import { CommentIcon } from "@assets/icons";
import { updateConversationsRightPanelState } from "@modules/documentationEditor/state/documentationSlice";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Button } from "@uicore";

const ShowConversationsButton = ({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element => {
  const { dispatch } = useDocumentationContext();
  const handleClick = () => {
    onClose();
    dispatch(updateConversationsRightPanelState(true));
  };
  return (
    <Button outline onClick={handleClick}>
      <CommentIcon /> Show Conversations
    </Button>
  );
};

export default ShowConversationsButton;
