import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DATA } from "./sampleData";
import {
  DBTDocumentation,
  DBTDocumentationColumn,
  DocumentationStateProps,
} from "./types";

export const initialState = {
  currentDocsData: DATA,
} as DocumentationStateProps;

const documentationSlice = createSlice({
  name: "documentationState",
  initialState,
  reducers: {
    updateCurrentDocsData: (
      state,
      action: PayloadAction<Partial<DBTDocumentation> | null>,
    ) => {
      if (!action.payload) {
        state.currentDocsData = null;
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
        columns: Partial<DBTDocumentationColumn>[];
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
  },
});

export const { updateCurrentDocsData, updateColumnsInCurrentDocsData } =
  documentationSlice.actions;
export default documentationSlice;
