import { CopilotTryChatImage, EnableMcpImage, TryChatImage } from "./assets";

export const MCP_ONBOARDING_STEPS = [
  {
    title: "Supercharge Your Productivity with dbt Power User datapilot support",
    description: "Want to become a 10x analytics engineer? Meet dbt Power User datapilot, your AI-powered assistant designed to accelerate your workflow. With dbt Power User datapilot, you can:\n\n✅ Write SQL & YAML faster – Get AI-powered suggestions, auto-generate models, and reduce manual work.\n✅ Debug with ease – Identify and fix errors quickly with smart troubleshooting.\n✅ Automate documentation – Generate clear, structured descriptions effortlessly.\n✅ Stay in flow – Reduce context switching and focus on insights, not boilerplate code.\n✅ Works with dbt Core & dbt Cloud – Seamlessly integrates with both dbt Core and dbt Cloud to enhance your development workflow.\n\nBoost your efficiency, minimize errors, and ship data models faster than ever. Try dbt Power User datapilot today! 🚀",
    enableButton: "Let's do it!",
    ide: ["vscode"],
  },
  {
    title: "Supercharge Your Productivity with dbt Power User Cursor support",
    description: "Want to become a 10x analytics engineer? Meet dbt Power User Cursor, your AI-powered assistant designed to accelerate your workflow. With dbt Power User Cursor, you can:\n\n✅ Write SQL & YAML faster – Get AI-powered suggestions, auto-generate models, and reduce manual work.\n✅ Debug with ease – Identify and fix errors quickly with smart troubleshooting.\n✅ Automate documentation – Generate clear, structured descriptions effortlessly.\n✅ Stay in flow – Reduce context switching and focus on insights, not boilerplate code.\n✅ Works with dbt Core & dbt Cloud – Seamlessly integrates with both dbt Core and dbt Cloud to enhance your development workflow.\n\nBoost your efficiency, minimize errors, and ship data models faster than ever. Try dbt Power User Cursor today! 🚀",
    enableButton: "Let's do it!",
    ide: ["cursor"],
  },
  {
    title: "Setup MCP server",
    description:
      "In this step, MCP server will be started and a configuration file will be created",
    enableButton: "Set it up!",
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
      "Open copilot chat and try this prompt '@datapilot Get list of projects'. If you see message like 'Running tool \"get_projects\"', then you are all set!",
    image: CopilotTryChatImage,
    enableButton: "All set!",
    ide: ["vscode"],
  },
];
