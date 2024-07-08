import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  QueryBookmarkResponse,
  QueryPanelStateProps,
  QueryPanelViewType,
} from "./types";
import { QueryPanelTitleTabState } from "../components/QueryPanelContents/types";

export const initialState = {
  viewType: QueryPanelViewType.DEFAULT,
  loading: false,
  queryResults: undefined,
  queryExecutionInfo: undefined,
  queryResultsError: undefined,
  compiledCodeMarkup: undefined,
  hintIndex: -1,
  limit: undefined,
  perspectiveTheme: "Vintage",
  queryHistory: [],
  queryBookmarks: {},
  queryBookmarksEnabled: false,
  tabState: QueryPanelTitleTabState.Preview,
  queryBookmarksTagsFromDB: undefined,
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
    setQueryBookmarksTagsFromDB: (
      state,
      action: PayloadAction<QueryPanelStateProps["queryBookmarksTagsFromDB"]>,
    ) => {
      state.queryBookmarksTagsFromDB = action.payload;
    },
    setViewType: (
      state,
      action: PayloadAction<QueryPanelStateProps["viewType"]>,
    ) => {
      state.viewType = action.payload;
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
  setViewType,
  resetData,
  setLoading,
  setHintIndex,
  setCompiledCodeMarkup,
  setQueryResultsError,
  setQueryExecutionInfo,
  setQueryResults,
  setLimit,
  setPerspectiveTheme,
  setQueryHistory,
  setQueryBookmarks,
  setQueryBookmarksEnabled,
  setTabState,
  setQueryBookmarksTagsFromDB,
} = queryPanelSlice.actions;

export default queryPanelSlice;
