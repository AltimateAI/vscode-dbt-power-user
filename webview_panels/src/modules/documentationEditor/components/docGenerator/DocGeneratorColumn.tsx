import { executeRequestInSync } from "@modules/app/requestExecutor";
import { updateColumnsInCurrentDocsData } from "@modules/documentationEditor/state/documentationSlice";
import {
  DocsGenerateModelRequestV2,
  DBTDocumentationColumn,
} from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { addDocGeneration } from "@modules/documentationEditor/utils";
import DocGeneratorInput from "./DocGeneratorInput";
import useAppContext from "@modules/app/useAppContext";

interface Props {
  column: DBTDocumentationColumn;
}
const DocGeneratorColumn = ({ column }: Props): JSX.Element => {
  const {
    state: { currentDocsData, project },
    dispatch,
  } = useDocumentationContext();

  const { toggleDataPilot, postMessageToDataPilot } = useAppContext();
  const handleColumnSubmit = async (data: DocsGenerateModelRequestV2) => {
    if (!currentDocsData || !project) {
      return;
    }

    toggleDataPilot(true);
    postMessageToDataPilot({ test: 123 });
    const result = await executeRequestInSync("generateDocsForColumn", {
      description: data.description,
      user_instructions: data.user_instructions,
      columnName: column.name,
      columns: currentDocsData?.columns,
    });
    dispatch(
      updateColumnsInCurrentDocsData({
        ...(result as { columns: Partial<DBTDocumentationColumn>[] }),
        isNewGeneration: true,
      }),
    );
    await addDocGeneration(
      project,
      currentDocsData.name,
      (result as { columns: Partial<DBTDocumentationColumn>[] }).columns[0],
    );
  };
  return (
    <div>
      <h4>{column.name}</h4>
      <DocGeneratorInput
        value={column.description ?? ""}
        onSubmit={handleColumnSubmit}
      />
    </div>
  );
};

export default DocGeneratorColumn;
