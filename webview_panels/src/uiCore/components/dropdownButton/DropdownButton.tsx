import { ChevronDownIcon } from "@assets/icons";
import { Button, ButtonProps } from "reactstrap";
import { IconButton, Stack } from "../../";
import classes from "./styles.module.scss";

interface Props extends ButtonProps {
  onToggleClick: () => void;
}
const DropdownButton = ({ onToggleClick, ...props }: Props): JSX.Element => {
  return (
    <Stack className={classes.dropdownButton}>
      <Button color="primary" {...props}>
        {props.children}
      </Button>
      <IconButton onClick={onToggleClick} color={props.color ?? "primary"}>
        <ChevronDownIcon />
      </IconButton>
    </Stack>
  );
};

export default DropdownButton;
