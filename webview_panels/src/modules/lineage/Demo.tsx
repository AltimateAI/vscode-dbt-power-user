import { Button } from "@uicore";
import { LineageDemo } from "@assets/icons";
import { vscode } from "@modules/vscode";

const Demo = (): JSX.Element => {
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
            vscode.postMessage({
              command: "openURL",
              url: "https://docs.myaltimate.com",
            });
          }}
        >
          Documentation
        </Button>
      </div>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <LineageDemo />
      </div>
    </div>
  );
};

export { Demo };
