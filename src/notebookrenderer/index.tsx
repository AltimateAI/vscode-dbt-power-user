/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import type { ActivationFunction } from "vscode-notebook-renderer";
import { AllItems } from "./renderer";
import rendererCss from "./renderer.css";

export const activate: ActivationFunction = () => {
  const style = document.createElement("style");
  style.type = "text/css";
  style.textContent = rendererCss;

  return {
    renderOutputItem(info, element) {
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
        <AllItems items={info.json()} />,
      );
    },
  };
};
