import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { ChevronRightIcon } from "@assets/icons";
import "./sidebar.css";

const sidebarElem = document.getElementById("sidebar")!;

const Sidebar = ({
  isOpen,
  toggleModal,
  width = 350,
  children,
}: PropsWithChildren<{
  isOpen: boolean;
  toggleModal: () => void;
  width?: number;
}>): JSX.Element => {
  return createPortal(
    <div
      className="sidebar-modal"
      style={{
        width: `${width}px`,
        right: `-${width}px`,
        transform: isOpen ? `translateX(-${width}px)` : ``,
        backgroundColor: "var(--background--01)",
        color: "var(--text-color--paragraph)",
      }}
    >
      {isOpen && (
        <>
          <div className="sidebar-close-button" onClick={toggleModal}>
            <ChevronRightIcon />
          </div>
          <div className="sidebar-background-screen" onClick={toggleModal} />
          <div className="sidebar-modal-content">{children}</div>
        </>
      )}
    </div>,
    sidebarElem,
  );
};

export default Sidebar;
