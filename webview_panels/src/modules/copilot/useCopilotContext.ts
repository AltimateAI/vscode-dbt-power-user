import { useContext } from "react";
import { CopilotContext } from "./CopilotProvider";
import { ContextProps } from "./types";

const useCopilotContext = (): ContextProps => {
  const { state, dispatch } = useContext(CopilotContext);
  return { state, dispatch };
};

export default useCopilotContext;
