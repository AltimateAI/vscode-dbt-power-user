import { ReactNode, useRef, useState } from "react";
import { Tooltip as ReactStrapTooltip } from "reactstrap";

interface Props {
  children: ReactNode;
  title?: string;
  id?: string;
}
const Tooltip = (props: Props): JSX.Element => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const idRef = useRef(
    props.id ?? `tooltip-${Math.random().toString(36).substring(3, 9)}`,
  );

  return (
    <>
      <span id={idRef.current}>{props.children}</span>
      {props.title ? (
        <ReactStrapTooltip
          isOpen={tooltipOpen}
          target={idRef.current}
          toggle={toggle}
        >
          {props.title}
        </ReactStrapTooltip>
      ) : null}
    </>
  );
};

export default Tooltip;
