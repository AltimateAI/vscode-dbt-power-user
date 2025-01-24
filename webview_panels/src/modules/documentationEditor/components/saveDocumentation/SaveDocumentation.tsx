import { executeRequestInSync } from "@modules/app/requestExecutor";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import {
  Button,
  Stack,
  DropdownButton,
  PopoverWithButton,
  PopoverWithButtonRef,
} from "@uicore";
import { MouseEvent, useEffect, useRef, useState } from "react";
import {
  setIsDocGeneratedForAnyColumn,
  setIsTestUpdatedForAnyColumn,
  updateCurrentDocsData,
  setIncomingDocsData,
} from "@modules/documentationEditor/state/documentationSlice";
import classes from "../../styles.module.scss";
import { noop } from "antd/es/_util/warning";
import {
  DBTDocumentation,
  DBTModelTest,
} from "@modules/documentationEditor/state/types";

/**
 * Handles save documentation functionality
 * Conditions:
 *  - save brand new model and no schema.yml
 *  - save brand new model but schema.yml exists, user wants to save in different yml file
 *  - save existing model but no schema.yml entry
 *  - update existing model
 */
const SaveDocumentation = (): JSX.Element | null => {
  const [patchPath, setPatchPath] = useState("");
  const popoverRef = useRef<PopoverWithButtonRef | null>(null);
  const {
    state: {
      currentDocsData,
      isDocGeneratedForAnyColumn,
      currentDocsTests,
      isTestUpdatedForAnyColumn,
    },
    dispatch,
  } = useDocumentationContext();

  const saveDocumentation = async (
    dialogType?: "New file" | "Existing file",
  ) => {
    const result = (await executeRequestInSync("saveDocumentation", {
      ...currentDocsData,
      updatedTests: currentDocsTests,
      patchPath,
      dialogType,
    })) as {
      saved: boolean;
      documentation: DBTDocumentation;
      tests: DBTModelTest[];
    };
    if (result.saved) {
      dispatch(setIsDocGeneratedForAnyColumn(false));
      dispatch(setIsTestUpdatedForAnyColumn(false));
      if (result.documentation) {
        dispatch(updateCurrentDocsData(result.documentation));
      }

      dispatch(
        setIncomingDocsData({
          docs: result.documentation,
          tests: result.tests,
        }),
      );
    }
  };

  const onSaveBtnClick = async (e: MouseEvent) => {
    e.stopPropagation();
    if (!currentDocsData?.patchPath) {
      popoverRef.current?.open();
      return;
    }
    await saveDocumentation();
  };

  useEffect(() => {
    setPatchPath(currentDocsData?.patchPath ?? "");
  }, [currentDocsData?.patchPath]);

  const options = [
    { label: "Existing file", value: "Existing file" },
    { label: "New file", value: "New file" },
  ];

  if (!isDocGeneratedForAnyColumn && !isTestUpdatedForAnyColumn) {
    return null;
  }

  return (
    <PopoverWithButton
      width="auto"
      ref={popoverRef}
      button={
        <DropdownButton
          onToggleClick={noop}
          color="primary"
          onClick={onSaveBtnClick}
        >
          Save
        </DropdownButton>
      }
      popoverProps={{
        placement: "bottom",
        hideArrow: true,
      }}
    >
      {() => (
        <Stack direction="column" className={classes.saveDocumentation}>
          {currentDocsData?.patchPath ? (
            <>
              <h4 className="mb-0">Current path:</h4>
              <p id="file_path">{currentDocsData.patchPath}</p>

              <Stack className="justify-content-end">
                <Button color="primary" onClick={() => saveDocumentation()}>
                  Save
                </Button>
              </Stack>
            </>
          ) : (
            <Stack className="align-items-center">
              <p className="m-0">Save to: </p>
              {options.map((option) => (
                <Button
                  key={option.label}
                  color="primary"
                  onClick={() =>
                    saveDocumentation(
                      option.value as "New file" | "Existing file",
                    )
                  }
                >
                  {option.label}
                </Button>
              ))}
            </Stack>
          )}
        </Stack>
      )}
    </PopoverWithButton>
  );
};

export default SaveDocumentation;
