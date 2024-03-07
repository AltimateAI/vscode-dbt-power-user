import React from "react";
import type { Preview } from "@storybook/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/main.css";
import "../node_modules/@vscode/codicons/dist/codicon.css";
import "../src/uiCore/theme.scss";
import { decorator as VsCodeDecorator } from "./__mocks__/vscode";
import AppProvider from "../src/modules/app/AppProvider";

const preview: Preview = {
  decorators: [
    VsCodeDecorator,
    (Story) => (
      <AppProvider>
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
