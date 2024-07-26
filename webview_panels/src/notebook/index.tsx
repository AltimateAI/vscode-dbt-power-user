// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// import ReactDOM from "react-dom/client";
import type { ActivationFunction, OutputItem } from "vscode-notebook-renderer";
// import rendererCss from "./renderer.scss?inline";
import AllItems from "./renderer";
// import { panelLogger } from "@modules/logger";
// import type { QueryPanelStateProps } from "@modules/queryPanel/context/types";
import "bootstrap/dist/css/bootstrap.min.css";
import "@uicore/theme.scss";
import "../main.scss";

// import React from "react";
import ReactDOM from "react-dom/client";

export const activate: ActivationFunction = () => {
  const style = document.createElement("style");
  style.type = "text/css";
  // style.textContent = rendererCss;

  return {
    renderOutputItem(info: OutputItem, element: HTMLElement) {
      const data = info.json();
      console.log("renderOutputItem", info.json(), element);
      // let shadow = element.shadowRoot;
      // if (!shadow) {
      //   shadow = element.attachShadow({ mode: "open" });

      //   shadow.append(style.cloneNode(true));

      //   const root = document.createElement("div");
      //   root.id = "root";
      //   element.append(root);
      // }
      const root = document.createElement("div");
        root.id = "root";
        element.append(root);
      ReactDOM.createRoot(root).render(
        <AllItems items={data} />,
        // <pre><code>
        //   {JSON.stringify(data, null, 2)}
        //   </code></pre>,
      );
    },
  };
};

// export default {activate}
// if (document.getElementById("root")) {
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <div onClick={() => activate({})}>Hello!</div>
//   </React.StrictMode>,
// );
// }