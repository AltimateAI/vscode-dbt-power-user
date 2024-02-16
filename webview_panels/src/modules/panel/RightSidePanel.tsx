import { ChevronRightIcon } from "@assets/icons";
import { Offcanvas, OffcanvasHeader, OffcanvasBody, IconButton } from "@uicore";
import { ReactNode } from "react";
import classes from "./rightPanel.module.scss";

interface Props {
  title: string;
  children: ReactNode;
  onClose: () => void;
}
const RightSidePanel = ({ title, children, onClose }: Props): JSX.Element => {
  return (
    <Offcanvas isOpen direction="end" className={classes.offcanvas}>
      {title ? (
        <OffcanvasHeader>
          <h2>{title}</h2>
        </OffcanvasHeader>
      ) : null}
      <IconButton
        color="primary"
        onClick={onClose}
        className={classes.closeBtn}
      >
        <ChevronRightIcon />
      </IconButton>
      <OffcanvasBody>{children}</OffcanvasBody>
    </Offcanvas>
  );
};

export default RightSidePanel;
