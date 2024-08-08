/* eslint-disable react-refresh/only-export-components */
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
  title?: string;
  buttonProps?: ButtonProps;
  buttonText?: ReactNode | string;
  icon?: JSX.Element;
  onClose?: () => void;
  children: ReactNode;
}

export interface DrawerRef {
  close: () => void;
  open: () => void;
}

const Drawer: ForwardRefRenderFunction<DrawerRef, Props> = (
  { buttonProps, buttonText, icon, title, onClose, children },
  ref,
) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    onClose?.();
  };
  const handleShow = () => {
    setShow(true);
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
        <Button
          {...buttonProps}
          onClick={handleShow}
          buttonText={buttonText}
          icon={icon}
        />
      ) : null}

      <Offcanvas
        isOpen={show}
        onClosed={handleClose}
        toggle={handleClose}
        direction="end"
        className={classes.offcanvas}
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
