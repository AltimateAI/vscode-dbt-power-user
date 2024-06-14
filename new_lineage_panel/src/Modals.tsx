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

  const viewsCodesFlat = useMemo(() => {
    const arr = Object.values(viewsCodeModal?.viewsCode || [])
      .flat()
      .filter(([, type]) => type === "transform")
      .map(([code]) => code);
    const result: string[] = [];
    for (const item of arr) {
      if (result.includes(item)) continue;
      result.push(item);
    }
    return result;
  }, [viewsCodeModal?.viewsCode]);

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
            <div className="text-dark-grey fs-xs">Column</div>
            <div className={styles.model_views_type}>
              {viewsCodeModal.column}
            </div>
          </div>
          <div className="d-flex flex-column gap-xs">
            <div className="text-dark-grey fs-xs">Type</div>
            <div className={styles.model_views_type}>
              <ViewsTypeBadge viewsType={viewsCodeModal.viewsType} />
              {viewsCodeModal.viewsType}
            </div>
          </div>
          {viewsCodesFlat.length > 0 && (
            <div className="d-flex flex-column gap-xs">
              <div className="text-dark-grey fs-xs">
                List of transformations
              </div>
              {viewsCodesFlat.map((code) => {
                return (
                  <div key={code} className={styles.modal_views_code_container}>
                    <div className="d-flex gap-sm align-items-center">
                      <pre className={styles.code_editor_container}>
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
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
}
