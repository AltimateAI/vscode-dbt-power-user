import { Button } from "reactstrap";
import styles from "./styles.module.scss";
import { exportLineage } from "./service_utils";
// import { saveLineage } from "./exporter";

 // When the saveLineage is imported and used in the onClick this makes the lineage panel white and unusable
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
            // saveLineage("active-frame");
          }}
        >
          Download
        </Button>
      </div>
      <div className={styles.help_body}>
        <p>
          Placeholder text for the side panel.
          This is to contain options related 
          to download quality and location.
        </p>
        

      </div>
    </div>
  );
}

export { ExportLineage };
