import { executeRequestInSync } from "@modules/app/requestExecutor";
import CommonActionButtons from "@modules/commonActionButtons/CommonActionButtons";
import { Container, Stack, Tag } from "@uicore";
import DocGeneratorColumnsList from "./components/docGenerator/DocGeneratorColumnsList";
import DocGeneratorInput from "./components/docGenerator/DocGeneratorInput";
import DocGenerationResult from "./components/result/DocGenerationResult";
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
          <Stack>
            <h1>
              Documentation for {currentDocsData.name}{" "}
              <Tag color="">DATAPILOT</Tag>
            </h1>
          </Stack>
          <Stack direction="column">
            <Stack direction="column" style={{ margin: "30px 0" }}>
              <h4>Description for {currentDocsData.name}</h4>
              <DocGeneratorInput
                value={currentDocsData.description}
                onSubmit={onModelDocSubmit}
              />
            </Stack>
            <DocGeneratorColumnsList />
          </Stack>
          <SaveDocumentation />
        </Stack>
        <DocGenerationResult />
      </Stack>
    </Container>
  );
};

export default DocumentationEditor;
