import { Button } from "@altimateai/ui-components/lineage";
import { FeedbackIcon } from "@assets/icons";
import FeedbackButton from "@modules/commonActionButtons/FeedbackButton";
import { sendTelemetryEvent } from "@modules/documentationEditor/components/telemetry";
import { vscode } from "@modules/vscode";
import { TelemetryEvents } from "@telemetryEvents";
import HelpButton from "./components/help/HelpButton";
import styles from "./lineage.module.scss";
import MissingLineageMessageComponent from "./MissingLineageMessage";
import { MissingLineageMessage } from "./types";

const LineageFeedbackButton = ({ url }: { url: string }): JSX.Element => {
  const handleFeedbackClick = () => {
    sendTelemetryEvent(TelemetryEvents["DocumentationEditor/FeedbackClick"]);
    vscode.postMessage({ command: "openURL", url });
  };
  return (
    <div className="al-tw-scope">
      <Button
        variant="default"
        size="xs"
        className={styles.collapsibleBtn}
        onClick={handleFeedbackClick}
      >
        <FeedbackIcon />
        <span className={styles.collapsibleBtnText}>Feedback</span>
      </Button>
    </div>
  );
};

const ActionWidget = ({
  missingLineageMessage,
  aiEnabled,
  lineageType,
}: {
  missingLineageMessage?: MissingLineageMessage;
  aiEnabled: boolean;
  lineageType: "sql" | "dynamic";
}): JSX.Element => {
  if (lineageType === "sql") {
    return (
      <div className={styles.actionWidget}>
        <FeedbackButton url="https://app.myaltimate.com/contactus" />
      </div>
    );
  }
  return (
    <div className={styles.actionWidget}>
      <MissingLineageMessageComponent
        missingLineageMessage={missingLineageMessage}
      />

      <div id="expand-container" className="al-tw-scope" />
      <div id="export-container" className="al-tw-scope" />
      <div id="refs-container" className="al-tw-scope" />
      <div id="settings-container" className="al-tw-scope" />
      <HelpButton />
      <div id="reset-container" className="al-tw-scope" />
      <LineageFeedbackButton
        url={
          aiEnabled
            ? "https://form.jotform.com/251106238702145"
            : "https://form.jotform.com/251076719766165"
        }
      />
    </div>
  );
};

export default ActionWidget;
