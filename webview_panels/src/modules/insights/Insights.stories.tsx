import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import Insights from "./Insights";

export default {
  title: "Actions panel",
  parameters: {
    layout: "none",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export const SingleProject: StoryObj = {
  render: (): JSX.Element => {
    return <Insights />;
  },
  parameters: {
    vscode: {
      func: (request: Record<string, unknown>): unknown => {
        if (request.command === "getProjects") {
          return [
            {
              projectRoot: faker.system.directoryPath(),
              projectName: faker.lorem.word(),
            },
          ];
        }
      },
      timer: 500,
    },
  },
};

export const MultipleProject: StoryObj = {
  render: (): JSX.Element => {
    return <Insights />;
  },
  parameters: {
    vscode: {
      func: (request: Record<string, unknown>): unknown => {
        if (request.command === "getProjects") {
          return [
            {
              projectRoot: faker.system.directoryPath(),
              projectName: faker.lorem.word(),
            },
            {
              projectRoot: faker.system.directoryPath(),
              projectName: faker.lorem.word(),
            },
            {
              projectRoot: faker.system.directoryPath(),
              projectName: faker.lorem.word(),
            },
          ];
        }
      },
      timer: 500,
    },
  },
};
