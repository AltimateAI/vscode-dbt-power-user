import { useContext } from "react";
import { AppContext } from "./AppProvider";
import { ContextProps } from "./types";

const useAppContext = (): ContextProps => {
  return useContext(AppContext);
};

export default useAppContext;
