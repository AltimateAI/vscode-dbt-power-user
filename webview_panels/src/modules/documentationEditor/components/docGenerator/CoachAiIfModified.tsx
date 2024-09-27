import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { Alert } from "@uicore";
import CoachAi from "@modules/teammate/CoachAi";
import useAppContext from "@modules/app/useAppContext";

const CoachAiIfModified = ({
  column,
  model,
}: {
  column?: string;
  model?: string;
}): JSX.Element | null => {
  const {
    state: { docUpdatedForColumns, currentDocsData, docUpdatedForModel, project },
  } = useDocumentationContext();
  const {
    state: { teammatesEnabled },
  } = useAppContext();

  if (!teammatesEnabled) {
    return null;
  }
  
  if (column && !docUpdatedForColumns.includes(column)) {
    return null;
  }

  if (model && docUpdatedForModel !== model) {
    return null;
  }

  return (
    <Alert color="warning">
      Not happy with the generated documentation? Coach the Datapilot AI{" "}
      <CoachAi context={{ column, model: model ?? currentDocsData?.name, project }} />
    </Alert>
  );
};

export default CoachAiIfModified;
