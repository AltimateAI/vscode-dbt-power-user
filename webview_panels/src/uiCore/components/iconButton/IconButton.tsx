import { HTMLAttributes, useRef, useState } from "react";
import { Tooltip } from "../../";
import classes from "./styles.module.scss";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  color?: string;
}
const IconButton = (props: Props): JSX.Element => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const idRef = useRef(
    props.id ?? `iconbutton-${Math.random().toString(36).substring(3, 9)}`,
  );

  return (
    <>
      <button
        {...props}
        id={idRef.current}
        className={`btn ${props.color ? `btn-${props.color}` : ""} ${
          props.className ?? ""
        } ${classes.iconButton}`}
      >
        {props.children}
      </button>
      {props.title ? (
        <Tooltip isOpen={tooltipOpen} target={idRef.current} toggle={toggle}>
          {props.title}
        </Tooltip>
      ) : null}
    </>
  );
};

export default IconButton;
