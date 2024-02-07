import { Sync, each } from "factory.ts";
import { faker } from "@faker-js/faker";
import { RequestState, RequestTypes } from "@modules/dataPilot/types";
import {
  DatapilotQueryAnalysisChat,
  QueryAnalysisType,
  QueryExplainResult,
} from "@modules/dataPilot/components/queryAnalysis/types";

export const DatapilotQueryAnalysisFactory =
  Sync.makeFactory<DatapilotQueryAnalysisChat>({
    id: each(() => faker.string.uuid()),
    query: faker.lorem.sentence(),
    requestType: RequestTypes.SQL_ANALYSIS,
    state: RequestState.LOADING,
    actions: [],
    meta: {},
    response: undefined,
    updatedAt: faker.date.past(),
    code: "select * from users;",
    fileName: faker.system.fileName(),
  });

export const DatapilotQueryExplainFactory =
  DatapilotQueryAnalysisFactory.extend({
    analysisType: QueryAnalysisType.EXPLAIN,
  });

export const DatapilotQueryExplainResultFactory =
  Sync.makeFactory<QueryExplainResult>({
    datapilot_title: "Query explanation",
    response: faker.lorem.paragraph(),
    user_prompt: "Explain the query",
    id: each(() => faker.string.uuid()),
    state: RequestState.COMPLETED,
  });
