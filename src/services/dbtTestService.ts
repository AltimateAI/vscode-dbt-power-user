import { env, ProgressLocation, WebviewView, window } from "vscode";
import {
  AltimateRequest,
  CreateDbtTestRequest,
  UserInputError,
} from "../altimate";
import {
  extendErrorWithSupportLinks,
  getColumnNameByCase,
  getColumnTestConfigFromYml,
  isColumnNameEqual,
  provideSingleton,
  removeProtocol,
} from "../utils";
import { DocGenService } from "./docGenService";
import { StreamingService } from "./streamingService";
import { QueryManifestService } from "./queryManifestService";
import path = require("path");
import { DBTTerminal } from "../dbt_integration/terminal";
import {
  MacroMetaMap,
  TestMetaData,
  TestMetadataAcceptedValues,
  TestMetadataRelationships,
} from "../dbt_integration/domain";
import { parse, stringify } from "yaml";
import { readFileSync } from "fs";
import { DBTProject } from "../manifest/dbtProject";
import { getTestSuggestions } from "@lib";
import { ExecuteSQLResult } from "../dbt_integration/dbtIntegration";
import { TelemetryService } from "../telemetry";
import { TelemetryEvents } from "../telemetry/events";
import { inject } from "inversify";
import { AltimateAuthService } from "./altimateAuthService";

@provideSingleton(DbtTestService)
export class DbtTestService {
  public constructor(
    private docGenService: DocGenService,
    private streamingService: StreamingService,
    private altimateRequest: AltimateRequest,
    private queryManifestService: QueryManifestService,
    @inject("DBTTerminal")
    private dbtTerminal: DBTTerminal,
    private telemetryService: TelemetryService,
    private altimateAuthService: AltimateAuthService,
  ) {}

  // Remove duplicate tests from tests array
  public removeDuplicateTests(
    tests: (
      | string
      | TestMetadataAcceptedValues
      | TestMetadataRelationships
      | {
          [x: string]: any;
        }
      | null
    )[],
  ) {
    const seen = new Set();
    return tests.filter((item) => {
      const stringified = JSON.stringify(item);
      if (seen.has(stringified)) {
        return false;
      }
      seen.add(stringified);
      return true;
    });
  }

  private returnTestMetadataFromKwargs(test: TestMetaData) {
    // If this is new test added in doc editor webview panel and not saved yet, return the config from kwargs
    if (test.test_metadata?.kwargs) {
      const { model, ...rest } = test.test_metadata.kwargs;
      if (Object.keys(rest).length > 0) {
        return stringify(rest);
      }
    }
  }

  private filterAndStringifyTest = (
    testsPerColumnOrModelFromYml: Record<string, Record<string, unknown>>[],
    test: TestMetaData,
  ) => {
    if (!testsPerColumnOrModelFromYml?.length) {
      return this.returnTestMetadataFromKwargs(test);
    }

    // Ignore these generic fields, as we handle these fields differently in UI
    const ignoredFields = ["model", "column_name", "field", "to", "values"];

    if (!test.test_metadata) {
      return;
    }
    const { name, namespace } = test.test_metadata;
    const fullName = namespace ? `${namespace}.${name}` : name;

    const existingConfig = getColumnTestConfigFromYml(
      testsPerColumnOrModelFromYml,
      test.test_metadata.kwargs,
      fullName,
    );

    if (!existingConfig) {
      this.dbtTerminal.debug("getDbtTestCode", "no test available in yml");
      return this.returnTestMetadataFromKwargs(test);
    }

    this.dbtTerminal.debug(
      "getDbtTestCode",
      "sending selected config from yml",
      existingConfig,
    );

    // Remove fields which are already handled in UI
    const filteredConfig = Object.entries(existingConfig).reduce(
      (acc: Record<string, unknown>, [key, value]) => {
        if (ignoredFields.includes(key)) {
          return acc;
        }

        acc[key] = value;
        return acc;
      },
      {},
    );
    // If test is from external package ex: dbt_utils, show the package namespace as well
    const refinedTestConfig = namespace
      ? {
          [fullName]: filteredConfig,
        }
      : filteredConfig;
    return stringify(refinedTestConfig);
  };

