import { PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";
import "./PageModal.css";
import CloseIcon from "../assets/icons/x-close.svg?react";

const elem = document.getElementById("modal")!;

function Modal({
  isOpen,
  children,
  close,
}: PropsWithChildren<{ isOpen: boolean; close: () => void }>) {
  useEffect(() => {
    elem.style.display = isOpen ? "block" : "none";
  }, [isOpen]);
  return createPortal(
    <div className="page-modal">
      {isOpen && (
        <div className="page-modal-content">
          {children}
          <div className="close-btn" onClick={() => close()}>
            <CloseIcon />
          </div>
        </div>
      )}
    </div>,
    elem
  );
}

export { Modal };
