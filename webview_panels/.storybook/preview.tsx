import React from "react";
import type { Preview } from "@storybook/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/main.scss";
import "../node_modules/@vscode/codicons/dist/codicon.css";
import "../src/uiCore/theme.scss";
import { decorator as VsCodeDecorator } from "./__mocks__/vscode";
import AppProvider from "../src/modules/app/AppProvider";

const theme = "vscode-dark"; // vscode-light
const css = `
    .sb-show-main.vscode-dark {
      --vscode-panel-background: #1e1e1e;
    }
`;

const preview: Preview = {
  decorators: [
    (story) => {
      document.body.classList.add(theme);
      return story();
    },
    VsCodeDecorator,
    (Story) => (
      <AppProvider>
        <style>{css}</style>
        <Story />
      </AppProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
