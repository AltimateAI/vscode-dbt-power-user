import { useState } from "react";
import { Button as ReactStrapButton, ButtonProps } from "reactstrap";
import Tooltip from "../tooltip/Tooltip";

interface CustomButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  showText?: boolean;
  title?: string;
  buttontext?: string;
}

export const Button = ({
  icon,
  showText = false,
  title,
  buttontext,
  ...restProps
}: CustomButtonProps): JSX.Element => {
  const isIconPresent = !!icon;
  const [showButtonText, setShowButtonText] = useState<boolean>(showText);

  const mouseHoverAction = (showBtnText: boolean) => {
    if (isIconPresent && !showText) {
      setShowButtonText(showBtnText);
    }
  };

  return (
    <Tooltip title={title}>
      <ReactStrapButton
        {...restProps}
        onMouseEnter={() => mouseHoverAction(true)}
        onMouseLeave={() => mouseHoverAction(false)}
      >
        {isIconPresent && icon} {showButtonText && buttontext}
      </ReactStrapButton>
    </Tooltip>
  );
};
