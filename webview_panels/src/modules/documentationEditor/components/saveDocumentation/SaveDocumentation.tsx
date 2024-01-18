import { MoreIcon } from "@assets/icons";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { vscode } from "@modules/vscode";
import { Button, IconButton, Popover, PopoverBody, List, Stack } from "@uicore";
import { useEffect, useState } from "react";
import classes from "../../styles.module.scss";

const SaveDocumentation = (): JSX.Element | null => {
  const [patchPath, setPatchPath] = useState("");
  const [dialogType, setDialogType] = useState("");
  const [openPopover, setOpenPopover] = useState(false);
  const {
    state: { currentDocsData, isDocGeneratedForAnyColumn },
  } = useDocumentationContext();

  const saveDocumentation = () => {
    vscode.postMessage({
      command: "saveDocumentation",
      ...currentDocsData,
      patchPath,
      dialogType,
    });
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
      <h5>Save documentation</h5>
      <p>Write path</p>

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
                  className={`${dialogType === option.value ? "active" : ""}`}
                  onClick={() => handleChange(option.value)}
                >
                  {option.label}
                </Button>
              </li>
            ))}
          </List>
        </PopoverBody>
      </Popover>

      <Button onClick={saveDocumentation}>Save documentation</Button>
    </Stack>
  );
};

export default SaveDocumentation;
