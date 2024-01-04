import type { Meta } from "@storybook/react";
import Score from "./Score";

const meta = {
  title: "Documentation/Score",
  component: Score,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta;

export default meta;

export const Default = {
  args: { percentage: 90 },
};

export const Blue = {
  args: { percentage: 70 },
};

export const Yellow = {
  args: { percentage: 50 },
};
