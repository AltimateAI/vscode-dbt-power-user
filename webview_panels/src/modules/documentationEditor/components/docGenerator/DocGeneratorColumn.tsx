import { executeRequestInSync } from "@modules/app/requestExecutor";
import { updateColumnsInCurrentDocsData } from "@modules/documentationEditor/state/documentationSlice";
import { EntityType } from "@modules/documentationEditor/state/entityType";
import {
  DBTDocumentationColumn,
  DBTModelTest,
  DocsGenerateModelRequestV2,
} from "@modules/documentationEditor/state/types";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { addDocGeneration } from "@modules/documentationEditor/utils";
import { panelLogger } from "@modules/logger";
import { Stack } from "@uicore";
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

  const handleColumnSubmit = async (data: DocsGenerateModelRequestV2) => {
    if (!currentDocsData || !project) {
      return;
    }

    try {
      const requestData = {
        description: data.description,
        user_instructions: data.user_instructions,
        columnName: column.name,
        columns: currentDocsData?.columns,
      };
      const result = (await executeRequestInSync(
        "generateDocsForColumn",
        requestData,
      )) as { columns: Partial<DBTDocumentationColumn>[] };

      // Guard against empty/missing columns — dispatching or indexing [0] on
      // an empty array would crash the reducer and persist a junk history entry.
      const generatedColumn = result.columns?.[0];
      if (!Array.isArray(result.columns) || !generatedColumn) {
        panelLogger.error(
          "generateDocsForColumn returned no generated columns",
          result,
        );
        return;
      }

      dispatch(
        updateColumnsInCurrentDocsData({
          columns: result.columns,
          isNewGeneration: true,
        }),
      );

      await addDocGeneration(project, currentDocsData.name, generatedColumn);
    } catch (error) {
      panelLogger.error("error while generating doc for column", error);
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
      </Stack>
    </div>
  );
};

export default DocGeneratorColumn;
