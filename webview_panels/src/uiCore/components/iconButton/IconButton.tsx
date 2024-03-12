import { ButtonHTMLAttributes } from "react";
import { Tooltip } from "../../";
import classes from "./styles.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
}
const IconButton = (props: Props): JSX.Element => {
  return (
    <Tooltip title={props.title}>
      <button
        {...props}
        className={`btn ${props.color ? `btn-${props.color}` : ""} ${
          props.className ?? ""
        } ${classes.iconButton}`}
        type={props.type ?? "button"}
      >
        {props.children}
      </button>
    </Tooltip>
  );
};

export default IconButton;
