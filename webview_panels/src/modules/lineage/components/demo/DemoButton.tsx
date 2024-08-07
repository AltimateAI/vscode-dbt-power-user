import { CloseIcon, PlayCircleIcon } from "@assets/icons";
import { Demo } from "@modules/lineage/Demo";
import { useEffect, useState } from "react";
import { Modal, Button } from "@uicore";
import styles from "../../lineage.module.scss";

const DemoButton = () => {
  const [showDemoButton, setShowDemoButton] = useState(true);
  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    // hide demo button after 10s
    setTimeout(() => {
      setShowDemoButton(false);
    }, 10000);
  }, []);

  return (
    <>
      <Modal
        isOpen={showDemoModal}
        close={() => setShowDemoModal(false)}
        fullscreen
        className={styles.demoModal}
      >
        <Demo />
        <div className="close-btn" onClick={() => setShowDemoModal(false)}>
          <CloseIcon />
        </div>
      </Modal>
      {showDemoButton ? (
        <Button
          color="primary"
          className="d-flex gap-sm align-items-center"
          onClick={(e) => {
            e.stopPropagation();
            setShowDemoModal((b) => !b);
          }}
        >
          Quick demo of Column Lineage
          <PlayCircleIcon />
        </Button>
      ) : null}
    </>
  );
};

export default DemoButton;
