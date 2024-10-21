import { executeRequestInSync } from "@modules/app/requestExecutor";
import { updateColumnsInCurrentDocsData } from "@modules/documentationEditor/state/documentationSlice";
import {
  DocsGenerateModelRequestV2,
  DBTDocumentationColumn,
  DBTModelTest,
  Pages,
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
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import EntityWithTests from "../tests/EntityWithTests";
import { useMemo } from "react";
import CoachAiIfModified from "./CoachAiIfModified";
import Citations from "./Citations";
import { Stack } from "@uicore";

interface Props {
  column: DBTDocumentationColumn;
  tests: DBTModelTest[];
}
const DocGeneratorColumn = ({ column, tests }: Props): JSX.Element => {
  const {
    state: { currentDocsData, project, selectedPages },
    dispatch,
  } = useDocumentationContext();
  const isDocumentationPageSelected = useMemo(
    () => selectedPages.includes(Pages.DOCUMENTATION),
    [selectedPages],
  );
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
      dispatch(
        updateColumnsInCurrentDocsData({ ...result, isNewGeneration: true }),
      );

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
      {isDocumentationPageSelected ? (
        <DocGeneratorInput
          onSubmit={handleColumnSubmit}
          placeholder={`Describe ${column.name}`}
          type={EntityType.COLUMN}
          entity={column}
          title={column.name + (column.type ? " (" + column.type + ")" : "")}
        />
      ) : null}
      <EntityWithTests
        title={column.name}
        tests={tests}
        type={EntityType.COLUMN}
      />
      <Stack className="mt-2">
      <Citations citations={column.citations}/>
      <CoachAiIfModified column={column.name}/>
      </Stack>
    </div>
  );
};

export default DocGeneratorColumn;
