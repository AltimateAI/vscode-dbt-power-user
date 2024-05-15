import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { IncomingMessageProps } from "@modules/app/types";
import { panelLogger } from "@modules/logger";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import documentationSlice, {
  initialState,
  setGenerationsHistory,
  setIncomingDocsData,
  setInsertedEntityName,
  setProject,
  updatConversations,
  updateCollaborationEnabled,
  updateColumnsAfterSync,
  updateColumnsInCurrentDocsData,
  updateConversationsRightPanelState,
  updateCurrentDocsData,
  updateSelectedConversationGroup,
  updateUserInstructions,
} from "./state/documentationSlice";
import {
  DBTDocumentation,
  DBTModelTest,
  DocsGenerateUserInstructions,
  MetadataColumn,
} from "./state/types";
import { ContextProps } from "./types";
import { getGenerationsInModel } from "./utils";
import DocumentationEditor from "./DocumentationEditor";
import { ConversationGroup, DbtDocsShareDetails } from "@lib";

export const DocumentationContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
});

const DocumentationProvider = (): JSX.Element => {
  const [state, dispatch] = useReducer(
    documentationSlice.reducer,
    documentationSlice.getInitialState(),
  );

  const updateFocus = (name?: string) => {
    dispatch(setInsertedEntityName(name));
    // reset the name, so re insert will still focus
    setTimeout(() => {
      dispatch(setInsertedEntityName(undefined));
    }, 1000);
  };

  const handleConversationUpdates = ({
    shareId,
    conversationGroups,
  }: {
    shareId: DbtDocsShareDetails["share_id"];
    conversationGroups: ConversationGroup[];
  }) => {
    panelLogger.info("handleConversationUpdates", shareId, conversationGroups);
    dispatch(updatConversations({ [shareId]: conversationGroups }));
  };

  const handleViewConversation = ({
    shareId,
    conversation_group_id,
  }: {
    shareId: DbtDocsShareDetails["share_id"];
    conversation_group_id: ConversationGroup["conversation_group_id"];
  }) => {
    panelLogger.info("handleViewConversation", shareId, conversation_group_id);
    dispatch(updateConversationsRightPanelState(true));
    dispatch(
      updateSelectedConversationGroup({
        shareId,
        conversationGroupId: conversation_group_id,
      }),
    );
  };

  const onMesssage = useCallback(
    (
      event: MessageEvent<
        IncomingMessageProps & {
          docs?: DBTDocumentation;
          tests?: DBTModelTest[];
          project?: string;
          columns?: MetadataColumn[];
          model?: string;
          name?: string;
          description?: string;
          collaborationEnabled?: boolean;
        }
      >,
    ) => {
      const { command, ...params } = event.data;
      switch (command) {
        case "viewConversation":
          handleViewConversation(
            params as unknown as Parameters<typeof handleViewConversation>["0"],
          );
          break;
        case "conversations:updates":
          handleConversationUpdates(
            params as unknown as Parameters<
              typeof handleConversationUpdates
            >["0"],
          );
          break;
        case "renderDocumentation":
          dispatch(
            setIncomingDocsData({
              docs: event.data.docs,
              tests: event.data.tests,
            }),
          );
          dispatch(setProject(event.data.project));
          dispatch(
            updateCollaborationEnabled(
              Boolean(event.data.collaborationEnabled),
            ),
          );
          break;
        case "renderColumnsFromMetadataFetch":
          if (event.data.columns) {
            dispatch(
              updateColumnsAfterSync({
                columns: event.data.columns,
              }),
            );
          }
          break;
        case "docgen:insert":
          panelLogger.info("received new doc gen", event.data);
          // insert model desc
          if (params.model) {
            dispatch(
              updateCurrentDocsData({
                description: params.description,
                name: params.model,
                isNewGeneration: true,
              }),
            );
            updateFocus(params.model);
            return;
          }
          // insert column desc
          dispatch(
            updateColumnsInCurrentDocsData({
              columns: [params as Partial<MetadataColumn>],
              isNewGeneration: true,
            }),
          );
          updateFocus((params as Partial<MetadataColumn>).name);

          break;
        default:
          break;
      }
    },
    [],
  );

  const loadGenerationsHistory = (project: string, model: string) => {
    getGenerationsInModel(project, model)
      .then((data) => {
        dispatch(setGenerationsHistory(data));
      })
      .catch((err) =>
        panelLogger.error("error while loading generations history", err),
      );
  };

  useEffect(() => {
    if (!state.project || !state.currentDocsData?.name) {
      return;
    }

    const userInstructions = localStorage.getItem("userInstructions");
    if (userInstructions) {
      dispatch(
        updateUserInstructions(
          JSON.parse(userInstructions) as DocsGenerateUserInstructions,
        ),
      );
    }
    loadGenerationsHistory(state.project, state.currentDocsData.name);
  }, [state.project, state.currentDocsData?.name]);

  useEffect(() => {
    window.addEventListener("message", onMesssage);
    // Load current editor documentation
    executeRequestInAsync("getCurrentModelDocumentation", {});

    return () => {
      window.removeEventListener("message", onMesssage);
    };
  }, []);

  const values = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return (
    <DocumentationContext.Provider value={values}>
      <DocumentationEditor />
    </DocumentationContext.Provider>
  );
};

export default DocumentationProvider;
