/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
// @ts-nocheck
import { h, render } from "preact";
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
      render(<AllItems items={info.json()} />, shadow.querySelector("#root")!);
    },
  };
};
