import { Alert } from "@uicore";
import { MissingLineageMessage } from "./types";

const MissingLineageMessageComponent = ({
  missingLineageMessage,
}: {
  missingLineageMessage?: MissingLineageMessage;
}): JSX.Element | null => {
  if (!missingLineageMessage) {
    return null;
  }
  return (
    <Alert color="warning" className="p-2 mb-0">
      {missingLineageMessage.message}
    </Alert>
  );
};

export default MissingLineageMessageComponent;
