import useDocumentationContext from "./state/useDocumentationContext";
import { AlertModal, Button } from "@uicore";
import {
  setIsDocGeneratedForAnyColumn,
  setIsTestUpdatedForAnyColumn,
  updateCurrentDocsData,
  updateCurrentDocsTests,
} from "./state/documentationSlice";
import { executeRequestInSync } from "@modules/app/requestExecutor";

enum ActionState {
  CANCEL_STAY,
  SAVE_PROCEED,
  DISCARD_PROCEED,
}

const IncomingDocsDataHandler = (): JSX.Element => {
  const {
    dispatch,
    state: { currentDocsData, incomingDocsData, currentDocsTests },
  } = useDocumentationContext();

  const saveDocumentation = async () => {
    const result = (await executeRequestInSync("saveDocumentation", {
      ...currentDocsData,
      updatedTests: currentDocsTests,
      dialogType: "Existing file",
    })) as { saved: boolean };
    if (result.saved) {
      dispatch(setIsDocGeneratedForAnyColumn(false));
      dispatch(setIsTestUpdatedForAnyColumn(false));
      dispatch(updateCurrentDocsData(incomingDocsData?.docs));
      dispatch(updateCurrentDocsTests(incomingDocsData?.tests));
    }
  };

  const onActionClick = async (actionState: ActionState) => {
    switch (actionState) {
      case ActionState.SAVE_PROCEED:
        await saveDocumentation();
        break;
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
      onClose={() => onActionClick(ActionState.CANCEL_STAY)}
      actionsFooter={
        <>
          <Button
            outline
            onClick={() => onActionClick(ActionState.DISCARD_PROCEED)}
            title={`Documentation editor will discard "${currentDocsData?.name}" changes`}
          >
            Discard changes
          </Button>
          <Button
            outline
            onClick={() => onActionClick(ActionState.CANCEL_STAY)}
            title={`Documentation editor will show model: "${currentDocsData?.name}" changes`}
          >
            Remain in the current state
          </Button>
          <Button
            color="primary"
            onClick={() => onActionClick(ActionState.SAVE_PROCEED)}
            title={`Documentation editor will save model: "${currentDocsData?.name}" changes`}
          >
            Save changes
          </Button>
        </>
      }
    >
      You have unsaved changes in model: ‘{currentDocsData?.name}’. Would you
      like to discard the changes, save them and proceed, or remain in the
      current state?
    </AlertModal>
  );
};

export default IncomingDocsDataHandler;
