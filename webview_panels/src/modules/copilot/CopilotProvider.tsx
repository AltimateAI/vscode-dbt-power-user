import { createContext, ReactNode, useMemo, useReducer } from "react";
import Copilot from "./Copilot";
import copilotSlice, { initialState } from "./copilotSlice";
import { ContextProps } from "./types";

export const CopilotContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
});

const CopilotProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [state, dispatch] = useReducer(
    copilotSlice.reducer,
    copilotSlice.getInitialState(),
  );

  const values = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return (
    <CopilotContext.Provider value={values}>
      {children}
      <Copilot />
    </CopilotContext.Provider>
  );
};

export default CopilotProvider;
