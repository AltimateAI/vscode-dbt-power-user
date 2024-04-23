import type { Meta } from "@storybook/react";
import QueryPanelProvider from "./QueryPanelProvider";
import { Button, Stack } from "@uicore";

const meta = {
  title: "Query Panel",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export default meta;

const ActionButton = ({
  data,
  title,
}: {
  data: { command: string } & Record<string, unknown>;
  title: string;
}) => {
  const handleAction = () => {
    window.postMessage({
      command: data.command,
      args: data,
    });
  };
  return <Button onClick={handleAction}>{title}</Button>;
};

export const DefaultQueryPanelView = {
  render: (): JSX.Element => {
    return (
      <div>
        <Stack className="mb-4">
          <ActionButton
            data={{ command: "renderLoading" }}
            title="Start loading"
          />
          <ActionButton
            data={{
              command: "renderQuery",
              raw_sql: "select * from {{ref'users'}}",
              compiled_sql: "select * from users",
              rows: [{ x: 0, y: false }],
              columnNames: [],
            }}
            title="Render query results"
          />
          <ActionButton
            data={{
              command: "renderError",
              raw_sql: "select * from {{ref'users'}}",
              compiled_sql: "select * from users",
              errorTitle: "Error title",
              errorMessage: "Error message here",
              errorDataMarkup: "Error data markup here",
            }}
            title="Render Error"
          />
          <ActionButton data={{ command: "resetState" }} title="Reset state" />
        </Stack>
        <QueryPanelProvider />
      </div>
    );
  },
  parameters: {
    vscode: {
      func: (request: Record<string, unknown>): unknown => {
        if (request.command === "getQueryPanelContext") {
          return { lastHintTimestamp: 0 };
        }
      },
      timer: 500,
    },
  },
};
