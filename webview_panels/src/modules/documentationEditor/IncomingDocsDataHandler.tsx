import useDocumentationContext from "./state/useDocumentationContext";
import { AlertModal, Button } from "@uicore";
import {
  setIsDocGeneratedForAnyColumn,
  setIsTestUpdatedForAnyColumn,
  updateCurrentDocsData,
  updateCurrentDocsTests,
} from "./state/documentationSlice";

enum ActionState {
  CANCEL_STAY,
  DISCARD_PROCEED,
}

const IncomingDocsDataHandler = (): JSX.Element => {
  const {
    dispatch,
    state: { currentDocsData, incomingDocsData },
  } = useDocumentationContext();

  const onActionClick = (actionState: ActionState) => {
    switch (actionState) {
      case ActionState.CANCEL_STAY:
        dispatch(updateCurrentDocsData(currentDocsData));
        break;

      case ActionState.DISCARD_PROCEED:
        dispatch(setIsDocGeneratedForAnyColumn(false));
        dispatch(setIsTestUpdatedForAnyColumn(false));
        dispatch(updateCurrentDocsData(incomingDocsData?.docs));
        dispatch(updateCurrentDocsTests(incomingDocsData?.tests));
        break;
      default:
        break;
    }
  };

  const showAlert = incomingDocsData
    ? Object.keys(incomingDocsData).length > 0
    : false;

  return (
    <AlertModal
      isOpen={showAlert}
      title="Save changes?"
      actionsFooter={
        <>
          <Button
            onClick={() => onActionClick(ActionState.CANCEL_STAY)}
            title={`Documentation editor will show ${currentDocsData?.name} changes`}
          >
            Stay, do not proceed
          </Button>
          <Button
            onClick={() => onActionClick(ActionState.DISCARD_PROCEED)}
            title={`Documentation editor will discard ${currentDocsData?.name} changes and show ${incomingDocsData?.docs?.name} data`}
          >
            Cancel and proceed
          </Button>
        </>
      }
    >
      Your changes will be lost!
    </AlertModal>
  );
};

export default IncomingDocsDataHandler;
