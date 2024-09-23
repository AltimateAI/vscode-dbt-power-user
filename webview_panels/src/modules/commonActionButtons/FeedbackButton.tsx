import { FeedbackIcon } from "@assets/icons";
import { sendTelemetryEvent } from "@modules/documentationEditor/components/telemetry";
import { vscode } from "@modules/vscode";
import { Button } from "@uicore";
import { TelemetryEvents } from "@telemetryEvents";

const FeedbackButton = ({ url }: { url: string }): JSX.Element => {
  const handleFeedbackClick = () => {
    sendTelemetryEvent(TelemetryEvents["DocumentationEditor/FeedbackClick"]);
    vscode.postMessage({
      command: "openURL",
      url,
    });
  };
  return (
    <Button outline onClick={handleFeedbackClick} icon={<FeedbackIcon />}>
      Feedback
    </Button>
  );
};

export default FeedbackButton;
