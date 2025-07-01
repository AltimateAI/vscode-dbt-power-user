import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { IncomingMessageProps } from "@modules/app/types";
import { panelLogger } from "@modules/logger";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import documentationSlice, {
  initialState,
  setGenerationsHistory,
  setIncomingDocsData,
  setInsertedEntityName,
  setMissingDocumentationMessage,
  setProject,
  updatConversations,
  updateBulkDocsPropRightPanel,
  updateCollaborationEnabled,
  updateColumnsAfterSync,
  updateColumnsInCurrentDocsData,
  updateConversationsRightPanelState,
  updateCurrentDocsData,
  updateCurrentDocsTests,
  updateSelectedConversationGroup,
  updateSingleDocsPropRightPanel,
  updateUserInstructions,
  setDocBlocks,
} from "./state/documentationSlice";
import {
  DBTDocumentation,
  DBTModelTest,
  DocsGenerateUserInstructions,
  MetadataColumn,
  DocBlock,
} from "./state/types";
import { ContextProps } from "./types";
import { getGenerationsInModel, isStateDirty } from "./utils";
import DocumentationEditor from "./DocumentationEditor";
import {
  ConversationGroup,
  DbtDocsShareDetails,
} from "@altimateai/ui-components";
import { TelemetryEvents } from "@telemetryEvents";
import { sendTelemetryEvent } from "./components/telemetry";
import useAppContext from "@modules/app/useAppContext";

export const DocumentationContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
});

type IncomingMessageEvent = MessageEvent<
  IncomingMessageProps & {
    docs?: DBTDocumentation;
    tests?: DBTModelTest[];
    project?: string;
    columns?: DBTDocumentation["columns"];
    model?: string;
    docBlocks?: DocBlock[];
    name?: string;
    description?: string;
    collaborationEnabled?: boolean;
    missingDocumentationMessage?: {
      message: string;
      type: "error" | "warning";
    };
  }
>;

enum ActionState {
  CANCEL_STAY = "Stay",
  DISCARD_PROCEED = "Discard",
}

const DocumentationProvider = (): JSX.Element => {
  const {
    state: { isComponentsApiInitialized },
  } = useAppContext();
  const [state, dispatch] = useReducer(
    documentationSlice.reducer,
    documentationSlice.getInitialState(),
  );
  const stateRef = useRef(state);

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

  const renderDocumentation = (event: IncomingMessageEvent) => {
    dispatch(
      setIncomingDocsData({
        docs: event.data.docs,
        tests: event.data.tests,
      }),
    );
    dispatch(setProject(event.data.project));
    dispatch(
      updateCollaborationEnabled(Boolean(event.data.collaborationEnabled)),
    );
    dispatch(
      setMissingDocumentationMessage(event.data.missingDocumentationMessage),
    );
    dispatch(setDocBlocks(event.data.docBlocks ?? []));
  };

  const onMessage = useCallback((event: IncomingMessageEvent) => {
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
      case "renderDocumentation": {
        const {
          currentDocsData,
          showBulkDocsPropRightPanel,
          showSingleDocsPropRightPanel,
        } = stateRef.current;
        if (
          !(
            isStateDirty(stateRef.current) ||
            showBulkDocsPropRightPanel ||
            showSingleDocsPropRightPanel
          )
        ) {
          renderDocumentation(event);
          break;
        }
        executeRequestInSync("showWarningMessage", {
          infoMessage: `You have unsaved changes in model: ‘${currentDocsData?.name}’. Would you
          like to discard the changes or remain in the current state?`,
          items: [ActionState.DISCARD_PROCEED, ActionState.CANCEL_STAY],
        })
          .then((action) => {
            switch (action) {
              case ActionState.DISCARD_PROCEED: {
                dispatch(updateCurrentDocsData(event.data.docs));
                dispatch(updateCurrentDocsTests(event.data.tests));
                if (showBulkDocsPropRightPanel) {
                  dispatch(updateBulkDocsPropRightPanel(false));
                }
                if (showSingleDocsPropRightPanel) {
                  dispatch(updateSingleDocsPropRightPanel(false));
                }
                renderDocumentation(event);
                break;
              }
              case ActionState.CANCEL_STAY: {
                break;
              }
              default:
                break;
            }
          })
          .catch((err) => {
            panelLogger.error(
              "error while showing unsaved changes dialog",
              err,
            );
          });
        break;
      }
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
  }, []);

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
    sendTelemetryEvent(TelemetryEvents["DocumentationEditor/Load"]);
    window.addEventListener("message", onMessage);
    // Load current editor documentation
    executeRequestInAsync("getCurrentModelDocumentation", {});

    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  const values = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  // hack to get latest state in onMessage
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  if (!isComponentsApiInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <DocumentationContext.Provider value={values}>
      <DocumentationEditor />
    </DocumentationContext.Provider>
  );
};

export default DocumentationProvider;
