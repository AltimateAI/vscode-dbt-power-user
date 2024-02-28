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
    layout: "padded",
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

const docsDataForTests = DBTDocumentationFactory.build();
const testsDataForTests = docsDataForTests.columns
  .map((c, i) =>
    DBTDocumentationTestsFactory.build({
      column_name: i % 3 === 0 ? undefined : c.name,
    }),
  )
  .map((test) => {
    if (test.test_metadata) {
      return {
        ...test,
        test_metadata: {
          ...test.test_metadata,
          kwargs: {
            ...test.test_metadata.kwargs,
            column_name: test.column_name,
          },
        },
      };
    }
    return test;
  });

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
          currentDocsData: docsDataForTests,
          currentDocsTests: testsDataForTests,
          project: faker.system.fileName(),
          activePage: Pages.TESTS,
        } as DocumentationStateProps,
      },
    }),
  ],
  parameters: {
    vscode: {
      func: (request: Record<string, unknown>): unknown => {
        if (request.command === "getTestCode") {
          return { code: `select * from users` };
        }
      },
      timer: 500,
    },
  },
};
