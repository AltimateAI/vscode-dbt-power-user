import type { Meta, StoryObj } from "@storybook/react";
import McpOnboarding from "./Onboarding";

export default {
  title: "MCPOnboarding",
  component: McpOnboarding,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof McpOnboarding>;

export const Default: StoryObj<typeof McpOnboarding> = {
  render: (): JSX.Element => {
    return <McpOnboarding />;
  },
  parameters: {
    vscode: {
      func: (request: Record<string, unknown>): unknown => {
        if (request.command === "configureMcp") {
          return { success: true };
        }
        if (request.command === "completeMcpOnboarding") {
          return { success: true };
        }
      },
      timer: 500,
    },
  },
};
