import * as fs from "fs";
import * as path from "path";

export interface FormatterFixture {
  /** File stem used as test label */
  name: string;
  /** Original SQL content (before formatting) */
  input: string;
}

/**
 * Discovers and loads all formatter fixture files.
 * Each .sql file in the fixtures/formatter directory is a test case.
 *
 * @param extensionRoot Absolute path to the extension project root
 */
export function loadFormatterFixtures(
  extensionRoot: string,
): FormatterFixture[] {
  const fixtureDir = path.join(
    extensionRoot,
    "src",
    "test",
    "fixtures",
    "formatter",
  );

  return fs
    .readdirSync(fixtureDir)
    .filter((f) => f.endsWith(".sql"))
    .sort()
    .map((f) => ({
      name: f.replace(/\.sql$/, ""),
      input: fs.readFileSync(path.join(fixtureDir, f), "utf-8"),
    }));
}
