import { ChevronDownIcon } from "@assets/icons";
import { HTMLAttributes } from "react";
import { Button, IconButton, Stack } from "../../";
import classes from "./styles.module.scss";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  onToggleClick: () => void;
}
const DropdownButton = (props: Props): JSX.Element => {
  return (
    <Stack className={classes.dropdownButton}>
      <Button color="primary" {...props}>
        {props.children}
      </Button>
      <IconButton onClick={props.onToggleClick} color="primary">
        <ChevronDownIcon />
      </IconButton>
    </Stack>
  );
};

export default DropdownButton;
