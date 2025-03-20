import { CopilotTryChatImage, EnableMcpImage, TryChatImage } from "./assets";

export const MCP_ONBOARDING_STEPS = [
  {
    title: "Setup MCP server",
    description:
      "In this step, MCP server will be started and a configuration file will be created",
    enableButton: "Let's do it!",
    ide: ["cursor"],
  },
  {
    title: "Advanced Data Tools",
    description:
      "Enhance your experience with advanced data exploration features. By enabling this option, you allow data lookup queries to be processed and shared with Cursor. Features include:\n• Query specific column values\n• Execute SQL\n• Previewing data structures",
    enableButton: "Enable Advanced Features",
    disableButton: "Disable Features",
    ide: ["cursor", "vscode"],
  },
  {
    title: "Enable MCP server",
    description:
      "Open Cursor Settings and select the MCP from sidebar. Click 'Disabled' button next to 'dbtPowerUser' to enable it.",
    image: EnableMcpImage,
    enableButton: "Ok done!",
    ide: ["cursor"],
  },
  {
    title: "Try out the chat!",
    description:
      "Open chat and select agent mode. Try this prompt 'Get list of projects'. If you see message like 'Called MCP tool', then you are all set!",
    image: TryChatImage,
    enableButton: "All set!",
    ide: ["cursor"],
  },
  {
    title: "Try out the chat!",
    description:
      "Open copilot and try this prompt 'Get list of projects'. If you see message like 'Running tool \"get_projects\"', then you are all set!",
    image: CopilotTryChatImage,
    enableButton: "All set!",
    ide: ["vscode"],
  },
];
