import { Sync, each } from "factory.ts";
import { faker } from "@faker-js/faker";
import { RequestState, RequestTypes } from "@modules/dataPilot/types";
import {
  DatapilotSqlAnalysisChat,
  SqlAnalysisType,
  SqlExplainResult,
} from "@modules/dataPilot/components/sqlAnalysis/types";

export const DatapilotSqlAnalysisFactory =
  Sync.makeFactory<DatapilotSqlAnalysisChat>({
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

export const DatapilotSqlExplainFactory = DatapilotSqlAnalysisFactory.extend({
  analysisType: SqlAnalysisType.SQL_EXPLAIN,
});

export const DatapilotSqlExplainResultFactory =
  Sync.makeFactory<SqlExplainResult>({
    datapilot_title: "Query explanation",
    response: faker.lorem.paragraph(),
    user_prompt: "Explain the query",
    id: each(() => faker.string.uuid()),
    state: RequestState.COMPLETED,
  });
