import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GenerationDBDataProps } from "../types";
import {
  DBTDocumentation,
  DocumentationStateProps,
  MetadataColumn,
} from "./types";

export const initialState = {
  currentDocsData: undefined,
  project: undefined,
  generationHistory: [],
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
        payload: { columns },
      }: PayloadAction<{
        columns: Partial<MetadataColumn>[];
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
  },
});

export const {
  updateCurrentDocsData,
  updateColumnsInCurrentDocsData,
  setProject,
  addToGenerationsHistory,
  resetGenerationsHistory,
  setGenerationsHistory,
} = documentationSlice.actions;
export default documentationSlice;
