import { ShinesIcon } from "@assets/icons";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import useAppContext from "@modules/app/useAppContext";
import CommonActionButtons from "@modules/commonActionButtons/CommonActionButtons";
import { RequestState, RequestTypes } from "@modules/dataPilot/types";
import { panelLogger } from "@modules/logger";
import { Alert, Container, Stack } from "@uicore";
import DocGeneratorColumnsList from "./components/docGenerator/DocGeneratorColumnsList";
import DocGeneratorInput from "./components/docGenerator/DocGeneratorInput";
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
        columns: data.columns,
        name: currentDocsData.name,
      };
      if (showInDataPilot) {
        postMessageToDataPilot({
          id,
          query: `Generate Documentation for “${currentDocsData.name}” using settings`,
          requestType: RequestTypes.AI_DOC_GENERATION,
          state: RequestState.LOADING,
          meta: requestData,
        });
      }
      const result = (await executeRequestInSync("generateDocsForModel", {
        description: data.description,
        user_instructions: data.user_instructions,
        columns: data.columns,
      })) as { description: string };

      dispatch(
        updateCurrentDocsData({
          name: currentDocsData.name,
          description: result.description,
        }),
      );

      if (showInDataPilot) {
        postMessageToDataPilot({
          id,
          response: result.description,
          actions: addDefaultActions(
            {
              ...requestData,
              modelName: currentDocsData.name,
            },
            "generateDocsForModel",
          ),
          state: RequestState.COMPLETED,
        });
      }
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
      <Container className={classes.docGenerator}>
        <div>Loading...</div>
      </Container>
    );
  }

  return (
    <Container className={classes.docGenerator}>
      <Stack className={classes.head}>
        <p>Documentation for {currentDocsData.name}</p>
        <CommonActionButtons />
      </Stack>
      <Stack className={classes.bodyWrap}>
        <Stack direction="column" className={classes.body}>
          <Stack direction="column">
            <h1>Documentation for {currentDocsData.name}</h1>
            <Alert color="warning">
              Doc Generation using AI <ShinesIcon /> is a preview feature.
            </Alert>
          </Stack>
          <Stack direction="column">
            <Stack direction="column" style={{ margin: "30px 0" }}>
              <DocGeneratorInput
                value={currentDocsData.description}
                onSubmit={onModelDocSubmit}
                placeholder="Describe your model"
              />
            </Stack>
            <DocGeneratorColumnsList />
          </Stack>
          <SaveDocumentation />
        </Stack>
      </Stack>
    </Container>
  );
};

export default DocumentationEditor;
