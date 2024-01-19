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
import { RequestState, RequestTypes } from "@modules/dataPilot/types";
import { panelLogger } from "@modules/logger";

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
    const id = crypto.randomUUID();
    postMessageToDataPilot({
      id,
      query: `Generate Documentation for “${column.name}” using settings`,
      requestType: RequestTypes.AI_DOC_GENERATION,
      state: RequestState.LOADING,
    });

    try {
      const result = (await executeRequestInSync("generateDocsForColumn", {
        description: data.description,
        user_instructions: data.user_instructions,
        columnName: column.name,
        columns: currentDocsData?.columns,
      })) as { columns: Partial<DBTDocumentationColumn>[] };
      dispatch(
        updateColumnsInCurrentDocsData({
          ...result,
          isNewGeneration: true,
        }),
      );
      postMessageToDataPilot({
        id,
        response: result.columns[0].description,
        state: RequestState.COMPLETED,
      });
      await addDocGeneration(
        project,
        currentDocsData.name,
        (result as { columns: Partial<DBTDocumentationColumn>[] }).columns[0],
      );
    } catch (error) {
      panelLogger.error("error while generating doc for colum", error);
      postMessageToDataPilot({
        id,
        response: (error as Error).message,
        state: RequestState.ERROR,
      });
    }
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
