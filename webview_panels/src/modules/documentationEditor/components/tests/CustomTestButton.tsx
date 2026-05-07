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
    const columnInfo =
      type === EntityType.MODEL ? `model \`${model}\`` : `column \`${column}\` in model \`${model}\``;

    executeRequestInAsync("openAltimateCodeChatForCustomTest", {
      column: type === EntityType.MODEL ? undefined : column,
      model,
      initialMessage: `Generate a custom dbt test for the ${columnInfo}. The test should validate data quality and business rules. Please write the test in YAML format compatible with dbt schema.yml.`,
      title: `Custom Test: ${type === EntityType.MODEL ? model : column}`,
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
