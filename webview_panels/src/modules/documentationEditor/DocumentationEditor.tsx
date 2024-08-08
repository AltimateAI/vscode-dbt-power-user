import { CheckedSquareIcon, EmptySquareIcon } from "@assets/icons";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import useAppContext from "@modules/app/useAppContext";
import CommonActionButtons from "@modules/commonActionButtons/CommonActionButtons";
import { EntityType } from "@modules/dataPilot/components/docGen/types";
import { RequestState, RequestTypes } from "@modules/dataPilot/types";
import { panelLogger } from "@modules/logger";
import { Button, Stack } from "@uicore";
import { useMemo } from "react";
import DocGeneratorColumnsList from "./components/docGenerator/DocGeneratorColumnsList";
import DocGeneratorInput from "./components/docGenerator/DocGeneratorInput";
import DocumentationHelpContent from "./components/help/DocumentationHelpContent";
import SaveDocumentation from "./components/saveDocumentation/SaveDocumentation";
import EntityWithTests from "./components/tests/EntityWithTests";
import {
  addToSelectedPage,
  removeFromSelectedPage,
  updateCurrentDocsData,
} from "./state/documentationSlice";
import { DocsGenerateModelRequestV2, Pages } from "./state/types";
import useDocumentationContext from "./state/useDocumentationContext";
import classes from "./styles.module.scss";
import { addDefaultActions } from "./utils";
import ConversationsRightPanel from "./components/conversation/ConversationsRightPanel";
import useIncomingDocsDataHandler from "./useIncomingDocsDataHandler";

const DocumentationEditor = (): JSX.Element => {
  const {
    state: { currentDocsData, currentDocsTests, selectedPages },
    dispatch,
  } = useDocumentationContext();
  const { postMessageToDataPilot } = useAppContext();
  useIncomingDocsDataHandler();

  const handleClick = (page: Pages) => {
    if (selectedPages.includes(page)) {
      dispatch(removeFromSelectedPage(page));
      return;
    }
    dispatch(addToSelectedPage(page));
  };

  const modelTests = useMemo(() => {
    return currentDocsTests?.filter((test) => !test.column_name);
  }, [currentDocsTests]);

  const isDocumentationPageSelected = useMemo(
    () => selectedPages.includes(Pages.DOCUMENTATION),
    [selectedPages],
  );
  const isTestsPageSelected = useMemo(
    () => selectedPages.includes(Pages.TESTS),
    [selectedPages],
  );

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
          isNewGeneration: true,
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
        <DocumentationHelpContent showMissingDocumentationMessage />
      </div>
    );
  }

  return (
    <div className={classes.documentationWrapper}>
      <Stack className="mb-2 justify-content-between">
        <Stack>
          <Button
            color={isDocumentationPageSelected ? "primary" : "secondary"}
            onClick={() => handleClick(Pages.DOCUMENTATION)}
            icon={
              <span className="d-inline-block me-2">
                {isDocumentationPageSelected ? (
                  <CheckedSquareIcon />
                ) : (
                  <EmptySquareIcon />
                )}
              </span>
            }
            buttontext="Documentation"
            showtext={true}
          />
          <Button
            color={isTestsPageSelected ? "primary" : "secondary"}
            onClick={() => handleClick(Pages.TESTS)}
            icon={
              <span className="d-inline-block me-2">
                {isTestsPageSelected ? (
                  <CheckedSquareIcon />
                ) : (
                  <EmptySquareIcon />
                )}
              </span>
            }
            buttontext="Tests"
            showtext={true}
          />
          {/* <Button
          color={activePage === Pages.TAGS ? "primary" : "secondary"}
          onClick={() => handleClick(Pages.TAGS)}
          buttonText="Tags"
        /> */}
        </Stack>
        <CommonActionButtons />
      </Stack>
      <div className={classes.docGenerator}>
        <Stack className={classes.head}>
          <Stack>
            <h3 className="mb-2">Model: {currentDocsData.name}</h3>
          </Stack>
        </Stack>
        <Stack className={classes.bodyWrap}>
          <Stack direction="column" className={classes.body}>
            <Stack direction="column">
              <Stack direction="column" style={{ margin: "0px 0 10px 0" }}>
                {isDocumentationPageSelected ? (
                  <DocGeneratorInput
                    entity={currentDocsData}
                    type={EntityType.MODEL}
                    onSubmit={onModelDocSubmit}
                    placeholder="Describe your model"
                  />
                ) : null}
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
      <ConversationsRightPanel />
    </div>
  );
};

export default DocumentationEditor;
