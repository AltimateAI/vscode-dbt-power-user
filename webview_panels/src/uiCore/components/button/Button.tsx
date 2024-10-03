import { useState, useEffect, ReactNode } from "react";
import { Button as ReactStrapButton, ButtonProps } from "reactstrap";
import Tooltip from "../tooltip/Tooltip";

interface CustomButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  children?: ReactNode;
}

export const Button = ({
  icon,
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

  const isString = (value: ReactNode): value is string =>
    typeof value === "string";

  return (
    <Tooltip
      id={isString(children) ? children : undefined}
      title={restProps.title}
    >
      <ReactStrapButton
        {...restProps}
        onMouseEnter={() => mouseHoverAction(true)}
        onMouseLeave={() => mouseHoverAction(false)}
      >
        {icon && icon}{" "}
        {children && (
          <span id={isString(children) ? children : undefined}>
            {showButtonText && children}
          </span>
        )}
      </ReactStrapButton>
    </Tooltip>
  );
};
