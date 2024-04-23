import { TableData } from "@finos/perspective";

export interface QueryPanelStateProps {
  loading: boolean;
  queryResults?: TableData;
  queryExecutionInfo?: { elapsedTime: number };
  queryResultsError?: {
    errorTitle: string;
    errorMessage: string;
    errorDataMarkup: string;
  };
  compiledCodeMarkup?: string;
  hintIndex: number;
  lastHintTimestamp: number;
}
