import { IncomingMessageProps } from "@modules/app/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import documentationSlice, {
  initialState,
  updateCurrentDocsData,
} from "./state/documentationSlice";
import { DBTDocumentation } from "./state/types";
import { ContextProps } from "./types";

export const DocumentationContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
});

const DocumentationProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [state, dispatch] = useReducer(
    documentationSlice.reducer,
    documentationSlice.getInitialState(),
  );

  const onMesssage = useCallback(
    (
      event: MessageEvent<IncomingMessageProps & { docs: DBTDocumentation }>,
    ) => {
      const { command } = event.data;
      switch (command) {
        case "renderDocumentation":
          dispatch(updateCurrentDocsData(event.data.docs));
          break;
        default:
          break;
      }
    },
    [],
  );

  useEffect(() => {
    window.addEventListener("message", onMesssage);
    return () => {
      window.removeEventListener("message", onMesssage);
    };
  }, []);

  const values = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return (
    <DocumentationContext.Provider value={values}>
      <div>{children}</div>
    </DocumentationContext.Provider>
  );
};

export default DocumentationProvider;
