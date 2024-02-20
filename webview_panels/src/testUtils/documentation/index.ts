import { Sync, each } from "factory.ts";
import { faker } from "@faker-js/faker";
import {
  DBTDocumentation,
  DBTDocumentationColumn,
  Source,
  DBTModelTest,
  DbtGenericTests,
  TestMetadataAcceptedValuesKwArgs,
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

const getName = (i: number) => {
  if (i % 5 === 0) return DbtGenericTests.RELATIONSHIPS;
  if (i % 7 === 0) return DbtGenericTests.ACCEPTED_VALUES;
  if (i % 2 === 0) return DbtGenericTests.UNIQUE;
  return DbtGenericTests.NOT_NULL;
};
const getRandomDbtTestMetadata = (
  i: number,
  columnName?: string,
): undefined | DBTModelTest["test_metadata"] => {
  // singular tests in tests directory
  if (i % 3 === 0) return undefined;

  // test from macro
  if (i % 4 === 0)
    return {
      kwargs: {
        column_name: columnName ?? "",
        model: faker.hacker.noun(),
      },
      name: faker.hacker.noun(),
    };

  // generic tests
  const name = getName(i);
  const extraData =
    name === DbtGenericTests.ACCEPTED_VALUES
      ? { values: faker.lorem.words().split(" ") }
      : name === DbtGenericTests.RELATIONSHIPS
      ? {
          field: faker.database.column(),
          to: `ref('dim_hosts_cleansed')`,
        }
      : {};
  return {
    kwargs: {
      column_name: columnName ?? "",
      model: faker.hacker.noun(),
      ...extraData,
    },
    name,
  };
};

const DBTDocumentationTestsBaseFactory = Sync.makeFactory<DBTModelTest>(() => {
  const columnName = faker.database.column();
  return {
    alias: each(() => faker.string.alpha(getRandomNumber())),
    column_name: each((i) => (i % 3 === 0 ? undefined : columnName)),
    database: faker.hacker.noun(),
    schema: each(() => faker.string.alpha(getRandomNumber())),
    test_metadata: each((i) =>
      getRandomDbtTestMetadata(i, i % 3 === 0 ? undefined : columnName),
    ),
    key: each(() => faker.string.alpha(getRandomNumber())),
    path: each(() => faker.string.alpha(getRandomNumber())),
  };
});

const DBTDocumentationTestsWithKeyFactory =
  DBTDocumentationTestsBaseFactory.withDerivation("key", (testData) => {
    const meta = testData.test_metadata;
    // singular tests
    if (!meta) {
      return faker.lorem.slug();
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { model, column_name } = meta.kwargs;
    // generic tests
    // @ts-expect-error valid type
    if (Object.values(DbtGenericTests).includes(meta.name)) {
      if ((meta.name as DbtGenericTests) === DbtGenericTests.ACCEPTED_VALUES) {
        return `${meta.name}_${model}_${column_name}_${(
          meta.kwargs as TestMetadataAcceptedValuesKwArgs
        ).values?.join("_")}`;
      }
      return `${meta.name}_${model}_${column_name}`;
    }

    // macro test
    return `${meta.name}_${model}_${column_name}`;
  });

export const DBTDocumentationTestsFactory =
  DBTDocumentationTestsWithKeyFactory.withDerivation(
    "path",
    (testData) => testData.key,
  );
