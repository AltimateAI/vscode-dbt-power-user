import { TableData } from "@finos/perspective";

export interface QueryPanelStateProps {
  loading: boolean;
  queryResults?: TableData;
  queryExecutionInfo?: string;
  queryResultsError?: {
    errorTitle: string;
    errorMessage: string;
    errorDataMarkup: string;
  };
  compiledCodeMarkup?: string;
  hintIndex: number;
}
