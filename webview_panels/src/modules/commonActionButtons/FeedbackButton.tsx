import { FeedbackIcon } from "@assets/icons";
import { vscode } from "@modules/vscode";
import { Button } from "@uicore";

const FeedbackButton = ({ url }: { url: string }) => {
  const handleFeedbackClick = () => {
    vscode.postMessage({
      command: "openURL",
      url,
    });
  };
  return (
    <Button outline onClick={handleFeedbackClick}>
      <FeedbackIcon /> Feedback
    </Button>
  );
};

export default FeedbackButton;
