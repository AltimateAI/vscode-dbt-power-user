import { useContext, useEffect, useMemo } from "react";
import { LensTypeBadge } from "./components";
import { LineageContext } from "./App";
import { Modal, ModalBody } from "reactstrap";
import styles from "./styles.module.scss";
import { HeaderSection } from "./TableDetails";
import CloseIcon from "./assets/icons/x-close.svg?react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { useReactFlow } from "reactflow";
import classNames from "classnames";

export function LensCodeModal() {
  const { lensCodeModal, setLensCodeModal } = useContext(LineageContext);
  useEffect(() => {
    Prism.highlightAll(true, console.log);
  }, [lensCodeModal]);

  const flow = useReactFlow();
  const table = useMemo(() => {
    if (!lensCodeModal) return "";
    return flow.getNode(lensCodeModal.table)?.data?.label;
  }, [flow, lensCodeModal]);

  if (!lensCodeModal) return;
  return (
    <Modal
      size="lg"
      isOpen={Boolean(lensCodeModal)}
      toggle={() => setLensCodeModal(null)}
      centered
      unmountOnClose
      scrollable
      className="bs-modal"
    >
      <ModalBody>
        <div
          className={styles.close_button}
          onClick={() => setLensCodeModal(null)}
        >
          <CloseIcon />
        </div>
        <div className="d-flex flex-column gap-sm">
          {table && (
            <HeaderSection nodeType={lensCodeModal.nodeType} table={table} />
          )}
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
                  {flow.getNode(src.split("/")[0])?.data?.label}
                  {lensCodeModal.lensCode[src].map((code) => (
                    <div key={code}>
                      <pre
                        className={classNames(
                          "mb-0 p-2",
                          styles.code_editor_container
                        )}
                      >
                        <code
                          className={classNames(
                            "language-sql",
                            styles.code_editor
                          )}
                        >
                          {code}
                        </code>
                      </pre>
                    </div>
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
