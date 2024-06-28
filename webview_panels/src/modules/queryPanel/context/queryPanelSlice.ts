import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  QueryBookmark,
  QueryBookmarkResponse,
  QueryPanelStateProps,
} from "./types";
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
  // TODO: check if we are using this
  queryBookmarks: {
    private: { items: [], page: 0, pages: 0, size: 0, total: 0 },
    public: { items: [], page: 0, pages: 0, size: 0, total: 0 },
  },
  queryBookmarksEnabled: false,
  tabState: QueryPanelTitleTabState.Bookmarks,
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
    removeBookmark: (state, action: PayloadAction<QueryBookmark>) => {
      if (!state.queryBookmarks) {
        return;
      }

      state.queryBookmarks[action.payload.privacy].items = state.queryBookmarks[
        action.payload.privacy
      ].items.filter((bookmark) => bookmark.id !== action.payload.id);
    },
    updateBookmark: (state, action: PayloadAction<QueryBookmark>) => {
      if (!action.payload.id || !state.queryBookmarks) {
        return;
      }
      const index = state.queryBookmarks[
        action.payload.privacy
      ].items.findIndex((bookmark) => bookmark.id === action.payload.id);
      if (index === -1) {
        return;
      }
      state.queryBookmarks[action.payload.privacy].items[index] = {
        ...state.queryBookmarks[action.payload.privacy].items[index],
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
