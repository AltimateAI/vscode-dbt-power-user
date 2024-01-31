import { executeRequestInSync } from "@modules/app/requestExecutor";
import useAppContext from "@modules/app/useAppContext";
import CommonActionButtons from "@modules/commonActionButtons/CommonActionButtons";
import { EntityType } from "@modules/dataPilot/components/types";
import { RequestState, RequestTypes } from "@modules/dataPilot/types";
import { panelLogger } from "@modules/logger";
import { Label, Stack } from "@uicore";
import DocGeneratorColumnsList from "./components/docGenerator/DocGeneratorColumnsList";
import DocGeneratorInput from "./components/docGenerator/DocGeneratorInput";
import HelpContent from "./components/help/HelpContent";
import SaveDocumentation from "./components/saveDocumentation/SaveDocumentation";
import { updateCurrentDocsData } from "./state/documentationSlice";
import { DocsGenerateModelRequestV2 } from "./state/types";
import useDocumentationContext from "./state/useDocumentationContext";
import classes from "./styles.module.scss";
import { addDefaultActions } from "./utils";

const DocumentationEditor = (): JSX.Element => {
  const {
    state: { currentDocsData },
    dispatch,
  } = useDocumentationContext();
  const { postMessageToDataPilot } = useAppContext();

  const onModelDocSubmit = async (data: DocsGenerateModelRequestV2) => {
    if (!currentDocsData) {
      return;
    }
    const showInDataPilot = !!currentDocsData.description;
    const id = crypto.randomUUID();

    try {
      const requestData = {
        description: data.description,
        user_instructions: data.user_instructions,
        columns: currentDocsData.columns,
        name: currentDocsData.name,
      };
      if (showInDataPilot) {
        postMessageToDataPilot({
          id,
          query: `Generate Documentation for “${currentDocsData.name}”`,
          requestType: RequestTypes.AI_DOC_GENERATION,
          meta: requestData,
          response: currentDocsData.description,
          actions: addDefaultActions(
            {
              ...requestData,
              modelName: currentDocsData.name,
            },
            "generateDocsForModel",
          ),
          state: RequestState.COMPLETED,
        });
        return;
      }

      const result = (await executeRequestInSync("generateDocsForModel", {
        description: data.description,
        user_instructions: data.user_instructions,
        columns: currentDocsData.columns,
      })) as { description: string };

      dispatch(
        updateCurrentDocsData({
          name: currentDocsData.name,
          description: result.description,
        }),
      );
    } catch (error) {
      panelLogger.error("error while generating doc for model", error);
      postMessageToDataPilot({
        id,
        response: (error as Error).message,
        state: RequestState.ERROR,
      });
    }
  };

  if (!currentDocsData) {
    return (
      <div className={classes.docGenerator}>
        <h2>Documentation Help</h2>
        <HelpContent />
      </div>
    );
  }

  return (
    <div className={classes.docGenerator}>
      <Stack className={classes.head}>
        <Stack>
          <h3>Documentation for {currentDocsData.name}</h3>
        </Stack>
        <CommonActionButtons />
      </Stack>
      <Stack className={classes.bodyWrap}>
        <Stack direction="column" className={classes.body}>
          <Stack direction="column">
            <Stack direction="column" style={{ margin: "6px 0" }}>
              <Label className="p1">Description</Label>
              <DocGeneratorInput
                entity={currentDocsData}
                type={EntityType.MODEL}
                onSubmit={onModelDocSubmit}
                placeholder="Describe your model"
              />
            </Stack>
            <DocGeneratorColumnsList />
          </Stack>
          <SaveDocumentation />
        </Stack>
      </Stack>
    </div>
  );
};

export default DocumentationEditor;
