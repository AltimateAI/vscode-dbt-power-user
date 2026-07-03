import { ErrorBoundary } from "react-error-boundary";
import { ReactNode, useRef, useState } from "react";
import { Tooltip as ReactStrapTooltip, TooltipProps } from "reactstrap";

interface Props {
  children: ReactNode;
  title?: ReactNode;
  id?: string;
  className?: string;
  placement?: TooltipProps["placement"];
  /** Set to false when tooltip content is interactive (e.g. contains links). Keeps tooltip open while hovering over it. */
  autohide?: boolean;
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
          placement={props.placement ?? "auto"}
          autohide={props.autohide ?? true}
        >
          {props.title}
        </ReactStrapTooltip>
      ) : null}
    </ErrorBoundary>
  );
};

export default Tooltip;
