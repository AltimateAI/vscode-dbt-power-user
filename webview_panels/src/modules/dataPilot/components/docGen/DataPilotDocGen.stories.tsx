import { withReactContext } from "storybook-react-context";
import type { Meta } from "@storybook/react";
import DataPilotPanel from "../..";
import DataPilotProvider, { DataPilotContext } from "../../DataPilotProvider";
import {
  DatapilotDocGenActionButtonFactory,
  DatapilotDocGenFactory,
  DatapilotDocGenWithErrorFactory,
  DatapilotDocGenWithLoadingFactory,
} from "../../../../testUtils";

const docGenCompleted = DatapilotDocGenFactory.build({
  actions: [
    DatapilotDocGenActionButtonFactory.build(),
    DatapilotDocGenActionButtonFactory.build({
      title: "Make it shorter",
      data: { modelName: "customers" },
      userPrompt: "Make documentation shorter for {type} {name}",
      datapilotTitle: "Improving documentation based on the user suggestion",
    }),
  ],
});
const docGenError = DatapilotDocGenWithErrorFactory.build();
const docGenLoading = DatapilotDocGenWithLoadingFactory.build({
  meta: {
    description: "Customer's first name. PII.",
    user_instructions: {},
    columnName: "first_name",
    columns: [],
  },
});

const SAMPLE_DOCGEN_DATA = {
  DATA: {
    [docGenCompleted.id]: docGenCompleted,
  },
  ERROR: {
    [docGenError.id]: docGenError,
  },
  LOADING: {
    [docGenLoading.id]: docGenLoading,
  },
};

const meta = {
  title: "Datapilot/DocGen",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export default meta;

export const DefaultView = {
  render: (): JSX.Element => {
    return (
      <DataPilotProvider>
        <DataPilotPanel />
      </DataPilotProvider>
    );
  },
};

export const DocGenLoading = {
  render: (): JSX.Element => {
    return <DataPilotPanel />;
  },
  decorators: [
    withReactContext({
      Context: DataPilotContext,
      initialState: { state: { items: SAMPLE_DOCGEN_DATA.LOADING } },
    }),
  ],
};

export const DocGenError = {
  render: (): JSX.Element => {
    return <DataPilotPanel />;
  },
  decorators: [
    withReactContext({
      Context: DataPilotContext,
      initialState: { state: { items: SAMPLE_DOCGEN_DATA.ERROR } },
    }),
  ],
};

export const DocGenData = {
  render: (): JSX.Element => {
    return <DataPilotPanel />;
  },
  decorators: [
    withReactContext({
      Context: DataPilotContext,
      initialState: { state: { items: SAMPLE_DOCGEN_DATA.DATA } },
    }),
  ],
};
