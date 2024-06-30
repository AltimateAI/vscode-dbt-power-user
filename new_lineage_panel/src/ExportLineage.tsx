import { Button } from "reactstrap";
import styles from "./styles.module.scss";
import { exportLineage } from "./service_utils";

function ExportLineage() {
  return (
    <div className="p-3 h-100 d-flex flex-column overflow-y">
      <div className="mb-2 d-flex">
        <div className="fw-semibold fs-5">Export Lineage</div>
        <div className="spacer"></div>
        <Button
          size="sm"
          color="primary"
          onClick={() => {
            exportLineage();
          }}
        >
          Download
        </Button>
      </div>
      <div className={styles.help_body}>
        <p>
          Blah Blah
        </p>
        

      </div>
    </div>
  );
}

export { ExportLineage };
