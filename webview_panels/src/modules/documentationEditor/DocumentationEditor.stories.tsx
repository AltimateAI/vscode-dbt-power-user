import { withReactContext } from "storybook-react-context";
import type { Meta } from "@storybook/react";
import { DocumentationContext } from "./DocumentationProvider";
import {
  DBTDocumentationFactory,
  DBTDocumentationTestsFactory,
} from "@testUtils";
import { faker } from "@faker-js/faker";
import DocumentationEditor from "./DocumentationEditor";
import { initialState } from "./state/documentationSlice";
import { Pages } from "./state/types";

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
    return <DocumentationEditor />;
  },
  decorators: [
    withReactContext({
      Context: DocumentationContext,
      initialState: { state: {} },
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
export const ModelDocGenView = {
  render: (): JSX.Element => {
    return <DocumentationEditor />;
  },
  decorators: [
    withReactContext({
      Context: DocumentationContext,
      initialState: {
        state: {
          ...initialState,
          selectedPages: [Pages.DOCUMENTATION, Pages.TESTS],
          currentDocsData: docsDataForTests,
          currentDocsTests: testsDataForTests,
          project: faker.system.fileName(),
        },
      },
    }),
  ],
  parameters: {
    vscode: {
      func: (request: Record<string, unknown>): unknown => {
        if (request.command === "getTestCode") {
          return { code: `select * from users` };
        }
        if (request.command === "getUsers"){
          return [{
            id: 2,
            uuid: "ff90f395-f74c-4146-8730-e40981d12aa6",
            first_name: "John",
            last_name: "Doe",
            email: "john.doe@example.com",
            phone: null,
            is_active: true,
            is_verified: true,
            is_invited: true,
            is_onboarded: true,
            created_at: "09-Apr-24 05:28",
            role_title: "Owner",
            display_name: "John.Doe.john.doe@example.com",
          }];
        }
      },
      timer: 500,
    },
  },
};
