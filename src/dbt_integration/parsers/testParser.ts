import * as path from "path";
import { TestMetaMap } from "../domain";
import { DBTTerminal } from "../terminal";
import { RESOURCE_TYPE_TEST } from "../dbtIntegration";
import { DBTProjectIntegrationAdapter } from "../dbtIntegrationAdapter";

export class TestParser {
  constructor(private terminal: DBTTerminal) {}

  private getColumnNameWithoutQuotes(columnName: string): string | undefined {
    if (!columnName) {
      return undefined;
    }

    if (columnName.startsWith('"') && columnName.endsWith('"')) {
      return columnName.slice(1, -1);
    }

    return columnName;
  }
  createTestMetaMap(
    testsMap: any[],
    project: DBTProjectIntegrationAdapter,
  ): Promise<TestMetaMap> {
    return new Promise((resolve) => {
      const projectRoot = project.getProjectRoot();
      const projectName = project.getProjectName();
      this.terminal.debug(
        "TestParser",
        `Parsing tests for "${projectName}" at ${projectRoot}`,
      );
      const testMetaMap: TestMetaMap = new Map();
      if (testsMap === null || testsMap === undefined) {
        resolve(testMetaMap);
      }
      Object.values(testsMap)
        .filter((test) => test.resource_type === RESOURCE_TYPE_TEST)
        .forEach(
          ({
            name,
            raw_sql,
            original_file_path,
            database,
            schema,
            alias,
            column_name,
            test_metadata,
            attached_node,
            depends_on,
            unique_id,
          }) => {
            const fullPath = path.join(projectRoot, original_file_path);
            testMetaMap.set(name, {
              path: fullPath,
              raw_sql,
              database,
              schema,
              alias,
              // for quoted column names, remove the quotes
              // ex: in manifest, it will be stored as "column_name": "\"Customer ID\"" for tests
              // here we remove the enclosing quotes
              column_name: this.getColumnNameWithoutQuotes(column_name),
              test_metadata,
              attached_node,
              depends_on,
              uniqueId: unique_id,
            });
          },
        );
      this.terminal.debug(
        "TestParser",
        `Returning tests for "${projectName}" at ${projectRoot}`,
        testMetaMap,
      );
      resolve(testMetaMap);
    });
  }
}
