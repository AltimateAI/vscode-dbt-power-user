import { useContext, useEffect, useMemo } from "react";
import { ViewsTypeBadge } from "./components";
import { LineageContext } from "./App";
import { Modal, ModalBody } from "reactstrap";
import styles from "./styles.module.scss";
import { HeaderSection } from "./TableDetails";
import CloseIcon from "./assets/icons/x-close.svg?react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { useReactFlow } from "reactflow";
import classNames from "classnames";

export function ViewsCodeModal() {
  const { viewsCodeModal, setViewsCodeModal } = useContext(LineageContext);
  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll(true);
    }, 500);
  }, [viewsCodeModal]);

  const flow = useReactFlow();
  const table = useMemo(() => {
    if (!viewsCodeModal) return "";
    return flow.getNode(viewsCodeModal.table)?.data?.label;
  }, [flow, viewsCodeModal]);

  if (!viewsCodeModal) return;
  return (
    <Modal
      size="lg"
      isOpen={Boolean(viewsCodeModal)}
      toggle={() => setViewsCodeModal(null)}
      centered
      unmountOnClose
      scrollable
      className="bs-modal"
    >
      <ModalBody>
        <div
          className={styles.close_button}
          onClick={() => setViewsCodeModal(null)}
        >
          <CloseIcon />
        </div>
        <div className="d-flex flex-column gap-sm">
          {table && (
            <HeaderSection nodeType={viewsCodeModal.nodeType} table={table} />
          )}
          <div className="d-flex flex-column gap-xs">
            <div className="text-dark-grey fs-xs">Type</div>
            <div className={styles.model_views_type}>
              <ViewsTypeBadge viewsType={viewsCodeModal.viewsType} />
              {viewsCodeModal.viewsType}
            </div>
          </div>
          <div className="d-flex flex-column gap-xs">
            <div className="text-dark-grey fs-xs">Code</div>
            {Object.keys(viewsCodeModal.viewsCode).map((src) => {
              return (
                <div key={src} className={styles.modal_views_code_container}>
                  {flow.getNode(src.split("/")[0])?.data?.label}
                  {viewsCodeModal.viewsCode[src]
                    .filter(([, type]) => type === "transform")
                    .map(([code]) => (
                      <div key={code}>
                        <pre
                          className={classNames(
                            "mb-0 p-2",
                            styles.code_editor_container,
                          )}
                        >
                          <code
                            className={classNames(
                              "language-sql",
                              styles.code_editor,
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
