import { CommentIcon } from "@assets/icons";
import { updateConversationsRightPanelState } from "@modules/documentationEditor/state/documentationSlice";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Button } from "@uicore";

const ShowConversationsButton = (): JSX.Element => {
  const { dispatch } = useDocumentationContext();
  const handleClick = () => {
    dispatch(updateConversationsRightPanelState(true));
  };
  return (
    <Button
      outline
      onClick={handleClick}
      icon={<CommentIcon />}
      text="Show Conversations"
    />
  );
};

export default ShowConversationsButton;
