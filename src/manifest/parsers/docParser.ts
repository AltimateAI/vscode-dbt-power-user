import { readFileSync } from "fs";
import { provide } from "inversify-binding-decorators";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { DocMetaMap } from "../../domain";
import { DBTProject } from "../dbtProject";
import { createFullPathForNode } from ".";

@provide(DocParser)
export class DocParser {
  constructor(private terminal: DBTTerminal) {}

  createDocMetaMap(docs: any[], project: DBTProject): Promise<DocMetaMap> {
    return new Promise(async (resolve) => {
      const docMetaMap: DocMetaMap = new Map();
      if (docs === null || docs === undefined) {
        resolve(docMetaMap);
        return;
      }
      if (typeof docs[Symbol.iterator] !== "function") {
        resolve(docMetaMap);
        return;
      }
      for (const doc of docs) {
        const { package_name, name, original_file_path } = doc;
        const packageName = package_name;
        // TODO: these things can change so we should recreate them if project config changes
        const projectName = project.getProjectName();
        const packagePath = project.getPackageInstallPath();
        if (packagePath === undefined) {
          throw new Error(
            "packagePath is not defined in " + project.projectRoot.fsPath,
          );
        }
        const docName =
          packageName === projectName ? name : `${packageName}.${name}`;
        const fullPath = createFullPathForNode(
          projectName,
          project.projectRoot.fsPath,
          packageName,
          packagePath,
          original_file_path,
        );
        if (!fullPath) {
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
          console.log(
            `File not found at '${fullPath}', project may need to be recompiled.`,
            error,
          );
          this.terminal.log(
            `File not found at '${fullPath}', probably compiled is outdated. ${error}`,
          );
        }
      }
      resolve(docMetaMap);
    });
  }
}
