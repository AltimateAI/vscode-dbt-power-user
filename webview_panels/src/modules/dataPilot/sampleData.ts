import { DataPilotChat, RequestState, RequestTypes } from "./types";

export const DATA = {
  [crypto.randomUUID()]: {
    id: "e0c5127a-eb7c-475d-bdd5-48032295dd05",
    meta: {
      description: "Customer's first name. PII.",
      user_instructions: {},
      columnName: "first_name",
      columns: [],
    },
    query: "Generate Documentation for “first_name” using settings",
    requestType: 0,
    state: 0,
  },
  [crypto.randomUUID()]: {
    id: crypto.randomUUID(),
    query: "Generate Documentation for first_name using settings",
    requestType: RequestTypes.AI_DOC_GENERATION,
    response: "network timed out",
    state: RequestState.ERROR,
  },
  [crypto.randomUUID()]: {
    id: crypto.randomUUID(),
    query: "Generate Documentation for last_name using settings",
    requestType: RequestTypes.AI_DOC_GENERATION,
    state: RequestState.COMPLETED,
    // meta: { columnName: "first_name" },
    response:
      "A unique identifier for each customer, used for tracking and analyzing customer behavior and preferences. This identifier is crucial for customer segmentation, personalization, and tracking customer lifetime value. It allows businesses to understand individual customer journeys, analyze purchase patterns, and measure the effectiveness of marketing campaigns.",
    actions: [
      {
        title: "Regenerate",
        command: "rengene",
        data: { modelName: "customers" },
        user_prompt: "Regenerate documentation for {type} {name}",
        datapilot_title: "Improving documentation based on the user suggestion",
      },
      {
        title: "Make it shorter",
        data: { modelName: "customers" },
        user_prompt: "Make documentation shorter for {type} {name}",
        datapilot_title: "Improving documentation based on the user suggestion",
      },
    ],
  },
} as Record<string, DataPilotChat>;
