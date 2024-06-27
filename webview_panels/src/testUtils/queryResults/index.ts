import { faker } from "@faker-js/faker";
import { QueryBookmark, QueryHistory } from "@modules/queryPanel/context/types";
import { Sync } from "factory.ts";

function generateRandomSQLQuery(): string {
  // Generate between 1 to 5 column names
  const columnsCount = faker.datatype.number({ min: 1, max: 5 });
  const columns = Array.from({ length: columnsCount }, () =>
    faker.database.column(),
  ).join(", ");

  // Generate a table name
  const tableName = faker.lorem.word();

  // Optionally, generate a LIMIT value (for simplicity, let's keep queries simple)
  const limit = faker.number.int({ min: 1, max: 100 });

  // Assemble the SQL query
  const query = `SELECT ${columns} FROM ${tableName} LIMIT ${limit};`;

  return query;
}

export const QueryHistoryFactory = Sync.makeFactory<QueryHistory>({
  rawSql: Sync.each(() => generateRandomSQLQuery()),
  compiledSql: Sync.each(() => generateRandomSQLQuery()),
  adapter: faker.lorem.word(),
  duration: faker.datatype.number({ min: 1, max: 10000 }),
  projectName: faker.lorem.word(),
  timestamp: Sync.each(() => faker.date.past().getTime()),
});

export const QueryBookmarkFactory = Sync.makeFactory<QueryBookmark>({
  raw_sql: Sync.each(() => generateRandomSQLQuery()),
  compiled_sql: Sync.each(() => generateRandomSQLQuery()),
  created_on: Sync.each(() => faker.date.past().toISOString()),
  adapter_type: faker.lorem.word(),
  id: faker.datatype.number(),
  name: faker.lorem.words(),
  updated_on: Sync.each(() => faker.date.recent().toISOString()),
  tags: Sync.each(() => [
    { id: faker.datatype.number(), tag: faker.lorem.word() },
  ]),
  privacy: Sync.each(() => faker.helpers.arrayElement(["public", "private"])),
});
