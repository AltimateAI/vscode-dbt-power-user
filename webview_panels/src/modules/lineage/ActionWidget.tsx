import { Button, Table } from "@altimateai/ui-components/lineage";
import { FeedbackIcon } from "@assets/icons";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
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

const describeNode = (node: Table): string => {
  const parts: string[] = [];
  parts.push(`Model: ${node.label ?? node.table}`);
  parts.push(`Type: ${node.nodeType}`);
  if (node.materialization) {
    parts.push(`Materialization: ${node.materialization}`);
  }
  if (node.schema) {
    parts.push(`Schema: ${node.schema}`);
  }
  parts.push(`Upstream dependencies: ${node.upstreamCount}`);
  parts.push(`Downstream consumers: ${node.downstreamCount}`);
  return parts.join("\n");
};

const AskLineageButton = ({ node }: { node: Table }): JSX.Element => {
  const handleClick = () => {
    const label = node.label ?? node.table;
    const initialMessage = `I'm looking at the lineage for \`${label}\` in my dbt project.\n\n${describeNode(
      node,
    )}\n\nWalk me through how this model is built, call out the upstream sources and transformations I should pay attention to, and flag any columns that look risky to change.`;
    executeRequestInAsync("openAltimateChat", {
      initialMessage,
      title: `Lineage: ${label}`,
    });
  };
  return (
    <div className="al-tw-scope">
      <Button
        variant="default"
        size="xs"
        className={styles.collapsibleBtn}
        onClick={handleClick}
        data-testid="lineage-ask-altimate"
      >
        <span className={styles.collapsibleBtnText}>Ask Altimate</span>
      </Button>
    </div>
  );
};

const ImpactCommsButton = ({ node }: { node: Table }): JSX.Element => {
  const handleClick = () => {
    const label = node.label ?? node.table;
    const initialMessage = `I'm planning a breaking change to \`${label}\`.\n\n${describeNode(
      node,
    )}\n\nDraft a change-impact note I can send to downstream consumers: who is affected, what might break, suggested rollout timing, and what I should ask reviewers to verify.`;
    executeRequestInAsync("openAltimateChat", {
      initialMessage,
      title: `Impact: ${label}`,
    });
  };
  return (
    <div className="al-tw-scope">
      <Button
        variant="default"
        size="xs"
        className={styles.collapsibleBtn}
        onClick={handleClick}
        data-testid="lineage-impact-comms"
      >
        <span className={styles.collapsibleBtnText}>Impact note</span>
      </Button>
    </div>
  );
};

const ActionWidget = ({
  missingLineageMessage,
  aiEnabled,
  lineageType,
  node,
}: {
  missingLineageMessage?: MissingLineageMessage;
  aiEnabled: boolean;
  lineageType: "sql" | "dynamic";
  node?: Table;
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
      {node ? <AskLineageButton node={node} /> : null}
      {node ? <ImpactCommsButton node={node} /> : null}
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
