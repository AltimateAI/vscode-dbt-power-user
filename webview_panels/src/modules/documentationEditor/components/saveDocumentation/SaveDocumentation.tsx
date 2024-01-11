import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { vscode } from "@modules/vscode";
import { Button, Input, Stack } from "@uicore";
import { ChangeEvent, useEffect, useState } from "react";
import classes from "../../styles.module.scss";

const SaveDocumentation = (): JSX.Element => {
  const [patchPath, setPatchPath] = useState("");
  const {
    state: { currentDocsData },
  } = useDocumentationContext();

  const saveDocumentation = () => {
    vscode.postMessage({
      command: "saveDocumentation",
      ...currentDocsData,
      patchPath,
    });
  };

  useEffect(() => {
    if (!currentDocsData?.patchPath) {
      return;
    }

    setPatchPath(currentDocsData.patchPath);
  }, [currentDocsData?.patchPath]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPatchPath(e.target.value);
  };

  return (
    <Stack direction="row" className={classes.save}>
      <h5>Save documentation</h5>
      <Input value={patchPath} onChange={handleChange} />
      <Button onClick={saveDocumentation}>Save documentation</Button>
    </Stack>
  );
};

export default SaveDocumentation;
