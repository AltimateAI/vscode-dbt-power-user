import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueryAnalysisStateProps } from "./types";

export const initialState = {
  sessionId: null,
} as QueryAnalysisStateProps;

const queryAnalysisSlice = createSlice({
  name: "queryAnalysisState",
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<string | null>) => {
      state.sessionId = action.payload;
    },
    reset: () => initialState,
  },
});

export const { setSessionId } = queryAnalysisSlice.actions;
export default queryAnalysisSlice;
