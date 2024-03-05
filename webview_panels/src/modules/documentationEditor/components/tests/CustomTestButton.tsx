import { ShinesIcon } from "@assets/icons";
import { IconButton, ListGroupItem } from "@uicore";
import classes from "../../styles.module.scss";
import useAppContext from "@modules/app/useAppContext";
import { RequestTypes } from "@modules/dataPilot/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";

interface Props {
  column: string;
}
const CustomTestButton = ({ column }: Props): JSX.Element => {
  const {
    state: { currentDocsData },
  } = useDocumentationContext();

  const { postMessageToDataPilot } = useAppContext();

  const onClick = () => {
    const id = crypto.randomUUID();

    postMessageToDataPilot({
      id,
      requestType: RequestTypes.ADD_CUSTOM_TEST,
      meta: { column, model: currentDocsData?.name },
      actions: [],
    });
  };

  return (
    <ListGroupItem
      action
      tag="button"
      className={classes.customTest}
      onClick={onClick}
    >
      Custom Test
      <IconButton color="primary">
        <ShinesIcon />
      </IconButton>
    </ListGroupItem>
  );
};

export default CustomTestButton;
