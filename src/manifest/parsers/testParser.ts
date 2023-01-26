import { provide } from "inversify-binding-decorators";
import * as path from "path";
import { TestMetaMap } from "../../domain";
import { DBTProject } from "../dbtProject";

@provide(TestParser)
export class TestParser {
  createTestMetaMap(testsMap: any[], rootPath: string): Promise<TestMetaMap> {
    return new Promise((resolve) => {
      const testMetaMap: TestMetaMap = new Map();
      if (testsMap === null || testsMap === undefined) {
        resolve(testMetaMap);
      }
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
          }) => {
            const fullPath = path.join(rootPath, original_file_path);
            testMetaMap.set(name, {
              path: fullPath,
              raw_sql,
              database,
              schema,
              alias,
              column_name,
            });
          }
        );
      resolve(testMetaMap);
    });
  }
}
