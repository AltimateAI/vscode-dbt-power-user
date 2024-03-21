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
import MarkdownRenderer from "@modules/markdown/Renderer";

const SAMPLE_TABLE =
  "Let's consider the following sample data for the `dim_listings_cleansed` and `dim_hosts_cleansed` tables:\n\n`dim_listings_cleansed`:\n\n| listing_id | listing_name | room_type | minimum_nights | price | host_id | created_at | updated_at |\n|------------|--------------|-----------|----------------|-------|---------|------------|------------|\n| 1          | Cozy Cottage | Private   | 2              | 100   | 10      | 2020-01-01 | 2020-02-01 |\n| 2          | Urban Loft   | Shared    | 1              | 80    | 20      | 2020-02-01 | 2020-03-01 |\n| 3          | Beach House  | Entire    | 3              | 200   | 30      | 2020-03-01 | 2020-04-01 |\n\n`dim_hosts_cleansed`:\n\n| host_id | host_name | is_superhost | created_at | updated_at |\n|---------|-----------|--------------|------------|------------|\n| 10      | Alice     | True         | 2019-12-01 | 2020-01-15 |\n| 20      | Bob       | False        | 2020-01-01 | 2020-02-15 |\n| 40      | Charlie   | True         | 2020-02-01 | 2020-03-15 |\n\nThe SQL query you provided will join these two tables on the `host_id` field, and select the most recent `updated_at` value between the two tables for each record. \n\nHere's what the result would look like:\n\n| listing_id | listing_name | room_type | minimum_nights | price | host_id | host_name | host_is_superhost | created_at | updated_at |\n|------------|--------------|-----------|----------------|-------|---------|-----------|-------------------|------------|------------|\n| 1          | Cozy Cottage | Private   | 2              | 100   | 10      | Alice     | True              | 2020-01-01 | 2020-02-01 |\n| 2          | Urban Loft   | Shared    | 1              | 80    | 20      | Bob       | False             | 2020-02-01 | 2020-03-01 |\n| 3          | Beach House  | Entire    | 3              | 200   | 30      | NULL      | NULL              | 2020-03-01 | 2020-04-01 |\n\nNote that for the third record, the `host_name` and `host_is_superhost` fields are NULL because there is no host with `host_id` 30 in the `dim_hosts_cleansed` table. The `updated_at` field for each record is the later of the `updated_at` values in the `dim_listings_cleansed` and `dim_hosts_cleansed` tables.";
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

export const MarkdownWithTable = {
  render: (): JSX.Element => {
    return <MarkdownRenderer response={SAMPLE_TABLE} />;
  },
};
