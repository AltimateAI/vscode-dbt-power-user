import { PreviewIcon } from "@assets/icons";
import { useRef, useState } from "react";
import { Tooltip } from "@uicore";
import classes from "./tooltip.module.scss";

const PreviewFeatureIcon = (): JSX.Element => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const iconRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <span ref={iconRef}>
        <PreviewIcon />
      </span>
      {iconRef.current ? (
        <Tooltip
          className={classes.tooltip}
          isOpen={tooltipOpen}
          target={iconRef.current}
          toggle={toggle}
        >
          Preview feature
        </Tooltip>
      ) : null}
    </>
  );
};

export default PreviewFeatureIcon;
