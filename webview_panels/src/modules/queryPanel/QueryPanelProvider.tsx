import { createContext, useContext, useMemo, useReducer } from "react";
import QueryPanel from "./QueryPanel";
import { QueryPanelStateProps } from "./context/types";
import { UnknownAction } from "@reduxjs/toolkit";
import queryPanelSlice from "./context/queryPanelSlice";

interface ContextProps {
  state: QueryPanelStateProps;
  dispatch: React.Dispatch<UnknownAction>;
}

export const QueryPanelContext = createContext<ContextProps>({
  state: queryPanelSlice.getInitialState(),
  dispatch: () => null,
});

const QueryPanelProvider = (): JSX.Element => {
  const [state, dispatch] = useReducer(
    queryPanelSlice.reducer,
    queryPanelSlice.getInitialState(),
  );

  const values = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return (
    <QueryPanelContext.Provider value={values}>
      <QueryPanel />
    </QueryPanelContext.Provider>
  );
};

export default QueryPanelProvider;

export const useQueryPanelDispatch = (): React.Dispatch<UnknownAction> => {
  const { dispatch } = useContext(QueryPanelContext);
  return dispatch;
};
