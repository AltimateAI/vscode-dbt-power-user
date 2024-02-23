import { MoreIcon } from "@assets/icons";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Button, IconButton, Popover, PopoverBody, List, Stack } from "@uicore";
import { useEffect, useState } from "react";
import { setIsDocGeneratedForAnyColumn } from "@modules/documentationEditor/state/documentationSlice";
import classes from "../../styles.module.scss";

const SaveDocumentation = (): JSX.Element | null => {
  const [patchPath, setPatchPath] = useState("");
  const [dialogType, setDialogType] = useState("");
  const [openPopover, setOpenPopover] = useState(false);
  const {
    state: { currentDocsData, isDocGeneratedForAnyColumn },
    dispatch,
  } = useDocumentationContext();

  const saveDocumentation = async () => {
    const result = (await executeRequestInSync("saveDocumentation", {
      ...currentDocsData,
      patchPath,
      dialogType,
    })) as { saved: boolean };
    if (result.saved) {
      dispatch(setIsDocGeneratedForAnyColumn(false));
    }
  };

  useEffect(() => {
    if (!currentDocsData?.patchPath) {
      return;
    }

    setPatchPath(currentDocsData.patchPath);
  }, [currentDocsData?.patchPath]);

  const handleChange = (newValue: string) => {
    setDialogType(newValue);
    onClick();
  };

  const onClick = () => {
    setOpenPopover((prev) => !prev);
  };

  const options = [
    { label: "Existing file", value: "Existing file" },
    { label: "New file", value: "New file" },
  ];

  if (!isDocGeneratedForAnyColumn) {
    return null;
  }

  return (
    <Stack direction="row" className={classes.save}>
      <h4>Save documentation</h4>
      <p>{currentDocsData?.patchPath ?? "Write path"}</p>

      {currentDocsData?.patchPath ? null : (
        <>
          <IconButton id="file-path" onClick={onClick}>
            <MoreIcon />
          </IconButton>
          <Popover
            isOpen={openPopover}
            target="file-path"
            placement="top"
            hideArrow
          >
            <PopoverBody className={classes.popoverBody}>
              <List>
                {options.map((option) => (
                  <li key={option.label}>
                    <Button
                      color="link"
                      className={`${
                        dialogType === option.value ? "active" : ""
                      }`}
                      onClick={() => handleChange(option.value)}
                    >
                      {option.label}
                    </Button>
                  </li>
                ))}
              </List>
            </PopoverBody>
          </Popover>
        </>
      )}
      <Button onClick={saveDocumentation}>Save documentation</Button>
    </Stack>
  );
};

export default SaveDocumentation;
