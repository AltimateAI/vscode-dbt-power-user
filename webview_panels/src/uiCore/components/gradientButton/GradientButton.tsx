import { Button as ReactStrapButton, ButtonProps } from "reactstrap";
import Tooltip from "../tooltip/Tooltip";
import classes from "./styles.module.scss";

export const GradientButton = (props: ButtonProps): JSX.Element => (
  <Tooltip title={props.title}>
    <ReactStrapButton
      {...props}
      className={`${props.className ?? ""} ${classes.gradientButton}`}
    />
  </Tooltip>
);
