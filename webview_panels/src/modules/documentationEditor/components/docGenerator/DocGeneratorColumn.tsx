import { executeRequestInSync } from "@modules/app/requestExecutor";
import { updateColumnInCurrentDocsData } from "@modules/documentationEditor/state/documentationSlice";
import {
  DocsGenerateModelRequestV2,
  DBTDocumentationColumn,
} from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import DocGeneratorInput from "./DocGeneratorInput";

interface Props {
  column: DBTDocumentationColumn;
}
const DocGeneratorColumn = ({ column }: Props): JSX.Element => {
  const {
    state: { currentDocsData },
    dispatch,
  } = useDocumentationContext();

  const handleColumnSubmit = async (data: DocsGenerateModelRequestV2) => {
    const result = await executeRequestInSync("generateDocsForColumn", {
      description: data.description,
      user_instructions: data.user_instructions,
      columnName: column.name,
      columns: currentDocsData?.columns,
    });
    dispatch(
      updateColumnInCurrentDocsData({
        column: (result as { columns: Partial<DBTDocumentationColumn>[] })
          .columns[0],
        columnName: column.name,
      }),
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
