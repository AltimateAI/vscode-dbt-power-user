import { executeRequestInSync } from "@modules/app/requestExecutor";
import useAppContext from "@modules/app/useAppContext";
import CommonActionButtons from "@modules/commonActionButtons/CommonActionButtons";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import { RequestState, RequestTypes } from "@modules/dataPilot/types";
import { panelLogger } from "@modules/logger";
import { Button, ButtonGroup, Label, Stack } from "@uicore";
import { useMemo } from "react";
import DocGeneratorColumnsList from "./components/docGenerator/DocGeneratorColumnsList";
import DocGeneratorInput from "./components/docGenerator/DocGeneratorInput";
import DocumentationHelpContent from "./components/help/DocumentationHelpContent";
import SaveDocumentation from "./components/saveDocumentation/SaveDocumentation";
import EntityWithTests from "./components/tests/EntityWithTests";
import {
  addToSelectedPage,
  updateCurrentDocsData,
} from "./state/documentationSlice";
import { DocsGenerateModelRequestV2, Pages } from "./state/types";
import useDocumentationContext from "./state/useDocumentationContext";
import classes from "./styles.module.scss";
import { addDefaultActions } from "./utils";

const DocumentationEditor = (): JSX.Element => {
  const {
    state: { currentDocsData, currentDocsTests, testsEnabled, selectedPages },
    dispatch,
  } = useDocumentationContext();
  const { postMessageToDataPilot } = useAppContext();

  const handleClick = (page: Pages) => {
    dispatch(addToSelectedPage(page));
  };

  const modelTests = useMemo(() => {
    return currentDocsTests?.filter((test) => !test.column_name);
  }, [currentDocsTests]);

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
        <DocumentationHelpContent />
      </div>
    );
  }

  return (
    <div className={classes.documentationWrapper}>
      {testsEnabled ? (
        <ButtonGroup>
          <Button
            color={
              selectedPages.includes(Pages.DOCUMENTATION)
                ? "primary"
                : "secondary"
            }
            onClick={() => handleClick(Pages.DOCUMENTATION)}
          >
            Documentation
          </Button>
          <Button
            color={
              selectedPages.includes(Pages.TESTS) ? "primary" : "secondary"
            }
            onClick={() => handleClick(Pages.TESTS)}
          >
            Tests
          </Button>
          {/* <Button
          color={activePage === Pages.TAGS ? "primary" : "secondary"}
          onClick={() => handleClick(Pages.TAGS)}
        >
          Tags
        </Button> */}
        </ButtonGroup>
      ) : null}
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
                <EntityWithTests
                  title={currentDocsData.name}
                  tests={modelTests}
                  type={EntityType.MODEL}
                />
              </Stack>
              <DocGeneratorColumnsList />
            </Stack>
            <SaveDocumentation />
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default DocumentationEditor;
