import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Stack } from "@uicore";
import DocumentationResult from "./DocumentationResult";
import classes from "../../styles.module.scss";

const DocGenerationResult = (): JSX.Element => {
  const {
    state: { generationHistory },
  } = useDocumentationContext();
  return (
    <Stack direction="column" className={classes.resultBody}>
      {generationHistory.map((docHistory) => (
        <DocumentationResult key={docHistory.timestamp} history={docHistory} />
      ))}
    </Stack>
  );
};

export default DocGenerationResult;
