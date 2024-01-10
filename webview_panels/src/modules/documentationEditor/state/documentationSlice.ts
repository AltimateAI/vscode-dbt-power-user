import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DATA } from "./sampleData";
import { DBTDocumentation, DocumentationStateProps } from "./types";

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
    updateColumnInCurrentDocsData: (
      state,
      {
        payload: { column, columnName },
      }: PayloadAction<{
        columnName: string;
        column: Partial<DBTDocumentation["columns"]["0"]>;
      }>,
    ) => {
      if (!state.currentDocsData) {
        return;
      }
      state.currentDocsData.columns = state.currentDocsData.columns.map((c) => {
        if (c.name !== columnName) {
          return c;
        }

        return { ...c, ...column };
      });
    },
  },
});

export const { updateCurrentDocsData, updateColumnInCurrentDocsData } =
  documentationSlice.actions;
export default documentationSlice;
