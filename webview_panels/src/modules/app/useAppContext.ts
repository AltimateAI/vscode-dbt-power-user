import { useContext } from "react";
import { AppContext } from "./AppProvider";
import { ContextProps } from "./types";

const useAppContext = (): ContextProps => {
  const { state, dispatch } = useContext(AppContext);
  return { state, dispatch };
};

export default useAppContext;
