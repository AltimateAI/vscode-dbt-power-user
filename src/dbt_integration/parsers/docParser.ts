import { readFileSync } from "fs";
import { DBTTerminal } from "../terminal";
import { DocMetaMap } from "../domain";
import { DBTProjectIntegrationAdapter } from "../dbtProjectIntegrationAdapter";
import { createFullPathForNode } from "./utils";

export class DocParser {
  constructor(private terminal: DBTTerminal) {}

  createDocMetaMap(
    docs: any,
    project: DBTProjectIntegrationAdapter,
  ): Promise<DocMetaMap> {
    return new Promise(async (resolve) => {
      const projectRoot = project.getProjectRoot();
      const projectName = project.getProjectName();
      this.terminal.debug(
        "DocParser",
        `Parsing docs for "${projectName}" at ${projectRoot}`,
      );
      const docMetaMap: DocMetaMap = new Map();
      if (docs === null || docs === undefined) {
        resolve(docMetaMap);
        return;
      }
      for (const doc of Object.values(docs)) {
        const { package_name, name, original_file_path } = doc as any;
        const packageName = package_name;
        const packagePath = project.getPackageInstallPath();
        if (packagePath === undefined) {
          throw new Error("packagePath is not defined in " + projectRoot);
        }
        const docName =
          packageName === projectName ? name : `${packageName}.${name}`;
        const fullPath = createFullPathForNode(
          projectName,
          projectRoot,
          packageName,
          packagePath,
          original_file_path,
        );
        if (!fullPath) {
          resolve(docMetaMap);
          return;
        }
        try {
          const docFile: string = readFileSync(fullPath).toString("utf8");
          const macroFileLines = docFile.split("\n");
          for (let index = 0; index < macroFileLines.length; index++) {
            const currentLine = macroFileLines[index];
            if (currentLine.match(new RegExp(`docs\\s${name}`))) {
              docMetaMap.set(docName, {
                path: fullPath,
                line: index,
                character: currentLine.indexOf(name),
              });
              break;
            }
          }
        } catch (error) {
          this.terminal.debug(
            "DocParser",
            `File not found at '${fullPath}', probably compiled is outdated, error is ignored`,
            error,
          );
        }
      }
      this.terminal.debug(
        "DocParser",
        `Returning docs for "${projectName}" at ${projectRoot}`,
        docMetaMap,
      );
      resolve(docMetaMap);
    });
  }
}
