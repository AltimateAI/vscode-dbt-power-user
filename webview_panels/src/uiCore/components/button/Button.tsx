import { useState } from "react";
import { Button as ReactStrapButton, ButtonProps } from "reactstrap";
import Tooltip from "../tooltip/Tooltip";

export const Button = (props: ButtonProps): JSX.Element => {
  const defaultSHowText = props?.showtext ? true : false;
  const isIconPresrent = props?.icon ? true : false;
  const [showButtonText, setShowButtonText] = useState<boolean>(
    isIconPresrent && !defaultSHowText ? false : true,
  );
  const mouseHoverAction = (showBtnText: boolean) => {
    if (isIconPresrent && !defaultSHowText) setShowButtonText(showBtnText);
  };
  return (
    <Tooltip title={props.title}>
      <ReactStrapButton
        {...props}
        onMouseEnter={() => mouseHoverAction(true)}
        onMouseLeave={() => mouseHoverAction(false)}
      >
        {isIconPresrent && props?.icon} {showButtonText && props.buttonText}
      </ReactStrapButton>
    </Tooltip>
  );
};
