import { withReactContext } from "storybook-react-context";
import type { Meta } from "@storybook/react";
import DocumentationEditor from "./DocumentationEditor";
import { DocumentationContext } from "./DocumentationProvider";
import { DATA, PROJECT } from "./state/sampleData";

const meta = {
  title: "Documentation Editor",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export default meta;

export const DefaultHelpView = {
  render: (): JSX.Element => {
    return <DocumentationEditor />;
  },
  decorators: [
    withReactContext({
      Context: DocumentationContext,
      initialState: { state: {} },
    }),
  ],
};

export const ModelDocGenView = {
  render: (): JSX.Element => {
    return <DocumentationEditor />;
  },
  decorators: [
    withReactContext({
      Context: DocumentationContext,
      initialState: {
        state: {
          currentDocsData: DATA,
          project: PROJECT,
          userInstructions: {},
        },
      },
    }),
  ],
};
