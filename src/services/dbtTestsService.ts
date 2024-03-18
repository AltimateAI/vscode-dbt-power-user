import { AltimateRequest } from "../altimate";
import { provideSingleton } from "../utils";
import { DocGenService } from "./docGenService";
import { StreamingService } from "./streamingService";
import { QueryManifestService } from "./queryManifestService";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { MacroMetaMap } from "../domain";

@provideSingleton(DbtTestService)
export class DbtTestService {
  public getMacroFilePath = (
    macros: [string],
    projectName: string,
    macroMetaMap: MacroMetaMap,
    testName: string | undefined,
  ) => {
    if (!testName) {
      return;
    }
    const macro = macros.find(
      (m) => m === `macro.${projectName}.test_${testName}`,
    );
    if (macro) {
      const macroData = macroMetaMap.get(`test_${testName}`);
      return macroData?.path.endsWith(".sql") ? macroData?.path : undefined;
    }
  };
}
