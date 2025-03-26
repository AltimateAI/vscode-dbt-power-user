import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GenerationDBDataProps } from "../types";
import {
  DBTDocumentation,
  DocsGenerateUserInstructions,
  DocumentationStateProps,
  MetadataColumn,
} from "./types";
import {
  isStateDirty,
  mergeCurrentAndIncomingDocumentationColumns,
} from "../utils";
import { Citation } from "@altimateai/ui-components";

export const initialState = {
  incomingDocsData: undefined,
  currentDocsData: undefined,
  currentDocsTests: undefined,
  project: undefined,
  generationHistory: [],
  insertedEntityName: undefined,
  docUpdatedForModel: undefined,
  docUpdatedForColumns: [],
  userInstructions: {
    language: undefined,
    persona: undefined,
    prompt_hint: undefined,
  },
  conversations: {},
  showConversationsRightPanel: false,
  collaborationEnabled: false,
  missingDocumentationMessage: undefined,
  searchQuery: "",
  showSingleDocsPropRightPanel: false,
  showBulkDocsPropRightPanel: false,
} as DocumentationStateProps;

const documentationSlice = createSlice({
  name: "documentationState",
  initialState,
  reducers: {
    setSearchQuery: (
      state,
      action: PayloadAction<DocumentationStateProps["searchQuery"]>,
    ) => {
      state.searchQuery = action.payload;
    },
    updatConversations: (
      state,
      { payload }: PayloadAction<DocumentationStateProps["conversations"]>,
    ) => {
      Object.entries(payload).forEach(([shareId, conversationGroups]) => {
        state.conversations[parseInt(shareId)] = conversationGroups;
      });
    },
    setMissingDocumentationMessage: (
      state,
      action: PayloadAction<
        DocumentationStateProps["missingDocumentationMessage"]
      >,
    ) => {
      state.missingDocumentationMessage = action.payload;
    },
    updateConversationsRightPanelState: (
      state,
      action: PayloadAction<
        DocumentationStateProps["showConversationsRightPanel"]
      >,
    ) => {
      state.showConversationsRightPanel = action.payload;
    },
    updateSingleDocsPropRightPanel: (
      state,
      action: PayloadAction<
        DocumentationStateProps["showSingleDocsPropRightPanel"]
      >,
    ) => {
      state.showSingleDocsPropRightPanel = action.payload;
    },
    updateBulkDocsPropRightPanel: (
      state,
      action: PayloadAction<
        DocumentationStateProps["showBulkDocsPropRightPanel"]
      >,
    ) => {
      state.showBulkDocsPropRightPanel = action.payload;
    },
    updateCollaborationEnabled: (
      state,
      action: PayloadAction<DocumentationStateProps["collaborationEnabled"]>,
    ) => {
      state.collaborationEnabled = action.payload;
    },
    updateSelectedConversationGroup: (
      state,
      action: PayloadAction<
        DocumentationStateProps["selectedConversationGroup"]
      >,
    ) => {
      state.selectedConversationGroup = action.payload;
    },
    setProject: (
      state,
      action: PayloadAction<DocumentationStateProps["project"]>,
    ) => {
      state.project = action.payload;
    },
    updateCurrentDocsTests: (
      state,
      action: PayloadAction<DocumentationStateProps["currentDocsTests"]>,
    ) => {
      state.currentDocsTests = action.payload;
    },
    setInsertedEntityName: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.insertedEntityName = action.payload;
    },
    setIncomingDocsData: (
      state,
      action: PayloadAction<DocumentationStateProps["incomingDocsData"]>,
    ) => {
      // if test/docs data is not changed, then update the state
      const isCleanForm = !isStateDirty(state);

      if (
        !state.currentDocsData || // if first load, currentDocsData will be undefined
        isCleanForm
      ) {
        state.incomingDocsData = action.payload ?? {};
        state.currentDocsData = action.payload?.docs;
        state.currentDocsTests = action.payload?.tests;
        return;
      }

      // If any changes are done in current model, then show alert
      // empty json to handle cases of switching to file which are not models
      state.incomingDocsData = action.payload ?? {};
      return;
    },
    updateCurrentDocsData: (
      state,
      action: PayloadAction<
        (Partial<DBTDocumentation> & { isNewGeneration?: boolean }) | undefined
      >,
    ) => {
      // incase of yml files, incoming docs data will be {}, so checking for keys length as well
      if (!action.payload || !Object.keys(action.payload).length) {
        state.currentDocsData = undefined;
        state.docUpdatedForColumns = [];
        state.docUpdatedForModel = undefined;
        return;
      }
      if (!action.payload.name) {
        return;
      }
      if (!state.currentDocsData) {
        // Initial render
        // @ts-expect-error TODO fix this type
        state.currentDocsData = action.payload;
        return;
      }

      // switching editor
      if (
        action.payload.name &&
        state.currentDocsData?.name !== action.payload.name
      ) {
        state.docUpdatedForModel = undefined;
        state.docUpdatedForColumns = [];
        // @ts-expect-error TODO fix this type
        state.currentDocsData = action.payload;
        return;
      }

      // If description is changed, then show coaching
      if (
        state.currentDocsData?.name === action.payload.name &&
        state.currentDocsData.description !== action.payload.description
      ) {
        state.docUpdatedForModel = action.payload.name;
      }

      state.currentDocsData = { ...state.currentDocsData, ...action.payload };
    },
    updateColumnsAfterSync: (
      state,
      {
        payload: { columns },
      }: PayloadAction<{
        columns: DBTDocumentation["columns"];
      }>,
    ) => {
      if (!state.currentDocsData) {
        return;
      }

      state.currentDocsData.columns =
        mergeCurrentAndIncomingDocumentationColumns(
          state.currentDocsData.columns,
          columns,
        );
    },
    updateColumnsInCurrentDocsData: (
      state,
      {
        payload: { columns },
      }: PayloadAction<{
        columns: Partial<
          MetadataColumn & {
            description?: string;
            citations?: Citation[];
          }
        >[];
        isNewGeneration?: boolean;
      }>,
    ) => {
      if (!state.currentDocsData) {
        state.docUpdatedForColumns = [];
        return;
      }
      const modifiedColumns = columns
        ?.map((column) => column.name)
        .filter(Boolean) as string[];
      if (modifiedColumns) {
        state.docUpdatedForColumns = [
          ...state.docUpdatedForColumns,
          ...modifiedColumns,
        ];
      }
      state.currentDocsData.columns = state.currentDocsData.columns.map((c) => {
        const updatedColumn = columns.find((column) => c.name === column.name);
        if (updatedColumn) {
          return { ...c, ...updatedColumn };
        }
        return c;
      });
    },
    addToGenerationsHistory: (
      state,
      action: PayloadAction<GenerationDBDataProps[]>,
    ) => {
      action.payload.forEach((history) => {
        state.generationHistory.push(history);
      });
    },
    setGenerationsHistory: (
      state,
      action: PayloadAction<GenerationDBDataProps[]>,
    ) => {
      state.generationHistory = action.payload;
    },
    resetGenerationsHistory: (state, _action: PayloadAction<undefined>) => {
      state.generationHistory = [];
    },
    updateUserInstructions: (
      state,
      action: PayloadAction<DocsGenerateUserInstructions>,
    ) => {
      state.userInstructions = { ...state.userInstructions, ...action.payload };
    },
  },
});

export const {
  setIncomingDocsData,
  updateCurrentDocsData,
  updateColumnsInCurrentDocsData,
  updateColumnsAfterSync,
  setProject,
  addToGenerationsHistory,
  resetGenerationsHistory,
  setGenerationsHistory,
  updateUserInstructions,
  setInsertedEntityName,
  updateCurrentDocsTests,
  updatConversations,
  updateConversationsRightPanelState,
  updateSelectedConversationGroup,
  updateCollaborationEnabled,
  setMissingDocumentationMessage,
  setSearchQuery,
  updateSingleDocsPropRightPanel,
  updateBulkDocsPropRightPanel,
} = documentationSlice.actions;
export default documentationSlice;
