import { useState, useEffect } from "react";
import { Button as ReactStrapButton, ButtonProps } from "reactstrap";
import Tooltip from "../tooltip/Tooltip";

interface CustomButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  showTextAlways?: boolean;
}

export const Button = ({
  icon,
  showTextAlways,
  children,
  ...restProps
}: CustomButtonProps): JSX.Element => {
  const [showButtonText, setShowButtonText] = useState(true);

  useEffect(() => {
    setShowButtonText(!icon);
  }, [icon]);

  const mouseHoverAction = (showBtnText: boolean) => {
    if (icon) {
      setShowButtonText(showBtnText);
    }
  };

  return (
    <Tooltip title={restProps.title}>
      <ReactStrapButton
        {...restProps}
        onMouseEnter={() => mouseHoverAction(true)}
        onMouseLeave={() => mouseHoverAction(false)}
      >
        {icon && icon} {(showTextAlways ?? showButtonText) ? children : null}
      </ReactStrapButton>
    </Tooltip>
  );
};
