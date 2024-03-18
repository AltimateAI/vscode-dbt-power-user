import { provideSingleton } from "../utils";
import { MacroMetaMap } from "../domain";

@provideSingleton(DbtTestService)
export class DbtTestService {
  // Find the file path of test macro
  public getMacroFilePath = (
    macros: [string],
    projectName: string,
    macroMetaMap: MacroMetaMap,
    testName: string | undefined,
  ) => {
    if (!testName) {
      return;
    }

    // Find if current test depends on test macro in current project
    const macro = macros.find(
      (m) => m === `macro.${projectName}.test_${testName}`,
    );

    if (macro) {
      // return the file path if it ends with sql
      const macroData = macroMetaMap.get(`test_${testName}`);
      return macroData?.path.endsWith(".sql") ? macroData?.path : undefined;
    }
  };
}
