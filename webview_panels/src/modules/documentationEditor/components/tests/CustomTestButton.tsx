import { ShinesIcon } from "@assets/icons";
import useAppContext from "@modules/app/useAppContext";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import { RequestTypes } from "@modules/dataPilot/types";
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

  const { postMessageToDataPilot } = useAppContext();

  const onClick = () => {
    const id = crypto.randomUUID();

    sendTelemetryEvent(
      TelemetryEvents["DocumentationEditor/AddCustomTestClick"],
      { type, entityName: column },
    );

    postMessageToDataPilot({
      id,
      requestType: RequestTypes.ADD_CUSTOM_TEST,
      meta: {
        column: type === EntityType.MODEL ? undefined : column,
        model: currentDocsData?.name,
      },
      actions: [],
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
