import {
  DbtGenericTests,
  DBTModelTest,
  DbtTestTypes,
} from "@modules/documentationEditor/state/types";

/**
 * dbt tests types handled so far
 * - generic tests - not_null, unique, relationships, accepted_values
 * - tests as macro defined in macro directory
 * - sql query in tests directory
 * - macros defined in external packages like dbt_expectations
 */
export const findDbtTestType = (test: DBTModelTest): DbtTestTypes => {
  if (!test.test_metadata?.name) {
    if (test.path.endsWith(".sql")) {
      return DbtTestTypes.SINGULAR;
    }
    return DbtTestTypes.UNKNOWN;
  }

  if (
    Object.values(DbtGenericTests).includes(
      test.test_metadata.name as DbtGenericTests,
    )
  ) {
    return DbtTestTypes.GENERIC;
  }

  if (test.test_metadata.namespace) {
    return DbtTestTypes.EXTERNAL_PACKAGE;
  }

  return DbtTestTypes.MACRO;
};
