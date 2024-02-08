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
import { panelLogger } from "@modules/logger";

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
    layout: "left",
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
          currentSessionId: queryAnalysisLoadingState.id
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
      func: (request: Record<string, unknown>): unknown => {
        if (request.command === "regenerate" || request.command === 'queryAnalysis:explain'){
          return DatapilotQueryExplainResultFactory.build({
            actions: [
              DatapilotDocGenActionButtonFactory.build({
                title: "Why there is a join condition?",
              }),
            ],
          })
        }
        if (request.command === "queryanalysis:followup"){
          return faker.helpers.multiple(() => faker.lorem.sentence(), {count: 4})
        }
        panelLogger.log(request)
      },
      timer: 500,
    },
  },
  decorators: [
    withReactContext({
      Context: DataPilotContext,
      initialState: {
        state: {
          items: { [queryAnalysisDefaultState.id]: queryAnalysisDefaultState },
          currentSessionId: queryAnalysisDefaultState.id

        },
      },
    }),
  ],
};
