import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueryPanelStateProps } from "./types";

export const initialState = {
  loading: false,
  queryResults: undefined,
  queryExecutionInfo: undefined,
  queryResultsError: undefined,
  compiledCodeMarkup: undefined,
  hintIndex: -1,
} as QueryPanelStateProps;

const queryPanelSlice = createSlice({
  name: "queryPanelState",
  initialState,
  reducers: {
    resetData: () => {
      return initialState;
    },
    setHintIndex: (
      state,
      action: PayloadAction<QueryPanelStateProps["hintIndex"]>,
    ) => {
      state.hintIndex = action.payload;
    },
    setCompiledCodeMarkup: (
      state,
      action: PayloadAction<QueryPanelStateProps["compiledCodeMarkup"]>,
    ) => {
      state.compiledCodeMarkup = action.payload;
    },
    setQueryResultsError: (
      state,
      action: PayloadAction<QueryPanelStateProps["queryResultsError"]>,
    ) => {
      state.queryResultsError = action.payload;
    },
    setQueryExecutionInfo: (
      state,
      action: PayloadAction<QueryPanelStateProps["queryExecutionInfo"]>,
    ) => {
      state.queryExecutionInfo = action.payload;
    },
    setQueryResults: (
      state,
      action: PayloadAction<QueryPanelStateProps["queryResults"]>,
    ) => {
      state.queryResults = action.payload;
    },
    setLoading: (
      state,
      action: PayloadAction<QueryPanelStateProps["loading"]>,
    ) => {
      state.loading = action.payload;
    },
  },
});

export const {
  resetData,
  setLoading,
  setHintIndex,
  setCompiledCodeMarkup,
  setQueryResultsError,
  setQueryExecutionInfo,
  setQueryResults,
} = queryPanelSlice.actions;

export default queryPanelSlice;
