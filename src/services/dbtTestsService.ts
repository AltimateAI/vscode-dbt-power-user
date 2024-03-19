import { provideSingleton } from "../utils";
import { MacroMetaMap, TestMetaData } from "../domain";
import { DBTTerminal } from "../dbt_client/dbtTerminal";
import { QueryManifestService } from "./queryManifestService";
import path = require("path");
import { readFileSync } from "fs";
import { parse, stringify } from "yaml";

@provideSingleton(DbtTestService)
export class DbtTestService {
  constructor(
    private dbtTerminal: DBTTerminal,
    private queryManifestService: QueryManifestService,
  ) {}

  private stringifyTest = (
    tests: Record<string, Record<string, unknown>>[],
    test: TestMetaData,
  ) => {
    if (!tests?.length) {
      return;
    }

    // Ignore these generic fields, as we handle these fields differently in UI
    const ignoredFields = ["model", "column_name", "field", "to", "values"];

    if (!test.test_metadata) {
      return;
    }
    const { name, namespace } = test.test_metadata;
    const fullName = namespace ? `${namespace}.${name}` : name;

    const selectedTest = tests.find(
      (t: Record<string, Record<string, unknown>>) => {
        return Boolean(t[fullName]);
      },
    );

    if (!selectedTest) {
      this.dbtTerminal.debug("getDbtTestCode", "no test available in yml");
      return;
    }

    this.dbtTerminal.debug(
      "getDbtTestCode",
      "sending selected test from yml",
      selectedTest,
    );

    const filteredConfig = Object.entries(selectedTest[fullName]).reduce(
      (acc: Record<string, unknown>, [key, value]) => {
        if (ignoredFields.includes(key)) {
          return acc;
        }

        acc[key] = value;
        return acc;
      },
      {},
    );
    // If test is from external package, show the package namespace as well
    const refinedTestConfig = namespace
      ? {
          [fullName]: filteredConfig,
        }
      : filteredConfig;
    return stringify(refinedTestConfig);
  };

  public getConfigByTest(
    test: TestMetaData,
    modelName: string,
    column_name?: string,
  ) {
    const eventResult = this.queryManifestService.getEventByCurrentProject();
    if (!eventResult) {
      return;
    }
    const {
      event: { nodeMetaMap },
    } = eventResult;
    const node = nodeMetaMap.get(modelName);
    if (!node) {
      return;
    }
    const project = this.queryManifestService.getProject();
    if (!project) {
      return;
    }

    const patchPath = node?.patch_path.includes("://")
      ? path.join(project.projectRoot.fsPath, node.patch_path.split("://")[1])
      : node.patch_path;

    this.dbtTerminal.debug(
      "getDbtTestCode",
      "finding test from yaml",
      patchPath,
    );
    const parsedDocFile = parse(
      readFileSync(patchPath, { encoding: "utf-8" }),
      {
        strict: false,
        uniqueKeys: false,
        maxAliasCount: -1,
      },
    );

    if (!parsedDocFile) {
      this.dbtTerminal.debug(
        "getDbtTestCode",
        "yml file does not have any content",
        patchPath,
      );
      return null;
    }

    const model = parsedDocFile.models?.find((m: any) => m.name === modelName);

    // model test
    if (!column_name) {
      this.dbtTerminal.debug(
        "getDbtTestCode",
        "finding model test from yml",
        parsedDocFile,
        model,
      );
      return this.stringifyTest(model?.tests, test);
    }

    const column =
      model.columns &&
      model.columns.find((yamlColumn: any) => yamlColumn.name === column_name);
    this.dbtTerminal.debug(
      "getDbtTestCode",
      "finding column test from yml",
      parsedDocFile,
      model,
      column,
    );

    return this.stringifyTest(column?.tests, test);
  }

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
