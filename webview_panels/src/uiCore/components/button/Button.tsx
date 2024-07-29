import { useState } from "react";
import { Button as ReactStrapButton, ButtonProps } from "reactstrap";
import Tooltip from "../tooltip/Tooltip";

export const Button = (
  props: ButtonProps,
  buttonText: string,
  icon?: JSX.Element,
  showHoverEffect = false,
): JSX.Element => {
  const isIconPresrent = showHoverEffect && icon ? true : false;
  const [showButtonText, setShowButtonText] = useState<boolean>(
    isIconPresrent ? false : true,
  );
  const mouseHoverAction = (showBtnText: boolean) => {
    if (isIconPresrent) setShowButtonText(showBtnText);
  };
  return (
    <Tooltip title={props.title}>
      <ReactStrapButton
        {...props}
        onMouseEnter={() => mouseHoverAction(true)}
        onMouseLeave={() => mouseHoverAction(false)}
      >
        {isIconPresrent && icon} {showButtonText && buttonText}
      </ReactStrapButton>
    </Tooltip>
  );
};
