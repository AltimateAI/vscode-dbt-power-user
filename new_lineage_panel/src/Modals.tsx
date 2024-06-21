import { useContext, useMemo } from "react";
import { CodeBlock, ViewsTypeBadge } from "./components";
import { LineageContext } from "./Lineage";
import { Modal, ModalBody } from "reactstrap";
import styles from "./styles.module.scss";
import { HeaderSection } from "./TableDetails";
import CloseIcon from "./assets/icons/x-close.svg?react";
import { useReactFlow } from "reactflow";

export function ViewsCodeModal() {
  const { viewsCodeModal, setViewsCodeModal } = useContext(LineageContext);

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
              {viewsCodesFlat.map((code) => (
                <CodeBlock key={code} code={code} />
              ))}
            </div>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
}
