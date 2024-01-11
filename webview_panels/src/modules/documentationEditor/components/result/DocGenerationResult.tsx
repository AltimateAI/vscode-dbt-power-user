import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Stack } from "@uicore";
import DocumentationResult from "./DocumentationResult";

const DocGenerationResult = (): JSX.Element => {
  const {
    state: { generationHistory },
  } = useDocumentationContext();
  return (
    <Stack direction="column">
      {generationHistory.map((docHistory) => (
        <DocumentationResult key={docHistory.timestamp} history={docHistory} />
      ))}
    </Stack>
  );
};

export default DocGenerationResult;
