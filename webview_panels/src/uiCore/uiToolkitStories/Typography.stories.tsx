import type { Meta } from "@storybook/react";
import { CardTitle, Container, Stack } from "..";

const meta = {
  title: "UiToolKit/Typography",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export default meta;

export const UIKit = {
  render: (): JSX.Element => {
    return (
      <Container style={{ background: "var(--background--base)" }}>
        <CardTitle tag="h3">
          Typography for VSCode Power user extension
        </CardTitle>
        <br />
        <Stack direction="column">
          <h5>Typography</h5>
          <h1>Heading 1 28px 500</h1>
          <h2>Heading 2 24px 500</h2>
          <h3>Heading 3 20px 500</h3>
          <h4>Heading 4 18px 500</h4>
          <h5>Heading 5 16px 500</h5>
          <h6>Heading 6 14px 500</h6>
          <p>Paragraph P1 14px 400</p>
          <div className="p1">.P1 20px 400</div>
          <div className="p2">.P2 18px 400</div>
          <caption>Caption P3 16px 400</caption>
          <div className="p3">Caption .P3 16px 400</div>
          <div className="p4">.P4 12px 400</div>
          <div className="p5">.P5 10px 400</div>
          <div className="p6">.P6 8px 400</div>
        </Stack>
      </Container>
    );
  },
};
