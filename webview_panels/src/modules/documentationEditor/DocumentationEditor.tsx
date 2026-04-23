import { Citation } from "@lib";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import CommonActionButtons from "@modules/commonActionButtons/CommonActionButtons";
import { EntityType } from "@modules/documentationEditor/state/entityType";
import { panelLogger } from "@modules/logger";
import { Stack } from "@uicore";
import { useMemo } from "react";
import ConversationsRightPanel from "./components/conversation/ConversationsRightPanel";
import BulkGenerateButton from "./components/docGenerator/BulkGenerateButton";
import Citations from "./components/docGenerator/Citations";
import CoachAiIfModified from "./components/docGenerator/CoachAiIfModified";
import DocGeneratorColumnsList from "./components/docGenerator/DocGeneratorColumnsList";
import DocGeneratorInput from "./components/docGenerator/DocGeneratorInput";
import { BulkDocumentationPropagationPanel } from "./components/documentationPropagation/DocumentationPropagation";
import DocumentationHelpContent from "./components/help/DocumentationHelpContent";
import SaveDocumentation from "./components/saveDocumentation/SaveDocumentation";
import EntityWithTests from "./components/tests/EntityWithTests";
import { updateCurrentDocsData } from "./state/documentationSlice";
import { DocsGenerateModelRequestV2 } from "./state/types";
import useDocumentationContext from "./state/useDocumentationContext";
import classes from "./styles.module.scss";

const DocumentationEditor = (): JSX.Element => {
  const {
    state: { currentDocsData, currentDocsTests },
    dispatch,
  } = useDocumentationContext();

  const modelTests = useMemo(() => {
    return currentDocsTests?.filter((test) => !test.column_name);
  }, [currentDocsTests]);

  const onModelDocSubmit = async (data: DocsGenerateModelRequestV2) => {
    if (!currentDocsData) {
      return;
    }

    try {
      const result = (await executeRequestInSync("generateDocsForModel", {
        description: data.description,
        user_instructions: data.user_instructions,
        columns: currentDocsData.columns,
      })) as {
        column_descriptions?: {
          column_name: string;
          column_description: string;
          column_citations?: { id: string; content: string }[];
        }[];
        model_description?: string;
        model_citations?: Citation[];
      };

      // Guard against partial responses that would clear the existing description.
      if (
        typeof result.model_description !== "string" ||
        !result.model_description
      ) {
        panelLogger.error(
          "generateDocsForModel returned no model description",
          result,
        );
        return;
      }

      dispatch(
        updateCurrentDocsData({
          name: currentDocsData.name,
          description: result.model_description,
          isNewGeneration: true,
          citations: result.model_citations ?? currentDocsData.citations,
        }),
      );
    } catch (error) {
      panelLogger.error("error while generating doc for model", error);
    }
  };

  if (!currentDocsData) {
    return (
      <div className={classes.docGenerator}>
        <h2>Documentation Help</h2>
        <DocumentationHelpContent showMissingDocumentationMessage />
      </div>
    );
  }

  return (
    <div className={`${classes.documentationWrapper} ${classes.limitWidth}`}>
      <Stack className="mb-2 justify-content-between">
        <h2>Documentation Editor</h2>
        <Stack>
          <SaveDocumentation />
          <BulkGenerateButton />
          <CommonActionButtons />
        </Stack>
      </Stack>
      <div className={classes.docGenerator}>
        <Stack className={classes.bodyWrap}>
          <Stack direction="column" className={classes.body}>
            <Stack direction="column">
              <Stack direction="column" style={{ margin: "1rem 0 10px 0" }}>
                <DocGeneratorInput
                  entity={currentDocsData}
                  type={EntityType.MODEL}
                  onSubmit={onModelDocSubmit}
                  placeholder="Describe your model"
                  title={`Model: ${currentDocsData.name}`}
                  tests={modelTests}
                />
                <EntityWithTests
                  title={currentDocsData.name}
                  tests={modelTests}
                  type={EntityType.MODEL}
                />
                <Stack>
                  <Citations citations={currentDocsData.citations} />
                  <CoachAiIfModified
                    model={currentDocsData.name}
                    extra={{ isModelDoc: true }}
                  />
                </Stack>
              </Stack>
              <DocGeneratorColumnsList />
            </Stack>
          </Stack>
        </Stack>
      </div>
      <ConversationsRightPanel />
      <BulkDocumentationPropagationPanel />
    </div>
  );
};

export default DocumentationEditor;
