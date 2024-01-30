import { executeRequestInSync } from "@modules/app/requestExecutor";
import { updateColumnsInCurrentDocsData } from "@modules/documentationEditor/state/documentationSlice";
import {
  DocsGenerateModelRequestV2,
  DBTDocumentationColumn,
} from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import {
  addDefaultActions,
  addDocGeneration,
} from "@modules/documentationEditor/utils";
import DocGeneratorInput from "./DocGeneratorInput";
import useAppContext from "@modules/app/useAppContext";
import { RequestState, RequestTypes } from "@modules/dataPilot/types";
import { panelLogger } from "@modules/logger";
import { EntityType } from "@modules/dataPilot/components/types";

interface Props {
  column: DBTDocumentationColumn;
}
const DocGeneratorColumn = ({ column }: Props): JSX.Element => {
  const {
    state: { currentDocsData, project },
    dispatch,
  } = useDocumentationContext();

  const { postMessageToDataPilot } = useAppContext();
  const handleColumnSubmit = async (data: DocsGenerateModelRequestV2) => {
    if (!currentDocsData || !project) {
      return;
    }

    const showInDataPilot = !!column.description;
    const id = crypto.randomUUID();

    try {
      const requestData = {
        description: data.description,
        user_instructions: data.user_instructions,
        columnName: column.name,
        columns: currentDocsData?.columns,
      };
      // Show only in datapilot
      if (showInDataPilot) {
        postMessageToDataPilot({
          id,
          query: `Generate Documentation for “${column.name}” using settings`,
          requestType: RequestTypes.AI_DOC_GENERATION,
          state: RequestState.COMPLETED,
          meta: requestData,
          response: column.description,
          actions: addDefaultActions(
            {
              ...requestData,
              modelName: currentDocsData.name,
            },
            "generateDocsForColumn",
          ),
        });
        return;
      }
      const result = (await executeRequestInSync(
        "generateDocsForColumn",
        requestData,
      )) as { columns: Partial<DBTDocumentationColumn>[] };
      dispatch(updateColumnsInCurrentDocsData(result));

      await addDocGeneration(
        project,
        currentDocsData.name,
        (result as { columns: Partial<DBTDocumentationColumn>[] }).columns[0],
      );
    } catch (error) {
      panelLogger.error("error while generating doc for column", error);
      postMessageToDataPilot({
        id,
        response: (error as Error).message,
        state: RequestState.ERROR,
      });
    }
  };
  return (
    <div>
      <h4>{column.name + (column.type ? " (" + column.type + ")" : "")}</h4>
      <DocGeneratorInput
        onSubmit={handleColumnSubmit}
        placeholder={`Describe ${column.name}`}
        type={EntityType.COLUMN}
        entity={column}
      />
    </div>
  );
};

export default DocGeneratorColumn;
