import { existsSync, readFileSync } from "fs";
import path = require("path");
import { Uri } from "vscode";
import { RunResultMetaMap } from "../../domain";
import { DBTProject } from "../dbtProject";

export class RunResultsParser {
  static createRunResultMetaMap(projectRoot: Uri, targetPath: string): Promise<RunResultMetaMap> {
    return new Promise((resolve) => {
      const runResultMetaMap: RunResultMetaMap = new Map();
      const runResultPath = path.join(
        projectRoot.fsPath,
        targetPath,
        DBTProject.RUN_RESULTS_FILE
      );
      if (!existsSync(runResultPath)) {
        resolve(runResultMetaMap);
      }
      const runResultFile = JSON.parse(readFileSync(runResultPath, "utf8"));
      const { results, generated_at } = runResultFile;
      results.forEach((result: any) => {
        const {
          node: { root_path, build_path, original_file_path, compiled },
          error,
          status,
        } = result;
        const fullPath = path.join(root_path, original_file_path);
        const compiledPath =
          build_path !== null ? path.join(root_path, build_path) : undefined;
        runResultMetaMap.set(fullPath, {
          compiledPath,
          error,
          timestamp: generated_at,
          status,
        });
      });
      resolve(runResultMetaMap);
    });
  }
}
