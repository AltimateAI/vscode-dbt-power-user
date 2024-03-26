import { Sync, each } from "factory.ts";
import { faker } from "@faker-js/faker";
import {
  DataPilotChat,
  RequestState,
  RequestTypes,
} from "@modules/dataPilot/types";

export const DatapilotCustomChatFactory = Sync.makeFactory<DataPilotChat>({
  id: each(() => faker.string.uuid()),
  query: "Add Custom Test",
  requestType: RequestTypes.ADD_CUSTOM_TEST,
  state: RequestState.LOADING,
  actions: [],
  meta: {},
  response: undefined,
  updatedAt: faker.date.past(),
});
