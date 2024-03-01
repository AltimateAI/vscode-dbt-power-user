import { ShinesIcon } from "@assets/icons";
import { IconButton, ListGroupItem } from "@uicore";
import classes from "../../styles.module.scss";
import useAppContext from "@modules/app/useAppContext";
import { RequestState, RequestTypes } from "@modules/dataPilot/types";

interface Props {
  column: string;
}
const CustomTestButton = ({ column }: Props): JSX.Element => {
  const { postMessageToDataPilot } = useAppContext();

  const onClick = () => {
    const id = crypto.randomUUID();

    postMessageToDataPilot({
      id,
      query: `Add Custom Test for column: ${column}`,
      requestType: RequestTypes.ADD_CUSTOM_TEST,
      state: RequestState.UNINITIALIZED,
      meta: {},
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
