import { ShinesIcon } from "@assets/icons";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { EntityType } from "@modules/documentationEditor/state/entityType";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { TelemetryEvents } from "@telemetryEvents";
import { ListGroupItem } from "@uicore";
import classes from "../../styles.module.scss";
import { sendTelemetryEvent } from "../telemetry";

interface Props {
  column: string;
  type: EntityType;
}

const CustomTestButton = ({ column, type }: Props): JSX.Element => {
  const {
    state: { currentDocsData },
  } = useDocumentationContext();

  const onClick = () => {
    sendTelemetryEvent(
      TelemetryEvents["DocumentationEditor/AddCustomTestClick"],
      { type, entityName: column },
    );

    const model = currentDocsData?.name ?? "";
    const isModel = type === EntityType.MODEL;
    const subject = isModel
      ? `model "${model}"`
      : `column "${column}" in model "${model}"`;

    executeRequestInAsync("openAltimateCodeChatForCustomTest", {
      column: isModel ? undefined : column,
      model,
      initialMessage: `I want to add custom tests for ${subject}. What do you need to know from me to write the right tests?`,
      title: `Add Custom Test for ${isModel ? `model: ${model}` : `column: ${column}`}`,
    });
  };

  return (
    <ListGroupItem
      action
      tag="button"
      className={`${classes.customTest} ${classes.newTestTag} btn btn-outline-secondary`}
      onClick={onClick}
    >
      Custom Test
      <ShinesIcon />
    </ListGroupItem>
  );
};

export default CustomTestButton;
