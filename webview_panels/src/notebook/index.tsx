/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import ReactDOM from "react-dom/client";
import type { ActivationFunction, OutputItem } from "vscode-notebook-renderer";
// import rendererCss from "./renderer.scss?inline";
import AllItems from "./renderer";
// import { panelLogger } from "@modules/logger";
// import type { QueryPanelStateProps } from "@modules/queryPanel/context/types";

export const activate: ActivationFunction = () => {
  const style = document.createElement("style");
  style.type = "text/css";
  // style.textContent = rendererCss;

  return {
    renderOutputItem(info: OutputItem, element: HTMLElement) {
      const data = info.json();
      console.log("renderOutputItem", info.json(), element);
      let shadow = element.shadowRoot;
      if (!shadow) {
        shadow = element.attachShadow({ mode: "open" });

        shadow.append(style.cloneNode(true));

        const root = document.createElement("div");
        root.id = "root";
        shadow.append(root);
      }
      ReactDOM.createRoot(shadow.querySelector("#root")!).render(
        data ? <AllItems items={data}/> : null,
      );
    },
  };
};
