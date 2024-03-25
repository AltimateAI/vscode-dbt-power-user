import { withReactContext } from "storybook-react-context";
import type { Meta, StoryObj } from "@storybook/react";
import DataPilotPanel from "../..";
import { DataPilotContext } from "../../DataPilotProvider";
import { DatapilotCustomChatFactory } from "@testUtils";
import { RequestState } from "@modules/dataPilot/types";

const customChatLoadingState = DatapilotCustomChatFactory.build({
  state: RequestState.LOADING,
});

export default {
  title: "Datapilot/Tests",
  parameters: {
    layout: "left",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export const AddCustomTest: StoryObj = {
  render: (): JSX.Element => {
    return <DataPilotPanel />;
  },
  decorators: [
    withReactContext({
      Context: DataPilotContext,
      initialState: {
        state: {
          items: {
            [customChatLoadingState.id]: {
              ...customChatLoadingState,
            },
          },
          currentSessionId: customChatLoadingState.id,
        },
      },
    }),
  ],
};
