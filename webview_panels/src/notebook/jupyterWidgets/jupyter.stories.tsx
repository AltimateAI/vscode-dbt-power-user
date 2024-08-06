import type { Meta } from "@storybook/react";
import JupyterWidgets from ".";


const meta = {
  title: "Jupyter Widgets",
  parameters: {
    layout: "none",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export default meta;

export const Default = () => {
  return <JupyterWidgets />;
};