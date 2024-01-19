import { DataPilotChat, RequestState, RequestTypes } from "./types";

export const DATA = {
  [crypto.randomUUID()]: {
    id: crypto.randomUUID(),
    query: "Generate Documentation for “customer_id” using settings",
    requestType: RequestTypes.AI_DOC_GENERATION,
    state: RequestState.LOADING,
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
    response:
      "A unique identifier for each customer, used for tracking and analyzing customer behavior and preferences. This identifier is crucial for customer segmentation, personalization, and tracking customer lifetime value. It allows businesses to understand individual customer journeys, analyze purchase patterns, and measure the effectiveness of marketing campaigns.",
    actions: [{ title: "Regenerate" }, { title: "Make it shorter" }],
  },
} as Record<string, DataPilotChat>;
