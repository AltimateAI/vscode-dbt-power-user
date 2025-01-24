import useDocumentationContext from "./state/useDocumentationContext";
import {
  setIsDocGeneratedForAnyColumn,
  setIsTestUpdatedForAnyColumn,
  updateCurrentDocsData,
  updateCurrentDocsTests,
} from "./state/documentationSlice";
import { executeRequestInSync } from "@modules/app/requestExecutor";

export enum ActionState {
  CANCEL_STAY = "Stay",
  DISCARD_PROCEED = "Discard",
  SAVE_PROCEED = "Save changes",
}

const useIncomingDocsDataHandler = (): {
  showUnsavedChangesDialog: () => Promise<ActionState>;
  saveDocumentation: () => Promise<void>;
  discardDocumentation: () => void;
  cancelDocumentation: () => void;
} => {
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

  const discardDocumentation = () => {
    dispatch(setIsDocGeneratedForAnyColumn(false));
    dispatch(setIsTestUpdatedForAnyColumn(false));
    dispatch(updateCurrentDocsData(incomingDocsData?.docs));
    dispatch(updateCurrentDocsTests(incomingDocsData?.tests));
  };

  const cancelDocumentation = () => {
    dispatch(updateCurrentDocsData(currentDocsData));
  };

  const showUnsavedChangesDialog = async () => {
    return (await executeRequestInSync("showWarningMessage", {
      infoMessage: `You have unsaved changes in model: ‘${currentDocsData?.name}’. Would you
    like to discard the changes, save them and proceed, or remain in the
    current state?`,
      items: [
        ActionState.DISCARD_PROCEED,
        ActionState.CANCEL_STAY,
        ActionState.SAVE_PROCEED,
      ],
    })) as ActionState;
  };

  return {
    showUnsavedChangesDialog,
    saveDocumentation,
    discardDocumentation,
    cancelDocumentation,
  };
};

export default useIncomingDocsDataHandler;
