import { TableData } from "@finos/perspective";
import { QueryPanelTitleTabState } from "../components/QueryPanelContents/types";

export interface QueryHistory {
  rawSql: string;
  compiledSql: string;
  timestamp: number;
  duration: number;
  adapter: string;
  projectName: string;
}

export interface QueryBookmark {
  query: string;
  timestamp: number;
}

export interface QueryPanelStateProps {
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
  lastHintTimestamp: number;
  limit?: number;
  perspectiveTheme: string;
  queryHistory: QueryHistory[];
  queryBookmarks: QueryBookmark[];
  queryBookmarksEnabled: boolean;
  tabState: QueryPanelTitleTabState;
}
