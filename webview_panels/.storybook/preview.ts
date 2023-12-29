import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    "data-theme-toggle": {
      querySelector: "html",
      "data-target": "theme",
      default: "light",
      values: {
        dark: "dark",
        light: "light",
      },
      lightFill: "#f5f5f7",
      darkFill: "#1e1e1e",
    },
  },
};

export default preview;
