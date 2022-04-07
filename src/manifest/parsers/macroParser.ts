import { readFileSync } from "fs";
import { provide } from "inversify-binding-decorators";
import * as path from "path";
import { MacroMetaMap } from "../../domain";

@provide(MacroParser)
export class MacroParser {

  createMacroMetaMap(
    projectName: string,
    macros: any[]
  ): Promise<MacroMetaMap> {
    return new Promise((resolve) => {
      const macroMetaMap: MacroMetaMap = new Map();
      if (macros === null || macros === undefined) {
        console.log("No macros found in manifest!");
        resolve(macroMetaMap);
      }
      Object.values(macros).forEach(
        ({ package_name, name, root_path, original_file_path }) => {
          const packageName = package_name;
          const macroName =
            packageName === projectName ? name : `${packageName}.${name}`;
          const fullPath = path.join(root_path, original_file_path);
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
              `File not found at '${fullPath}', probably compiled is outdated!`,
              error
            );
          }
        }
      );
      resolve(macroMetaMap);
    });
  }
}
