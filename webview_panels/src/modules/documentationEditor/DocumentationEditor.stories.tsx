import { withReactContext } from "storybook-react-context";
import type { Meta } from "@storybook/react";
import { DocumentationContext } from "./DocumentationProvider";
import {
  DBTDocumentationFactory,
  DBTDocumentationTestsFactory,
} from "@testUtils";
import { faker } from "@faker-js/faker";
import DocumentationWrapper from "./DocumentationWrapper";
import { initialState } from "./state/documentationSlice";
import { DocumentationStateProps, Pages } from "./state/types";

const meta = {
  title: "Documentation Editor",
  parameters: {
    layout: "left",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export default meta;

export const DefaultHelpView = {
  render: (): JSX.Element => {
    return <DocumentationWrapper />;
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
    return <DocumentationWrapper />;
  },
  decorators: [
    withReactContext({
      Context: DocumentationContext,
      initialState: {
        state: {
          ...initialState,
          currentDocsData: DBTDocumentationFactory.build(),
          project: faker.system.fileName(),
        },
      },
    }),
  ],
};

export const DocumentationTestsView = {
  render: (): JSX.Element => {
    return <DocumentationWrapper />;
  },
  decorators: [
    withReactContext({
      Context: DocumentationContext,
      initialState: {
        state: {
          ...initialState,
          currentDocsData: DBTDocumentationFactory.build(),
          currentDocsTests: DBTDocumentationTestsFactory.buildList(10),
          project: faker.system.fileName(),
          activePage: Pages.TESTS,
        } as DocumentationStateProps,
      },
    }),
  ],
};
