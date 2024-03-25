import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { QueryAnalysisContextProps } from "./types";
import queryAnalysisSlice, { initialState } from "./queryAnalysisSlice";
import {
  DatapilotQueryAnalysisChat,
  QueryAnalysisType,
  QueryExplainUpdate,
} from "../types";
import {
  DataPilotChatFollowup,
  RequestState,
  RequestTypes,
} from "@modules/dataPilot/types";
import useQueryAnalysisAction from "../useQueryAnalysisAction";
import { panelLogger } from "@modules/logger";
import useDataPilotContext from "@modules/dataPilot/useDataPilotContext";
import { upsertFollowup, upsertItem } from "@modules/dataPilot/dataPilotSlice";
import { QueryAnalysisCommands } from "../commands";

export const QueryAnalysisContext = createContext<QueryAnalysisContextProps>({
  state: initialState,
  dispatch: () => null,
  onNewGeneration: (_result: QueryExplainUpdate) => null,
});

interface Props {
  children: ReactNode;
}

const QueryAnalysisProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(
    queryAnalysisSlice.reducer,
    queryAnalysisSlice.getInitialState(),
  );

  const {
    state: { items, currentSessionId },
    dispatch: datapilotDispatch,
  } = useDataPilotContext();
  const chat = currentSessionId
    ? (items[currentSessionId] as DatapilotQueryAnalysisChat | undefined)
    : undefined;

  const { executeQueryAnalysis } = useQueryAnalysisAction();

  const onNewGeneration = (result: QueryExplainUpdate) => {
    if (!chat) {
      return;
    }
    datapilotDispatch(
      upsertFollowup({
        sessionId: chat?.id,
        followup: result as DataPilotChatFollowup,
      }),
    );
  };

  const handleQueryExplainOnload = () => {
    if (!chat) {
      return;
    }
    panelLogger.info("handleQueryExplainOnload");
    datapilotDispatch(upsertItem({ ...chat, state: RequestState.LOADING }));
    executeQueryAnalysis({
      sessionId: chat.id,
      command: QueryAnalysisCommands.explain,
      onNewGeneration,
    }).catch((err) =>
      panelLogger.error("error while executing analysis onload", err),
    );
  };

  const handleQueryModifyOnload = () => {
    if (!chat) {
      return;
    }
    panelLogger.info("handleQueryModifyOnload");
    datapilotDispatch(upsertItem({ ...chat, state: RequestState.LOADING }));
    onNewGeneration({
      state: RequestState.COMPLETED,
    });
  };

  // Trigger explain query api if analysis type is set in chat request
  useEffect(() => {
    if (
      !chat ||
      chat.requestType !== RequestTypes.QUERY_ANALYSIS ||
      chat.state !== RequestState.UNINITIALIZED ||
      !chat.analysisType
    ) {
      return;
    }

    // Api request not sent for this chat yet
    switch (chat.analysisType) {
      case QueryAnalysisType.EXPLAIN:
        handleQueryExplainOnload();

        break;
      case QueryAnalysisType.MODIFY:
        handleQueryModifyOnload();

        break;

      default:
        break;
    }
  }, [chat?.state, chat?.requestType, chat?.analysisType]);

  const values = useMemo(
    () => ({
      state,
      dispatch,
      onNewGeneration,
    }),
    [state, dispatch],
  );

  return (
    <QueryAnalysisContext.Provider value={values}>
      {children}
    </QueryAnalysisContext.Provider>
  );
};

export default QueryAnalysisProvider;
