import { ShinesIcon } from "@assets/icons";
import { ListGroupItem, Tag } from "@uicore";
import classes from "../../styles.module.scss";
import useAppContext from "@modules/app/useAppContext";
import { RequestTypes } from "@modules/dataPilot/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { EntityType } from "@modules/dataPilot/components/docGen/types";

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
      <Tag>Beta</Tag>
    </ListGroupItem>
  );
};

export default CustomTestButton;
