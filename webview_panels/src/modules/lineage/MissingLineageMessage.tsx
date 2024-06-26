import { Alert, Button } from "@uicore";
import { MissingLineageMessage } from "./types";
import { executeRequestInAsync } from "@modules/app/requestExecutor";

const MissingLineageMessageComponent = ({
  missingLineageMessage,
}: {
  missingLineageMessage?: MissingLineageMessage;
}): JSX.Element | null => {
  const openProblemsTab = () => {
    return executeRequestInAsync("openProblemsTab", {});
  };

  if (!missingLineageMessage) {
    return null;
  }
  return (
    <Alert color="warning" className="p-2 mb-0">
      {missingLineageMessage.message}
      {missingLineageMessage.type === "error" ? (
        <>
          <Button
            color="link"
            className={"pt-0 pb-0"}
            style={{ marginTop: -5 }}
            onClick={openProblemsTab}
          >
            Click here
          </Button>{" "}
          to view Problems tab
        </>
      ) : (
        ""
      )}
    </Alert>
  );
};

export default MissingLineageMessageComponent;
