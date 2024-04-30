import { TableData } from "@finos/perspective";

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
}
