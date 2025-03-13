import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import CoachAi from "@modules/documentationEditor/components/docGenerator/CoachAi";
import useAppContext from "@modules/app/useAppContext";
import classes from "./coachAi.module.scss";

const CoachAiIfModified = ({
  column,
  model,
  extra,
}: {
  column?: string;
  model?: string;
  extra?: Record<string, unknown>;
}): JSX.Element | null => {
  const {
    state: {
      docUpdatedForColumns,
      currentDocsData,
      docUpdatedForModel,
      project,
    },
  } = useDocumentationContext();
  const {
    state: { tenantInfo },
  } = useAppContext();

  if (!tenantInfo.teammatesEnabled) {
    return null;
  }

  if (column && !docUpdatedForColumns.includes(column)) {
    return null;
  }

  if (model && docUpdatedForModel !== model) {
    return null;
  }

  return (
    <div className={classes.coachAi}>
      Do you want to coach datapilot? Click here{" "}
      <CoachAi
        context={{ column, model: model ?? currentDocsData?.name, project }}
        extra={extra}
      />
    </div>
  );
};

export default CoachAiIfModified;
