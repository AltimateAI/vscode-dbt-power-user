import { withReactContext } from "storybook-react-context";
import type { Meta, StoryObj } from "@storybook/react";
import DataPilotPanel from "../..";
import { DataPilotContext } from "../../DataPilotProvider";
import {
  DatapilotDocGenActionButtonFactory,
  DatapilotQueryAnalysisFactory,
  DatapilotQueryExplainResultFactory,
} from "@testUtils";
import { RequestState } from "@modules/dataPilot/types";
import { userEvent, within } from "@storybook/testing-library";
import { faker } from "@faker-js/faker";

const queryAnalysisLoadingState = DatapilotQueryAnalysisFactory.build({
  state: RequestState.LOADING,
  actions: [
    DatapilotDocGenActionButtonFactory.build({
      title: "Query explanation",
    }),
    DatapilotDocGenActionButtonFactory.build({
      title: "Query change",
    }),
    DatapilotDocGenActionButtonFactory.build({
      title: "Query debug",
    }),
    DatapilotDocGenActionButtonFactory.build({
      title: "Query translate",
    }),
  ],
});

const queryAnalysisDefaultState = DatapilotQueryAnalysisFactory.build({
  state: RequestState.COMPLETED,
  actions: [
    DatapilotDocGenActionButtonFactory.build({
      title: "Query explanation",
    }),
    DatapilotDocGenActionButtonFactory.build({
      title: "Query change",
    }),
    DatapilotDocGenActionButtonFactory.build({
      title: "Query debug",
    }),
    DatapilotDocGenActionButtonFactory.build({
      title: "Query translate",
    }),
  ],
});

export default {
  title: "Datapilot/Query Analysis",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export const ExplainLoading: StoryObj = {
  render: (): JSX.Element => {
    return <DataPilotPanel />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Query explanation" }),
    );
  },
  parameters: {
    vscode: {
      data: { chunk: faker.lorem.sentence() },
      timer: 2000,
    },
  },
  decorators: [
    withReactContext({
      Context: DataPilotContext,
      initialState: {
        state: {
          items: { [queryAnalysisLoadingState.id]: queryAnalysisLoadingState },
        },
      },
    }),
  ],
};

export const ExplainFlow = {
  render: (): JSX.Element => {
    return <DataPilotPanel />;
  },
  parameters: {
    vscode: {
      data: DatapilotQueryExplainResultFactory.build({
        actions: [
          DatapilotDocGenActionButtonFactory.build({
            title: "Why there is a join condition?",
          }),
        ],
      }),
      timer: 2000,
    },
  },
  decorators: [
    withReactContext({
      Context: DataPilotContext,
      initialState: {
        state: {
          items: { [queryAnalysisDefaultState.id]: queryAnalysisDefaultState },
        },
      },
    }),
  ],
};
