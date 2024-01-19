import { useContext } from "react";
import { DataPilotContext } from "./DataPilotProvider";
import { ContextProps } from "./types";

const useDataPilotContext = (): ContextProps => useContext(DataPilotContext);

export default useDataPilotContext;
