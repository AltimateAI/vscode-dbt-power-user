/* eslint-disable react-refresh/only-export-components */
import {
  forwardRef,
  ForwardRefRenderFunction,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Popover, PopoverBody, PopoverProps } from "reactstrap";
import styles from "./styles.module.scss";

interface Props {
  button: ReactNode;
  title?: string | ReactNode;
  width?: number | string;
  popoverProps?: Omit<PopoverProps, "target">;
  children: (args: {
    styles: CSSModuleClasses;
    close: () => void;
  }) => ReactNode;
}

export interface PopoverWithButtonRef {
  close: () => void;
  open: () => void;
}

const PopoverWithButton: ForwardRefRenderFunction<
  PopoverWithButtonRef,
  Props
> = ({ title, button, children, popoverProps, width = 350 }, ref) => {
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const onBodyClick = (e: MouseEvent) => {
    if (popoverRef.current?.contains(e.target as Node)) {
      return;
    }
    onClose();
  };

  const onOpen = (e?: ReactMouseEvent) => {
    e?.stopPropagation();
    setShowPopover(true);
    document.body.addEventListener("mouseup", onBodyClick);
  };

  const onClose = () => {
    setShowPopover(false);
    document.body.removeEventListener("mouseup", onBodyClick);
  };

  useImperativeHandle(ref, () => ({
    close() {
      onClose();
    },
    open() {
      onOpen();
    },
  }));

  return (
    <>
      <span ref={buttonRef} onClick={onOpen}>
        {button}
      </span>
      <Popover
        isOpen={showPopover}
        target={buttonRef}
        {...popoverProps}
        className={`${popoverProps?.className ?? ""} ${styles.popover}`}
        style={{ width }}
      >
        <div ref={popoverRef}>
          <PopoverBody>
            {title ? <h4>{title}</h4> : null}
            {children({ styles, close: onClose })}
          </PopoverBody>
        </div>
      </Popover>
    </>
  );
};

export default forwardRef(PopoverWithButton);
