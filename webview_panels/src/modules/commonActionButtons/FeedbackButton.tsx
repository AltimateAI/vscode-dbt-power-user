import { FeedbackIcon } from "@assets/icons";
import { vscode } from "@modules/vscode";
import { Button } from "@uicore";

const FeedbackButton = ({ url }: { url: string }): JSX.Element => {
  const handleFeedbackClick = () => {
    vscode.postMessage({
      command: "openURL",
      url,
    });
  };
  return (
    <Button
      outline
      onClick={handleFeedbackClick}
      icon={<FeedbackIcon />}
      buttonText="Feedback"
    />
  );
};

export default FeedbackButton;
