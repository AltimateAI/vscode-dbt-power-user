import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GenerationDBDataProps } from "../types";
import {
  DBTDocumentation,
  DocsGenerateUserInstructions,
  DocumentationStateProps,
  MetadataColumn,
} from "./types";

export const initialState = {
  currentDocsData: undefined,
  project: undefined,
  generationHistory: [],
  isDocGeneratedForAnyColumn: false,
  userInstructions: {
    language: undefined,
    persona: undefined,
    prompt_hint: undefined,
  },
} as DocumentationStateProps;

const documentationSlice = createSlice({
  name: "documentationState",
  initialState,
  reducers: {
    setProject: (
      state,
      action: PayloadAction<DocumentationStateProps["project"]>,
    ) => {
      state.project = action.payload;
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
  setProject,
  addToGenerationsHistory,
  resetGenerationsHistory,
  setGenerationsHistory,
  updateUserInstructions,
  setIsDocGeneratedForAnyColumn,
} = documentationSlice.actions;
export default documentationSlice;
