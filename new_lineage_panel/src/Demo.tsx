import { Button } from "reactstrap";
import lineageDemoGif from "../../media/images/lineage.gif";

function Demo() {
  return (
    <div className="p-3 h-100 d-flex flex-column overflow-y">
      <div className="mb-2 d-flex">
        <div className="fw-semibold fs-5">Quick Demo of Column Lineage</div>
        <div className="spacer"></div>
        <Button size="sm" color="primary">
          Documentation
        </Button>
      </div>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <img src={lineageDemoGif} />
      </div>
    </div>
  );
}

export { Demo };
