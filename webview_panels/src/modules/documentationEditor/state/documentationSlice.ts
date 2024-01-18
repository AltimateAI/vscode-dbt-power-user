import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Languages,
  Options,
  Persona,
} from "../components/docGenerator/constants";
import { GenerationDBDataProps } from "../types";
import { DATA, PROJECT } from "./sampleData";
import {
  DBTDocumentation,
  DocsGenerateUserInstructions,
  DocumentationStateProps,
  MetadataColumn,
} from "./types";

export const initialState = {
  currentDocsData: DATA,
  project: PROJECT,
  generationHistory: [],
  isDocGeneratedForAnyColumn: false,
  userInstructions: {
    language: Languages[0],
    persona: Persona[0],
    prompt_hint: Options[0],
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
      action: PayloadAction<Partial<DBTDocumentation> | undefined>,
    ) => {
      if (!action.payload) {
        state.currentDocsData = undefined;
        return;
      }
      // @ts-expect-error TODO fix this type
      state.currentDocsData = { ...state.currentDocsData, ...action.payload };
    },
    updateColumnsInCurrentDocsData: (
      state,
      {
        payload: { columns, isNewGeneration },
      }: PayloadAction<{
        columns: Partial<MetadataColumn>[];
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
