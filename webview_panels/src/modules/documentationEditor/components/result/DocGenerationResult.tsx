import { Stack } from "@uicore";
import DocumentationResult from "./DocumentationResult";

const DocGenerationResult = (): JSX.Element => {
  return (
    <Stack direction="column">
      <DocumentationResult />
      <DocumentationResult />
      <DocumentationResult />
    </Stack>
  );
};

export default DocGenerationResult;
