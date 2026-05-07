import { ShinesIcon } from "@assets/icons";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { EntityType } from "@modules/documentationEditor/state/entityType";
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
    const subject = isModel ? `model "${model}"` : `column "${column}" in model "${model}"`;

    executeRequestInAsync("openAltimateCodeChatForCustomTest", {
      column: isModel ? undefined : column,
      model,
      initialMessage: `Generate Tests for ${subject}
Please provide more information about which tests you need`,
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
