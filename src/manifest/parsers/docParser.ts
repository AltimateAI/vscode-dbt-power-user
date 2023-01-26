import { readFileSync } from "fs";
import { provide } from "inversify-binding-decorators";
import * as path from "path";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { DocMetaMap } from "../../domain";

@provide(DocParser)
export class DocParser {
  constructor(private terminal: DBTTerminal) {}

  createDocMetaMap(
    docs: any[],
    projectName: string,
    rootPath: string
  ): Promise<DocMetaMap> {
    return new Promise((resolve) => {
      const docMetaMap: DocMetaMap = new Map();
      if (docs === null || docs === undefined) {
        resolve(docMetaMap);
      }
      Object.values(docs).forEach(
        ({ package_name, name, original_file_path }) => {
          const packageName = package_name;
          const docName =
            packageName === projectName ? name : `${packageName}.${name}`;
          const fullPath = path.join(rootPath, original_file_path);
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
              error
            );
            this.terminal.log(
              `File not found at '${fullPath}', probably compiled is outdated. ${error}`
            );
          }
        }
      );
      resolve(docMetaMap);
    });
  }
}
