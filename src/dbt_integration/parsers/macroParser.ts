import { readFileSync } from "fs";

import { DBTProjectIntegrationAdapter } from "../dbtIntegrationAdapter";
import { MacroMetaMap } from "../domain";
import { DBTTerminal } from "../terminal";

import { createFullPathForNode } from "./utils";

export class MacroParser {
  constructor(private terminal: DBTTerminal) {}

  createMacroMetaMap(
    macros: any[],
    project: DBTProjectIntegrationAdapter,
  ): Promise<MacroMetaMap> {
    return new Promise(async (resolve) => {
      const projectRoot = project.getProjectRoot();
      const projectName = project.getProjectName();
      this.terminal.debug(
        "MacroParser",
        `Parsing macros for "${projectName}" at ${projectRoot}`,
      );
      const macroMetaMap: MacroMetaMap = new Map();
      if (macros === null || macros === undefined) {
        resolve(macroMetaMap);
      }
      const packagePath = project.getPackageInstallPath();
      if (packagePath === undefined) {
        throw new Error("packagePath is not defined in " + projectRoot);
      }
      for (const key in macros) {
        const macro = macros[key];
        const { package_name, name, original_file_path, depends_on } = macro;
        const packageName = package_name;
        const macroName =
          packageName === projectName ? name : `${packageName}.${name}`;
        const fullPath = createFullPathForNode(
          projectName,
          projectRoot,
          packageName,
          packagePath,
          original_file_path,
        );
        if (!fullPath) {
          continue;
        }
        try {
          const macroFile: string = readFileSync(fullPath).toString("utf8");
          const macroFileLines = macroFile.split("\n");

          for (let index = 0; index < macroFileLines.length; index++) {
            const currentLine = macroFileLines[index];
            if (
              currentLine.match(new RegExp(`macro\\s${name}\\(`)) ||
              currentLine.match(
                new RegExp(`test\\s${name.replace("test_", "")}\\(`),
              )
            ) {
              macroMetaMap.set(macroName, {
                path: fullPath,
                line: index,
                character: currentLine.indexOf(name),
                uniqueId: key,
                description: macro.description,
                arguments: macro.arguments,
                name,
                depends_on,
              });
              break;
            }
          }
        } catch (error) {
          this.terminal.debug(
            "MacroParser",
            `File not found at '${fullPath}', probably compiled is outdated.`,
            error,
          );
        }
      }
      this.terminal.debug(
        "MacroParser",
        `Returning macros for "${projectName}" at ${projectRoot}`,
        macroMetaMap,
      );
      resolve(macroMetaMap);
    });
  }
}
