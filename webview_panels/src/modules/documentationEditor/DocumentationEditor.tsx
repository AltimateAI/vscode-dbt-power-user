import { ShinesIcon } from "@assets/icons";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import CommonActionButtons from "@modules/commonActionButtons/CommonActionButtons";
import { Alert, Container, Stack } from "@uicore";
import DocGeneratorColumnsList from "./components/docGenerator/DocGeneratorColumnsList";
import DocGeneratorInput from "./components/docGenerator/DocGeneratorInput";
import SaveDocumentation from "./components/saveDocumentation/SaveDocumentation";
import { updateCurrentDocsData } from "./state/documentationSlice";
import { DocsGenerateModelRequestV2 } from "./state/types";
import useDocumentationContext from "./state/useDocumentationContext";
import classes from "./styles.module.scss";

const DocumentationEditor = (): JSX.Element => {
  const {
    state: { currentDocsData },
    dispatch,
  } = useDocumentationContext();

  const onModelDocSubmit = async (data: DocsGenerateModelRequestV2) => {
    const result = await executeRequestInSync("generateDocsForModel", {
      description: data.description,
      user_instructions: data.user_instructions,
      columns: data.columns,
    });
    dispatch(
      updateCurrentDocsData({
        description: (result as { description: string }).description,
      }),
    );
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
