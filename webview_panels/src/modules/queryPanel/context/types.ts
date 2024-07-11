import { TableData } from "@finos/perspective";
import { QueryPanelTitleTabState } from "../components/QueryPanelContents/types";
import { User } from "@modules/app/types";

export interface QueryHistory {
  rawSql: string;
  compiledSql: string;
  timestamp: number;
  duration: number;
  adapter: string;
  projectName: string;
}

export interface QueryBookmarkResponse {
  items: QueryBookmark[];
  page: number;
  pages: number;
  size: number;
  total: number;
}

export interface QueryBookmark {
  id: number;
  compiled_sql: string;
  raw_sql: string;
  name: string;
  description: string;
  adapter_type: string;
  created_on: string;
  updated_on: string;
  tags: { id: number; tag: string }[];
  privacy: "public" | "private";
  created_by_user: User;
}

export enum QueryPanelViewType {
  DEFAULT,
  OPEN_RESULTS_IN_TAB,
  OPEN_RESULTS_FROM_HISTORY_BOOKMARKS,
}

export interface QueryPanelStateProps {
  viewType: QueryPanelViewType;
  loading: boolean;
  queryResults?: {
    data: TableData;
    columnNames: string[];
    columnTypes: string[];
  };
  queryExecutionInfo?: { elapsedTime: number };
  queryResultsError?: {
    message: string;
    code: number;
    data: string;
  };
  compiledCodeMarkup?: string;
  hintIndex: number;
  limit?: number;
  perspectiveTheme: string;
  queryHistory: QueryHistory[];
  queryBookmarks: {
    private?: QueryBookmarkResponse;
    public?: QueryBookmarkResponse;
  };
  queryBookmarksEnabled: boolean;
  queryBookmarksTagsFromDB?: { id: number; tag: string }[];
  tabState: QueryPanelTitleTabState;
}
