import type { Meta, StoryObj } from "@storybook/react";
import DbtPowerUserView from "./DbtPowerUserView";

export default {
  title: "DbtPowerUserView",
  parameters: {
    layout: "none",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export const Default: StoryObj = {
  render: (): JSX.Element => {
    return <DbtPowerUserView />;
  },
  parameters: {
    vscode: {
      func: (request: Record<string, unknown>): unknown => {
        if (request.command === "getParentModels") {
          window.postMessage({
            command: "renderParentModels",
            args: { hello: "hi" },
          });
          return;
        }
      },
      timer: 500,
    },
  },
};
