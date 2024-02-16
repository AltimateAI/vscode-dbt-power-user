import { Sync, each } from "factory.ts";
import { faker } from "@faker-js/faker";
import {
  DBTDocumentation,
  DBTDocumentationColumn,
  Source,
  DBTModelTest,
} from "@modules/documentationEditor/state/types";

const getRandomNumber = (maximum = 10, minimum = 5) =>
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

export const DBTDocumentationColumnFactory =
  Sync.makeFactory<DBTDocumentationColumn>({
    generated: faker.datatype.boolean(),
    name: each(() => faker.database.column()),
    source: faker.helpers.enumValue(Source),
    description: each((i) =>
      i % 4 === 0 ? undefined : faker.lorem.paragraph(),
    ),
    type: each(() => faker.database.type()),
  });

export const DBTDocumentationFactory = Sync.makeFactory<DBTDocumentation>({
  aiEnabled: true,
  columns: DBTDocumentationColumnFactory.buildList(8),
  description: each(() => faker.lorem.paragraph()),
  generated: faker.datatype.boolean(),
  name: each(() => faker.database.column()),
  patchPath: undefined,
});

export const DBTDocumentationTestsFactory = Sync.makeFactory<DBTModelTest>({
  alias: each(() => faker.string.alpha(getRandomNumber())),
  column_name: each((i) => (i % 3 === 0 ? undefined : faker.database.column())),
  database: faker.hacker.noun(),
  key: each(() => faker.string.alpha(getRandomNumber())),
  path: each(() => faker.system.filePath()),
  schema: each(() => faker.string.alpha(getRandomNumber())),
});
