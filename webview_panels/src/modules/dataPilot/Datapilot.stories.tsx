import type { Meta, StoryObj } from "@storybook/react-vite";
import { withReactContext } from "storybook-react-context";
import DataPilotPanel from ".";
import { DataPilotContext } from "./DataPilotProvider";

export default {
  title: "Datapilot",
  parameters: {
    layout: "left",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export const Help: StoryObj = {
  render: (): JSX.Element => {
    return <DataPilotPanel />;
  },
  decorators: [
    withReactContext({
      Context: DataPilotContext,
      initialState: {
        state: {
          items: {},
          currentSessionId: undefined,
          showHelp: true,
        },
      },
    }),
  ],
};
