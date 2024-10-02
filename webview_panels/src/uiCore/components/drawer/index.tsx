import { ChevronRightIcon } from "@assets/icons";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from "react";
import { ReactNode, useState } from "react";
import {
  ButtonProps,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";
import IconButton from "../iconButton/IconButton";
import classes from "./styles.module.scss";
import { Button } from "../..";

interface Props {
  title?: string | ReactNode;
  buttonProps?: ButtonProps;
  buttonText?: ReactNode | string;
  icon?: ReactNode;
  onClose?: () => void;
  onOpen?: () => void;
  children: ReactNode;
  backdrop?: boolean;
}

export interface DrawerRef {
  close: () => void;
  open: () => void;
}

const Drawer: ForwardRefRenderFunction<DrawerRef, Props> = (
  {
    buttonProps,
    buttonText,
    icon,
    title,
    onClose,
    children,
    onOpen,
    backdrop = true,
  },
  ref,
) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    onClose?.();
  };
  const handleShow = () => {
    setShow(true);
    onOpen?.();
  };

  useImperativeHandle(ref, () => ({
    close() {
      setShow(false);
    },
    open() {
      setShow(true);
    },
  }));

  return (
    <>
      {buttonText ? (
        <Button {...buttonProps} onClick={handleShow} icon={icon}>
          {buttonText}
        </Button>
      ) : null}

      <Offcanvas
        isOpen={show}
        onClosed={handleClose}
        toggle={handleClose}
        direction="end"
        className={classes.offcanvas}
        backdrop={backdrop}
        unmountOnClose
      >
        {title ? (
          <OffcanvasHeader>
            <h2>{title}</h2>
          </OffcanvasHeader>
        ) : null}
        <IconButton
          color="primary"
          onClick={handleClose}
          className={classes.closeBtn}
        >
          <ChevronRightIcon />
        </IconButton>
        <OffcanvasBody>{children}</OffcanvasBody>
      </Offcanvas>
    </>
  );
};

export default forwardRef(Drawer);
