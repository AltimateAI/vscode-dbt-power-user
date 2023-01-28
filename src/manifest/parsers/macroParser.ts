import { readFileSync } from "fs";
import { provide } from "inversify-binding-decorators";
import { createFullPathForNode } from ".";
import { DBTTerminal } from "../../dbt_client/dbtTerminal";
import { MacroMetaMap } from "../../domain";

@provide(MacroParser)
export class MacroParser {
  constructor(private terminal: DBTTerminal) {}

  createMacroMetaMap(
    projectName: string,
    macros: any[],
    rootPath: string
  ): Promise<MacroMetaMap> {
    return new Promise((resolve) => {
      const macroMetaMap: MacroMetaMap = new Map();
      if (macros === null || macros === undefined) {
        resolve(macroMetaMap);
      }
      Object.values(macros).forEach(
        ({ package_name, name, original_file_path }) => {
          const packageName = package_name;
          const macroName =
            packageName === projectName ? name : `${packageName}.${name}`;
          const fullPath = createFullPathForNode(
            projectName,
            rootPath,
            packageName,
            original_file_path
          );
          if (!fullPath) {
            return;
          }
          try {
            const macroFile: string = readFileSync(fullPath).toString("utf8");
            const macroFileLines = macroFile.split("\n");

            for (let index = 0; index < macroFileLines.length; index++) {
              const currentLine = macroFileLines[index];
              if (currentLine.match(new RegExp(`macro\\s${name}\\(`))) {
                macroMetaMap.set(macroName, {
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
      resolve(macroMetaMap);
    });
  }
}
