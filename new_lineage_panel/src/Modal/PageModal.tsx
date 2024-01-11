import { PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";
import "./PageModal.css";

const elem = document.getElementById("modal")!;

function Modal({ isOpen, children }: PropsWithChildren<{ isOpen: boolean }>) {
  useEffect(() => {
    elem.style.display = isOpen ? "block" : "none";
  }, [isOpen]);
  return createPortal(
    <div className="page-modal">
      {isOpen && <div className="page-modal-content">{children}</div>}
    </div>,
    elem
  );
}

export { Modal };
