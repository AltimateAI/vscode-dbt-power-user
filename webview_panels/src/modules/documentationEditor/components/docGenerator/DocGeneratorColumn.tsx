import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import useAppContext from "@modules/app/useAppContext";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import { RequestState, RequestTypes } from "@modules/dataPilot/types";
import { updateColumnsInCurrentDocsData } from "@modules/documentationEditor/state/documentationSlice";
import {
  DBTDocumentationColumn,
  DBTModelTest,
  DocsGenerateModelRequestV2,
} from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import {
  addDefaultActions,
  addDocGeneration,
} from "@modules/documentationEditor/utils";
import { panelLogger } from "@modules/logger";
import { Button, Stack } from "@uicore";
import EntityWithTests from "../tests/EntityWithTests";
import Citations from "./Citations";
import CoachAiIfModified from "./CoachAiIfModified";
import DocGeneratorInput from "./DocGeneratorInput";

interface Props {
  column: DBTDocumentationColumn;
  tests: DBTModelTest[];
}
const DocGeneratorColumn = ({ column, tests }: Props): JSX.Element => {
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
      <DocGeneratorInput
        onSubmit={handleColumnSubmit}
        placeholder={`Describe ${column.name}`}
        type={EntityType.COLUMN}
        entity={column}
        title={column.name}
        tests={tests}
      />
      <EntityWithTests
        title={column.name}
        tests={tests}
        type={EntityType.COLUMN}
      />
      <Stack className="mt-2">
        <Citations citations={column.citations} />
        <CoachAiIfModified column={column.name} />
        <Button
          outline
          size="sm"
          data-testid="docs-column-ask-altimate"
          onClick={() => {
            const modelName = currentDocsData?.name ?? "this model";
            const typeLine = column.type
              ? `\n\nColumn datatype: ${column.type}`
              : "";
            const descLine = column.description
              ? `\n\nCurrent description: ${column.description}`
              : "\n\nThe column has no description yet.";
            const initialMessage = `I'm documenting column \`${column.name}\` in model \`${modelName}\`.${typeLine}${descLine}\n\nAsk me clarifying questions if helpful, then suggest an improved description, any tests I should add, and any governance concerns I should flag.`;
            executeRequestInAsync("openAltimateChat", {
              initialMessage,
              title: `Column: ${modelName}.${column.name}`,
            });
          }}
        >
          Ask Altimate
        </Button>
      </Stack>
    </div>
  );
};

export default DocGeneratorColumn;
