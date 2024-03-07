import type { Meta } from "@storybook/react";
import { CardTitle, Container, Stack } from "..";

const meta = {
  title: "UiToolKit/Colors",
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
    const colors = [
      {
        title: "Primary color",
        colors: [{ title: "Blue", cssVariable: "--primary-color" }],
      },
      {
        title: "Text color",
        colors: [
          { title: "Title", cssVariable: "--text-color--title" },
          { title: "Paragraph", cssVariable: "--text-color--paragraph" },
          { title: "Caption", cssVariable: "--text-color--caption" },
          { title: "White", cssVariable: "--text-color--white" },
          { title: "Brand", cssVariable: "--text-color--brand" },
        ],
      },
      {
        title: "Backgrounds",
        colors: [
          { title: "Base", cssVariable: "--background--base" },
          { title: "01", cssVariable: "--background--01" },
          { title: "02", cssVariable: "--background--02" },
          { title: "03", cssVariable: "--background--03" },
          { title: "04", cssVariable: "--background--04" },
          { title: "White", cssVariable: "--background" },
          { title: "Blue", cssVariable: "--background--blue" },
        ],
      },
      {
        title: "Gray",
        colors: [
          { title: "Blue Gray 01", cssVariable: "--gray--blue--gray-01" },
          { title: "Blue Gray 02", cssVariable: "--gray--blue--gray-02" },
          { title: "Gray 01", cssVariable: "--gray--gray-01" },
          { title: "Gray 02", cssVariable: "--gray--gray-02" },
        ],
      },
      {
        title: "Actions color",
        colors: [
          { title: "Active", cssVariable: "--action--active" },
          { title: "Secondary", cssVariable: "--action--secondary" },
          { title: "Disable", cssVariable: "--action--disable" },
          { title: "Brand dark", cssVariable: "--action--brand" },
        ],
      },
      {
        title: "Icons color",
        colors: [
          { title: "Active", cssVariable: "--icon--active" },
          { title: "Deactive", cssVariable: "--icon--default" },
          { title: "Disable", cssVariable: "--icon--deactive" },
          { title: "Blue", cssVariable: "--icon--blue" },
        ],
      },
      {
        title: "Stroke color",
        colors: [
          { title: "Active", cssVariable: "--stroke--active" },
          { title: "Default", cssVariable: "--stroke--default" },
          { title: "Disable", cssVariable: "--stroke--disable" },
          { title: "Orange", cssVariable: "--stroke--orange" },
          { title: "Blue", cssVariable: "--stroke--blue" },
        ],
      },
    ];
    return (
      <Container style={{ background: "var(--background--base)" }}>
        <CardTitle tag="h3">Colors for VSCode Power user extension</CardTitle>
        <br />
        <Stack direction="column">
          {colors.map((section) => (
            <Stack key={section.title} direction="column">
              <h3>{section.title}</h3>
              <Stack>
                {section.colors.map((color) => (
                  <div key={color.title}>
                    <div
                      style={{
                        marginBottom: 5,
                        border: "1px solid #eee",
                        width: "10rem",
                        height: "10rem",
                        borderRadius: "8px 8px 0 0",
                        background: `var(${color.cssVariable})`,
                      }}
                    />
                    <h6>{color.title}</h6>
                    <p>{color.cssVariable}</p>
                  </div>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Container>
    );
  },
};
