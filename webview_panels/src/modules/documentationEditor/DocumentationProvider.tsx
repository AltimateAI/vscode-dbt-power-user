import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { IncomingMessageProps } from "@modules/app/types";
import { panelLogger } from "@modules/logger";
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
  setGenerationsHistory,
  setInsertedEntityName,
  setProject,
  updateColumnsAfterSync,
  updateColumnsInCurrentDocsData,
  updateCurrentDocsData,
  updateUserInstructions,
} from "./state/documentationSlice";
import {
  DBTDocumentation,
  DocsGenerateUserInstructions,
  MetadataColumn,
} from "./state/types";
import { ContextProps } from "./types";
import { getGenerationsInModel } from "./utils";

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

  const updateFocus = (name?: string) => {
    dispatch(setInsertedEntityName(name));
    // reset the name, so re insert will still focus
    setTimeout(() => {
      dispatch(setInsertedEntityName(undefined));
    }, 1000);
  };

  const onMesssage = useCallback(
    (
      event: MessageEvent<
        IncomingMessageProps & {
          docs?: DBTDocumentation;
          project?: string;
          columns?: MetadataColumn[];
          model?: string;
          name?: string;
          description?: string;
        }
      >,
    ) => {
      const { command, ...params } = event.data;
      switch (command) {
        case "renderDocumentation":
          dispatch(updateCurrentDocsData(event.data.docs));
          dispatch(setProject(event.data.project));
          break;
        case "renderColumnsFromMetadataFetch":
          if (event.data.columns) {
            dispatch(
              updateColumnsAfterSync({
                columns: event.data.columns,
              }),
            );
          }
          break;
        case "docgen:insert":
          panelLogger.info("received new doc gen", event.data);
          // insert model desc
          if (!params.name && params.model) {
            dispatch(
              updateCurrentDocsData({
                description: params.description,
                name: params.model,
                isNewGeneration: true,
              }),
            );
            updateFocus(params.model);
            return;
          }
          // insert column desc
          dispatch(
            updateColumnsInCurrentDocsData({
              columns: [params as Partial<MetadataColumn>],
              isNewGeneration: true,
            }),
          );
          updateFocus((params as Partial<MetadataColumn>).name);

          break;
        default:
          break;
      }
    },
    [],
  );

  const loadGenerationsHistory = (project: string, model: string) => {
    getGenerationsInModel(project, model)
      .then((data) => {
        dispatch(setGenerationsHistory(data));
      })
      .catch((err) =>
        panelLogger.error("error while loading generations history", err),
      );
  };

  useEffect(() => {
    if (!state.project || !state.currentDocsData?.name) {
      return;
    }

    const userInstructions = localStorage.getItem("userInstructions");
    if (userInstructions) {
      dispatch(
        updateUserInstructions(
          JSON.parse(userInstructions) as DocsGenerateUserInstructions,
        ),
      );
    }
    loadGenerationsHistory(state.project, state.currentDocsData.name);
  }, [state.project, state.currentDocsData?.name]);

  useEffect(() => {
    window.addEventListener("message", onMesssage);
    // Load current editor documentation
    executeRequestInAsync("getCurrentModelDocumentation", {});

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
