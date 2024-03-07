import { Sync, each } from "factory.ts";
import { faker } from "@faker-js/faker";
import {
  DataPilotChat,
  DataPilotChatAction,
  RequestState,
  RequestTypes,
} from "@modules/dataPilot/types";

export const DatapilotDocGenFactory = Sync.makeFactory<DataPilotChat>({
  id: each(() => faker.string.uuid()),
  query: faker.lorem.sentence(),
  requestType: RequestTypes.AI_DOC_GENERATION,
  state: RequestState.COMPLETED,
  actions: [],
  meta: {},
  response: faker.lorem.paragraph(),
  updatedAt: faker.date.past(),
});

export const DatapilotDocGenWithErrorFactory = Sync.makeFactory<DataPilotChat>({
  id: each(() => faker.string.uuid()),
  query: faker.lorem.sentence(),
  requestType: RequestTypes.AI_DOC_GENERATION,
  state: RequestState.ERROR,
  actions: [],
  meta: {},
  response: faker.lorem.lines(),
  updatedAt: faker.date.past(),
});

export const DatapilotDocGenWithLoadingFactory =
  Sync.makeFactory<DataPilotChat>({
    id: each(() => faker.string.uuid()),
    query: faker.lorem.sentence(),
    requestType: RequestTypes.AI_DOC_GENERATION,
    state: RequestState.LOADING,
    actions: [],
    meta: {},
    response: undefined,
    updatedAt: faker.date.past(),
  });

export const DatapilotDocGenActionButtonFactory =
  Sync.makeFactory<DataPilotChatAction>({
    title: "Regenerate",
    command: "regenerate",
    data: { modelName: "customers" },
    user_prompt: "Regenerate documentation for {type} {name}",
    datapilot_title: "Improving documentation based on the user suggestion",
  });
