import { Button } from "reactstrap";
import lineageDemoGif from "../../media/images/lineage.gif";
import { openURL } from "./service_utils";

function Demo() {
  return (
    <div className="p-3 h-100 d-flex flex-column overflow-y">
      <div className="mb-2 d-flex">
        <div className="fw-semibold fs-5">Quick Demo of Column Lineage</div>
        <div className="spacer"></div>
        <Button
          size="sm"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            openURL("https://docs.myaltimate.com");
          }}
        >
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
