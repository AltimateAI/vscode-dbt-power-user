import { TableData } from "@finos/perspective";

export interface QueryHistory {
  query: string;
  timestamp: number;
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
}