  /**
   * Find the extra config for test from schema.yml, if available
   */
  public getConfigByTest(
    test: TestMetaData,
    modelName: string,
    columnNameFromTestMetadata?: string,
  ) {
    const eventResult = this.queryManifestService.getEventByCurrentProject();
    if (!eventResult?.event) {
      return;
    }
    const {
      event: { nodeMetaMap },
    } = eventResult;
    const node = nodeMetaMap.lookupByBaseName(modelName);
    if (!node) {
      return;
    }
    const project = this.queryManifestService.getProject();
    if (!project) {
      return;
    }

    const patchPath = node?.patch_path?.includes("://")
      ? path.join(project.projectRoot.fsPath, removeProtocol(node.patch_path))
      : node.patch_path;

    if (!patchPath) {
      this.dbtTerminal.debug(
        "getDbtTestCode",
        "unable to find patch path",
        patchPath,
      );
      return null;
    }
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
    if (!columnNameFromTestMetadata) {
      this.dbtTerminal.debug(
        "getDbtTestCode",
        "finding model test from yml",
        parsedDocFile,
        model,
      );
      return this.filterAndStringifyTest(model?.tests, test);
    }

    const column =
      model.columns &&
      model.columns.find((yamlColumn: any) =>
        isColumnNameEqual(yamlColumn.name, columnNameFromTestMetadata),
      );
    this.dbtTerminal.debug(
      "getDbtTestCode",
      "finding column test from yml",
      parsedDocFile,
      model,
      column,
    );

    return this.filterAndStringifyTest(column?.tests, test);
  }

