import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import "./SidebarModal.css";
import CloseIcon from "../assets/icons/x-close.svg?react";

const sidebarElem = document.getElementById("sidebar")!;

function SidebarModal({
  isOpen,
  toggleModal,
  width = 350,
  children,
}: PropsWithChildren<{
  isOpen: boolean;
  toggleModal: () => void;
  width: number;
}>) {
  return createPortal(
    <div
      className="sidebar-modal"
      style={{
        width: `${width}px`,
        right: `-${width}px`,
        transform: isOpen ? `translateX(-${width}px)` : ``,
        backgroundColor: "var(--card-bg)",
        color: "var(--text-color)",
      }}
    >
      {isOpen && (
        <>
          <div className="sidebar-close-button" onClick={toggleModal}>
            <CloseIcon />
          </div>
          <div className="sidebar-background-screen" onClick={toggleModal} />
          <div className="sidebar-modal-content">{children}</div>
        </>
      )}
    </div>,
    sidebarElem
  );
}

export { SidebarModal };
