import { withReactContext } from "storybook-react-context";
import type { Meta } from "@storybook/react";
import DataPilotPanel from "../..";
import { DataPilotContext } from "../../DataPilotProvider";
import {
  DatapilotDocGenActionButtonFactory,
  DatapilotSqlAnalysisFactory,
} from "@testUtils";
import { RequestState } from "@modules/dataPilot/types";

const sqlAnalysisDefaultState = DatapilotSqlAnalysisFactory.build({
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
  title: "Datapilot/Sql Analysis",
} satisfies Meta;

export const SqlAnalysisDefaultView = {
  render: (): JSX.Element => {
    return <DataPilotPanel />;
  },
  decorators: [
    withReactContext({
      Context: DataPilotContext,
      initialState: {
        state: {
          items: { [sqlAnalysisDefaultState.id]: sqlAnalysisDefaultState },
        },
      },
    }),
  ],
};
