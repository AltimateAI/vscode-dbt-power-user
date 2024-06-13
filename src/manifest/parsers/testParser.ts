import { provide } from "inversify-binding-decorators";
import * as path from "path";
import { TestMetaMap } from "../../domain";
import { DBTProject } from "../dbtProject";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";

@provide(TestParser)
export class TestParser {
  constructor(private terminal: DBTTerminal) {}

  createTestMetaMap(
    testsMap: any[],
    project: DBTProject,
  ): Promise<TestMetaMap> {
    return new Promise((resolve) => {
      this.terminal.debug(
        "TestParser",
        `Parsing tests for "${project.getProjectName()}" at ${
          project.projectRoot
        }`,
      );
      const testMetaMap: TestMetaMap = new Map();
      if (testsMap === null || testsMap === undefined) {
        resolve(testMetaMap);
      }
      const rootPath = project.projectRoot.fsPath;
      Object.values(testsMap)
        .filter((test) => test.resource_type === DBTProject.RESOURCE_TYPE_TEST)
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
            const fullPath = path.join(rootPath, original_file_path);
            testMetaMap.set(name, {
              path: fullPath,
              raw_sql,
              database,
              schema,
              alias,
              // for quoted column names, remove the quotes
              // ex: in manifest, it will be stored as "column_name": "\"Customer ID\"" for tests
              // here we remove the extra quotes
              column_name: column_name?.replace(/^"(.*)"$/, "$1"),
              test_metadata,
              attached_node,
              depends_on,
              uniqueId: unique_id,
            });
          },
        );
      this.terminal.debug(
        "TestParser",
        `Returning tests for "${project.getProjectName()}" at ${
          project.projectRoot
        }`,
        testMetaMap,
      );
      resolve(testMetaMap);
    });
  }
}
