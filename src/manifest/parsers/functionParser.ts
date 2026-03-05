import { provide } from "inversify-binding-decorators";
import * as path from "path";
import { FunctionMetaMap } from "../../domain";
import { DBTProject } from "../dbtProject";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";

@provide(FunctionParser)
export class FunctionParser {
  constructor(private terminal: DBTTerminal) {}

  createFunctionMetaMap(
    functionsMap: any[],
    project: DBTProject,
  ): Promise<FunctionMetaMap> {
    return new Promise((resolve) => {
      this.terminal.debug(
        "FunctionParser",
        `Parsing functions for "${project.getProjectName()}" at ${
          project.projectRoot
        }`,
      );
      const functionMetaMap: FunctionMetaMap = new Map();
      if (functionsMap === null || functionsMap === undefined) {
        resolve(functionMetaMap);
        return;
      }
      Object.values(functionsMap)
        .filter((fn) => fn.resource_type === DBTProject.RESOURCE_TYPE_FUNCTION)
        .forEach((fn) => {
          const fullPath = fn.original_file_path
            ? path.join(project.projectRoot.fsPath, fn.original_file_path)
            : undefined;
          functionMetaMap.set(fn.name, { ...fn, path: fullPath });
        });
      this.terminal.debug(
        "FunctionParser",
        `Returning functions for "${project.getProjectName()}" at ${
          project.projectRoot
        }`,
        functionMetaMap,
      );
      resolve(functionMetaMap);
    });
  }
}
