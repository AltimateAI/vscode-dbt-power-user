import { useState } from "react";
import { Button as ReactStrapButton, ButtonProps } from "reactstrap";
import Tooltip from "../tooltip/Tooltip";

export const Button = (props: ButtonProps): JSX.Element => {
  const defaultShowText = props?.showtext ? true : false;
  const isIconPresent = props?.icon ? true : false;

  // Set the initial state based on whether the text should be shown by default
  const [showButtonText, setShowButtonText] =
    useState<boolean>(defaultShowText);

  const mouseHoverAction = (showBtnText: boolean) => {
    // Only toggle the text visibility if `showtext` is false
    if (isIconPresent && !defaultShowText) {
      setShowButtonText(showBtnText);
    }
  };

  return (
    <Tooltip title={props.title}>
      <ReactStrapButton
        {...props}
        onMouseEnter={() => mouseHoverAction(true)}
        onMouseLeave={() => mouseHoverAction(false)}
      >
        {isIconPresent && props?.icon} {showButtonText && props.buttontext}
      </ReactStrapButton>
    </Tooltip>
  );
};
