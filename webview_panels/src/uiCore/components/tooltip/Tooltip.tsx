import { ErrorBoundary } from "react-error-boundary";
import { ReactNode, useRef, useState } from "react";
import { Tooltip as ReactStrapTooltip } from "reactstrap";

interface Props {
  children: ReactNode;
  title?: string;
  id?: string;
  className?: string;
}
const Tooltip = (props: Props): JSX.Element => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const idRef = useRef(
    (
      props.id ?? `tooltip-${Math.random().toString(36).substring(3, 9)}`
    ).replace(/\s/g, "-"),
  );

  return (
    <ErrorBoundary fallback={<span id={idRef.current}>{props.children}</span>}>
      <span id={idRef.current}>{props.children}</span>
      {props.title ? (
        <ReactStrapTooltip
          isOpen={tooltipOpen}
          target={idRef.current}
          toggle={toggle}
          className={props.className}
        >
          {props.title}
        </ReactStrapTooltip>
      ) : null}
    </ErrorBoundary>
  );
};

export default Tooltip;
