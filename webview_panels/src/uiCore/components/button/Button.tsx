import { Button as ReactStrapButton, ButtonProps } from "reactstrap";
import Tooltip from "../tooltip/Tooltip";

export const Button = (props: ButtonProps): JSX.Element => (
  <Tooltip title={props.title}>
    <ReactStrapButton {...props} />
  </Tooltip>
);