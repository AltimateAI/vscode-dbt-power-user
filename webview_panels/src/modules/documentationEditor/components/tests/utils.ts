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
    if (test.path?.endsWith(".sql")) {
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

export function generateHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i); // Get character code
    hash = (hash << 5) - hash + char; // Shift and add
    hash |= 0; // Convert to 32-bit integer
  }
  return hash.toString(16);
}
