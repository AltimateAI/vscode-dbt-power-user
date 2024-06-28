import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueryBookmarkResponse, QueryPanelStateProps } from "./types";
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
  queryBookmarks: {
    private: { items: [], page: 0, pages: 0, size: 0, total: 0 },
    public: { items: [], page: 0, pages: 0, size: 0, total: 0 },
  },
  queryBookmarksEnabled: false,
  tabState: QueryPanelTitleTabState.Preview,
  refreshQueryBookmarksTimestamp: 0,
  queryBookmarksTagsFromDB: [],
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
    setRefreshQueryBookmarksTimestamp: (
      state,
      action: PayloadAction<
        QueryPanelStateProps["refreshQueryBookmarksTimestamp"]
      >,
    ) => {
      state.refreshQueryBookmarksTimestamp = action.payload;
    },
    setQueryBookmarksTagsFromDB: (
      state,
      action: PayloadAction<QueryPanelStateProps["queryBookmarksTagsFromDB"]>,
    ) => {
      state.queryBookmarksTagsFromDB = action.payload;
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
    setQueryBookmarks: (
      state,
      action: PayloadAction<{
        response: QueryBookmarkResponse;
        type: "public" | "private";
      }>,
    ) => {
      state.queryBookmarks[action.payload.type] = action.payload.response;
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
  setQueryHistory,
  setQueryBookmarks,
  setQueryBookmarksEnabled,
  setTabState,
  setRefreshQueryBookmarksTimestamp,
  setQueryBookmarksTagsFromDB,
} = queryPanelSlice.actions;

export default queryPanelSlice;