  // Find the file path of test macro
  private getMacroFilePath = (
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
      return macroData?.path?.endsWith(".sql") ? macroData?.path : undefined;
    }
  };

  public async createTest(
    params: Partial<CreateDbtTestRequest> & {
      column?: string;
      filePath?: string;
    },
    syncRequestId?: string,
  ) {
    if (!this.altimateAuthService.handlePreviewFeatures()) {
      return;
    }

    const { session_id } = params;
    if (!session_id) {
      throw new UserInputError("Invalid session id");
    }

    if (!params.filePath) {
      throw new UserInputError("Invalid file path");
    }

    const dbtProject = this.queryManifestService.getProject();

    if (!dbtProject) {
      throw new Error("Invalid dbt project");
    }

    const adapter = dbtProject.getAdapterType();
    const { documentation } = await this.docGenService.getDocumentation(
      params.filePath,
    );
    if (!documentation) {
      throw new Error("Unable to find documentation for the model");
    }

    const queryText = window.activeTextEditor?.document.getText();

    return this.streamingService.fetchAsStream<CreateDbtTestRequest>({
      endpoint: "dbt/v2/dbt-test",
      syncRequestId,
      request: {
        ...params,
        session_id: session_id as string,
        column_name: params.column as string | undefined,
        model: {
          model_name: documentation.name,
          adapter,
          compiled_sql: await dbtProject.unsafeCompileQuery(queryText || ""),
          columns: documentation.columns.map((c) => ({
            column_name: c.name,
            data_type: c.type,
          })),
        },
      },
    });
  }

  public async getTestsForCurrentModel() {
    const eventResult = this.queryManifestService.getEventByCurrentProject();
    if (!eventResult?.event || !eventResult?.currentDocument) {
      return undefined;
    }

    const project = this.queryManifestService.getProject();
    if (!project) {
      return undefined;
    }

    const { currentDocument } = eventResult;
    const modelName = path.basename(currentDocument.uri.fsPath, ".sql");
    return this.getTestsForModel(modelName);
  }

  public async getTestsForModel(modelName: string) {
    const eventResult = this.queryManifestService.getEventByCurrentProject();
    if (!eventResult?.event || !eventResult?.currentDocument) {
      return undefined;
    }

    const project = this.queryManifestService.getProject();
    if (!project) {
      return undefined;
    }
    const projectName = project.getProjectName();

    const {
      event: { nodeMetaMap, graphMetaMap, testMetaMap, macroMetaMap },
    } = eventResult;

    this.dbtTerminal.debug(
      "dbtTests",
      "getting tests by modelName:",
      false,
      modelName,
    );
    const _node = nodeMetaMap.lookupByBaseName(modelName);
    if (!_node) {
      this.dbtTerminal.debug("no node for tableName:", modelName);
      return;
    }
    const key = _node.uniqueId;
    return (graphMetaMap["tests"].get(key)?.nodes || [])
      .map((n) => {
        const testKey = n.label.split(".")[0];
        const testData = testMetaMap.get(testKey);

        if (!testData) {
          return null;
        }

        // For singular tests, attached_node will be undefined
        if (!testData.attached_node) {
          return { ...testData, key: testKey };
        }

        // dbt sends tests (ex: relationships) to both source and connected models
        // do not send the test which has different model in attached_node
        if (testData.attached_node !== key) {
          return null;
        }

        const {
          depends_on: { macros },
          test_metadata,
        } = testData;

        const macroFilepath = this.getMacroFilePath(
          macros,
          projectName,
          macroMetaMap,
          test_metadata?.name,
        );

        return {
          ...testData,
          path: macroFilepath || testData.path,
          key: testKey,
        };
      })
      .filter((t) => Boolean(t));
  }

  public async generateTestsForColumns(
    project: DBTProject,
    panel: WebviewView | undefined,
  ) {
    if (!this.altimateAuthService.handlePreviewFeatures()) {
      return;
    }
    return await window.withProgress(
      {
        title: "Generating tests...",
        location: ProgressLocation.Notification,
        cancellable: false,
      },
      async () => {
        try {
          this.telemetryService.startTelemetryEvent(
            TelemetryEvents["DocumentationEditor/BulkGenerateTests"],
          );

          const currentFilePath = window.activeTextEditor?.document.uri;
          if (!currentFilePath) {
            return;
          }
          const modelName = path.basename(currentFilePath.fsPath, ".sql");

          const columnsInRelation = await project.getColumnsOfModel(modelName);
          const testSuggestions = await getTestSuggestions({
            adapter: project.getAdapterType(),
            columnsInRelation,
            tableRelation: modelName,
            dbtConfig: {},
            queryFn: async (query: string) => {
              const result = (await project.executeSQL(
                query,
                modelName,
                true,
                true,
              )) as ExecuteSQLResult;
              return result;
            },
          });

          this.telemetryService.endTelemetryEvent(
            TelemetryEvents["DocumentationEditor/BulkGenerateTests"],
          );
          if (!testSuggestions) {
            return;
          }

          this.dbtTerminal.debug(
            "docsEditPanel:generateTestsForColumns",
            "testSuggestions",
            testSuggestions,
          );
          const testSuggestionsForModel = testSuggestions?.models[0];

          const sessionID = `${
            env.sessionId
          }-${modelName}-numColumns-${testSuggestionsForModel?.columns.length}-${Date.now()}`;

          await this.altimateRequest.trackBulkTestGen(sessionID);
          return testSuggestionsForModel;
        } catch (error) {
          this.telemetryService.endTelemetryEvent(
            TelemetryEvents["DocumentationEditor/BulkGenerateTests"],
            error,
          );
          this.dbtTerminal.error(
            "docsEditPanel:generateTestsForColumns",
            "error",
            error,
          );
          window.showErrorMessage(
            extendErrorWithSupportLinks((error as Error).message),
          );
        }
      },
    );
  }
}
