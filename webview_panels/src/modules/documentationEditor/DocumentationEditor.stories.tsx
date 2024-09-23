import { withReactContext } from "storybook-react-context";
import type { Meta } from "@storybook/react";
import DocumentationProvider, {
  DocumentationContext,
} from "./DocumentationProvider";
import {
  DBTDocumentationFactory,
  DBTDocumentationTestsFactory,
  TenantUserFactory,
} from "@testUtils";
import { faker } from "@faker-js/faker";
import DocumentationEditor from "./DocumentationEditor";
import { TeamMateProvider } from "@lib";
import {
  aiLearningsFactory,
  coachAiResponseFactory,
  delay,
  getRandomDelay,
} from "@lib-testUtils";
import { useEffect } from "react";

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
    })
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
    useEffect(() => {
      setTimeout(() => {
        window.postMessage(
          {
            command: "renderDocumentation",
            docs: docsDataForTests,
            missingDocumentationMessage: "",
            tests: testsDataForTests,
            project: faker.system.fileName(),
            collaborationEnabled: true,
          },
          "*"
        );
      }, 100);
    }, []);
    return (
      <TeamMateProvider>
        <DocumentationProvider />
      </TeamMateProvider>
    );
  },
  decorators: [],
  parameters: {
    vscode: {
      func: async (request: Record<string, unknown>): Promise<unknown> => {
        switch (request.command) {
          case `getTestCode`:
            return { code: `select * from users` };
          case `getUsers`:
            return TenantUserFactory.buildList(5);
          case "fetch":
            switch (request.endpoint) {
              case `/coach/training`:
                await delay(getRandomDelay());
                if (
                  (request.fetchArgs as RequestInit | undefined)?.method ===
                  "POST"
                ) {
                return coachAiResponseFactory.build();
                }
                return { train_docs: aiLearningsFactory.buildList(5) };
              case `/coach/training/confirm`:
                await delay(getRandomDelay());
                return coachAiResponseFactory.build();
            }
        }
      },
      timer: 500,
    },
  },
};
