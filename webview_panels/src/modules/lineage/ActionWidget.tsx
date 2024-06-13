import MissingLineageMessageComponent from "./MissingLineageMessage";
import { MissingLineageMessage } from "./types";

const ActionWidget = ({
  missingLineageMessage,
}: {
  missingLineageMessage?: MissingLineageMessage;
}): JSX.Element => {
  return (
    <div>
      <MissingLineageMessageComponent
        missingLineageMessage={missingLineageMessage}
      />
    </div>
  );
};

export default ActionWidget;
