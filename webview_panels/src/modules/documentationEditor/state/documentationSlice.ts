import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GenerationDBDataProps } from "../types";
import {
  DBTDocumentation,
  DocsGenerateUserInstructions,
  DocumentationStateProps,
  MetadataColumn,
  Pages,
  Source,
} from "./types";

export const initialState = {
  currentDocsData: undefined,
  currentDocsTests: undefined,
  project: undefined,
  generationHistory: [],
  isDocGeneratedForAnyColumn: false,
  insertedEntityName: undefined,
  userInstructions: {
    language: undefined,
    persona: undefined,
    prompt_hint: undefined,
  },
  selectedPages: [Pages.DOCUMENTATION],
} as DocumentationStateProps;

const documentationSlice = createSlice({
  name: "documentationState",
  initialState,
  reducers: {
    addToSelectedPage: (state, action: PayloadAction<Pages>) => {
      state.selectedPages.push(action.payload);
    },
    removeFromSelectedPage: (state, action: PayloadAction<Pages>) => {
      if (state.selectedPages.length === 1) {
        return;
      }
      state.selectedPages = state.selectedPages.filter(
        (p) => p !== action.payload,
      );
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
    updateCurrentDocsData: (
      state,
      action: PayloadAction<
        (Partial<DBTDocumentation> & { isNewGeneration?: boolean }) | undefined
      >,
    ) => {
      if (!action.payload) {
        state.currentDocsData = undefined;
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
        // @ts-expect-error TODO fix this type
        state.currentDocsData = action.payload;
        return;
      }
      state.currentDocsData = { ...state.currentDocsData, ...action.payload };
      if (action.payload.isNewGeneration !== undefined) {
        state.isDocGeneratedForAnyColumn = action.payload.isNewGeneration;
      }
    },
    updateColumnsAfterSync: (
      state,
      {
        payload: { columns },
      }: PayloadAction<{
        columns: Partial<
          MetadataColumn & {
            description?: string;
          }
        >[];
      }>,
    ) => {
      if (!state.currentDocsData) {
        return;
      }
      state.currentDocsData.columns = columns.map((column) => {
        const existingColumn = state.currentDocsData?.columns.find(
          (c) => column.name?.toLowerCase() === c.name.toLowerCase(),
        );
        return {
          name: column.name ?? "",
          type: column.type,
          description: existingColumn?.description ?? "",
          generated: existingColumn?.generated ?? false,
          source: existingColumn !== undefined ? Source.YAML : Source.DATABASE,
        };
      });
      state.isDocGeneratedForAnyColumn = true;
    },
    updateColumnsInCurrentDocsData: (
      state,
      {
        payload: { columns, isNewGeneration },
      }: PayloadAction<{
        columns: Partial<
          MetadataColumn & {
            description?: string;
          }
        >[];
        isNewGeneration?: boolean;
      }>,
    ) => {
      if (!state.currentDocsData) {
        return;
      }
      state.currentDocsData.columns = state.currentDocsData.columns.map((c) => {
        const updatedColumn = columns.find((column) => c.name === column.name);
        if (updatedColumn) {
          return { ...c, ...updatedColumn };
        }
        return c;
      });
      if (isNewGeneration !== undefined) {
        state.isDocGeneratedForAnyColumn = isNewGeneration;
      }
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
    setIsDocGeneratedForAnyColumn: (state, action: PayloadAction<boolean>) => {
      state.isDocGeneratedForAnyColumn = action.payload;
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
  updateCurrentDocsData,
  updateColumnsInCurrentDocsData,
  updateColumnsAfterSync,
  setProject,
  addToGenerationsHistory,
  resetGenerationsHistory,
  setGenerationsHistory,
  updateUserInstructions,
  setIsDocGeneratedForAnyColumn,
  setInsertedEntityName,
  updateCurrentDocsTests,
  addToSelectedPage,
  removeFromSelectedPage,
} = documentationSlice.actions;
export default documentationSlice;
