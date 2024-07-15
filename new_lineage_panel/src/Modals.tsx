import { useContext, useMemo } from "react";
import { CodeBlock, ViewsTypeBadge } from "./components";
import { LineageContext, ViewsCodeModalArgs } from "./Lineage";
import { Modal, ModalBody } from "reactstrap";
import styles from "./styles.module.scss";
import { HeaderSection } from "./TableDetails";
import CloseIcon from "./assets/icons/x-close.svg?react";
import { useReactFlow } from "reactflow";

function ViewsCodeModal({
  viewsCodeModal: viewsCodeArgs,
}: {
  viewsCodeModal: ViewsCodeModalArgs;
}) {
  const flow = useReactFlow();
  const table = useMemo(() => {
    if (!viewsCodeArgs) return "";
    return flow.getNode(viewsCodeArgs.table)?.data?.label;
  }, [flow, viewsCodeArgs]);

  const viewsCodesFlat = useMemo(() => {
    const arr = Object.values(viewsCodeArgs?.viewsCode || [])
      .flat()
      .filter(([, type]) => type === "Transformation")
      .map(([code]) => code);
    const result: string[] = [];
    for (const item of arr) {
      if (result.includes(item)) continue;
      result.push(item);
    }
    return result;
  }, [viewsCodeArgs?.viewsCode]);

  return (
    <div className="d-flex flex-column gap-sm">
      {table && (
        <HeaderSection nodeType={viewsCodeArgs.nodeType} table={table} />
      )}
      <div className="d-flex flex-column gap-xs">
        <div className="text-dark-grey fs-xs">Column</div>
        <div className={styles.model_views_type}>{viewsCodeArgs.column}</div>
      </div>
      <div className="d-flex flex-column gap-xs">
        <div className="text-dark-grey fs-xs">Type</div>
        <div className={styles.model_views_type}>
          <ViewsTypeBadge viewsType={viewsCodeArgs.viewsType} />
          {viewsCodeArgs.viewsType}
        </div>
      </div>
      {viewsCodesFlat.length > 0 && (
        <div className="d-flex flex-column gap-xs">
          <div className="text-dark-grey fs-xs">List of transformations</div>
          {viewsCodesFlat.map((code) => (
            <CodeBlock key={code} code={code} />
          ))}
        </div>
      )}
    </div>
  );
}

// function OpNodeModal() {
//   return;
// }

export function LineageModal() {
  const { modalArgs, setModalArgs } = useContext(LineageContext);
  return (
    <Modal
      size="lg"
      isOpen={modalArgs.type !== "none"}
      toggle={() => setModalArgs({ type: "none" })}
      centered
      unmountOnClose
      scrollable
      className="bs-modal"
    >
      <ModalBody>
        <div
          className={styles.close_button}
          onClick={() => setModalArgs({ type: "none" })}
        >
          <CloseIcon />
        </div>
        {modalArgs.type === "views_code" && (
          <ViewsCodeModal viewsCodeModal={modalArgs.args} />
        )}
      </ModalBody>
    </Modal>
  );
}
