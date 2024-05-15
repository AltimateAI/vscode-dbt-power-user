import useDocumentationContext from "./state/useDocumentationContext";
import {
  setIsDocGeneratedForAnyColumn,
  setIsTestUpdatedForAnyColumn,
  updateCurrentDocsData,
  updateCurrentDocsTests,
} from "./state/documentationSlice";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { useEffect } from "react";
import { panelLogger } from "@modules/logger";

enum ActionState {
  CANCEL_STAY = "Stay",
  DISCARD_PROCEED = "Discard",
  SAVE_PROCEED = "Save changes",
}

const useIncomingDocsDataHandler = (): void => {
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

  useEffect(() => {
    if (showAlert) {
      executeRequestInSync("showWarningMessage", {
        infoMessage: `You have unsaved changes in model: ‘${currentDocsData?.name}’. Would you
      like to discard the changes, save them and proceed, or remain in the
      current state?`,
        items: [
          ActionState.DISCARD_PROCEED,
          ActionState.CANCEL_STAY,
          ActionState.SAVE_PROCEED,
        ],
      })
        .then(async (result) => {
          await onActionClick(result as ActionState);
        })
        .catch((err) =>
          panelLogger.error("Error while handling incoming data", err),
        );
    }
  }, [showAlert]);
};

export default useIncomingDocsDataHandler;
