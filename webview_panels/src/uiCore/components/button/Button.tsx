import { useState, useEffect } from "react";
import { Button as ReactStrapButton, ButtonProps } from "reactstrap";
import Tooltip from "../tooltip/Tooltip";

interface CustomButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  showtext?: boolean;
  title?: string;
  buttontext?: string;
}

export const Button = ({
  icon,
  showtext = false,
  title,
  buttontext,
  ...restProps
}: CustomButtonProps): JSX.Element => {
  const [showButtonText, setShowButtonText] = useState<boolean>(showtext);

  useEffect(() => {
    setShowButtonText(showtext || !icon);
  }, [showtext, icon]);

  const mouseHoverAction = (showBtnText: boolean) => {
    if (icon && !showtext) {
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
        {icon && icon} {showButtonText && buttontext}
      </ReactStrapButton>
    </Tooltip>
  );
};
