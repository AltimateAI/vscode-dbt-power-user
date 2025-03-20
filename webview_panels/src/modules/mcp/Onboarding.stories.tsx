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
        if (request.command === "enableDataSourceQueryTools") {
          return { success: true };
        }
        if (request.command === "completeMcpOnboarding") {
          return { success: true };
        }
        if (request.command === "getMcpOnboardingSteps") {
          return [
            {
              title: "Setup MCP server",
              description: "In this step, MCP server will be started and a configuration file will be created",
              enableButton: "Let's do it!",
            },
            {
              title: "Advanced Data Tools",
              description: "Enhance your experience with advanced data exploration features. By enabling this option, you allow data lookup queries to be processed and shared with Cursor. Features include:\n• Query specific column values\n• Execute SQL\n• Previewing data structures",
              enableButton: "Enable Advanced Features",
              disableButton: "Disable Features",
            },
            {
              title: "Enable MCP server",
              description: "Open Cursor Settings and select the MCP from sidebar. Click 'Disabled' button next to 'dbtPowerUser' to enable it.",
              image: "EnableMcpImage",
              enableButton: "Ok done!",
            },
            {
              title: "Try out the chat!",
              description: "Open chat and select agent mode. Try this prompt 'Get list of projects'. If you see message like 'Called MCP tool', then you are all set!",
              image: "TryChatImage",
              enableButton: "All set!",
            },
          ];
        }
      },
      timer: 500,
    },
  },
};
