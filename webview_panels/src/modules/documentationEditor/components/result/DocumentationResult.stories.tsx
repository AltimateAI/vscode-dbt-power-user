import type { Meta } from "@storybook/react";
import DocumentationResult from "./DocumentationResult";

const meta = {
  title: "Documentation/Result",
  component: DocumentationResult,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta;

export default meta;

export const Default = {
  args: {},
};
