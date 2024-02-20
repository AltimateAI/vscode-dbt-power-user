import { withReactContext } from "storybook-react-context";
import type { Meta, StoryObj } from "@storybook/react";
import DataPilotPanel from "../..";
import { DataPilotContext } from "../../DataPilotProvider";
import {
  DatapilotQueryAnalysisFactory,
  DatapilotQueryExplainResultFactory,
} from "@testUtils";
import { RequestState } from "@modules/dataPilot/types";
import { userEvent, within } from "@storybook/testing-library";
import { faker } from "@faker-js/faker";
import { panelLogger } from "@modules/logger";
import { QueryAnalysisCommands } from "./commands";
import { QueryAnalysisType } from "./types";

const queryAnalysisLoadingState = DatapilotQueryAnalysisFactory.build({
  state: RequestState.LOADING,
});

const queryAnalysisDefaultState = DatapilotQueryAnalysisFactory.build({
  state: RequestState.COMPLETED,
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

export const WithSelectedQuery: StoryObj = {
  render: (): JSX.Element => {
    return <DataPilotPanel />;
  },
  decorators: [
    withReactContext({
      Context: DataPilotContext,
      initialState: {
        state: {
          items: {
            [queryAnalysisLoadingState.id]: {
              ...queryAnalysisLoadingState,
              analysisType: undefined,
            },
          },
          currentSessionId: queryAnalysisLoadingState.id,
        },
      },
    }),
  ],
};

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
          currentSessionId: queryAnalysisLoadingState.id,
        },
      },
    }),
  ],
};

export const ModifyFlow = {
  render: (): JSX.Element => {
    return <DataPilotPanel />;
  },
  parameters: {
    vscode: {
      func: (request: Record<string, unknown>): unknown => {
        if (request.command === QueryAnalysisCommands.modify) {
          return DatapilotQueryExplainResultFactory.build({
            datapilot_title: "Query change",
          });
        }

        if (request.command === "sendFeedback") {
          return true;
        }
      },
      timer: 500,
    },
  },
  decorators: [
    withReactContext({
      Context: DataPilotContext,
      initialState: {
        state: {
          items: {
            [queryAnalysisDefaultState.id]: {
              ...queryAnalysisDefaultState,
              analysisType: QueryAnalysisType.MODIFY,
              actions: [
                {
                  title: "Query change",
                  command: QueryAnalysisCommands.modify,
                },
              ],
            },
          },
          currentSessionId: queryAnalysisDefaultState.id,
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
        if (
          request.command === "regenerate" ||
          request.command === QueryAnalysisCommands.explain
        ) {
          return DatapilotQueryExplainResultFactory.build();
        }
        if (request.command === "queryanalysis:followup") {
          return faker.helpers.multiple(() => faker.lorem.sentence(), {
            count: 4,
          });
        }
        panelLogger.log(request);
      },
      timer: 500,
    },
  },
  decorators: [
    withReactContext({
      Context: DataPilotContext,
      initialState: {
        state: {
          items: {
            [queryAnalysisDefaultState.id]: {
              ...queryAnalysisDefaultState,
              analysisType: QueryAnalysisType.EXPLAIN,
              actions: [
                {
                  title: "Query explain",
                  command: QueryAnalysisCommands.explain,
                },
              ],
            },
          },
          currentSessionId: queryAnalysisDefaultState.id,
        },
      },
    }),
  ],
};
