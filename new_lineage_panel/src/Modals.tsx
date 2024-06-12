import { useContext } from "react";
import { LensTypeBadge } from "./components";
import { LineageContext } from "./App";
import { Modal, ModalBody } from "reactstrap";
import styles from "./styles.module.scss";
import { HeaderSection } from "./TableDetails";
import CloseIcon from "./assets/icons/x-close.svg?react";

export function LensCodeModal() {
  const { lensCodeModal, setLensCodeModal } = useContext(LineageContext);
  if (!lensCodeModal) return;
  return (
    <Modal
      size="lg"
      isOpen={Boolean(lensCodeModal)}
      toggle={() => setLensCodeModal(null)}
      centered
      unmountOnClose
      scrollable
    >
      <ModalBody>
        <div
          className={styles.close_button}
          onClick={() => setLensCodeModal(null)}
        >
          <CloseIcon />
        </div>
        <div className="d-flex flex-column gap-sm">
          <HeaderSection nodeType={"Model"} table={lensCodeModal.table} />
          <div className="d-flex flex-column gap-xs">
            <div className="text-dark-grey fs-xs">Type</div>
            <div className={styles.model_lens_type}>
              <LensTypeBadge lensType={lensCodeModal.lensType} />
              {lensCodeModal.lensType}
            </div>
          </div>
          <div className="d-flex flex-column gap-xs">
            <div className="text-dark-grey fs-xs">Code</div>
            {Object.keys(lensCodeModal.lensCode).map((src) => {
              return (
                <div key={src} className={styles.modal_lens_code_container}>
                  {src}
                  {lensCodeModal.lensCode[src].map((code) => (
                    <div key={code}>{code}</div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
