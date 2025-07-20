import { FeedbackIcon } from "@assets/icons";
import { sendTelemetryEvent } from "@modules/documentationEditor/components/telemetry";
import { vscode } from "@modules/vscode";
import { Button } from "@uicore";
import { TelemetryEvents } from "@telemetryEvents";

const FeedbackButton = ({
  url,
  onClose,
  buttonProps,
}: {
  url: string;
  onClose?: () => void;
  buttonProps?: Parameters<typeof Button>[0];
}): JSX.Element => {
  const handleFeedbackClick = () => {
    onClose?.();
    sendTelemetryEvent(TelemetryEvents["DocumentationEditor/FeedbackClick"]);
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
      {...buttonProps}
    >
      Feedback
    </Button>
  );
};

export default FeedbackButton;
