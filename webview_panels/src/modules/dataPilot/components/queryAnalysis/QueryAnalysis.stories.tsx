import { withReactContext } from "storybook-react-context";
import type { Meta } from "@storybook/react";
import DataPilotPanel from "../..";
import { DataPilotContext } from "../../DataPilotProvider";
import {
  DatapilotDocGenActionButtonFactory,
  DatapilotQueryAnalysisFactory,
  DatapilotQueryExplainResultFactory,
} from "@testUtils";
import { RequestState } from "@modules/dataPilot/types";

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
} satisfies Meta;

export const QueryAnalysisDefaultView = {
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
      timer: 1000,
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
