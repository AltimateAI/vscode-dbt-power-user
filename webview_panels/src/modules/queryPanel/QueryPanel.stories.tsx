import type { Meta } from "@storybook/react";
import QueryPanelProvider from "./QueryPanelProvider";

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

export const DefaultQueryPanelView = {
  render: (): JSX.Element => {
    return <QueryPanelProvider />;
  },
};
