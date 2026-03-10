import FeedbackButton from "@modules/commonActionButtons/FeedbackButton";
import HelpButton from "./components/help/HelpButton";
import styles from "./lineage.module.scss";
import MissingLineageMessageComponent from "./MissingLineageMessage";
import { MissingLineageMessage } from "./types";

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
      <div id="settings-container" className="al-tw-scope" />
      <HelpButton />
      <div id="reset-container" className="al-tw-scope" />
      <FeedbackButton
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
