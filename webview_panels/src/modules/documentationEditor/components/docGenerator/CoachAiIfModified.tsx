import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Alert } from "@uicore";
import CoachAi from "@modules/teammate/CoachAi";

const CoachAiIfModified = ({
  column,
  model,
}: {
  column?: string;
  model?: string;
}): JSX.Element | null => {
  const {
    state: { docUpdatedForColumns, currentDocsData, docUpdatedForModel },
  } = useDocumentationContext();

  if (column && !docUpdatedForColumns.includes(column)) {
    return null;
  }

  if (model && docUpdatedForModel !== model) {
    return null;
  }

  return (
    <Alert color="warning">
      Do you want to coach datapilot?{" "}
      <CoachAi context={{ column, model: model ?? currentDocsData?.name }} />
    </Alert>
  );
};

export default CoachAiIfModified;
