import type { ActivationFunction, OutputItem } from "vscode-notebook-renderer";
import AllItems from "./renderer";
import "bootstrap/dist/css/bootstrap.min.css";
import "@uicore/theme.scss";
import "../main.scss";
import ReactDOM from "react-dom/client";
import { panelLogger } from "@modules/logger";
import { QueryPanelStateProps } from "@modules/queryPanel/context/types";

export const activate: ActivationFunction = () => {
  return {
    renderOutputItem(info: OutputItem, element: HTMLElement) {
      const data =
        info.json() as unknown as QueryPanelStateProps["queryResults"];
      panelLogger.log("renderOutputItem", info.json(), element);
      const root = document.createElement("div");
      root.id = "root";
      element.append(root);
      ReactDOM.createRoot(root).render(
        data ? <AllItems items={data} /> : <div>No result</div>,
      );
    },
  };
};
