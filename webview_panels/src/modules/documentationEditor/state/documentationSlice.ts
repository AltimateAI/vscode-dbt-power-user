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
  },
});

export const { updateCurrentDocsData } = documentationSlice.actions;
export default documentationSlice;
