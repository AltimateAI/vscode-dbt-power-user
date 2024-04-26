import type { Meta } from "@storybook/react";
import PerspectiveViewer from "./PerspectiveViewer";
import { TableData } from "@finos/perspective";

const meta = {
  title: "PerspectiveViewer",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export default meta;

export const DefaultPerspectiveViewerView = {
  render: (): JSX.Element => {
    return (
      <PerspectiveViewer
        data={
          [
            { x: 10.0121, y: "a", z: true },
            { x: 2, y: "b", z: false },
            { x: 3, y: "c", z: true },
            { x: 4, y: "d", z: false },
          ] as unknown as TableData
        }
      />
    );
  },
};
