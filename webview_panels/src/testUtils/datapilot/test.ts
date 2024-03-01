import { Sync, each } from "factory.ts";
import { faker } from "@faker-js/faker";
import { RequestState, RequestTypes } from "@modules/dataPilot/types";
import { DatapilotCustomTestChat } from "@modules/dataPilot/components/queryAnalysis/types";

export const DatapilotCustomChatFactory =
  Sync.makeFactory<DatapilotCustomTestChat>({
    id: each(() => faker.string.uuid()),
    query: "Add Custom Test",
    requestType: RequestTypes.ADD_CUSTOM_TEST,
    state: RequestState.LOADING,
    actions: [],
    meta: {},
    response: undefined,
    updatedAt: faker.date.past(),
  });