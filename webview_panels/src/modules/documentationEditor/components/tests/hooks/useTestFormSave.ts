import { executeRequestInSync } from "@modules/app/requestExecutor";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { useState } from "react";
import { SaveRequest } from "../types";

const useTestFormSave = (): {
  handleSave: (data: SaveRequest, column: string) => Promise<void>;
  isSaving: boolean;
} => {
  const [isSaving, setIsSaving] = useState(false);
  const {
    state: { currentDocsData },
  } = useDocumentationContext();

  const handleSave = async (data: SaveRequest, column: string) => {
    setIsSaving(true);

    (await executeRequestInSync("saveDocumentation", {
      ...currentDocsData,
      tests: {
        column,
        ...data,
      },
      patchPath: currentDocsData?.patchPath,
      dialogType: "Existing file",
    })) as { saved: boolean };
  };

  return { handleSave, isSaving };
};

export default useTestFormSave;
