import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueryBookmark, QueryPanelStateProps } from "./types";
import { QueryPanelTitleTabState } from "../components/QueryPanelContents/types";

export const initialState = {
  loading: false,
  queryResults: undefined,
  queryExecutionInfo: undefined,
  queryResultsError: undefined,
  compiledCodeMarkup: undefined,
  hintIndex: -1,
  lastHintTimestamp: 0,
  limit: undefined,
  perspectiveTheme: "Vintage",
  queryHistory: [],
  queryBookmarks: [],
  queryBookmarksEnabled: false,
  tabState: QueryPanelTitleTabState.Preview,
} as QueryPanelStateProps;

const queryPanelSlice = createSlice({
  name: "queryPanelState",
  initialState,
  reducers: {
    resetData: (state) => {
      return {
        ...state,
        queryResults: undefined,
        queryExecutionInfo: undefined,
        queryResultsError: undefined,
        compiledCodeMarkup: undefined,
        loading: false,
      };
    },
    setHintIndex: (
      state,
      action: PayloadAction<QueryPanelStateProps["hintIndex"]>,
    ) => {
      state.hintIndex = action.payload;
    },
    setTabState: (
      state,
      action: PayloadAction<QueryPanelStateProps["tabState"]>,
    ) => {
      state.tabState = action.payload;
    },
    setQueryBookmarksEnabled: (
      state,
      action: PayloadAction<QueryPanelStateProps["queryBookmarksEnabled"]>,
    ) => {
      state.queryBookmarksEnabled = action.payload;
    },
    setQueryBookmarks: (
      state,
      action: PayloadAction<QueryPanelStateProps["queryBookmarks"]>,
    ) => {
      state.queryBookmarks = action.payload;
    },
    setQueryHistory: (
      state,
      action: PayloadAction<QueryPanelStateProps["queryHistory"]>,
    ) => {
      state.queryHistory = action.payload;
    },
    setPerspectiveTheme: (
      state,
      action: PayloadAction<QueryPanelStateProps["perspectiveTheme"]>,
    ) => {
      state.perspectiveTheme = action.payload || "Vintage";
    },
    setCompiledCodeMarkup: (
      state,
      action: PayloadAction<QueryPanelStateProps["compiledCodeMarkup"]>,
    ) => {
      state.compiledCodeMarkup = action.payload;
    },
    setLastHintTimestamp: (
      state,
      action: PayloadAction<QueryPanelStateProps["lastHintTimestamp"]>,
    ) => {
      state.lastHintTimestamp = action.payload;
    },
    setLimit: (state, action: PayloadAction<QueryPanelStateProps["limit"]>) => {
      state.limit = action.payload;
    },
    setQueryResultsError: (
      state,
      action: PayloadAction<QueryPanelStateProps["queryResultsError"]>,
    ) => {
      state.loading = false;
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
    removeBookmark: (state, action: PayloadAction<QueryBookmark["id"]>) => {
      if (!state.queryBookmarks) {
        return;
      }
      state.queryBookmarks = state.queryBookmarks.filter(
        (bookmark) => bookmark.id !== action.payload,
      );
    },
    updateBookmark: (state, action: PayloadAction<QueryBookmark>) => {
      if (!action.payload.id || !state.queryBookmarks) {
        return;
      }
      const index = state.queryBookmarks.findIndex(
        (bookmark) => bookmark.id === action.payload.id,
      );
      if (index === -1) {
        return;
      }
      state.queryBookmarks[index] = {
        ...state.queryBookmarks[index],
        ...action.payload,
      };
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
  setLastHintTimestamp,
  setLimit,
  setPerspectiveTheme,
  setQueryBookmarks,
  setQueryHistory,
  setQueryBookmarksEnabled,
  setTabState,
  updateBookmark,
  removeBookmark,
} = queryPanelSlice.actions;

export default queryPanelSlice;
